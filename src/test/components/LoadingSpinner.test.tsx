import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it('renders text when provided', () => {
    const message = 'Loading appointments...';
    render(<LoadingSpinner text={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
