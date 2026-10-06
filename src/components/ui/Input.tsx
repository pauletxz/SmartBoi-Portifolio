import React, { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, ...props }, ref) => {
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const describedBy = error ? errorId : helperText ? helperId : props["aria-describedby"];

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--text-primary)]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`
            flex h-11 w-full rounded-md border border-[var(--border-soft)] bg-[var(--surface-light)] px-3 py-2 text-sm 
            placeholder:text-gray-400 
            focus:outline-none focus:ring-2 focus:ring-[var(--action-cta)] focus:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p id={errorId} className="text-sm text-red-600 mt-1">{error}</p>}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-[var(--text-muted)] mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
