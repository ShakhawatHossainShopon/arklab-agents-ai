// @ts-nocheck
"use client";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <button onClick={login}>Login with Google</button>;
  }

  return (
    <div>
      <img src={user.photo} alt="Profile" width={50} />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
