"use client";
import styled from "styled-components";

const ForgotPasswordDiv = styled.div`
  display: flex;
  justify-content: end;

  a {
    margin-top: 0.3rem;
    font-size: 0.9rem;
    margin-right: 0.3rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Hr = styled.hr`
  padding: 0;
  overflow: visible;
  border: none;
  border-top: 1px solid #e0e0e0;
  color: #6e6d7a;
  text-align: center;

  &::after {
    content: "Or";
    display: inline-block;
    position: relative;
    top: -14px;
    padding: 0 16px;
    background: #fff;
  }
`;

export { ForgotPasswordDiv, Hr };
