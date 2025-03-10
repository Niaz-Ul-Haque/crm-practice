// src/components/tasks/TaskList.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "@/data/tasksData";
import { getClientForTask } from "@/data/tasksData";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  CheckSquare,
  Clock,
  Flag,
  MoreHorizontal,
  Phone,
  Mail,
  FileEdit,
  AlertCircle,
  X,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  title?: string;
  onSelectTask?: (taskId: string) => void;
  onUpdateTaskStatus?: (taskId: string, status: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  title = "Tasks",
  onSelectTask,
  onUpdateTaskStatus,
}) => {
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone size={16} className="text-purple-500" />;
      case "meeting":
        return <Calendar size={16} className="text-green-500" />;
      case "email":
        return <Mail size={16} className="text-purple-500" />;
      case "follow_up":
        return <Clock size={16} className="text-amber-500" />;
      case "review":
        return <FileEdit size={16} className="text-indigo-500" />;
      case "other":
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-purple-800";
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

  const isOverdue = (task: Task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return (
      (task.status === "pending" || task.status === "in_progress") &&
      dueDate < today
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task, index) => {
                  const client = getClientForTask(task.id);

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        isOverdue(task) ? "border-red-300 bg-red-50" : ""
                      }`}
                      onClick={() => onSelectTask && onSelectTask(task.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <span className="mr-2 mt-0.5">
                            {getTaskTypeIcon(task.type)}
                          </span>
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            {task.description && (
                              <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                                {task.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                              task.status
                            )} mr-2`}
                          >
                            {formatStatus(task.status)}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {task.status !== "completed" && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUpdateTaskStatus &&
                                      onUpdateTaskStatus(task.id, "completed");
                                  }}
                                >
                                  <CheckSquare size={16} className="mr-2" />
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              {task.status !== "in_progress" &&
                                task.status !== "completed" && (
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onUpdateTaskStatus &&
                                        onUpdateTaskStatus(
                                          task.id,
                                          "in_progress"
                                        );
                                    }}
                                  >
                                    <Clock size={16} className="mr-2" />
                                    Mark as In Progress
                                  </DropdownMenuItem>
                                )}
                              {task.status !== "cancelled" && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUpdateTaskStatus &&
                                      onUpdateTaskStatus(task.id, "cancelled");
                                  }}
                                >
                                  <X size={16} className="mr-2" />
                                  Cancel Task
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap justify-between items-center text-sm">
                        <div className="flex items-center mr-4 mb-1">
                          <Clock size={14} className="text-gray-500 mr-1" />
                          <span
                            className={
                              isOverdue(task)
                                ? "text-red-600 font-medium"
                                : "text-gray-500"
                            }
                          >
                            {formatDate(new Date(task.dueDate))}
                          </span>
                        </div>

                        {client && (
                          <div className="flex items-center mr-4 mb-1">
                            <User size={14} className="text-gray-500 mr-1" />
                            <span className="text-gray-500">
                              {client.firstName} {client.lastName}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center mb-1">
                          <Flag
                            size={14}
                            className={`${getPriorityStyles(
                              task.priority
                            )} mr-1`}
                          />
                          <span className={getPriorityStyles(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}{" "}
                            Priority
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No tasks found.</p>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskList;
