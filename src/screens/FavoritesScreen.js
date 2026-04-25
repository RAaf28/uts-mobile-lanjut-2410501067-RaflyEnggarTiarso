import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import useFavoritesStore from '../store/favoritesStore';

export default function FavoritesScreen({ navigation }) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Belum ada favorit. Tambahkan dari halaman detail!</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', {
              screen: 'DetailScreen',
              params: { showId: item.id }
            })}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>Genre: {item.genres?.join(', ')}</Text>
              <Text>Rating: {item.rating?.average ?? 'N/A'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeFavorite(item.id)}
              style={{
                backgroundColor: 'red',
                padding: 8,
                marginTop: 6,
                borderRadius: 6,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white' }}>Hapus dari Favorit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}