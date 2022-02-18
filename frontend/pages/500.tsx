import { Navbar } from "../components/Navbar/Navbar";
import ContentErrorPage500 from "../components/ContentErrorPage/ContentErrorPage500";

export default function Custom404() {
  return (
    <>
      <Navbar />
      <ContentErrorPage500 />
    </>
  );
}
