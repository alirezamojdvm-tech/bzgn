import { useEffect, useState } from 'react';
import { CheckCircle2, Globe, Loader2, MessageSquare, Phone, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data/cropsData';
import { SeoHead } from '../components/SeoHead';

interface ContactViewProps {
  inquiryPreset?: string;
}

export function ContactView({ inquiryPreset }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productTopic, setProductTopic] = useState('پیاز صادراتی و عمده');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (inquiryPreset) {
      setMessage(inquiryPreset);
    }
  }, [inquiryPreset]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('لطفاً نام، ایمیل و متن پیام یا استعلام خود را تکمیل کنید.');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('لطفاً یک نشانی ایمیل معتبر وارد کنید.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const fullMessage = [
        `محصول / موضوع: ${productTopic}`,
        phone.trim() ? `شماره تماس: ${phone.trim()}` : null,
        `جزئیات سفارش و پیام:\n${trimmedMessage}`,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(CONTACT_INFO.web3FormsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: CONTACT_INFO.web3FormsKey,
          name: trimmedName,
          email: trimmedEmail,
          subject: `استعلام صیفی‌جات: ${productTopic} — ${trimmedName}`,
          from_name: CONTACT_INFO.brandName,
          message: fullMessage,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMessage(
          result.message || 'ارسال پیام با مشکل مواجه شد. لطفاً با شماره 09124917822 تماس بگیرید.'
        );
        setStatus('error');
      }
    } catch {
      setErrorMessage(
        'خطا در اتصال اینترنت. لطفاً مجدداً تلاش کنید یا مستقیماً در روبیکا و بله پیام دهید.'
      );
      setStatus('error');
    }
  };

  return (
    <>
      <SeoHead
        title={`تماس با ما و استعلام قیمت روز | ${CONTACT_INFO.ownerName}`}
        description="ارسال مستقیم استعلام قیمت روز، خرید عمده از کشاورز و سفارش صادراتی پیاز، سیب‌زمینی، بادمجان و خیار به علیرضا محمدی جعفری — 09124917822."
        canonicalPath="/contact"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-8">
        <header className="space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C241E]">
            تماس با ما و استعلام قیمت روز صیفی‌جات
          </h1>
          <p className="text-sm sm:text-base text-[#576059] leading-relaxed">
            برای دریافت قیمت روز میادین تره‌بار، خرید تناژ بالا از کشاورز یا هماهنگی بارگیری صادراتی، فرم زیر را ارسال کنید یا از راه‌های ارتباطی مستقیم با {CONTACT_INFO.ownerName} در ارتباط باشید.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Info Card */}
          <aside className="lg:col-span-5 bg-white border border-[#E2DFD7] rounded-xl p-6 space-y-6">
            <div className="space-y-1 border-b border-[#E2DFD7] pb-4">
              <div className="text-xs text-[#576059]">مدیریت بازرگانی و صادرات</div>
              <h2 className="text-xl font-extrabold text-[#1B4332]">
                {CONTACT_INFO.ownerName}
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E2DFD7] hover:border-[#1B4332] transition-colors"
              >
                <span className="flex items-center gap-2.5 font-semibold text-[#1C241E]">
                  <Phone className="w-4 h-4 text-[#1B4332]" />
                  <span>تلفن تماس مستقیم</span>
                </span>
                <span dir="ltr" className="font-extrabold text-[#1B4332] tabular-nums">
                  {CONTACT_INFO.phone}
                </span>
              </a>

              <a
                href={CONTACT_INFO.rubikaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E2DFD7] hover:border-[#1B4332] transition-colors"
              >
                <span className="flex items-center gap-2.5 font-semibold text-[#1C241E]">
                  <MessageSquare className="w-4 h-4 text-[#1B4332]" />
                  <span>کانال روبیکا (اعلام بار و قیمت)</span>
                </span>
                <span dir="ltr" className="text-xs text-[#576059]">
                  rubika.ir/summercrops
                </span>
              </a>

              <a
                href={CONTACT_INFO.baleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E2DFD7] hover:border-[#1B4332] transition-colors"
              >
                <span className="flex items-center gap-2.5 font-semibold text-[#1C241E]">
                  <MessageSquare className="w-4 h-4 text-[#1B4332]" />
                  <span>کانال پیام‌رسان بله</span>
                </span>
                <span dir="ltr" className="text-xs text-[#576059]">
                  ble.ir/summercrops
                </span>
              </a>

              <a
                href={CONTACT_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E2DFD7] hover:border-[#1B4332] transition-colors"
              >
                <span className="flex items-center gap-2.5 font-semibold text-[#1C241E]">
                  <Globe className="w-4 h-4 text-[#1B4332]" />
                  <span>وب‌سایت رسمی</span>
                </span>
                <span dir="ltr" className="text-xs text-[#576059]">
                  summercrops.hsc-co.ir
                </span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#E2DFD7] text-xs text-[#576059] leading-relaxed">
              تامین و ارسال بار مستقیم از مزارع و سردخانه‌های جیرفت، همدان، اردبیل، اصفهان، قهدریجان، تبریز، ورامین، یزد، شیراز و مشهد به تمام میادین تره‌بار و پایانه‌های مرزی.
            </div>
          </aside>

          {/* Web3Forms Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E2DFD7] rounded-xl p-6 sm:p-8">
            {status === 'success' ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#1B4332] mx-auto" />
                <h2 className="text-xl font-bold text-[#1C241E]">
                  درخواست استعلام شما با موفقیت ثبت شد
                </h2>
                <p className="text-sm text-[#576059] max-w-md mx-auto leading-relaxed">
                  پیام شما مستقیماً برای {CONTACT_INFO.ownerName} ارسال گردید و در کوتاه‌ترین زمان با شما تماس گرفته می‌شود.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors cursor-pointer"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-[#1C241E]">
                      نام و نام خانوادگی
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="نام کامل یا نام شرکت"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-[#1C241E]">
                      ایمیل
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      dir="ltr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#1C241E]">
                      شماره تماس / واتساپ (اختیاری)
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912..."
                      className="w-full px-3.5 py-2.5 text-sm tabular-nums bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="block text-sm font-semibold text-[#1C241E]">
                      موضوع استعلام
                    </label>
                    <select
                      id="contact-topic"
                      value={productTopic}
                      onChange={(e) => setProductTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
                    >
                      <option value="پیاز صادراتی و عمده">پیاز صادراتی و عمده</option>
                      <option value="سیب‌زمینی عمده و سردخانه‌ای">سیب‌زمینی عمده و سردخانه‌ای</option>
                      <option value="بادمجان لامپی و قلمی صادراتی">بادمجان لامپی و قلمی صادراتی</option>
                      <option value="خیار گلخانه‌ای و خیارشور عمده">خیار گلخانه‌ای و خیارشور عمده</option>
                      <option value="خدمات سورتینگ، بسته‌بندی و سردخانه">خدمات سورتینگ، بسته‌بندی و سردخانه</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-[#1C241E]">
                    پیام و مشخصات سفارش (تناژ، رقم، بسته‌بندی و شهر مقصد)
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="مثال: استعلام قیمت روز ۲۰ تن سیب‌زمینی آگریا همدان با گونی صادراتی تحویل مرز پرویزخان..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DFD7] rounded-lg focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 text-xs sm:text-sm text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
                  >
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] disabled:opacity-60 rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>در حال ارسال پیام...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ارسال پیام و استعلام قیمت</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
