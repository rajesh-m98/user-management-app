import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { User } from "../../types/user.types";
import { motion } from "framer-motion";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: "100%",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.03)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1, pt: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 56,
                height: 56,
                mr: 2,
                fontSize: "1.5rem",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              }}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User ID: #{user.id.slice(0, 5)}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" mb={1} color="text.secondary">
            <EmailIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>

          <Box display="flex" alignItems="center" color="text.secondary">
            <PhoneIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
            <Typography variant="body2">{user.phoneNumber}</Typography>
          </Box>
        </CardContent>

        <Box
          sx={{
            p: 1.5,
            bgcolor: "rgba(0,0,0,0.02)",
            borderTop: "1px solid rgba(0,0,0,0.03)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onEdit(user)}
            sx={{
              color: "primary.main",
              "&:hover": { bgcolor: "primary.lighter" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(user.id)}
            sx={{
              color: "error.main",
              "&:hover": { bgcolor: "error.lighter" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>
    </motion.div>
  );
};

export default UserCard;
