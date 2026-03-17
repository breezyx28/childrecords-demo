const isProduction = process.env.NODE_ENV === "production";

export const handleGoogleClickTracking = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  eventLabel?: string
) => {
  if (isProduction) {
    if (typeof window !== "undefined") {
      const buttonText = (event.target as HTMLButtonElement).innerText;
      window.gtag("event", "click", {
        event_category: "button",
        event_label: eventLabel ?? buttonText,
      });
    }
  }
};
