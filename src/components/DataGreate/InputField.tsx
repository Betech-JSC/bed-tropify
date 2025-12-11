import React, { useState, useRef, useEffect } from "react";
import { ModelValueType } from "@/data/types";

interface FieldType {
  name?: string;
  type: string;
  placeholder?: string;
  fieldName?: string;
  label?: string;
  options?: string[];
  errorText?: string;
  key?: string;
  rows?: number;
}

interface InputFieldProps {
  field: FieldType;
  modelValue?: ModelValueType;
  onUpdate?: (value: ModelValueType) => void;
  isCart?: boolean;
  isPopup?: boolean;
  isContact?: boolean;
  value?: ModelValueType; // Used in radio_control
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  field,
  modelValue,
  onUpdate,
  value,
  rows,
  // Xóa các biến không sử dụng: isCart, isPopup, isContact
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { type, value: inputValue } = target;
    let result: ModelValueType;

    if (type === "checkbox" && target instanceof HTMLInputElement) {
      const checked = target.checked;
      const prev = Array.isArray(modelValue) ? (modelValue as string[]) : [];
      result = checked
        ? [...prev, inputValue]
        : prev.filter((item) => item !== inputValue);
    } else if (type === "number") {
      const numValue = parseFloat(inputValue);
      result = isNaN(numValue) ? inputValue : numValue;
    } else {
      result = inputValue;
    }

