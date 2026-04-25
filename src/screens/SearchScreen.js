import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

const handleSearch = async () => {
  if (!query || query.trim().length === 0) {
    setValidationError('Keyword tidak boleh kosong!');
    return;
  }
  if (query.trim().length < 3) {
    setValidationError('Keyword minimal 3 karakter!');
    return;
  }

  setValidationError(null);
  setError(null);
  setLoading(true);

  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const json = await response.json();
    setResults(json);
  } catch (err) {
    setError('Gagal mencari data, cek internet kamu!');
  } finally {
    setLoading(false);
  }
};
  return (
     <View style={{ flex: 1, padding: 16 }}>
    <TextInput
      value={query}
      onChangeText={(text) => {
        setQuery(text);
        setValidationError(null);
      }}
      placeholder="Cari film atau series..."
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 4
      }}
    />
    {validationError && (
      <Text style={{ color: 'red', marginBottom: 8 }}>{validationError}</Text>
    )}
    <TouchableOpacity
      onPress={handleSearch}
      style={{
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Cari</Text>
    </TouchableOpacity>

    {loading && <ActivityIndicator size="large" color="#0000ff" />}
    {error && <Text style={{ color: 'red' }}>{error}</Text>}

    <FlatList
      data={results}
      keyExtractor={(item) => item.show.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', {
            screen: 'DetailScreen',
            params: { showId: item.show.id }
          })}
          style={{ padding: 10, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.show.name}</Text>
          <Text>{item.show.genres?.join(', ')}</Text>
          <Text>Rating: {item.show.rating?.average ?? 'N/A'}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
  )
}