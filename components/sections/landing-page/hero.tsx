import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import BlurFade from "@/components/ui/blur-fade";
import { useAuthCallback } from "@/hooks/useAuthCallback";
import WordRotate from "@/components/ui/word-rotate";
import "../../../styles/hero.css";

const EMOJI_CLASS =
  "inline-block align-middle w-[0.9em] h-[0.9em] min-w-[24px] min-h-[24px] md:min-w-[32px] md:min-h-[32px] object-contain";

const HERO_TITLES: { segments: Array<{ type: "text"; value: string } | { type: "emoji"; src: string }> }[] = [
  {
    segments: [
      { type: "text", value: "Empower " },
      { type: "emoji", src: "/assets/icons/emojis/Sparkles.png" },
      { type: "text", value: " Your Child's Health Journey " },
      { type: "emoji", src: "/assets/icons/emojis/Red%20Heart.png" },
    ],
  },
  {
    segments: [
      { type: "text", value: "Track Growth " },
      { type: "emoji", src: "/assets/icons/emojis/Chart%20Increasing.png" },
      { type: "text", value: ", Milestones, and Memories " },
      { type: "emoji", src: "/assets/icons/emojis/Teddy%20Bear.png" },
    ],
  },
  {
    segments: [
      { type: "text", value: "Keep Every Checkup " },
      { type: "emoji", src: "/assets/icons/emojis/Pill.png" },
      { type: "text", value: " in One Place " },
      { type: "emoji", src: "/assets/icons/emojis/Baby%20Bottle.png" },
    ],
  },
];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  useAuthCallback();

  useEffect(() => {
    const id = setInterval(
      () => setTitleIndex((i) => (i + 1) % HERO_TITLES.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  const t = (text: any) => {
    return text;
  };

  const cloudMotion = (duration: number, delay: number) => ({
    initial: { x: "-50%", opacity: 0 }, // Start slightly off-screen
    animate: {
      x: ["-50%", "100%"], // Move from left (slightly off-screen) to the right edge
      opacity: [0, 1, 1, 0], // Fade in, stay visible, and then fade out
      transition: {
        repeat: Infinity, // Infinite loop
        duration, // Different duration for each cloud
        ease: "linear", // Linear motion for smoothness
        delay, // Delay start for each cloud for a staggered effect
      },
    },
  });

  return (
    <>
      <section
        id="home"
        className="w-full h-auto bg-primary-600 overflow-hidden"
      >
      
        <div className="relative w-full md:min-h-[558px] min-h-[470px] flex md:gap-x-[180px] gap-x-[0px] responsive">
          <div className="w-full gap-y-[32px] flex flex-col justify-center md:max-w-[437px] max-w-full z-[10]">
            <div className="flex flex-col gap-y-[8px] md:max-w-[384px] max-w-[800px]">
              <BlurFade delay={0.25} inView>
                <div className="overflow-hidden py-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={titleIndex}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="text-white md:text-[48px] text-2xl md:leading-[55.44px] leading-normal font-extrabold"
                    >
                      {HERO_TITLES[titleIndex].segments.map((seg, i) =>
                        seg.type === "text" ? (
                          <span key={i}>{seg.value}</span>
                        ) : (
                          <img
                            key={i}
                            src={seg.src}
                            alt=""
                            className={EMOJI_CLASS}
                          />
                        )
                      )}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </BlurFade>
              <BlurFade delay={0.25 * 2} inView>
                <WordRotate
                  words={[
                    t(
                      "Easily digitize medical records, track growth, and monitor developmental milestones—all in one intuitive platform."
                    ),
                    t(
                      "Stay on top of appointments, vaccines, and checkups with gentle reminders tailored to your child."
                    ),
                    t(
                      "Securely store and access your child's health history anytime, anywhere—at home or at the clinic."
                    ),
                  ]}
                  duration={4500}
                  randomizeAnimation
                  className="text-white text-[18px] font-medium md:leading-[22.32px] leading-normal"
                />
              </BlurFade>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "tween",
                },
              }}
              className="flex gap-x-[1rem]"
            >
              <button
                onClick={() => (window.location.href = "/register")}
                className="md:px-[40px] px-[20px] md:py-[16px] py-[12px] rounded-[100px] bg-white md:text-[16px] text-[14px] text-primary-600 font-bold leading-[19.84px]"
              >
                {t("Join Now")}
              </button>
            </motion.div>
          </div>

          {/* Cloud and image animation */}
          <div className="md:relative absolute w-full z-2">
            <div className="left-0 w-full h-full absolute z-1">
              <motion.div
                {...cloudMotion(25, 0)}
                className="absolute top-[10%] left-[0%] md:left-[55%]"
              >
                <img
                  src={"/assets/icons/clouds/cloud-border.png"}
                  width={177.3}
                  height={144.16}
                  alt="cloud"
                />
              </motion.div>
              <motion.div
                {...cloudMotion(30, 0.6)}
                className="absolute top-[60%] right-[-20%]"
              >
                <img
                  src={"/assets/icons/clouds/cloud-border.png"}
                  width={177.3}
                  height={144.16}
                  alt="cloud"
                />
              </motion.div>
              <motion.div
                {...cloudMotion(35, 0.8)}
                className="absolute bottom-[10%] left-[10%]"
              >
                <img
                  src={"/assets/icons/clouds/cloud.png"}
                  width={177.3}
                  height={144.16}
                  alt="cloud"
                />
              </motion.div>
              <motion.div
                {...cloudMotion(40, 0.12)}
                className="absolute left-[0%] bottom-[55%]"
              >
                <img
                  src={"/assets/icons/clouds/cloud.png"}
                  width={177.3}
                  height={144.16}
                  alt="cloud"
                />
              </motion.div>
            </div>

            <div className="relative md:block hidden w-[543.01px] h-[628px] overflow-hidden z-2">
              <div className="absolute size-full top-[50px]">
                {renderHeroImages}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const imagesAttributes = [
  {
    id: 1,
    src: "/assets/hero/hero-3.jpg",
    name: "img-1",
    classes: "",
  },
  {
    id: 2,
    src: "/assets/hero/hero-4.jpg",
    name: "img-2",
    classes: "",
    // classes: "mt-[33.71px]",
  },
  {
    id: 3,
    src: "/assets/hero/hero-4.jpg",
    name: "img-3",
    classes: "",
    // classes: "ml-[9.98px] mt-[-33.71px]",
  },
  {
    id: 4,
    src: "/assets/hero/hero-1.jpg",
    name: "img-4",
    classes: "",
    // classes: "ml-[9.98px]",
  },
  {
    id: 5,
    src: "/assets/hero/hero-5.jpg",
    name: "img-5",
    classes: "",
    // classes: "ml-[9.98px]",
  },
  {
    id: 6,
    src: "/assets/hero/hero-6.jpg",
    name: "img-6",
    classes: "",
    // classes: "ml-[9.98px]",
  },
];

/** Tiny SVG used as LQIP-style placeholder (no Next.js image optimizer in Vite). */
const HERO_IMAGE_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjU2JyBoZWlnaHQ9JzI4Nicgdmlld0JveD0nMCAwIDI1NiAyODYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzI1NicgaGVpZ2h0PScyODYnIGZpbGw9JyNlMmU4ZjAnLz48L3N2Zz4=";

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function useSlowConnection(): boolean {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation })
      .connection;

    const evaluate = () => {
      if (!connection) {
        setSlow(false);
        return;
      }
      const type = connection.effectiveType ?? "";
      const isSlow =
        Boolean(connection.saveData) ||
        type === "slow-2g" ||
        type === "2g";
      setSlow(isSlow);
    };

    evaluate();

    connection?.addEventListener?.("change", evaluate);
    return () => connection?.removeEventListener?.("change", evaluate);
  }, []);

  return slow;
}

