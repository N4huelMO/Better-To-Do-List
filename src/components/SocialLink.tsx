import Link from "next/link";

import styled from "styled-components";

import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import React from "react";

const SocialMedia = styled.div`
  display: none;

  a {
    display: flex;
  }

  svg {
    transition: 0.05s;
    height: 50px;
    width: 50px;
  }

  svg:hover {
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
      icon: <AiFillInstagram></AiFillInstagram>,
    },
    {
      href: "https://github.com/N4huelMO",
      alt: "github",
      icon: <AiFillGithub></AiFillGithub>,
    },
    {
      href: "https://www.linkedin.com/in/nahuelmesa97/",
      alt: "linkedin",
      icon: <AiFillLinkedin></AiFillLinkedin>,
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
          {link.icon}
        </Link>
      ))}
    </SocialMedia>
  );
};

export default SocialLink;
