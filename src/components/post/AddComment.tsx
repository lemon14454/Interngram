import React, { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import useUser from "../../hooks/useUser";

interface AddCommentProps {
  docId: string;
  comments: {
    comment: string;
    displayName: string;
  }[];
  setComments: React.Dispatch<
    React.SetStateAction<
      {
        comment: string;
        displayName: string;
      }[]
    >
  >;
  commentInput: React.MutableRefObject<any>;
}

const AddComment = ({
  docId,
  comments,
  setComments,
  commentInput,
}: AddCommentProps) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext)!;
  const { user } = useUser();

  const handleSubmitComment = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { username: displayName } = user!;

    if (displayName) {
      setComments([{ displayName, comment }, ...comments]);
      setComment("");
    }

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        method="POST"
        className="flex justify-between pl-0 pr-5"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base py-5 px-4 w-full mr-3"
          name="addComment"
          placeholder="新增留言"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
          className={`w-12 text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
        >
          發佈
        </button>
      </form>
    </div>
  );
};

export default AddComment;
