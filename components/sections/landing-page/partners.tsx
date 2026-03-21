"use client";

import React from "react";
import { motion, stagger, useAnimate, AnimatePresence } from "framer-motion";
// @ts-expect-error package exports/types resolution (same as testimonials / slider)
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Link1 } from "iconsax-react";
import VisitedCustomer from "@/components/modals/partners";

const partners = [
  {
    id: 0,
    name: "UNICEF",
    link: "https://www.unicef.org",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/United-nations-childrens-fund-unicef-logo.png",
  },
  {
    id: 1,
    name: "American Academy of Pediatrics",
    link: "https://www.aap.org",
    image: "/assets/images/partners/aap.png",
  },
  {
    id: 2,
    name: "World Health Organization",
    link: "https://www.who.int",
    image: "/assets/images/partners/who.png",
  },
  {
    id: 3,
    name: "CDC",
    link: "https://www.cdc.gov",
    image: "https://www.cdc.gov/TemplatePackage/5.0/img/logo/cdc-logo-tag-right.svg",
  },
  {
    id: 4,
    name: "Save the Children",
    link: "https://www.savethechildren.org",
    image:
      "https://www.savethechildren.org/themes/custom/scus_theme/images/scus-logo.svg",
  },
  {
    id: 5,
    name: "March of Dimes",
    link: "https://www.marchofdimes.org",
    image:
      "https://www.marchofdimes.org/themes/gesso/dist/images/fcdafeaf549fc682810d.svg",
  },
  {
    id: 6,
    name: "Nemours Children's Health",
    link: "https://www.nemours.org",
    image: "/assets/images/partners/nemours.svg",
  },
  {
    id: 7,
    name: "Children's Hospital Association",
    link: "https://www.childrenshospitals.org",
    image:
      "https://www.childrenshospitals.org/-/media/project/cha/publicwebsite/logos/brand_cha_horizontal_black.svg",
  },
];

type Partner = (typeof partners)[number];

function PartnerLogoCell({
  partner,
  logoClassName,
}: {
  partner: Partner;
  logoClassName: string;
}) {
  const { image, name, link } = partner;

  return (
    <div className="relative group px-6 py-4 flex items-center justify-center shrink-0">
      <img
        className={logoClassName}
        width={100}
        height={40}
        alt={name}
        src={image}
        onError={(e) => {
          e.currentTarget.src = "/assets/pages/no-image.jpg";
          e.currentTarget.onerror = null;
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-primary-600 rounded-md cursor-pointer"
        onClick={() => {
          document.getElementById("partner-visitor-dialog")?.click();
          sessionStorage.setItem("partner-link", link ?? "#");
          sessionStorage.setItem("partner-name", name);
        }}
      >
        <div className="flex gap-x-2 items-center">
          <Link1
            size={16}
            color="white"
            className="opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"
          />
          <span className="text-white text-sm font-medium">Learn more</span>
        </div>
      </div>
    </div>
  );
}

const Partners = () => {
  const [scope, animate] = useAnimate();
  const [isBelowSm, setIsBelowSm] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches;
  });

  const t = (text: any) => {
    return text;
  };

  const motionProps = {
    initial: { opacity: 0, y: "-20" },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      ease: "easeIn",
      duration: 1,
    },
    viewport: { once: true },
  };

  // Only run scoped stagger when the desktop grid is mounted (ref is attached).
  // On mobile we render Splide only — `scope.current` is null and `animate(".partner-logo")` throws.
  React.useLayoutEffect(() => {
    if (isBelowSm) return;
    if (!scope.current) return;

    animate(
      ".partner-logo",
      { opacity: [0, 1], y: ["-10px", "0px"] },
      {
        duration: 1,
        delay: stagger(0.2),
        ease: "easeIn",
      }
    );
  }, [animate, isBelowSm, scope]);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setIsBelowSm(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="partners" className="w-full mx-auto h-auto pt-[40px]">
      <div className="wrapper w-full flex flex-col items-center gap-y-[40px]">
        <div className="flex flex-col items-center">
          <h1 className="section-title">{t("Contact our Partners")}</h1>
          <span className="text-[#585A5D] leading-[24.8px] font-medium">
            {/* Contact our partners (click the logo) */}
          </span>
        </div>

        {/* Mobile (&lt; sm / 640px): infinite looping Splide */}
        {isBelowSm ? (
          <div className="w-full max-w-full overflow-hidden partners-splide-mobile px-2">
            <Splide
              className="!w-full"
              tag="section"
              options={{
                type: "loop",
                drag: true,
                arrows: false,
                pagination: false,
                gap: "32px",
                perPage: 2,
                perMove: 1,
                autoplay: true,
                interval: 2800,
                speed: 700,
                pauseOnHover: true,
                pauseOnFocus: true,
                easing: "ease",
                trimSpace: false,
              }}
              hasTrack={false}
              aria-label="Partner logos"
            >
              <SplideTrack className="w-full">
                {partners.map((partner) => (
                  <SplideSlide key={partner.id}>
                    <PartnerLogoCell
                      partner={partner}
                      logoClassName="partner-logo-mobile w-[100px] h-10 mx-auto object-contain object-center"
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>
        ) : null}

        {/* sm and up: original grid */}
        {!isBelowSm ? (
          <motion.div
            {...motionProps}
            className="flex flex-wrap justify-center items-center gap-[64px]"
            ref={scope}
          >
            <AnimatePresence>
              {partners?.map((partner) => (
                <PartnerLogoCell
                  key={partner.id}
                  partner={partner}
                  logoClassName="partner-logo w-[100px] h-10 object-contain object-center transition-opacity duration-200 ease-in-out group-hover:opacity-20"
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </div>
      <VisitedCustomer />
    </section>
  );
};

export default Partners;
