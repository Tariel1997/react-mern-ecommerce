import { AnimatePresence, motion } from 'framer-motion'
import { Star, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useProductStore } from '../stores/useProductStore'

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore()
  const [productIdToDelete, setProductIdToDelete] = useState(null)

  useEffect(() => {
    if (productIdToDelete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [productIdToDelete])

  console.log('products', products)

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Category
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="size-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white capitalize">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  ${Number(product.price || 0).toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300 capitalize">
                  {product.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-600 text-gray-300'
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="size-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setProductIdToDelete(product._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AnimatePresence>
        {productIdToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProductIdToDelete(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-2xl max-w-sm w-full z-10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setProductIdToDelete(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteProduct(productIdToDelete)
                    setProductIdToDelete(null)
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default ProductsList
