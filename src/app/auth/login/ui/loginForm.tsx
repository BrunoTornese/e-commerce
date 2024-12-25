"use client";

import { authenticate } from "@/app/actions/auth/login";
import clsx from "clsx";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispach] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/");
    }
  }, [state]);

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

      <LoginButtom />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </form>
  );
};

function LoginButtom() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({ "btn-primary": !pending, "btn-disabled": pending })}
      disabled={pending}
    >
      Login
    </button>
  );
}
