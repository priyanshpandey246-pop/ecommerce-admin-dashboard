import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../api/dashboardApi.js";

export default function Users() {
  const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    role: z.enum(["admin", "user"]),
  });

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const addMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      setEditing(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-40 bg-gray-200 rounded"></div>
    </div>
  );
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
  <h1 className="text-2xl font-bold">Users</h1>

  <button
    onClick={() => {
      setOpen(true);
      setEditing(null);
      reset();
    }}
    className="
    self-start
    sm-self-auto
      bg-indigo-600 
      hover:bg-indigo-700 
      text-white 
      px-4 py-2 
      rounded-lg 
      shadow-md
      hover:shadow-xl
      hover:translate-y-0.5  
      transition-all
      active:scale-95
      duration-200
    "
     
  >
    Add User
  </button>
</div>

      {/* Table */}

      <div className="bg-white border border-gray-200 rounded-xl shadow:md hover:shadow-xl transition duration-300 overflow-x-auto">
        <table className="w-full text-fixed">
          <thead className="bg-gray-100 border-b text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 w-1/4">Name</th>
              <th className="p-4 w-2/5">Email</th>
              <th className="p-4 w-1/6">Role</th>
              <th className="p-4 w-1/6">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200">
                <td className="p-4">{user.name}</td>
                <td className="p-4 break-all text-sm">{user.email}</td>
                <td className="p-4">
                  {user.role === "admin" ? (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full transition-all hover:scale-105 duration-200">
                      Admin
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full transition-all hover:scale-105 duration-200">
                      User
                    </span>
                  )}
                </td>
                <td className="p-4 whitespace-nowwrap">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditing(user);
                      setValue("name", user.name);
                      setValue("email", user.email);
                      setValue("role", user.role);
                    }}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(user.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   
        {/* Modal */}
{open && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-96 shadow-2xl scale-100">
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Edit User" : "Add User"}
      </h2>

      <form
        onSubmit={handleSubmit((data) => {
          if (editing) {
            updateMutation.mutate({ ...data, id: editing.id });
          } else {
            addMutation.mutate(data);
          }
        })}
        className="space-y-4"
      >

        {/* Name */}
        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <select
            {...register("role")}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setEditing(null);
              reset();
            }}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-4 py-2
            rounded-lg
            shadow-md
            hover:shadow-xl
            hover:-translate-y-0.5
            transition-all
            duration-200
            active:scale-95
            "
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>

      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );
}