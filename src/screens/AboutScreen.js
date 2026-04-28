import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/enggar.jpeg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Rafly Enggar Tiarso</Text>
        <Text style={styles.nim}>2410501067</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>D3 Sistem Informasi</Text>
        </View>
      </View>

      {/* Info Cards */}
      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mata Kuliah</Text>
          <Text style={styles.infoValue}>Pemrograman Mobile Lanjut</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tema</Text>
          <Text style={styles.infoValue}>MovieDex</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Semester</Text>
          <Text style={styles.infoValue}>4</Text>
        </View>
      </View>

      {/* About App */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
        <Text style={styles.description}>
          MovieDex adalah aplikasi katalog film dan series berbasis React Native
          + Expo. Aplikasi ini memungkinkan pengguna untuk menjelajahi show
          populer, melihat detail, mencari judul tertentu, dan menyimpan favorit
          menggunakan Zustand state management.
        </Text>
      </View>

      {/* Tech Stack */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tech Stack</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Framework</Text>
          <Text style={styles.infoValue}>React Native + Expo</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Navigation</Text>
          <Text style={styles.infoValue}>React Navigation</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>State</Text>
          <Text style={styles.infoValue}>Zustand</Text>
        </View>
      </View>

      {/* Credit API */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Credit API</Text>
        <Text style={styles.description}>TVMaze API</Text>
        <Text style={styles.link}>https://api.tvmaze.com</Text>
      </View>

      <Text style={styles.footer}>
        Made with blood, tears, and sweat by Rafly Enggar Tiarso
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: colors.primary,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.text,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },
  nim: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 16,
    margin: 12,
    marginBottom: 0,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
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
    fontSize: 13,
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "500",
  },
  description: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  link: {
    color: "#4a9eff",
    fontSize: 13,
    marginTop: 4,
  },
  footer: {
    color: colors.textSecondary,
    textAlign: "center",
    padding: 24,
    fontSize: 13,
  },
});
