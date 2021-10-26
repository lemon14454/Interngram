import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { MAINUSER } from "../../constants/userConstant";
import { UserType } from "../../hooks/useUser";

const User = (user: UserType) => {
  const { username, name } = user;

  return !username || !name ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={require(`Avatar/${
            username === MAINUSER ? MAINUSER : "default"
          }.jpg`)}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{name}</p>
      </div>
    </Link>
  );
};

export default memo(User);
