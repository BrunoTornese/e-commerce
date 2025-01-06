"use client";

import { login, registerUser } from "@/app/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const router = useRouter();

  const comparePasswords = (password: string, repeatPassword: string) => {
    return password === repeatPassword || "Passwords do not match";
  };

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage("");
    const { name, email, password, repeatPassword } = data;

    const passwordValidation = comparePasswords(password, repeatPassword);
    if (passwordValidation !== true) {
      setErrorMessage(passwordValidation);
      return;
    }

    const resp = await registerUser(name, email, password, repeatPassword);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
    await login(email.toLowerCase(), password);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        type="text"
        placeholder="Enter your name"
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        placeholder="Enter your password"
        {...register("password", { required: true })}
      />

      <label htmlFor="repeatPassword">Repeat your password</label>
      <input
        id="repeatPassword"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.repeatPassword,
        })}
        type="password"
        placeholder="Enter your password again"
        {...register("repeatPassword", { required: true })}
      />

      {errorMessage && (
        <span className="text-red-500 mb-5">{errorMessage}</span>
      )}

      <button className="btn-primary">Create account</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-900"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-900"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};

export default RegisterForm;
