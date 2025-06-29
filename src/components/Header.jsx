import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart } from 'lucide-react'
import PandaIcon from './PandaIcon'

const Header = ({ onToggleShoppingList, shoppingCount }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong sticky top-0 z-50 border-b border-white/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 gradient-food rounded-xl flex items-center justify-center shadow-lg"
            >
              <PandaIcon className="w-8 h-8 text-white" color="white" />
            </motion.div>
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-800">RecipePanda</h1>
              <p className="text-sm text-gray-600">Bamboo-licious Recipes 🎋</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass p-3 rounded-xl hover:bg-white/20 transition-colors relative"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleShoppingList}
              className="glass p-3 rounded-xl hover:bg-white/20 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {shoppingCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 gradient-food rounded-full text-xs text-white flex items-center justify-center font-medium"
                >
                  {shoppingCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
