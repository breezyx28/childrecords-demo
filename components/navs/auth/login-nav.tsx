import Logo from "@/components/logos/logo";
import { Link } from "react-router-dom";
import React from "react";

const LoginNav = () => {
  return (
    <Link to="/">
      <div className="login-nav py-[24px] lg:px-[100px] px-[0px]">
        <Logo className="h-[50px]" />
      </div>
    </Link>
  );
};

export default LoginNav;
