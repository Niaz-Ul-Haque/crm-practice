// src/components/tasks/TaskDetail.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "@/data/tasksData";
import { Client } from "@/data/clientsData";
import { formatDate } from "@/lib/utils";
import {
  Bell,
  Calendar,
  CheckSquare,
  Clock,
  Edit,
  Flag,
  Phone,
  Mail,
  X,
  Trash,
  User,
  FileEdit,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Link from "next/link";

interface TaskDetailProps {
  task: Task;
  client?: Client | null;
  onClose?: () => void;
  onEdit?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: string) => void;
  onDelete?: (taskId: string) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  client,
  onClose,
  onEdit,
  onStatusChange,
  onDelete,
}) => {
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone size={20} className="text-blue-500" />;
      case "meeting":
        return <Calendar size={20} className="text-green-500" />;
      case "email":
        return <Mail size={20} className="text-purple-500" />;
      case "follow_up":
        return <Clock size={20} className="text-amber-500" />;
      case "review":
        return <FileEdit size={20} className="text-indigo-500" />;
      case "other":
      default:
        return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatTaskType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return (
      (task.status === "pending" || task.status === "in_progress") &&
      dueDate < today
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between border-b">
          <div className="flex items-start">
            <div className="mr-2">{getTaskTypeIcon(task.type)}</div>
            <div>
              <CardTitle className="text-xl">{task.title}</CardTitle>
              <div className="flex flex-wrap items-center mt-2 space-x-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                    task.status
                  )}`}
                >
                  {formatStatus(task.status)}
                </span>
                <span
                  className={`inline-flex items-center text-sm ${getPriorityStyles(
                    task.priority
                  )}`}
                >
                  <Flag size={16} className="mr-1" />
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </span>
                <span className="text-sm text-gray-500">
                  {formatTaskType(task.type)}
                </span>
              </div>
            </div>
          </div>
          <div>
            {isOverdue() && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Overdue
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-6">
          {/* Due Date and Reminder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p
                  className={`font-medium ${isOverdue() ? "text-red-600" : ""}`}
                >
                  {formatDate(new Date(task.dueDate))}
                </p>
              </div>
            </div>

            {task.reminderAt && (
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Reminder</p>
                  <p className="font-medium">
                    {formatDate(new Date(task.reminderAt))}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <p>{task.description}</p>
            </div>
          )}

          {/* Status Timeline */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Timeline</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="mr-2 bg-blue-100 p-1 rounded-full">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(new Date(task.createdAt))}
                  </p>
                </div>
              </div>

              {task.updatedAt !== task.createdAt && (
                <div className="flex items-start">
                  <div className="mr-2 bg-amber-100 p-1 rounded-full">
                    <Edit size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Updated</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(new Date(task.updatedAt))}
                    </p>
                  </div>
                </div>
              )}

              {task.completedAt && (
                <div className="flex items-start">
                  <div className="mr-2 bg-green-100 p-1 rounded-full">
                    <CheckSquare size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completed</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(new Date(task.completedAt))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Client Information */}
          {client && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">Related Client</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 bg-blue-100 text-blue-600 mr-3">
                  <AvatarFallback>
                    {client.firstName[0]}
                    {client.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {client.firstName} {client.lastName}
                  </p>
                  <div className="text-sm text-gray-500">
                    {client.email} • {client.phone}
                  </div>
                </div>
                <div className="ml-auto">
                  <Link href={`/clients/${client.id}`}>
                    <Button variant="outline" size="sm">
                      <User size={16} className="mr-2" />
                      View Client
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => onDelete && onDelete(task.id)}
            >
              <Trash size={16} className="mr-2" />
              Delete
            </Button>
          </div>

          <div className="flex space-x-2">
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit && onEdit(task.id)}
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>

            {task.status !== "completed" && (
              <Button
                size="sm"
                onClick={() =>
                  onStatusChange && onStatusChange(task.id, "completed")
                }
              >
                <CheckSquare size={16} className="mr-2" />
                Complete
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskDetail;
