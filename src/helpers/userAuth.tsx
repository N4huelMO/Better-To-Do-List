import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const userAuth = () => {
  const [userId, setUserId] = useState<string | null>("");
  const [currentUser, setCurrentUser] = useState<any | null>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setCurrentUser(user);
      } else {
        setUserId(null);
      }
    });
  }, []);

  return { userId, currentUser };
};

export default userAuth;
