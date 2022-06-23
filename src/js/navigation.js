window.addEventListener('DOMContentLoaded', navigate, false);
window.addEventListener('hashchange', navigate, false);
titleHeader.addEventListener('click', () => {
	location.hash = '#home';
});
btnSearch.addEventListener('click', () => {
	location.hash = `#search=${inputSearch.value}`;
	if (inputSearch.value === '') {
		location.hash = `#search=avengers`;
	} else {
		location.hash = `#search=${inputSearch.value}`;
	}
});

categoriesBtn.addEventListener('click', () => {
	const validacion = [...showCategories.classList];
	validacion.forEach((clase) => {
		if (clase === 'inactive') {
			showCategories.classList.remove('inactive');
			
		} else if (clase !== 'inactive'){
			showCategories.classList.add('inactive')
		}
	});
});

function navigate() {
	if (location.hash.startsWith('#home')) {
		console.log('HOME');
		homePage();
		moviesInTrend();
		tvInTrend();
		getCategoriesMovie();
	} else if (location.hash.startsWith('#detailsmovie=')) {
		console.log('Detalles');
		detailPageMovie();
	} else if (location.hash.startsWith('#detailstv=')) {
		console.log('Detalles TV');
		detailPageTv();
	} else if (location.hash.startsWith('#categorie=')) {
		console.log('Categorias');
		categoriePage();
	} else if (location.hash.startsWith('#search=')) {
		searchPage();
	} else {
		location.hash = '#home';
	}

	window.scrollTo(0, 0);
}

const homePage = () => {
	nav.classList.remove('inactive');
	showCategories.classList.add('inactive')
	sectionCategorie.classList.add('inactive');
	sectionTrends.classList.remove('inactive');
	sectionTvTrends.classList.remove('inactive');
	sectionDetails.classList.add('inactive');
};

const detailPageMovie = () => {
	nav.classList.add('inactive');
	sectionTrends.classList.add('inactive');
	sectionTvTrends.classList.add('inactive');
	sectionDetails.classList.remove('inactive');
	const [_, categoryName] = location.hash.split('=');
	const [id, name, type] = categoryName.split('_');
	console.log(`este es el nombre${name.split('%20').join(' ')} type = ${type}`);
	movieDetails(id, type);
};
const detailPageTv = () => {
	nav.classList.add('inactive');
	sectionTrends.classList.add('inactive');
	sectionTvTrends.classList.add('inactive');
	sectionDetails.classList.remove('inactive');
	const [_, categoryName] = location.hash.split('=');
	const [id, name] = categoryName.split('-');
	console.log(`este es el nombre${name.split('%20').join(' ')}`);
	tvDetails(id);
};
const categoriePage = () => {
	nav.classList.add('inactive');
	sectionTrends.classList.add('inactive');
	sectionTvTrends.classList.add('inactive');
	sectionDetails.classList.add('inactive');
	sectionCategorie.classList.remove('inactive');
	const [_, categoryName] = location.hash.split('=');
	const [id, name, type] = categoryName.split('-');
	console.log(`este es el nombre${name.split('%20').join(' ')}`);
	getMoviesForCategory(id, name.split('%20').join(' '), type);
};
const searchPage = () => {
	nav.classList.add('inactive');
	sectionTrends.classList.add('inactive');
	sectionTvTrends.classList.add('inactive');
	sectionDetails.classList.add('inactive');
	sectionCategorie.classList.remove('inactive');
	const [_, Name] = location.hash.split('=');
	inputSearch.value = '';
	searchForName(Name.split('%20').join(' '), Name.split('%20').join(' '));
};
