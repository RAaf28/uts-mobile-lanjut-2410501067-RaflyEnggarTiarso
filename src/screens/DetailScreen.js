import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import useFavoritesStore from '../store/favoritesStore';

export default function DetailScreen({ route }) {
  const { showId } = route.params
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === show?.id);

  const fetchDetail = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`)
      const json = await response.json();
      setShow(json);
      } catch (err) {
        setError('Gagal mengambil data, cek internet nya!');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDetail()
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Memuat detail...</Text>
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
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Image
      source={{ uri: show?.image?.original }}
      style={{ width: '100%', height: 300 }}
      resizeMode="cover"
    />
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{show?.name}</Text>
    <Text>Genre: {show?.genres?.join(', ')}</Text>
    <Text>Rating: {show?.rating?.average ?? 'N/A'}</Text>
    <Text>Status: {show?.status}</Text>
    <Text>Schedule: {show?.schedule?.days?.join(', ')} at {show?.schedule?.time}</Text>
    <Text style={{ marginTop: 10 }}>{show?.summary?.replace(/<[^>]*>/g, '')}</Text>

    <TouchableOpacity
      onPress={() => addFavorite(show)}
      style={{
        backgroundColor: isFavorite ? 'gray' : 'blue',
        padding: 12,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center'
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        {isFavorite ? 'Sudah di Favorit' : 'Tambah ke Favorit'}
      </Text>
    </TouchableOpacity>
    </ScrollView>
  )
}