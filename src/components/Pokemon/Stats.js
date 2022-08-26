import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { map, capitalize } from "lodash";

export default function Stats({ stats }) {
  const barStyles = (num) => {
    const color = num > 49 ? "#00ac17" : "#ff3e3e";
    return {
      backgroundColor: color,
      width: `${num}%`,
    };
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block}>
          <View style={styles.blockTitle}>
            <Text style={styles.statName}>{capitalize(item.stat.name)}</Text>
          </View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View style={[styles.bar, barStyles(item.base_stat)]} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, marginTop: 30, marginBottom: 80 },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 15,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 7,
  },
  blockTitle: {
    width: "32%",
  },
  statName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  blockInfo: {
    width: "68%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 14,
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    height: 5,
    borderRadius: 20,
  },
});
