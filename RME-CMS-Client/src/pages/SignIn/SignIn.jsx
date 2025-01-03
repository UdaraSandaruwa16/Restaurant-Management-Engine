import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const {isLoaded, signIn, setActive} = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error("error", err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center relative">
      {isLoading && <div className="loader"></div>}
      {!isLoading && (
        <>
          <div className="absolute w-60 h-60 rounded-xl bg-orange-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
          <div className="absolute w-48 h-48 rounded-xl bg-orange-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
          <div className="py-12 px-12 bg-white rounded-2xl shadow-2xl z-20">
            <div>
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                Login to your account
              </h1>
              <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                Login to your account and access all admin features
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="User Name"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-orange-500"
                onChange={(e) => setEmailAddress(e.target.value)}
                id="email"
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-orange-500"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
              />
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleSubmit}
                className="w-full py-2 text-xl text-white bg-orange-400 rounded-lg hover:bg-orange-500 transition-all outline-none"
                disabled={isLoading}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="w-40 h-40 absolute bg-orange-300 rounded-full top-0 right-12 hidden md:block"></div>
          <div className="w-20 h-40 absolute bg-orange-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
        </>
      )}
    </div>
  );
};

export default SignIn;
