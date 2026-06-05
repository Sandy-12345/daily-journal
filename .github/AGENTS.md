Create an `AGENTS.md` file for my project. 
Access https://agents.md/ for more information

Context:
* Stack: Vite + React + TypeScript + Supabase
* Styling: Tailwind CSS
* Strict TypeScript enabled
* Clean architecture with separated services, components, and hooks

Existing instruction files:
* general.instructions.md
* copilot-instructions.md
* typescript-react.instructions.md
* design.instructions.md

Requirements:
* Do NOT duplicate detailed coding/design rules.
* Reference the instruction files as the source of truth.
* Define rule priority if conflicts occur.
* Define workflow expectations (small changes, follow patterns, avoid large refactors).
* Include security boundaries (no secrets, no weakening TS strictness, no bypassing auth).
* Mention common commands (install, dev, build, lint, format, typecheck, test).
* Clearly state what agents must NOT modify (dist, lockfiles, generated files).
* Include how agents should report changes.
* Keep it clean, minimal, and production-grade.

Output only the final AGENTS.md content in Markdown.