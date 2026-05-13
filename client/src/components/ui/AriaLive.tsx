import React, { useEffect, useState } from "react";

interface AriaLiveProps {
  message: string;
  politeness?: "polite" | "assertive";
}

export const AriaLive: React.FC<AriaLiveProps> = ({ message, politeness = "polite" }) => {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      // Clear after a short delay so repeated identical messages are still announced
      const timer = setTimeout(() => setAnnouncement(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
};
