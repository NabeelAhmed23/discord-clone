import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface ServerIDPageProps {
  params: {
    serverId: string;
  };
}

export default async function ServerIdPage({ params }: ServerIDPageProps) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params?.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  redirect(`/servers/${params?.serverId}/channels/${server?.channels[0]?.id}`);
  
}
