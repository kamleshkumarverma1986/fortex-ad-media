"use client";

import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function AlertBox({ isOpen, handleClose, isSuccess, message }) {
  useEffect(() => {
    if (isOpen && message) {
      if (isSuccess) {
        toast.success(message, {
          onAutoClose: handleClose,
          onDismiss: handleClose,
        });
      } else {
        toast.error(message, {
          onAutoClose: handleClose,
          onDismiss: handleClose,
        });
      }
    }
  }, [isOpen, message, isSuccess, handleClose]);

  return <Toaster position="top-right" />;
}
