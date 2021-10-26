import { useContext } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import HomeIcon from "../icons/HomeIcon";
import SignOutIcon from "../icons/SignOutIcon";
import useUser from "../hooks/useUser";

const Header = () => {
  const { firebase } = useContext(FirebaseContext)!;
  const { user } = useUser();

  return (
    <div className="h-16 bg-white border-b border-gray-primary mb-8 px-4">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full font-bold text-xl">
              <Link to={ROUTES.DASHBOARD}>Interngram</Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex gap-4 items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="dashboard">
                  <HomeIcon />
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                >
                  <SignOutIcon />
                </button>
                <div className="flex items-center curosr-pointer">
                  <Link to={`/p/${user.username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={require(`Avatar/${user.imageUrl}.jpg`)}
                      alt={`${user.imageUrl} profile picture`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="font-bold bg-blue-medium text-sm rounded text-white w-16 h-8"
                  >
                    登入
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-16 h-8"
                  >
                    註冊
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
