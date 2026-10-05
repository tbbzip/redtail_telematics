import Image from "next/image";
import { EditorialHero } from "@/components/editorial-hero";
import { ProductScreenshot } from "@/components/product-visual";
import { topLevelLink } from "@/components/nav-links";
import styles from "./home-hero.module.css";

export function HeroSection() {
	return (
		<EditorialHero
			description="See every vehicle and asset in real time, act on driver safety insights, and manage fleet activity with a platform trusted worldwide."
			eyebrow="Telematics Platform"
			primaryCta={{ href: "#footer-demo-form", label: "Book a demo" }}
			secondaryCta={{ href: topLevelLink.href, label: "Explore the platform" }}
			title="Complete telematics for fleets, insurers, and OEMs"
			visual={
				<div className={styles.visual}>
					<figure className={styles.operations}>
						<Image alt="Logistics trucks parked in a fleet yard" src="/industries/hero-logistics.webp" fill preload sizes="(min-width: 1024px) 620px, 92vw" className="object-cover object-center" />
						<figcaption>Fleet operations</figcaption>
					</figure>
					<div className={styles.product}>
						<ProductScreenshot src="/platform-screenshots/journey-showcase.jpg" alt="Redtail journey replay showing a vehicle route, speed, stops, and recorded events" label="Journey Showcase" caption="Redtail portal interface" eager aspectRatio={2.26} />
					</div>
					<div className={styles.hardware}>
						<div className={styles.device}><Image alt="Redtail VAM-HDR vehicle telematics device" src="/devices/vam-hdr.png" fill className="object-contain" sizes="150px" loading="eager" /></div>
						<p>VAM-HDR<span>Redtail vehicle telematics device</span></p>
					</div>
				</div>
			}
		/>
	);
}
