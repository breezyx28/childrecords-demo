import Logo from "@/components/logos/logo";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full min-w-0 max-w-full bg-[#F8F9FA] px-[20px] md:px-[100px]">
      <div className="divide divide-y">
        <div className="footer flex md:flex-row flex-col justify-between md:gap-y-0 gap-y-[40px] py-[40px]">
          <div className="wrapper-links w-full grid md:grid-cols-4 grid-rows-1 md:gap-[24px] gap-y-[32px]">
            <Logo />
            <div className="flex flex-col w-full max-w-[197px]">
              <span className="footer-link-title">{"Company"}</span>
              <div className="links-wrapper">
                <a href="#our-mession" className="footer-link">
                  {"About us"}
                </a>
                <a
                  href="mailto:childrecords.domain@gmail.com"
                  className="footer-link"
                >
                  {"Contact"}
                </a>
                <a href="/privacy-policy" className="footer-link">
                  {"Privacy Policy"}
                </a>
                <a href="/terms-conditions" className="footer-link">
                  {"Terms & conditions"}
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full max-w-[197px]">
              <span className="footer-link-title">{"Quick links"}</span>
              <div className="links-wrapper">
                <a href={"/login"} className="footer-link">
                  {"Login"}
                </a>
                <a href="/register" className="footer-link">
                  {"Create new account"}
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full max-w-[197px]">
              <span className="footer-link-title">{"Follow us"}</span>
              <div className="links-wrapper flex gap-x-[1rem]">
                <Link
                  to="https://www.instagram.com/child.records/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center gap-[5px] text-[16px] text-[#585A5D] font-[600] leading-[19.84px]"
                >
                  <img src="/assets/icons/socialmedia/instagram.svg" />
                  <span>Instagram</span>
                </Link>
                <Link
                  to="https://www.linkedin.com/in/child-records-31ab51330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center gap-[5px] text-[16px] text-[#585A5D] font-[600] leading-[19.84px]"
                >
                  <img src="/assets/icons/socialmedia/linkedin.svg" />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  to="https://facebook.com/people/Child-Records/61567510005895/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center gap-[5px] text-[16px] text-[#585A5D] font-[600] leading-[19.84px]"
                >
                  <img src="/assets/icons/socialmedia/Facebook.svg" />
                  <span>Facebook</span>
                </Link>
                <Link
                  to="https://www.youtube.com/@ChildRecords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center gap-[5px] text-[16px] text-[#585A5D] font-[600] leading-[19.84px]"
                >
                  <img
                    src="/assets/icons/socialmedia/youtube.svg"
                    width={"24"}
                  />
                  <span>Youtube</span>
                </Link>
                <Link
                  to="https://www.quora.com/profile/Child-Records"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center gap-[5px] text-[16px] text-[#585A5D] font-[600] leading-[19.84px]"
                >
                  <img src="/assets/icons/socialmedia/quora.svg" width={"24"} />
                  <span>Quora</span>
                </Link>
                <Link
                  to="https://x.com/records_ch31849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-center gap-[5px] text-[16px] text-[#585A5D] font-[600] leading-[19.84px]"
                >
                  <img src="/assets/icons/socialmedia/x.webp" width={"20"} />
                  <span>X (twitter)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="copyrights flex flex-col justify-center items-center py-[40px]">
          <span className="text-black text-[14px] font-[700] leading-[18.2px]">
            © {new Date().getFullYear()} {"ChildRecords - Powered by Medinier"}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
