"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
			<div className="h-1.5 w-20 overflow-hidden rounded-full border border-white/25 bg-white/8">
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
	onSelect,
	selected,
}: {
	choices: Choice[];
	onSelect: (value: string) => void;
	selected: string;
}) {
	return (
		<div className="mx-auto mt-10 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{choices.map((choice) => {
				const active = selected === choice.value;

				return (
					<button
						aria-pressed={active}
						className={cn(
							"flex min-h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.075] px-5 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.11] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rb-red/35",
							active &&
								"border-rb-red/80 bg-rb-red/16 text-white shadow-[0_18px_60px_rgba(207,19,23,0.18)]",
						)}
						key={choice.value}
						onClick={() => onSelect(choice.value)}
						type="button"
					>
						<span className="flex flex-col items-center gap-3">
							{choice.icon ? (
								<HugeIcon icon={choice.icon} size={30} strokeWidth={2.2} />
							) : null}
							<span className="text-lg font-semibold">{choice.label}</span>
						</span>
					</button>
				);
			})}
		</div>
	);
}

function ContactInput({
	error,
	id,
	name,
	onChange,
	placeholder,
	type = "text",
	value,
}: {
	error?: string;
	id: string;
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
				aria-invalid={Boolean(error)}
				className={cn(
					"h-14 rounded-md border-black/18 bg-white px-5 text-base text-rb-black placeholder:text-rb-black/45 focus-visible:border-rb-red focus-visible:ring-rb-red/16",
					error && "border-rb-red focus-visible:border-rb-red",
				)}
				id={id}
				name={name}
				onChange={(event) => onChange(name, event.target.value)}
				placeholder={placeholder}
				type={type}
				value={value}
			/>
			{error ? (
				<p className="mt-2 text-sm font-medium text-rb-red">{error}</p>
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
	const [submitted, setSubmitted] = useState(false);
	const canContinue = step === 1 ? Boolean(industry) : Boolean(fleetSize);
	const selectedSummary = useMemo(
		() => ({
			fleetSize: fleetSize ? getChoiceLabel(fleetSizes, fleetSize) : "",
			industry: industry ? getChoiceLabel(industries, industry) : "",
		}),
		[fleetSize, industry],
	);

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

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const nextErrors = validateContact(values);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length) {
			return;
		}

		setSubmitted(true);
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
						{step > 1 && !submitted ? (
							<button
								className="mb-8 inline-flex items-center gap-2 text-base font-semibold text-white/54 transition hover:text-white"
								onClick={goBack}
								type="button"
							>
								<HugeIcon icon={ArrowLeft01Icon} size={18} />
								Back
							</button>
						) : null}

						{submitted ? (
							<section className="mx-auto max-w-2xl text-center">
								<div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rb-red text-white shadow-[0_22px_70px_rgba(207,19,23,0.28)]">
									<HugeIcon icon={CheckmarkCircle02Icon} size={34} />
								</div>
								<p className="mt-8 text-sm font-semibold tracking-[0.24em] text-white/56 uppercase">
									Request received
								</p>
								<h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
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

						{step === 1 && !submitted ? (
							<section className="text-center">
								<p className="text-sm font-semibold tracking-[0.24em] text-white/52 uppercase">
									Step 1 of 3
								</p>
								<h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
									What&apos;s your industry?
								</h1>
								<ChoiceGrid
									choices={industries}
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

						{step === 2 && !submitted ? (
							<section className="text-center">
								<p className="text-sm font-semibold tracking-[0.24em] text-white/52 uppercase">
									Step 2 of 3
								</p>
								<h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
									How many vehicles or assets do you operate?
								</h1>
								<div className="mx-auto mt-10 grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{fleetSizes.map((choice) => {
										const active = fleetSize === choice.value;

										return (
											<button
												aria-pressed={active}
												className={cn(
													"flex min-h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.075] px-5 text-lg font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.11] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rb-red/35",
													active &&
														"border-rb-red/80 bg-rb-red/16 shadow-[0_18px_60px_rgba(207,19,23,0.18)]",
												)}
												key={choice.value}
												onClick={() => setFleetSize(choice.value)}
												type="button"
											>
												{choice.label}
											</button>
										);
									})}
								</div>
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

						{step === 3 && !submitted ? (
							<section className="text-center">
								<p className="text-sm font-semibold tracking-[0.24em] text-white/52 uppercase">
									Step 3 of 3
								</p>
								<h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
									Last step: where can we reach you?
								</h1>
								<p className="mt-4 text-lg text-white/62">
									This helps us route you to the right Redtail specialist.
								</p>

								<form
									className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 text-left shadow-[0_28px_90px_rgba(1,1,1,0.44)] sm:p-8"
									onSubmit={handleSubmit}
								>
									<input name="industry" type="hidden" value={selectedSummary.industry} />
									<input name="fleetSize" type="hidden" value={selectedSummary.fleetSize} />

									<div className="grid gap-4 sm:grid-cols-2">
										<ContactInput
											error={errors.firstName}
											id={`${formId}-first-name`}
											name="firstName"
											onChange={updateValue}
											placeholder="First name"
											value={values.firstName}
										/>
										<ContactInput
											error={errors.lastName}
											id={`${formId}-last-name`}
											name="lastName"
											onChange={updateValue}
											placeholder="Last name"
											value={values.lastName}
										/>
										<div className="sm:col-span-2">
											<ContactInput
												error={errors.phone}
												id={`${formId}-phone`}
												name="phone"
												onChange={updateValue}
												placeholder="Phone number"
												type="tel"
												value={values.phone}
											/>
										</div>
										<div className="sm:col-span-2">
											<ContactInput
												error={errors.email}
												id={`${formId}-email`}
												name="email"
												onChange={updateValue}
												placeholder="Company email"
												type="email"
												value={values.email}
											/>
										</div>
										<div className="sm:col-span-2">
											<ContactInput
												error={errors.company}
												id={`${formId}-company`}
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

									<Button className="mt-5 h-13 w-full rounded-full" type="submit">
										Submit
									</Button>

									<p className="mt-5 text-center text-sm leading-6 text-rb-black/54">
										By clicking Submit, you agree to be contacted by Redtail
										Telematics and acknowledge our{" "}
										<Link
											className="font-semibold text-rb-black underline underline-offset-4 hover:text-rb-red"
											href="/privacy-policy"
										>
											Privacy Policy
										</Link>
										.
									</p>
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
