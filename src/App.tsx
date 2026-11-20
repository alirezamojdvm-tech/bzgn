import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import type { ProductSlug } from './data/cropsData';
import { CalculatorView } from './views/CalculatorView';
import { ContactView } from './views/ContactView';
import { GuidesView } from './views/GuidesView';
import { HomeView } from './views/HomeView';
import { MarketsView } from './views/MarketsView';
import { ProductView } from './views/ProductView';

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [inquiryPreset, setInquiryPreset] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((path: string, preset?: string) => {
    const normalized = normalizePath(path);
    if (preset !== undefined) {
      setInquiryPreset(preset);
    }
    if (normalizePath(window.location.pathname) !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderView = () => {
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '') as ProductSlug;
      const validSlugs: ProductSlug[] = ['onion', 'potato', 'eggplant', 'cucumber'];
      const resolvedSlug = validSlugs.includes(slug) ? slug : 'onion';
      return <ProductView slug={resolvedSlug} onNavigate={handleNavigate} />;
    }

    switch (currentPath) {
      case '/markets':
        return <MarketsView onNavigate={handleNavigate} />;
      case '/calculator':
        return <CalculatorView onNavigate={handleNavigate} />;
      case '/guides':
        return <GuidesView onNavigate={handleNavigate} />;
      case '/contact':
        return <ContactView inquiryPreset={inquiryPreset} />;
      case '/':
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1C241E]">
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">{renderView()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
