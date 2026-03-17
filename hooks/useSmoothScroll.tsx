import { useState, useEffect } from "react";

export function useSmoothScroll(sectionIds: string[], offset: number = 0) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (
          element &&
          element.offsetTop - offset <= window.scrollY &&
          element.offsetTop + element.offsetHeight > window.scrollY
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return { activeSection, scrollToSection };
}
