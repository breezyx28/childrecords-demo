import Lottie from "react-lottie";
import animationData from "@/public/assets/lottie/check.json";

const LottieCheck = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center">
      <Lottie options={defaultOptions} height={24} width={24} />
    </div>
  );
};

export default LottieCheck;
