// src/components/tasks/CalendarView.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Task } from '@/data/tasksData';
import { getClientForTask } from '@/data/tasksData';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CalendarViewProps {
  tasks: Task[];
  date?: Date;
  onSelectTask?: (taskId: string) => void;
  onAddTask?: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  date = new Date(),
  onSelectTask,
  onAddTask,
}) => {
  const [currentDate, setCurrentDate] = useState(date);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getTasksForDate = (day: number) => {
    const date = new Date(year, month, day);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= startOfDay && taskDate <= endOfDay;
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDaysToShow = firstDayOfMonth + daysInMonth;
    const totalCells = Math.ceil(totalDaysToShow / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDayOfMonth + 1;

      if (dayNumber <= 0 || dayNumber > daysInMonth) {
        days.push(
          <div key={`empty-${i}`} className="h-24 bg-gray-50">
            <div className="h-full"></div>
          </div>
        );
      } else {
        const dailyTasks = getTasksForDate(dayNumber);
        const hasHighPriorityTask = dailyTasks.some(
          (task) => task.priority === 'high'
        );

        days.push(
          <div
            key={dayNumber}
            className={`h-24 border relative overflow-hidden hover:bg-gray-50 ${
              isToday(dayNumber) ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            <div className="p-1">
              <div className="flex justify-between items-start">
                <span
                  className={`inline-block w-6 h-6 text-center ${
                    isToday(dayNumber)
                      ? 'bg-blue-600 text-white rounded-full'
                      : ''
                  }`}
                >
                  {dayNumber}
                </span>
                {hasHighPriorityTask && (
                  <span className="block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                )}
              </div>

              <div className="mt-1 space-y-1 max-h-16 overflow-hidden">
                {dailyTasks.map((task, index) => {
                  if (index >= 2) return null;

                  return (
                    <div
                      key={task.id}
                      onClick={() => onSelectTask && onSelectTask(task.id)}
                      className={`text-xs truncate cursor-pointer p-1 rounded ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-purple-800'
                      }`}
                    >
                      {task.title}
                    </div>
                  );
                })}

                {dailyTasks.length > 2 && (
                  <div className="text-xs text-gray-500 truncate">
                    +{dailyTasks.length - 2} more
                  </div>
                )}
              </div>

              <div className="absolute bottom-1 right-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full opacity-0 hover:opacity-100 hover:bg-gray-200 group-hover:opacity-100"
                  onClick={() => {
                    if (onAddTask) {
                      onAddTask(new Date(year, month, dayNumber));
                    }
                  }}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          </div>
        );
      }
    }

    return days;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>
              {monthNames[month]} {year}
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7">
            {dayNames.map((day) => (
              <div
                key={day}
                className="h-10 flex items-center justify-center text-sm font-medium text-gray-500 border-b bg-gray-50"
              >
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CalendarView;
