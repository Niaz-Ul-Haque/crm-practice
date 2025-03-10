// src/components/policies/PolicyForm.tsx
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
import { useRouter } from "next/navigation";
import { clientsData } from "@/data/clientsData";
import { PolicyType, PolicyStatus, policyProviders } from "@/data/policiesData";
import { formatPolicyType } from "@/lib/formatters";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const emptyPolicy = {
  id: "",
  policyNumber: "",
  clientId: "",
  type: "home" as PolicyType,
  provider: "ABC Insurance",
  status: "active" as PolicyStatus,
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split("T")[0],
  premium: 0,
  coverageAmount: 0,
  description: "",
  paymentFrequency: "annual" as
    | "monthly"
    | "quarterly"
    | "semiannual"
    | "annual",
  lastUpdated: new Date().toISOString(),
};

interface PolicyFormProps {
  policy?: any;
  isEditing?: boolean;
}

const PolicyForm: React.FC<PolicyFormProps> = ({
  policy = emptyPolicy,
  isEditing = false,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState(policy);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: isEditing ? "Policy Updated" : "Policy Created",
        description: `Policy ${formData.policyNumber || "new"} has been ${
          isEditing ? "updated" : "created"
        } successfully.`,
      });

      router.push(isEditing ? `/policies/${policy.id}` : "/policies");
    }, 1000);
  };

  const policyTypes: PolicyType[] = [
    "home",
    "auto",
    "life",
    "health",
    "business",
    "renters",
    "umbrella",
  ];
  const policyStatuses: PolicyStatus[] = [
    "active",
    "pending",
    "expired",
    "cancelled",
  ];
  const paymentFrequencies = ["monthly", "quarterly", "semiannual", "annual"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Policy" : "Add New Policy"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="e.g., HOM-10001"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientId">Client</Label>
                <Select
                  name="clientId"
                  value={formData.clientId}
                  onValueChange={(value) =>
                    handleSelectChange("clientId", value)
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

              <div className="space-y-2">
                <Label htmlFor="type">Policy Type</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {policyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatPolicyType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select
                  name="provider"
                  value={formData.provider}
                  onValueChange={(value) =>
                    handleSelectChange("provider", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {policyProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {policyStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                <Select
                  name="paymentFrequency"
                  value={formData.paymentFrequency}
                  onValueChange={(value) =>
                    handleSelectChange("paymentFrequency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentFrequencies.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="premium">Premium</Label>
                <Input
                  id="premium"
                  name="premium"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.premium}
                  onChange={handleNumberChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverageAmount">Coverage Amount</Label>
                <Input
                  id="coverageAmount"
                  name="coverageAmount"
                  type="number"
                  min="0"
                  value={formData.coverageAmount}
                  onChange={handleNumberChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Enter policy details and notes..."
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.clientId}
              className="relative overflow-hidden"
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isSubmitting ? "opacity-0" : "opacity-100"
                }`}
              >
                {isEditing ? "Update Policy" : "Create Policy"}
              </span>
              {isSubmitting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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

export default PolicyForm;
