import React from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number | string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = "w-5 h-5",
  size = 20,
  ...props
}) => {
  const iconDict = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number | string }>>;
  const IconComponent = iconDict[name] || LucideIcons.Wrench;

  return <IconComponent className={className} size={size} {...props} />;
};
