import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonDetailsApi } from "../api/pokemon";
import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";
import Icon from "react-native-vector-icons/FontAwesome5";
import Favorite from "../components/Pokemon/Favorite";
import useAuth from "../hooks/useAuth";

export default function Pokemon({ navigation, route }) {
  const [pokemon, setPokemon] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id} />,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={25}
          style={{ marginLeft: 1 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, route.params, auth, pokemon]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(route.params.id);
        setPokemon(response);
      } catch (error) {}
    })();
  }, [route.params]);
  if (!pokemon) return null;
  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
