import { beforeEach, describe, expect, it, vi } from 'vitest';
import { submitAppointmentRequest, submitContactMessage } from './service';
import { siteConfig } from '@/lib/site-config';

const insertMock = vi.fn();
const fromMock = vi.fn(() => ({ insert: insertMock }));
const mockState = { isConfigured: true };

vi.mock('./client', () => ({
  supabase: {
    from: fromMock,
  },
  get isSupabaseConfigured() {
    return mockState.isConfigured;
  },
}));

describe('submitAppointmentRequest', () => {
  beforeEach(() => {
    mockState.isConfigured = true;
    insertMock.mockReset();
    fromMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    fromMock.mockReturnValue({ insert: insertMock });
  });

  const baseInput = {
    userId: 'user-123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    service: 'signature-cut',
    membershipStatus: 'none',
    preferredDateTime: '2025-09-24T10:00:00Z',
  } as const;

  it('returns success when Supabase insert succeeds', async () => {
    const result = await submitAppointmentRequest({ ...baseInput });

    expect(result).toEqual({ success: true });
    expect(fromMock).toHaveBeenCalledWith('appointments');
    expect(insertMock).toHaveBeenCalledWith({
      user_id: 'user-123',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      service: 'signature-cut',
      membership_status: 'none',
      preferred_datetime: '2025-09-24T10:00:00Z',
      notes: null,
    });
  });

  it('returns default error message when Supabase insert fails', async () => {
    insertMock.mockResolvedValueOnce({ error: { message: 'boom' } });

    const result = await submitAppointmentRequest({ ...baseInput });

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error).toContain('We could not process your request right now');
    }
  });

  it('returns offline messaging when Supabase is not configured', async () => {
    mockState.isConfigured = false;

    const result = await submitAppointmentRequest({ ...baseInput });

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error).toContain(siteConfig.contact.formattedPhone);
    }
  });
});

describe('submitContactMessage', () => {
  beforeEach(() => {
    mockState.isConfigured = true;
    insertMock.mockReset();
    fromMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    fromMock.mockReturnValue({ insert: insertMock });
  });

  const baseInput = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: ' 555-1111 ',
    subject: 'booking',
    message: 'I would like to know more about services.',
  } as const;

  it('trims phone number and returns success on insert', async () => {
    const result = await submitContactMessage({ ...baseInput });

    expect(result).toEqual({ success: true });
    expect(fromMock).toHaveBeenCalledWith('contact_messages');
    expect(insertMock).toHaveBeenCalledWith({
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '555-1111',
      subject: 'booking',
      message: 'I would like to know more about services.',
    });
  });

  it('returns default error message when insert fails', async () => {
    insertMock.mockResolvedValueOnce({ error: { message: 'db error' } });

    const result = await submitContactMessage({ ...baseInput });

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error).toContain('We could not process your request right now');
    }
  });

  it('returns offline message when Supabase is not configured', async () => {
    mockState.isConfigured = false;

    const result = await submitContactMessage({ ...baseInput });

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error).toContain(siteConfig.contact.formattedPhone);
    }
  });
});
