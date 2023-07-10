"use client";
import React from "react";
import styled from "styled-components";

const FooterLayout = styled.footer`
  background-color: ${(p) => p.theme.primaryColor};
  color: white;
  border-top: 1px solid #404040;
  flex: 0 1 auto;
  transition: all 0.2s linear;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Footer = () => {
  return (
    <FooterLayout>
      <Container>Footer</Container>
    </FooterLayout>
  );
};

export default Footer;
