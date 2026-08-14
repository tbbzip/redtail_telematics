"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Building02Icon,
	CheckmarkCircle02Icon,
	ConstructionIcon,
	CourtHouseIcon,
	DeliveryTruck02Icon,
	MoreHorizontalCircle01Icon,
	ShieldUserIcon,
	ToolboxIcon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { LeadConsentNotice } from "@/components/lead-consent-notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { captureLeadAttribution } from "@/lib/leads/attribution";
import { LEAD_CONSENT_NOTICE_VERSION } from "@/lib/leads/consent";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

type Choice = {
	icon?: IconSvgElement;
	label: string;
	value: string;
};

type ContactValues = {
	company: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
};

const industries: Choice[] = [
	{ icon: DeliveryTruck02Icon, label: "Logistics", value: "logistics" },
	{ icon: ConstructionIcon, label: "Construction", value: "construction" },
	{ icon: CourtHouseIcon, label: "Government", value: "government" },
	{ icon: ToolboxIcon, label: "Field Services", value: "field-services" },
	{ icon: ShieldUserIcon, label: "Insurance", value: "insurance" },
	{ icon: MoreHorizontalCircle01Icon, label: "All Others", value: "other" },
];

const fleetSizes: Choice[] = [
	{ label: "1 - 9", value: "1-9" },
	{ label: "10 - 49", value: "10-49" },
	{ label: "50 - 174", value: "50-174" },
	{ label: "175 - 999", value: "175-999" },
	{ label: "1,000+", value: "1000+" },
];

const emptyContactValues: ContactValues = {
	company: "",
	email: "",
	firstName: "",
	lastName: "",
	phone: "",
};

function getChoiceLabel(choices: Choice[], value: string) {
	return choices.find((choice) => choice.value === value)?.label || value;
}

function validateContact(values: ContactValues) {
	const errors: Partial<Record<keyof ContactValues, string>> = {};

	if (!values.firstName.trim()) {
		errors.firstName = "First name is required.";
	}

	if (!values.lastName.trim()) {
		errors.lastName = "Last name is required.";
	}

	if (!values.phone.trim() || values.phone.replace(/\D/g, "").length < 7) {
		errors.phone = "Enter a valid phone number.";
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
		errors.email = "Enter a valid company email.";
	}

	if (!values.company.trim()) {
		errors.company = "Company name is required.";
	}

	return errors;
}

function ProgressBar({ step }: { step: Step }) {
	return (
		<div className="fixed inset-x-0 bottom-6 flex justify-center px-6">
			<div
				aria-label="Get started progress"
				aria-valuemax={3}
				aria-valuemin={1}
				aria-valuenow={step}
				className="h-1.5 w-20 overflow-hidden rounded-full border border-white/25 bg-white/8"
				role="progressbar"
			>
				<div
					className="h-full rounded-full bg-rb-red transition-all duration-300"
					style={{ width: `${(step / 3) * 100}%` }}
				/>
			</div>
		</div>
	);
}

function ChoiceGrid({
	choices,
	className,
	groupLabel,
	name,
	onSelect,
	selected,
}: {
	choices: Choice[];
	className?: string;
	groupLabel: string;
	name: string;
	onSelect: (value: string) => void;
	selected: string;
}) {
	return (
		<fieldset
			className={cn(
				"mx-auto mt-10 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3",
				className,
			)}
		>
			<legend className="sr-only">{groupLabel}</legend>
			{choices.map((choice) => {
				const active = selected === choice.value;

				return (
					<label className="cursor-pointer" key={choice.value}>
						<input
							checked={active}
							className="peer sr-only"
							name={name}
							onChange={() => onSelect(choice.value)}
							type="radio"
							value={choice.value}
						/>
						<span
							className={cn(
								"flex min-h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.075] px-5 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.11] peer-focus-visible:outline-none peer-focus-visible:ring-3 peer-focus-visible:ring-rb-red/35",
								active &&
									"border-rb-red/80 bg-rb-red/16 text-white shadow-[0_18px_60px_rgba(207,19,23,0.18)]",
							)}
						>
							<span className="flex flex-col items-center gap-3">
								{choice.icon ? (
									<HugeIcon icon={choice.icon} size={30} strokeWidth={2.2} />
								) : null}
								<span className="text-lg font-semibold">{choice.label}</span>
							</span>
						</span>
					</label>
				);
			})}
		</fieldset>
	);
}

