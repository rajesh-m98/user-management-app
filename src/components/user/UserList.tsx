import React from "react";
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
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">👥</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800">No users found</h3>
        <p className="text-slate-500 mt-1">
          Start by adding your first team member!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <AnimatePresence mode="popLayout">
        {users.map((user) => (
          <div key={user.id} className="h-full">
            <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UserList;
