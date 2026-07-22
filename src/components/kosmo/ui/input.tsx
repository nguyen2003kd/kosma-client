import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-extrabold tracking-[0.04em] text-ink"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "flex h-12 w-full rounded-[10px] border border-mutedLine bg-[#fbfcfb] px-3 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-black-700 focus:outline-none focus:ring-4 focus:ring-black-700/08 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/08",
          className
        )}
        {...props}
      />
      {error && <p className="text-[13px] font-bold text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ className, label, error, id, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-extrabold tracking-[0.04em] text-ink"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "flex min-h-[112px] w-full rounded-[10px] border border-mutedLine bg-[#fbfcfb] px-3 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-black-700 focus:outline-none focus:ring-4 focus:ring-black-700/08 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/08",
          className
        )}
        {...props}
      />
      {error && <p className="text-[13px] font-bold text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  className,
  label,
  error,
  id,
  options,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-extrabold tracking-[0.04em] text-ink"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "flex h-12 w-full rounded-[10px] border border-mutedLine bg-[#fbfcfb] px-3 py-3 text-sm text-ink focus:border-black-700 focus:outline-none focus:ring-4 focus:ring-black-700/08 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/08",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" className="text-gray-500">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[13px] font-bold text-red-500">{error}</p>}
    </div>
  );
}
