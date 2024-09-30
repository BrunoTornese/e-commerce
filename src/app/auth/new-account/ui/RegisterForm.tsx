"use client";

import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const comparePasswords = (password: string, repeatPassword: string) => {
    if (password !== repeatPassword) {
      return "Passwords do not match";
    }
    return true;
  };

  const onSubmit = async (data: FormInputs) => {
    const { name, email, password, repeatPassword } = data;
    if (comparePasswords(password, repeatPassword)) {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        type="text"
        placeholder="Enter your name"
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        placeholder="Enter your password"
        {...register("password", { required: true })}
      />
      <label htmlFor="email">Repeat your password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.repeatPassword,
        })}
        type="password"
        placeholder="Enter your password again"
        {...register("repeatPassword", { required: true })}
      />

      <button className="btn-primary">Create account</button>

      {/* divisor l ine */}
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
