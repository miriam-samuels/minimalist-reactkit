import { useState, useEffect } from "react";

const usePortrait = (): boolean => {
	const [isPortrait, setIsPortrait] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsPortrait(window.innerHeight > window.innerWidth);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isPortrait;
};

export default usePortrait;
