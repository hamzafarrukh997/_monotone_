"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { ProjectRequestModal } from "@/components/layout/ProjectRequestModal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PROJECT_REQUEST_EVENT } from "@/lib/projectRequest";

type NextLinkHref = ComponentProps<typeof NextLink>["href"];

function Brand({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <NextLink
      href={"/" as unknown as NextLinkHref}
      aria-label={`${site.name} home`}
      data-on-dark={onDark}
      className="header-brand-chip pointer-events-auto inline-flex items-center gap-[9px]"
    >
      <Image
        src="/logo.svg"
        alt=""
        width={43}
        height={18}
        priority
        className={cn("h-[18px] w-[43px]", compact && "h-4 w-auto")}
      />
      <span
        className={cn(
          "header-brand-chip__name font-sans text-[20.6px] font-medium leading-none tracking-[-1.03px] text-fg",
          compact && "text-lg",
        )}
      >
        {site.name.toLowerCase()}
      </span>
    </NextLink>
  );
}

function MenuGlyph({ open = false }: { open?: boolean }) {
  return (
    <span className={cn("menu-glyph", open && "menu-glyph--open")} aria-hidden="true">
      <span className="menu-glyph__line" />
      <span className="menu-glyph__line" />
    </span>
  );
}

function NavPanel({
  id,
  open,
  onNavigate,
  className,
}: {
  id: string;
  open: boolean;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <div
      id={id}
      data-menu-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn("menu-flyout", className)}
    >
      <div className="menu-flyout__surface rounded-[16px] bg-accent shadow-card" />

      <div
        inert={!open}
        className="menu-flyout__content relative z-[2] flex h-full flex-col px-5 pb-5 pt-[22px] text-accent-foreground"
      >
        <nav aria-label="Primary" className="mt-2">
          <ul className="menu-flyout__nav-list">
            {site.nav.map((item) => (
              <li key={item.href} className="menu-reveal h-[39px] border-b border-accent-foreground">
                <NextLink
                  href={item.href as unknown as NextLinkHref}
                  onClick={onNavigate}
                  className="relative top-[9px] block font-sans text-[20px] font-normal leading-normal tracking-[-1.2px] text-accent-foreground transition-opacity hover:opacity-75"
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-flyout__button-container mt-auto">
          <Button
            href={home.hero.primaryCta.href}
            variant="ghost"
            size="md"
            onClick={onNavigate}
            className="menu-flyout__audit-cta h-[38px] border-[1.5px] border-accent-foreground px-4 text-[17px] leading-none tracking-[-0.85px] text-accent-foreground hover:bg-accent-foreground/10"
          >
            {home.hero.primaryCta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

function MenuControls({
  open,
  menuId,
  onToggle,
  onProjectOpen,
  projectOpen,
  compact = false,
}: {
  open: boolean;
  menuId: string;
  onToggle: () => void;
  onProjectOpen: () => void;
  projectOpen: boolean;
  compact?: boolean;
}) {
  return (
    <div
      data-menu-state={open ? "open" : "closed"}
      className={cn(
        "menu-controls pointer-events-auto flex items-center",
        "gap-2",
      )}
    >
      <span className="menu-controls__cta">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          aria-haspopup="dialog"
          aria-expanded={projectOpen}
          aria-controls="project-request-dialog"
          onClick={onProjectOpen}
          className={cn(
            "menu-controls__button home-heading-cta home-heading-cta--header shrink-0 px-8 text-[18px] font-[350]",
            compact && "h-10 px-5 text-sm",
          )}
        >
          <span className="home-heading-cta__label">{site.cta.label}</span>
        </Button>
      </span>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={onToggle}
        className={cn(
          "header-menu-control menu-controls__toggle inline-flex items-center justify-center rounded-full text-fg transition-colors focus-visible:outline-none",
          compact ? "h-10 w-10" : "h-[34px] w-[34px]",
        )}
      >
        <MenuGlyph open={open} />
      </button>
    </div>
  );
}

function DesktopNavigation({
  onDark,
}: {
  onDark: boolean;
}) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeServices = () => setServicesOpen(false);

  return (
    <div
      data-on-dark={onDark}
      className="header-desktop-nav pointer-events-auto flex items-center"
    >
      <nav aria-label="Primary">
        <ul className="header-desktop-nav__list">
          {site.nav.map((item) => {
            const current =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.children?.length) {
              return (
                <li
                  key={item.href}
                  data-dropdown-state={servicesOpen ? "open" : "closed"}
                  className="header-desktop-nav__item header-desktop-nav__item--dropdown"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={closeServices}
                  onFocusCapture={() => setServicesOpen(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      closeServices();
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Escape") return;
                    event.preventDefault();
                    event.currentTarget.querySelector<HTMLAnchorElement>(
                      ".header-desktop-nav__link",
                    )?.focus();
                    closeServices();
                  }}
                >
                  <NextLink
                    href={item.href as unknown as NextLinkHref}
                    aria-current={current ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    aria-controls="header-services-dropdown"
                    onClick={closeServices}
                    className="header-desktop-nav__link header-desktop-nav__link--dropdown"
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 6"
                      className="header-desktop-nav__chevron"
                    >
                      <path d="M1 1 5 5 9 1" />
                    </svg>
                  </NextLink>

                  <div
                    id="header-services-dropdown"
                    aria-hidden={!servicesOpen}
                    className="header-services-dropdown"
                  >
                    <div className="header-services-dropdown__surface">
                      <p className="header-services-dropdown__eyebrow">
                        Our services
                      </p>
                      <ul className="header-services-dropdown__list">
                        {item.children.map((child) => {
                          const childCurrent =
                            pathname === child.href ||
                            pathname.startsWith(`${child.href}/`);

                          return (
                            <li key={child.href}>
                              <NextLink
                                href={child.href as unknown as NextLinkHref}
                                aria-current={childCurrent ? "page" : undefined}
                                tabIndex={servicesOpen ? undefined : -1}
                                onClick={closeServices}
                                className="header-services-dropdown__link"
                              >
                                <span>{child.label}</span>
                              </NextLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href} className="header-desktop-nav__item">
                <NextLink
                  href={item.href as unknown as NextLinkHref}
                  aria-current={current ? "page" : undefined}
                  className="header-desktop-nav__link"
                >
                  {item.label}
                </NextLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [brandOnDark, setBrandOnDark] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen((value) => !value);
  const openProjectRequest = () => {
    setOpen(false);
    setProjectOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const handleProjectRequest = () => {
      setOpen(false);
      setProjectOpen(true);
    };

    window.addEventListener(PROJECT_REQUEST_EVENT, handleProjectRequest);
    return () => window.removeEventListener(PROJECT_REQUEST_EVENT, handleProjectRequest);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateHeaderState = () => {
      animationFrame = 0;
      setScrolled(window.scrollY > 32);
      const progress = Math.min(1, Math.max(0, (window.scrollY - 24) / 156));
      headerRef.current?.style.setProperty("--header-progress", progress.toFixed(4));
      const sampleY = 40;
      const isOnDark = Array.from(
        document.querySelectorAll<HTMLElement>('[data-header-theme="dark"]'),
      ).some((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= sampleY && bounds.bottom >= sampleY;
      });
      const isOverFooter = Array.from(
        document.querySelectorAll<HTMLElement>('[data-header-hide="true"]'),
      ).some((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= sampleY && bounds.bottom >= sampleY;
      });

      setBrandOnDark((current) => (current === isOnDark ? current : isOnDark));
      setHeaderHidden((current) =>
        current === isOverFooter ? current : isOverFooter,
      );
    };

    const requestContrastUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener("scroll", requestContrastUpdate, { passive: true });
    window.addEventListener("resize", requestContrastUpdate);

    return () => {
      window.removeEventListener("scroll", requestContrastUpdate);
      window.removeEventListener("resize", requestContrastUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        data-menu-state={open ? "open" : "closed"}
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
        className="menu-page-overlay fixed inset-0 z-40 cursor-default lg:hidden"
      />

      <header
        ref={headerRef}
        data-hidden={headerHidden}
        data-scrolled={scrolled}
        data-on-dark={brandOnDark}
        className="header-shell pointer-events-none fixed inset-x-0 z-50"
      >
        <div className="header-bar">
          <div className="header-desktop-brand hidden lg:block">
            <Brand onDark={brandOnDark && !scrolled} />
          </div>

          <div className="header-center-nav hidden lg:block">
            <DesktopNavigation onDark={brandOnDark && !scrolled} />
          </div>

          <div className="header-desktop-cta hidden lg:block">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              aria-haspopup="dialog"
              aria-expanded={projectOpen}
              aria-controls="project-request-dialog"
              onClick={openProjectRequest}
              className="home-heading-cta home-heading-cta--header pointer-events-auto shrink-0 px-8 text-[18px] font-[350]"
            >
              <span className="home-heading-cta__label">{site.cta.label}</span>
            </Button>
          </div>

          <div className="header-mobile-brand lg:hidden">
            <Brand onDark={brandOnDark && !scrolled} />
          </div>

          <div className="header-mobile-actions lg:hidden">
            <MenuControls
              open={open}
              projectOpen={projectOpen}
              menuId="site-menu"
              onToggle={toggle}
              onProjectOpen={openProjectRequest}
            />
          </div>

          <NavPanel
            id="site-menu"
            open={open}
            onNavigate={close}
            className="absolute right-0 top-[calc(100%+8px)] z-50 h-[300px] w-[calc(100vw-3rem)] max-w-[280px] lg:hidden"
          />
        </div>
      </header>

      <ProjectRequestModal
        open={projectOpen}
        onClose={() => setProjectOpen(false)}
      />
    </>
  );
}
