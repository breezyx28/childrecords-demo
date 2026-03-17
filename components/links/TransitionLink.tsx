"use client";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

interface TransitionLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  [key: string]: unknown;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const navigate = useNavigate();
  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(500);

    navigate(href);

    await sleep(500);

    body?.classList.remove("page-transition");
  };
  return (
    <Link onClick={handleTransition} to={href} {...props}>
      {children}
    </Link>
  );
};
