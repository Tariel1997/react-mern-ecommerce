import { motion } from 'framer-motion'
import { CreditCard, Loader, MoveRight } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import axios from '../lib/axios'
import { useCartStore } from '../stores/useCartStore'

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore()
  const savings = subtotal - total
  const [isProcessing, setIsProcessing] = useState(false)

  const formattedSubtotal = subtotal.toFixed(2)
  const formattedTotal = total.toFixed(2)
  const formattedSavings = savings.toFixed(2)

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      const res = await axios.post('/payments/create-checkout-session', {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      })

      const session = res.data

      if (session.url) {
        window.location.href = session.url
      } else {
        console.error('Session URL not found in the response')
      }
    } catch (error) {
      console.error('Error in payment flow:', error)
      toast.error(
        error.response?.data?.message ||
          'An error occurred during payment processing. Please try again.',
      )
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <motion.div
        className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl font-semibold text-emerald-400">Order summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Original price</dt>
              <dd className="text-base font-medium text-white">
                ${formattedSubtotal}
              </dd>
            </dl>

            {savings > 0 && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-300">Savings</dt>
                <dd className="text-base font-medium text-emerald-400">
                  -${formattedSavings}
                </dd>
              </dl>
            )}

            {coupon && isCouponApplied && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-300">
                  Coupon ({coupon?.code})
                </dt>
                <dd className="text-base font-medium text-emerald-400">
                  -{coupon?.discountPercentage}%
                </dd>
              </dl>
            )}

            <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
              <dt className="text-base font-bold text-white">Total</dt>
              <dd className="text-base font-bold text-emerald-400">
                ${formattedTotal}
              </dd>
            </dl>
          </div>

          <motion.button
            className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            whileHover={!isProcessing ? { scale: 1.05 } : {}}
            whileTap={!isProcessing ? { scale: 0.95 } : {}}
            transition={{ duration: 0.3 }}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" aria-hidden="true" />
                Proceed to Checkout
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-400">or</span>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline decoration-emerald-400/50 underline-offset-4 hover:text-emerald-300 hover:decoration-transparent transition-all duration-300 ease-in-out"
            >
              Continue Shopping
              <MoveRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 ease-in-out"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default OrderSummary
