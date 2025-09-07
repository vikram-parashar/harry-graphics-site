export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      carousels: {
        Row: {
          created_at: string | null
          id: string
          image: string
          link: string
          points: string[]
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image: string
          link: string
          points: string[]
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string
          link?: string
          points?: string[]
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          heading: string
          id: string
          name: string
          thumbnail_image: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          heading: string
          id?: string
          name: string
          thumbnail_image: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          heading?: string
          id?: string
          name?: string
          thumbnail_image?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: Json
          cart: Json
          created_at: string
          id: string
          note: string | null
          order_number: number
          payment: string
          status: string
          total_amount: number
          tracking_link: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address: Json
          cart: Json
          created_at?: string
          id?: string
          note?: string | null
          order_number?: never
          payment: string
          status: string
          total_amount: number
          tracking_link?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: Json
          cart?: Json
          created_at?: string
          id?: string
          note?: string | null
          order_number?: never
          payment?: string
          status?: string
          total_amount?: number
          tracking_link?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'orders_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          image: string
          min_quantity: number
          name: string
          options: Json
          price: number
          unit: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          image?: string
          min_quantity?: number
          name: string
          options?: Json
          price: number
          unit: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          image?: string
          min_quantity?: number
          name?: string
          options?: Json
          price?: number
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      sheet_access: {
        Row: {
          created_at: string
          role: string
          sheet_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          role: string
          sheet_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          role?: string
          sheet_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sheet_access_sheet_id_fkey'
            columns: ['sheet_id']
            isOneToOne: false
            referencedRelation: 'sheets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sheet_access_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      sheet_links: {
        Row: {
          created_at: string | null
          created_by: string
          expires_at: string | null
          id: string
          link_type: string
          sheet_id: string
          token: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          expires_at?: string | null
          id?: string
          link_type: string
          sheet_id: string
          token: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          expires_at?: string | null
          id?: string
          link_type?: string
          sheet_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sheet_links_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sheet_links_sheet_id_fkey'
            columns: ['sheet_id']
            isOneToOne: false
            referencedRelation: 'sheets'
            referencedColumns: ['id']
          },
        ]
      }
      sheet_rows: {
        Row: {
          created_at: string | null
          created_by: string | null
          data: Json
          id: string
          link_id: string | null
          sheet_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data: Json
          id?: string
          link_id?: string | null
          sheet_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data?: Json
          id?: string
          link_id?: string | null
          sheet_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sheet_rows_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sheet_rows_link_id_fkey'
            columns: ['link_id']
            isOneToOne: false
            referencedRelation: 'sheet_links'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sheet_rows_sheet_id_fkey'
            columns: ['sheet_id']
            isOneToOne: false
            referencedRelation: 'sheets'
            referencedColumns: ['id']
          },
        ]
      }
      sheets: {
        Row: {
          columns: Json
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          columns?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          columns?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          addresses: Json
          created_at: string | null
          email: string
          id: string
          is_admin: boolean | null
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          addresses?: Json
          created_at?: string | null
          email: string
          id: string
          is_admin?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          addresses?: Json
          created_at?: string | null
          email?: string
          id?: string
          is_admin?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
