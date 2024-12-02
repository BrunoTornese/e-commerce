import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div
      className={`${titleFont.className} antialiased font-bold flex w-full justify-center text-xs mb-10`}
    >
      <Link href="/">
        <span>Teslo </span>
        <span>| Shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link className="mx-3" href="/termsAndServices">
        Privacy & Legal
      </Link>
      <Link href="/">Locations</Link>
    </div>
  );
};
