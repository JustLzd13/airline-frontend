import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      fetch("https://airisle-api-3.onrender.com/users/user-profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user"); // ✅ Ensure user is removed
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // ✅ Handle error case
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]); // ✅ Runs again when `user` changes (logout fix)

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserContext;
