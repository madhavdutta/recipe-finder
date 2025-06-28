import React from 'react'
import { motion } from 'framer-motion'
import { X, Clock, Users, Heart, Star, ChefHat } from 'lucide-react'

const RecipeModal = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
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
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleFavorite}
            className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
        
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.name}</h2>
              <p className="text-gray-600 text-lg">{recipe.description}</p>
            </div>
            <div className="flex items-center space-x-1 bg-yellow-100 rounded-full px-3 py-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-yellow-700 font-medium">{recipe.rating}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-primary-50 rounded-2xl">
              <Clock className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Cook Time</div>
              <div className="font-bold text-gray-800">{recipe.cookTime}</div>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-2xl">
              <Users className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Servings</div>
              <div className="font-bold text-gray-800">{recipe.servings}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-2xl">
              <ChefHat className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Difficulty</div>
              <div className="font-bold text-gray-800">{recipe.difficulty}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-2xl">
              <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Category</div>
              <div className="font-bold text-gray-800 capitalize">{recipe.category}</div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-gray-700 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 leading-relaxed">{instruction}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RecipeModal
