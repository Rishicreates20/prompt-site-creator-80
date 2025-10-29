import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { UserCredits } from '@/lib/types';

export const useCredits = () => {
  const { data: credits, isLoading, error, refetch } = useQuery({
    queryKey: ['user-credits'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as UserCredits;
    },
  });

  return {
    credits,
    isLoading,
    error,
    refetchCredits: refetch,
  };
};
