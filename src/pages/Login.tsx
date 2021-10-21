import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext)!;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "登入 - Interngram";
  }, []);

  return (
    <div className="container flex flex-col md:flex-row gap-[100px] mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-6xl font-semibold">Interngram</h1>
        <p className="text-lg md:text-2xl">為初入職場的你解答疑惑。</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleLogin} method="POST">
          <h1 className="flex w-full mb-2 font-bold text-xl">會員登入</h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

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
            className={`text-white bg-green-500 w-full rounded h-8 font-bold ${
              isInvalid && "opacity-50 cursor-not-allowed"
            }`}
          >
            登入
          </button>
          <p className="text-sm mt-2">
            還沒有帳號 ?{" "}
            <Link to={ROUTES.SIGNUP} className="text-green-400">
              註冊
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
