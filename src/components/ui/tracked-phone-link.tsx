"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackDirectCallClick } from "@/lib/tracking";

type TrackedPhoneLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "onClick"
> & {
  href: `tel:${string}`;
  source: string;
};

/** Preserve immediate telephone navigation while recording a consented click. */
export default function TrackedPhoneLink({
  source,
  ...props
}: TrackedPhoneLinkProps) {
  return <a {...props} onClick={() => trackDirectCallClick(source)} />;
}
