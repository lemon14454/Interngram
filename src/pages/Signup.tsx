import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import SpinIcon from "../icons/SpinIcon";

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext)!;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        setLoading(true);
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user?.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user?.uid,
          username: username.toLowerCase(),
          name,
          email,
          following: [],
          created: Date.now(),
        });
        setLoading(false);

        history.push(ROUTES.DASHBOARD);
      } catch (error: any) {
        setLoading(false);
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("使用者名稱已被使用");
    }
  };

  useEffect(() => {
    document.title = "註冊 - Interngram";
  }, []);

  return (
    <div className="container flex flex-col md:flex-row gap-[100px] mx-auto max-w-screen-md items-center justify-center h-screen px-6 md:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-6xl font-semibold">Interngram</h1>
        <p className="text-lg md:text-2xl">為初入職場的你解答疑惑。</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleSignup} method="POST">
          <h1 className="flex w-full mb-2 font-bold text-xl">會員註冊</h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <input
            aria-label="Enter your Name"
            type="text"
            placeholder="請輸入姓名"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
          <input
            aria-label="Enter your username"
            type="text"
            placeholder="請輸入使用者名稱"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            aria-label="Enter your email"
            type="text"
            placeholder="請輸入電子信箱"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
          <input
            aria-label="Enter your password"
            type="password"
            placeholder="請輸入密碼"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`text-white bg-green-500 w-full rounded h-8 font-bold inline-flex items-center justify-center ${
              isInvalid && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? <SpinIcon /> : " 註冊 "}
          </button>
          <p className="text-sm mt-2">
            已經有帳號 ?{" "}
            <Link to={ROUTES.LOGIN} className="text-green-400">
              登入
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
