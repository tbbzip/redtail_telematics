import Link from "next/link";
import { cn } from "@/lib/utils";
import * as React from "react";

export type LinkItemType = {
	label: string;
	href: string;
	icon: React.ReactNode;
	description?: string;
};

type LinkItemProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> &
	LinkItemType & {
		active?: boolean;
		minimal?: boolean;
	};

export const LinkItem = React.forwardRef<HTMLAnchorElement, LinkItemProps>(
	function LinkItem(
		{
			label,
			description,
			icon,
			className,
			href,
			active = false,
			minimal = false,
			...props
		},
		ref
	) {
		return (
			<Link
				ref={ref}
				className={cn(
					"group/link-item flex items-center gap-x-3 rounded-lg px-2.5 py-2.5 text-foreground/86 transition-all duration-200 hover:bg-muted/55 hover:text-rb-red",
					minimal &&
						"rounded-md px-2 py-2 hover:translate-x-0.5 hover:bg-transparent",
					active && (minimal ? "text-rb-red" : "bg-rb-peach/35 text-rb-red"),
					className
				)}
				href={href}
				{...props}
			>
				<div
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-card/80 text-sm text-foreground/78 transition-colors group-hover/link-item:border-rb-red/25 group-hover/link-item:bg-rb-peach/15 group-hover/link-item:text-rb-red",
						minimal &&
							"size-8 border-transparent bg-transparent text-foreground/58 group-hover/link-item:border-transparent group-hover/link-item:bg-transparent",
						active &&
							(minimal
								? "border-transparent bg-transparent text-rb-red group-hover/link-item:border-transparent group-hover/link-item:bg-transparent"
								: "border-rb-red/24 bg-rb-peach/18 text-rb-red group-hover/link-item:border-rb-red/24 group-hover/link-item:bg-rb-peach/18"),
						"[&_svg:not([class*='size-'])]:size-4"
					)}
				>
					{icon}
				</div>
				<div className="flex min-w-0 flex-col items-start justify-center">
					<span className="font-medium leading-tight">{label}</span>
					{description && !minimal ? (
						<span className="line-clamp-2 text-xs text-muted-foreground">
							{description}
						</span>
					) : null}
				</div>
			</Link>
		);
	}
);
