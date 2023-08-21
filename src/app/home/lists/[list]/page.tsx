"use client";
import React from "react";

import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();

  console.log(params.list);

  return <div>page</div>;
};

export default page;
