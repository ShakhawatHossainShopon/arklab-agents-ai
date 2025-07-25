// @ts-nocheck
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [user]);

  if (!checked) return null;

  return <>{children} </>;
}
