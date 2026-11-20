import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS = [
  { label: 'صفحه اصلی', path: '/' },
  { label: 'محصولات', path: '/products/onion' },
  { label: 'میادین تره‌بار', path: '/markets' },
  { label: 'محاسبه‌گر تناژ', path: '/calculator' },
  { label: 'دانشنامه سئو', path: '/guides' },
];

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    if (path.startsWith('/products')) return currentPath.startsWith('/products');
    return currentPath === path;
  };

  const handleLinkClick = (path: string) => {
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-sm border-b border-[#E2DFD7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="text-lg font-extrabold tracking-tight text-[#1B4332] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded"
        >
          بازرگانی صیفی‌جات ایران
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="ناوبری اصلی"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#576059]"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 border-b-2 ${
                  active
                    ? 'text-[#1B4332] font-semibold border-[#1B4332]'
                    : 'border-transparent hover:text-[#1C241E] hover:border-[#E2DFD7]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/contact');
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B4332]"
          >
            استعلام قیمت روز
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
            className="md:hidden p-2.5 text-[#1C241E] hover:bg-[#F2EFE9] rounded-lg transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2DFD7] bg-[#FAF9F5] px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#1B4332] text-white'
                    : 'text-[#1C241E] hover:bg-[#F2EFE9]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/contact');
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-center bg-[#B45309] text-white mt-2"
          >
            استعلام قیمت روز
          </a>
        </div>
      )}
    </header>
  );
}
