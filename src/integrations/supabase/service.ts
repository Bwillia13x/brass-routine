import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './client';
import type { TablesInsert } from './types';

const DEFAULT_ERROR_MESSAGE =
  'We could not process your request right now. Please try again or contact the concierge team.';

type SupabaseActionResult =
  | { success: true }
  | { success: false; error: string };

const formatErrorMessage = (action: string, error: PostgrestError | Error): string => {
  console.error(`[Supabase] ${action} failed`, error);

  if (import.meta.env.DEV && error.message) {
    return `${DEFAULT_ERROR_MESSAGE}\nDetails: ${error.message}`;
  }

  return DEFAULT_ERROR_MESSAGE;
};

export interface SubmitContactMessageInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const submitContactMessage = async (
  input: SubmitContactMessageInput,
): Promise<SupabaseActionResult> => {
  const payload: TablesInsert<'contact_messages'> = {
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone ?? null,
    subject: input.subject,
    message: input.message,
  };

  const { error } = await supabase.from('contact_messages').insert(payload);

  if (error) {
    return { success: false, error: formatErrorMessage('submitContactMessage', error) };
  }

  return { success: true };
};

export interface SubmitAppointmentRequestInput {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  membershipStatus: string;
  preferredDateTime: string;
  notes?: string;
}

export const submitAppointmentRequest = async (
  input: SubmitAppointmentRequestInput,
): Promise<SupabaseActionResult> => {
  const payload: TablesInsert<'appointments'> = {
    user_id: input.userId,
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone,
    service: input.service,
    membership_status: input.membershipStatus,
    preferred_datetime: input.preferredDateTime,
    notes: input.notes ?? null,
  };

  const { error } = await supabase.from('appointments').insert(payload);

  if (error) {
    return { success: false, error: formatErrorMessage('submitAppointmentRequest', error) };
  }

  return { success: true };
};
