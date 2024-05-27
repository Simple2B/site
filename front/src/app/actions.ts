"use server";

import { applicationForm } from "@/api/candidate/candidate";
import { contactForm } from "@/api/client/client";
import { BodyApplicationForm, BodyContactForm, Languages, ResponseModal, ResponseStatus } from "@/api/model";
import { CarrerInputData } from "@/schema/careerForm";
import { InputData } from "@/schema/contactForm";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


async function contactFormAction(
  inputDate: InputData,
  formFileData: FormData,
  isBot: boolean = false,
): Promise<ResponseModal> {
  console.log("ContactFormAction")
  console.log("Is bot: ", isBot);

  const cookieStore = cookies();
  const language = cookieStore.get("n18i")?.value ?? Languages.en;

  const bodyContactForm: BodyContactForm  = {
    ...inputDate,
    bot_ip: "",
    language: language as Languages,
    file: undefined,
  }

  if (isBot) {
    try {
      const botIP = headers().get("x-forwarded-for");
      bodyContactForm.bot_ip = botIP ?? "";
    } catch (error) {
      console.error("Error in get x-forwarded-for, error:", error);
    }
  }


  const userFile = formFileData.get("file");
  if (userFile && userFile instanceof Blob) {
    bodyContactForm.file = userFile as Blob;
  }

  console.log("bodyContactForm: ", bodyContactForm);

  try {
    const res = await contactForm(bodyContactForm);
    return { status: res.data.status };
  } catch (error) {
    console.error("Error in contactFormAction, error:", error);
    return { status: ResponseStatus.fail };
  }
}

export { contactFormAction };



async function careerFormAction(
  inputDate: CarrerInputData,
  formFileData: FormData,
  isBot: boolean = false,
): Promise<ResponseModal> {

  console.log("CareerFormAction")
  const bodyApplicationForm: BodyApplicationForm = {
    ...inputDate,
    file: undefined,
  }


  const userFile = formFileData.get("file");
  if (userFile && userFile instanceof Blob) {
    bodyApplicationForm.file = userFile as Blob;
  }

  console.log("BodyApplicationForm: ", bodyApplicationForm);

  try {
    const res = await applicationForm(bodyApplicationForm);
    return { status: res.data.status };
  } catch (error) {
    console.error("Error in contactFormAction, error:", error);
    return { status: ResponseStatus.fail };
  }
}

export { careerFormAction };

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
