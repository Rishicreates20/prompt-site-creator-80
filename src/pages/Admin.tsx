import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowLeft, Crown, User, Shield } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserData {
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
  daily_credits: number;
  total_credits: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [creditAmount, setCreditAmount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to access this page");
        navigate("/auth");
        return;
      }

      const { data: roleData, error } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (error || !roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadUsers();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select(`
          user_id,
          full_name
        `);

      if (usersError) throw usersError;

      // Get roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get credits
      const { data: creditsData, error: creditsError } = await supabase
        .from('user_credits')
        .select('user_id, daily_credits, total_credits');

      if (creditsError) throw creditsError;

      // Combine data
      const combinedUsers: UserData[] = (usersData || []).map((profile) => {
        const userRole = rolesData?.find((r) => r.user_id === profile.user_id);
        const userCredits = creditsData?.find((c) => c.user_id === profile.user_id);

        return {
          user_id: profile.user_id,
          email: profile.user_id.substring(0, 8) + '...',
          full_name: profile.full_name,
          role: (userRole?.role as string) || 'user',
          daily_credits: userCredits?.daily_credits || 0,
          total_credits: userCredits?.total_credits || 0,
        };
      });

      setUsers(combinedUsers);
    } catch (error: any) {
      toast.error("Failed to load users: " + error.message);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'subscriber' | 'admin') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success(`User role updated to ${newRole}`);
      await loadUsers();
    } catch (error: any) {
      toast.error("Failed to update role: " + error.message);
    }
  };

  const updateUserCredits = async (userId: string, amount: number) => {
    try {
      const user = users.find((u) => u.user_id === userId);
      if (!user) return;

      const { error } = await supabase
        .from('user_credits')
        .update({ 
          total_credits: user.total_credits + amount,
          daily_credits: user.daily_credits + amount
        })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success(`Credits ${amount > 0 ? 'added' : 'removed'} successfully`);
      setCreditAmount({ ...creditAmount, [userId]: 0 });
      await loadUsers();
    } catch (error: any) {
      toast.error("Failed to update credits: " + error.message);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'subscriber':
        return <Crown className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "destructive" => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'subscriber':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage users, roles, and credits</p>
            </div>
          </div>
          <Badge variant="destructive" className="gap-2">
            <Shield className="h-4 w-4" />
            Admin Access
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage all users, their roles, and credit balances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Daily Credits</TableHead>
                  <TableHead>Total Credits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.full_name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="gap-2">
                        {getRoleIcon(user.role)}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.daily_credits}</TableCell>
                    <TableCell>{user.total_credits}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Select
                          value={user.role}
                          onValueChange={(value: 'user' | 'subscriber' | 'admin') => updateUserRole(user.user_id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="subscriber">Subscriber</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            placeholder="Credits"
                            value={creditAmount[user.user_id] || ''}
                            onChange={(e) => setCreditAmount({
                              ...creditAmount,
                              [user.user_id]: parseInt(e.target.value) || 0
                            })}
                            className="w-24"
                          />
                          <Button
                            size="sm"
                            onClick={() => updateUserCredits(user.user_id, creditAmount[user.user_id] || 0)}
                            disabled={!creditAmount[user.user_id]}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
