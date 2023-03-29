import { type NextPage } from "next";
import Head from "next/head";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile View</title>
        <meta name="description" content="Profile view content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>
         Profile View
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
