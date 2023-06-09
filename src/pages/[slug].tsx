import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import Head from "next/head";

import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import Image from "next/image";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({ username });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.profilePicture}
            alt={`${data.username ?? ""}s profile pic`}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
            height={128}
            width={128}
          />
        </div>
        <div className="h-[64px]" />

        <div className="p-4 text-2xl font-bold">@{data.username}</div>
        <div className="w-full border-b border-slate-400"></div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

  const slug = context?.params?.slug;

  if (typeof slug !== "string") {
    throw new Error("No slug!");
  }

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;
