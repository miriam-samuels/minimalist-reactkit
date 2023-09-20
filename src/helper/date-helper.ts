export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const options = {
		month: "short" as const,
		day: "numeric" as const,
		year: "numeric" as const,
		hour: "numeric" as const,
		minute: "numeric" as const,
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
	return formattedDate;
}

export const isDateString = (str: string) => {
	const timestamp = Date.parse(str);
	return !isNaN(timestamp);
};