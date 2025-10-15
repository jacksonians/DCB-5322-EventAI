# Authentication Features

This document describes the login and password reset functionality implemented in the EventAI application.

## Overview

The authentication system includes:
- **Login Page**: Email/password authentication with validation
- **Password Reset Flow**: Multi-step password recovery process
- **Consistent Design**: Matches the main application color scheme (black/white/amber theme)

## Components

### 1. LoginPage (`/frontend/mainpage/src/components/LoginPage.tsx`)

The login page provides user authentication with the following features:

**Fields:**
- Email address (with validation)
- Password (with show/hide toggle)
- Remember me checkbox
- Forgot password link (navigates to password reset)

**Features:**
- Form validation (email format, password length)
- Error handling with user-friendly messages
- Toggle between login and signup modes
- Guest access option
- Loading states during submission

**API Integration Points:**
```typescript
// TODO: Replace with actual API calls in handleSubmit function
// Example login endpoint:
// POST /api/auth/login
// Body: { email, password }
// Response: { token, user }

// Example signup endpoint:
// POST /api/auth/signup
// Body: { email, password, firstName, lastName }
// Response: { token, user }
```

### 2. PasswordResetPage (`/frontend/mainpage/src/components/PasswordResetPage.tsx`)

A multi-step password reset flow with the following stages:

#### Step 1: Email Input
- User enters their email address
- System sends a 6-digit verification code
- Validates email format

#### Step 2: Verification Code
- User enters the 6-digit code sent to their email
- Auto-focus between input fields for better UX
- Option to resend the verification code
- Validates code format (6 digits)

#### Step 3: New Password
- User creates a new password
- Confirms the new password (must match)
- Validates password strength (minimum 6 characters)

#### Step 4: Success
- Confirmation message
- Button to return to login page

**API Integration Points:**
```typescript
// Step 1: Request password reset
// POST /api/auth/forgot-password
// Body: { email }
// Response: { message: "Verification code sent" }

// Step 2: Verify reset code
// POST /api/auth/verify-reset-code
// Body: { email, code }
// Response: { message: "Code verified", resetToken }

// Step 3: Reset password
// POST /api/auth/reset-password
// Body: { email, code, newPassword }
// Response: { message: "Password reset successful" }

// Resend code
// POST /api/auth/resend-reset-code
// Body: { email }
// Response: { message: "Code resent" }
```

## Navigation Flow

```
Main App → Login Page → Password Reset Page
    ↓           ↓              ↓
Home Page   Forgot Password?   Success → Back to Login
    ↓           ↓
Guest Mode   Password Reset
```

## Styling & Design

Both components follow the main application's design system:

**Colors:**
- Background: `bg-amber-50` (warm cream)
- Cards: `bg-white` with `border-2 border-gray-800`
- Primary buttons: `bg-gray-800 hover:bg-gray-700`
- Text: Gray-800 for primary, Gray-600 for secondary
- Errors: Red-500/Red-600 with `bg-red-50` backgrounds
- Success: Green-600 with `bg-green-100` backgrounds

**Typography:**
- Headers: `text-2xl` with medium font weight
- Body text: Default size with `text-gray-600`
- Labels: `text-sm` with `font-medium`
- Consistent spacing and padding throughout

## Form Validation

### Email Validation
- Required field check
- Format validation using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Real-time error clearing on user input

### Password Validation
- Minimum 6 characters
- Password confirmation must match
- Required field checks

### Verification Code Validation
- Exactly 6 digits
- Numeric characters only
- Individual digit input fields for better UX

## Error Handling

All components include comprehensive error handling:

1. **Validation Errors**: Displayed inline below fields
2. **API Errors**: Displayed in alert boxes at the top of forms
3. **Loading States**: Disabled buttons with loading text during API calls
4. **Error Clearing**: Errors automatically clear when user starts typing

## Backend Integration Guide

To integrate with your backend API:

1. **Create API service** (`/frontend/mainpage/src/services/authService.ts`):
```typescript
import api from './api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (data: SignupData) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  
  verifyResetCode: async (email: string, code: string) => {
    const response = await api.post('/auth/verify-reset-code', { email, code });
    return response.data;
  },
  
  resetPassword: async (email: string, code: string, newPassword: string) => {
    const response = await api.post('/auth/reset-password', { 
      email, 
      code, 
      newPassword 
    });
    return response.data;
  },
  
  resendResetCode: async (email: string) => {
    const response = await api.post('/auth/resend-reset-code', { email });
    return response.data;
  }
};
```

2. **Replace TODO comments** in `LoginPage.tsx` and `PasswordResetPage.tsx` with actual API calls using the service above.

3. **Handle authentication state**: Store tokens in localStorage or use a state management solution (Redux, Context API).

4. **Protected routes**: Add authentication checks before navigating to protected pages.

## Testing the UI

1. Start the development server:
```bash
npm run dev
```

2. Navigate to Login:
   - Click "login" in the header
   - Or go directly to the login page through the app navigation

3. Test Login Form:
   - Try submitting with empty fields → See validation errors
   - Enter invalid email → See email format error
   - Enter short password → See password length error

4. Test Password Reset:
   - Click "Forgot password?" link
   - Enter email → Navigate to verification step
   - Enter 6-digit code → Navigate to new password step
   - Set new password → See success message
   - Click "Go to Sign In" → Return to login

## Future Enhancements

- [ ] Add social login options (Google, GitHub, etc.)
- [ ] Implement OAuth 2.0 authentication
- [ ] Add two-factor authentication (2FA)
- [ ] Password strength indicator
- [ ] Rate limiting on password reset attempts
- [ ] Email verification on signup
- [ ] Remember me functionality with persistent sessions
- [ ] Session timeout warnings

## Security Considerations

When implementing the backend:

1. **Password Storage**: Use bcrypt with appropriate salt rounds
2. **Token Security**: Use JWT with secure, rotating secrets
3. **Rate Limiting**: Limit login attempts and password reset requests
4. **Email Verification**: Verify email ownership before allowing password reset
5. **Code Expiration**: Verification codes should expire (e.g., 15 minutes)
6. **HTTPS Only**: Always use HTTPS in production
7. **Input Sanitization**: Sanitize all user inputs on the backend
8. **CORS**: Configure proper CORS policies

## Troubleshooting

**Issue**: TypeScript errors in component files
- **Solution**: These are expected before the components are imported. They will resolve when the app runs.

**Issue**: "Forgot password?" button doesn't navigate
- **Solution**: Ensure `onNavigate` prop is properly passed and handled in App.tsx

**Issue**: Verification code inputs not focusing properly
- **Solution**: Check that input IDs match the pattern `code-${index}`

**Issue**: Forms submitting but nothing happens
- **Solution**: The API integration is not yet implemented. Replace TODO comments with actual API calls.
