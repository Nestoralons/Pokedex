import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import getColorByPokemonType from "../utils/getColorByPokemType";
import { useNavigation } from "@react-navigation/native";
import { capitalize } from "lodash";

export default function PokemonCard({ pokemon }) {
  const navigation = useNavigation();
  const goToPokemon = () => {
    navigation.navigate("Pokemon", { id: pokemon.id });
  };

  const pokemonColor = getColorByPokemonType(pokemon.type);

  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgstyles };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>#{pokemon.order}</Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Image source={{ uri: pokemon.imagen }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 7,
  },
  bgstyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 5,
    width: 90,
    height: 90,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
    top: -13,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 9,
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});
