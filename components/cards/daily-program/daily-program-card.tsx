import ActivityChecker from "@/components/sections/dashboard/milestones/activity-checker";
import MilestoneChecker from "@/components/sections/dashboard/milestones/milestone-checker";
import { generateSlug } from "@/helper/string-to-slug";
import { useMarkActivityCompletedMutation } from "@/redux/endpoints/milestones";
import { Link } from "react-router-dom";
import { ChangeEvent, MouseEvent } from "react";

type DailyProgramCardProps = {
  id: number | string;
  title: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange?: (activityId: number, checked: boolean) => void;
};

export const DailyProgramCard = ({
  id,
  title,
  icon,
  checked = false,
  onCheckedChange,
}: DailyProgramCardProps) => {
  const [markCompleted, { data, isLoading }] =
    useMarkActivityCompletedMutation();

  // const handleMarkCompleted = (event: ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = event.target.checked;
  //   markCompleted({
  //     activity_id: id,
  //     completed: isChecked,
  //   });
  // };
  return (
    <div className="py-[24px] w-full flex justify-between items-center">
      <Link
        to={`/dashboard/milestones/${id}`}
        className="flex items-center gap-x-[11px]"
      >
        {icon}
        <span className="text-black text-[16px] font-[700] leading-[19.84px] hover:underline hover:text-primary-500">
          {title}
        </span>
      </Link>
      <label
        htmlFor={`daily-program-${generateSlug(title)}`}
        className="flex items-center cursor-pointer"
      >
        {/* <input
          disabled={isLoading}
          onChange={handleMarkCompleted}
          id={`daily-program-${generateSlug(title)}`}
          type="checkbox"
          defaultChecked={checked}
          className="checkbox border-2 border-[#AFB3BA] [--chkbg:#394CFF] [--chkfg:#fff] checked:border-primary-600 checkbox-md"
        /> */}

        <ActivityChecker
          activityId={id as number}
          name={title}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </label>
    </div>
  );
};
