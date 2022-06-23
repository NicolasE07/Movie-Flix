const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '5100783057b8ad5c8e0086a48e4d9424',
	},
	headers: {
		'Content-Type': 'application/json;charset="UTF-8"',
	},
});

const moviesInTrend = async () => {
	const { data } = await api('trending/movie/day');
	const movies = data.results;
	console.log(movies);
	const sectionArtcle = document.querySelector('.section__trends .article__movies');
	sectionArtcle.innerHTML = '';

	movies.forEach((movie) => {
		const div = document.createElement('div');
		const titlemovie = document.createElement('h3');
		const titlemovieText = document.createTextNode(movie.title);
		div.classList.add('article__card-movie');
		const img = document.createElement('img');

		img.setAttribute('alt', movie.title);
		img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
		img.classList.add('movie-post');

		div.appendChild(img);
		div.appendChild(titlemovie);
		titlemovie.appendChild(titlemovieText);
		img.addEventListener('click', () => {
			location.hash = `#detailsmovie=${movie.id}_${movie.title}_${movie.media_type}`;
		});
		titlemovie.addEventListener('click', () => {
			location.hash = `#detailsmovie=${movie.id}_${movie.title}_${movie.media_type}`;
		});
		sectionArtcle.appendChild(div);
	});
};

const tvInTrend = async () => {
	const { data } = await api('trending/tv/day');
	const series = data.results;
	console.log(series);
	const sectionArtcle = document.querySelector('.section__trends-tv .article__movies');
	sectionArtcle.innerHTML = '';
	series.forEach((serie) => {
		const div = document.createElement('div');
		const titleSerie = document.createElement('h3');
		const titleSerieText = document.createTextNode(serie.name);
		div.classList.add('article__card-movie');
		const img = document.createElement('img');

		img.setAttribute('alt', serie.title);
		img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + serie.poster_path);
		img.classList.add('movie-post');

		div.appendChild(img);
		div.appendChild(titleSerie);
		titleSerie.appendChild(titleSerieText);
		img.addEventListener('click', () => {
			location.hash = `#detailsmovie=${serie.id}_${serie.name}_${serie.media_type}`;
		});
		titleSerie.addEventListener('click', () => {
			location.hash = `#detailsmovie=${serie.id}_${serie.name}_${serie.media_type}`;
		});
		sectionArtcle.appendChild(div);
	});
};

const getCategoriesMovie = async () => {
	const { data } = await api(`genre/movie/list`, {
		params: {
			language: 'es',
		},
	});
	const categories = data.genres;
	console.log('Categories', categories);
	showCategories.innerHTML = '';
	categories.forEach((categorie) => {
		const ul = document.createElement('ul');
		const li = document.createElement('li');
		const a = document.createElement('a');
		const textA = document.createTextNode(categorie.name);
		a.setAttribute('href', '');

		ul.appendChild(li);
		li.appendChild(textA);
		showCategories.appendChild(ul);
		li.style.cssText = `cursor:pointer;`;
		li.addEventListener('click', () => {
			console.log(`#categorie`);
			location.hash = `#categorie=${categorie.id}-${categorie.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()}-movie`;
		});
	});
};

const movieDetails = async (id, type) => {
	const { data } = await api(`${type}/${id}`, {
		params: {
			language: 'es',
		},
	});
	const details = [data];
	console.log('movie', details);
	const section = document.getElementById('details');
	section.innerHTML = '';

	details.forEach((detail) => {
		const container = document.createElement('div');
		const containerRun = document.createElement('div');
		const h2 = document.createElement('h2');
		const pop = document.createElement('p');
		const duration = document.createElement('p');
		const date = document.createElement('p');
		const description = document.createElement('p'); 
		const a = document.createElement('a');
		const aText = document.createTextNode('Ver Ahora')
		const h2Text = document.createTextNode(detail.original_title || detail.name);
		const popText = document.createTextNode(`⭐${detail.vote_average}`);
		const durationText = document.createTextNode(type==="movie"? `${detail.runtime}Min`:`${detail.number_of_seasons}T`);
		const dateText = document.createTextNode(detail.release_date || detail.first_air_date);
		const descriptionText = document.createTextNode(`${detail.overview}`);
		container.classList.add('section__details--header', 'container');
		description.classList.add('description');
		containerRun.classList.add('duration');
		a.classList.add('ver')
		a.setAttribute('href', `${detail.homepage}`)
		a.setAttribute('target', '_blank')

		section.style.cssText = `background-image: linear-gradient(180deg, #000000af, 0%, #000000af 100%),
		url('https://image.tmdb.org/t/p/original${detail.poster_path}');
        padding-top:60px;`;

		section.appendChild(container);
		container.appendChild(h2);
		h2.appendChild(h2Text);
		container.appendChild(containerRun);
		containerRun.appendChild(pop);
		containerRun.appendChild(duration);
		containerRun.appendChild(date);
		pop.appendChild(popText);
		duration.appendChild(durationText);
		description.appendChild(descriptionText);
		container.appendChild(description);
		date.appendChild(dateText);
		a.appendChild(aText)
		container.appendChild(a)

		const ul = document.createElement('ul');
		detail.genres.forEach((name) => {
			const li = document.createElement('li');
			const liText = document.createTextNode(name.name);
			container.insertBefore(ul, description);
			ul.appendChild(li);
			li.addEventListener('click', () => {
				location.hash = `#categorie=${name.id}-${name.name.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()}-${type}`;
			});
			ul.style.display = 'flex';
			li.style.cursor = 'pointer';
			li.style.padding = '15px 10px 25px 0';
			li.style.textDecoration = ' underline';
			li.style.fontSize = ' 1.6rem';
			li.appendChild(liText);
			console.log(name.name);
		});
	});
};
// const tvDetails = async (id) => {
// 	const { data } = await api(`tv/${id}`, {
// 		params: {
// 			language: 'es',
// 		},
// 	});
// 	const details = [data];
// 	console.log(details);
// 	const section = document.getElementById('details');
// 	section.innerHTML = '';

