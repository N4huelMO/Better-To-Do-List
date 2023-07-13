import Image from "next/image";
import Link from "next/link";

import instagram from "../../public/img/instagram.svg";
import github from "../../public/img/github.svg";
import linkedin from "../../public/img/linkedin.svg";
import styled from "styled-components";

const SocialMedia = styled.div`
  display: none;

  a {
    display: flex;
  }

  img {
    transition-duration: 0.3s;

    @media (min-width: 99px) {
      height: 50px;
      width: 50px;
    }
  }

  img:hover {
    cursor: pointer;
    transform: scale(1.3);
  }

  @media (min-width: 992px) {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1rem 0 0 0;
  }
`;

const SocialLink = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/nahuelmesaa",
      alt: "instagram",
      src: instagram,
    },
    {
      href: "https://github.com/N4huelMO",
      alt: "github",
      src: github,
    },
    {
      href: "https://www.linkedin.com/in/nahuelmesa97/",
      alt: "linkedin",
      src: linkedin,
    },
  ];

  return (
    <SocialMedia>
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            priority
            alt={link.alt}
            src={link.src}
            width={50}
            height={50}
          />
        </Link>
      ))}
    </SocialMedia>
  );
};

export default SocialLink;
