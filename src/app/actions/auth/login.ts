"use server";

import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    return "CredentialsSignin";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return { ok: true, message: "Success" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error on authentication" };
  }
};
