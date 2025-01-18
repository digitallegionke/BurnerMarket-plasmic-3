import Airtable from 'airtable';

// Initialize Airtable client
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || '');

// Type definitions
export interface DirectoryItem {
  id: string;
  fields: {
    'Name': string;
    'Description': string;
    'Usage Instructions'?: string;
    'Details'?: string;
    'Category': string[];
    'Image': Array<{
      url: string;
      thumbnails: {
        large: { url: string };
      };
    }>;
  };
}

export interface Recipe {
  id: string;
  fields: {
    'Recipe Name': string;
    'Intro'?: string;
    'Ingredients': string;
    'Preparation': string;
    'Image'?: Array<{
      url: string;
      thumbnails: {
        large: { url: string };
      };
    }>;
    'Categories': string[];
    'Duration'?: number;
    'Created'?: string;
    'Recipe credits'?: string;
  };
}

// Helper function to format Airtable records
const formatRecord = (record: any): Recipe => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

// Fetch all recipes
export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const records = await base(process.env.AIRTABLE_RECIPES_TABLE || '')
      .select({
        view: 'Grid view',
      })
      .all();

    return records.map(record => formatRecord(record));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

// Fetch a single recipe by ID
export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  try {
    const record = await base(process.env.AIRTABLE_RECIPES_TABLE || '').find(id);
    return formatRecord(record);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

// Helper function to format Directory records
const formatDirectoryRecord = (record: any): DirectoryItem => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

// Fetch all directory items
export async function fetchDirectoryItems(): Promise<DirectoryItem[]> {
  try {
    const records = await base(process.env.AIRTABLE_DIRECTORY_TABLE || 'Directory - Ingredients')
      .select({
        view: 'Grid view',
      })
      .all();

    return records.map(record => formatDirectoryRecord(record));
  } catch (error) {
    console.error('Error fetching directory items:', error);
    return [];
  }
}

// Fetch a single directory item by ID
export async function fetchDirectoryItemById(id: string): Promise<DirectoryItem | null> {
  try {
    const record = await base(process.env.AIRTABLE_DIRECTORY_TABLE || 'Directory - Ingredients').find(id);
    return formatDirectoryRecord(record);
  } catch (error) {
    console.error('Error fetching directory item:', error);
    return null;
  }
}
