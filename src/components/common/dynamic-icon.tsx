import * as Icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = (
    Icons as unknown as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
