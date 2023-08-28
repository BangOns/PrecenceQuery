import axios from "axios";

export default async function FetchDataTabel({ queryKey }) {
  const response = await axios.get(
    `http://localhost:5000/users?_limit=2&_page=${queryKey[1]}`
  );
  return response.data;
}
