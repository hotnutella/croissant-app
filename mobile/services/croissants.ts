import { supabase } from '../supabaseClient';

export async function getComments(croissantId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, content, created_at, user_id')
    .eq('croissant_id', croissantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getLikeCount(croissantId: string) {
  const { count } = await supabase
    .from('likes')
    .select('*', { head: true, count: 'exact' })
    .eq('croissant_id', croissantId);
  return count || 0;
}

export async function getTopCroissantsOfWeek() {
  const { data, error } = await supabase.rpc('get_top_croissants_of_week');
  if (error) throw error;
  return data as { id: string; name: string; like_count: number }[];
}
