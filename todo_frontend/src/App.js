import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

// Helpers
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
const LS_KEY = 'ocean_todos_v1';

// PUBLIC_INTERFACE
function App() {
  /**
   * This component renders the Ocean Professional themed Todo App.
   * Features:
   * - Add, edit, delete todos
   * - Inline validation (non-empty)
   * - LocalStorage persistence
   * - Theme toggle (light/dark) with transitions
   * - Accessible controls and labels
   */
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all'); // potential future enhancement

  // load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setTodos(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // persist todos
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos]);

  // apply theme to html[data-theme]
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter a task.');
      return;
    }
    const newTodo = { id: genId(), text: trimmed };
    setTodos(prev => [newTodo, ...prev]);
    setInput('');
    setError('');
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setError('');
  };

  const saveEdit = (id) => {
    const trimmed = editingText.trim();
    if (!trimmed) {
      setError('Updated text cannot be empty.');
      return;
    }
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)));
    setEditingId(null);
    setEditingText('');
    setError('');
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    if (editingId === id) {
      cancelEdit();
    }
  };

  const filteredTodos = useMemo(() => {
    // For future filter support; currently returns all
    return todos;
  }, [todos, filter]);

  return (
    <div className="ocean-app">
      <header className="ocean-header" role="banner">
        <div className="ocean-header-inner">
          <h1 className="ocean-title" aria-label="Simple To-Do List">Simple To-Do List</h1>
          <button
            className="ocean-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <p className="ocean-subtitle">Organize your day with clarity.</p>
      </header>

      <main className="ocean-main" role="main">
        <section className="ocean-card" aria-labelledby="new-todo-title">
          <h2 id="new-todo-title" className="visually-hidden">Add a new todo</h2>
          <form onSubmit={handleAdd} className="todo-form" noValidate>
            <label htmlFor="new-todo" className="visually-hidden">New todo</label>
            <input
              id="new-todo"
              type="text"
              className={`ocean-input ${error ? 'has-error' : ''}`}
              placeholder="e.g., Buy milk"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'new-todo-error' : undefined}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError('');
              }}
            />
            <button
              type="submit"
              className="ocean-btn ocean-btn-primary"
              aria-label="Add todo"
            >
              Add
            </button>
          </form>
          {error && (
            <div id="new-todo-error" role="alert" className="ocean-error">
              {error}
            </div>
          )}
        </section>

        <section className="ocean-card" aria-labelledby="todo-list-title">
          <h2 id="todo-list-title" className="ocean-section-title">Your Todos</h2>
          {filteredTodos.length === 0 ? (
            <p className="ocean-empty">No tasks yet. Add your first task above.</p>
          ) : (
            <ul className="todo-list" role="list">
              {filteredTodos.map((t) => (
                <li key={t.id} className="todo-item" role="listitem">
                  {editingId === t.id ? (
                    <div className="todo-row editing">
                      <label htmlFor={`edit-${t.id}`} className="visually-hidden">
                        Edit todo
                      </label>
                      <input
                        id={`edit-${t.id}`}
                        className="ocean-input todo-edit-input"
                        value={editingText}
                        onChange={(e) => {
                          setEditingText(e.target.value);
                          if (error) setError('');
                        }}
                        aria-label="Edit todo"
                      />
                      <div className="todo-actions">
                        <button
                          type="button"
                          className="ocean-btn ocean-btn-success"
                          onClick={() => saveEdit(t.id)}
                          aria-label="Save"
                          title="Save"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="ocean-btn ocean-btn-ghost"
                          onClick={cancelEdit}
                          aria-label="Cancel"
                          title="Cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="todo-row">
                      <span className="todo-text">{t.text}</span>
                      <div className="todo-actions">
                        <button
                          type="button"
                          className="ocean-btn ocean-btn-secondary"
                          onClick={() => startEdit(t.id, t.text)}
                          aria-label="Edit"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="ocean-btn ocean-btn-danger"
                          onClick={() => removeTodo(t.id)}
                          aria-label="Delete"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="ocean-footer" role="contentinfo">
        <small>Ocean Professional • Modern minimalist UI</small>
      </footer>
    </div>
  );
}

export default App;
