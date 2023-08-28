import axios from "axios";

export default async function GetDataUsersLogin() {
  const response = await axios.get("http://localhost:5000/displayuser");
  return response.data;
}
