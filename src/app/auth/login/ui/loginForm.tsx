"use client";

import { authenticate } from "@/app/actions";
import { useFormState } from "react-dom";

export const LoginForm = () => {
  const [state, dispach] = useFormState(authenticate, undefined);

  return (
    <form action={dispach} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        placeholder="Enter your email"
        type="email"
        name="email"
      />

      <label htmlFor="email">Password</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        placeholder="Enter your password"
        type="password"
        name="password"
      />

      <button type="submit" className="btn-primary">
        Login
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </form>
  );
};
