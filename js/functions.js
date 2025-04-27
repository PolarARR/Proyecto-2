const createPokemonCard = (pokemon) => {
    const card = document.createElement('article');

    const pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;
    
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;

    const pokemonTypesContainer = document.createElement('div');

    const pokemonTypeStyle = document.createElement('i');

    pokemon.types.forEach(type => {
        const pokemonType = document.createElement('span');
        const firstType = pokemon.types[0];
        pokemonType.textContent = type.type.name;
        pokemonType.classList.add('type', type.type.name);
        pokemonTypeStyle.classList.add('type', firstType.type.name);
        pokemonTypesContainer.appendChild(pokemonType);
    });

    card.appendChild(pokemonTypeStyle);
    card.appendChild(pokemonImg);
    card.appendChild(pokemonName);
    card.appendChild(pokemonTypesContainer);

    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 151}})
        .then((response) => {
            const pokemonGrid = document.querySelector('.pokemons');
            const { data } = response;
            const orederedPokemons = [];
            let i = 0;

            data.results.forEach((pokemon) => {
                fetch(pokemon.url)
                    .then((response) => response.json())
                    .then((pokemonData) => {
                        orederedPokemons.push(pokemonData);
                        i++;

                        if (i === data.results.length) {
                            orederedPokemons.sort((a, b) => a.id - b.id);
                        

                        orederedPokemons.forEach ((pokemon) =>{
                            const pokemonCard = createPokemonCard(pokemon);
                            pokemonGrid.appendChild(pokemonCard);
                        }); 
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            }); 
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});