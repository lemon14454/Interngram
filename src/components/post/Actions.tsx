import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import useUser from "../../hooks/useUser";
import CommentIcon from "../../icons/CommentIcon";
import HeartIcon from "../../icons/HeartIcon";

interface ActionsProps {
  docId: string;
  totalLikes: number;
  likedPhoto: boolean;
  handleFocus: () => void;
}

const Actions = ({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}: ActionsProps) => {
  const { user } = useUser();
  const [toggledLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext)!;

  const handleToggleLiked = async () => {
    setToggleLiked((toggledLiked) => !toggledLiked);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggledLiked
          ? FieldValue.arrayRemove(user?.userId)
          : FieldValue.arrayUnion(user?.userId),
      });

    setLikes((likes) => (toggledLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <HeartIcon
            onClick={handleToggleLiked}
            className={`mr-4 select-none cursor-pointer ${
              toggledLiked ? "fill-red text-red-primary" : "text-black-light"
            }`}
          />
          <CommentIcon onClick={handleFocus} />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">{`${likes} 個讚`}</p>
      </div>
    </>
  );
};

export default Actions;
