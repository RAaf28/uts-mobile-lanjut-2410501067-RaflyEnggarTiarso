# MovieDex - Katalog Film & Series

## Identitas
- **Nama:** Rafly Enggar Tiarso
- **NIM:** 2410501067
- **Kelas:** B
- **Tema:** MovieDex

---

## Tema yang Dipilih
MovieDex - Katalog Film & Series menggunakan TVMaze API

---

## Tech Stack
| Teknologi | Versi |
|-----------|-------|
| React Native | 0.81.5 |
| Expo SDK | ~54.0.33 |
| @react-navigation/native | ^7.2.2 |
| @react-navigation/native-stack | ^7.14.11 |
| @react-navigation/bottom-tabs | ^7.15.9 |
| Zustand | ^5.0.12 |

---

## Cara Install & Run
```bash
# Clone repository
git clone https://github.com/RAaf28/uts-mobile-lanjut-2410501067-RaflyEnggarTiarso.git

# Masuk ke folder project
cd uts-mobile-lanjut-2410501067-RaflyEnggarTiarso

# Install dependencies
npm install

# Jalankan aplikasi
npx expo start
```
Scan QR code menggunakan Expo Go di Android atau iOS.

---

| Screen | Preview |
|--------|---------|
| Home | ![Home](screenshots/Home.jpeg) |
| Detail | ![Detail](screenshots/Detail.jpeg) |
| Favorites | ![Favorites](screenshots/Favorites.jpeg) |
| Search | ![Search](screenshots/Search.jpeg) |
| About | ![About](screenshots/About.jpeg) |

---

## Video Demo
[ISI LINK YOUTUBE/GOOGLE DRIVE DI SINI]

---

## State Management - Zustand
### Kenapa Zustand?
Setelah membandingkan kompleksitas juga fitur dari ke-3 state management saya melihat kalau zustand memiliki karakteristik yang ada diantara context API dan Redux, dimana zustand memiliki fitur quality of life yang membuat state management menjadi lebih mudah dan tidak redundan disaat bersamaan tidak memerlukan setup terlalu kompleks seperti redux dimana bisa menjadi overkill untuk proyek ini. Contoh nya Untuk kebutuhan menyimpan array favorit dan dua action sederhana seperti add dan remove, Zustand lebih dari cukup tanpa perlu boilerplate yang berlebihan. 

### Kelebihan Zustand untuk proyek ini:
Dari tutorial yang saya lihat di internet zustand memiliki setup yang paling simple dan memenuhi untuk proyek ini dimana tidak memerlukan waktu lama untuk mempelajari syntax rumit terlebih dahulu juga tidak memiliki setup template yang terlalu panjang, Tidak perlu Provider wrapper di App.js seperti Context API, cukup import store langsung di komponen yang membutuhkan. jadi minimalis dan simple tapi memiliki fitur yang dibutuhkan untuk proyek skala ini.

### Kekurangan Zustand:
Dibandingkan dengan redux yang menjadi standar industri, dokumentasi dan dukungan komunitas zustand tidak sebanyak redux, membuat sulit jika menemukan kesulitan spesifik contoh nya state Zustand tidak persist, data favorit akan hilang saat aplikasi di-restart, untuk production app perlu integrasi tambahan seperti AsyncStorage. Mungkin redux memiliki belasan artikel komunitas lebih yang membahas ini dibandingkan zustand.

---

## Referensi
API
https://www.tvmaze.com/api
https://api.tvmaze.com/shows
https://api.tvmaze.com/shows/:id

https://api.tvmaze.com/search/shows?q=:query
React Native
https://reactnative.dev/docs/getting-started
https://reactnative.dev/docs/flatlist
https://reactnative.dev/docs/scrollview
https://reactnative.dev/docs/image
https://reactnative.dev/docs/touchableopacity
https://reactnative.dev/docs/stylesheet
https://reactnative.dev/docs/activityindicator
https://react.dev/reference/react/useState
Expo
https://docs.expo.dev/
https://expo.dev/go
https://docs.expo.dev/versions/latest/sdk/status-bar/
https://docs.expo.dev/guides/icons/
https://docs.expo.dev/get-started/set-up-your-environment/
React Navigation
https://reactnavigation.org/docs/getting-started
https://reactnavigation.org/docs/bottom-tab-navigator
https://reactnavigation.org/docs/native-stack-navigator
https://reactnavigation.org/docs/params
https://reactnavigation.org/docs/bottom-tab-navigator#screenoptions
https://reactnavigation.org/docs/navigation-container
https://www.npmjs.com/package/@react-navigation/native
https://www.npmjs.com/package/@react-navigation/bottom-tabs
https://www.npmjs.com/package/@react-navigation/native-stack
Zustand
https://zustand.docs.pmnd.rs/
https://zustand.docs.pmnd.rs/getting-started/introduction
https://zustand.docs.pmnd.rs/apis/create
https://zustand.docs.pmnd.rs/guides/react-native
https://www.npmjs.com/package/zustand
Dependencies lain
https://docs.expo.dev/versions/latest/sdk/safe-area-context/
https://github.com/software-mansion/react-native-screens
https://docs.swmansion.com/react-native-gesture-handler/
Fetch API
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
Tutorial umum
https://www.reactnative.express/
https://docs.expo.dev/tutorial/introduction/
https://reactnavigation.org/docs/hello-react-navigation
https://dev.to/franklin030601/using-zustand-to-manage-state-in-react-3a8f
https://www.youtube.com/watch?v=0-S5a0eXPoc
https://www.tvmaze.com/api#show-index





---

## Refleksi Pengerjaan

Pengerjaan proyek UTS ini memberikan banyak pelajaran berharga, terutama dalam memahami ekosistem React Native yang berbeda dari web development biasa. Salah satu kesulitan awal yang saya hadapi adalah memahami bahwa komponen React Native seperti View dan Text harus ditulis dengan huruf kapital, hal kecil yang menyebabkan app crash dan cukup memakan waktu untuk ditemukan. Selain itu, konsep nested navigation antara Stack Navigator dan Bottom Tab Navigator juga cukup membingungkan di awal, terutama saat harus navigate dari FavoritesScreen dan SearchScreen menuju DetailScreen yang berada di dalam HomeStack. Selain itu untuk menemukan fitur fitur yang diperlukan saya juga melihat detail packages dan depedencies yang harus diimport dalam proyek ini.

Untuk state management, saya memilih Zustand karena setupnya yang minimalis namun cukup untuk kebutuhan proyek ini. Mempelajari syntax Zustand sempat membingungkan terutama perbedaan antara menggunakan kurung kurawal biasa dan arrow function di dalam fungsi set(). Secara keseluruhan, proyek ini membuat saya lebih memahami bagaimana sebuah aplikasi mobile dibangun dari nol, mulai dari setup project, navigasi, integrasi API, hingga state management.
