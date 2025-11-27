# API Configuration Setup 🚀

## What's Changed:

### 1. **Installed Axios**
   - Axios is now installed for making HTTP requests
   - More powerful than fetch with better error handling
   - Automatic request/response transformations

### 2. **Environment Variables (.env)**
   - Created `.env` file with `VITE_API_URL`
   - Created `.env.example` as a template
   - API URL is now configurable for different environments

### 3. **API Setup Files**

#### `/src/api/axios.js`
   - Configured axios instance with base URL from environment variables
   - Request interceptor: Automatically adds JWT token to all requests
   - Response interceptor: Handles 401 errors (expired tokens)
   - Global error handling

#### `/src/api/auth.js`
   - Centralized auth API calls
   - Methods: `signup()`, `login()`, `logout()`, `getCurrentUser()`
   - Clean separation of API logic from components

### 4. **Updated Components**
   - `Login.jsx` now uses `authAPI.login()`
   - `Signup.jsx` now uses `authAPI.signup()`
   - Better error handling with axios response structure

## Environment Configuration:

### Development (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)
Create this file when deploying:
```
VITE_API_URL=https://your-production-api.com/api
```

## How It Works:

### 1. **Axios Instance** (`src/api/axios.js`)
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. **Auto Token Injection**
Every request automatically includes the JWT token if it exists:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. **Using the API in Components**
```javascript
import authAPI from '../api/auth';

// Login
const data = await authAPI.login({ email, password });

// Signup
const data = await authAPI.signup({ name, email, password });
```

## Benefits:

✅ **Centralized Configuration**
   - Change API URL in one place (.env)
   - Easy to switch between dev/staging/production

✅ **Automatic Token Management**
   - Token automatically added to requests
   - No need to manually set headers

✅ **Better Error Handling**
   - Access error messages: `err.response?.data?.message`
   - Automatic 401 handling (logout on token expiry)

✅ **Cleaner Code**
   - Components don't need to know about fetch/headers
   - Reusable API functions

✅ **Production Ready**
   - Just update .env for different environments
   - No code changes needed when deploying

## Testing:

1. **Start Backend** (make sure it's on port 5000):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. The frontend will use the API URL from `.env` file

## Changing API URL for Production:

When deploying to production:

1. Create `.env.production`:
   ```
   VITE_API_URL=https://your-api-domain.com/api
   ```

2. Build the app:
   ```bash
   npm run build
   ```

3. The production build will use the production API URL

## Important Notes:

- In Vite, environment variables must start with `VITE_` to be exposed to the client
- Access env variables with `import.meta.env.VITE_VARIABLE_NAME`
- Never commit `.env` to git (it's already in .gitignore)
- Always commit `.env.example` as a template for other developers

## Next Steps:

You can now:
- Add more API methods in `src/api/auth.js`
- Create other API files (e.g., `src/api/messages.js`, `src/api/users.js`)
- All requests will automatically include the token
- Handle errors consistently across the app

Enjoy your clean, production-ready API setup! 🎉
