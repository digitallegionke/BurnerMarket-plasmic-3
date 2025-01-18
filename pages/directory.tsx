import { GetStaticProps } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DirectoryItem, fetchDirectoryItems } from '../utils/airtable';

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
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4 sm:px-8 lg:px-[120px] py-4">
        <Link href="/" className="text-xs font-medium text-[#595959] hover:text-[#354439] transition-colors">Home</Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
          <path d="M8.62986 8.00033L5.91436 5.285C5.82214 5.19267 5.77492 5.07661 5.7727 4.93683C5.77059 4.79717 5.81781 4.679 5.91436 4.58233C6.01103 4.48578 6.12814 4.4375 6.2657 4.4375C6.40325 4.4375 6.52036 4.48578 6.61703 4.58233L9.6132 7.5785C9.67553 7.64094 9.71953 7.70678 9.7452 7.776C9.77086 7.84522 9.7837 7.92 9.7837 8.00033C9.7837 8.08067 9.77086 8.15544 9.7452 8.22467C9.71953 8.29389 9.67553 8.35972 9.6132 8.42217L6.61703 11.4183C6.5247 11.5106 6.40864 11.5578 6.26886 11.56C6.1292 11.5621 6.01103 11.5149 5.91436 11.4183C5.81781 11.3217 5.76953 11.2046 5.76953 11.067C5.76953 10.9294 5.81781 10.8123 5.91436 10.7157L8.62986 8.00033Z" fill="#354439"/>
        </svg>
        <span className="text-xs font-medium text-[#595959] opacity-60">Directory</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-center text-[#354439] py-8">Directory</h1>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px]">
        {/* Category Filter */}
        <div className="flex justify-start lg:justify-center gap-3.5 mb-[52px] overflow-x-auto pb-4 lg:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-[30px] py-[9px] text-base lg:text-lg font-semibold rounded-sm transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#354439] text-white border-2 border-[#354439]'
                  : 'bg-[#354439]/[0.08] text-[#354439] hover:bg-[#354439]/[0.12]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-sm overflow-hidden border border-[#E7E7E7] hover:border-[#354439] transition-colors group"
            >
              {item.fields.Image && item.fields.Image[0] && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.fields.Image[0].url}
                    alt={item.fields.Name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4 sm:p-6 lg:p-[30px]">
                <h2 className="text-xl lg:text-[22px] font-semibold text-[#354439] mb-2 group-hover:text-[#2a3a2e] transition-colors">
                  {item.fields.Name}
                </h2>
                <p className="text-base text-[#595959] mb-4">{item.fields.Description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.fields?.Category?.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-[#354439]/[0.08] text-sm font-medium text-[#354439] rounded-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                {item.fields['Usage Instructions'] && (
                  <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase text-[#354439]/70 mb-1">
                      Usage Instructions
                    </h3>
                    <p className="text-base text-[#595959]">{item.fields['Usage Instructions']}</p>
                  </div>
                )}
                {item.fields.Details && (
                  <div>
                    <h3 className="text-sm font-bold uppercase text-[#354439]/70 mb-1">
                      Details
                    </h3>
                    <p className="text-base text-[#595959]">{item.fields.Details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-[#f9f9f9] px-4 sm:px-[37px] py-[38px] mt-16 mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-[102px]">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#354439]">
              Inspired? Follow us for<br />more recipes.
            </h2>
            <div className="w-full lg:w-[662px]">
              <div className="flex justify-between items-center border-b border-[#354439]/40 py-4 mb-[18px]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-transparent text-lg lg:text-xl text-[#354439] opacity-40 outline-none w-full"
                />
                <button className="flex items-center gap-1.5 py-2.5 hover:opacity-80 transition-opacity ml-4">
                  <span className="text-base font-bold text-[#354439]">Sign up</span>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.41713 14.0834L16.2505 14.0834L12.683 17.6508L14.2149 19.1826L18.8656 14.5319C19.2718 14.1256 19.5 13.5746 19.5 13C19.5 12.4255 19.2718 11.8745 18.8656 11.4682L14.2149 6.81745L12.683 8.34928L16.2505 11.9167L5.41713 11.9167L5.41713 14.0834Z" fill="#354439"/>
                  </svg>
                </button>
              </div>
              <p className="text-base lg:text-lg font-semibold text-[#354439]">
                Check our privacy policy on how we collect and process your information.
              </p>
            </div>
          </div>
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
