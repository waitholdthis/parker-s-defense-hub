

# Dark/Light Mode Implementation Plan

This plan adds a theme toggle to your resume website, allowing visitors to switch between light and dark modes. The foundation is already in place - your CSS has both light and dark theme variables, and the required package (`next-themes`) is already installed.

---

## What Will Change

### User Experience
- A sun/moon toggle button will appear in the navigation bar (both desktop and mobile)
- Clicking it switches between light and dark themes
- The preference is saved to localStorage, so returning visitors see their preferred theme
- System preference (if user's OS is set to dark mode) is respected by default

---

## Implementation Steps

### Step 1: Add ThemeProvider to the App
Wrap the application with the `ThemeProvider` from `next-themes` in `App.tsx`. This enables theme state management across all components.

### Step 2: Create Theme Toggle Component
Create a new `ThemeToggle.tsx` component that:
- Uses the `useTheme` hook from `next-themes`
- Displays a sun icon in dark mode (click to go light)
- Displays a moon icon in light mode (click to go dark)
- Includes smooth transition animations

### Step 3: Update Navigation
Add the theme toggle button to the navigation bar:
- Desktop: Positioned with the other action buttons (LinkedIn, Email, Resume)
- Mobile: Included in the mobile menu actions section

### Step 4: Update HTML for Flash Prevention
Add `suppressHydrationWarning` to prevent the brief flash of incorrect theme on page load (standard practice with `next-themes`).

---

## Technical Details

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/ThemeToggle.tsx` | Toggle button component with sun/moon icons |

### Files to Modify
| File | Change |
|------|--------|
| `src/App.tsx` | Wrap app with `ThemeProvider` |
| `src/components/resume/Navigation.tsx` | Add `ThemeToggle` to desktop and mobile nav |
| `index.html` | Add `suppressHydrationWarning` to html tag |

### Theme Toggle Component Logic
```text
if (current theme is dark) 
  -> show Sun icon 
  -> click sets theme to "light"
else 
  -> show Moon icon 
  -> click sets theme to "dark"
```

### Default Behavior
- Defaults to system preference (`system` theme)
- User can override to `light` or `dark`
- Preference persists across sessions via localStorage

