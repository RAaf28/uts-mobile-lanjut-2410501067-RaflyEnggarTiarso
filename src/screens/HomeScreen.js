import { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchShows = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/shows");
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError("Gagal mengambil data, cek internet nya!");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchShows();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Sedang memuat...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DetailScreen", { showId: item.id })
            }
            style={styles.card}
          >
            <Image
              source={{ uri: item.image?.medium }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.cardGenre} numberOfLines={1}>
                {item.genres?.join(", ") || "No genre"}
              </Text>
              <Text style={styles.cardRating}>
                ⭐ {item.rating?.average ?? "N/A"}
              </Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.text,
    marginTop: 8,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: 90,
    height: 120,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardGenre: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  cardRating: {
    color: colors.text,
    fontSize: 13,
    marginBottom: 4,
  },
  cardStatus: {
    color: colors.success,
    fontSize: 12,
  },
});
