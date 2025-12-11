"use strict";

type ValidationResult = {
  valid: boolean;
  message: string;
};

// Thêm type ModelValueType từ file types.ts
import { ModelValueType } from "@/data/types";

function validate(
  value: ModelValueType, // Thay any bằng ModelValueType
  rule: string,
  fieldName: string
): ValidationResult {
  const type = rule.split(":")[0];
  const condition = rule.split(":")[1] ?? null;

  switch (type) {
    case "array":
      return {
        valid: Array.isArray(value),
        message: `${fieldName} must be an array`,
      };

    case "required":
      return {
        valid: !!value && (Array.isArray(value) ? value.length > 0 : true),
        message: `${fieldName} is required`,
      };

    case "email":
      const regEx =
        /^[\w.!?#$%&'=~|{}`+*^][\w\-.!?#$%&'=~|{}`+*^]*@((xn--)?[\w]+([-][\w]+)*\.)+[a-z]{2,}$/i;
      return {
        valid: value ? regEx.test(String(value)) : true,
        message: `${fieldName} is not a valid email`,
      };

    case "date":
      return {
        valid:
          !isNaN(new Date(value as string | number | Date).getTime()) &&
          !isNaN(new Date(value as string | number | Date).getTime()),
        message: `${fieldName} is not a valid date`,
      };

    case "string":
      return {
        valid: typeof value === "string",
        message: `${fieldName} must be a string`,
      };

    case "phone":
      const regex = /^(84|19|0[2|3|5|7|8|9])+([0-9]{6,10})\b/g;
      return {
        valid: regex.test(String(value)),
        message: `${fieldName} is not a valid phone number`,
      };

    case "in":
      const conditions = condition ? condition.split(",") : [];
      const inValid = Array.isArray(value)
        ? value.every((element) => conditions.includes(String(element)))
        : value && conditions.includes(String(value));
      return {
        valid: inValid ? inValid : false,
        message: `${fieldName} must be one of ${conditions.join(", ")}`,
      };

    case "integer":
      return {
        valid: !isNaN(Number(value)),
        message: `${fieldName} must be an integer`,
      };

    case "min":
      if (!condition) return { valid: true, message: "" };
      const minValid = Array.isArray(value)
        ? value.length >= parseInt(condition)
        : String(value).length >= parseInt(condition);
      return {
        valid: minValid,
        message: `${fieldName} must be at least ${condition} characters`,
      };

    case "max":
      if (!condition) return { valid: true, message: "" };
      return {
        valid: String(value).length <= parseInt(condition),
        message: `${fieldName} must not exceed ${condition} characters`,
      };

    default:
      return { valid: true, message: "" };
  }
}

export function validateForm(
  formFields: Record<string, ModelValueType>, // Thay any bằng ModelValueType
  rules: Record<string, string[]>
) {
  const errors: Record<string, string> = {}; // Sửa từ let thành const
  for (const [fieldName, value] of Object.entries(formFields)) {
    const error = validateField(value, rules[fieldName], fieldName);
    if (error) {
      errors[fieldName] = error;
    }
  }
  return errors;
}

export function validateField(
  value: ModelValueType, // Thay any bằng ModelValueType
  rules?: string[],
  fieldName?: string
): string | null {
  if (rules === undefined || fieldName === undefined) return null;

  for (const rule of rules) {
    const { valid, message } = validate(value, rule, fieldName);
    if (!valid) {
      return message;
    }
  }
  return null;
}