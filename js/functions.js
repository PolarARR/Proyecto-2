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
/*const loadPokemons = async () {
    const pokemonGrid = document.querySelector('.pokemons');
try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 1302}});
        const { data } = response.data.results;
    }
}
const loadPokemons = async () => {
    const pokemonGrid = document.querySelector('.pokemons');
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 1302}});
            const { data } = response.data.results;
            const orderedPokemons = [];
0            let i = 0;

            data.results.forEach((pokemon) => {
                fetch(pokemon.url) 
                    .then((response) => response.json())
                    .then((pokemonData) => {
                        orderedPokemons.push(pokemonData);
                        i++;

                        if (i === data.results.length) {
                            orderedPokemons.sort((a, b) => a.id - b.id);
                        

                        orderedPokemons.forEach ((pokemon) =>{
                            const pokemonCard = createPokemonCard(pokemon);
                            pokemonGrid.appendChild(pokemonCard);
                        }); 

                        const searchInput = document.getElementById("search-input");
                        const searchIcon = document.getElementById("search-icon");
                        const searchSectio-*n = document.querySelector(".search");

                        searchInput.addEventListener("input", (event) => {
                            const searchUl = document.querySelector("#suggestions");
                            const searchedPokemon = orderedPokemons.filter(pokemon => 
                                pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
                            );                 
                            let counter = 0;

                            searchUl.innerHTML = "";

                            if (event.target.value.toLowerCase() === "") { return; }

                            searchedPokemon.forEach((pokemon) => {
                                if (counter >= 5) { return; }

                                const searchLi = document.createElement("li");
                                const searchPokemonName = document.createElement("p");
                                const searchPokemonImg = document.createElement("img");

                                searchPokemonName.textContent = pokemon.name;
                                searchPokemonImg.src = pokemon.sprites.front_default;
                                searchPokemonImg.alt = pokemon.name;

                                searchLi.appendChild(searchPokemonName);
                                searchLi.appendChild(searchPokemonImg);
                                searchUl.appendChild(searchLi);

                                counter++;
                            });

                            switch (searchedPokemon.length) {
                                case 4:
                                    searchUl.classList.add("fourSuggestions");
                                    break;
                                case 3:
                                    searchUl.classList.add("threeSuggestions");
                                    searchUl.classList.remove("fourSuggestions");
                                    break;
                                case 2:
                                    searchUl.classList.add("twoSuggestions");
                                    searchUl.classList.remove("fourSuggestions", "threeSuggestions");
                                    break;
                                case 1:
                                    searchUl.classList.add("oneSuggestion");
                                    searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions");
                                    break;
                                default:
                                    searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions", "oneSuggestion");
                                    break;
                            }
                            
                            searchUl.addEventListener("click", (event) => {
                                const clickedPokemonName = event.target.querySelector("p").textContent;
                                const clickedPokemon = orderedPokemons.find(pokemon => pokemon.name === clickedPokemonName);
                                
                                pokemonGrid.innerHTML = "";
                                const clickedPokemonCard = createPokemonCard(clickedPokemon);
                                pokemonGrid.appendChild(clickedPokemonCard);

                                searchInput.value = clickedPokemonName;
                                searchUl.innerHTML = "";
                                searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions", "oneSuggestion");
                            });
                        });

                        searchInput.addEventListener("blur", () => {
                            setTimeout(() => {
                                const searchUl = document.querySelector("#suggestions");
                                searchUl.innerHTML = "";
                                searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions", "oneSuggestion");    
                            }, 100);
                        });

                        searchInput.addEventListener("keydown", (event) => {
                            searchIcon.addEventListener("click", () => {
                                pokemonGrid.innerHTML = "";
    
                                const searchedPokemon = orderedPokemons.filter(pokemon => 
                                    pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
                                );
                                
                                searchedPokemon.forEach((pokemon) => {
                                    const searchedPokemonCard = createPokemonCard(pokemon);
                                    pokemonGrid.appendChild(searchedPokemonCard);
                                });

                                if (pokemonGrid.innerHTML === "") {
                                    const emptyMessage = document.createElement("h3");
                                    emptyMessage.textContent = "No se encontró ningún pokémon con este nombre :(";
                                    pokemonGrid.appendChild(emptyMessage);
                                }

                                searchInput.classList.add("searching");
                                searchIcon.classList.add("searching");

                                setTimeout(() => {
                                    searchInput.classList.remove("searching");
                                    searchIcon.classList.remove("searching");
                                }, 500);
                            });

                            if (event.key === "Enter") {
                                pokemonGrid.innerHTML = "";

                                const searchedPokemon = orderedPokemons.filter(pokemon => 
                                    pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
                                );

                                searchedPokemon.forEach((pokemon) => {
                                    const searchedPokemonCard = createPokemonCard(pokemon);
                                    pokemonGrid.appendChild(searchedPokemonCard);
                                });        
                                
                                if (pokemonGrid.innerHTML === "") {
                                    const emptyMessage = document.createElement("h3");
                                    emptyMessage.textContent = "No se encontró ningún pokémon con este nombre :(";
                                    pokemonGrid.appendChild(emptyMessage);
                                }

                                searchInput.classList.add("searching");
                                searchIcon.classList.add("searching");

                                setTimeout(() => {
                                    searchInput.classList.remove("searching");
                                    searchIcon.classList.remove("searching");
                                }, 500);
                            } 
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
*/

