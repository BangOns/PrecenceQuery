import TableAbsen from "@/components/TableAbsen";
import Welcome from "@/components/Welcome";
import { Suspense } from "react";
import GetDataUsersLogin from "../api/FetchData/FetchDataUserLogin";

export default async function page() {
  const result = await GetDataUsersLogin();
  return (
    <section>
      <Welcome />
      <TableAbsen result={result[0]} />
    </section>
  );
}
