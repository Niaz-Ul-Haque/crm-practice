// src/components/tasks/TaskForm.tsx
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientsData } from "@/data/clientsData";
import { Task, TaskPriority, TaskStatus, TaskType } from "@/data/tasksData";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
};

const getCurrentDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;
};

const defaultFormValues = {
  title: "",
  description: "",
  clientId: "",
  dueDate: getCurrentDate(),
  dueTime: getCurrentTime(),
  priority: "medium" as TaskPriority,
  type: "follow_up" as TaskType,
  status: "pending" as TaskStatus,
  setReminder: false,
  reminderDate: getCurrentDate(),
  reminderTime: getCurrentTime(),
};

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
  onCancel?: () => void;
  onSave?: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  isEditing = false,
  onCancel,
  onSave,
}) => {
  const { toast } = useToast();

  const initFormValues = () => {
    if (!task) return defaultFormValues;

    const dueDate = new Date(task.dueDate);
    const reminderDate = task.reminderAt ? new Date(task.reminderAt) : null;

    return {
      title: task.title,
      description: task.description || "",
      clientId: task.clientId || "",
      dueDate: dueDate.toISOString().split("T")[0],
      dueTime: `${String(dueDate.getHours()).padStart(2, "0")}:${String(
        dueDate.getMinutes()
      ).padStart(2, "0")}`,
      priority: task.priority,
      type: task.type,
      status: task.status,
      setReminder: Boolean(reminderDate),
      reminderDate: reminderDate
        ? reminderDate.toISOString().split("T")[0]
        : getCurrentDate(),
      reminderTime: reminderDate
        ? `${String(reminderDate.getHours()).padStart(2, "0")}:${String(
            reminderDate.getMinutes()
          ).padStart(2, "0")}`
        : getCurrentTime(),
    };
  };

  const [formData, setFormData] = useState(initFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleReminder = () => {
    setFormData((prev) => ({ ...prev, setReminder: !prev.setReminder }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast({
        title: "Incomplete Form",
        description: "Task title is required.",
      });
      return;
    }

    setIsSubmitting(true);

    const dueDateTimeStr = `${formData.dueDate}T${formData.dueTime}:00Z`;
    const reminderDateTimeStr = formData.setReminder
      ? `${formData.reminderDate}T${formData.reminderTime}:00Z`
      : undefined;

    const taskToSave = {
      id: task?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description || undefined,
      clientId: formData.clientId || undefined,
      dueDate: dueDateTimeStr,
      priority: formData.priority,
      status: formData.status,
      type: formData.type,
      assignedTo: "user1",
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt:
        formData.status === "completed"
          ? new Date().toISOString()
          : task?.completedAt,
      reminderAt: reminderDateTimeStr,
    };

    setTimeout(() => {
      setIsSubmitting(false);

      if (onSave) {
        onSave(taskToSave);
      }

      toast({
        title: isEditing ? "Task Updated" : "Task Created",
        description: isEditing
          ? "Your task has been updated successfully."
          : "Your task has been created successfully.",
      });

      if (onCancel) onCancel();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="border-b">
            <CardTitle>{isEditing ? "Edit Task" : "Create New Task"}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Related Client (Optional)</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) =>
                    handleSelectChange("clientId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {clientsData.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Task Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="follow_up">Follow-up</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueTime">Due Time</Label>
                <Input
                  id="dueTime"
                  name="dueTime"
                  type="time"
                  value={formData.dueTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center mb-4">
                <Button
                  type="button"
                  variant={formData.setReminder ? "default" : "outline"}
                  size="sm"
                  onClick={toggleReminder}
                  className="mr-4"
                >
                  <Bell size={16} className="mr-2" />
                  {formData.setReminder ? "Reminder Set" : "Set Reminder"}
                </Button>
              </div>

              {formData.setReminder && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminderDate">Reminder Date</Label>
                    <Input
                      id="reminderDate"
                      name="reminderDate"
                      type="date"
                      value={formData.reminderDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminderTime">Reminder Time</Label>
                    <Input
                      id="reminderTime"
                      name="reminderTime"
                      type="time"
                      value={formData.reminderTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? "Update Task" : "Create Task"}
              {isSubmitting && (
                <span className="ml-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  );
};

export default TaskForm;
