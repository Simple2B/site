import React from "react";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/options";
import NavigateBtn from "../Buttons/NavigateBtn";

const Apply = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      {session ? (
        <NavigateBtn title="Apply" pushTo={"/careers"} />
      ) : (
        <NavigateBtn title="Sign In to apply" pushTo={"/singin"} />
      )}
    </div>
  );
};

export default Apply;
