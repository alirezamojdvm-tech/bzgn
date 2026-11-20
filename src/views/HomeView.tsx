import { ArrowLeft, Calculator, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import { CONTACT_INFO, EXPORT_CORRIDORS, IMAGES, PRODUCTS } from '../data/cropsData';
import { ResilientImage } from '../components/ResilientImage';
import { SeoHead } from '../components/SeoHead';

interface HomeViewProps {
  onNavigate: (path: string, inquiryPreset?: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <>
      <SeoHead
        title="بازرگانی صیفی‌جات ایران | خرید عمده و صادرات پیاز، سیب‌زمینی، بادمجان و خیار"
        description="تامین مستقیم از کشاورز، سورتینگ، سردخانه و صادرات عمده پیاز، سیب‌زمینی، بادمجان و خیار با استعلام قیمت روز میادین تره‌بار کشور توسط علیرضا محمدی جعفری."
        canonicalPath="/"
      />

      {/* 1. Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-5">
              <div className="text-xs font-medium text-[#576059] flex flex-wrap items-center gap-2">
                <span>مدیریت: {CONTACT_INFO.ownerName}</span>
                <span aria-hidden="true">·</span>
                <span>خرید مستقیم از کشاورز</span>
                <span aria-hidden="true">·</span>
                <span>صادرات و پخش میادین تره‌بار</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1C241E] leading-[1.28] tracking-tight">
                تامین عمده، سورتینگ و صادرات صیفی‌جات ایران با استاندارد بین‌المللی
              </h1>

              <p className="text-base text-[#576059] leading-relaxed max-w-xl">
                خرید مستقیم پیاز، سیب‌زمینی، بادمجان، خیار سبز و خیارشور از مزارع و سردخانه‌های جیرفت، همدان، اردبیل، اصفهان، تبریز، ورامین و یزد؛ سورت‌شده با بسته‌بندی توری، گونی، کارتن لمینت و وکیوم برای میادین تره‌بار کشور و بازارهای عراق، روسیه و دبی.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>استعلام قیمت روز و ثبت سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#1B4332] bg-[#F2EFE9] hover:bg-[#E7E2D8] border border-[#E2DFD7] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Dominant 16:9 Focal Visual */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-[#E2DFD7] bg-[#F2EFE9]">
              <ResilientImage
                src={IMAGES.hero}
                alt="سالن سورتینگ و بسته‌بندی صادراتی پیاز، سیب‌زمینی، بادمجان و خیار"
                className="w-full h-full object-cover"
                fallbackTitle="زنجیره تامین و صادرات صیفی‌جات ایران"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 border border-[#E2DFD7] bg-white rounded-xl divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#E2DFD7]">
          <div className="p-5">
            <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">۱۲+ قطب</div>
            <div className="text-xs text-[#576059] mt-1">میادین تره‌بار تهران، اصفهان، شیراز، مشهد، تبریز و جیرفت</div>
          </div>
          <div className="p-5">
            <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">۲۰+ رقم</div>
            <div className="text-xs text-[#576059] mt-1">آگریا، سانتا، رانومی، مینروا، لامپی، قلمی، آفیسر و الیور</div>
          </div>
          <div className="p-5">
            <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">۶ کشور</div>
            <div className="text-xs text-[#576059] mt-1">صادرات مستمر به عراق، روسیه، دبی، ترکیه، پاکستان و افغانستان</div>
          </div>
          <div className="p-5">
            <div className="text-2xl font-extrabold text-[#B45309] tabular-nums">۲ تا ۴۰۰ تن</div>
            <div className="text-xs text-[#576059] mt-1">امکان بارگیری از نیسان بار تا کاروان تریلی‌های یخچال‌دار</div>
          </div>
        </div>
      </section>

      {/* 2. Four Core Product Pillars */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 border-t border-[#E2DFD7]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C241E]">
              محصولات عمده و صادراتی
            </h2>
            <p className="text-sm text-[#576059] mt-2 max-w-2xl">
              مشخصات فنی ارقام پربازده، ظرفیت تناژ در هکتار، بسته‌بندی‌های صادراتی و فهرست فرآوری‌های رستورانی و صنعتی هر محصول را بررسی کنید.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/calculator')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>محاسبه‌گر تناژ و بسته‌بندی</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => (
            <article
              key={product.slug}
              className="bg-white border border-[#E2DFD7] rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#1B4332]/40"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9] border-b border-[#E2DFD7]">
                  <ResilientImage
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={product.shortTitle}
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-xs text-[#576059] flex flex-wrap items-center gap-1.5">
                    <span>قطب‌ها: {product.originHubs.slice(0, 4).join('، ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>صادرات: {product.exportDestinations.slice(0, 2).join(' و ')}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1C241E]">
                    {product.shortTitle}
                  </h3>

                  <p className="text-sm text-[#576059] leading-relaxed">
                    {product.heroSummary}
                  </p>

                  <div className="pt-2 text-xs text-[#1C241E] tabular-nums flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>دمای سردخانه: {product.coldStorageTemp}</span>
                    <span aria-hidden="true">·</span>
                    <span>تنوع ارقام: {product.cultivars.length} گروه اصلی</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#FAF9F5] border-t border-[#E2DFD7] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate(`/products/${product.slug}`)}
                  className="text-sm font-semibold text-[#1B4332] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>مشاهده مشخصات و ارقام</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(
                      '/contact',
                      `درخواست استعلام قیمت روز ${product.shortTitle}`
                    )
                  }
                  className="text-xs font-semibold text-[#B45309] hover:text-[#92400E] cursor-pointer whitespace-nowrap"
                >
                  استعلام قیمت روز
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Sorting, Cold Storage & Logistics Capabilities */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 border-t border-[#E2DFD7]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C241E]">
                سورتینگ، سردخانه و بسته‌بندی استاندارد صادراتی
              </h2>
              <p className="text-sm text-[#576059] mt-2 leading-relaxed">
                از مزرعه و باغ تا پالت‌بندی و بارگیری در مرز پرویزخان، آستارا یا اسکله بندرعباس؛ تمامی مراحل سورتینگ و کنترل دمای سردخانه با نظارت مستقیم انجام می‌شود.
              </p>
            </div>

            <div className="divide-y divide-[#E2DFD7] border-y border-[#E2DFD7]">
              <div className="py-4">
                <h3 className="text-base font-bold text-[#1C241E]">
                  ۰۱. سورتینگ لیزری و مکانیکی جیرفت، همدان، اردبیل و یزد
                </h3>
                <p className="text-sm text-[#576059] mt-1 leading-relaxed">
                  درجه‌بندی سایز، برس‌زنی، جداسازی بار دوپوست یا آسیب‌دیده برای پیاز، سیب‌زمینی، بادمجان لامپی، خیار سبز و خیارشور.
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-base font-bold text-[#1C241E]">
                  ۰۲. سردخانه‌های تخصصی قهدریجان، همدان، اصفهان و اردبیل
                </h3>
                <p className="text-sm text-[#576059] mt-1 leading-relaxed">
                  تامین سیب‌زمینی و پیاز سردخانه‌ای در پاییز و زمستان با کنترل دقیق دما و رطوبت جهت جلوگیری از جوانه‌زنی و حفظ کیفیت خلالی و تازه‌خوری.
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-base font-bold text-[#1C241E]">
                  ۰۳. بسته‌بندی صادراتی و خطوط فرآوری نیمه‌آماده
                </h3>
                <p className="text-sm text-[#576059] mt-1 leading-relaxed">
                  توری و گونی صادراتی پیاز و سیب‌زمینی، کارتن لمینت بادمجان و خیار با نایلون تنفسی، وکیوم خیارشور و عرضه عمده پیاز داغ، پودر پیاز و خلالی نیمه‌آماده.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/markets')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1C241E] bg-[#F2EFE9] hover:bg-[#E7E2D8] border border-[#E2DFD7] rounded-lg transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#1B4332]" />
                <span>دایرکتوری میادین تره‌بار شهرها</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/guides')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1C241E] bg-white hover:bg-[#F2EFE9] border border-[#E2DFD7] rounded-lg transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                <span>راهنمای صادرات و سوالات متداول</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-[#E2DFD7] bg-[#F2EFE9]">
              <ResilientImage
                src={IMAGES.sorting}
                alt="خط سورتینگ مکانیزه و پالت‌بندی محصولات کشاورزی در سردخانه"
                className="w-full h-full object-cover"
                fallbackTitle="خطوط سورتینگ و سردخانه صیفی‌جات"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Export Corridors Summary & Direct Conversion Strip */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 border-t border-[#E2DFD7]">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C241E]">
            کریدورهای فعال صادراتی (۱۴۰۴–۱۴۰۵)
          </h2>
          <p className="text-sm text-[#576059] mt-1">
            هماهنگی بارگیری، پالت‌بندی و مدارک گمرکی بر اساس استاندارد کشور مقصد
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPORT_CORRIDORS.map((corridor) => (
            <div
              key={corridor.id}
              className="bg-white border border-[#E2DFD7] rounded-xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#576059]">
                  <Truck className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>{corridor.borderOrPort}</span>
                </div>
                <h3 className="text-base font-bold text-[#1C241E]">{corridor.country}</h3>
                <p className="text-xs text-[#576059] leading-relaxed">
                  محصولات: {corridor.primaryCrops.join('، ')}
                </p>
              </div>
              <div className="pt-3 border-t border-[#E2DFD7] text-xs text-[#1C241E]">
                {corridor.requiredPackaging}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#1B4332] text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold">
              نیاز به استعلام قیمت روز میدان بار یا قرارداد تناژ صادراتی دارید؟
            </h2>
            <p className="text-sm text-white/85 leading-relaxed">
              مشخصات محصول، تناژ، نوع بسته‌بندی و شهر مقصد خود را از طریق فرم آنلاین ارسال کنید یا مستقیماً با {CONTACT_INFO.ownerName} تماس بگیرید.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-5 py-3 text-sm font-semibold bg-white text-[#1B4332] hover:bg-[#F2EFE9] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              ثبت استعلام در فرم تماس
            </button>
            <a
              href={CONTACT_INFO.rubikaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-sm font-medium border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
            >
              کانال روبیکا
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
