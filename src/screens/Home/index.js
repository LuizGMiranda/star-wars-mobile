import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

import Header from "../../components/Header"
import { getAll } from "../../services/people";
import ItemList from "../../components/ItemList";
import uniqueID from "../../utils/uniqueID";
import navigateToDetails from "../../utils/navigateToDetails";

export default function Home({ navigation }) {
  const [peoples, setPeoples] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      const { results } = await getAll();
      setPeoples(results);
    }
    fetch();
  }, []);

  const onPress = (id) => {
    navigateToDetails(navigation, id)
  };

  const handleInfiniteLoading = async () => {
    const newPage = page+1
    setPage(newPage);
    const { results } = await getAll(newPage);
    const newPeoples = [...peoples, ...results]
    setPeoples(newPeoples);
  };
  
  return (
    <View style={styles.container}>
      <Header title="Star Wars" />
      <FlatList
        data={peoples}
        keyExtractor={() => uniqueID()}
        renderItem={({item}) => (<ItemList people={item} onPress={() => onPress(item.url)}/>)}
        onEndReached={handleInfiniteLoading}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => (<Text>Carregando....</Text>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201652",
  },
});
