import { View, Text, Image, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image
          source={require('../../assets/enggar.jpeg')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>Rafly Enggar Tiarso</Text>
        <Text style={{ fontSize: 16, marginTop: 8 }}>NIM: 2410501067</Text>
        <Text style={{ fontSize: 16, marginTop: 4 }}>Kelas: D3 Sistem Informasi</Text>
        <Text style={{ fontSize: 16, marginTop: 4 }}>Tema: B - MovieDex</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tentang Aplikasi</Text>
        <Text style={{ marginTop: 8 }}>
          MovieDex adalah aplikasi katalog film dan series yang menggunakan TVMaze API 
          untuk menampilkan data show populer, detail, dan fitur pencarian.
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Credit API</Text>
        <Text style={{ marginTop: 8 }}>TVMaze API - https://api.tvmaze.com</Text>
      </View>
    </ScrollView>
  )
}