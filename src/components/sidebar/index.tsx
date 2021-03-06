import useUser from "../../hooks/useUser";
import Suggestions from "./Suggestions";
import User from "./User";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="hidden md:block">
      <User {...user!} />
      <Suggestions
        userId={user?.userId!}
        following={user?.following!}
        loggedInUserDocId={user?.docId!}
      />
    </div>
  );
};

export default Sidebar;
