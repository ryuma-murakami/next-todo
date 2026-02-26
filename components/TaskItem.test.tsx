import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TaskItem } from './TaskItem';
import type { Task } from '@/lib/type';
import { Status } from '@prisma/client';
import userEvent from '@testing-library/user-event';

describe('TaskItem', () => {
  const task: Task = {
    id: '1',
    title: 'Test Task',
    status: Status.notStarted,
  };

  afterEach(() => {
    cleanup();
  });

  it('renders a checkbox with the correct status', () => {
    render(<TaskItem task={task} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders the task title', () => {
    render(<TaskItem task={task} />);

    const text = screen.getByDisplayValue(task.title);
    expect(text).toBeInTheDocument();
  });

  it('disables the title input when the task is completed', () => {
    const completedTask: Task = {
      ...task,
      status: Status.completed,
    };

    render(<TaskItem task={completedTask} />);

    const text = screen.getByDisplayValue(task.title);
    expect(text).toBeDisabled();
  });

  it('renders the delete button with the correct aria-label', () => {
    render(<TaskItem task={task} />);

    const button = screen.getByRole('button', {
      name: `タスク「${task.title}」をゴミ箱へ移動する`,
    });
    expect(button).toBeInTheDocument();
  });

  it('submits the form when the checkbox is toggled', async () => {
    const event = userEvent.setup();
    render(<TaskItem task={task} />);

    const checkbox = screen.getByRole('checkbox');
    const form = checkbox.closest('form')!;
    const submitSpy = vi.spyOn(form, 'requestSubmit');

    await event.click(checkbox);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('submits the form when Enter is pressed in the title input', async () => {
    const event = userEvent.setup();
    render(<TaskItem task={task} />);

    const text = screen.getByDisplayValue(task.title);
    const form = text.closest('form')!;
    const submitSpy = vi.spyOn(form, 'requestSubmit');

    await event.type(text, 'Edited Task{enter}');
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
