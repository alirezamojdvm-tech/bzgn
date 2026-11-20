import { useMemo, useState } from 'react';
import { ArrowLeft, MapPin, Search, X } from 'lucide-react';
import { MARKET_HUBS, PRODUCTS, type ProductSlug } from '../data/cropsData';
import { SeoHead } from '../components/SeoHead';

interface MarketsViewProps {
  onNavigate: (path: string, inquiryPreset?: string) => void;
}

const PRODUCT_FILTERS: { id: 'all' | ProductSlug; label: string }[] = [
  { id: 'all', label: 'همه محصولات' },
  { id: 'onion', label: 'پیاز' },
  { id: 'potato', label: 'سیب‌زمینی' },
  { id: 'eggplant', label: 'بادمجان' },
  { id: 'cucumber', label: 'خیار و خیارشور' },
];

const ROLE_FILTERS = [
  'همه مراکز',
  'میدان تره‌بار مرکزی',
  'قطب تولید و سردخانه',
  'مرز و کریدور صادراتی',
] as const;

export function MarketsView({ onNavigate }: MarketsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [productFilter, setProductFilter] = useState<'all' | ProductSlug>('all');
  const [roleFilter, setRoleFilter] = useState<(typeof ROLE_FILTERS)[number]>('همه مراکز');

  const productLabelMap = useMemo(() => {
    const map: Record<ProductSlug, string> = {
      onion: 'پیاز',
      potato: 'سیب‌زمینی',
      eggplant: 'بادمجان',
      cucumber: 'خیار و خیارشور',
    };
    return map;
  }, []);

  const filteredMarkets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MARKET_HUBS.filter((hub) => {
      if (productFilter !== 'all' && !hub.products.includes(productFilter)) {
        return false;
      }
      if (roleFilter !== 'همه مراکز' && hub.regionRole !== roleFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        hub.city,
        hub.marketName,
        hub.regionRole,
        hub.supplyNote,
        ...hub.highlightKeywords,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, productFilter, roleFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setProductFilter('all');
    setRoleFilter('همه مراکز');
  };

  return (
    <>
      <SeoHead
        title="دایرکتوری میادین تره‌بار شهرها و قطب‌های تامین | قیمت روز پیاز، سیب‌زمینی، بادمجان و خیار"
        description="مرجع استعلام قیمت روز و خرید عمده در میادین تره‌بار تهران، اصفهان، شیراز، مشهد، تبریز، جیرفت، بندرعباس، همدان، اردبیل، یزد و ورامین."
        canonicalPath="/markets"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-8">
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C241E]">
            دایرکتوری میادین تره‌بار شهرها و قطب‌های سردخانه
          </h1>
          <p className="text-sm sm:text-base text-[#576059] leading-relaxed">
            شهر، میدان تره‌بار یا کلیدواژه محصول مورد نظر خود را جست‌وجو کنید تا جزئیات بارگیری، فصل اوج عرضه و استعلام قیمت روز مستقیم از کشاورز یا میدان را دریافت کنید.
          </p>
        </header>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-[#E2DFD7] rounded-xl p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-[#576059] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جست‌وجوی شهر یا محصول (مثلاً جیرفت، آگریا، تهران، قهدریجان...)"
                aria-label="جست‌وجو در میادین تره‌بار"
                className="w-full pr-10 pl-9 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="پاک کردن جست‌وجو"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#576059] hover:text-[#1C241E] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="lg:col-span-7 flex flex-wrap items-center gap-1.5">
              {PRODUCT_FILTERS.map((item) => {
                const active = productFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProductFilter(item.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-[#FAF9F5] text-[#576059] border-[#E2DFD7] hover:text-[#1C241E]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2DFD7]">
            <div className="flex flex-wrap items-center gap-1.5">
              {ROLE_FILTERS.map((role) => {
                const active = roleFilter === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#F2EFE9] text-[#1B4332] font-semibold border border-[#1B4332]/30'
                        : 'text-[#576059] hover:text-[#1C241E]'
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-[#576059] tabular-nums">
              نمایش {filteredMarkets.length} از {MARKET_HUBS.length} مرکز
            </div>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredMarkets.length === 0 ? (
          <div className="bg-white border border-[#E2DFD7] rounded-xl p-10 text-center space-y-3">
            <p className="text-base font-bold text-[#1C241E]">
              میدان یا شهری با این فیلتر پیدا نشد
            </p>
            <p className="text-sm text-[#576059]">
              می‌توانید فیلترها را بازنشانی کنید یا مستقیم نام شهر مقصد را در فرم استعلام ثبت نمایید.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold bg-[#1B4332] text-white rounded-lg cursor-pointer"
              >
                بازنشانی فیلترها
              </button>
              <button
                type="button"
                onClick={() =>
                  onNavigate('/contact', `استعلام قیمت روز برای: ${searchQuery}`)
                }
                className="px-4 py-2 text-xs font-semibold bg-[#F2EFE9] text-[#1C241E] border border-[#E2DFD7] rounded-lg cursor-pointer"
              >
                استعلام مستقیم
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMarkets.map((hub) => (
              <article
                key={hub.id}
                className="bg-white border border-[#E2DFD7] rounded-xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 text-xs text-[#576059]">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#1B4332]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{hub.city}</span>
                    </span>
                    <span>{hub.regionRole}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#1C241E]">
                    {hub.marketName}
                  </h2>

                  <p className="text-sm text-[#576059] leading-relaxed">
                    {hub.supplyNote}
                  </p>

                  <div className="text-xs text-[#1C241E] space-y-1 pt-1">
                    <div>
                      <span className="text-[#576059]">محصولات فعال: </span>
                      <span className="font-medium">
                        {hub.products.map((p) => productLabelMap[p]).join(' · ')}
                      </span>
                    </div>
                    <div className="tabular-nums">
                      <span className="text-[#576059]">اوج عرضه و ظرفیت بار: </span>
                      <span>
                        {hub.peakMonths} · {hub.typicalLoad}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E2DFD7]">
                    <div className="text-xs font-semibold text-[#1C241E] mb-1.5">
                      عبارات استعلام پرتکرار این منطقه:
                    </div>
                    <ul className="text-xs text-[#576059] space-y-1">
                      {hub.highlightKeywords.map((kw) => (
                        <li key={kw} className="flex items-start gap-1.5">
                          <span className="text-[#B45309]">·</span>
                          <span>{kw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2DFD7] flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(
                        '/contact',
                        `درخواست استعلام قیمت روز بارگیری از ${hub.marketName} (${hub.city})`
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B4332] hover:underline cursor-pointer"
                  >
                    <span>استعلام قیمت روز این میدان</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const targetProd = PRODUCTS.find((p) => p.slug === hub.products[0]);
                      if (targetProd) onNavigate(`/products/${targetProd.slug}`);
                    }}
                    className="text-xs text-[#576059] hover:text-[#1C241E] cursor-pointer"
                  >
                    مشاهده ارقام محصول
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
