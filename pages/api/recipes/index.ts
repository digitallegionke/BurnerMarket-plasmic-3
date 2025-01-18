import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRecipes } from '../../../utils/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const recipes = await fetchRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error in recipes API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
