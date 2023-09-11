import { auth } from "@/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const userAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return { currentUser };
};

export default userAuth;
