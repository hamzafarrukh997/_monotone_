"use client";

import { useState } from "react";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { site, type NavItem } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type NextLinkHref = ComponentProps<typeof NextLink>["href"];

function NavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <NextLink
      href={href as unknown as NextLinkHref}
      onClick={onClick}
      className={cn(
        "rounded-sm text-sm text-fg/80 transition-colors hover:text-fg",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}

/** Desktop dropdown for a nav item that has children (Services). */
function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-sm text-sm text-fg/80 transition-colors hover:text-fg"
      >
        {item.label}
        <span aria-hidden="true" className="text-xs">
          ▾
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={item.label}
          className="absolute left-0 top-full z-20 w-64 pt-3"
        >
          <ul className="rounded-lg border border-border bg-surface p-2 shadow-card">
            <li>
              <NavAnchor
                href={item.href}
                className="block rounded-md px-3 py-2 font-medium hover:bg-surface-muted"
              >
                All {item.label.toLowerCase()}
              </NavAnchor>
            </li>
            {item.children?.map((child) => (
              <li key={child.href} role="none">
                <NavAnchor
                  href={child.href}
                  className="block rounded-md px-3 py-2 hover:bg-surface-muted"
                >
                  {child.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <NextLink
          href={"/" as unknown as NextLinkHref}
          className="text-base font-semibold tracking-tight text-fg"
        >
          {site.name}
        </NextLink>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) =>
            item.children ? (
              <NavDropdown key={item.href} item={item} />
            ) : (
              <li key={item.href}>
                <NavAnchor href={item.href}>{item.label}</NavAnchor>
              </li>
            ),
          )}
        </ul>

        <div className="hidden md:block">
          <Button href={site.cta.href} size="sm">
            {site.cta.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-md border border-border px-3 py-2 text-sm md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div id="mobile-menu" className="border-t border-border bg-surface md:hidden">
          <ul className="mx-auto flex max-w-page flex-col gap-1 px-4 py-4 sm:px-6">
            {site.nav.map((item) => (
              <li key={item.href}>
                <NavAnchor
                  href={item.href}
                  onClick={close}
                  className="block rounded-md px-2 py-2 hover:bg-surface-muted"
                >
                  {item.label}
                </NavAnchor>
                {item.children ? (
                  <ul className="ml-3 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavAnchor
                          href={child.href}
                          onClick={close}
                          className="block rounded-md px-2 py-1.5 text-fg/70 hover:bg-surface-muted"
                        >
                          {child.label}
                        </NavAnchor>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="mt-3">
              <Button href={site.cta.href} className="w-full" onClick={close}>
                {site.cta.label}
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
