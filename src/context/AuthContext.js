"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        emailAddresses: user.emailAddresses.map((email) => email.emailAddress),
        primaryEmailAddress: user.primaryEmailAddress?.emailAddress || null,
        phoneNumbers: user.phoneNumbers.map((phone) => phone.phoneNumber),
        primaryPhoneNumber: user.primaryPhoneNumber || null,
        imageUrl: user.imageUrl,
      };

      // Send user data to API only once when user logs in
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => console.log("User data sent successfully:", data))
        .catch((err) => console.error("Error sending user data:", err));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch(`/api/auth?id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUserData(data.user);
          } else {
            console.error("Error fetching user data:", data.error);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
