# Assessment: Implementation Plan

## Overview
This document outlines the plan to enhance the `movies-master` application with three key features: a Skeleton Loader, a Dynamic Form component, and a Dark/Light Theme system.

## Task 1: Skeleton Loader
**Objective:** Improve perceived performance by displaying a shimmering skeleton structure while data is loading.

### Implementation Strategy:
1.  **Component Creation:** Create a reusable `SkeletonCard` component.
    *   **Structure:** A simple `div` with a specific class for dimensions and animation.
    *   **Styling:** CSS animation (`keyframes`) to create a "shimmer" effect (moving background gradient).
2.  **Integration:**
    *   **HomePage:** Modify `Row.js` to accept a `loading` prop (or derive it). If loading, render a list of `SkeletonCard` components instead of movie posters.
    *   **MovieDetailsPage:** Since the page is currently empty/basic, we will first implement a basic layout (Banner + Info) and then wrap it with a loading state check to show a skeleton layout (e.g., a large block for the banner and text lines for description).

## Task 2: Dynamic Form Component
**Objective:** Create a flexible React component that generates a form based on a configuration object.

### Implementation Strategy:
1.  **Component Design:** Create `DynamicForm.js`.
    *   **Props:** `fields` (array of objects), `onSubmit` (function), `initialValues` (object).
    *   **Field Configuration:** Each object in `fields` will define:
        *   `name`: field identifier.
        *   `type`: input type (text, password, number, select, etc.).
        *   `label`: Display label.
        *   `options`: (for select inputs) array of options.
        *   `validation`: (optional) simple validation rules.
2.  **Usage Example:** We will create a standalone route `/test-dynamic-form` to demonstrate this component in action, ensuring we don't break existing login/register flows immediately but prove the capability.

## Task 3: Dark/Light Theme
**Objective:** Implement a system to toggle between Dark and Light modes.

### Implementation Strategy:
1.  **Context API:** Create `ThemeContext.js` to manage the `theme` state ('light' or 'dark') and provide a toggle function.
2.  **CSS Variables:** Define global CSS variables in `index.css` for colors.
    *   `--bg-color`
    *   `--text-color`
    *   `--card-bg`
    *   `--nav-bg`
3.  **Variable Application:** Update main components (`App`, `HomePage`, `Navbar`) to use `var(--bg-color)` etc., instead of hardcoded hex values (like `#111`).
4.  **Toggle Switch:** Add a button in the `Navbar` to call the toggle function from the context.

---

## Code Snippets (Preview)

### Skeleton CSS
```css
.skeleton {
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}
@keyframes shine {
  to { background-position-x: -200%; }
}
```

### Dynamic Form Logic
```javascript
{fields.map(field => (
  <div key={field.name}>
    <label>{field.label}</label>
    {field.type === 'select' ? (
      <select {...register(field.name)}>{/* options */}</select>
    ) : (
      <input type={field.type} {...register(field.name)} />
    )}
  </div>
))}
```
