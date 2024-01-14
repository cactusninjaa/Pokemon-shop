document.addEventListener("DOMContentLoaded", () => {
    const pokemonList = JSON.parse(localStorage.getItem("pokemonInCart")) || []; 
    const cartWrapper = document.querySelector('.cart-wrapper')

    const createPokemonCard = (pokemon, location) => {
        const pokemonCard = document.createElement('div')
        pokemonCard.classList.add('pokemon-card') 
        location.appendChild(pokemonCard)
        pokemonCard.innerHTML = `<h3>${pokemon.name}</h3><p>#${pokemon.id.toString().padStart(3, "0")}</p>  
        <img class="pokemon-img" src="${pokemon.sprites.other.home.front_default
    }" alt="">
        <a class="deleteButton" id="${pokemon.id}">Delete</a>`

        deletePokemon(pokemonCard)
    }

    const deleteCard = (card) => {
        card.remove()
    }

    const deletePokemon = (pokemonCard) => {
        
        const deleteButton = pokemonCard.querySelector('.deleteButton')
        deleteButton.addEventListener("click", ()=>{
            const index = pokemonList.indexOf(deleteButton.id);
            pokemonList.splice(index, 1);
            localStorage.setItem("pokemonInCart", JSON.stringify(pokemonList));
            const card = deleteButton.parentNode
            deleteCard(card)
        })
        
    }


    
    pokemonList.forEach((pokemon) =>{
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
            .then(result => result.json())
            .then((data) => {
                createPokemonCard(data, cartWrapper)
            })
    })

})

