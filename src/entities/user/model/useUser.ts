"use client";

import useSWR from "swr";

export interface User {
  name: string;
  role: string;
  avatarUrl: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export function useUser() {
  const { data, error, mutate } = useSWR<User>("/api/user", fetcher);
  const isLoading = !data && !error;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    mutate(undefined, false);
    window.location.href = "/login";
  };

  return {
    user: data ?? {
      name: "Kristina 🐰",
      role: "менеджер продаж",
      avatarUrl: "/avatar.png",
    },
    isLoading,
    isError: Boolean(error),
    logout,
  };
}
