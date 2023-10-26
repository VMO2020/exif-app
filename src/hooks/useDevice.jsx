import { useEffect, useState } from 'react';

export const useDevice = () => {
	/* User Device */
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [device, setDevice] = useState('mobile');
	const [userLang, setUserLang] = useState('english');
	/* User Language */
	const lang = navigator.language || navigator.userLanguage;

	const handleUserLang = () => {
		if (lang.includes('es')) {
			setUserLang('spanish');
		} else if (lang.includes('fr')) {
			setUserLang('french');
		}
	};

	/* Dark mode */
	const mode = window.matchMedia('(prefers-color-scheme: dark)').matches;

	const handleWindowResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);

		if (window.innerWidth < 600) {
			setDevice('mobile');
		} else if (window.innerWidth > 600 && window.innerWidth < 1025) {
			setDevice('tablet');
		} else if (window.innerWidth > 1025) {
			setDevice('desktop');
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		handleUserLang();
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
		// eslint-disable-next-line
	}, []);

	return { width, height, device, lang, mode, userLang };
};
