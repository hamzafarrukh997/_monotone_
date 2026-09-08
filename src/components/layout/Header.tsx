"use client";

import { useEffect, useState } from "react";
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
        <div className="h-[26px]" aria-hidden="true" />

        <nav aria-label="Primary" className="mt-[29px]">
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
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={projectOpen}
          aria-controls="project-request-dialog"
          onClick={onProjectOpen}
          data-menu-open={open}
          className={cn(
            "menu-controls__button project-trigger",
            compact
              ? "project-trigger--compact"
              : "project-trigger--desktop",
          )}
        >
          <span className="project-trigger__label">{site.cta.label}</span>
          <span className="project-trigger__icon" aria-hidden="true">
            <span className="project-trigger__arrow project-trigger__arrow--front">↗</span>
            <span className="project-trigger__arrow project-trigger__arrow--back">↗</span>
          </span>
        </button>
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
  onProjectOpen,
  projectOpen,
  onDark,
}: {
  onProjectOpen: () => void;
  projectOpen: boolean;
  onDark: boolean;
}) {
  const pathname = usePathname();

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

            return (
              <li key={item.href}>
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

      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={projectOpen}
        aria-controls="project-request-dialog"
        onClick={onProjectOpen}
        className="project-trigger project-trigger--desktop"
      >
        <span className="project-trigger__label">{site.cta.label}</span>
        <span className="project-trigger__icon" aria-hidden="true">
          <span className="project-trigger__arrow project-trigger__arrow--front">↗</span>
          <span className="project-trigger__arrow project-trigger__arrow--back">↗</span>
        </span>
      </button>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [brandOnDark, setBrandOnDark] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
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
        data-hidden={headerHidden}
        className="header-shell pointer-events-none fixed inset-x-0 z-50"
      >
        <div className="relative z-[1] h-[323px] w-full">
          <div className="absolute inset-x-0 top-0 z-[60] hidden h-[var(--header-bar-height)] lg:block">
            <div className="relative mx-auto h-full w-full max-w-[120rem]">
              <div className="header-brand-scale absolute left-[clamp(4.5rem,5.63vw,6.75rem)] top-1/2">
                <Brand onDark={brandOnDark} />
              </div>

              <div className="header-controls-scale absolute right-[clamp(4rem,5.05vw,6.0625rem)] top-1/2">
                <DesktopNavigation
                  onDark={brandOnDark}
                  projectOpen={projectOpen}
                  onProjectOpen={openProjectRequest}
                />
              </div>
            </div>
          </div>

          <div className="absolute left-6 top-[calc(var(--header-bar-height)/2)] -translate-y-1/2 sm:left-8 lg:hidden">
            <Brand onDark={brandOnDark} />
          </div>

          <div className="absolute right-10 top-[calc(var(--header-bar-height)/2)] z-[60] -translate-y-1/2 lg:hidden">
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
            className="absolute right-6 top-1 z-50 h-[360px] w-[calc(100vw-3rem)] max-w-[280px] lg:hidden"
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
