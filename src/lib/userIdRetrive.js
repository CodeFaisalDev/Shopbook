// import { auth } from '@clerk/nextjs/server'

// // import { useAuth } from "@clerk/nextjs";
// export default async function userIdRetrive() {
//   // const { userId } = useAuth();

//   const user = await auth();
//   const userId = user?.id;

//   return userId;
// }


import { auth } from "@clerk/nextjs/server";

export default async function userIdRetrive() {
  const { userId } = await auth();  // Await the auth() function
  return userId;
}
