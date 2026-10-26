"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle, Info } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastContext {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContext | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => removeToast(id), 4500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-24 right-4 sm:right-6 z-[80] flex flex-col gap-3 w-[calc(100vw-2rem)] sm:w-80 pointer-events-none"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto bg-warm-white border border-sand shadow-lg"
            >
              <div className="flex items-start gap-3 p-4 border-l-2 border-gold">
                <span className="mt-0.5 text-earth">
                  {toast.type === "success" ? (
                    <Check className="w-4 h-4 text-gold" />
                  ) : toast.type === "error" ? (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <Info className="w-4 h-4 text-earth" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body text-sm text-dark">{toast.title}</h4>
                  {toast.description && (
                    <p className="font-body text-xs text-text-muted mt-1 leading-relaxed">
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="text-text-muted hover:text-dark transition-colors p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return { addToast: ctx.addToast, removeToast: ctx.removeToast };
}
