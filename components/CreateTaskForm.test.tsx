import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CreateTaskForm } from './CreateTaskForm';

it('CreateTaskForm', () => {
  render(<CreateTaskForm />);

  const placeholderText =
    screen.getByPlaceholderText('新しいタスクを入力してください');

  expect(placeholderText).toBeInTheDocument();
});
