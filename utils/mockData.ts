export const mockRecipes = [
  {
    id: "1",
    title: "Creamy Butter Beans",
    description: "A delicious and creamy butter beans recipe",
    ingredients: [
      { name: "butter beans", amount: "2", unit: "cups" },
      { name: "garlic", amount: "4", unit: "cloves" },
      { name: "olive oil", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Soak beans overnight",
      "Sauté garlic in olive oil",
      "Add beans and cook until creamy"
    ],
    cookingTime: "45 minutes",
    servings: 4,
    category: "Main Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Spicy Grilled Peppers",
    description: "Grilled peppers with a spicy kick",
    ingredients: [
      { name: "bell peppers", amount: "4", unit: "whole" },
      { name: "chili flakes", amount: "1", unit: "tsp" },
      { name: "olive oil", amount: "1", unit: "tbsp" }
    ],
    instructions: [
      "Cut peppers in half",
      "Season with oil and chili",
      "Grill until charred"
    ],
    cookingTime: "20 minutes",
    servings: 4,
    category: "Side Dish",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockDirectories = [
  {
    id: "1",
    name: "Bell Peppers",
    description: "Sweet and colorful peppers",
    category: "Vegetables",
    usage: "Can be eaten raw or cooked",
    tips: [
      "Store in the refrigerator",
      "Wash before use",
      "Remove seeds before cooking"
    ],
    substitutes: [
      "Poblano peppers",
      "Anaheim peppers"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Butter Beans",
    description: "Large, creamy white beans",
    category: "Legumes",
    usage: "Great in soups and stews",
    tips: [
      "Soak overnight before cooking",
      "Cook until tender",
      "Season well"
    ],
    substitutes: [
      "Lima beans",
      "Great Northern beans"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
