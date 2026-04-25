import { create } from 'zustand';

const useFavoritesStore = create((set) => ({
  favorites: [],

  addFavorite: (show) => set((state) => {
    const isAlreadyFavorite = state.favorites.some((fav) => fav.id === show.id);
    if (isAlreadyFavorite) return state;
    return { favorites: [...state.favorites, show] };
  }),

  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((fav) => fav.id !== id),
  })),

}));

export default useFavoritesStore;