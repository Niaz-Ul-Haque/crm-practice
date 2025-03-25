// src/components/clients/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

interface ContactFormProps {
  clientName: string;
  clientEmail: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  clientName,
  clientEmail,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(clientEmail);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ subject: '', message: '' });
      toast({
        title: 'Message sent',
        description: `Your message to ${clientName} has been sent.`,
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact {clientName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
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
              className="min-h-[120px]"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden"
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isSubmitting ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Send Message
              </span>
              {isSubmitting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
