import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ManageSubscription from "@/components/ManageSubscription";

export default async function ServerUserManageSubscription() {
  const session = await getServerSession(authOptions);

  // If no session exists (user is not logged in), redirect to home page
  if (!session) {
    redirect("/");
  }

  // If user is an admin, can't redirect to user/*
  if (session.user?.isAdmin) {
    redirect("/");
  }

  // User is authenticated AND is a user - render ManageSubscription
  return <ManageSubscription />;
}
