import { utilityLinks as fallbackUtilityLinks } from "@/data/site";
import { getUtilityLinks } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { Search } from "lucide-react";
import { NavLink } from "./NavLink";

interface UtilityBarProps {
  onOpenSearch: () => void;
}

/**
 * Slim black utility bar above the main header. Hidden below the lg
 * breakpoint to keep mobile chrome minimal. Links come from the content
 * service (WordPress menus when configured, mock data otherwise).
 */
export function UtilityBar({ onOpenSearch }: UtilityBarProps) {
  const { data } = useAsyncData(getUtilityLinks);
  const links = data ?? fallbackUtilityLinks;

  return (
    <div className="hidden bg-black text-white lg:block">
      <div className="container-site flex h-10 items-center justify-between">
        <nav aria-label="Utility links">
          <ul className="flex items-center gap-6 text-xs">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className="text-white/75 transition-colors hover:text-mico-gold"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-1.5 text-xs text-white/75 transition-colors hover:text-mico-gold"
        >
          <Search aria-hidden="true" className="size-3.5" />
          Search
        </button>
      </div>
    </div>
  );
}