const loadPokemons = async () => {
    const pokemonGrid = document.querySelector('.pokemons');
    const orderedPokemons = [];
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 1302}});
        const pokemons = response.data.results;

        pokemonGrid.innerHTML = "";

        for (const pokemon of pokemons) {
            const detailsResponse = await axios.get(pokemon.url);
            orderedPokemons.push(detailsResponse.data);
            const pokemonCard = createPokemonCard(detailsResponse.data);
            pokemonGrid.appendChild(pokemonCard);
        }
        
        orderedPokemons.sort((a, b) => a.id - b.id);

        const searchInput = document.getElementById("search-input");
        const searchIcon = document.getElementById("search-icon");

        searchInput.addEventListener("input", (event) => {
            const searchUl = document.querySelector("#suggestions");
            const searchedPokemon = orderedPokemons.filter(pokemon => 
                pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
            );                 
            let counter = 0;

            searchUl.innerHTML = "";

            if (event.target.value.toLowerCase() === "") { return; }

            searchedPokemon.forEach((pokemon) => {
                if (counter >= 5) { return; }

                const searchLi = document.createElement("li");
                const searchPokemonName = document.createElement("p");
                const searchPokemonImg = document.createElement("img");

                searchPokemonName.textContent = pokemon.name;
                searchPokemonImg.src = pokemon.sprites.front_default;
                searchPokemonImg.alt = pokemon.name;

                searchLi.appendChild(searchPokemonName);
                searchLi.appendChild(searchPokemonImg);
                searchUl.appendChild(searchLi);

                counter++;
            });

            switch (searchedPokemon.length) {
                case 4:
                    searchUl.classList.add("fourSuggestions");
                    break;
                case 3:
                    searchUl.classList.add("threeSuggestions");
                    searchUl.classList.remove("fourSuggestions");
                    break;
                case 2:
                    searchUl.classList.add("twoSuggestions");
                    searchUl.classList.remove("fourSuggestions", "threeSuggestions");
                    break;
                case 1:
                    searchUl.classList.add("oneSuggestion");
                    searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions");
                    break;
                default:
                    searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions", "oneSuggestion");
                    break;
            }
            
            searchUl.addEventListener("click", (event) => {
                const clickedPokemonName = event.target.querySelector("p").textContent;
                const clickedPokemon = orderedPokemons.find(pokemon => pokemon.name === clickedPokemonName);
                
                pokemonGrid.innerHTML = "";
                const clickedPokemonCard = createPokemonCard(clickedPokemon);
                pokemonGrid.appendChild(clickedPokemonCard);

                searchInput.value = clickedPokemonName;
                searchUl.innerHTML = "";
                searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions", "oneSuggestion");
            });
        });

        searchInput.addEventListener("blur", () => {
            setTimeout(() => {
                const searchUl = document.querySelector("#suggestions");
                searchUl.innerHTML = "";
                searchUl.classList.remove("fourSuggestions", "threeSuggestions", "twoSuggestions", "oneSuggestion");    
            }, 1000);
        });

        searchInput.addEventListener("keydown", (event) => {
            searchIcon.addEventListener("click", () => {
                pokemonGrid.innerHTML = "";

                const searchedPokemon = orderedPokemons.filter(pokemon => 
                    pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
                );
                
                searchedPokemon.forEach((pokemon) => {
                    const searchedPokemonCard = createPokemonCard(pokemon);
                    pokemonGrid.appendChild(searchedPokemonCard);
                });

                if (pokemonGrid.innerHTML === "") {
                    const emptyMessage = document.createElement("h3");
                    emptyMessage.textContent = "No se encontró ningún pokémon con este nombre :(";
                    pokemonGrid.appendChild(emptyMessage);
                }

                searchInput.classList.add("searching");
                searchIcon.classList.add("searching");

                setTimeout(() => {
                    searchInput.classList.remove("searching");
                    searchIcon.classList.remove("searching");
                }, 500);
            });

            if (event.key === "Enter") {
                pokemonGrid.innerHTML = "";

                const searchedPokemon = orderedPokemons.filter(pokemon => 
                    pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
                );

                searchedPokemon.forEach((pokemon) => {
                    const searchedPokemonCard = createPokemonCard(pokemon);
                    pokemonGrid.appendChild(searchedPokemonCard);
                });        
                
                if (pokemonGrid.innerHTML === "") {
                    const emptyMessage = document.createElement("h3");
                    emptyMessage.textContent = "No se encontró ningún pokémon con este nombre :(";
                    pokemonGrid.appendChild(emptyMessage);
                }

                searchInput.classList.add("searching");
                searchIcon.classList.add("searching");

                setTimeout(() => {
                    searchInput.classList.remove("searching");
                    searchIcon.classList.remove("searching");
                }, 500);
            } 
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
const pokeButton = document.querySelector("#poke-button");
const menu = document.querySelector("aside");

pokeButton.addEventListener("click", () => {
    menu.classList.toggle("activated");
    pokeButton.classList.toggle("activated");
});

document.addEventListener("DOMContentLoaded", loadPokemons);