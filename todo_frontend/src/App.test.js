import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function getThemeAttr() {
  return document.documentElement.getAttribute('data-theme');
}

test('renders header and theme toggle', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /simple to-do list/i })).toBeInTheDocument();
  const btn = screen.getByRole('button', { name: /switch to dark mode/i });
  expect(btn).toBeInTheDocument();
  expect(getThemeAttr()).toBe('light');
});

test('toggles theme on button click', async () => {
  const user = userEvent.setup();
  render(<App />);
  const btn = screen.getByRole('button', { name: /switch to dark mode/i });
  await user.click(btn);
  expect(getThemeAttr()).toBe('dark');
  // Button label updates to light
  expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
});

test('adds a todo item', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByRole('textbox', { name: /new todo/i });
  const addBtn = screen.getByRole('button', { name: /add todo/i });
  await user.type(input, 'Buy milk');
  await user.click(addBtn);
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('prevents adding empty/whitespace todo with error', async () => {
  const user = userEvent.setup();
  render(<App />);
  const addBtn = screen.getByRole('button', { name: /add todo/i });
  await user.click(addBtn);
  expect(screen.getByRole('alert')).toHaveTextContent(/please enter a task/i);

  const input = screen.getByRole('textbox', { name: /new todo/i });
  await user.clear(input);
  await user.type(input, '   ');
  await user.click(addBtn);
  expect(screen.getByRole('alert')).toHaveTextContent(/please enter a task/i);
});

test('edit, save, and cancel flows', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Add initial todo
  const input = screen.getByRole('textbox', { name: /new todo/i });
  const addBtn = screen.getByRole('button', { name: /add todo/i });
  await user.type(input, 'Walk the dog');
  await user.click(addBtn);
  expect(screen.getByText('Walk the dog')).toBeInTheDocument();

  // Edit it
  const editBtn = screen.getByRole('button', { name: /edit/i });
  await user.click(editBtn);
  const editInput = screen.getByRole('textbox', { name: /edit todo/i });
  await user.clear(editInput);
  await user.type(editInput, 'Walk the dog in the park');
  const saveBtn = screen.getByRole('button', { name: /save/i });
  await user.click(saveBtn);
  expect(screen.getByText('Walk the dog in the park')).toBeInTheDocument();

  // Start edit and cancel
  const editBtn2 = screen.getByRole('button', { name: /edit/i });
  await user.click(editBtn2);
  const editInput2 = screen.getByRole('textbox', { name: /edit todo/i });
  await user.clear(editInput2);
  await user.type(editInput2, 'Temporary text');
  const cancelBtn = screen.getByRole('button', { name: /cancel/i });
  await user.click(cancelBtn);
  // Should still show previous text
  expect(screen.getByText('Walk the dog in the park')).toBeInTheDocument();
});

test('blocks saving empty edit with error', async () => {
  const user = userEvent.setup();
  render(<App />);
  // add
  const input = screen.getByRole('textbox', { name: /new todo/i });
  const addBtn = screen.getByRole('button', { name: /add todo/i });
  await user.type(input, 'Schedule dentist appointment');
  await user.click(addBtn);

  // edit -> empty -> save
  const edit = screen.getByRole('button', { name: /edit/i });
  await user.click(edit);
  const editInput = screen.getByRole('textbox', { name: /edit todo/i });
  await user.clear(editInput);
  const save = screen.getByRole('button', { name: /save/i });
  await user.click(save);
  expect(screen.getByRole('alert')).toHaveTextContent(/updated text cannot be empty/i);
});

test('delete removes the item', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByRole('textbox', { name: /new todo/i });
  const addBtn = screen.getByRole('button', { name: /add todo/i });
  await user.type(input, 'Buy milk and eggs');
  await user.click(addBtn);
  expect(screen.getByText('Buy milk and eggs')).toBeInTheDocument();

  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  await user.click(deleteBtn);
  expect(screen.queryByText('Buy milk and eggs')).not.toBeInTheDocument();
});
