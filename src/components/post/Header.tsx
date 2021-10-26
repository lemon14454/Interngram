import { Link } from "react-router-dom";
import { MAINUSER } from "../../constants/userConstant";

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            src={require(`Avatar/${
              username === MAINUSER ? MAINUSER : "default"
            }.jpg`)}
            className="rounded-full h-8 w-8 flex mr-3"
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
