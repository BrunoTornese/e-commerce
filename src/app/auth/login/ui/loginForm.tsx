"use client";

import { authenticate } from "@/app/actions/auth/login";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state === "Success") {
      signIn("credentials", { email, password }).then(() => {
        router.push("/");
      });
    }
  }, [state, email, password, router]);

  const handleLogin = (role: "user" | "admin") => {
    if (role === "user") {
      setEmail("Bruno@gmail.com");
      setPassword("123456");
    } else if (role === "admin") {
      setEmail("Teslo@gmail.com");
      setPassword("123456");
    }
  };

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        placeholder="Enter your email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        placeholder="Enter your password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="mb-2 flex flex-row">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid Credentials</p>
          </div>
        )}
      </div>

      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleLogin("user")}
          className="w-full py-2 px-4 rounded-lg text-white font-medium transition duration-300 ease-in-out bg-gray-500 hover:bg-gray-900 active:bg-gray-800"
        >
          Login as User
        </button>
        <button
          type="button"
          onClick={() => handleLogin("admin")}
          className="w-full py-2 px-4 rounded-lg text-white font-medium transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-900 active:bg-blue-800"
        >
          Login as Admin
        </button>
      </div>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        "w-full py-2 px-4 rounded-lg text-white font-medium transition duration-300 ease-in-out",
        {
          "bg-blue-500 hover:bg-blue-900 active:bg-blue-800 shadow-lg hover:shadow-xl":
            !pending,
          "bg-gray-400 cursor-not-allowed": pending,
        }
      )}
      disabled={pending}
    >
      {pending ? <span className="animate-pulse">Logging in...</span> : "Login"}
    </button>
  );
}
