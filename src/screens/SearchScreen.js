import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleSearch = async () => {
    if (!query || query.trim().length === 0) {
      setValidationError("Keyword tidak boleh kosong!");
      return;
    }
    if (query.trim().length < 3) {
      setValidationError("Keyword minimal 3 karakter!");
      return;
    }
    setValidationError(null);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`,
      );
      const json = await response.json();
      setResults(json);
    } catch (err) {
      setError("Gagal mencari data, cek internet kamu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setValidationError(null);
          }}
          placeholder="Cari film atau series..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {validationError && (
        <Text style={styles.validationError}>{validationError}</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 20 }}
        />
      )}

      {results.length === 0 && !loading && !error && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Cari film atau series favoritmu!</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.show.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Home", {
                screen: "DetailScreen",
                params: { showId: item.show.id },
              })
            }
            style={styles.card}
          >
            <Image
              source={{ uri: item.show.image?.medium }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.show.name}
              </Text>
              <Text style={styles.cardGenre} numberOfLines={1}>
                {item.show.genres?.join(", ") || "No genre"}
              </Text>
              <Text style={styles.cardRating}>
                ⭐ {item.show.rating?.average ?? "N/A"}
              </Text>
              <Text style={styles.cardStatus}>{item.show.status}</Text>
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
  searchBar: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.text,
    fontWeight: "bold",
  },
  validationError: {
    color: colors.danger,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  errorText: {
    color: colors.danger,
    paddingHorizontal: 12,
    textAlign: "center",
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.textSecondary,
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
