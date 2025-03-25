// src/components/communication/NewMessageForm.tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Paperclip, Calendar, Clock, X } from 'lucide-react';
import { clientsData } from '@/data/clientsData';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface NewMessageFormProps {
  onCancel?: () => void;
  onSend?: (message: {
    type: string;
    clientId: string;
    subject: string;
    message: string;
    attachments: string[];
    schedule: boolean;
    scheduledDate: string;
    scheduledTime: string;
  }) => void;
}

const NewMessageForm: React.FC<NewMessageFormProps> = ({
  onCancel,
  onSend,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: 'email',
    clientId: '',
    subject: '',
    message: '',
    attachments: [] as string[],
    schedule: false,
    scheduledDate: '',
    scheduledTime: '',
  });
  const [attachmentName, setAttachmentName] = useState('');
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

  const toggleSchedule = () => {
    setFormData((prev) => ({ ...prev, schedule: !prev.schedule }));
  };

  const addAttachment = () => {
    if (attachmentName.trim()) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, attachmentName.trim()],
      }));
      setAttachmentName('');
    }
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientId || !formData.subject || !formData.message) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all required fields before sending.',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (onSend) {
        onSend(formData);
      }

      toast({
        title: formData.schedule ? 'Message Scheduled' : 'Message Sent',
        description: formData.schedule
          ? 'Your message has been scheduled for sending.'
          : 'Your message has been sent successfully.',
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
        <Card className="h-full">
          <CardHeader className="border-b">
            <CardTitle>New Message</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Message Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientId">Client</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) =>
                    handleSelectChange('clientId', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsData.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="flex items-center">
                <Input
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="Enter attachment name"
                  className="mr-2"
                />
                <Button type="button" variant="outline" onClick={addAttachment}>
                  <Paperclip size={16} className="mr-2" />
                  Add
                </Button>
              </div>

              {formData.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <span>{attachment}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4 flex items-center">
              <Button
                type="button"
                variant={formData.schedule ? 'default' : 'outline'}
                size="sm"
                onClick={toggleSchedule}
                className="mr-4"
              >
                <Calendar size={16} className="mr-2" />
                {formData.schedule ? 'Scheduled' : 'Schedule for later'}
              </Button>

              {formData.schedule && (
                <div className="flex items-center space-x-2">
                  <Input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    className="w-40"
                  />
                  <Input
                    type="time"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    className="w-32"
                  />
                  <Clock size={16} className="text-gray-500" />
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  toast({
                    title: 'Draft Saved',
                    description: 'Your message has been saved as a draft.',
                  });
                  if (onCancel) onCancel();
                }}
              >
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {formData.schedule ? 'Schedule' : 'Send'}
                {isSubmitting && (
                  <span className="ml-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </span>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  );
};

export default NewMessageForm;
