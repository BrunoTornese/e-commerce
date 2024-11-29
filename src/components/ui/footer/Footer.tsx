import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div
      className={`${titleFont.className} antialiased font-bold flex w-full justify-center text-xs mb-10`}
    >
      <Link href="/">
        <span>Teslo</span>
        <span>| shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link className="mx-3" href="/">
        Privacy & Legal
      </Link>
      <Link href="/">Locations</Link>
    </div>
  );
};
