// Aqui estara todo para la manipulacion de dom
const $ = (selector) => document.querySelector(selector);

//header
const titleHeader = $('.header__title h1')
const showCategories = $('.nav__categories')

//NAV
const nav =$('.nav')
const inputSearch = $('.input__search')
const btnSearch = $('.header__icon')
const categoriesBtn = $('#show-Categories')

//Main Sections
const sectionTrends = $('.section__trends') //movie Trends
const sectionTvTrends = $('.section__trends-tv')
const sectionDetails = $('.section__details')


//card de movies

const articleCard = $('.article__card-movie')


//section de search for categorie
const titlePageCategory= $('.section__category--title')
const sectionCategorie = $('.section__categorie')