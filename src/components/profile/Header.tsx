import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { stateInterface } from ".";
import { MAINUSER } from "../../constants/userConstant";
import useUser, { UserType } from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

interface HeaderProps {
  photosCount: number;
  profile: UserType | any;
  followerCount: number;
  setFollowerCount: React.Dispatch<stateInterface>;
}

const Header = ({
  photosCount,
  profile,
  followerCount,
  setFollowerCount,
}: HeaderProps) => {
  const { user } = useUser();

  const {
    docId: profileDocId,
    userId: profileUserId,
    name,
    username: profileUsername,
    followers,
    following = [],
  } = profile!;

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user?.docId!,
      profileDocId,
      profileUserId,
      user?.userId!
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user?.username!,
        profileUserId!
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profileUsername ? (
          <img
            src={require(`Avatar/${
              profileUsername === MAINUSER ? MAINUSER : "default"
            }.jpg`)}
            className="rounded-full h-40 w-40 flex"
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                type="button"
                onClick={handleToggleFollow}
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              >
                {isFollowingProfile ? "取消追蹤" : "追蹤"}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` 貼文`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` 粉絲`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span>
                {` 追蹤中`}
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!name ? <Skeleton count={1} height={24} /> : name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
