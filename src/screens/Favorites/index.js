import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import Header from "../../components/Header";
import ContainerItemList from './ContainerItemList'

export default function Favorites({ navigation }) {

  return (
    <View style={styles.container}>
        <Header title="Favoritos" />
        <ContainerItemList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201652",
  }
});
