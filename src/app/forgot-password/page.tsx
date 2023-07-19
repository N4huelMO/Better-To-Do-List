"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Container } from "@/styles/sharedStyles";
import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";

const page = () => {
  return (
    <Container>
      <Sidebar />

      <ForgotPassword />
    </Container>
  );
};
export default page;