function ContactInput({
	autoComplete,
	error,
	id,
	maxLength,
	name,
	onChange,
	placeholder,
	type = "text",
	value,
}: {
	autoComplete: string;
	error?: string;
	id: string;
	maxLength: number;
	name: keyof ContactValues;
	onChange: (name: keyof ContactValues, value: string) => void;
	placeholder: string;
	type?: string;
	value: string;
}) {
	return (
		<div>
			<label className="sr-only" htmlFor={id}>
				{placeholder}
			</label>
			<Input
				aria-describedby={error ? `${id}-error` : undefined}
				aria-invalid={Boolean(error)}
				autoComplete={autoComplete}
				className={cn(
					"h-14 rounded-md border-black/18 bg-white px-5 text-base text-rb-black placeholder:text-rb-black/45 focus-visible:border-rb-red focus-visible:ring-rb-red/16",
					error && "border-rb-red focus-visible:border-rb-red",
				)}
				id={id}
				maxLength={maxLength}
				name={name}
				onChange={(event) => onChange(name, event.target.value)}
				placeholder={placeholder}
				required
				type={type}
				value={value}
			/>
			{error ? (
				<p className="mt-2 text-sm font-medium text-rb-red" id={`${id}-error`}>
					{error}
				</p>
			) : null}
		</div>
	);
}

