const createPokemonCard = (pokemon) => {
    const card = document.createElement('article');

    const pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;
    
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;

    const pokemonTypesContainer = document.createElement('div');

    pokemon.types.forEach(type => {
        const pokemonType = document.createElement('span');
        pokemonType.textContent = type.type.name;
        pokemonTypesContainer.appendChild(pokemonType);
    });

    card.appendChild(pokemonImg);
    card.appendChild(pokemonName);
    card.appendChild(pokemonTypesContainer);

    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 20}})
        .then((response) => {
            const pokemonGrid = document.querySelector('.pokemons');
            const { data } = response;

            data.results.forEach((pokemon) => {
                fetch(pokemon.url)
                    .then((response) => response.json())
                    .then((pokemonData) => {
                        const pokemonCard = createPokemonCard(pokemonData);
                        pokemonGrid.appendChild(pokemonCard);
                    })
            }); 
        })
        .catch((error) => {
            console.error("Error fetching Pokémon data:", error);
        });
});