import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";

interface SuggestedProfileProps {
  profileDocId: string;
  username: string;
  profileId: string;
  userId: string;
  loggedInUserDocId: string;
}

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}: SuggestedProfileProps) => {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={require(`Avatar/${username}.jpg`)}
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button
          type="button"
          onClick={handleFollowUser}
          className="text-xs font-bold text-blue-medium"
        >
          追蹤
        </button>
      </div>
    </div>
  ) : null;
};

export default SuggestedProfile;
