# Ocean Professional Todo Frontend

A modern, minimalist React application that lets users add, update, and remove tasks from a to-do list. Built with Create React App and styled using the Ocean Professional theme (blue & amber accents).

## Features

- Single-column layout: header, input form, todo list, and action buttons
- Add, edit, and delete tasks
- LocalStorage persistence
- Light/Dark theme toggle (documentElement data-theme)
- Accessible labels, keyboard-friendly interactions
- Smooth transitions, subtle gradients, rounded corners, and soft shadows

## Scripts

- `npm start` — start dev server at http://localhost:3000
- `npm test` — run tests with React Testing Library
- `npm run build` — production build

## Style Guide

- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

## Project Structure

- `src/App.js` — main app with all functionality (add/edit/delete, theme toggle, localStorage)
- `src/App.css` — Ocean Professional theme, layout, and components
- `src/App.test.js` — unit/integration tests for main flows
- `src/index.js` — React entrypoint

## Accessibility

- All interactive elements have aria-labels and focus styles
- Error messages use role="alert"
- Semantic headings and sections

Enjoy your organized day!
