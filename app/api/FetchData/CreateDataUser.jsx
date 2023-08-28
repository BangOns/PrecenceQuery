import axios from "axios";
import GetDataUsers from "./FetchDataUser";

export const dates = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];
export default async function CreateDataUser(post) {
  const ListUser = await GetDataUsers();
  const FindUser = ListUser.find((value) => {
    return value.id === post.id;
  });
  if (FindUser) {
    const UserDisplay = await axios.put(
      `http://localhost:5000/users/${FindUser.id}`,
      {
        ...post,
        date: dates[new Date().getDay()],
      }
    );
    const PostUser = await axios.post(
      "http://localhost:5000/displayuser",
      UserDisplay.data
    );
    return PostUser.data.data;
  } else {
    const UserDisplay = await axios.post(`http://localhost:5000/users`, {
      ...post,
      date: dates[new Date().getDay()],
    });
    const PostUser = await axios.post(
      "http://localhost:5000/displayuser",
      UserDisplay.data
    );
    return PostUser.data.data;
  }
}
