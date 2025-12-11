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
  Phone: ["phone", "required", "min:10", "max:10"],
  Email: ["email", "required"],
  Message: [""],
};

const FormAdvise = () => {
  const [form, setForm] = useState<FormType>({ ...emptyForm });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateModelValue = (field: keyof FormType) => {
    return (value: string | boolean | string[]) => {
      setForm((prev) => {
        // Xử lý cho các trường khác
        return {
          ...prev,
          [field]: Array.isArray(value) ? value.map(String) : String(value),
        };
      });

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(form, rules);
    setErrors(validationErrors);
    setIsSubmit(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setForm({ ...emptyForm });
      setErrors({});
      setIsSubmit(false);
      setIsLoading(false);
      alert("Form submitted successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
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
            placeholder: "Your mail",
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
            type: "number", // Thay đổi từ "text" thành "number"
            placeholder: "Your phone number",
            name: "Phone",
            fieldName: "Phone",
            label: "Phone number (optional)",
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
          <div>{isLoading ? "IN PROGRESS..." : "SEND"}</div>
          {isLoading && <i className="gg-spinner"></i>}
      </button>
    </div>
  );
};

export default FormAdvise;
