import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe, fetchRecipes, fetchRecipeById } from '../../utils/airtable';
import Navigation from '../../components/Navigation';

interface RecipePageProps {
  recipe?: Recipe;
  relatedRecipes?: Recipe[];
}

export default function RecipePage({ recipe, relatedRecipes = [] }: RecipePageProps) {
  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-[120px] py-4">
        <Link href="/" className="text-xs font-medium text-[#595959] hover:text-[#354439] transition-colors">Home</Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 flex-shrink-0">
          <path d="M8.62986 8.00033L5.91436 5.285C5.82214 5.19267 5.77492 5.07661 5.7727 4.93683C5.77059 4.79717 5.81781 4.679 5.91436 4.58233C6.01103 4.48578 6.12814 4.4375 6.2657 4.4375C6.40325 4.4375 6.52036 4.48578 6.61703 4.58233L9.6132 7.5785C9.67553 7.64094 9.71953 7.70678 9.7452 7.776C9.77086 7.84522 9.7837 7.92 9.7837 8.00033C9.7837 8.08067 9.77086 8.15544 9.7452 8.22467C9.71953 8.29389 9.67553 8.35972 9.6132 8.42217L6.61703 11.4183C6.5247 11.5106 6.40864 11.5578 6.26886 11.56C6.1292 11.5621 6.01103 11.5149 5.91436 11.4183C5.81781 11.3217 5.76953 11.2046 5.76953 11.067C5.76953 10.9294 5.81781 10.8123 5.91436 10.7157L8.62986 8.00033Z" fill="#354439"/>
        </svg>
        <Link href="/recipes" className="text-xs font-medium text-[#595959] hover:text-[#354439] transition-colors">Recipes</Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 flex-shrink-0">
          <path d="M8.62986 8.00033L5.91436 5.285C5.82214 5.19267 5.77492 5.07661 5.7727 4.93683C5.77059 4.79717 5.81781 4.679 5.91436 4.58233C6.01103 4.48578 6.12814 4.4375 6.2657 4.4375C6.40325 4.4375 6.52036 4.48578 6.61703 4.58233L9.6132 7.5785C9.67553 7.64094 9.71953 7.70678 9.7452 7.776C9.77086 7.84522 9.7837 7.92 9.7837 8.00033C9.7837 8.08067 9.77086 8.15544 9.7452 8.22467C9.71953 8.29389 9.67553 8.35972 9.6132 8.42217L6.61703 11.4183C6.5247 11.5106 6.40864 11.5578 6.26886 11.56C6.1292 11.5621 6.01103 11.5149 5.91436 11.4183C5.81781 11.3217 5.76953 11.2046 5.76953 11.067C5.76953 10.9294 5.81781 10.8123 5.91436 10.7157L8.62986 8.00033Z" fill="#354439"/>
        </svg>
        <span className="text-xs font-medium text-[#595959] opacity-60">{recipe.fields['Recipe Name']}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-[120px] py-8">
        <div className="flex gap-11">
          {/* Main Content */}
          <div className="flex-1">
            {/* Recipe Header */}
            <div className="mb-[21px]">
              <h1 className="text-4xl font-bold text-[#354439] mb-2">
                {recipe.fields['Recipe Name']}
              </h1>
              <div className="flex gap-[15px] text-sm">
                <p className="text-[#354439]/70">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="font-semibold text-[#354439]">By Kevin Mwangi</p>
              </div>
            </div>

            {/* Recipe Image */}
            {recipe.fields.Image?.[0] && (
              <div className="relative h-[511px] mb-[21px] overflow-hidden">
                <Image
                  src={recipe.fields.Image[0].url}
                  alt={recipe.fields['Recipe Name']}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Recipe Info */}
            <div className="mb-[57px]">
              <p className="text-2xl font-medium text-[#354439] mb-[25px]">
                {recipe.fields.Intro}
              </p>

              <div className="flex gap-[41px] mb-[25px]">
                <div>
                  <p className="opacity-70 text-[17px] font-bold uppercase text-[#354439]">Prep Time</p>
                  <p className="text-xl font-semibold text-[#354439]">10 mins</p>
                </div>
                <div>
                  <p className="opacity-70 text-[17px] font-bold uppercase text-[#354439]">Cook Time</p>
                  <p className="text-xl font-semibold text-[#354439]">20 mins</p>
                </div>
                <div>
                  <p className="opacity-70 text-[17px] font-bold uppercase text-[#354439]">Serves</p>
                  <p className="text-xl font-semibold text-[#354439]">4 Adults</p>
                </div>
              </div>

              <hr className="border-[#E7E7E7]" />
            </div>

            {/* Recipe Content */}
            <div className="flex gap-11">
              {/* Ingredients */}
              <div className="w-[237px]">
                <h2 className="text-[27px] font-semibold text-[#354439] mb-6">Ingredients</h2>
                <pre className="text-lg font-medium text-[#354439] whitespace-pre-wrap">
                  {recipe.fields.Ingredients}
                </pre>
              </div>

              {/* Instructions */}
              <div className="flex-1">
                <h2 className="text-[27px] font-semibold text-[#354439] mb-6">Preparation</h2>
                <pre className="text-lg font-medium text-[#354439] whitespace-pre-wrap">
                  {recipe.fields.Preparation}
                </pre>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#f9f9f9] px-[37px] py-[38px] mt-[57px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[32px] font-semibold text-[#354439]">
                  Inspired? Follow us for<br />more recipes.
                </h2>
                <div className="w-[662px]">
                  <div className="flex justify-between items-center border-b border-[#354439]/40 py-4 mb-[18px]">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="bg-transparent text-xl text-[#354439] opacity-40 outline-none w-full"
                    />
                    <button className="flex items-center gap-1.5 py-2.5 hover:opacity-80 transition-opacity">
                      <span className="text-base font-bold text-[#354439]">Sign up</span>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.41713 14.0834L16.2505 14.0834L12.683 17.6508L14.2149 19.1826L18.8656 14.5319C19.2718 14.1256 19.5 13.5746 19.5 13C19.5 12.4255 19.2718 11.8745 18.8656 11.4682L14.2149 6.81745L12.683 8.34928L16.2505 11.9167L5.41713 11.9167L5.41713 14.0834Z" fill="#354439"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-[#354439]">
                    Check our privacy policy on how we collect and process your information.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Recipes */}
            <div className="mt-[57px]">
              <div className="flex justify-between items-center mb-[25px]">
                <h2 className="text-[27px] font-semibold text-[#354439]">More great recipes</h2>
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

              <div className="grid grid-cols-3 gap-6">
                {relatedRecipes.map((relatedRecipe) => (
                  <Link href={`/recipes/${relatedRecipe.id}`} key={relatedRecipe.id} className="group">
                    <div className="flex flex-col gap-5">
                      <div className="relative h-[216px] overflow-hidden">
                        {relatedRecipe.fields.Image?.[0] && (
                          <Image
                            src={relatedRecipe.fields.Image[0].url}
                            alt={relatedRecipe.fields['Recipe Name']}
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
                          {relatedRecipe.fields['Recipe Name']}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Shop Sidebar */}
          <div className="w-[332px] bg-[#354439]/[0.03] rounded-md p-[30px] h-fit">
            <h2 className="text-3xl font-bold text-[#354439] mb-16">Shop this recipe</h2>
            {/* Shopping items would go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await fetchRecipes();
  
  const paths = recipes.map((recipe) => ({
    params: { id: recipe.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return { notFound: true };
  }

  const recipe = await fetchRecipeById(params.id);
  const allRecipes = await fetchRecipes();
  
  // Get 3 random recipes for the related recipes section
  const relatedRecipes = allRecipes
    .filter(r => r.id !== params.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
      relatedRecipes,
    },
    revalidate: 60,
  };
};
