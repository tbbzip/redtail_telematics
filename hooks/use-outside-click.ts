"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

type OutsideClickEvent = MouseEvent | TouchEvent;

export function useOutsideClick<T extends HTMLElement>(
	ref: RefObject<T | null>,
	callback: (event: OutsideClickEvent) => void
) {
	useEffect(() => {
		const listener = (event: OutsideClickEvent) => {
			const target = event.target;

			if (
				!ref.current ||
				!(target instanceof Node) ||
				ref.current.contains(target)
			) {
				return;
			}

			callback(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [callback, ref]);
}
