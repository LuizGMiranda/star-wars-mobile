import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ItemList = ({ people, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.people}>{people.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  people: {
    fontSize: 20,
    color: "#fff",
    padding: 10,
  },
});

export default ItemList;
