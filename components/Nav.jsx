"use client";
import DeleteUserDisplay from "@/app/api/FetchData/DeleteDataUser";
import GetDataUsersLogin from "@/app/api/FetchData/FetchDataUserLogin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const { data: User, isLoading } = useQuery({
    queryKey: ["userLogin"],
    queryFn: GetDataUsersLogin,
  });
  const queryClient = useQueryClient();
  const DeleteUser = useMutation({
    mutationFn: DeleteUserDisplay,
    onSuccess: () => {
      queryClient.invalidateQueries(["userLogin"]);
    },
  });
  const id = !isLoading && User && User[0]?.id;

  return (
    <section className="w-full h-auto px-8 py-8 flex justify-between">
      <h1
        className="font-sans text-2xl font-bold max-sm:text-lg flex items-center hover:cursor-pointer"
        onClick={() => router.push("/homepage")}
      >
        MyPresence
      </h1>
      {/* Desktop */}
      <div className=" w-auto justify-between gap-5 flex  max-sm:hidden">
        <button className="btn" onClick={() => router.push(`/homepage/${id}`)}>
          My Profile
        </button>
        <button
          className="btn btn-error hover:bg-orange-600"
          onClick={() => {
            DeleteUser.mutate(id);
            router.push("/");
          }}
        >
          Sign Out
        </button>
      </div>
      {/* Mobile */}
      <div className="dropdown  dropdown-bottom dropdown-end sm:hidden">
        <label tabIndex={0} className="btn h-5">
          <div className="burgerButton">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href={`/homepage/${id}`}>My Profile</Link>
          </li>
          <li>
            <p
              role="button"
              className="hover:bg-orange-600 hover:text-white "
              onClick={() => {
                DeleteUser.mutate(id);
                router.push("/");
              }}
            >
              Sign Out
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
