import type { User } from "@clerk/nextjs/dist/api";

export const filterUserForCLient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.profileImageUrl,
  };
};
