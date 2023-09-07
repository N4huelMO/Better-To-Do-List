"use client";
import Image from "next/image";
import homeImg from "../../../public/img/HomeImage.svg";
import SocialLink from "../SocialLink";
import {
  H1,
  H2,
  ImageDiv,
  SidebarContainer,
  SidebarContent,
} from "./Sidebar.styles";

import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  interface ValidPaths {
    [key: string]: boolean;
  }

  const validPaths: ValidPaths = {
    "/": true,
    "/register": true,
    "/forgot-password": true,
  };

  const isValidPath = validPaths[pathname] === true;

  return (
    <>
      {isValidPath && (
        <SidebarContainer>
          <SidebarContent>
            <H1>Better To-Do List</H1>
            <H2>Keep your mind clear and don't worry about remembering</H2>
          </SidebarContent>

          <ImageDiv>
            <Image
              priority
              src={homeImg}
              width={350}
              height={400}
              alt="Home Image"
            />
          </ImageDiv>

          <SocialLink />
        </SidebarContainer>
      )}
    </>
  );
};

export default Sidebar;
