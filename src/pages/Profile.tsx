import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import { UserType } from "../hooks/useUser";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/profile";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserType | null>(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-backgorund">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user!} />
      </div>
    </div>
  ) : null;
};

export default Profile;
