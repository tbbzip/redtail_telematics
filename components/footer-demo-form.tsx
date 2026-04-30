"use client";

import { useId, useState } from "react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";

const fleetSizes = ["1-9", "10-49", "50-174", "175-999", "1000+"];

const inputClassName =
	"h-12 w-full rounded-md border border-black/15 bg-white px-4 text-sm text-rb-black outline-none transition placeholder:text-rb-black/42 focus:border-rb-red focus:ring-3 focus:ring-rb-red/12";

export function FooterDemoForm() {
	const formId = useId();
	const [submitted, setSubmitted] = useState(false);

	return (
		<form
			className="rounded-2xl border border-white/10 bg-white p-5 text-rb-black shadow-[0_28px_90px_rgba(1,1,1,0.36)] sm:p-7 lg:p-8"
			onSubmit={(event) => {
				event.preventDefault();
				setSubmitted(true);
			}}
		>
			<div className="text-center">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-rb-red">
					Talk to Redtail
				</p>
				<h3 className="mt-3 text-2xl font-semibold tracking-tight text-rb-black">
					Schedule a demo
				</h3>
			</div>

			<div className="mt-6 grid gap-3 sm:grid-cols-2">
				<div>
					<label className="sr-only" htmlFor={`${formId}-first-name`}>
						First name
					</label>
					<input
						className={inputClassName}
						id={`${formId}-first-name`}
						name="firstName"
						placeholder="First name"
						type="text"
					/>
				</div>
				<div>
					<label className="sr-only" htmlFor={`${formId}-last-name`}>
						Last name
					</label>
					<input
						className={inputClassName}
						id={`${formId}-last-name`}
						name="lastName"
						placeholder="Last name"
						type="text"
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-phone`}>
						Phone number
					</label>
					<input
						className={inputClassName}
						id={`${formId}-phone`}
						name="phone"
						placeholder="Phone number"
						type="tel"
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-email`}>
						Company email
					</label>
					<input
						className={inputClassName}
						id={`${formId}-email`}
						name="email"
						placeholder="Company email"
						type="email"
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-company`}>
						Company name
					</label>
					<input
						className={inputClassName}
						id={`${formId}-company`}
						name="company"
						placeholder="Company name"
						type="text"
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-fleet-size`}>
						Fleet size
					</label>
					<select
						className={`${inputClassName} appearance-none text-rb-black/72`}
						defaultValue=""
						id={`${formId}-fleet-size`}
						name="fleetSize"
					>
						<option disabled value="">
							Fleet size
						</option>
						{fleetSizes.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
			</div>

			<button
				className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-rb-red bg-rb-red px-5 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(207,19,23,0.24)] transition hover:-translate-y-0.5 hover:border-[#a81218] hover:bg-[#a81218] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rb-red/35"
				type="submit"
			>
				Schedule demo
				<HugeIcon className="size-4" icon={ArrowRight01Icon} size={16} />
			</button>

			<p className="mt-4 text-center text-xs leading-5 text-rb-black/46">
				By requesting a demo, you agree to be contacted by Redtail Telematics.
				See our{" "}
				<a className="font-semibold text-rb-black underline-offset-4 hover:text-rb-red hover:underline" href="/privacy-policy">
					Privacy Policy
				</a>
				.
			</p>

			{submitted ? (
				<p className="mt-4 rounded-md border border-rb-red/20 bg-rb-peach px-4 py-3 text-center text-sm font-medium text-rb-black">
					Thanks. Connect this form to your CRM or API to receive demo requests.
				</p>
			) : null}
		</form>
	);
}
