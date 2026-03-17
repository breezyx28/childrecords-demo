import { isAuthenticated } from "@/redux/ApiConfig";
import { setCookie } from "cookies-next";

interface ILoginAndRedirect {
  url: string;
}

const LoginAndRedirect = ({ url }: ILoginAndRedirect): any => {
  // test is user authed or not
  if (isAuthenticated()) {
    // redirect immediately
    window.location.href = url;
    return;
  }

  // if not? save url to cookie
  setCookie("redirect-url", url);
  // redirect to login page
  window.location.href = "/login";
  return;
  // and fire the url after login suceed
};

export default LoginAndRedirect;
