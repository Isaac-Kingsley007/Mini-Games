import type { LearderBoardRow, Score } from "./types";
import { supabase, auth } from "../../services/supabaseClient";

const TABLE_NAME = "tictactoe_scores"

export async function fetchScore(): Promise<Score> {
    const { data: { user }, error: authError } = await auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');
  
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('wins, draws, loses, score')
      .eq('user_id', user.id)
      .single();
  
    // If not found, insert a new row with all zero values
    if (error && error.code === 'PGRST116') {
      const { data: inserted, error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert({
          user_id: user.id,
          username: user.user_metadata?.username ?? 'Anonymous',
          wins: 0,
          draws: 0,
          loses: 0,
        })
        .select('wins, draws, loses, score')
        .single();
  
      if (insertError) throw insertError;
      return inserted;
    }
  
    if (error) throw error;
    return data;
}


export async function updateScore(updateData: Partial<{ wins: number; draws: number; loses: number; }>): Promise<void> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');

    const { error } = await supabase
        .from(TABLE_NAME)
        .update(updateData)
        .eq('user_id', user.id);

    if (error) throw error;
    return;
}

export async function fetchLeaderBoardScores(): Promise<LearderBoardRow[]> {
    const {data, error} = await supabase
    .from(TABLE_NAME)
    .select('username, wins, draws, loses, score')
    .order('score', {ascending: false})
    .limit(20)

    if(error) throw error;

    return data;
}

export function setupRealTimeLeaderBoard(callBackFunction: () => void) {
    const channel = supabase
    .channel('tictactoe_scores_realtime')
    .on(
    'postgres_changes',
    {
        event: '*',
        schema: 'public',
        table: 'tictactoe_scores',
    },
    () => {
        callBackFunction();
    }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
}