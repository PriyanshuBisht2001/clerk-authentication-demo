"use server"

import { Role } from "@/types/globals";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setRole(formdata: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not Authorization");
  }

  const client = await clerkClient();
  const id = formdata.get("id") as string;
  const role = formdata.get("role") as Role;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });
  } catch (error) {
    throw new Error("failed to set role");
  }
}

export async function removeRole(formdata: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("You are not Authorized");
  }

  const client = await clerkClient();
  const id = formdata.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch (error) {
    throw new Error("failed to set role");
  }
}
