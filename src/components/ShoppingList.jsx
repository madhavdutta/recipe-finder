import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Trash2, ShoppingBag } from 'lucide-react'
import PandaIcon from './PandaIcon'

const ShoppingList = ({ items, onClose, onToggleItem, onRemoveItem }) => {
  const checkedItems = items.filter(item => item.checked)
  const uncheckedItems = items.filter(item => !item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-food rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
              <p className="text-sm text-gray-600">Panda's grocery essentials 🛒</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-4"
            >
              <PandaIcon className="w-16 h-16 text-gray-400 mx-auto" />
            </motion.div>
            <p className="text-gray-600">Your shopping list is empty!</p>
            <p className="text-sm text-gray-500 mt-1">Add ingredients from recipes to get started.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Unchecked items */}
            <AnimatePresence>
              {uncheckedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center space-x-3 p-3 bg-white/30 rounded-xl"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleItem(item.id)}
                    className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-green-500 transition-colors"
                  >
                    {item.checked && <Check className="w-4 h-4 text-green-500" />}
                  </motion.button>
                  <span className="flex-1 text-gray-800 font-medium">{item.name}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Checked items */}
            {checkedItems.length > 0 && (
              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-gray-500 mb-3 flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Completed ({checkedItems.length})
                </p>
                <AnimatePresence>
                  {checkedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-xl mb-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggleItem(item.id)}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.button>
                      <span className="flex-1 text-gray-600 line-through">{item.name}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total items: {items.length}</span>
              <span>Completed: {checkedItems.length}</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ShoppingList
