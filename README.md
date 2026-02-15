# Professional React CRUD Application

A production-ready, schema-driven User Management application built with React, TypeScript, and Material UI. This project demonstrates best practices in modular architecture, custom hooks, and dynamic form rendering.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Material UI (MUI)
- **Animations**: Framer Motion
- **Tooling**: Vite
- **API Client**: Axios
- **Notifications**: React Hot Toast
- **Mock Data**: JSONPlaceholder API

## 🛠️ Key Features

- **Schema-Driven Forms**: Fields are dynamically generated from a central configuration.
- **Optimistic Updates**: UI updates instantly while the API request is in progress, with automatic rollback on failure.
- **Clean Architecture**: Strict separation of concerns between services, hooks, and components.
- **Responsive Design**: Polished, card-based layout that works seamlessly across devices.
- **Custom Validation**: Built-in validation for emails, phone numbers, and required fields.

## 📦 Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## ➕ How to add a new field

To add a new field (e.g., "Date of Birth"), you only need to modify `src/components/user/userSchema.ts` and `src/types/user.types.ts`:

1. Update `User` interface in `src/types/user.types.ts`.
2. Add the field object to the `userFormSchema` array:

```typescript
{
  name: "dateOfBirth",
  label: "Date of Birth",
  type: "date",
  required: false
}
```

The form will automatically render this new field without any changes to `UserForm.tsx`.

## 🗒️ Assumptions

- The application uses `JSONPlaceholder` as a mock backend. Note that while the API returns success status codes, changes are not persisted on the server.
- Phone numbers are expected to be 10-digit strings.
- The "ID" field is treated as a string for consistency.

## 🚢 Deployment

This project is ready for deployment on platforms like Vercel, Netlify, or AWS Amplify. Simply connect your repository and use the build command `npm run build` with the output directory `dist`.
