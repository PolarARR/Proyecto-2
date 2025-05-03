const pokeButton = document.querySelector("#poke-boton");
const pokemonInfoContainer = document.querySelector(".info");

pokeButton.addEventListener("click", () => {
    pokeButton.classList.toggle("activated");
    pokemonInfoContainer.classList.toggle("show");
});

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

    card.addEventListener("click", async () => {
        pokemonInfoContainer.innerHTML = "";
        
        if (pokeButton.classList.contains("activated")) {

        } else {
            pokeButton.classList.add("activated");
        }

        try {
            const speciesResponse = await axios.get(pokemon.species.url);
            const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === "es");
            const descriptionText = description ? description.flavor_text : "Descripción no disponible.";

            const pokemonDescription = document.createElement("p");
            pokemonDescription.textContent = descriptionText;
            pokemonDescription.classList.add("info__description");

            const statsContainer = document.createElement("article");
            statsContainer.classList.add("info__stats");

            const stats = [];
            for (let i = 0; i < pokemon.stats.length; i++) {
                stats.push({
                    name: pokemon.stats[i].stat.name,
                    value: pokemon.stats[i].base_stat
                });
            }

            for (let i = 0; i < stats.length; i++) {
                const statElement = document.createElement('p');
                const statValue = document.createElement("p");
                const statsDiv = document.createElement("div");
                statElement.textContent = `${stats[i].name}: `;
                statValue.textContent = `${stats[i].value}`;
                statsDiv.appendChild(statElement);
                statsDiv.appendChild(statValue);
                statsContainer.appendChild(statsDiv);
            }

            const abilitiesContainer = document.createElement("article");
            abilitiesContainer.classList.add("info__types");
            abilitiesContainer.classList.add("info__types--abilities");

            const abilitiesTitle = document.createElement("p");
            abilitiesTitle.textContent = ("Habilidades:");

            const abilitiesDiv = document.createElement("div");
            let abilities = "";
            for (let i = 0; i < pokemon.abilities.length; i++) {
                abilities += pokemon.abilities[i].ability.name;
                if (i < pokemon.abilities.length - 1) {
                    abilities += ", ";
                }
            }
            const abilitiesSpan = document.createElement("span");
            abilitiesSpan.textContent = (abilities);
            abilitiesDiv.appendChild(abilitiesSpan);
            abilitiesContainer.appendChild(abilitiesTitle);
            abilitiesContainer.appendChild(abilitiesSpan);

            const pokemonInfoImg = document.createElement('img');
            pokemonInfoImg.src = pokemon.sprites.front_default;
            pokemonInfoImg.alt = pokemon.name;
            
            const pokemonInfoName = document.createElement('h2');
            pokemonInfoName.textContent = pokemon.name;

            const pokemonInfoTypesContainer = document.createElement('div');

            const pokemonInfoTypeStyle = document.createElement('i');

            pokemonInfoTypeStyle.appendChild(pokemonInfoImg);

            pokemon.types.forEach(type => {
                const pokemonInfoType = document.createElement('span');
                const firstInfoType = pokemon.types[0];
                pokemonInfoType.textContent = type.type.name;
                pokemonInfoType.classList.add('type', type.type.name);
                pokemonInfoTypeStyle.classList.add('type', firstInfoType.type.name);
                pokemonInfoTypesContainer.appendChild(pokemonInfoType);
            });

            const typesContainer = document.createElement("article");
            typesContainer.classList.add("info__types");

            typesContainer.appendChild(pokemonInfoTypesContainer);

            const quitIcon = document.createElement("i");
            quitIcon.classList.add("info__quit");

            const quitImg = document.createElement("img");
            quitImg.src = ("img/x-icon.svg");

            quitIcon.appendChild(quitImg);

            quitIcon.addEventListener("click", () => {
                pokemonInfoContainer.classList.remove("show");
            });

            pokemonInfoContainer.appendChild(quitIcon);
            pokemonInfoContainer.appendChild(pokemonInfoName);
            pokemonInfoContainer.appendChild(pokemonInfoTypeStyle);
            pokemonInfoContainer.appendChild(pokemonDescription);
            pokemonInfoContainer.appendChild(statsContainer);
            pokemonInfoContainer.appendChild(typesContainer);
            pokemonInfoContainer.appendChild(abilitiesContainer);

            if (pokemonInfoContainer.classList.contains("show")) {
                
            } else {
                pokemonInfoContainer.classList.add("show");
            }

        } catch (error){
            console.log("Este es el error: ", error);
        }
    });

    return card;
}

const pokemonGrid = document.querySelector('.pokemons');

const loadPokemons = async (offset = 0, limit = 0) => {
    const orderedPokemons = [];
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {params: {offset, limit}});
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
            const searchedPokemon = orderedPokemons.filter((pokemon) => 
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
            }, 600);
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

const searchContainer = document.querySelector(".search");
const backIcon = document.querySelector("#back-icon");

backIcon.addEventListener("click", () => {
    location.reload();
});

const nationalDex = document.querySelector(".pokemons__national");
const firstGen = document.querySelector(".pokemons__first");
const secondGen = document.querySelector(".pokemons__second");
const thirdGen = document.querySelector(".pokemons__third");
const fourthGen = document.querySelector(".pokemons__fourth");
const fifthGen = document.querySelector(".pokemons__fifth");
const sixthGen = document.querySelector(".pokemons__sixth");
const seventhGen = document.querySelector(".pokemons__seventh");
const eighthGen = document.querySelector(".pokemons__eighth");
const ninthGen = document.querySelector(".pokemons__ninth");
const alternate = document.querySelector(".pokemons__alternate");

nationalDex.addEventListener("click", () => {
    loadPokemons(0, 10000);
    pokemonGrid.classList.add("activated");
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
    setTimeout(() => {
        alert("Puede que el buscador no funcione hasta que todos los Pokémon terminen de cargar. Por favor, espere un momento para poder usarlo. :)");
    }, 1000);});

firstGen.addEventListener("click", () => {
    loadPokemons(0, 151);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

secondGen.addEventListener("click", () => {
    loadPokemons(151, 100);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

thirdGen.addEventListener("click", () => {
    loadPokemons(251, 135);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

fourthGen.addEventListener("click", () => {
    loadPokemons(386, 108);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

fifthGen.addEventListener("click", () => {
    loadPokemons(494, 155);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    backIcon.classList.add("activated");
    searchContainer.classList.add("activated");
    pokeButton.classList.add("show");
});

sixthGen.addEventListener("click", () => {
    loadPokemons(649, 72);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

seventhGen.addEventListener("click", () => {
    loadPokemons(721, 88);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

eighthGen.addEventListener("click", () => {
    loadPokemons(809, 96);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

ninthGen.addEventListener("click", () => {
    loadPokemons(905, 120);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});

alternate.addEventListener("click", () => {
    loadPokemons(1025, 1000);
    setTimeout(() => {
        pokemonGrid.classList.add("activated");
    }, 500);
    searchContainer.classList.add("activated");
    backIcon.classList.add("activated");
    pokeButton.classList.add("show");
});