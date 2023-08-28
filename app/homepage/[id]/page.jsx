"use client";
import GetDataUsersLogin from "@/app/api/FetchData/FetchDataUserLogin";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import UserDisplay from "./UserDisplay";

export default function Profile({ params }) {
  return <UserDisplay params={params} />;
}
