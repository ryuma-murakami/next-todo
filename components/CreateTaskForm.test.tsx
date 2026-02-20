import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CreateTaskForm } from './CreateTaskForm';

it('CreateTaskForm', () => {
  render(<CreateTaskForm />);

  const input = screen.getByPlaceholderText('新しいタスクを入力してください');
  expect(input).toBeInTheDocument();

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
