import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-dvh flex-col bg-background text-foreground">
			<Header />
			<div className="flex-1">{children}</div>
			<Footer />
		</div>
	);
}