const ImageItem = ({
  id,
  src,
  appendClasses,
  fetchPriority,
}: {
  id: number;
  src: string;
  appendClasses: string | null;
  fetchPriority: "high" | "low" | "auto";
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <BlurFade key={id} delay={0.25 + id * 0.05} inView>
      <div
        className={twMerge(
          "relative overflow-hidden border border-[2px] border-white rounded-[22.16px]",
          appendClasses
        )}
        style={{ width: "256px", height: "286px" }}
      >
        {/* Low-quality visual first; full JPEG loads in background */}
        <div
          aria-hidden
          className={twMerge(
            "pointer-events-none absolute inset-0 scale-110 bg-cover bg-center transition-opacity duration-500",
            loaded ? "opacity-0" : "opacity-100"
          )}
          style={{
            backgroundImage: `url("${HERO_IMAGE_BLUR_DATA_URL}")`,
            filter: "blur(14px)",
          }}
        />
        <img
          src={typeof src === "string" ? src : ""}
          alt="child-record"
          width={256}
          height={286}
          loading="lazy"
          decoding="async"
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          className={twMerge(
            "relative z-10 block h-full w-full rounded-[20px] object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </BlurFade>
  );
};

const RenderHeroImages = () => {
  const isSlowConnection = useSlowConnection();
  const fetchPriority: "high" | "low" | "auto" = isSlowConnection ? "low" : "auto";

  return (
    <div className="hero-imgs-cards-wrapper">
      {/* Render the images twice to create a seamless loop */}
      {[...imagesAttributes, ...imagesAttributes].map((image, index) => (
        <div className="hero-img-card" key={`${image.id}-${index}`}>
          {ImageItem({
            id: image.id,
            src: image.src,
            appendClasses: image.classes,
            fetchPriority,
          })}
        </div>
      ))}
    </div>
  );
};

const renderHeroImages = (
  <RenderHeroImages />
);

export default Hero;
