import { useState } from "react";
import {
  Container,
  Typography,
  Box,
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
import Button from "./components/common/Button";
import { User, UserCreateInput } from "./types/user.types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1e40af",
    },
    background: {
      default: "#f8fafc",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
  },
  shape: {
    borderRadius: 12,
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
      <Toaster position="top-right" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="h4" color="text.primary">
              User Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your team and their contact information
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenForm()}
          >
            Add User
          </Button>
        </Box>

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
            sx: { borderRadius: "20px", p: 1 },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={handleCloseForm}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent sx={{ pt: 0 }}>
            <UserForm
              onSubmit={handleSubmit}
              initialData={editingUser}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default App;
