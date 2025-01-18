import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDirectoryItemById } from '../../../utils/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid directory item ID' });
  }

  try {
    const item = await fetchDirectoryItemById(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Directory item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error in directory item API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
