export const scrollTo = (selector: string) => {
	const el = document.querySelector(selector);
	const domRect = el?.getBoundingClientRect();
	if (domRect) {
		window.scroll({
			top: domRect.top,
			behavior: 'smooth'
		});
	}
};
