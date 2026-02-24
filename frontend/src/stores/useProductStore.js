import toast from 'react-hot-toast'
import { create } from 'zustand'

import axios from '../lib/axios'

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true })
    try {
      const res = await axios.post('/products', productData)
      set((prevState) => ({
        products: [...prevState.products, res.data.product || res.data],
        loading: false,
      }))
      toast.success('Product created successfully!')
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to create product')
      set({ loading: false })
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true })
    try {
      const response = await axios.get('/products')
      console.log(response.data)
      set({ products: response.data.products, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false })
      toast.error(error?.response?.data?.error || 'Failed to fetch products')
    }
  },

  deleteProduct: async (productId) => {
    const previousProducts = get().products
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }))
    try {
      await axios.delete(`/products/${productId}`)
      toast.success('Product deleted successfully')
    } catch (error) {
      set({ products: previousProducts })
      toast.error(error?.response?.data?.error || 'Failed to delete product')
    }
  },

  toggleFeaturedProduct: async (productId) => {
    const previousProducts = get().products
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId
          ? { ...product, isFeatured: !product.isFeatured }
          : product,
      ),
    }))
    try {
      await axios.patch(`/products/${productId}`)
    } catch (error) {
      set({ products: previousProducts })
      toast.error(error?.response?.data?.error || 'Failed to update product')
    }
  },
}))
