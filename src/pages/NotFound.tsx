import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "找不到網頁 - Interngram";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">找不到此頁面</p>
      </div>
    </div>
  );
};

export default NotFound;
