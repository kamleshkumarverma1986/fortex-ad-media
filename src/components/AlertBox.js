"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function AlertBox({ isOpen, handleClose, isSuccess, message }) {
  useEffect(() => {
    if (isOpen && message) {
      if (isSuccess) {
        toast.success(message, {
          onAutoClose: handleClose,
          onDismiss: handleClose,
          duration: 4000,
        });
      } else {
        toast.error(message, {
          onAutoClose: handleClose,
          onDismiss: handleClose,
          duration: 4000,
        });
      }
    }
  }, [isOpen, message, isSuccess, handleClose]);

  return null;
}
