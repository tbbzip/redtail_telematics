import { cache } from "react";

import { type JobOpening } from "@/lib/jobs";
import { client } from "@/sanity/lib/client";
import { ACTIVE_CAREER_VACANCIES_QUERY } from "@/sanity/lib/queries";

type SanityCareerVacancy = {
	_id: string;
	applicationEmail?: string | null;
	applicationUrl?: string | null;
	department?: string | null;
	location?: string | null;
	summary?: string | null;
	title?: string | null;
	type?: string | null;
};

function validApplicationUrl(value?: string | null) {
	if (!value) {
		return undefined;
	}

	try {
		const url = new URL(value);
		return url.protocol === "https:" ? url.toString() : undefined;
	} catch {
		return undefined;
	}
}

function normalizeVacancy(vacancy: SanityCareerVacancy): JobOpening | null {
	if (!vacancy.title || !vacancy.summary) {
		return null;
	}

	const job: JobOpening = {
		id: vacancy._id,
		summary: vacancy.summary,
		title: vacancy.title,
	};
	const applicationUrl = validApplicationUrl(vacancy.applicationUrl);

	if (applicationUrl) {
		job.applicationUrl = applicationUrl;
	} else if (vacancy.applicationEmail?.trim()) {
		job.applicationEmail = vacancy.applicationEmail.trim().toLowerCase();
	}

	if (vacancy.department) {
		job.department = vacancy.department;
	}

	if (vacancy.location) {
		job.location = vacancy.location;
	}

	if (vacancy.type) {
		job.type = vacancy.type;
	}

	return job;
}

export const getActiveCareerVacancies = cache(async (): Promise<JobOpening[]> => {
	try {
		const vacancies = await client.fetch<SanityCareerVacancy[]>(
			ACTIVE_CAREER_VACANCIES_QUERY,
		);

		return vacancies
			.map((vacancy) => normalizeVacancy(vacancy))
			.filter((vacancy): vacancy is JobOpening => Boolean(vacancy));
	} catch (error) {
		console.error(
			"[Sanity] Failed to fetch active career vacancies.",
		);
		throw error;
	}
});
