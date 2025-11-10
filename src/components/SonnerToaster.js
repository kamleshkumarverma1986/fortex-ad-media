import { Toaster } from "sonner";

export default function SonnerToaster() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      richColors
      expand={false}
      closeButton
      toastOptions={{
        style: {
          background: "#0f0f0f",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        },
        success: {
          style: {
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#0f0f0f",
          },
        },
        error: {
          style: {
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#0f0f0f",
          },
        },
      }}
    />
  );
}
