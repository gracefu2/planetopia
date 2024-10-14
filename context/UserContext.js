import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser && user) {
        onSnapshot(doc(db, "users", user.uid), (snapshot) => {
          setUserData(snapshot.exists() ? snapshot.data() : null);
        });
      } else {
        setUserData(null);
      }
    });
    return unsubscribe;
  }, [auth, db]);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};