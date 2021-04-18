import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Header from "../../components/Header"

import { TouchableOpacity } from "react-native-gesture-handler";
import { getById, getFavoritesStorage, removeFavoritesStorageById, setFavoriteStorage} from "../../services/people";

export default function Details({ route, navigation }) {
  const { id } = route.params
  const [cachracter, setCachracter] = useState();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    async function fetch() {
      const results = await getById(id);
      setCachracter(results);

      const data = await getFavoritesStorage()
      if(data.includes(parseInt(id))){
        setFavorite(true)
      }
    }
    setCachracter()
    setFavorite(false)
    fetch();

    return function cleanup () {
      setCachracter()
      console.log('unmoint id');
    }
  }, [id]);

  function handleHeight(heigth) {
    return heigth/100
  }

  function handleGender(gender) {
    switch (gender) {
      case 'n/a':
        return 'Não especificado'
      case 'male':
        return 'Masculino'
      case 'female':
        return 'Feminino'
      default:
        return 'Não especificado'
    }
  }

  async function handleFavorite() {
    if(!favorite) {
      setFavorite(true)
      setFavoriteStorage(id)
      return
    } 
    removeFavoritesStorageById(id)
    setFavorite(false)
  }

  if (!!!cachracter) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={`Detalhes - ${cachracter.name}`} />
      <View style={styles.containerDetails}>
        <View styles={styles.boxDetail}>
          <Text style={styles.detailsTitle}>Altura</Text>
          <Text style={styles.detailsDescription}>{handleHeight(cachracter.height)}m</Text>
        </View>
        <View styles={styles.boxDetail}>
          <Text style={styles.detailsTitle}>Peso</Text>
          <Text style={styles.detailsDescription}>{cachracter.mass}Kg</Text>
        </View>
        <View styles={styles.boxDetail}>
          <Text style={styles.detailsTitle}>Genero</Text>
          <Text style={styles.detailsDescription}>{handleGender(cachracter.gender)}</Text>
        </View>
        <TouchableOpacity
          style={ !favorite ? styles.favorite : styles.isfavorite }
          onPress={() => handleFavorite()}
        >
          <Text style={styles.favoriteText}>
            {
              !favorite ? 'Favoritar' : 'Remover favorito'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201652",
  },
  containerDetails: {
    padding: 10,
  },
  boxDetail: {
    margin: 10,
    width: 500,
    flexDirection: "row",
  },
  detailsTitle: {
    fontSize: 22,
    color: "#fff",
  },
  detailsDescription: {
    fontSize: 20,
    color: "#fff",
  },
  favorite: {
    backgroundColor: "#FEE123",
    borderRadius: 10,
    marginTop: 10,
  },
  isfavorite: {
    backgroundColor: "#CE102C",
    borderRadius: 10,
    marginTop: 10,
  },
  favoriteText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
});
