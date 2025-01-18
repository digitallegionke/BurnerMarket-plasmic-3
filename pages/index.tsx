import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe, fetchRecipes } from '../utils/airtable';

interface HomePageProps {
  recipes?: Recipe[];
}

export default function HomePage({ recipes = [] }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] lg:h-[800px] bg-[#354439]">
        <div className="absolute inset-0">
          {recipes[0]?.fields.Image?.[0] && (
            <Image
              src={recipes[0].fields.Image[0].url}
              alt={recipes[0].fields['Recipe Name']}
              fill
              className="object-cover opacity-50"
            />
          )}
        </div>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px] h-full flex items-center">
          <div className="max-w-[615px]">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white mb-6">
              Unleash Your Healthy, Creative Magic
            </h1>
            <p className="text-xl sm:text-2xl lg:text-[32px] text-white/90 mb-8">
              Discover delicious recipes and kitchen essentials for your culinary journey.
            </p>
            <Link 
              href="/recipes"
              className="inline-flex items-center px-8 py-4 bg-white text-[#354439] text-lg font-semibold rounded-sm hover:bg-white/90 transition-colors"
            >
              Explore Recipes
              <svg className="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px]">
          <h2 className="text-3xl lg:text-[44px] font-semibold text-[#354439] text-center mb-12">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Recipes', image: recipes[0]?.fields.Image?.[0]?.url, link: '/recipes' },
              { name: 'Meal Prep', image: recipes[1]?.fields.Image?.[0]?.url, link: '/recipes' },
              { name: 'Kitchen Tools', image: recipes[2]?.fields.Image?.[0]?.url, link: '/directory' },
              { name: 'Kitchen Basics', image: recipes[3]?.fields.Image?.[0]?.url, link: '/directory' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative h-[300px] overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-[#354439]/30 group-hover:bg-[#354439]/40 transition-colors z-10" />
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="py-16 lg:py-24 bg-[#354439]/[0.03]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px]">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-[44px] font-semibold text-[#354439]">
              Featured Recipes
            </h2>
            <Link 
              href="/recipes"
              className="flex items-center gap-1.5 py-2.5 text-base font-bold text-[#354439] hover:opacity-80 transition-opacity"
            >
              View all Recipes
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.41713 14.0834L16.2505 14.0834L12.683 17.6508L14.2149 19.1826L18.8656 14.5319C19.2718 14.1256 19.5 13.5746 19.5 13C19.5 12.4255 19.2718 11.8745 18.8656 11.4682L14.2149 6.81745L12.683 8.34928L16.2505 11.9167L5.41713 11.9167L5.41713 14.0834Z" fill="#354439"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.slice(4, 7).map((recipe) => (
              <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="group">
                <div className="flex flex-col gap-5">
                  <div className="relative h-[300px] overflow-hidden">
                    {recipe.fields.Image?.[0] && (
                      <Image
                        src={recipe.fields.Image[0].url}
                        alt={recipe.fields['Recipe Name']}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-sm font-semibold text-[#354439]/70">
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-[22px] font-semibold text-[#354439] group-hover:text-[#2a3a2e] transition-colors">
                      {recipe.fields['Recipe Name']}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px]">
          <div className="bg-[#f9f9f9] px-4 sm:px-[37px] py-[38px]">
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
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await fetchRecipes();
  return {
    props: {
      recipes,
    },
    revalidate: 60, // Revalidate every minute
  };
};
