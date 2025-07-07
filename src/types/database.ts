// Types pour la base de données Supabase

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          status: 'new' | 'read' | 'replied';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          text: string;
          sender: 'user' | 'kawaki';
          session_id: string;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          sender: 'user' | 'kawaki';
          session_id: string;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          text?: string;
          sender?: 'user' | 'kawaki';
          session_id?: string;
          timestamp?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 