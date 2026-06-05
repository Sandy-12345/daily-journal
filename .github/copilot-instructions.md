# GitHub Copilot Instructions

## Project context
- Project type: Vite + React + Supabase web application.
- App purpose: Daily Journal with Mood Tracker.
- Use plain CSS/global styles for styling.
- Use a flat `src/` structure with minimal nesting.
- Use TypeScript with strict typing for all components, hooks, and Supabase interactions.

## What Copilot should do
- Generate React UI and page components for journal entries, mood selection, daily review, and entry creation.
- Build Supabase integration code for auth, fetching and saving entries, and mood history.
- Keep code simple, readable, and idiomatic for a Vite + React + TypeScript app.
- Prefer small reusable components and hooks.
- Use explicit TypeScript interfaces and types for data models and component props.
- Favor functional components with React hooks.

## File structure guidance
- Keep the repository structure flat inside `src/`.
- Recommended top-level folders: `src/components/`, `src/hooks/`, `src/utils/`, `src/lib/`, `src/styles/`.
- Avoid deep nested folder hierarchies.
- Place CSS files next to the components that use them when it is convenient.

## Styling guidance
- Use plain CSS files and import them directly into React components.
- Avoid Tailwind, CSS-in-JS, and styled-components.
- Use global style files sparingly and keep class names unique.
- Prefer semantic HTML with accessible form controls and labels.
- Use CSS variables for colors, spacing, and typography where helpful.
- Keep styling clean and responsive for mobile and desktop.

## TypeScript and coding preferences
- Use strict TypeScript and explicit typing.
- Always type component props, state, API responses, Supabase row data, and hook return values.
- Prefer `camelCase` for variables and functions.
- Use `PascalCase` for React component names.
- Use `async/await` for asynchronous Supabase code.
- Keep UI and data logic separated when possible.
- Use named exports for reusable helpers and hooks; default exports only for main component files.

## Supabase guidance
- Use a dedicated Supabase client file such as `src/lib/supabase.ts`.
- Type Supabase tables and rows with interfaces or type aliases.
- Handle auth, errors, and loading states explicitly.
- Use `from('entries')`, `select()`, `insert()`, `update()`, and `delete()` where needed.
- Avoid embedding secrets in code; assume environment variables for Supabase keys.

## UX and behavior guidance
- Focus on a clean journal experience with mood selection and entry creation.
- Provide clear feedback for saved entries, loading states, and errors.
- Keep interactions simple and intuitive.
- Use accessible labels, buttons, and form fields.
- Ensure the app is easy to scan and use on mobile devices.

## Guidance for code reviews and suggestions
- Prefer small, maintainable changes.
- If adding new features, create reusable helpers or hooks rather than monolithic components.
- When generating files, use a consistent flat `src/` layout.
- Keep styling consistent across components and avoid custom frameworks.
