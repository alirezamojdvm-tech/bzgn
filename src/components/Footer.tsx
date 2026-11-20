import { CONTACT_INFO } from '../data/cropsData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-[#E2DFD7] bg-[#F2EFE9] text-[#1C241E] mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Owner Summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-lg font-extrabold text-[#1B4332]">
              {CONTACT_INFO.brandName}
            </div>
            <p className="text-sm text-[#576059] leading-relaxed max-w-md">
              خرید مستقیم از کشاورز، سورتینگ لیزری، نگهداری سردخانه‌ای و صادرات عمده پیاز، سیب‌زمینی، بادمجان، خیار و خیارشور به میادین تره‌بار کشور و بازارهای صادراتی با مدیریت {CONTACT_INFO.ownerName}.
            </p>
            <div className="pt-2 text-sm text-[#1C241E] space-y-1.5">
              <div>
                <span className="text-[#576059]">تلفن تماس مستقیم: </span>
                <a
                  href={CONTACT_INFO.phoneHref}
                  dir="ltr"
                  className="font-semibold tabular-nums text-[#1B4332] hover:underline inline-block"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#576059]">
                <a
                  href={CONTACT_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1B4332] underline-offset-4 hover:underline"
                >
                  وب‌سایت اصلی
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={CONTACT_INFO.rubikaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1B4332] underline-offset-4 hover:underline"
                >
                  کانال روبیکا
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={CONTACT_INFO.baleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1B4332] underline-offset-4 hover:underline"
                >
                  کانال بله
                </a>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#1C241E]">محصولات صادراتی و عمده</h3>
            <ul className="space-y-2 text-sm text-[#576059]">
              <li>
                <a href="/products/onion" onClick={(e) => handleNav(e, '/products/onion')} className="hover:text-[#1B4332] transition-colors">
                  پیاز قرمز، سفید، زرد و مینروا
                </a>
              </li>
              <li>
                <a href="/products/potato" onClick={(e) => handleNav(e, '/products/potato')} className="hover:text-[#1B4332] transition-colors">
                  سیب‌زمینی آگریا، سانتا و سردخانه‌ای
                </a>
              </li>
              <li>
                <a href="/products/eggplant" onClick={(e) => handleNav(e, '/products/eggplant')} className="hover:text-[#1B4332] transition-colors">
                  بادمجان لامپی، قلمی و گلخانه‌ای
                </a>
              </li>
              <li>
                <a href="/products/cucumber" onClick={(e) => handleNav(e, '/products/cucumber')} className="hover:text-[#1B4332] transition-colors">
                  خیار گلخانه‌ای و خیارشور عمده
                </a>
              </li>
            </ul>
          </div>

          {/* Tools & Guides Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1C241E]">خدمات، ابزارها و استعلام</h3>
            <ul className="space-y-2 text-sm text-[#576059]">
              <li>
                <a href="/markets" onClick={(e) => handleNav(e, '/markets')} className="hover:text-[#1B4332] transition-colors">
                  دایرکتوری میادین تره‌بار شهرها و قطب‌های تولید
                </a>
              </li>
              <li>
                <a href="/calculator" onClick={(e) => handleNav(e, '/calculator')} className="hover:text-[#1B4332] transition-colors">
                  محاسبه‌گر تناژ در هکتار، بسته‌بندی و سردخانه
                </a>
              </li>
              <li>
                <a href="/guides" onClick={(e) => handleNav(e, '/guides')} className="hover:text-[#1B4332] transition-colors">
                  دانشنامه صادرات، سورتینگ و سوالات متداول
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-[#1B4332] transition-colors font-semibold text-[#1B4332]">
                  فرم استعلام قیمت روز و ثبت سفارش عمده
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E2DFD7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#576059]">
          <p>
            © ۱۴۰۴–۱۴۰۵ {CONTACT_INFO.brandName} ({CONTACT_INFO.ownerName}) — تمامی حقوق محفوظ است.
          </p>
          <p className="tabular-nums">
            تامین سراسری: تهران · اصفهان · شیراز · مشهد · تبریز · جیرفت · همدان · اردبیل · یزد
          </p>
        </div>
      </div>
    </footer>
  );
}
