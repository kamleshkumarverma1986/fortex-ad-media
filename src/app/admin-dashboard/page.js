import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const metadata = {
  title: "Admin Dashboard",
};

export default async function ServerAdminDashboard() {
  const session = await getServerSession(authOptions);

  // If no session exists (user is not logged in), redirect to login page
  if (!session) {
    redirect("/admin-login");
  }

  // User is authenticated - render the dashboard and pass session data
  return <AdminDashboard session={session} />;
}
