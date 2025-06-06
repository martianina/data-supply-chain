"use server";

import { auth } from "@/auth";
import userActions from "./userAction";
import { redirect } from "next/navigation";

export const getUserId = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/api/auth/signin')
  }

  const user = await userActions.getOne(undefined, {
    email: session.user.email,
  });

return user.id;
};
