"use client";
import GetDataUsersLogin from "@/app/api/FetchData/FetchDataUserLogin";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Welcome() {
  const {
    data: User,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userLogin"],
    queryFn: GetDataUsersLogin,
  });

  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold judul-welcome max-sm:text-lg">
        Welcome , <span>{!isLoading && User && User[0]?.nama}</span>
      </h1>
      <p className="py-3  text-xl max-sm:text-lg">
        {!isLoading && User && User[0]?.role === "admin"
          ? "Welcome, please see the table listed"
          : "you have been absent"}
      </p>
    </section>
  );
}
