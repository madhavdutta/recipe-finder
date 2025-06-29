import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import RecipeGrid from './components/RecipeGrid'
import RecipeModal from './components/RecipeModal'
import ShoppingList from './components/ShoppingList'
import CookingMode from './components/CookingMode'
import PandaIcon from './components/PandaIcon'
import { mockRecipes } from './data/mockRecipes'

function App() {
  const [recipes, setRecipes] = useState(mockRecipes)
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    cuisine: '',
    diet: '',
    difficulty: '',
    time: ''
  })
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
  const [shoppingList, setShoppingList] = useState([])
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [cookingMode, setCookingMode] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  // Filter recipes based on search and filters
  useEffect(() => {
    let filtered = recipes

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply filters
    if (activeFilters.cuisine) {
      filtered = filtered.filter(recipe => recipe.cuisine === activeFilters.cuisine)
    }
    if (activeFilters.diet) {
      filtered = filtered.filter(recipe => recipe.diet.includes(activeFilters.diet))
    }
    if (activeFilters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === activeFilters.difficulty)
    }
    if (activeFilters.time) {
      const timeRanges = {
        'quick': [0, 30],
        'medium': [30, 60],
        'long': [60, 999]
      }
      const [min, max] = timeRanges[activeFilters.time]
      filtered = filtered.filter(recipe => recipe.cookTime >= min && recipe.cookTime <= max)
    }

    setFilteredRecipes(filtered)
  }, [searchQuery, activeFilters, recipes])

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

  const addToShoppingList = (ingredients) => {
    setShoppingList(prev => {
      const newItems = ingredients.filter(ingredient => 
        !prev.some(item => item.name === ingredient)
      ).map(ingredient => ({
        id: Date.now() + Math.random(),
        name: ingredient,
        checked: false
      }))
      return [...prev, ...newItems]
    })
  }

  const toggleShoppingItem = (itemId) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const removeShoppingItem = (itemId) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-food-50 via-sage-50 to-food-100">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-food-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-food-100/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Floating panda icons */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 opacity-10"
        >
          <PandaIcon className="w-16 h-16 text-gray-400" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 3, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-16 opacity-10"
        >
          <PandaIcon className="w-12 h-12 text-gray-400" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <Header 
          onToggleShoppingList={() => setShowShoppingList(!showShoppingList)}
          shoppingCount={shoppingList.length}
        />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <PandaIcon className="w-20 h-20 text-gray-700 mr-4" />
              </motion.div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-800">
                Discover Amazing
                <span className="block gradient-food bg-clip-text text-transparent">
                  Recipes
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our panda family and find the perfect recipe for any occasion with our smart search and beautiful collection 🐼
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-8">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onToggleFilters={() => setShowFilters(!showFilters)}
            />
            
            <AnimatePresence>
              {showFilters && (
                <FilterPanel
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                />
              )}
            </AnimatePresence>
          </div>

          <RecipeGrid
            recipes={filteredRecipes}
            favorites={favorites}
            onRecipeClick={setSelectedRecipe}
            onToggleFavorite={toggleFavorite}
          />

          {/* Empty state with panda */}
          {filteredRecipes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
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
                className="mb-6"
              >
                <PandaIcon className="w-24 h-24 text-gray-400 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No recipes found!</h3>
              <p className="text-gray-600">This panda couldn't find any matching recipes. Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </main>

        {/* Recipe Modal */}
        <AnimatePresence>
          {selectedRecipe && (
            <RecipeModal
              recipe={selectedRecipe}
              isFavorite={favorites.has(selectedRecipe.id)}
              onClose={() => setSelectedRecipe(null)}
              onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
              onAddToShoppingList={() => addToShoppingList(selectedRecipe.ingredients)}
              onStartCooking={() => {
                setCookingMode(selectedRecipe)
                setSelectedRecipe(null)
              }}
            />
          )}
        </AnimatePresence>

        {/* Shopping List */}
        <AnimatePresence>
          {showShoppingList && (
            <ShoppingList
              items={shoppingList}
              onClose={() => setShowShoppingList(false)}
              onToggleItem={toggleShoppingItem}
              onRemoveItem={removeShoppingItem}
            />
          )}
        </AnimatePresence>

        {/* Cooking Mode */}
        <AnimatePresence>
          {cookingMode && (
            <CookingMode
              recipe={cookingMode}
              onClose={() => setCookingMode(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
