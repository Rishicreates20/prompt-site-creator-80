import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Template } from '@/lib/types';

export const useTemplates = (category?: string) => {
  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['templates', category],
    queryFn: async () => {
      let query = supabase
        .from('templates')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Map the database response to Template type
      return (data || []).map(item => ({
        ...item,
        customization: item.customization as any,
        store_data: item.store_data as any,
      })) as Template[];
    },
  });

  return {
    templates,
    isLoading,
    error,
  };
};
