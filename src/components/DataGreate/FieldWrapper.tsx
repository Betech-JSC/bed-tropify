import React, { useState, useEffect } from "react";

interface FieldType {
  name: string;
  type?: string;
  placeholder?: string;
  fieldName: string;
  label?: string;
  options?: OptionType[] | Record<string, OptionType>;
  readonly?: boolean;
  max?: string | number;
  min?: string | number;
  rows?: number;
  rules?: Record<string, string[]>;
}

type OptionType =
  | string
  | { id?: string | number; name?: string; [key: string]: unknown };

interface FormFieldProps {
  field: FieldType;
  modelValue: string | boolean | string[];
  isCart?: boolean;
  isPopup?: boolean;
  isContact?: boolean;
  onUpdateModelValue: (value: string | boolean | string[]) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  modelValue,
  isCart,
  isPopup,
  isContact,
  onUpdateModelValue,
  error,
}) => {
  const [fieldId, setFieldId] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [open, setOpen] = useState(false); // ✅ đưa ra ngoài

  useEffect(() => {
    setFieldId(Math.random().toString(36).substr(2, 9));
    if (field.rules?.[field.fieldName]?.includes("required")) {
      setIsRequired(true);
    }
  }, [field]);

  const commonInputProps = {
    name: field.name,
    id: field.name,
    readOnly: field.readonly ?? false,
    value:
      typeof modelValue === "boolean"
        ? modelValue
          ? "true"
          : ""
        : modelValue ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onUpdateModelValue(e.target.value),
    placeholder: field.placeholder,
    autoComplete: "off",
    className: isCart ? "input-cart" : "input-form",
  };

  const commonLabelProps = {
    htmlFor: field.name,
    className: `block text-gray-700 font-medium label-2 ${
      isContact ? "lg:mb-1.5 mb-1 text-gray-700" : "mb-[2px] text-white"
    }`,
  };

  /* ------------ Input Text / Email / Password ------------ */
  if (!field.type || ["text", "email", "password"].includes(field.type)) {
    return (
      <div className="space-y-1">
        {field.label && <label {...commonLabelProps}>{field.label}</label>}
        <input
          {...commonInputProps}
          type={field.type ?? "text"}
          max={field.max ?? ""}
          min={field.min ?? ""}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Number ------------ */
  if (field.type === "number") {
    return (
      <div className="space-y-1">
        {field.label && <label {...commonLabelProps}>{field.label}</label>}
        <input
          {...commonInputProps}
          type="number"
          inputMode="numeric"
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const charCode = e.charCode;
            return charCode >= 48 && charCode <= 57;
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            return e.keyCode !== 69 && e.keyCode !== 190;
          }}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Textarea ------------ */
  if (field.type === "textarea") {
    return (
      <div className="space-y-1">
        <label {...commonLabelProps}>
          {field.label} {isPopup && <span>*</span>}
        </label>
        <textarea
          id={field.name}
          rows={field.rows ?? 3}
          placeholder={field.placeholder ?? ""}
          className={isCart ? "input-area-cart" : "input-area"}
          readOnly={field.readonly ?? false}
          value={
            typeof modelValue === "string"
              ? modelValue
              : modelValue === undefined || modelValue === null
              ? ""
              : String(modelValue)
          }
          autoComplete="off"
          onChange={(e) => onUpdateModelValue(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Custom Select (select_single) ------------ */
  if (field.type === "select_single") {
    const handleSelect = (value: string) => {
      onUpdateModelValue(value);
      setOpen(false);
    };

    const optionsArray = Array.isArray(field.options)
      ? field.options
      : field.options
      ? Object.values(field.options)
      : [];

    const selectedOption =
      optionsArray.find((opt) =>
        typeof opt === "string"
          ? opt === modelValue
          : opt.id?.toString() === modelValue
      ) || null;

    const selectedLabel =
      typeof selectedOption === "string"
        ? selectedOption
        : selectedOption?.name;

    return (
      <div className="space-y-1 relative">
        {field.label && (
          <label
            className="text-gray-700 font-[450] mb-[2px] block"
            htmlFor={field.name}
          >
            {field.label} {isRequired && <span className="text-gray-700">*</span>}
          </label>
        )}
        <div
          className={`w-full border rounded px-3 py-2 cursor-pointer bg-white relative ${
            open ? "border-primary" : "border-gray-300"
          }`}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`${
              !modelValue ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {selectedLabel || field.placeholder || "Chọn..."}
          </span>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M13 6.5L8 11.5L3 6.5"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {open && (
          <ul className="absolute left-0 mt-1 w-full border rounded bg-white shadow z-20 max-h-48 overflow-y-auto">
            {optionsArray.map((opt, idx) => {
              const value =
                typeof opt === "string" ? opt : opt.id?.toString() || "";
              const label = typeof opt === "string" ? opt : opt.name || "";
              return (
                <li
                  key={idx}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    modelValue === value ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => handleSelect(value)}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Custom Checkbox List ------------ */
  if (field.type === "checkbox_list") {
    const values = Array.isArray(modelValue) ? modelValue : [];

    const toggleValue = (val: string) => {
      const updated = values.includes(val)
        ? values.filter((v) => v !== val)
        : [...values, val];
      onUpdateModelValue(updated);
    };

    return (
      <div className="space-y-1">
        {field.label && <label {...commonLabelProps}>{field.label}</label>}
        <div className="flex flex-col gap-2">
          {Array.isArray(field.options) &&
            field.options.map((opt, idx) => {
              const isChecked = values.includes(opt as string);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleValue(opt as string)}
                >
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${
                      isChecked ? "bg-primary border-primary" : "border-gray-400"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700">{opt as string}</span>
                </div>
              );
            })}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Radio ------------ */
  if (field.type === "radio") {
    return (
      <div className="space-y-1">
        {Object.entries(field.options ?? {}).map(([key, item]) => (
          <div className="radio" key={key}>
            <input
              type="radio"
              value={
                typeof item === "string"
                  ? key
                  : (item as { id?: string | number })?.id?.toString() || key
              }
              id={`${fieldId}_${key}`}
              name={fieldId}
              checked={
                typeof item === "object" && "id" in item && modelValue
                  ? (item?.id?.toString() ?? "") === modelValue.toString()
                  : false
              }
              onChange={(e) => onUpdateModelValue(e.target.value)}
            />
            <label htmlFor={`${fieldId}_${key}`}>
              {typeof item === "object" && "name" in item
                ? String(item.name)
                : String(item)}
            </label>
            <span></span>
          </div>
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Checkbox ------------ */
  if (field.type === "checkbox") {
    return (
      <div className="space-y-1">
        <div className="checkbox">
          <input
            type="checkbox"
            id={fieldId}
            name={fieldId}
            checked={!!modelValue}
            onChange={(e) => onUpdateModelValue(e.target.checked)}
          />
          <label htmlFor={fieldId}>{field.label}</label>
          <span></span>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ------------ Date ------------ */
  if (field.type === "date" || field.type === "datetime-local") {
    return (
      <div className="space-y-1">
        <label {...commonLabelProps}>
          {field.label} {isPopup && <span>*</span>}
        </label>
        <input
          id={field.name}
          type={field.type}
          className="input-form"
          readOnly={field.readonly ?? false}
          value={
            typeof modelValue === "string" || typeof modelValue === "number"
              ? modelValue
              : Array.isArray(modelValue)
              ? modelValue
              : modelValue === true
              ? "true"
              : ""
          }
          onChange={(e) => onUpdateModelValue(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return null;
};

export default FormField;
