import axios from "axios";

export default async function GetDataUsers() {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
}
