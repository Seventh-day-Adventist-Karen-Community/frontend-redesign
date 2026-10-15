import { ChevronDown } from "lucide-react";

// Floating-label fields for the giving form: the label sits inside the box
// and lifts onto the border when the field is focused or filled.

const FLOAT_LABEL =
  "absolute start-1 top-2 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300";

export const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  inputMode,
  autoComplete,
  min,
  step,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  inputMode?: "text" | "tel" | "email" | "decimal" | "numeric";
  autoComplete?: string;
  min?: number;
  step?: number | "any";
}) => (
  <div>
    <div className="relative flex flex-col">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder=" "
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        step={type === "number" ? step ?? "any" : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-2.5 pt-3 text-sm text-gray-900 focus:outline-none focus:ring-0 ${
          error ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-maroon-600"
        }`}
      />
      <label
        htmlFor={id}
        className={`${FLOAT_LABEL} cursor-text peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-maroon-600`}
      >
        {label}
      </label>
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
        {error}
      </p>
    )}
  </div>
);

export const FloatingSelect = ({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) => (
  <div className="relative flex flex-col">
    <select
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-3 pr-9 text-sm text-gray-900 focus:border-maroon-600 focus:outline-none focus:ring-0"
    >
      {children}
    </select>
    <label htmlFor={id} className={`${FLOAT_LABEL} peer-focus:text-maroon-600`}>
      {label}
    </label>
    <ChevronDown
      size={18}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
  </div>
);

export const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex items-center gap-3 text-sm text-gray-700"
  >
    <span
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-maroon-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </span>
    {label}
  </button>
);