export function GetStartedFlow() {
	const formId = useId();
	const [step, setStep] = useState<Step>(1);
	const [industry, setIndustry] = useState("");
	const [fleetSize, setFleetSize] = useState("");
	const [values, setValues] = useState<ContactValues>(emptyContactValues);
	const [errors, setErrors] = useState<
		Partial<Record<keyof ContactValues, string>>
	>({});
	const [submissionState, setSubmissionState] = useState<
		"error" | "idle" | "submitting" | "success"
	>("idle");
	const [submissionError, setSubmissionError] = useState("");
	const submissionIdRef = useRef<string | null>(null);
	const stepHeadingRef = useRef<HTMLHeadingElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const pendingFocusFieldRef = useRef<keyof ContactValues | null>(null);
	const canContinue = step === 1 ? Boolean(industry) : Boolean(fleetSize);
	const selectedSummary = useMemo(
		() => ({
			fleetSize: fleetSize ? getChoiceLabel(fleetSizes, fleetSize) : "",
			industry: industry ? getChoiceLabel(industries, industry) : "",
		}),
		[fleetSize, industry],
	);

	useEffect(() => {
		stepHeadingRef.current?.focus();
	}, [step]);

	useEffect(() => {
		if (submissionState === "success") {
			stepHeadingRef.current?.focus();
		}
	}, [submissionState]);

	useEffect(() => {
		const field = pendingFocusFieldRef.current;

		if (!field || !errors[field]) {
			return;
		}

		formRef.current
			?.querySelector<HTMLElement>(`[name="${field}"]`)
			?.focus();
		pendingFocusFieldRef.current = null;
	}, [errors]);

	function setErrorsAndFocus(nextErrors: Partial<Record<keyof ContactValues, string>>) {
		pendingFocusFieldRef.current = (
			Object.keys(nextErrors) as (keyof ContactValues)[]
		)[0] ?? null;
		setErrors(nextErrors);
	}

	function goBack() {
		setStep((current) => (current > 1 ? ((current - 1) as Step) : current));
	}

	function goNext() {
		if (step < 3 && canContinue) {
			setStep((current) => ((current + 1) as Step));
		}
	}

	function updateValue(name: keyof ContactValues, value: string) {
		setValues((current) => ({ ...current, [name]: value }));
		setErrors((current) => ({ ...current, [name]: undefined }));
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (submissionState === "submitting") {
			return;
		}

		const formData = new FormData(event.currentTarget);

		const nextErrors = validateContact(values);
		setErrorsAndFocus(nextErrors);

		if (Object.keys(nextErrors).length) {
			return;
		}

		setSubmissionError("");
		setSubmissionState("submitting");

		try {
			submissionIdRef.current ||= crypto.randomUUID();
			const response = await fetch("/api/leads", {
				body: JSON.stringify({
					...values,
					attribution: captureLeadAttribution(),
					consent: true,
					consentNoticeVersion: LEAD_CONSENT_NOTICE_VERSION,
					fleetSize,
					industry,
					source: "get-started",
					submissionId: submissionIdRef.current,
					website: String(formData.get("website") || ""),
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});

			const result = (await response.json().catch(() => null)) as
				| {
						code?: string;
						fields?: Partial<Record<keyof ContactValues, string[]>>;
				  }
				| null;

			if (response.status === 422 && result?.fields) {
				setErrorsAndFocus(
					Object.fromEntries(
						Object.entries(result.fields).map(([name, messages]) => [
							name,
							messages?.[0],
						]),
					),
				);
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

			submissionIdRef.current = null;
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
		<main className="min-h-dvh overflow-hidden bg-rb-black text-white">
			<div className="absolute inset-0 bg-[linear-gradient(115deg,#010101_0%,#010101_46%,#101821_100%)]" />
			<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rb-red/65 to-transparent" />

			<div className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-5 py-7 sm:px-8 lg:px-10">
				<header className="flex items-center justify-between">
					<Link className="inline-flex items-center" href="/">
						<Image
							alt="Redtail"
							className="h-8 w-auto"
							height={48}
							priority
							src="/logo-white.svg"
							width={160}
						/>
					</Link>
					<Link
						className="text-sm font-semibold text-white/62 transition hover:text-white"
						href="/contact-us"
					>
						Get in touch
					</Link>
				</header>

				<div className="grid flex-1 place-items-center py-12 sm:py-16">
					<div className="w-full">
						{step > 1 && submissionState !== "success" ? (
							<button
								className="mb-8 inline-flex items-center gap-2 text-base font-semibold text-white/54 transition hover:text-white"
								onClick={goBack}
								type="button"
							>
								<HugeIcon icon={ArrowLeft01Icon} size={18} />
								Back
							</button>
						) : null}

						{submissionState === "success" ? (
							<section
								aria-live="polite"
								className="mx-auto max-w-2xl text-center"
								role="status"
							>
								<div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rb-red text-white shadow-[0_22px_70px_rgba(207,19,23,0.28)]">
									<HugeIcon icon={CheckmarkCircle02Icon} size={34} />
								</div>
								<p className="mt-8 text-sm font-semibold tracking-[0.24em] text-white/56 uppercase">
									Request received
								</p>
								<h1
									className="mt-4 text-4xl leading-tight font-semibold outline-none sm:text-5xl"
									ref={stepHeadingRef}
									tabIndex={-1}
								>
									Thanks, we&apos;ll be in touch soon
								</h1>
								<p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/64">
									Your request is tagged for {selectedSummary.industry} with{" "}
									{selectedSummary.fleetSize} vehicles or assets.
								</p>
								<Button asChild className="mt-9">
									<Link href="/">
										Return home
										<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
									</Link>
								</Button>
							</section>
						) : null}

						{step === 1 && submissionState !== "success" ? (
							<section className="text-center">
								<p className="text-sm font-semibold tracking-[0.24em] text-white/52 uppercase">
									Step 1 of 3
								</p>
								<h1
									className="mt-4 text-4xl leading-tight font-semibold outline-none sm:text-5xl"
									ref={stepHeadingRef}
									tabIndex={-1}
								>
									What&apos;s your industry?
								</h1>
									<ChoiceGrid
										choices={industries}
										groupLabel="Industry"
										name="industry"
										onSelect={setIndustry}
									selected={industry}
								/>
								<Button
									className="mt-10 min-w-44 rounded-full bg-white text-rb-black hover:bg-white/90"
									disabled={!canContinue}
									onClick={goNext}
									size="lg"
								>
									Next
								</Button>
							</section>
						) : null}

						{step === 2 && submissionState !== "success" ? (
							<section className="text-center">
								<p className="text-sm font-semibold tracking-[0.24em] text-white/52 uppercase">
									Step 2 of 3
								</p>
								<h1
									className="mt-4 text-4xl leading-tight font-semibold outline-none sm:text-5xl"
									ref={stepHeadingRef}
									tabIndex={-1}
								>
									How many vehicles or assets do you operate?
								</h1>
									<ChoiceGrid
										choices={fleetSizes}
										className="max-w-4xl"
										groupLabel="Fleet size"
										name="fleet-size"
										onSelect={setFleetSize}
										selected={fleetSize}
									/>
								<Button
									className="mt-10 min-w-44 rounded-full bg-white text-rb-black hover:bg-white/90"
									disabled={!canContinue}
									onClick={goNext}
									size="lg"
								>
									Next
								</Button>
							</section>
						) : null}

						{step === 3 && submissionState !== "success" ? (
							<section className="text-center">
								<p className="text-sm font-semibold tracking-[0.24em] text-white/52 uppercase">
									Step 3 of 3
								</p>
								<h1
									className="mt-4 text-4xl leading-tight font-semibold outline-none sm:text-5xl"
									ref={stepHeadingRef}
									tabIndex={-1}
								>
									Last step: where can we reach you?
								</h1>
								<p className="mt-4 text-lg text-white/62">
									This helps us route you to the right Redtail specialist.
								</p>

									<form
										className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 text-left shadow-[0_28px_90px_rgba(1,1,1,0.44)] sm:p-8"
										onSubmit={handleSubmit}
										ref={formRef}
								>
									<input name="industry" type="hidden" value={selectedSummary.industry} />
									<input name="fleetSize" type="hidden" value={selectedSummary.fleetSize} />
									<input
										aria-hidden="true"
										autoComplete="off"
										className="hidden"
										name="website"
										tabIndex={-1}
										type="text"
									/>

									<div className="grid gap-4 sm:grid-cols-2">
										<ContactInput
											autoComplete="given-name"
											error={errors.firstName}
											id={`${formId}-first-name`}
											maxLength={80}
											name="firstName"
											onChange={updateValue}
											placeholder="First name"
											value={values.firstName}
										/>
										<ContactInput
											autoComplete="family-name"
											error={errors.lastName}
											id={`${formId}-last-name`}
											maxLength={80}
											name="lastName"
											onChange={updateValue}
											placeholder="Last name"
											value={values.lastName}
										/>
										<div className="sm:col-span-2">
											<ContactInput
												autoComplete="tel"
												error={errors.phone}
												id={`${formId}-phone`}
												maxLength={30}
												name="phone"
												onChange={updateValue}
												placeholder="Phone number"
												type="tel"
												value={values.phone}
											/>
										</div>
										<div className="sm:col-span-2">
											<ContactInput
												autoComplete="email"
												error={errors.email}
												id={`${formId}-email`}
												maxLength={254}
												name="email"
												onChange={updateValue}
												placeholder="Company email"
												type="email"
												value={values.email}
											/>
										</div>
										<div className="sm:col-span-2">
											<ContactInput
												autoComplete="organization"
												error={errors.company}
												id={`${formId}-company`}
												maxLength={160}
												name="company"
												onChange={updateValue}
												placeholder="Company name"
												value={values.company}
											/>
										</div>
									</div>

									<div className="mt-5 rounded-2xl border border-black/10 bg-[#fcfbf9] p-4 text-sm text-rb-black/62">
										<div className="flex items-center gap-2 font-semibold text-rb-black">
											<HugeIcon icon={Building02Icon} size={16} />
											Request summary
										</div>
										<p className="mt-2">
											{selectedSummary.industry} - {selectedSummary.fleetSize} vehicles or assets
										</p>
									</div>

									<LeadConsentNotice
										className="mt-5 text-center text-sm leading-6 text-rb-black/54"
										id={`${formId}-consent-notice`}
										linkClassName="font-semibold text-rb-black underline underline-offset-4 hover:text-rb-red"
									/>

									<Button
										aria-describedby={`${formId}-consent-notice`}
										className="mt-5 h-13 w-full rounded-full"
										disabled={submissionState === "submitting"}
										type="submit"
									>
										{submissionState === "submitting" ? "Sending..." : "Submit"}
									</Button>

									{submissionError ? (
										<p
											aria-live="polite"
											className="mt-4 rounded-md border border-rb-red/25 bg-rb-peach px-4 py-3 text-center text-sm font-medium text-rb-black"
											role="alert"
										>
											{submissionError}
										</p>
									) : null}

								</form>
							</section>
						) : null}
					</div>
				</div>
			</div>

			<ProgressBar step={step} />
		</main>
	);
}
