import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import { useUsers } from "./hooks/useUsers";
import UserList from "./components/user/UserList";
import UserForm from "./components/user/UserForm";
import { User, UserCreateInput } from "./types/user.types";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

function App() {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenForm = (user?: User) => {
    if (user) {
      setEditingUser(user);
    } else {
      setEditingUser(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (userInput: UserCreateInput) => {
    if (editingUser) {
      await updateUser(editingUser.id, userInput);
    } else {
      await addUser(userInput);
    }
    handleCloseForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="min-h-screen text-slate-900 overflow-x-hidden"
        style={{
          background: `radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.05) 0, transparent 50%),
                       radial-gradient(at 50% 0%, rgba(96, 165, 250, 0.05) 0, transparent 50%),
                       radial-gradient(at 100% 0%, rgba(37, 99, 235, 0.05) 0, transparent 50%),
                       #fcfdff`,
        }}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "!rounded-2xl !bg-slate-900 !text-white !font-medium !shadow-2xl",
          }}
        />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-10 md:mb-12"
          >
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-4xl md:text-6xl font-[950] tracking-tight text-slate-900 flex flex-wrap items-center gap-3 md:gap-4">
                User Explorer
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-[10px] md:text-[14px] px-2 py-0.5 md:px-3 md:py-1 rounded-lg md:xl uppercase tracking-[0.1em] md:tracking-[0.2em] font-black shadow-lg shadow-blue-500/20">
                  Pro
                </span>
              </h1>
              <p className="text-slate-500 text-base md:text-xl max-w-2xl font-medium leading-relaxed">
                Managing high-performance teams has never been this elegant.
                <span className="hidden sm:inline">
                  {" "}
                  Experience{" "}
                  <span className="text-blue-600 font-bold border-b-2 border-blue-100">
                    real-time synchronization
                  </span>
                  .
                </span>
              </p>
            </div>

            <button
              onClick={() => handleOpenForm()}
              className="w-full md:w-auto group relative inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-[20px] font-bold 
                         shadow-2xl shadow-blue-500/30 transition-all hover:bg-blue-700 hover:-translate-y-1.5 active:scale-95"
            >
              <AddIcon className="transition-transform group-hover:rotate-180 duration-500" />
              <span>Add New Member</span>
            </button>
          </motion.div>

          <UserList
            users={users}
            loading={loading}
            onEdit={handleOpenForm}
            onDelete={deleteUser}
          />

          <Dialog
            open={isFormOpen}
            onClose={handleCloseForm}
            fullWidth
            maxWidth="xs"
            PaperProps={{
              className:
                "!rounded-[32px] !p-2 !shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden !m-4",
            }}
          >
            <div className="flex justify-end p-2">
              <IconButton
                onClick={handleCloseForm}
                className="!text-slate-400 hover:!bg-slate-100 !transition-colors"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <DialogContent className="!pt-0 !pb-8 md:!pb-10 !px-6 md:!px-10">
              <UserForm
                onSubmit={handleSubmit}
                initialData={editingUser}
                loading={loading}
              />
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
