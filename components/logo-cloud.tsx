import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export const clientLogos = [
	{
		src: "/clients/t-mobile.svg",
		alt: "T-Mobile",
		width: 144,
		height: 36,
	},
	{
		src: "/clients/concirrus.svg",
		alt: "Concirrus",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/jaguar.svg",
		alt: "Jaguar",
		width: 88,
		height: 36,
	},
	{
		src: "/clients/lojack.svg",
		alt: "LoJack",
		width: 118,
		height: 36,
	},
	{
		src: "/clients/fujitsu.svg",
		alt: "Fujitsu",
		width: 128,
		height: 36,
	},
	{
		src: "/clients/admiral.svg",
		alt: "Admiral",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/axa.svg",
		alt: "AXA",
		width: 84,
		height: 36,
	},
	{
		src: "/clients/by-miles.svg",
		alt: "By Miles",
		width: 126,
		height: 36,
	},
	{
		src: "/clients/direct-line.svg",
		alt: "Direct Line",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/toyota.svg",
		alt: "Toyota",
		width: 108,
		height: 36,
	},
	{
		src: "/clients/tracker.svg",
		alt: "Tracker",
		width: 124,
		height: 36,
	},
	{
		src: "/clients/unigarant.svg",
		alt: "Unigarant",
		width: 132,
		height: 36,
	},
];

export function LogoCloud() {
	return (
		<div className="mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] overflow-hidden py-4">
			<InfiniteSlider gap={52} speed={28} speedOnHover={16}>
				{clientLogos.map((logo) => (
					<div
						className="flex min-w-[132px] items-center justify-center"
						key={logo.alt}
					>
						<Image
							alt={logo.alt}
							className="h-6 w-auto object-contain opacity-90 grayscale-[0.2] transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-7"
							height={logo.height}
							src={logo.src}
							unoptimized
							width={logo.width}
						/>
					</div>
				))}
			</InfiniteSlider>
		</div>
	);
}
