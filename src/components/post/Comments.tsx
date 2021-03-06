import { formatDistance } from "date-fns";
import { zhTW } from "date-fns/locale";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

interface CommentsProps {
  docId: string;
  comments: {
    comment: string;
    displayName: string;
  }[];
  posted: number;
  commentInput: React.MutableRefObject<any>;
}

const Comments = ({
  docId,
  comments: allComments,
  posted,
  commentInput,
}: CommentsProps) => {
  const [comments, setComments] = useState(allComments);
  const [showedComments, setShowedComments] = useState(3);

  return (
    <>
      <div className="p-4 pt-1 pb-5">
        {comments.length > 3 && (
          <p
            onClick={() => setShowedComments(comments.length)}
            className={`text-sm text-gray-base mb-1 cursor-pointer ${
              showedComments === comments.length && "hidden"
            }`}
          >
            檢視其他 {comments.length - 3} 則留言
          </p>
        )}
        {comments.slice(0, showedComments).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date(), { locale: zhTW })}前
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default Comments;
