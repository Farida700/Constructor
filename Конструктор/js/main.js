const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};



const createHeader = (param) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (param.header.logo) {
		const logo = getElement('img', ['logo'], {
			src: param.header.logo,
			alt: 'Логотип ' + param.title,
		});

		wrapper.append(logo);
	}

	if (param.header.menu) {
		//Домашнее задание
		const nav = getElement('nav', ['menu-list']);
		const allMenuLink = param.header.menu.map(item => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
			if (i === 1) {
				link.style.display = 'none'
			}
			return link;
		});

		nav.append(...allMenuLink);
		wrapper.append(nav);




		const title = document.getElementsByTagName('title');
		title[0].textContent = options.title;

		const addTitle = (title) => {
			const siteTitle = document.querySelector('title');
			siteTitle.textContent = title;
		}
	}

	if (param.header.social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = param.header.social.map(item => {
			const socialLink = getElement('a', ['social-link']);

			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));

			socialLink.href = item.link;

			return socialLink
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}


	header.append(container);
	container.append(wrapper);

	return header;
};

const createMain = ({
	title,
	main: {
		genre,
		rating,
		description,
		trailer
	}
}) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {
			textContent: genre
		});

		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number']),
			{
				textContent: `${rating}/10`
			});

	for (let i = 0; i < 10; i++) {
		const star = getElement('img', ['star'], {
			alt: i ? '' : `Рейтинг ${rating} из 10`,
			src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
		});

		ratingStars.append(star);
	}

	ratingBlock.append(ratingStars, ratingNumber);
	content.append(ratingBlock);
}

content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
		{textContent: title}
	));

	if (description) {
		const.append(getElement('p', 
		['main-description', 'animated', 'fadeInRight'], 
			{textContent: description},
			 ));
	}

	if (trailer) {
		const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], 
		{
			href: trailer,
			textContent: 'Смотреть трейлер',
		});

		const youtubeImgLink = getElement('a', ['play', 'youtube-modal'], 
		{
			href: trailer,
			ariaLabel: 'Смотреть трейлер',
		});

		const iconPlay = getElement('img', ['play-img'], 
		{
			src: 'img/play.svg',
			alt: '',
			ariaHidden: true,
		});

		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		wrapper.append(youtubeImgLink);
	}

	return main;
};

const movieConstructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';

	document.title = options.title;

	if (options.header) {
		app.append(createHeader(options));

	}

	if (options.main) {
		app.append(createMain(options))
	}
};

movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	header: {
		logo: 'witcher/logo.png',
		social: [{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'https://facebook.com',
				image: 'witcher/social/facebook.svg',
			}
		],

		menu: [{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзыв',
				link: '#',
			},
		]
	},
	main: {
		genre: '2019 фэнтези',
		rating: 8,
		description: 'Ведьмак-Геральд мутант и убийца чудовищ',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	},
});