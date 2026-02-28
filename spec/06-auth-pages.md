# Page 6: Authentication Pages (Login/Signup)

## Purpose
Frictionless onboarding. Multiple auth methods.

## Routes
`/login` → `app/(auth)/login/page.tsx`
`/signup` → `app/(auth)/signup/page.tsx`

## Login Page
- [x] Split screen layout (Left: product art/animation, Right: form)
- [x] Social login buttons (Google, Microsoft, GitHub)
- [ ] Email magic link option (passwordless)
- [x] Traditional email/password login
- [x] "Enterprise SSO" link
- [ ] Remember me checkbox
- [x] Forgot password link
- [x] "Don't have an account? Sign up" link

## Signup Page
- [x] Same split screen layout
- [x] Social signup buttons (Google, Microsoft, GitHub)
- [x] Email + password form with validation
- [x] Full name field
- [x] Password strength indicator
- [x] Terms of service checkbox
- [x] "Already have an account? Sign in" link

## Onboarding Wizard (3 Steps)
- [ ] Step 1: "What's your role?" (selects default templates)
- [ ] Step 2: "Connect your data?" (optional integrations)
- [ ] Step 3: "Upload your first file" (guided tour with tooltips)
- [ ] Progress indicator
- [ ] Skip option

## Components Needed
- `components/auth/AuthLayout.tsx`
- `components/auth/SocialLoginButtons.tsx`
- `components/auth/LoginForm.tsx`
- `components/auth/SignupForm.tsx`
- `components/auth/OnboardingWizard.tsx`
- `components/auth/PasswordStrength.tsx`
