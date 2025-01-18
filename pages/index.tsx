import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Recipe, fetchRecipes } from '../utils/airtable';

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Burner Market Recipes</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">{recipe.fields['Recipe Name']}</h2>
              {recipe.fields['Intro'] && (
                <p className="text-gray-600 mb-4">{recipe.fields['Intro']}</p>
              )}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {recipe.fields['Ingredients']}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {recipe.fields['Preparation']}
                </pre>
              </div>
              {recipe.fields['Image'] && recipe.fields['Image'][0] && (
                <img 
                  src={recipe.fields['Image'][0].thumbnails.large.url}
                  alt={recipe.fields['Recipe Name']}
                  className="w-full h-48 object-cover rounded-lg mt-4"
                />
              )}
              <div className="mt-4 text-sm text-gray-500">
                {recipe.fields['Duration'] && (
                  <p>Duration: {Math.floor(recipe.fields['Duration'] / 60)} minutes</p>
                )}
                {recipe.fields['Categories'] && (
                  <p>Categories: {recipe.fields['Categories'].join(', ')}</p>
                )}
                {recipe.fields['Recipe credits'] && (
                  <p>Credits: {recipe.fields['Recipe credits']}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await fetchRecipes();

  return {
    props: {
      recipes
    }
  };
};
