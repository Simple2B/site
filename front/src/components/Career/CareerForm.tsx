"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

import clsx from "clsx";
import classes2 from "../Contacts/Contacts.module.scss";
import baseFileClasses from "../Input/BaseFileInput.module.scss";

import { VacancyElement } from '../../types/vacancies';
import { ControllerFormInput } from '../Contacts/ControllerFormInput';
import { CustomButton } from '../Buttons/CustomButton';
import { Inputs } from '../Contacts/ContactForm';
import { addCV } from '@/app/actions';

const TARGET_HOST = "https://mailer.simple2b.net";

export interface ICareerFormProps {
  vacancy: VacancyElement;
  userId: number;
}

const DEFAULT_FORM_VALUES = {
  name: "",
  email: "",
  phone: "",
  attachment: null,
}

export const CareerForm = () => {
  const { data } = useSession();
  const router = useRouter();

  const [sendEmailError, setSendEmailError] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Inputs, string>({ defaultValues: DEFAULT_FORM_VALUES });

  const handleSendMessage: SubmitHandler<Inputs> = async (inputsData) => {
    const { name, email, phone, attachment } = inputsData;

    const isFileList = attachment && attachment instanceof FileList;

    if (isFileList) {
      const formData = new FormData();
      formData.append("file", attachment[0]);

      await addCV(data?.user.user_uuid!, formData);
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", "");

    if (isFileList) {
      formData.append("file", attachment[0]);
    }

    const mailerResponse = await fetch(`${TARGET_HOST}/send_message`, {
      method: "POST",
      body: formData,
    });

    if (mailerResponse.status !== 200) {
      const maillerResponseJson = await mailerResponse.json();
      if (maillerResponseJson.message) {
        setSendEmailError(maillerResponseJson.message);
        return;
      }
    }

    if (mailerResponse.status === 200) {
      setSuccess(true);
      router.push('/careers');

      return;
    } else {
      return setSuccess(false);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("email", data.user?.email!);
      setValue("name", data.user?.name!);
    }
  }, [data, setValue]);

  const isDefault = success === null;
  const buttonText = isDefault ? "Submit" : success ? "Success" : "Fail";
  const buttonStyle = isDefault ? "normal" : success ? "success" : "fail";

  return (
    <>
      <form onSubmit={handleSubmit(handleSendMessage)} className="flex flex-col items-center">
        <h3 className="font-semibold text-3xl mb-5">
          Thank you for completing the Quiz!
        </h3>
        <h4 className="font-normal text-base mb-5">
          Please leave your contacts and we will get in touch with you as soon as possible!
        </h4>

        <div className="flex flex-col items-center">
          <div className="mb-10 w-full">
            <ControllerFormInput
              name="name"
              placeholder="Name*"
              control={control}
              data={data ? data.user?.name! : null}
              error={errors.name}
            />

            <ControllerFormInput
              name="email"
              placeholder="Email*"
              type="email"
              control={control}
              data={data ? data.user?.email! : null}
              error={errors.email}
            />

            <ControllerFormInput
              name="phone"
              placeholder="Phone*"
              type="number"
              control={control}
              error={errors.phone}
            />

            <div className="mb-2 w-full">
              <input
                {...register("attachment", { required: true })}
                type="file"
                id="file-upload"
                placeholder="Attachment"
                title="Please provide your CV."
                className={clsx(baseFileClasses.base, classes2.form_input)}
              />

              {errors.attachment && <span className="text-red-600 text-sm">This field is required</span>}
            </div>
          </div>

          <CustomButton
            title={buttonText}
            size='large'
            type='filled'
            status={buttonStyle}
          />

          <div>
            {sendEmailError && (
              <span className="text-red-600 text-sm">{sendEmailError}</span>
            )}
          </div>
        </div>
      </form>

      <div className="mt-6">
        <Link href={"/"}>
          <Image
            src={`/svg/logo/logo_blck.svg`}
            alt="Simple2b logo"
            width={78}
            height={78}
          />
        </Link>
      </div>
    </>
  );
};
