# Page 6: Authentication Pages (Login/Signup)

## Purpose
Frictionless onboarding. Multiple auth methods.

## Routes
`/login` → `app/(auth)/login/page.tsx`
`/signup` → `app/(auth)/signup/page.tsx`

## Login Page
- [ ] Split screen layout (Left: product art/animation, Right: form)
- [ ] Social login buttons (Google, Microsoft, GitHub)
- [ ] Email magic link option (passwordless)
- [ ] Traditional email/password login
- [ ] "Enterprise SSO" link
- [ ] Remember me checkbox
- [ ] Forgot password link
- [ ] "Don't have an account? Sign up" link

## Signup Page
- [ ] Same split screen layout
- [ ] Social signup buttons (Google, Microsoft, GitHub)
- [ ] Email + password form with validation
- [ ] Full name field
- [ ] Password strength indicator
- [ ] Terms of service checkbox
- [ ] "Already have an account? Sign in" link

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