// 	details.forEach((detail) => {
// 		const container = document.createElement('div');
// 		const containerRun = document.createElement('div');
// 		const h2 = document.createElement('h2');
// 		const pop = document.createElement('p');
// 		const duration = document.createElement('p');
// 		const date = document.createElement('p');
// 		const description = document.createElement('p');

// 		const h2Text = document.createTextNode(`${detail.name}`);
// 		const popText = document.createTextNode(`⭐${detail.vote_average}`);
// 		const durationText = document.createTextNode(`${detail.number_of_seasons}T`);
// 		const dateText = document.createTextNode(`${detail.first_air_date}`);
// 		const descriptionText = document.createTextNode(`${detail.overview}`);
// 		container.classList.add('section__details--header', 'container');
// 		description.classList.add('description');
// 		containerRun.classList.add('duration');

// 		section.style.cssText = `background-image: linear-gradient(180deg, #000000af, 0%, #000000af 100%),
// 		url('https://image.tmdb.org/t/p/original${detail.poster_path}');
// 		padding-top:60px;`;

// 		section.appendChild(container);
// 		container.appendChild(h2);
// 		h2.appendChild(h2Text);
// 		container.appendChild(containerRun);
// 		containerRun.appendChild(pop);
// 		containerRun.appendChild(duration);
// 		containerRun.appendChild(date);
// 		pop.appendChild(popText);
// 		duration.appendChild(durationText);
// 		description.appendChild(descriptionText);
// 		container.appendChild(description);
// 		date.appendChild(dateText);
// 	});
// };

const getMoviesForCategory = async (id, name, type) => {
	const { data } = await api(`discover/${type}`, {
		params: {
			with_genres: id,
		},
	});
	const movies = data.results;
	console.log(movies);
	const sectionArtcle = document.querySelector('.section__categorie .article__categorie--movie');

	sectionArtcle.innerHTML = '';
	titlePageCategory.innerText = `${name.toUpperCase()}`;

	movies.forEach((movie) => {
		const div = document.createElement('div');
		const titlemovie = document.createElement('h3');
		const titlemovieText = document.createTextNode(movie.title || movie.name);
		div.classList.add('article__card-movie');
		const img = document.createElement('img');

		img.setAttribute('alt', movie.title);
		img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
		img.classList.add('movie-post');

		div.appendChild(img);
		div.appendChild(titlemovie);
		titlemovie.appendChild(titlemovieText);
		img.addEventListener('click', () => {
			location.hash = `#detailsmovie=${movie.id}_${movie.title || movie.name}_${type}`;
		});
		titlemovie.addEventListener('click', () => {
			location.hash = `#detailsmovie=${movie.id}_${movie.title || movie.name}_${type}`;
		});
		sectionArtcle.appendChild(div);
	});
};
const searchForName = async (query, name) => {
	const { data } = await api('search/multi', {
		params: {
			query,
		},
	});
	const movies = data.results;
	console.log(movies);
	const sectionArtcle = document.querySelector('.section__categorie .article__categorie--movie');

	sectionArtcle.innerHTML = '';
	titlePageCategory.innerText = `${name}`;

	movies.forEach((movie) => {
		const div = document.createElement('div');
		const titlemovie = document.createElement('h3');
		const titlemovieText = document.createTextNode(movie.title || movie.name);
		div.classList.add('article__card-movie');
		const img = document.createElement('img');

		img.setAttribute('alt', movie.title);
		img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
		img.classList.add('movie-post');

		div.appendChild(img);
		div.appendChild(titlemovie);
		titlemovie.appendChild(titlemovieText);
		img.addEventListener('click', () => {
			location.hash = `#detailsmovie=${movie.id}-${movie.title}`;
		});
		titlemovie.addEventListener('click', () => {
			location.hash = `#detailsmovie=${movie.id}-${movie.title}`;
		});
		sectionArtcle.appendChild(div);
	});
};
