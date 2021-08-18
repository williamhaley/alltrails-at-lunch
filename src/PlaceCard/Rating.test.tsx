import { render, screen } from '@testing-library/react';
import Rating from './Rating';

test('renders the correct number of stars', () => {
  render(<Rating rating={4.1} totalReviews={12} />);

  const filledStars = screen.getAllByTestId(/filled-star/i);
  expect(filledStars.length).toEqual(4);

  const emptyStars = screen.getAllByTestId(/empty-star/i);
  expect(emptyStars.length).toEqual(1);
});
