import { Link } from "react-router";
import type { MouseEventHandler, ReactNode } from "react";

interface NavLinkProps {
  to: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
  children: ReactNode;
}

/**
 * Link used by the header/footer navigation. Internal app routes render a
 * react-router <Link> (SPA navigation); external http(s) URLs — e.g. custom
 * links added in WordPress menus — render a plain anchor that opens in a new
 * tab.
 */
export function NavLink({ to, className, onClick, children, ...rest }: NavLinkProps) {
  const external = /^https?:\/\//i.test(to);
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
