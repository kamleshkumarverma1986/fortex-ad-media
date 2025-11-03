import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";

export default async function ServerAdminDashboard() {
  const session = await getServerSession(authOptions);

  // NOT allow this page if you are not logged in!
  if (!session) {
    redirect("/admin-login");
  }

  // Loading the client component
  return <AdminDashboard />;
}
