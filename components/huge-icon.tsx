import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

import { cn } from "@/lib/utils";

export type HugeIconProps = HugeiconsIconProps;

export function HugeIcon({
	className,
	color = "currentColor",
	size = 18,
	strokeWidth = 2.35,
	...props
}: HugeIconProps) {
	return (
		<HugeiconsIcon
			aria-hidden="true"
			className={cn("shrink-0", className)}
			color={color}
			size={size}
			strokeWidth={strokeWidth}
			{...props}
		/>
	);
}
