import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { PhotoType } from "../../hooks/usePhotos";
import CommentIcon from "../../icons/CommentIcon";
import HeartIcon from "../../icons/HeartIcon";

interface PhotosProp {
  photos: PhotoType[];
}

const Photos = ({ photos }: PhotosProp) => {
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-6 mt-4 mb-12">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img src={require(`Photos/${photo.imageSrc}`)} />
              <div className="absolute bottom-0 left-0 bg-black-faded z-10 w-full justify-evenly items-center h-full group-hover:flex hidden">
                <p className="flex items-center text-white font-bold">
                  <HeartIcon className={"mr-4"} />
                  {photo.likes?.length}
                </p>
                <p className="flex items-center text-white font-bold">
                  <CommentIcon className={"mr-4"} />
                  {photo.comments?.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">尚無貼文</p>
        ))}
    </div>
  );
};

export default Photos;
