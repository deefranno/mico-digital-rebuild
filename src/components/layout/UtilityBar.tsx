import { utilityLinks } from "@/data/site";
import { Search } from "lucide-react";
import { Link } from "react-router";

interface UtilityBarProps {
  onOpenSearch: () => void;
}

/**
 * Slim black utility bar above the main header. Hidden below the lg
 * breakpoint to keep mobile chrome minimal.
 */
export function UtilityBar({ onOpenSearch }: UtilityBarProps) {
  return (
    <div className="hidden bg-black text-white lg:block">
      <div className="container-site flex h-10 items-center justify-between">
        <nav aria-label="Utility links">
          <ul className="flex items-center gap-6 text-xs">
            {utilityLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-white/75 transition-colors hover:text-mico-gold"
                >
                  {link.label}
                </Link>
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
