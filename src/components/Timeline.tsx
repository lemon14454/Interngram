import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import useUser from "../hooks/useUser";
import Post from "./post";

const Timeline = () => {
  const { user } = useUser();
  const { photos } = usePhotos();

  return (
    <div className="container md:col-span-2 col-span-3 mx-auto">
      {user?.following === undefined ? (
        <>
          <Skeleton count={2} width={640} height={500} className="mb-5" />
        </>
      ) : user.following.length === 0 || photos === null ? (
        <p className="text-center text-2xl">追蹤其他人來看到更多動態</p>
      ) : (
        photos!.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
};

export default Timeline;
