import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";

// All these are protect this secure page even if user press back button
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const metadata = {
  title: "Admin Dashboard",
};
export const headers = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
};

export default async function ServerAdminDashboard() {
  const session = await getServerSession(authOptions);

  // NOT allow this page if you are not logged in!
  if (!session) {
    redirect("/admin-login");
  }

  // Loading the client component
  return <AdminDashboard />;
}