    onUpdate?.(result);
  };

  const handleRadioChange = (val: string) => {
    onUpdate?.(val);
  };

  const handleDropdownSelect = (option: string) => {
    onUpdate?.(option);
    setIsDropdownOpen(false);
  };

  // Helper function to get safe string value
  const getSafeStringValue = (val: ModelValueType): string => {
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return val.toString();
    if (val instanceof Date) return val.toISOString().slice(0, 16);
    return String(val);
  };

  // Helper function to get safe number value
  const getSafeNumberValue = (val: ModelValueType): string => {
    if (val === null || val === undefined) return "";
    if (typeof val === "number") return val.toString();
    if (typeof val === "string" && !isNaN(Number(val))) return val;
    return "";
  };

  // Get display value for dropdown
  const getSelectedDisplayValue = (): string => {
    const stringValue = getSafeStringValue(modelValue ?? null);
    return stringValue || field.placeholder || "Select an option";
  };

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <input
          type={field.type}
          placeholder={field.placeholder || ""}
          value={getSafeStringValue(modelValue ?? null)}
          onChange={handleChange}
          className="input"
        />
      );

    case "number":
      return (
        <input
          type="number"
          placeholder={field.placeholder || ""}
          value={getSafeNumberValue(modelValue ?? null)}
          onChange={handleChange}
          className="input"
        />
      );

    case "textarea":
      return (
        <textarea
          placeholder={field.placeholder || ""}
          value={getSafeStringValue(modelValue ?? null)}
          onChange={handleChange}
          rows={rows || field.rows || 3}
          className="textarea"
        />
      );

    case "select_single":
    case "select_administrative":
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              !getSafeStringValue(modelValue ?? null) ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            <span className="block truncate">
              {getSelectedDisplayValue()}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {field.placeholder && (
                <button
                  type="button"
                  onClick={() => handleDropdownSelect("")}
                  className="w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                >
                  {field.placeholder}
                </button>
              )}
              {field.options?.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDropdownSelect(opt)}
                  className={`w-full px-4 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 transition-colors ${
                    getSafeStringValue(modelValue ?? null) === opt
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'text-gray-900'
                  }`}
                >
                  <span className="block truncate">{opt}</span>
                  {getSafeStringValue(modelValue ?? null) === opt && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      );

    case "checkbox_list":
      return (
        <div className="space-y-4">
          {/* Title/Header */}
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
            <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Select Options
            </p>
          </div>

          {field.options?.map((opt, idx) => {
            const isChecked = Array.isArray(modelValue) && (modelValue as string[]).includes(opt);
            return (
              <label 
                key={idx} 
                className="
                  flex items-center space-x-4 cursor-pointer group
                  p-3 rounded-xl border-2 border-transparent
                  hover:border-emerald-200 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50
                  transition-all duration-300 ease-in-out
                  relative overflow-hidden
                "
              >
                {/* Background glow effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-teal-100/50
                  opacity-0 transition-opacity duration-300
                  ${isChecked ? 'opacity-100' : 'group-hover:opacity-50'}
                `}></div>

                <div className="relative z-10 flex items-center space-x-4 w-full">
                  {/* Custom Checkbox */}
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      value={opt}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`
                        w-6 h-6 rounded-lg border-2 transition-all duration-300
                        flex items-center justify-center
                        ${isChecked
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 shadow-lg shadow-emerald-200' 
                          : 'bg-white border-slate-300 group-hover:border-emerald-400 group-hover:shadow-md'
                        }
                      `}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white transform scale-0 animate-in zoom-in-75 duration-200"
                          style={{ animation: isChecked ? 'checkmark 0.3s ease-in-out forwards' : '' }}
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
                    
                    {/* Ripple effect */}
                    {isChecked && (
                      <div className="absolute inset-0 rounded-lg bg-emerald-400 animate-ping opacity-20"></div>
                    )}
                  </div>

                  {/* Label with enhanced styling */}
                  <div className="flex-1 min-w-0">
                    <span className={`
                      block text-sm font-medium transition-all duration-200
                      ${isChecked 
                        ? 'text-emerald-800 font-semibold' 
                        : 'text-slate-700 group-hover:text-slate-900'
                      }
                    `}>
                      {opt}
                    </span>
                    
                    {/* Subtle underline effect */}
                    <div className={`
                      h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                      transition-all duration-300 rounded-full
                      ${isChecked ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-30'}
                    `}></div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex-shrink-0">
                    {isChecked && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                          Selected
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Left border accent */}
                <div className={`
                  absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500
                  transition-all duration-300 rounded-r-full
                  ${isChecked ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                `}></div>
              </label>
            );
          })}

          {/* Summary */}
          {Array.isArray(modelValue) && modelValue.length > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-emerald-800">
                  {modelValue.length} option{modelValue.length !== 1 ? 's' : ''} selected
                </span>
              </div>
            </div>
          )}
        </div>
      );

    case "radio":
    case "radio_custom":
      return (
        <div className="space-y-3">
          {field.options?.map((opt, idx) => {
            const isSelected = modelValue === opt;
            return (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name={field.fieldName || `radio_${field.type}`}
                    checked={isSelected}
                    value={opt}
                    onChange={() => handleRadioChange(opt)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-300 group-hover:border-blue-400'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  isSelected ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {opt}
                </span>
              </label>
            );
          })}
        </div>
      );

    case "radio_control":
      const radioValue = value !== undefined ? value : modelValue;
      return (
        <div className="space-y-3">
          {field.options?.map((opt, idx) => {
            const isSelected = radioValue === opt;
            return (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name={field.fieldName || `radio_control_${idx}`}
                    checked={isSelected}
                    value={opt}
                    onChange={() => onUpdate?.(opt)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-300 group-hover:border-blue-400'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  isSelected ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {opt}
                </span>
              </label>
            );
          })}
        </div>
      );

    case "date":
      return (
        <input
          type="date"
          value={
            modelValue instanceof Date
              ? modelValue.toISOString().slice(0, 10)
              : getSafeStringValue(modelValue ?? null)
          }
          onChange={(e) => onUpdate?.(e.target.value)}
          className="input"
        />
      );

    default:
      console.warn(`Unsupported field type: ${field.type}`);
      return (
        <div className="unsupported-field">
          <p className="text-red-500">Unsupported field type: {field.type}</p>
        </div>
      );
  }
};

export default InputField;
