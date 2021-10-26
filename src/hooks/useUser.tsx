import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../context/auth";
import { getUserByUserId } from "../services/firebase";

export type UserType = {
  imageUrl?: string;
  created?: string;
  email?: string;
  name?: string;
  userId?: string;
  username?: string;
  following?: string[];
  followers?: string[];
  docId: string;
};

export default function useUser() {
  const [activeUser, setActiveUser] = useState<UserType | undefined>(undefined);
  const user = useFirebaseAuth();

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user?.uid!);
      setActiveUser(response);
    }

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
