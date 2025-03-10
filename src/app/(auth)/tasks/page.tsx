// src/app/(auth)/tasks/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskDetail from "@/components/tasks/TaskDetail";
import TaskForm from "@/components/tasks/TaskForm";
import TaskFilters from "@/components/tasks/TaskFilters";
import CalendarView from "@/components/tasks/CalenderView";
import { tasksData, Task, getClientForTask } from "@/data/tasksData";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function TasksPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksData);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [filters, setFilters] = useState({
    searchTerm: "",
    types: [] as string[],
    statuses: [] as string[],
    priorities: [] as string[],
    dateRange: "all" as "all" | "today" | "week" | "month" | "overdue",
  });

  useEffect(() => {
    let result = [...tasks];

    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          (task.description && task.description.toLowerCase().includes(search))
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((task) => filters.types.includes(task.type));
    }

    if (filters.statuses.length > 0) {
      result = result.filter((task) => filters.statuses.includes(task.status));
    }

    if (filters.priorities.length > 0) {
      result = result.filter((task) =>
        filters.priorities.includes(task.priority)
      );
    }

    if (filters.dateRange !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);

      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      switch (filters.dateRange) {
        case "today":
          result = result.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate <= endOfDay;
          });
          break;
        case "week":
          result = result.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate <= endOfWeek;
          });
          break;
        case "month":
          result = result.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate <= endOfMonth;
          });
          break;
        case "overdue":
          result = result.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return (
              dueDate < today &&
              (task.status === "pending" || task.status === "in_progress")
            );
          });
          break;
      }
    }

    result.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    setFilteredTasks(result);
  }, [tasks, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleViewModeChange = (mode: "list" | "calendar") => {
    setViewMode(mode);
  };

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleNewTask = (date?: Date) => {
    console.log(date);
    setSelectedTaskId(null);
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleEditTask = (id: string) => {
    setSelectedTaskId(id);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleUpdateTaskStatus = (id: string, status: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: status as any,
              updatedAt: new Date().toISOString(),
              completedAt:
                status === "completed"
                  ? new Date().toISOString()
                  : task.completedAt,
            }
          : task
      )
    );

    toast({
      title: "Task Updated",
      description: `Task status has been updated to ${
        status.charAt(0).toUpperCase() + status.slice(1)
      }.`,
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setSelectedTaskId(null);

    toast({
      title: "Task Deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const handleSaveTask = (taskData: any) => {
    if (isEditing) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskData.id ? taskData : task))
      );
    } else {
      setTasks((prevTasks) => [taskData, ...prevTasks]);
    }

    setIsCreating(false);
    setIsEditing(false);
    setSelectedTaskId(null);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setIsEditing(false);

    if (isEditing) {
      setIsEditing(false);
    } else {
      setSelectedTaskId(null);
    }
  };

  const selectedTask = selectedTaskId
    ? tasks.find((task) => task.id === selectedTaskId)
    : null;

  const client = selectedTaskId ? getClientForTask(selectedTaskId) : null;

  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "pending"
  );
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in_progress"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Tasks" subtitle="Manage your schedule and tasks" />
        <Button onClick={() => handleNewTask()}>
          <Plus size={16} className="mr-2" />
          New Task
        </Button>
      </div>

      <TaskFilters
        onFilterChange={handleFilterChange}
        onViewModeChange={handleViewModeChange}
        currentViewMode={viewMode}
      />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {isCreating ? (
          <TaskForm onCancel={handleCancelForm} onSave={handleSaveTask} />
        ) : isEditing && selectedTask ? (
          <TaskForm
            task={selectedTask}
            isEditing={true}
            onCancel={handleCancelForm}
            onSave={handleSaveTask}
          />
        ) : selectedTask ? (
          <TaskDetail
            task={selectedTask}
            client={client}
            onClose={() => setSelectedTaskId(null)}
            onEdit={() => handleEditTask(selectedTask.id)}
            onStatusChange={handleUpdateTaskStatus}
            onDelete={handleDeleteTask}
          />
        ) : viewMode === "list" ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {pendingTasks.length > 0 && (
              <TaskList
                tasks={pendingTasks}
                title="Pending Tasks"
                onSelectTask={handleSelectTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
            )}

            {inProgressTasks.length > 0 && (
              <TaskList
                tasks={inProgressTasks}
                title="In Progress"
                onSelectTask={handleSelectTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
            )}

            {completedTasks.length > 0 && (
              <TaskList
                tasks={completedTasks}
                title="Completed"
                onSelectTask={handleSelectTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
            )}

            {filteredTasks.length === 0 && (
              <div className="text-center p-8 bg-white rounded-lg border">
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or create a new task.
                </p>
                <Button onClick={() => handleNewTask()}>
                  <Plus size={16} className="mr-2" />
                  New Task
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="calendar-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CalendarView
              tasks={filteredTasks}
              onSelectTask={handleSelectTask}
              onAddTask={handleNewTask}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
