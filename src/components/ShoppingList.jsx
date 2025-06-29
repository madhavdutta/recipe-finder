import React from 'react'
import { motion } from 'framer-motion'
import { X, Check, Trash2, ShoppingCart } from 'lucide-react'

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
        initial={{ scale: 0.9, opacity: 0, x: 300 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0.9, opacity: 0, x: 300 }}
        className="glass-strong rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gradient-food p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Shopping List</h2>
                <p className="text-white/80 text-sm">
                  {items.length} items • {checkedItems.length} completed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Your shopping list is empty</p>
              <p className="text-sm text-gray-500 mt-1">
                Add ingredients from recipes to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {uncheckedItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">To Buy</h3>
                  <div className="space-y-2">
                    {uncheckedItems.map((item) => (
                      <ShoppingItem
                        key={item.id}
                        item={item}
                        onToggle={() => onToggleItem(item.id)}
                        onRemove={() => onRemoveItem(item.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {checkedItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Completed</h3>
                  <div className="space-y-2">
                    {checkedItems.map((item) => (
                      <ShoppingItem
                        key={item.id}
                        item={item}
                        onToggle={() => onToggleItem(item.id)}
                        onRemove={() => onRemoveItem(item.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const ShoppingItem = ({ item, onToggle, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
        item.checked ? 'bg-green-50 border border-green-200' : 'bg-white/50 border border-white/30'
      }`}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          item.checked
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {item.checked && <Check className="w-3 h-3" />}
      </motion.button>
      
      <span className={`flex-1 ${item.checked ? 'line-through text-gray-500' : 'text-gray-700'}`}>
        {item.name}
      </span>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}

export default ShoppingList
