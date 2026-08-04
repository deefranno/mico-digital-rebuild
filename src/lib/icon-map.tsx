import {
  BookOpen,
  Briefcase,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  Home,
  Library,
  Lightbulb,
  Music,
  Trophy,
  Users,
} from "lucide-react";

/** Data files store icons as string keys; this map resolves them. */
export const iconMap = {
  "book-open": BookOpen,
  briefcase: Briefcase,
  "file-text": FileText,
  globe: Globe,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
  home: Home,
  library: Library,
  lightbulb: Lightbulb,
  music: Music,
  trophy: Trophy,
  users: Users,
} as const;

export type IconKey = keyof typeof iconMap;

interface IconProps {
  name: string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/** Render an icon by data-file key. Falls back to BookOpen. */
export function Icon({ name, className, ...rest }: IconProps) {
  const Component =
    iconMap[name as IconKey] ?? BookOpen;
  return <Component aria-hidden="true" className={className} {...rest} />;
}
