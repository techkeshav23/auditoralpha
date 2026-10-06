"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

const EXIT_MS = 220;

/**
 * A real modal built on <dialog>.showModal(): the page behind is inert, focus
 * moves in and returns to the trigger, and Escape closes it. Below `lg` it is a
 * bottom sheet you can swipe down; from `lg` up it is a centred dialog.
 * Page scroll is locked by CSS while any dialog is open (see globals.css).
 */
export function BottomSheet({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  // Mount when opened; when closed, keep it mounted long enough to play the exit.
  if (open && (!mounted || closing)) {
    setMounted(true);
    setClosing(false);
  }
  if (!open && mounted && !closing) setClosing(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (mounted && !closing && dialog && !dialog.open) dialog.showModal();
  }, [mounted, closing]);

  useEffect(() => {
    if (!closing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        dialogRef.current?.close(); // returns focus to whatever opened the sheet
        setMounted(false);
        setClosing(false);
      },
      reduced ? 0 : EXIT_MS,
    );
    return () => window.clearTimeout(timer);
  }, [closing]);

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault(); // animate out instead of vanishing
        onClose();
      }}
      onClose={() => {
        // The browser can force-close (e.g. a repeated Escape); keep the owner in sync.
        if (open) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-inherit backdrop:bg-transparent"
    >
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "absolute inset-0 animate-fade-in bg-[#05091a]/45 backdrop-blur-[2px] transition-opacity duration-200",
          closing && "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        className={cn(
          "pb-safe absolute inset-x-0 bottom-0 max-h-[88dvh] animate-sheet-up overflow-y-auto overscroll-contain rounded-t-[22px] bg-card shadow-[0_-20px_50px_-20px_rgb(11_21_48/0.5)]",
          "lg:inset-0 lg:m-auto lg:h-fit lg:max-h-[85vh] lg:w-[min(460px,calc(100%-32px))] lg:animate-page-in lg:rounded-[22px] lg:pb-3",
          dragY === 0 && "transition-[transform,opacity] duration-200 ease-out",
          closing && "translate-y-full lg:translate-y-0 lg:scale-[0.98] lg:opacity-0",
          className,
        )}
        style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}
        onTouchStart={(e) => {
          // Only drag the sheet itself when its content is scrolled to the top.
          startY.current = (panelRef.current?.scrollTop ?? 0) > 0 ? null : e.touches[0].clientY;
        }}
        onTouchMove={(e) => {
          if (startY.current !== null) setDragY(Math.max(0, e.touches[0].clientY - startY.current));
        }}
        onTouchEnd={() => {
          if (dragY > 90) onClose();
          setDragY(0);
          startY.current = null;
        }}
      >
        <div className="relative flex h-12 items-start justify-end px-2 pt-2">
          <span
            aria-hidden
            className="absolute top-2.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-rule lg:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 place-items-center rounded-full text-muted transition-[transform,background-color] hover:bg-paper active:scale-90"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
