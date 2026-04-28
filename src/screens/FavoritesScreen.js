import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import useFavoritesStore from "../store/favoritesStore";
import colors from "../constants/colors";

export default function FavoritesScreen({ navigation }) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>Belum ada favorit</Text>
        <Text style={styles.emptySubtitle}>Tambahkan dari halaman detail!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Home", {
                  screen: "DetailScreen",
                  params: { showId: item.id },
                })
              }
              style={styles.cardLeft}
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
                <Text
                  style={[
                    styles.cardStatus,
                    {
                      color:
                        item.status === "Running"
                          ? colors.success
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => removeFavorite(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteIcon}>❌</Text>
            </TouchableOpacity>
          </View>
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
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    alignItems: "center",
  },
  cardLeft: {
    flex: 1,
    flexDirection: "row",
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
    fontSize: 12,
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    fontSize: 22,
  },
});
