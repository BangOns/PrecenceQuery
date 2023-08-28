"use client";
import GetDataUsersLogin from "@/app/api/FetchData/FetchDataUserLogin";
import UpdateDataUser from "@/app/api/FetchData/UpdateDataUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function FormNewUser({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["userLogin"],
    queryFn: GetDataUsersLogin,
    select: (user) => {
      return user.find((value) => value.id === id);
    },
  });
  const [nama, setNama] = useState(!isLoading && data?.nama);
  const [semester, setSemester] = useState(!isLoading && data?.semester);
  const [password, setPassword] = useState(!isLoading && data?.password);
  const route = useRouter();
  const queryClient = useQueryClient();
  const UpdateDataUsers = useMutation({
    mutationFn: UpdateDataUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["userLogin"]);
      route.push("/homepage");
    },
  });

  function handleNewSubmit(e) {
    e.preventDefault();
    UpdateDataUsers.mutate({ nama, semester, password });
    setNama("");
    setSemester("");
    setPassword("");
  }

  return (
    <Fragment>
      <form onSubmit={handleNewSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dev.."
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Semester (Optional)
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your semester..."
            disabled={
              !isLoading && data && data?.role === "admin" ? true : false
            }
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New password (Optional)
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
}
