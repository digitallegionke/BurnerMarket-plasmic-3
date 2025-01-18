import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRecipeById } from '../../../utils/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }

  try {
    const recipe = await fetchRecipeById(id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error in recipe API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
