import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { UserType } from "../../hooks/useUser";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

interface SuggestionsProps {
  userId: string;
  following: string[];
  loggedInUserDocId: string;
}

const Suggestions = ({
  userId,
  following,
  loggedInUserDocId,
}: SuggestionsProps) => {
  const [profiles, setProfiles] = useState<null | UserType[]>(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5"></Skeleton>
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">為您推薦</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username!}
            profileId={profile.userId!}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
