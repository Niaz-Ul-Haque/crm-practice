// src/components/clients/ClientNotes.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Save } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientNotesProps {
  clientId: string;
  initialNotes: Note[];
}

const ClientNotes: React.FC<ClientNotesProps> = ({
  clientId,
  initialNotes,
}) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  console.log(clientId);
  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [note, ...prev]);
    setNewNote("");
    setIsAddingNote(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notes</CardTitle>
        {!isAddingNote && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNote(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {isAddingNote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <Textarea
                placeholder="Enter a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[100px] mb-2"
              />
              <div className="flex space-x-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingNote(false);
                    setNewNote("");
                  }}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddNote}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border rounded-md"
              >
                <p className="whitespace-pre-wrap">{note.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No notes yet. Add a note to keep track of important client
              information.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientNotes;
