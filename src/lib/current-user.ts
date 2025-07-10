import { getAuthCookie, verifyAuthToken } from "./auth";
import { prisma } from "@/db/prisma";

type AuthPayLoad = {
  userId: string;
};

export async function getCurrentUser() {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    const payload = (await verifyAuthToken(token)) as AuthPayLoad;

    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Error getting the current user", error);
    return null;
  }
}
