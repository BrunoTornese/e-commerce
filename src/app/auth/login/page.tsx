import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-300 rounded mb-5"
          type="email"
        />

        <label htmlFor="email">Password</label>
        <input
          className="px-5 py-2 border bg-gray-300 rounded mb-5"
          type="password"
        />

        <button className="btn-primary">Login</button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">Or</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Create an account
        </Link>
      </div>
    </div>
  );
}
