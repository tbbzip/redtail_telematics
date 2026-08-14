import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultSocialImageAlt } from "@/lib/site-metadata";

export const alt = defaultSocialImageAlt;
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

const logoData = await readFile(
	join(process.cwd(), "public", "logo-white-og.png"),
	"base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					background:
						"radial-gradient(circle at 86% 12%, rgba(190, 22, 34, 0.30) 0, rgba(190, 22, 34, 0) 33%), linear-gradient(120deg, #030405 0%, #111820 100%)",
					color: "white",
					display: "flex",
					height: "100%",
					padding: "68px 76px",
					position: "relative",
					width: "100%",
				}}
			>
				<div
					style={{
						border: "1px solid rgba(255,255,255,0.12)",
						borderRadius: 999,
						display: "flex",
						height: 430,
						position: "absolute",
						right: -150,
						top: 90,
						width: 430,
					}}
				/>
				<div
					style={{
						background: "rgba(190,22,34,0.12)",
						borderRadius: 999,
						display: "flex",
						height: 260,
						position: "absolute",
						right: -40,
						top: 175,
						width: 260,
					}}
				/>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						position: "relative",
						width: 920,
					}}
				>
					<img
						alt=""
						height={102}
						src={logoSrc}
						style={{ objectFit: "contain", objectPosition: "left center" }}
						width={336}
					/>

					<div
						style={{
							color: "#ef4a55",
							display: "flex",
							fontSize: 22,
							fontWeight: 600,
							letterSpacing: 5,
							marginTop: 30,
							textTransform: "uppercase",
						}}
					>
						Connected vehicle intelligence
					</div>
					<div
						style={{
							fontSize: 64,
							fontWeight: 700,
							letterSpacing: -2.5,
							lineHeight: 1.04,
							marginTop: 20,
							maxWidth: 850,
						}}
					>
						Complete telematics for fleets, insurers, and OEMs.
					</div>
					<div
						style={{
							color: "rgba(255,255,255,0.68)",
							display: "flex",
							fontSize: 23,
							letterSpacing: 1,
							marginTop: 28,
						}}
					>
						Devices&nbsp;&nbsp;·&nbsp;&nbsp;Data&nbsp;&nbsp;·&nbsp;&nbsp;Platform&nbsp;&nbsp;·&nbsp;&nbsp;Apps
					</div>
				</div>

				<div
					style={{
						background: "#be1622",
						bottom: 0,
						display: "flex",
						height: 10,
						left: 0,
						position: "absolute",
						width: "100%",
					}}
				/>
			</div>
		),
		size,
	);
}
