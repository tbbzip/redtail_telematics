"use client";

export default function GlobalError({
	unstable_retry,
}: {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}) {
	return (
		<html lang="en">
			<body
				style={{
					background: "#ffffff",
					color: "#111111",
					fontFamily: "system-ui, sans-serif",
					margin: 0,
				}}
			>
				<main
					style={{
						display: "grid",
						minHeight: "100vh",
						placeItems: "center",
						padding: "32px",
						textAlign: "center",
					}}
				>
					<div>
						<h1>Redtail is temporarily unavailable</h1>
						<p>Please try loading the page again.</p>
						<button
							onClick={() => unstable_retry()}
							style={{
								background: "#cf1317",
								border: 0,
								borderRadius: "999px",
								color: "white",
								cursor: "pointer",
								fontWeight: 700,
								marginTop: "16px",
								padding: "12px 22px",
							}}
							type="button"
						>
							Try again
						</button>
					</div>
				</main>
			</body>
		</html>
	);
}
