import { Carot, Heart } from "@/components/icons";

type NutritionCardProps = {
  tip: string;
};

export const NutritionCard = ({ tip }: NutritionCardProps) => {
  return (
    <div className="relative w-full h-[160px] p-[24px] rounded-[12px] bg-[#FFF4E6] flex flex-col justify-between">
      <span className="absolute top-[10px] right-[10px]">
        <Heart className="text-[#83868B]" />
      </span>
      <div className="flex items-center gap-x-[8px] text-[#FE8D00]">
        <span className="carot-icon">
          <Carot />
        </span>
        <span className="text-[16px] font-[700] leading-[19.84px]">
          Nutrition facts
        </span>
      </div>
      <p className="text-black text-[14px] font-[700] leading-[18.2px]">
        {tip}
      </p>
    </div>
  );
};
