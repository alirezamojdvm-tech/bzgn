import { useMemo, useState } from 'react';
import { ArrowLeft, Calculator, Package, ThermometerSnowflake, Truck } from 'lucide-react';
import { PRODUCTS, type ProductSlug } from '../data/cropsData';
import { SeoHead } from '../components/SeoHead';

interface CalculatorViewProps {
  onNavigate: (path: string, inquiryPreset?: string) => void;
}

export function CalculatorView({ onNavigate }: CalculatorViewProps) {
  const [selectedProductSlug, setSelectedProductSlug] = useState<ProductSlug>('potato');
  const product = useMemo(
    () => PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0],
    [selectedProductSlug]
  );

  const [cultivarId, setCultivarId] = useState<string>(PRODUCTS[1].cultivars[0].id);
  const [packagingId, setPackagingId] = useState<string>(PRODUCTS[1].packagingOptions[0].id);
  const [mode, setMode] = useState<'hectare' | 'ton'>('ton');
  const [hectares, setHectares] = useState<number>(3);
  const [tons, setTons] = useState<number>(22);

  const activeCultivar = useMemo(
    () => product.cultivars.find((c) => c.id === cultivarId) || product.cultivars[0],
    [product, cultivarId]
  );

  const activePackaging = useMemo(
    () =>
      product.packagingOptions.find((p) => p.id === packagingId) ||
      product.packagingOptions[0],
    [product, packagingId]
  );

  const handleProductChange = (slug: ProductSlug) => {
    setSelectedProductSlug(slug);
    const nextProd = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
    setCultivarId(nextProd.cultivars[0].id);
    setPackagingId(nextProd.packagingOptions[0].id);
  };

  const calculation = useMemo(() => {
    const minTons =
      mode === 'hectare'
        ? Math.round(hectares * activeCultivar.yieldMinTonPerHa)
        : tons;
    const maxTons =
      mode === 'hectare'
        ? Math.round(hectares * activeCultivar.yieldMaxTonPerHa)
        : tons;
    const avgTons = (minTons + maxTons) / 2;

    const totalKg = avgTons * 1000;
    const packageCount = Math.ceil(totalKg / activePackaging.unitWeightKg);

    const nissanTrips = Math.ceil(avgTons / 2.2);
    const khavarTrips = Math.ceil(avgTons / 5);
    const trailerTrips = Math.max(1, Math.ceil(avgTons / 22));

    return {
      minTons,
      maxTons,
      avgTons,
      packageCount,
      nissanTrips,
      khavarTrips,
      trailerTrips,
    };
  }, [mode, hectares, tons, activeCultivar, activePackaging]);

  const handleSendToContact = () => {
    const summary =
      mode === 'hectare'
        ? `برآورد برداشت ${hectares} هکتار ${activeCultivar.name}: حدود ${calculation.minTons} تا ${calculation.maxTons} تن (${calculation.packageCount.toLocaleString('fa-IR')} عدد ${activePackaging.name})`
        : `درخواست خرید ${tons} تن ${activeCultivar.name} با بسته‌بندی ${activePackaging.name} (معادل ${calculation.packageCount.toLocaleString('fa-IR')} بسته / ${calculation.trailerTrips} تریلی)`;

    onNavigate('/contact', summary);
  };

  return (
    <>
      <SeoHead
        title="محاسبه‌گر تناژ در هکتار، بسته‌بندی صادراتی و ظرفیت سردخانه صیفی‌جات"
        description="محاسبه آنلاین تناژ برداشت پیاز، سیب‌زمینی آگریا، بادمجان و خیار در هکتار، تعداد توری، گونی و کارتن صادراتی، ناوگان حمل و دمای استاندارد سردخانه."
        canonicalPath="/calculator"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-8">
        <header className="space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C241E]">
            محاسبه‌گر تناژ، بسته‌بندی صادراتی و شرایط سردخانه
          </h1>
          <p className="text-sm sm:text-base text-[#576059] leading-relaxed">
            برای برنامه‌ریزی برداشت مزرعه یا ثبت سفارش بارگیری، محصول و رقم مورد نظر را انتخاب کنید تا تعداد بسته، نوع کامیون و دمای بهینه سردخانه محاسبه شود.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-6 bg-white border border-[#E2DFD7] rounded-xl p-6 space-y-6">
            {/* Step 1: Product */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1C241E]">
                ۱. انتخاب محصول
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRODUCTS.map((p) => {
                  const active = p.slug === selectedProductSlug;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => handleProductChange(p.slug)}
                      className={`px-3 py-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-[#FAF9F5] text-[#576059] border-[#E2DFD7] hover:text-[#1C241E]'
                      }`}
                    >
                      {p.slug === 'onion' && 'پیاز'}
                      {p.slug === 'potato' && 'سیب‌زمینی'}
                      {p.slug === 'eggplant' && 'بادمجان'}
                      {p.slug === 'cucumber' && 'خیار و خیارشور'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Cultivar */}
            <div className="space-y-2">
              <label
                htmlFor="calc-cultivar"
                className="block text-sm font-bold text-[#1C241E]"
              >
                ۲. انتخاب رقم یا نوع محصول
              </label>
              <select
                id="calc-cultivar"
                value={activeCultivar.id}
                onChange={(e) => setCultivarId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
              >
                {product.cultivars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.yieldMinTonPerHa} تا {c.yieldMaxTonPerHa} تن در هکتار)
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Mode Toggle (Ton vs Hectare) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-bold text-[#1C241E]">
                  ۳. مبنای محاسبه
                </label>
                <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg border border-[#E2DFD7]">
                  <button
                    type="button"
                    onClick={() => setMode('ton')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      mode === 'ton'
                        ? 'bg-white text-[#1B4332] font-semibold shadow-sm'
                        : 'text-[#576059]'
                    }`}
                  >
                    تناژ سفارش (تن)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('hectare')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      mode === 'hectare'
                        ? 'bg-white text-[#1B4332] font-semibold shadow-sm'
                        : 'text-[#576059]'
                    }`}
                  >
                    سطح زیر کشت (هکتار)
                  </button>
                </div>
              </div>

              {mode === 'ton' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#576059]">
                    <span>مقدار سفارش (۱ تا ۵۰۰ تن)</span>
                    <span className="text-base font-extrabold text-[#1B4332] tabular-nums">
                      {tons.toLocaleString('fa-IR')} تن
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={500}
                    step={1}
                    value={tons}
                    onChange={(e) => setTons(Number(e.target.value))}
                    className="w-full accent-[#1B4332] cursor-pointer"
                  />
                  <input
                    type="number"
                    min={1}
                    max={2000}
                    value={tons}
                    onChange={(e) =>
                      setTons(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full px-3.5 py-2 text-sm tabular-nums bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#576059]">
                    <span>مساحت زمین یا گلخانه (۰.۵ تا ۵۰ هکتار)</span>
                    <span className="text-base font-extrabold text-[#1B4332] tabular-nums">
                      {hectares.toLocaleString('fa-IR')} هکتار
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={50}
                    step={0.5}
                    value={hectares}
                    onChange={(e) => setHectares(Number(e.target.value))}
                    className="w-full accent-[#1B4332] cursor-pointer"
                  />
                  <input
                    type="number"
                    min={0.5}
                    max={500}
                    step={0.5}
                    value={hectares}
                    onChange={(e) =>
                      setHectares(Math.max(0.5, Number(e.target.value) || 0.5))
                    }
                    className="w-full px-3.5 py-2 text-sm tabular-nums bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Step 4: Packaging */}
            <div className="space-y-2">
              <label
                htmlFor="calc-packaging"
                className="block text-sm font-bold text-[#1C241E]"
              >
                ۴. نوع بسته‌بندی (توری، گونی، کارتن یا وکیوم)
              </label>
              <select
                id="calc-packaging"
                value={activePackaging.id}
                onChange={(e) => setPackagingId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
              >
                {product.packagingOptions.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white border border-[#E2DFD7] rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
                <Calculator className="w-4 h-4" />
                <span>خروجی برآورد مهندسی و لجستیک</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg">
                  <div className="text-xs text-[#576059]">
                    {mode === 'hectare' ? 'بازه تناژ قابل برداشت' : 'وزن کل بار سفارش'}
                  </div>
                  <div className="text-2xl font-extrabold text-[#1C241E] tabular-nums mt-1">
                    {mode === 'hectare'
                      ? `${calculation.minTons.toLocaleString('fa-IR')} تا ${calculation.maxTons.toLocaleString('fa-IR')} تن`
                      : `${tons.toLocaleString('fa-IR')} تن`}
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs text-[#576059]">
                    <Package className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>تعداد بسته‌بندی مورد نیاز</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#B45309] tabular-nums mt-1">
                    {calculation.packageCount.toLocaleString('fa-IR')} عدد
                  </div>
                  <div className="text-[11px] text-[#576059] mt-0.5">
                    بر اساس وزن واحد {activePackaging.unitWeightKg} کیلوگرم
                  </div>
                </div>
              </div>

              {/* Fleet Breakdown */}
              <div className="pt-4 border-t border-[#E2DFD7] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1C241E]">
                  <Truck className="w-4 h-4 text-[#1B4332]" />
                  <span>تعداد تقریبی ناوگان حمل مورد نیاز</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#F2EFE9] rounded-lg">
                    <div className="text-lg font-bold text-[#1C241E] tabular-nums">
                      {calculation.nissanTrips.toLocaleString('fa-IR')}
                    </div>
                    <div className="text-[11px] text-[#576059]">نیسان بار (۲.۲ تن)</div>
                  </div>
                  <div className="p-3 bg-[#F2EFE9] rounded-lg">
                    <div className="text-lg font-bold text-[#1C241E] tabular-nums">
                      {calculation.khavarTrips.toLocaleString('fa-IR')}
                    </div>
                    <div className="text-[11px] text-[#576059]">خاور (۵ تن)</div>
                  </div>
                  <div className="p-3 bg-[#F2EFE9] rounded-lg">
                    <div className="text-lg font-bold text-[#1B4332] tabular-nums">
                      {calculation.trailerTrips.toLocaleString('fa-IR')}
                    </div>
                    <div className="text-[11px] text-[#576059]">تریلی صادراتی (۲۲ تن)</div>
                  </div>
                </div>
              </div>

              {/* Cold Storage Specs */}
              <div className="pt-4 border-t border-[#E2DFD7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1C241E]">
                  <ThermometerSnowflake className="w-4 h-4 text-[#1B4332]" />
                  <span>الزامات سردخانه و ماندگاری این محصول</span>
                </div>
                <div className="text-xs text-[#576059] space-y-1 tabular-nums leading-relaxed">
                  <div>
                    دمای استاندارد سردخانه:{' '}
                    <span className="font-semibold text-[#1C241E]">
                      {product.coldStorageTemp}
                    </span>
                  </div>
                  <div>
                    رطوبت نسبی و ماندگاری:{' '}
                    <span className="font-semibold text-[#1C241E]">
                      {product.coldStorageHumidity} · {product.shelfLife}
                    </span>
                  </div>
                  <div>
                    مناطق تامین اصلی {activeCultivar.name}:{' '}
                    <span className="font-semibold text-[#1C241E]">
                      {activeCultivar.regions.join('، ')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendToContact}
                className="w-full py-3 px-5 bg-[#1B4332] hover:bg-[#143326] text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ارسال این برآورد به فرم استعلام قیمت</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
