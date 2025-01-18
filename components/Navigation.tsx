import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navigation() {
  const router = useRouter();
  
  const isActive = (path: string) => {
    if (path === '/recipes' && router.pathname.startsWith('/recipes')) {
      return true;
    }
    if (path === '/directory' && router.pathname.startsWith('/directory')) {
      return true;
    }
    return router.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-[#E7E7E7]">
      <div className="max-w-[1440px] mx-auto px-[120px]">
        <div className="flex justify-between h-[82px]">
          <div className="flex items-center gap-[72px]">
            <Link href="/" className="h-[62px]">
              <img
                src="/images/logo.png"
                alt="BurnerMarket"
                className="h-full w-auto"
              />
            </Link>
            <div className="flex gap-[41px]">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors ${
                  isActive('/')
                    ? 'border-[#354439] text-[#354439]'
                    : 'border-transparent text-[#595959] hover:text-[#354439]'
                }`}
              >
                Home
              </Link>
              <Link
                href="/recipes"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors ${
                  isActive('/recipes')
                    ? 'border-[#354439] text-[#354439]'
                    : 'border-transparent text-[#595959] hover:text-[#354439]'
                }`}
              >
                Recipes
              </Link>
              <Link
                href="/directory"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors ${
                  isActive('/directory')
                    ? 'border-[#354439] text-[#354439]'
                    : 'border-transparent text-[#595959] hover:text-[#354439]'
                }`}
              >
                Directory
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-[41px]">
            <button className="text-base font-medium text-[#595959] hover:text-[#354439] transition-colors">
              Sign in
            </button>
            <button className="px-[30px] py-[9px] bg-[#354439] text-base font-semibold text-white rounded-sm hover:bg-[#2a3a2e] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
