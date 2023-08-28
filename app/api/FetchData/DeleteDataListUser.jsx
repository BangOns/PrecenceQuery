import axios from "axios";

export default async function DeleteDataListUser(id) {
  const response = await axios.delete(`http://localhost:5000/users/${id}`);
  return response.data;
}
