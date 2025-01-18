import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDirectoryItems } from '../../../utils/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const items = await fetchDirectoryItems();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error in directory API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
