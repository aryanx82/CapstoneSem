# API Structure - Quick Reference 📋

## File: `src/api/axios.jsx`

### Base Configuration
```javascript
baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
```

### Available API Functions

#### Auth
- `LoginUser(userData)` - POST /auth/login
- `SignupUser(userData)` - POST /auth/signup

#### Contacts
- `getContact(userId)` - GET /users/:userId/get-contacts
- `addContact(userId, data)` - POST /users/:userId/add-contact
- `deleteContact(userId, contactId)` - DELETE /users/:userId/contacts/:contactId

#### Messages
- `getMessages(userId, contactId)` - GET /users/:userId/messages/:contactId
- `addMessages(userId, contactId, message)` - POST /users/:userId/messages/:contactId

### Features
✅ Auto token injection (Bearer token added to all requests)
✅ Auto logout on 401 errors
✅ Environment variable support
✅ Centralized error handling

## Usage Example

```javascript
import { LoginUser, SignupUser, getContact } from '../api/axios';

// Login
try {
  const response = await LoginUser({ email, password });
  const data = response.data;
  // data contains: { token, user }
} catch (err) {
  console.error(err.response?.data?.message);
}

// Signup
try {
  const response = await SignupUser({ name, email, password });
  const data = response.data;
} catch (err) {
  console.error(err.response?.data?.message);
}

// Get contacts
try {
  const response = await getContact(userId);
  const contacts = response.data;
} catch (err) {
  console.error(err.response?.data?.message);
}
```

## Environment Variables

### `.env` (Development)
```
VITE_API_URL=http://localhost:5000/api
```

### `.env.production` (Production)
```
VITE_API_URL=https://your-production-api.com/api
```

## Component Integration

Both Login and Signup components now use:
- `LoginUser()` for authentication
- `SignupUser()` for registration
- Proper error handling from axios responses
- Token storage in localStorage

Ready to use! 🚀
