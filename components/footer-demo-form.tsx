"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { LeadConsentNotice } from "@/components/lead-consent-notice";
import { captureLeadAttribution } from "@/lib/leads/attribution";
import { LEAD_CONSENT_NOTICE_VERSION } from "@/lib/leads/consent";

const fleetSizes = ["1-9", "10-49", "50-174", "175-999", "1000+"];

type FooterField =
	| "company"
	| "email"
	| "firstName"
	| "fleetSize"
	| "lastName"
	| "phone";

const footerFields = new Set<FooterField>([
	"company",
	"email",
	"firstName",
	"fleetSize",
	"lastName",
	"phone",
]);

const inputClassName =
	"h-12 w-full rounded-md border border-black/15 bg-white px-4 text-sm text-rb-black outline-none transition placeholder:text-rb-black/42 focus:border-rb-red focus:ring-3 focus:ring-rb-red/12";

export function FooterDemoForm() {
	const formId = useId();
	const [submissionState, setSubmissionState] = useState<
		"error" | "idle" | "submitting" | "success"
	>("idle");
	const [submissionError, setSubmissionError] = useState("");
	const [fieldErrors, setFieldErrors] = useState<
		Partial<Record<FooterField, string>>
	>({});
	const submissionIdRef = useRef<string | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const pendingFocusFieldRef = useRef<FooterField | null>(null);

	useEffect(() => {
		const field = pendingFocusFieldRef.current;

		if (!field || !fieldErrors[field]) {
			return;
		}

		formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
		pendingFocusFieldRef.current = null;
	}, [fieldErrors]);

	function clearFieldError(field: FooterField) {
		setFieldErrors((current) => ({ ...current, [field]: undefined }));
	}

	function setFieldErrorsAndFocus(
		nextErrors: Partial<Record<FooterField, string>>,
	) {
		const [firstField] = Object.keys(nextErrors) as FooterField[];
		pendingFocusFieldRef.current = firstField ?? null;
		setFieldErrors(nextErrors);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (submissionState === "submitting") {
			return;
		}

		const form = event.currentTarget;
		const formData = new FormData(form);

		setSubmissionError("");
		setFieldErrors({});
		setSubmissionState("submitting");

		try {
			submissionIdRef.current ||= crypto.randomUUID();
			const response = await fetch("/api/leads", {
				body: JSON.stringify({
					attribution: captureLeadAttribution(),
					company: formData.get("company"),
					consent: true,
					consentNoticeVersion: LEAD_CONSENT_NOTICE_VERSION,
					email: formData.get("email"),
					firstName: formData.get("firstName"),
					fleetSize: formData.get("fleetSize"),
					lastName: formData.get("lastName"),
					phone: formData.get("phone"),
					source: "footer-demo",
					submissionId: submissionIdRef.current,
					website: formData.get("website"),
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const result = (await response.json().catch(() => null)) as
				| {
						code?: string;
						fields?: Record<string, string[]>;
				  }
				| null;

			if (response.status === 422 && result?.fields) {
				const nextErrors = Object.fromEntries(
					Object.entries(result.fields)
						.filter(([field]) => footerFields.has(field as FooterField))
						.map(([field, messages]) => [field, messages[0]]),
				) as Partial<Record<FooterField, string>>;

				setFieldErrorsAndFocus(nextErrors);
				throw new Error("Please review the highlighted fields and try again.");
			}

			if (response.status === 429) {
				throw new Error("Too many attempts. Please wait a few minutes and try again.");
			}

			if (response.status === 409) {
				throw new Error(
					"This form was updated while the page was open. Reload the page and try again.",
				);
			}

			if (!response.ok) {
				throw new Error(
					"We couldn't send your request. Please try again or email sales@redtailtelematics.com.",
				);
			}

			form.reset();
			submissionIdRef.current = null;
			setFieldErrors({});
			setSubmissionState("success");
		} catch (error) {
			setSubmissionError(
				error instanceof Error
					? error.message
					: "We couldn't send your request. Please try again.",
			);
			setSubmissionState("error");
		}
	}

	return (
		<form
			className="rounded-2xl border border-white/10 bg-white p-5 text-rb-black shadow-[0_28px_90px_rgba(1,1,1,0.36)] sm:p-7 lg:p-8"
			onSubmit={handleSubmit}
			ref={formRef}
		>
			<input
				aria-hidden="true"
				autoComplete="off"
				className="hidden"
				name="website"
				tabIndex={-1}
				type="text"
			/>
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
						aria-describedby={
							fieldErrors.firstName ? `${formId}-first-name-error` : undefined
						}
						aria-invalid={Boolean(fieldErrors.firstName)}
						autoComplete="given-name"
						className={inputClassName}
						id={`${formId}-first-name`}
						maxLength={80}
						name="firstName"
						onChange={() => clearFieldError("firstName")}
						placeholder="First name"
						required
						type="text"
					/>
					{fieldErrors.firstName ? (
						<p className="mt-1 text-xs font-medium text-rb-red" id={`${formId}-first-name-error`}>
							{fieldErrors.firstName}
						</p>
					) : null}
				</div>
				<div>
					<label className="sr-only" htmlFor={`${formId}-last-name`}>
						Last name
					</label>
					<input
						aria-describedby={
							fieldErrors.lastName ? `${formId}-last-name-error` : undefined
						}
						aria-invalid={Boolean(fieldErrors.lastName)}
						autoComplete="family-name"
						className={inputClassName}
						id={`${formId}-last-name`}
						maxLength={80}
						name="lastName"
						onChange={() => clearFieldError("lastName")}
						placeholder="Last name"
						required
						type="text"
					/>
					{fieldErrors.lastName ? (
						<p className="mt-1 text-xs font-medium text-rb-red" id={`${formId}-last-name-error`}>
							{fieldErrors.lastName}
						</p>
					) : null}
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-phone`}>
						Phone number
					</label>
					<input
						aria-describedby={
							fieldErrors.phone ? `${formId}-phone-error` : undefined
						}
						aria-invalid={Boolean(fieldErrors.phone)}
						autoComplete="tel"
						className={inputClassName}
						id={`${formId}-phone`}
						maxLength={30}
						name="phone"
						onChange={() => clearFieldError("phone")}
						placeholder="Phone number"
						required
						type="tel"
					/>
					{fieldErrors.phone ? (
						<p className="mt-1 text-xs font-medium text-rb-red" id={`${formId}-phone-error`}>
							{fieldErrors.phone}
						</p>
					) : null}
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-email`}>
						Company email
					</label>
					<input
						aria-describedby={
							fieldErrors.email ? `${formId}-email-error` : undefined
						}
						aria-invalid={Boolean(fieldErrors.email)}
						autoComplete="email"
						className={inputClassName}
						id={`${formId}-email`}
						maxLength={254}
						name="email"
						onChange={() => clearFieldError("email")}
						placeholder="Company email"
						required
						type="email"
					/>
					{fieldErrors.email ? (
						<p className="mt-1 text-xs font-medium text-rb-red" id={`${formId}-email-error`}>
							{fieldErrors.email}
						</p>
					) : null}
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-company`}>
						Company name
					</label>
					<input
						aria-describedby={
							fieldErrors.company ? `${formId}-company-error` : undefined
						}
						aria-invalid={Boolean(fieldErrors.company)}
						autoComplete="organization"
						className={inputClassName}
						id={`${formId}-company`}
						maxLength={160}
						name="company"
						onChange={() => clearFieldError("company")}
						placeholder="Company name"
						required
						type="text"
					/>
					{fieldErrors.company ? (
						<p className="mt-1 text-xs font-medium text-rb-red" id={`${formId}-company-error`}>
							{fieldErrors.company}
						</p>
					) : null}
				</div>
				<div className="sm:col-span-2">
					<label className="sr-only" htmlFor={`${formId}-fleet-size`}>
						Fleet size
					</label>
					<select
						aria-describedby={
							fieldErrors.fleetSize ? `${formId}-fleet-size-error` : undefined
						}
						aria-invalid={Boolean(fieldErrors.fleetSize)}
						className={`${inputClassName} appearance-none text-rb-black/72`}
						defaultValue=""
						id={`${formId}-fleet-size`}
						name="fleetSize"
						onChange={() => clearFieldError("fleetSize")}
						required
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
					{fieldErrors.fleetSize ? (
						<p className="mt-1 text-xs font-medium text-rb-red" id={`${formId}-fleet-size-error`}>
							{fieldErrors.fleetSize}
						</p>
					) : null}
				</div>
			</div>

			<LeadConsentNotice
				className="mt-4 text-center text-xs leading-5 text-rb-black/65"
				id={`${formId}-consent-notice`}
				linkClassName="font-semibold text-rb-black underline-offset-4 hover:text-rb-red hover:underline"
			/>

			<button
				aria-describedby={`${formId}-consent-notice`}
				className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-rb-red bg-rb-red px-5 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(207,19,23,0.24)] transition hover:-translate-y-0.5 hover:border-[#a81218] hover:bg-[#a81218] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rb-red/35"
				disabled={submissionState === "submitting"}
				type="submit"
			>
				{submissionState === "submitting" ? "Sending..." : "Schedule demo"}
				<HugeIcon className="size-4" icon={ArrowRight01Icon} size={16} />
			</button>

			{submissionState === "success" ? (
				<p
					aria-live="polite"
					className="mt-4 rounded-md border border-rb-red/20 bg-rb-peach px-4 py-3 text-center text-sm font-medium text-rb-black"
					role="status"
				>
					Thanks. Your demo request was received and our team will be in touch.
				</p>
			) : null}

			{submissionError ? (
				<p
					aria-live="polite"
					className="mt-4 rounded-md border border-rb-red/20 bg-rb-peach px-4 py-3 text-center text-sm font-medium text-rb-black"
					role="alert"
				>
					{submissionError}
				</p>
			) : null}
		</form>
	);
}
