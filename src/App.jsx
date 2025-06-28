import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Users, ChefHat, Heart, Star } from 'lucide-react'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'
import { recipes } from './data/recipes'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [favorites, setFavorites] = useState(new Set())

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack']

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(ingredient => 
                            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                          )
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const toggleFavorite = (recipeId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId)
      } else {
        newFavorites.add(recipeId)
      }
      return newFavorites
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <ChefHat className="w-16 h-16 text-primary-500 mx-auto" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            Recipe Finder
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover delicious recipes with stunning photography and easy-to-follow instructions
          </p>

          {/* Search Bar */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative max-w-2xl mx-auto mb-8"
          >
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input pl-16"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'glass-effect text-gray-700 hover:bg-primary-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Recipes Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchTerm}-${selectedCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  isFavorite={favorites.has(recipe.id)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredRecipes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No recipes found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search terms or browse different categories to discover delicious recipes.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            isFavorite={favorites.has(selectedRecipe.id)}
            onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
