import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { User } from "../../types/user.types";
import UserCard from "./UserCard";
import Loader from "../common/Loader";
import { AnimatePresence } from "framer-motion";

interface UserListProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading && users.length === 0) {
    return <Loader />;
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" color="text.secondary">
          No users found. Try adding one!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <AnimatePresence mode="popLayout">
        {users.map((user) => (
          <Grid size={{ xs: 12, sm: 6 }} key={user.id}>
            <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};

export default UserList;
