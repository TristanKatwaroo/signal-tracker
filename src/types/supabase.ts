export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      signals: {
        Row: {
          count: number | null
          created_at: string
          gacha_id: string | null
          gacha_type: number | null
          id: string
          item_id: string | null
          item_type: string
          name: string
          rank_type: number
          signal_id: string
          signal_number: number | null
          time: string
          uid: string
          user_id: string
        }
        Insert: {
          count?: number | null
          created_at?: string
          gacha_id?: string | null
          gacha_type?: number | null
          id?: string
          item_id?: string | null
          item_type: string
          name: string
          rank_type: number
          signal_id: string
          signal_number?: number | null
          time: string
          uid: string
          user_id: string
        }
        Update: {
          count?: number | null
          created_at?: string
          gacha_id?: string | null
          gacha_type?: number | null
          id?: string
          item_id?: string | null
          item_type?: string
          name?: string
          rank_type?: number
          signal_id?: string
          signal_number?: number | null
          time?: string
          uid?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      recent_signals: {
        Row: {
          count: number | null
          created_at: string | null
          gacha_id: string | null
          gacha_type: number | null
          id: string | null
          item_id: string | null
          item_type: string | null
          name: string | null
          rank_type: number | null
          signal_id: string | null
          time: string | null
          uid: string | null
          user_id: string | null
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          gacha_id?: string | null
          gacha_type?: number | null
          id?: string | null
          item_id?: string | null
          item_type?: string | null
          name?: string | null
          rank_type?: number | null
          signal_id?: string | null
          time?: string | null
          uid?: string | null
          user_id?: string | null
        }
        Update: {
          count?: number | null
          created_at?: string | null
          gacha_id?: string | null
          gacha_type?: number | null
          id?: string | null
          item_id?: string | null
          item_type?: string | null
          name?: string | null
          rank_type?: number | null
          signal_id?: string | null
          time?: string | null
          uid?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      signals_summary: {
        Row: {
          day: string | null
          gacha_type: number | null
          item_type: string | null
          rank_type: number | null
          signal_count: number | null
          total_count: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      batch_insert_signals: {
        Args: {
          signals_json: Json
        }
        Returns: string[]
      }
      cleanup_old_signals: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_signals_summary: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
