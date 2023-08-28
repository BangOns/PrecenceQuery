import axios from "axios";

export default async function DeleteUserDisplay(id) {
  const response = await axios.delete(
    `http://localhost:5000/displayuser/${id && id}`
  );
  return response.data;
}
