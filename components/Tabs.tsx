import React from 'react';
import { mockRecipes, mockDirectories } from '@/utils/mockData';

interface TabsProps {
  className?: string;
}

export function Tabs({ className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState('Recipes');
  const [data, setData] = React.useState({
    recipes: mockRecipes,
    directories: mockDirectories
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, directoriesRes] = await Promise.all([
          fetch('/api/recipes'),
          fetch('/api/directory')
        ]);

        if (!recipesRes.ok || !directoriesRes.ok) {
          console.error('Failed to fetch data');
          return;
        }

        const [recipesData, directoriesData] = await Promise.all([
          recipesRes.json(),
          directoriesRes.json()
        ]);

        setData({
          recipes: recipesData.recipes || [],
          directories: directoriesData.directories || []
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tabs = ['Recipes', 'Weekly Meals', 'Kitchen Tools', 'Kitchen Basics'];

  return (
    <div className={className}>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-green-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'Recipes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.recipes.map((recipe) => (
              <div key={recipe.id} className="border p-4 rounded">
                <h3 className="font-bold">{recipe.title}</h3>
                <p className="text-gray-600">{recipe.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    {recipe.cookingTime} • {recipe.servings} servings
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Kitchen Tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.directories.map((item) => (
              <div key={item.id} className="border p-4 rounded">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
