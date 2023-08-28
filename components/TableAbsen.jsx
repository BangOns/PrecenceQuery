"use client";

import { dates } from "@/app/api/FetchData/CreateDataUser";
import DeleteDataListUser from "@/app/api/FetchData/DeleteDataListUser";
import GetDataUsers from "@/app/api/FetchData/FetchDataUser";
import GetDataUsersLogin from "@/app/api/FetchData/FetchDataUserLogin";
import FetchDataTabel from "@/app/api/FetchData/FetchTabelUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export default function TableAbsen({ result }) {
  const [nums, setNums] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading: load } = useQuery({
    queryKey: ["users"],
    queryFn: GetDataUsers,
  });
  const dataLength = parseInt(!load && data.length) / 2;
  const { data: User, isLoading } = useQuery({
    queryKey: ["user", nums],
    queryFn: FetchDataTabel,
    keepPreviousData: true,
    select: (data) => {
      return data.filter((value) => value.role === "user");
    },
  });
  const { data: UsersRole, isLoading: Loading } = useQuery({
    queryKey: ["userLogin"],
    queryFn: GetDataUsersLogin,
    select: (datas) => {
      return datas.find((value) => value.id === result.id);
    },
  });
  const DeleteUser = useMutation({
    mutationFn: DeleteDataListUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      window.location.reload();
    },
  });
  function deleteUser(account) {
    DeleteUser.mutate(account.id);
  }

  return (
    <Fragment>
      {!Loading && UsersRole
        ? UsersRole.role === "admin" && (
            <section className="w-full">
              <div className="overflow-x-auto flex justify-center">
                <table className="table border-collapse max-sm:table-xs">
                  {/* head */}
                  <thead>
                    <tr className="bg-info text-white rounded-md">
                      <th className="border border-slate-300 font-medium">
                        No
                      </th>
                      <th className="border border-slate-300 font-medium">
                        Nama
                      </th>
                      <th className="border border-slate-300 font-medium">
                        semester
                      </th>
                      <th className="border border-slate-300 font-medium">
                        Kehadiran
                      </th>
                      <th className="border border-slate-300 font-medium">
                        Action Account
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading
                      ? User.map((users, index) => {
                          const DatePresent = dates[new Date().getDay()];

                          return (
                            <tr key={users.id}>
                              <td className="border border-slate-300">
                                {index + 1}
                              </td>
                              <td className="border border-slate-300">
                                {users.nama}
                              </td>
                              <td className="border border-slate-300">
                                {users.semester}
                              </td>
                              <td
                                className={
                                  users.date === DatePresent
                                    ? "bg-success"
                                    : "bg-error"
                                }
                              >
                                {users.date
                                  ? users.date === DatePresent
                                    ? "Hadir"
                                    : "Belum Hadir"
                                  : "Belum Hadir"}
                              </td>
                              <td>
                                <button
                                  className="btn btn-error"
                                  onClick={deleteUser.bind(this, users)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
              <div className=" w-full flex justify-center py-5 ">
                <div className="Container flex gap-5">
                  <button
                    type="button"
                    className="btn bg-orange-600 text-white max-sm:btn-sm"
                    disabled={nums <= 1}
                    onClick={() => setNums(nums - 1)}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary max-sm:btn-sm"
                    disabled={nums >= dataLength}
                    onClick={() => setNums(nums + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          )
        : null}
    </Fragment>
  );
}
