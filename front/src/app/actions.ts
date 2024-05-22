"use server";

import { cookies, headers } from "next/headers";
import { CandidateService, ClientService, Languages } from "@/openapi";
import { redirect } from "next/navigation";

type UserType = "candidate" | "client";

async function addCV(
  id: string,
  data: FormData,
  user_type: UserType,
  isBot: boolean = false
) {
  let response = null;
  console.log("Is bot: ", isBot);

  if (isBot) {
    try {
      const botIP = headers().get("x-forwarded-for");
      data.append("bot_ip", botIP ?? "");
    } catch (error) {
      console.error("Error in get x-forwarded-for, error:", error);
    }
  }
  console.log("User date message: --->", data);


  try {
    if (user_type === "client") {
      const cookieStore = cookies();
      const lang = cookieStore.get("n18i")?.value ?? "en";
      console.log("lang: ", lang);
      response = await ClientService.contactForm(id, data, lang as Languages);
    } else {
      response = await CandidateService.applicationForm(id, data);
    }
  } catch (error) {
    console.error("Error in addCV, error:", error);
    return { status: "fail" };
  }
  
  return response;
}

export default addCV;

async function setLanguage(curPath: string) {
  const cookieStore = cookies();
  const lang = cookieStore.get("n18i")?.value ?? "en";
  let newLang = "";
  if (lang === "de") {
    newLang = "en";
  } else {
    newLang = "de";
  }
  cookieStore.set("n18i", newLang);
  const redirectPth = curPath.replace(`/${lang}`, `/${newLang}`);
  redirect(redirectPth);
}

export { setLanguage };
