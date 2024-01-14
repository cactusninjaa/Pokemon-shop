document.addEventListener("DOMContentLoaded", () => {
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


    //Elements
    const pokemonWrapper = document.querySelector('.pokemon-wrapper')
    const seeMoreBtn = document.querySelector('.more-btn')
    
    
    //Helpers
    const createPokemonCard = (pokemon, location) => {
        const pokemonCard = document.createElement('div')
        pokemonCard.classList.add('pokemon-card') 
        location.appendChild(pokemonCard)
        pokemonCard.innerHTML = `<h3>${pokemon.name}</h3><p>#${pokemon.id.toString().padStart(3, "0")}</p>  
        <img class="pokemon-img" src="${pokemon.sprites.other.home.front_default
    }" alt="">`
        //add an eventListener on each card
        openProductPage(pokemonCard, pokemon)
        pokemonCard.addEventListener("mouseover", ()=>{
            pokemonCard.style.backgroundColor = pokemonColours[pokemon.types[0].type.name]
        })
    }

    const showMorePokemon = () => {
        seeMoreBtn.addEventListener("click", ()=> {
            // load 60 more pokemon
            pokemonChargeCounter += 60
            showPokemon(pokemonChargeCounter)
        })
    }

    const showPokemon = (pokemonChargeCounter) => {
        for (let i = pokemonChargeCounter - 60; i < pokemonChargeCounter; i++){
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(result => result.json())
                .then((data) => {
                        createPokemonCard(data, pokemonWrapper)
                    });
        }
    }

    const openProductPage = (pokemonCard, pokemon) => {
        pokemonCard.addEventListener('click', () => {
            //open the page while giving the id in url
            window.location.href = 'product-page.html?id=' + pokemon.id;
        });
    }

    
    //iniate 60 first pokemon
    let pokemonChargeCounter = 61
    showPokemon(pokemonChargeCounter)
    //listen to see more button
    showMorePokemon()
})