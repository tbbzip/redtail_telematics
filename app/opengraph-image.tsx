import { ImageResponse } from "next/og";

export const alt = "Redtail Telematics connected vehicle intelligence";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					alignItems: "center",
					background: "linear-gradient(115deg, #010101 0%, #101821 100%)",
					color: "white",
					display: "flex",
					height: "100%",
					justifyContent: "center",
					padding: "76px",
					width: "100%",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
					<div
						style={{
							color: "#cf1317",
							fontSize: 30,
							fontWeight: 700,
							letterSpacing: 8,
							textTransform: "uppercase",
						}}
					>
						Redtail Telematics
					</div>
					<div
						style={{
							fontSize: 76,
							fontWeight: 700,
							letterSpacing: -3,
							lineHeight: 1.08,
							marginTop: 30,
							maxWidth: 980,
						}}
					>
						Connected vehicle intelligence that moves business forward.
					</div>
					<div
						style={{
							background: "#cf1317",
							height: 8,
							marginTop: 50,
							width: 150,
						}}
					/>
				</div>
			</div>
		),
		size,
	);
}
