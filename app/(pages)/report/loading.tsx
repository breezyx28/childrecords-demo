const DownloadingReport = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="wrapper flex flex-col items-center gap-y-[28px] max-w-[440px]">
        <div className="loading-icon">
          <div
            className="relative w-[56px] h-[56px] flex items-center justify-center rounded-full animate-spin duration-800 z-[10]"
            style={{
              background:
                "conic-gradient(from 90deg at 50% 50%, rgba(63, 82, 255, 0) 0deg, rgba(57, 76, 255, 0.3) 0.04deg, #394CFF 360deg)",
            }}
          >
            <div className="bg-white w-[45px] h-[45px] rounded-full z-[20]"></div>
          </div>
        </div>
        <p className="w-full text-center text-[26px] font-[800] leading-[38.19px]">
          Hold on we are preparing your report...
        </p>
      </div>
    </div>
  );
};

export default DownloadingReport;
