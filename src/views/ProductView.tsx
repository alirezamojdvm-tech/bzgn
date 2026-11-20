import { ArrowLeft, Calculator, PackageCheck, ThermometerSnowflake } from 'lucide-react';
import { PRODUCTS, type ProductSlug } from '../data/cropsData';
import { ResilientImage } from '../components/ResilientImage';
import { SeoHead } from '../components/SeoHead';

interface ProductViewProps {
  slug: ProductSlug;
  onNavigate: (path: string, inquiryPreset?: string) => void;
}

export function ProductView({ slug, onNavigate }: ProductViewProps) {
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  return (
    <>
      <SeoHead
        title={product.seoTitle}
        description={product.seoDescription}
        canonicalPath={`/products/${product.slug}`}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-12">
        {/* Product Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DFD7] pb-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] rounded-lg border border-[#E2DFD7]">
            {PRODUCTS.map((item) => {
              const active = item.slug === product.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onNavigate(`/products/${item.slug}`)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1B4332] font-semibold shadow-sm'
                      : 'text-[#576059] hover:text-[#1C241E]'
                  }`}
                >
                  {item.shortTitle}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/calculator')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1B4332] hover:underline cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            <span>محاسبه تناژ و کارتن این محصول</span>
          </button>
        </div>

        {/* Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs text-[#576059] flex flex-wrap items-center gap-2">
                <span>مبدا تامین: {product.originHubs.join('، ')}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C241E] leading-snug">
                {product.title}
              </h1>

              <p className="text-base text-[#576059] leading-relaxed">
                {product.heroSummary}
              </p>
            </div>

            {/* Technical Storage & Logistics Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white border border-[#E2DFD7] rounded-xl">
                <div className="flex items-center gap-2 text-xs text-[#576059] mb-1">
                  <ThermometerSnowflake className="w-4 h-4 text-[#1B4332]" />
                  <span>دمای سردخانه</span>
                </div>
                <div className="text-sm font-bold text-[#1C241E] tabular-nums">
                  {product.coldStorageTemp}
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2DFD7] rounded-xl">
                <div className="text-xs text-[#576059] mb-1">رطوبت و ماندگاری</div>
                <div className="text-sm font-bold text-[#1C241E] tabular-nums">
                  {product.coldStorageHumidity} · {product.shelfLife}
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2DFD7] rounded-xl">
                <div className="text-xs text-[#576059] mb-1">مقاصد صادراتی</div>
                <div className="text-sm font-bold text-[#1C241E]">
                  {product.exportDestinations.join('، ')}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    '/contact',
                    `استعلام قیمت روز و خرید عمده ${product.shortTitle}`
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>استعلام قیمت روز {product.shortTitle}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/markets')}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#1C241E] bg-[#F2EFE9] hover:bg-[#E7E2D8] border border-[#E2DFD7] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>مقایسه در میادین تره‌بار شهرها</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[260px] rounded-xl overflow-hidden border border-[#E2DFD7] bg-[#F2EFE9]">
              <ResilientImage
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-cover"
                fallbackTitle={product.shortTitle}
              />
            </div>
          </div>
        </div>

        {/* Cultivars & Hectare Yield Table */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C241E]">
              جدول ارقام تخصصی و تناژ برداشت در هکتار
            </h2>
            <p className="text-sm text-[#576059] mt-1">
              مقایسه ارقام تجاری، فصل برداشت، مناطق کشت و تناسب برای صادرات و سردخانه
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E2DFD7] rounded-xl bg-white">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#F2EFE9] border-b border-[#E2DFD7] text-xs font-bold text-[#1C241E]">
                  <th className="py-3.5 px-4">نام رقم</th>
                  <th className="py-3.5 px-4">تناژ در هکتار (تن)</th>
                  <th className="py-3.5 px-4">فصل عرضه</th>
                  <th className="py-3.5 px-4">قطب‌های تامین</th>
                  <th className="py-3.5 px-4">کاربرد صادراتی و بازار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DFD7] text-sm">
                {product.cultivars.map((cultivar) => (
                  <tr key={cultivar.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-4 px-4 font-bold text-[#1C241E] align-top">
                      <div>{cultivar.name}</div>
                      <div className="text-xs font-normal text-[#576059] mt-1">
                        {cultivar.notes}
                      </div>
                    </td>
                    <td className="py-4 px-4 tabular-nums font-semibold text-[#1B4332] whitespace-nowrap align-top">
                      {cultivar.yieldMinTonPerHa} تا {cultivar.yieldMaxTonPerHa} تن
                    </td>
                    <td className="py-4 px-4 text-[#576059] align-top">
                      {cultivar.harvestSeason}
                    </td>
                    <td className="py-4 px-4 text-[#1C241E] align-top">
                      {cultivar.regions.join('، ')}
                    </td>
                    <td className="py-4 px-4 text-[#576059] align-top">
                      {cultivar.exportSuitability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Packaging & Sorting Specs + Processed Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-[#1C241E]">
              استاندارد بسته‌بندی و ظرفیت بارگیری تریلی
            </h2>
            <div className="space-y-3">
              {product.packagingOptions.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-4 bg-white border border-[#E2DFD7] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-[#1C241E] text-sm">
                      <PackageCheck className="w-4 h-4 text-[#1B4332] shrink-0" />
                      <span>{pkg.name}</span>
                    </div>
                    <p className="text-xs text-[#576059]">
                      کاربرد: {pkg.useCase} · ظرفیت در تریلی ۲۰ تن: <span className="tabular-nums font-semibold text-[#1C241E]">{pkg.truckLoadUnits20Ton.toLocaleString('fa-IR')} بسته</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(
                        '/contact',
                        `درخواست استعلام قیمت ${product.shortTitle} با بسته‌بندی «${pkg.name}»`
                      )
                    }
                    className="px-3.5 py-2 text-xs font-semibold text-[#1B4332] bg-[#F2EFE9] hover:bg-[#E7E2D8] border border-[#E2DFD7] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    استعلام با این بسته‌بندی
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-[#1C241E]">
              سورتینگ و محصولات فرآوری‌شده
            </h2>
            <div className="p-5 bg-white border border-[#E2DFD7] rounded-xl space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1B4332] mb-1">
                  جزئیات خط سورتینگ
                </h3>
                <p className="text-sm text-[#576059] leading-relaxed">
                  {product.sortingDetails}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2DFD7]">
                <h3 className="text-sm font-bold text-[#1C241E] mb-2">
                  اشکال نیمه‌آماده، رستورانی و بسته‌بندی‌شده
                </h3>
                <ul className="space-y-2 text-sm text-[#576059]">
                  {product.processedForms.map((form) => (
                    <li key={form} className="flex items-start gap-2">
                      <span className="text-[#1B4332] font-bold">·</span>
                      <span>{form}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Product SEO Topics Summary */}
        <section className="p-6 bg-[#F2EFE9] border border-[#E2DFD7] rounded-xl space-y-3">
          <h2 className="text-base font-bold text-[#1C241E]">
            محورهای تخصصی استعلام و تامین {product.shortTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm text-[#576059]">
            {product.seoTopics.map((topic) => (
              <div key={topic} className="flex items-start gap-2">
                <span className="text-[#B45309] font-bold">·</span>
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
