const MomentsTimelineSkeleton = () => {
  return (
    <ul className="timeline timeline-snap-icon timeline-vertical !items-start">
      <li
        style={
          {
            "--timeline-col-start": "none",
            justifyItems: "unset",
            marginBottom: "24px",
          } as React.CSSProperties
        }
      >
        <div className="timeline-middle !p-[4px]">
          <div className="flex items-center gap-x-[4px]">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-[30px] h-[1px] bg-gray-300"></div>
          </div>
        </div>
        <div className="timeline-end !pt-[4px] max-w-full md:w-[450px] w-[calc(100vw-100px)]">
          <div className="w-full flex flex-col gap-y-2">
            <div className="w-full flex justify-between items-center">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="w-full flex flex-col">
            <div className="timeline-moments w-full flex items-center gap-x-[12px] max-h-[88px] mt-[16px] overflow-y-auto">
              <div className="w-[88px] h-[88px] bg-gray-300 rounded-[12px] animate-pulse"></div>
            </div>
          </div>
        </div>
        <hr className="ml-[12px] bg-gray-300 !w-[2px]" />
      </li>

      {/* Add more skeleton items if needed */}
    </ul>
  );
};

export default MomentsTimelineSkeleton;
