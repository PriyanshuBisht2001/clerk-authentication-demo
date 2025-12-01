import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const authData = await auth();
  const userData = await currentUser();
  console.log({ authData, userData });
  return <h1>Dashboard</h1>;
}
