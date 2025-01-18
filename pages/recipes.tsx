import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe, fetchRecipes } from '../utils/airtable';
import Navigation from '../components/Navigation';

interface RecipesPageProps {
  recipes?: Recipe[];
}

export default function RecipesPage({ recipes = [] }: RecipesPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4 sm:px-8 lg:px-[120px] py-4">
        <Link href="/" className="text-xs font-medium text-[#595959]">Home</Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
          <path d="M8.62986 8.00033L5.91436 5.285C5.82214 5.19267 5.77492 5.07661 5.7727 4.93683C5.77059 4.79717 5.81781 4.679 5.91436 4.58233C6.01103 4.48578 6.12814 4.4375 6.2657 4.4375C6.40325 4.4375 6.52036 4.48578 6.61703 4.58233L9.6132 7.5785C9.67553 7.64094 9.71953 7.70678 9.7452 7.776C9.77086 7.84522 9.7837 7.92 9.7837 8.00033C9.7837 8.08067 9.77086 8.15544 9.7452 8.22467C9.71953 8.29389 9.67553 8.35972 9.6132 8.42217L6.61703 11.4183C6.5247 11.5106 6.40864 11.5578 6.26886 11.56C6.1292 11.5621 6.01103 11.5149 5.91436 11.4183C5.81781 11.3217 5.76953 11.2046 5.76953 11.067C5.76953 10.9294 5.81781 10.8123 5.91436 10.7157L8.62986 8.00033Z" fill="#354439"/>
        </svg>
        <span className="text-xs font-medium text-[#595959] opacity-60">Recipes</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-center text-[#354439] py-8">Recipes</h1>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 mb-[52px]">
          <button className="px-[30px] py-[9px] bg-[#354439] border-2 border-[#354439] text-lg font-semibold text-white">
            Recipes
          </button>
          <button className="px-[30px] py-[9px] bg-[#354439]/[0.08] text-lg font-semibold text-[#354439]">
            Meal Prep
          </button>
          <button className="px-[30px] py-[9px] bg-[#354439]/[0.08] text-lg font-semibold text-[#354439]">
            Kitchen Tools
          </button>
          <button className="px-[30px] py-[9px] bg-[#354439]/[0.08] text-lg font-semibold text-[#354439]">
            Kitchen Basics
          </button>
        </div>

        {/* Featured Recipes Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[21px] mb-16">
          {/* Main Featured Recipe */}
          <div className="flex flex-col gap-[15px] w-full lg:w-[615px]">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {recipes[0]?.fields.Image?.[0] && (
                <Image
                  src={recipes[0].fields.Image[0].url}
                  alt={recipes[0].fields['Recipe Name']}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-[9px]">
              <p className="text-sm font-semibold text-[#354439]/70">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#354439]">
                {recipes[0]?.fields['Recipe Name'] || 'Featured Recipe'}
              </h2>
            </div>
          </div>

          {/* Secondary Featured Recipes */}
          <div className="flex flex-col gap-6 w-full lg:w-[564px]">
            {recipes.slice(1, 3).map((recipe, index) => (
              <div key={recipe.id} className="flex flex-col gap-3 h-[328px]">
                <div className="relative h-[248px]">
                  {recipe.fields.Image?.[0] && (
                    <Image
                      src={recipe.fields.Image[0].url}
                      alt={recipe.fields['Recipe Name']}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-sm font-semibold text-[#354439]/70">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-[29px] font-semibold text-[#354439]">
                    {recipe.fields['Recipe Name']}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-[102px] px-4 sm:px-[37px] py-[38px] bg-[#f9f9f9] mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#354439]">
              Inspired? Follow us for<br />more recipes.
            </h2>
          </div>
          <div className="w-full lg:w-[662px]">
            <div className="flex justify-between items-center h-[66px] py-4 border-b border-[#354439]/40 mb-[18px]">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent text-xl text-[#354439] opacity-40 outline-none w-full"
              />
              <button className="flex items-center gap-1.5 py-2.5 ml-4">
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

        {/* Recent Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.slice(3, 7).map((recipe) => (
            <div key={recipe.id} className="flex flex-col gap-5">
              <div className="relative h-[216px]">
                {recipe.fields.Image?.[0] && (
                  <Image
                    src={recipe.fields.Image[0].url}
                    alt={recipe.fields['Recipe Name']}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-sm font-semibold text-[#354439]/70">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="text-xl lg:text-[22px] font-semibold text-[#354439]">
                  {recipe.fields['Recipe Name']}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#354439] mt-16 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px] py-[57px]">
          <img
            src="/images/logo-white.png"
            alt="BurnerMarket"
            className="mb-16 h-[62px]"
          />
          <p className="text-2xl sm:text-3xl lg:text-[34px] font-medium mb-16">
            Unleash Your Healthy, Creative Magic in<br className="hidden sm:block" />Every Kitchen Creation.
          </p>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-11 text-base lg:text-lg font-medium">
              <div className="flex flex-col gap-2">
                <Link href="#">Give Gift Card</Link>
                <Link href="#">Redeem Gift Card</Link>
                <Link href="#">Careers</Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="#">CA Supply Chain</Link>
                <Link href="#">Sitemap</Link>
                <Link href="#">Privacy Policy</Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="#">Terms of Service</Link>
                <Link href="#">Do Not Sell or Share My Information</Link>
                <Link href="#">SNAP EBT</Link>
              </div>
            </div>
            <div className="flex items-center gap-[29px]">
              <p className="text-lg sm:text-xl font-semibold">Follow us</p>
              <div className="flex gap-[26px]">
                <Link href="#" aria-label="Facebook">
                  <img src="/images/facebook.png" alt="Facebook" className="w-8 h-8 sm:w-9 sm:h-9" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <img src="/images/instagram.png" alt="Instagram" className="w-8 h-8 sm:w-9 sm:h-9" />
                </Link>
                <Link href="#" aria-label="TikTok">
                  <img src="/images/tiktok.png" alt="TikTok" className="w-8 h-8 sm:w-9 sm:h-9" />
                </Link>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </footer>
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
