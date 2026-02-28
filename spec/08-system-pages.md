# Page 8: System Pages

## Purpose
Error handling, loading states, and edge cases.

## 404 Page
- [x] Route: Any unmatched URL → `app/not-found.tsx`
- [x] Playful "Data Not Found" messaging
- [ ] Search suggestions
- [x] Link back to home
- [x] Animated illustration (data particles scattered)

## Error Page
- [x] Route: Runtime errors → `app/error.tsx`
- [x] Friendly error message
- [x] "Try Again" button
- [ ] Report issue link
- [x] Error boundary wrapping

## Loading States
- [x] Global loading: `app/loading.tsx`
- [ ] Dashboard loading with skeleton screens
- [ ] Route-specific loading states

## Components Needed
- `app/not-found.tsx`
- `app/error.tsx`
- `app/loading.tsx`
