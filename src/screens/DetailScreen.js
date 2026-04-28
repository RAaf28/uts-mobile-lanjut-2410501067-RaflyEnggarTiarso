import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import useFavoritesStore from "../store/favoritesStore";
import colors from "../constants/colors";
import { fetchShowDetail } from "../services/api";

export default function DetailScreen({ route }) {
  const { showId } = route.params;
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === show?.id);

  const fetchDetail = async () => {
    try {
      const data = await fetchShowDetail(showId);
      setShow(data);
    } catch (err) {
      setError("Gagal mengambil data, cek internet nya!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat detail...</Text>
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
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: show?.image?.original }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{show?.name}</Text>

        <View style={styles.badgeRow}>
          {show?.genres?.map((genre) => (
            <View key={genre} style={styles.badge}>
              <Text style={styles.badgeText}>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rating</Text>
          <Text style={styles.infoValue}>{show?.rating?.average ?? "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text
            style={[
              styles.infoValue,
              {
                color:
                  show?.status === "Running"
                    ? colors.success
                    : colors.textSecondary,
              },
            ]}
          >
            {show?.status}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Schedule</Text>
          <Text style={styles.infoValue}>
            {show?.schedule?.days?.join(", ")} at{" "}
            {show?.schedule?.time || "N/A"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Language</Text>
          <Text style={styles.infoValue}>{show?.language ?? "N/A"}</Text>
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>
          {show?.summary?.replace(/<[^>]*>/g, "") ?? "No summary available."}
        </Text>

        <TouchableOpacity
          onPress={() =>
            isFavorite ? removeFavorite(show.id) : addFavorite(show)
          }
          style={[
            styles.favButton,
            { backgroundColor: isFavorite ? colors.danger : colors.primary },
          ]}
        >
          <Text style={styles.favButtonText}>
            {isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  poster: {
    width: "100%",
    height: 350,
  },
  content: {
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  summary: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  favButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  favButtonText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
});
