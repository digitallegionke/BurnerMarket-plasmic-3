import { GetStaticProps } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import { DirectoryItem, fetchDirectoryItems } from '../utils/airtable';
import Navigation from '../components/Navigation';

interface DirectoryPageProps {
  items?: DirectoryItem[];
}

export default function DirectoryPage({ items = [] }: DirectoryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...new Set(items?.flatMap(item => item.fields.Category) || [])];

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.fields?.Category?.includes?.(selectedCategory) ?? false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Directory</h1>
        
        {/* Category Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
            >
              {item.fields.Image && item.fields.Image[0] && (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.fields.Image[0].url}
                    alt={item.fields.Name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.fields.Name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{item.fields.Description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.fields?.Category?.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                {item.fields['Usage Instructions'] && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1">
                      Usage Instructions
                    </h3>
                    <p className="text-gray-600">{item.fields['Usage Instructions']}</p>
                  </div>
                )}
                {item.fields.Details && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1">
                      Details
                    </h3>
                    <p className="text-gray-600">{item.fields.Details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const items = await fetchDirectoryItems();
  return {
    props: {
      items,
    },
    revalidate: 60, // Revalidate every minute
  };
};
