import { View, Text, StyleSheet, Button } from "react-native";
import React, { useCallback, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { size } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonFavoriteApi } from "../../api/favorite";
export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonFavoriteApi();
          setTotal(size(response));
        } catch (error) {
          setTotal(0);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>
          {`${auth.firstName}` + " " + `${auth.lastname}`}
        </Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu
          title="Nombre"
          text={`${auth.firstName}` + " " + `${auth.lastname}`}
        />
        <ItemMenu title="Username" text={`${auth.username}`} />
        <ItemMenu title="Email" text={`${auth.email}`} />
        <ItemMenu title="Total favoritos" text={`${total} pokemons`} />
      </View>
      <Button title="Desconectarse" onPress={logout}></Button>
    </View>
  );
}
function ItemMenu(props) {
  const { title, text } = props;
  return (
    <View style={styles.ItemMenu}>
      <Text style={styles.ItemMenuTitle}>{title}</Text>
      <Text style={styles.ItemMenuTitle}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBotton: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  ItemMenu: {
    flexDirection: "row",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  ItemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
});
