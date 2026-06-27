import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  admin: null,
  token: localStorage.getItem('adminToken'),
  setAuth: (admin, token) => {
    localStorage.setItem('adminToken', token);
    set({ admin, token });
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ admin: null, token: null });
  }
}));

export const useGalleryStore = create((set) => ({
  images: [],
  setImages: (images) => set({ images }),
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  removeImage: (id) => set((state) => ({ 
    images: state.images.filter(img => img._id !== id) 
  }))
}));
