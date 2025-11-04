import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserDashboard from "@/components/UserDashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "User Dashboard",
};

export default async function ServerUserDashboard() {
  const session = await getServerSession(authOptions);

  // If no session exists (user is not logged in), redirect to home page
  if (!session) {
    redirect("/");
  }

  // If user is an admin, can't redirect to user-dashboard
  if (session.user?.isAdmin) {
    redirect("/");
  }

  // User is authenticated AND is a user - render the user-dashboard
  return <UserDashboard session={session} />;
}
