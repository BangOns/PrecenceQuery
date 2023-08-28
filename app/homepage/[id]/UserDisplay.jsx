"use client";

import GetDataUsersLogin from "@/app/api/FetchData/FetchDataUserLogin";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function UserDisplay({ params }) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["userLogin"],
    queryFn: GetDataUsersLogin,
    select: (user) => {
      return user.find((value) => value.id === params.id);
    },
  });
  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold judul-welcome max-sm:text-lg ">
        Welcome to your profile page
      </h1>
      <div className="flex width-auto justify-between items-center py-5 max-sm:text-lg">
        <p className="text-2xl text-semibold  max-sm:text-lg">
          Your Name: {!isLoading && data?.nama}
        </p>
        <button
          className="btn btn-info max-sm:btn-sm"
          onClick={() => router.push(`/homepage/${params.id}/upuser`)}
        >
          <p className="max-sm:text-xs">Update Account</p>
        </button>
      </div>
    </section>
  );
}
