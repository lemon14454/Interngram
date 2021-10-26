import { useEffect, useReducer } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import { PhotoType } from "../../hooks/usePhotos";
import { UserType } from "../../hooks/useUser";
import Header from "./Header";
import Photos from "./Photos";

interface UserProfileProps {
  user: UserType;
}

export interface stateInterface {
  profile?: UserType | {};
  photosCollection?: PhotoType[] | [];
  followerCount?: number;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const initialState: stateInterface = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const reducer = (state: stateInterface, newState: stateInterface) => ({
    ...state,
    ...newState,
  });

  // a way to prevent multiple useState
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId!);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers?.length!,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount!}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection!} />
    </>
  );
};

export default UserProfile;
