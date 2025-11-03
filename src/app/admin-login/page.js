import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminLogin from "@/components/AdminLogin";

// Force dynamic rendering and prevent caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Admin Login",
};

export default async function ServerAdminLogin() {
  const session = await getServerSession(authOptions);

  // If session already exists, redirect to dashboard
  if (session) {
    redirect("/admin-dashboard");
  }

  // User is not logged in, show login page
  return <AdminLogin />;
}
