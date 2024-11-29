import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { LoginForm } from "./ui/loginForm";

export default function loginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>

      <LoginForm />

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create an account
      </Link>
    </div>
  );
}
