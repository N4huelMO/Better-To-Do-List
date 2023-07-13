import { lobster } from "@/app/fonts";
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

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarContent>
        <H1 className={lobster.className}>Better To-Do List</H1>
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
  );
};

export default Sidebar;
