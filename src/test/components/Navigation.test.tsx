import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
const mockUseAuth = vi.fn();
const mockUseProfile = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => mockUseProfile(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
  });

  const renderNavigation = () =>
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

  it('shows sign in buttons when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      signOut: vi.fn(),
      loading: false,
      isAuthEnabled: false,
    });
    mockUseProfile.mockReturnValue({ profile: null });

    renderNavigation();

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /book/i })).toHaveLength(1);
  });

  it('shows welcome message and sign out when user is authenticated', async () => {
    const user = { email: 'member@example.com' };
    const signOut = vi.fn();

    mockUseAuth.mockReturnValue({
      user,
      signOut,
      loading: false,
      isAuthEnabled: true,
    });
    mockUseProfile.mockReturnValue({ profile: { first_name: 'Alex' } });

    renderNavigation();

    expect(screen.getByText(/welcome, alex/i)).toBeInTheDocument();
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    await userEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalled();
  });
});
