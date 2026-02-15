# User Management App

Hi! This is my submission for the React Developer test task. I've built a clean and fast user management dashboard where you can manage user data with full CRUD functionality.

I focused on making the code clean, modular, and ensuring the UI works perfectly on both mobile and desktop.

## 🚀 Features (CRUD Operations)

I have implemented all the required operations using the mock API:
- **Create**: Add new users with real-time validation.
- **Read**: View a list of all users fetched from the API.
- **Update**: Edit existing user details easily via a polished modal.
- **Delete**: Remove users from the list with instant feedback.

## 🛠️ How to run this project

First, make sure you have Node.js installed on your computer.

1. Download the code and open the folder in your terminal.
2. Run `npm install` to get all the necessary packages.
3. Run `npm run dev` to start the app.
4. Open your browser to the link shown in the terminal (usually http://localhost:5173).

---

## 💡 My Design Choices

### 1. Adding new fields easily (Extensibility)
In the email, you mentioned that adding new fields like "Address" should be easy. To handle this, I used a **schema-based approach**. 

If you want to add a new field, you don't need to change any UI code or logic. You just go to `src/components/user/userSchema.ts` and add the new field details to the array. The form will automatically render the new input and handle its validation for you.

### 2. State Management (Redux Toolkit)
I used **Redux Toolkit** because it's the industry standard for professional projects. It keeps the data organized and allowed me to implement "Optimistic Updates," meaning the UI updates instantly while the request processes in the background for a better user experience.

### 3. Styling (Tailwind + MUI)
I used **Tailwind CSS** for the layout and custom animations because it's fast and flexible. I also used **Material UI** for complex components like Dialogs and Form Inputs to ensure a robust and premium feel.

### 4. Advanced Validation
I put extra effort into making the validation "interview-ready":
- **Phone**: Clips to 10 digits, only allows numbers, and checks for valid Indian mobile prefixes (6-9).
- **Email**: Includes a smart typo-check that suggests corrections for domains like "gamil.com".
- **Name**: Restricts special characters and ensures clean formatting.

---

## 🌐 API & Mock Data
I integrated the **JSONPlaceholder** API. Since it is a mock API, it doesn't permanently save data to its server. However, I've handled this by managing the state locally in Redux so that any user you create, update, or delete will work exactly as expected in your current session.

Thanks for checking out my work!
