# User Management App

Hi! This is my submission for the React Developer test task. I've built a clean and fast user management dashboard where you can add, see, update, and delete users. 

I focused on making the code easy to read and making sure the UI works well on both mobile and desktop.

## How to run this project

First, make sure you have Node.js installed on your computer.

1. Download the code and open the folder in your terminal.
2. Run `npm install` to get all the necessary packages.
3. Run `npm run dev` to start the app.
4. Open your browser to the link shown in the terminal (usually http://localhost:5173).

---

## My Design Choices

### 1. Adding new fields easily
In the email, you mentioned that adding new fields like "Address" should be easy. To handle this, I used a **schema-based approach**. 

If you want to add a new field, you don't need to change the UI code. You just go to `src/components/user/userSchema.ts` and add the new field details to the list. The form will automatically show the new input and handle the validation for you.

### 2. State Management
I used **Redux Toolkit** because it's the standard way to handle data in professional projects. It keeps the data organized and makes it easy to add features like "Optimistic Updates" (where the UI updates instantly while the data is saving in the background).

### 3. Styling
I used **Tailwind CSS** for the layout because it's very fast and keeps the bundle size small. I also used a bit of **Material UI** for things like the pop-up boxes (Dialogs) and icons to give it a polished, professional look.

### 4. Validation
I put extra effort into the form validation. For example:
- The phone number field only accepts numbers and follows the Indian format (+91).
- The email field checks for common typos (like if someone types "gamil" instead of "gmail").
- Names can't have weird special characters.

---

## API Info
I used the **JSONPlaceholder** API for the user data. It's a mock API, so while you can add or delete users in the app, the changes won't stay forever on the server (since it's a public testing API), but they will work perfectly in your current browser session.

Thanks for checking out my work!
