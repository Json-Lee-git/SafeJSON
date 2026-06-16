"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "./analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
  secondaryEventName?: string;
  secondaryEventParams?: Record<string, string | number | boolean | undefined>;
};

export default function TrackedAnchor({
  children,
  eventName,
  eventParams,
  secondaryEventName,
  secondaryEventParams,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        if (secondaryEventName) {
          trackEvent(secondaryEventName, secondaryEventParams ?? eventParams);
        }
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
