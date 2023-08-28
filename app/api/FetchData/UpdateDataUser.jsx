import axios from "axios";
import GetDataUsers from "./FetchDataUser";
import GetDataUsersLogin from "./FetchDataUserLogin";

export default async function UpdateDataUser(post) {
  const ListUser = await GetDataUsers();
  const UserLogin = await GetDataUsersLogin();
  const FindUser = ListUser.find((value) => {
    return value.id === UserLogin[0].id;
  });
  if (FindUser) {
    const UserDisplay = await axios.put(
      `http://localhost:5000/users/${FindUser.id}`,
      {
        id: FindUser.id,
        ...post,
        date: FindUser.date,
        role: FindUser.role,
      }
    );
    const PostUser = await axios.put(
      `http://localhost:5000/displayuser/${FindUser.id}`,
      UserDisplay.data
    );
    return PostUser.data;
  }
}
