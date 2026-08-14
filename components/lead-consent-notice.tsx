import Link from "next/link";

import {
	LEAD_CONSENT_NOTICE_LINK_LABEL,
	LEAD_CONSENT_NOTICE_PREFIX,
} from "@/lib/leads/consent";

export function LeadConsentNotice({
	className,
	id,
	linkClassName,
}: {
	className?: string;
	id?: string;
	linkClassName?: string;
}) {
	return (
		<p className={className} id={id}>
			{LEAD_CONSENT_NOTICE_PREFIX}
			<Link className={linkClassName} href="/privacy-policy">
				{LEAD_CONSENT_NOTICE_LINK_LABEL}
			</Link>
			.
		</p>
	);
}
