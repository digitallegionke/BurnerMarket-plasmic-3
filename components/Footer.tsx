import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#354439] text-white">
      <div className="max-w-[1440px] mx-auto px-[120px] py-[57px]">
        <img
          src="/images/logo-white.png"
          alt="BurnerMarket"
          className="mb-16 h-[62px]"
        />
        <p className="text-[34px] font-medium mb-16">
          Unleash Your Healthy, Creative Magic in<br />Every Kitchen Creation.
        </p>
        <div className="flex justify-between items-start mb-16">
          <div className="grid grid-cols-3 gap-11 text-lg font-medium">
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:opacity-80 transition-opacity">Give Gift Card</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Redeem Gift Card</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Careers</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:opacity-80 transition-opacity">CA Supply Chain</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Sitemap</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:opacity-80 transition-opacity">Terms of Service</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Do Not Sell or Share My Information</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">SNAP EBT</Link>
            </div>
          </div>
          <div className="flex items-center gap-[29px]">
            <p className="text-xl font-semibold">Follow us</p>
            <div className="flex gap-[26px]">
              <Link href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <img src="/images/facebook.png" alt="Facebook" className="w-9 h-9" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <img src="/images/instagram.png" alt="Instagram" className="w-9 h-9" />
              </Link>
              <Link href="#" aria-label="TikTok" className="hover:opacity-80 transition-opacity">
                <img src="/images/tiktok.png" alt="TikTok" className="w-9 h-9" />
              </Link>
            </div>
          </div>
        </div>
        <p className="text-base">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </footer>
  );
}
