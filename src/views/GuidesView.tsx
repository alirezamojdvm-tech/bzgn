import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { EXPORT_CORRIDORS, FAQ_ITEMS, IMAGES, PRODUCTS } from '../data/cropsData';
import { KEYWORD_CLUSTERS } from '../data/seoKeywordsIndex';
import { ResilientImage } from '../components/ResilientImage';
import { SeoHead } from '../components/SeoHead';

interface GuidesViewProps {
  onNavigate: (path: string, inquiryPreset?: string) => void;
}

const FAQ_CATEGORIES = [
  'همه موضوعات',
  'صادرات و گمرک',
  'سردخانه و نگهداری',
  'تناژ و کشت',
  'سورتینگ و بسته‌بندی',
] as const;

export function GuidesView({ onNavigate }: GuidesViewProps) {
  const [faqCategory, setFaqCategory] =
    useState<(typeof FAQ_CATEGORIES)[number]>('همه موضوعات');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [keywordFilter, setKeywordFilter] = useState('');

  const visibleFaqs = useMemo(() => {
    if (faqCategory === 'همه موضوعات') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === faqCategory);
  }, [faqCategory]);

  const filteredClusters = useMemo(() => {
    const q = keywordFilter.trim().toLowerCase();
    if (!q) return KEYWORD_CLUSTERS;
    return KEYWORD_CLUSTERS.map((cluster) => ({
      ...cluster,
      terms: cluster.terms.filter(
        (term) =>
          term.toLowerCase().includes(q) ||
          cluster.title.toLowerCase().includes(q)
      ),
    })).filter((cluster) => cluster.terms.length > 0);
  }, [keywordFilter]);

  return (
    <>
      <SeoHead
        title="دانشنامه سورتینگ، سردخانه، صادرات صیفی‌جات و راهنمای خریداران عمده"
        description="راهنمای کامل سورتینگ و بسته‌بندی پیاز، سیب‌زمینی، بادمجان و خیار، دمای سردخانه، صادرات به عراق، روسیه و دبی و پاسخ به سوالات متداول بازار تره‌بار."
        canonicalPath="/guides"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-14">
        {/* Intro & Technical Overview */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C241E] leading-snug">
              دانشنامه تخصصی صادرات، سورتینگ و سردخانه صیفی‌جات
            </h1>
            <p className="text-sm sm:text-base text-[#576059] leading-relaxed">
              مرجع فنی و کاربردی برای تجار، کشاورزان، مدیران کارخانجات خیارشور و خریداران عمده: از دمای دقیق نگهداری سیب‌زمینی آگریا در سردخانه همدان تا استانداردهای بسته‌بندی بادمجان لامپی و خیار یزد برای بازار روسیه و مرز پرویزخان عراق.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/calculator')}
                className="px-4 py-2.5 text-sm font-semibold bg-[#1B4332] text-white rounded-lg hover:bg-[#143326] transition-colors cursor-pointer"
              >
                ورود به محاسبه‌گر تناژ و سردخانه
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-4 py-2.5 text-sm font-semibold bg-[#F2EFE9] text-[#1C241E] border border-[#E2DFD7] rounded-lg hover:bg-[#E7E2D8] transition-colors cursor-pointer"
              >
                مشاوره تلفنی و استعلام
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-full min-h-[240px] rounded-xl overflow-hidden border border-[#E2DFD7] bg-[#F2EFE9]">
              <ResilientImage
                src={IMAGES.sorting}
                alt="سالن سورتینگ و سردخانه صیفی‌جات"
                className="w-full h-full object-cover"
                fallbackTitle="زیرساخت سورتینگ و سردخانه"
              />
            </div>
          </div>
        </header>

        {/* Cold Storage & Sorting Technical Comparison Table */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C241E]">
              جدول استاندارد دمای سردخانه و خط سورتینگ محصولات
            </h2>
            <p className="text-sm text-[#576059] mt-1">
              تنظیمات دمایی توصیه‌شده جهت جلوگیری از جوانه‌زنی، سرمازدگی یا افت وزن در انبار و کانتینر یخچال‌دار
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E2DFD7] rounded-xl bg-white">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#F2EFE9] border-b border-[#E2DFD7] text-xs font-bold text-[#1C241E]">
                  <th className="py-3.5 px-4">محصول</th>
                  <th className="py-3.5 px-4">دمای بهینه سردخانه</th>
                  <th className="py-3.5 px-4">رطوبت نسبی</th>
                  <th className="py-3.5 px-4">ماندگاری</th>
                  <th className="py-3.5 px-4">نوع سورتینگ و بسته‌بندی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DFD7] text-sm">
                {PRODUCTS.map((item) => (
                  <tr key={item.slug} className="hover:bg-[#FAF9F5]">
                    <td className="py-4 px-4 font-bold text-[#1B4332]">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/products/${item.slug}`)}
                        className="hover:underline cursor-pointer text-right"
                      >
                        {item.shortTitle}
                      </button>
                    </td>
                    <td className="py-4 px-4 tabular-nums font-semibold text-[#1C241E]">
                      {item.coldStorageTemp}
                    </td>
                    <td className="py-4 px-4 tabular-nums text-[#576059]">
                      {item.coldStorageHumidity}
                    </td>
                    <td className="py-4 px-4 tabular-nums text-[#576059]">
                      {item.shelfLife}
                    </td>
                    <td className="py-4 px-4 text-[#576059]">
                      {item.sortingDetails}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Export Corridors Details */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C241E]">
            راهنمای مقاصد و مرزهای صادراتی (عراق، روسیه، دبی و همسایگان)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPORT_CORRIDORS.map((corridor) => (
              <div
                key={corridor.id}
                className="bg-white border border-[#E2DFD7] rounded-xl p-5 space-y-2.5"
              >
                <div className="text-xs text-[#B45309] font-semibold">
                  {corridor.borderOrPort}
                </div>
                <h3 className="text-base font-bold text-[#1C241E]">{corridor.country}</h3>
                <p className="text-sm text-[#576059]">
                  اقلام اصلی: {corridor.primaryCrops.join('، ')}
                </p>
                <p className="text-xs text-[#576059] tabular-nums">
                  بسته‌بندی و حمل: {corridor.requiredPackaging} · {corridor.transitTemp}
                </p>
                <p className="text-xs text-[#1C241E] pt-1 border-t border-[#E2DFD7]">
                  {corridor.statusNote}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C241E]">
                سوالات متداول تجار، کشاورزان و خریداران عمده
              </h2>
              <p className="text-sm text-[#576059] mt-1">
                پاسخ دقیق به سوالات پرتکرار درباره صادرات پیاز، دمای سردخانه سیب‌زمینی، تناژ ارقام و محصولات نیمه‌آماده
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFaqCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                    faqCategory === cat
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-white text-[#576059] border-[#E2DFD7] hover:text-[#1C241E]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {visibleFaqs.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E2DFD7] rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-right flex items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-xs text-[#576059] block">
                        {item.category}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#1C241E]">
                        {item.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#1B4332] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#576059] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-sm text-[#576059] leading-relaxed border-t border-[#E2DFD7] bg-[#FAF9F5]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Searchable SEO Keyword Taxonomy Directory */}
        <section className="space-y-5 pt-4 border-t border-[#E2DFD7]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C241E]">
                نمایه موضوعی جست‌وجوی خریداران و عبارت‌های تخصصی بازار
              </h2>
              <p className="text-sm text-[#576059] mt-1">
                برای استعلام فوری هر یک از عبارت‌های قیمتی، ارقام، دستگاه‌های سورتینگ یا خطوط فرآوری روی آن کلیک کنید.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#576059] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={keywordFilter}
                onChange={(e) => setKeywordFilter(e.target.value)}
                placeholder="فیلتر عبارت (مثلاً سورتینگ، آگریا، خیارشور)..."
                aria-label="فیلتر نمایه کلمات کلیدی"
                className="w-full pr-9 pl-8 py-2 text-sm bg-white border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
              />
              {keywordFilter && (
                <button
                  type="button"
                  onClick={() => setKeywordFilter('')}
                  aria-label="پاک کردن فیلتر"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#576059] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="bg-white border border-[#E2DFD7] rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#E2DFD7] pb-2.5">
                  <h3 className="text-base font-bold text-[#1B4332]">
                    {cluster.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => onNavigate(cluster.targetRoute)}
                    className="text-xs font-semibold text-[#B45309] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    مشاهده صفحه مرتبط
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-[#576059]">
                  {cluster.terms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() =>
                        onNavigate('/contact', `درخواست استعلام درباره: ${term}`)
                      }
                      className="text-right hover:text-[#1B4332] hover:underline cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
