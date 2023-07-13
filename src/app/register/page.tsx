"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Container } from "@/styles/sharedStyles";
import Register from "@/components/Register/Register";

const page = () => {
  return (
    <Container>
      <Sidebar />

      <Register />
    </Container>
  );
};
export default page;
