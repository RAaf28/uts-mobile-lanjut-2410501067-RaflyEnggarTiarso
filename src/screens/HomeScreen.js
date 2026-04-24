import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows')
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError('Gagal mengambil data, cek internet nya!');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
  fetchShows()
}, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchShows();
    setRefreshing(false);
  };

    if (loading && !refreshing) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Wait, sedang loading</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      )
    }

      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { showId: item.id })}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.genres?.join(', ')}</Text>
              <Text>Rating: {item.rating?.average ?? 'N/A'}</Text>
              </View>
          </TouchableOpacity>
        )}
      />
    </View>
)
}
