import { useEffect, useState } from "react";
import { getPhotos, getUserByUserId } from "../services/firebase";
import useUser from "./useUser";

export type PhotoType = {
  caption?: string;
  comments?: {
    comment: string;
    displayName: string;
  }[];
  created?: number;
  imageSrc?: string;
  likes?: string[];
  photoId?: string;
  userId?: string;
  userLatitude?: string;
  userLongitude?: string;
  docId: string;
  username?: string;
  userLikedPhoto?: boolean;
};

export default function usePhotos() {
  const [photos, setPhotos] = useState<PhotoType[] | null>(null);

  const { user } = useUser();

  useEffect(() => {
    async function getTimelinePhotos() {
      // const {following} = await getUserByUserId(user?.userId!)
      let followedUserPhotos: any = [];

      if (user && user?.following!.length > 0) {
        followedUserPhotos = await getPhotos(user?.userId!, user?.following!);
        followedUserPhotos.sort((a: any, b: any) => b.created - a.created);
      }

      setPhotos(followedUserPhotos.length ? followedUserPhotos : null);
    }

    getTimelinePhotos();
  }, [user]);

  return { photos };
}
