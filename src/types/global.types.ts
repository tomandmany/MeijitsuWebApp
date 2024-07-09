// パス: /types/supabase.types.ts
import { Tables } from './supabase.types';

declare global {
  type Member = Tables<'members'>;
  type WorkModel = Tables<'workModels'>;
  type MemberWork = Tables<'memberWorks'>;
}
