import type { ComponentProps } from "react";

export function RedtailStudioIcon(props: ComponentProps<"span">) {
	return (
		<span
			{...props}
			aria-hidden="true"
			style={{
				backgroundColor: "#ffffff",
				backgroundImage: "url('/logo.svg')",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "80% auto",
				borderRadius: 8,
				display: "inline-block",
				height: 32,
				width: 32,
				...props.style,
			}}
		/>
	);
}

export function RedtailStudioLogo({
	title = "Redtail Studio",
}: {
	title?: string;
}) {
	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				gap: "0.75rem",
				padding: "0.625rem 0.875rem",
			}}
		>
			<span
				aria-label="Redtail Telematics"
				role="img"
				style={{
					backgroundImage: "url('/logo-white.svg')",
					backgroundPosition: "left center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
					display: "inline-block",
					height: 34,
					width: 156,
				}}
			/>
			<span
				style={{
					color: "currentColor",
					fontSize: "0.925rem",
					fontWeight: 700,
					letterSpacing: "-0.02em",
					lineHeight: 1,
				}}
			>
				{title}
			</span>
		</div>
	);
}
