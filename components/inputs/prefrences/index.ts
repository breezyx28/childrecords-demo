export const defaultStyle = {
  "& .MuiInputLabel-root": {
    fontSize: "14px", // Adjust label text size
    fontFamily: "var(--font-nunito)",
    color: "#83868B", // Label text color
    lineHeight: "20.8px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    top: "7px",
    color: "#83868B", // Change label color on focus
    transform: "translate(16px, -6px) scale(0.85)",
  },
  "& .MuiInputLabel-shrink": {
    top: "7px", // Adjust position when input is focused or filled
    transform: "translate(16px, -6px) scale(0.85)",
  },
  "& .MuiOutlinedInput-root": {
    height: "auto", // Make input height auto
    borderRadius: "16px", // Set border radius
    "& fieldset": {
      // Set border width
      borderColor: "transparent", // Set border color to primary-600
      border: 0, // Set border color to primary-600
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Apply Tailwind's primary-600 class
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Apply Tailwind's primary-600 class on focus
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      fontSize: "14px",
      paddingY: "15px",
    },
  },
};
