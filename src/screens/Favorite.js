import { Text, Button } from "react-native";
import React, { useState, useCallback } from "react";
import { getPokemonFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonDetailsApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import NoLogged from "../components/NoLogged";
import { useFocusEffect } from "@react-navigation/native";

// import { SafeAreaView } from "react-native-safe-area-context";
export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonFavoriteApi();

          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailsApi(id);

            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              imagen:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }

          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );
  // console.log(pokemons);

  return !auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />;
}
