import { useRef, useEffect } from "react";

const useClose = (callback: any) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as ChildNode)) {
				callback();
			}
		};
		document.addEventListener("click", handleClick, true);
		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [ref]);

	return ref;
};

export default useClose;
