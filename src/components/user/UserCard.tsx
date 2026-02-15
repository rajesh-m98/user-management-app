import React from "react";
import { IconButton, Avatar } from "@mui/material";
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="relative group h-full"
    >
      <div
        className="absolute inset-0 top-1.5 left-1.5 -right-1.5 -bottom-1.5 bg-primary-main/10 rounded-[20px] z-[-1] 
                   transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-primary-main/15"
      />

      <div
        className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-[20px] p-5 shadow-lg h-full flex flex-col
                      transition-all duration-300 group-hover:shadow-blue-500/10 group-hover:border-blue-200"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Avatar className="!w-14 !h-14 !text-xl !font-black !shadow-md !bg-gradient-to-br from-blue-600 to-blue-500">
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
              {user.firstName} {user.lastName}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-black bg-blue-50 text-blue-600 mt-1 uppercase tracking-widest border border-blue-100/50">
              ID: #{user.id.slice(0, 6)}
            </span>
          </div>
        </div>

        <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-100 flex-grow">
          <div className="flex items-start text-slate-700">
            <EmailIcon className="!text-[18px] mr-3 mt-0.5 text-blue-600/70 shrink-0" />
            <span className="text-[15px] font-semibold break-all leading-tight">
              {user.email}
            </span>
          </div>
          <div className="flex items-center text-slate-700">
            <PhoneIcon className="!text-[18px] mr-3 text-blue-600/70" />
            <span className="text-[16px] font-bold text-slate-800 leading-none">
              +91 {user.phoneNumber}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-3">
          <IconButton
            size="small"
            onClick={() => onEdit(user)}
            className="!bg-blue-50 !text-blue-600 hover:!bg-blue-600 hover:!text-white !transition-all !p-2"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(user.id)}
            className="!bg-red-50 !text-red-500 hover:!bg-red-500 hover:!text-white !transition-all !p-2"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
