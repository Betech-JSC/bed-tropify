"use client";

import React, { useState } from "react";
import FieldWrapper from "@/components/DataGreate/FieldWrapper";
import { validateForm } from "@/lib/validator";

type FormType = {
  Name: string;
  Phone: string;
  Email: string;
  Message: string;
};

type ErrorsType = Partial<Record<keyof FormType, string>>;

const emptyForm: FormType = {
  Name: "",
  Phone: "",
  Email: "",
  Message: "",
};

const rules: Record<string, string[]> = {
  Name: ["required", "min:3", "max:25"],
  Phone: ["phone", "required", "min:10", "max:10"], // Giữ nguyên như ban đầu
  Email: ["email", "required"],
  Message: ["required", "min:10", "max:500"], // Thêm validation cho Message
};

const FormAdvise = () => {
  const [form, setForm] = useState<FormType>({ ...emptyForm });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleUpdateModelValue = (field: keyof FormType) => {
    return (value: string | boolean | string[]) => {
      setForm((prev) => ({
        ...prev,
        [field]: Array.isArray(value) ? value.map(String) : String(value),
      }));

      // Clear error khi user nhập lại
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      // Clear submit status khi user nhập lại
      if (submitStatus.type) {
        setSubmitStatus({ type: null, message: "" });
      }
    };
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(form, rules);
    setErrors(validationErrors);
    setIsSubmit(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    // Log form data before sending (for debugging)
    console.log("📤 Sending form data:", {
      Name: form.Name,
      Email: form.Email,
      Phone: form.Phone,
      Message: form.Message,
    });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: form.Name.trim(),
          Email: form.Email.trim(),
          Phone: form.Phone.trim(),
          Message: form.Message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setForm({ ...emptyForm });
        setErrors({});
        setIsSubmit(false);
      } else {
        // Error from API
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      // Network error
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="space-y-3 body-1">
        <FieldWrapper
          field={{
            rules,
            type: "text",
            placeholder: "Your name",
            name: "Name",
            fieldName: "Name",
            label: "Name",
          }}
          modelValue={form.Name}
          onUpdateModelValue={handleUpdateModelValue("Name")}
          isContact
          error={isSubmit ? errors.Name : undefined}
        />

        <FieldWrapper
          field={{
            rules,
            type: "email",
            placeholder: "your.email@example.com",
            name: "Email",
            fieldName: "Email",
            label: "Email",
          }}
          modelValue={form.Email}
          onUpdateModelValue={handleUpdateModelValue("Email")}
          isContact
          error={isSubmit ? errors.Email : undefined}
        />

        <FieldWrapper
          field={{
            rules,
            type: "number",
            placeholder: "Your phone number",
            name: "Phone",
            fieldName: "Phone",
            label: "Phone number",
          }}
          modelValue={form.Phone}
          onUpdateModelValue={handleUpdateModelValue("Phone")}
          isContact
          error={isSubmit ? errors.Phone : undefined}
        />

        <FieldWrapper
          field={{
            rules,
            type: "textarea",
            placeholder: "Your message",
            name: "Message",
            fieldName: "Message",
            label: "Message",
          }}
          modelValue={form.Message}
          onUpdateModelValue={handleUpdateModelValue("Message")}
          isContact
          error={isSubmit ? errors.Message : undefined}
        />
      </div>

      <button
        type="button"
        className="btn btn-secondary w-full"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <div>{isLoading ? "SENDING..." : "SEND MESSAGE"}</div>
        {isLoading && <i className="gg-spinner"></i>}
      </button>
    </div>
  );
};

export default FormAdvise;
