// import "script.js"

document.addEventListener("DOMContentLoaded", () => {
    //Elements
    const container = document.querySelector('.product-page')
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const cartPokemons = []

    const pokemonColours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };


    const showStats = (data) => {
        data.stats.forEach((stat)=> {
            const pokemonStats = document.createElement('div')
            container.querySelector('.pokemon-stats').appendChild(pokemonStats)
            pokemonStats.innerHTML = `<p>${stat.stat.name} :</p><p>${stat.base_stat}</p>`
            pokemonStats.querySelector('p').style.textTransform = 'capitalize'
        })
    }

    const showTypes = (data) => {
        data.types.forEach((type) =>{
            const pokemonTypeImg = document.createElement('img')
            container.querySelector('.pokemon-types').appendChild(pokemonTypeImg)
            console.log(type)
            pokemonTypeImg.src = `src/type/${type.type.name}.png`

            // const img = document.querySelector('.img')            
            // img.style.backgroundColor = pokemonColours[type.type.name]
        })
    }

    
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then(result => result.json())
        .then((data) => {
            console.log(data)
            container.innerHTML = `<div class="img" style = "background-color : ${pokemonColours[data.types[0].type.name]}">
            <img src="${data.sprites.other.home.front_default}" alt="" class="pokemon-img">
        </div>
        <div class="pokemon-info">
            <div class="wrapper">
                <h1 class="pokemon-name">${data.name}</h1>
                <div class="pokemon-types"></div>
            </div>
            <div class="pokemon-stats"></div>
            <a class="addButton" id="${pokemonId}">Add to cart</a> 
        </div>`
            showStats(data)
            showTypes(data)
            const addButton = document.querySelector('.addButton')
            addToCart(addButton)
        })
    
    const addToCart = (addButton) => {
        addButton.addEventListener("click", () => {
            const addButtonId = addButton.id
            const pokemonList = JSON.parse(localStorage.getItem("pokemonInCart")) || [];
            console.log(pokemonList)
            if (!pokemonList.includes(addButtonId)){
                pokemonList.push(addButtonId);
                localStorage.setItem("pokemonInCart", JSON.stringify(pokemonList));
            }
        })
    }
})