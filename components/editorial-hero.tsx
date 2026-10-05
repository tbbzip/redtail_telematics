import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import styles from "./editorial-hero.module.css";

type HeroLink = { href: string; label: string };
type HeroProof = { label: string; detail?: string };

export type EditorialHeroProps = {
	eyebrow: string;
	title: ReactNode;
	subhead?: ReactNode;
	description: string;
	primaryCta?: HeroLink;
	secondaryCta?: HeroLink;
	visual?: ReactNode;
	imageSrc?: string;
	imageAlt?: string;
	imagePosition?: string;
	proof?: HeroProof[];
	children?: ReactNode;
};

export function EditorialHero({
	eyebrow, title, subhead, description, primaryCta, secondaryCta, visual,
	imageSrc, imageAlt = "", imagePosition = "center", proof, children,
}: EditorialHeroProps) {
	return (
		<section className={`${styles.hero} ${visual ? styles.split : styles.photographic}`}>
			{imageSrc ? (
				<div className={styles.photography}>
					<Image alt={imageAlt} className={styles.photo} fill preload sizes="100vw" src={imageSrc} style={{ objectPosition: imagePosition }} />
				</div>
			) : null}
			<div className={styles.shade} aria-hidden="true" />
			<div className={styles.container}>
				<div className={styles.main}>
					<div className={styles.copy}>
						<p className={styles.eyebrow}>{eyebrow}</p>
						<h1 className={styles.title}>{title}</h1>
						{subhead ? <p className={styles.subhead}>{subhead}</p> : null}
						<p className={styles.description}>{description}</p>
						{primaryCta || secondaryCta ? (
							<div className={styles.actions}>
								{primaryCta ? <Link className={styles.primary} href={primaryCta.href}>{primaryCta.label}<HugeIcon icon={ArrowRight01Icon} size={19} /></Link> : null}
								{secondaryCta ? <Link className={styles.secondary} href={secondaryCta.href}>{secondaryCta.label}<HugeIcon icon={ArrowRight01Icon} size={18} /></Link> : null}
							</div>
						) : null}
						{children}
					</div>
					{visual ? <div className={styles.visual}>{visual}</div> : null}
				</div>
				{proof?.length ? (
					<div className={styles.proof}>
						{proof.map((item) => <div key={item.label}><p>{item.label}</p>{item.detail ? <span>{item.detail}</span> : null}</div>)}
					</div>
				) : null}
			</div>
		</section>
	);
}
