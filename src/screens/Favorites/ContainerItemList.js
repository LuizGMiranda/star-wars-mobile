import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ItemList from "../../components/ItemList";
import { getById, getFavoritesStorage } from "../../services/people";
import navigateToDetails from "../../utils/navigateToDetails";
import uniqueID from "../../utils/uniqueID";

const ContainerItemList = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function fetch() {
      const favorites = [];
      const idsStrogae = await getFavoritesStorage();

      for (let index = 0; index < idsStrogae.length; index++) {
        const element = idsStrogae[index];
        const data = await getById(element);
        favorites.push(data);
      }
      setItems(favorites);
    }

    fetch();
  }, []);

  const onPress = (id) => {
    navigateToDetails(navigation, id);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const idsStrogae = await getFavoritesStorage();
    const favorites = [];
    for (let index = 0; index < idsStrogae.length; index++) {
      const element = idsStrogae[index];
      const data = await getById(element);
      favorites.push(data);
    }
    setItems(favorites);
    setRefreshing(false);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={() => uniqueID()}
      renderItem={({ item }) => (
        <ItemList people={item} onPress={() => onPress(item.url)} />
      )}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
};

export default ContainerItemList;
