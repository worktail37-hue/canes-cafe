import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Compass,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare,
  Coffee,
  RotateCcw,
} from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SITE_DATA } from '../data/siteData';
import { SEO_CONFIG } from '../config/seoConfig';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

export const VisitUs: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();

  // Anti-Spam & Abuse Protection states
  const [websiteUrlHp, setWebsiteUrlHp] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);
  const formMountedAt = React.useRef(Date.now());

  // Inquiry form states
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Menu & Dietary Details');
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedInquiry, setConfirmedInquiry] = useState<{
    id: string;
    name: string;
    topic: string;
    phone?: string;
    autoReplyText?: string;
    ownerWhatsAppChatUrl?: string | null;
    customerWhatsAppChatUrl?: string | null;
  } | null>(null);

  useEffect(() => {
    if (user && !senderName && user.displayName) {
      setSenderName(user.displayName);
    }
  }, [user]);

  // Dynamic store info from backend
  const [storeInfo, setStoreInfo] = useState({
    address: SITE_DATA.locationSection.address,
    city: SITE_DATA.locationSection.city,
    phone: SITE_DATA.locationSection.phone,
    whatsapp: SITE_DATA.locationSection.whatsapp,
    hours: SITE_DATA.locationSection.hours,
    bakingSchedule: SITE_DATA.locationSection.bakingSchedule,
  });

  useEffect(() => {
    fetch('/api/store-info')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.phone) {
          setStoreInfo((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.log('Store info fallback to default:', err));
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(`${storeInfo.address}, ${storeInfo.city}`);
    showToast('Address Copied', `${storeInfo.address}, ${storeInfo.city}`, 'info');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot bot check
    if (websiteUrlHp) {
      setIsSubmitting(false);
      return;
    }

    if (!senderName.trim() || !senderPhone.trim() || !messageText.trim()) {
      setErrorMessage('Please fill in your name, phone number, and message.');
      showToast('Missing Details', 'Please provide your name, mobile phone number, and message.', 'info');
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please consent to contact regarding this inquiry.');
      showToast('Consent Required', 'Please confirm consent to be contacted regarding your message.', 'info');
      return;
    }

    setIsSubmitting(true);
    const timeOnForm = Date.now() - formMountedAt.current;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName.trim(),
          phone: senderPhone.trim(),
          topic: inquiryTopic,
          message: messageText.trim(),
          website_url_hp: websiteUrlHp,
          formTimeMs: timeOnForm,
          consentGiven,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          throw new Error('Rate limit exceeded: You have submitted multiple requests recently. Please call or WhatsApp us directly.');
        }
        throw new Error(errData.error || 'Failed to send inquiry to server');
      }

      const data = await response.json();
      setConfirmedInquiry({
        ...data.inquiry,
        phone: senderPhone.trim(),
        autoReplyText: data.autoReply?.text || data.inquiry?.autoReplyText,
        ownerWhatsAppChatUrl: data.ownerWhatsAppChatUrl,
        customerWhatsAppChatUrl: data.customerWhatsAppChatUrl,
      });

      showToast(
        'Inquiry Dispatched!',
        `Thank you ${senderName}. Your message #${data.inquiry.id} was sent directly to our manager's private alert channel.`,
        'success'
      );
    } catch (err: any) {
      setErrorMessage(err?.message || 'Could not send message. Please call or WhatsApp us directly.');
      showToast('Message Notice', err?.message || 'Could not send message. Please call or WhatsApp us directly.', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setConfirmedInquiry(null);
    setMessageText('');
    setErrorMessage('');
    formMountedAt.current = Date.now();
  };

  return (
    <section id="visit-us" aria-labelledby="visit-heading" className="py-20 sm:py-28 bg-[#E9E3DA] relative">
      {/* Anchor aliases for crawlability & direct navigation */}
      <span id="location" className="sr-only">Cane's Serve Location &amp; Hours</span>
      <span id="contact" className="sr-only">Contact Cane's Serve</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] block mb-2">
            Storefront, Hours &amp; Inquiries
          </span>
          <h2
            id="visit-heading"
            className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C]"
          >
            Visit Our Cafe &amp; Bakehouse
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 leading-relaxed">
            Located in {SEO_CONFIG.neighborhood || 'Artisan Quarter'}, {SEO_CONFIG.city || '[CITY]'}. {SITE_DATA.locationSection.subtitle}
          </p>
        </div>

        {/* Content Layout: Store Info + Live Contact & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Hours, Contact & Location Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* Store Information Card */}
            <div className="bg-[#F4F0EA] p-6 sm:p-8 rounded-3xl border border-[#D6CCBE] shadow-sm">
              <div className="space-y-6">
                {/* Semantic Address block (NAP consistency for Local SEO) */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    <MapPin className="w-5 h-5 text-[#C9A24B]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#3B322C]">Storefront Location</h3>
                    <address className="not-italic text-sm text-[#2F2823] mt-1 leading-relaxed">
                      <span className="block font-medium">{SEO_CONFIG.businessName}</span>
                      <span>{storeInfo.address}</span>
                      <br />
                      <span>{storeInfo.city}</span>
                    </address>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={handleCopyAddress}
                        type="button"
                        className="text-xs font-semibold text-[#8C7B6E] hover:text-[#3B322C] underline uppercase tracking-wider cursor-pointer"
                      >
                        Copy Address
                      </button>
                      <span className="text-[#8C7B6E]">·</span>
                      <a
                        href={SEO_CONFIG.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#8C7B6E] hover:text-[#3B322C] underline uppercase tracking-wider inline-flex items-center gap-1"
                      >
                        Directions <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Semantic Hours Table with <time> elements */}
                <div className="flex items-start gap-4 pt-4 border-t border-[#D6CCBE]">
                  <div className="w-10 h-10 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    <Clock className="w-5 h-5 text-[#C9A24B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-lg text-[#3B322C]">Opening Hours</h3>
                    <table className="w-full mt-3 divide-y divide-[#D6CCBE]/60 text-xs sm:text-sm">
                      <caption className="sr-only">Weekly store hours for cafe and bakery counter</caption>
                      <tbody>
                        {SEO_CONFIG.openingHoursFormatted.map((row) => (
                          <tr key={row.days} className="py-2 flex items-center justify-between first:pt-0 last:pb-0">
                            <td className="font-medium text-[#2F2823] py-1.5">{row.days}</td>
                            <td className="font-mono text-[#8C7B6E] font-medium py-1.5">
                              <time dateTime={row.opens}>{row.time.split(' – ')[0]}</time>
                              {' – '}
                              <time dateTime={row.closes}>{row.time.split(' – ')[1]}</time>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="mt-3 text-xs text-[#8C7B6E] italic bg-[#E9E3DA] p-3 rounded-xl border border-[#D6CCBE]/60">
                      💡 {storeInfo.bakingSchedule}
                    </p>
                  </div>
                </div>

                {/* Contact info (NAP Phone & WhatsApp) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#D6CCBE]">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#8C7B6E]" aria-hidden="true" />
                    <a
                      href={`tel:${SEO_CONFIG.phoneRaw || storeInfo.phone.replace(/[^+\d]/g, '')}`}
                      className="text-xs sm:text-sm text-[#3B322C] hover:underline font-mono"
                    >
                      {storeInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                    <a
                      href="https://wa.me/15552345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-[#3B322C] hover:underline font-mono"
                    >
                      WhatsApp: {storeInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Neighborhood & Directions Card */}
            <div className="bg-[#3B322C] rounded-3xl p-6 sm:p-7 text-[#F3EEE7] relative overflow-hidden border border-[#2A231E] shadow-lg">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #F3EEE7 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A231E] text-xs font-mono text-[#C9A24B] border border-[#8C7B6E]/40">
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {SEO_CONFIG.geo.latitude.toFixed(4)}° N, {Math.abs(SEO_CONFIG.geo.longitude).toFixed(4)}° W
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-[#F3EEE7]">
                  {SEO_CONFIG.neighborhood || 'Artisan Quarter'}, Portland
                </h4>
                <p className="text-xs text-[#D6CCBE]/80 leading-relaxed">
                  Walk 3 blocks east from Pioneer Courthouse Square. Outdoor patio seating and bicycle racks available directly out front.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#C9A24B] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Patio Seating &amp; Bike Racks
                  </span>
                  <a
                    href={SEO_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#C9A24B] text-[#2A231E] text-xs font-bold hover:bg-[#F3EEE7] transition-colors"
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Team & Inquiries Module */}
          <div className="lg:col-span-7">
            <div className="bg-[#F4F0EA] rounded-3xl p-6 sm:p-8 border border-[#D6CCBE] shadow-md relative">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#D6CCBE]">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#C9A24B]" />
                    <h3 className="font-serif font-black text-2xl text-[#3B322C]">
                      Get in Touch
                    </h3>
                  </div>
                  <p className="text-xs text-[#8C7B6E] mt-1">
                    Inquiries about our menu, dietary questions, or visiting our cafe
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E3DA] border border-[#D6CCBE] text-[11px] font-semibold text-[#3B322C]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Counter Open Daily</span>
                </div>
              </div>

              {/* Quick Communication Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                <a
                  href={`tel:${SEO_CONFIG.phoneRaw || storeInfo.phone.replace(/[^+\d]/g, '')}`}
                  className="p-4 rounded-2xl bg-white border border-[#D6CCBE] hover:border-[#3B322C] transition-all group flex flex-col justify-between shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#3B322C] group-hover:bg-[#3B322C] group-hover:text-[#F3EEE7] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block">Call Us</span>
                    <span className="text-xs font-mono font-bold text-[#3B322C] truncate block mt-0.5">{storeInfo.phone}</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/15552345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-[#D6CCBE] hover:border-[#25D366] transition-all group flex flex-col justify-between shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EAF7EE] flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34] block">WhatsApp</span>
                    <span className="text-xs font-mono font-bold text-[#3B322C] truncate block mt-0.5">Chat Directly</span>
                  </div>
                </a>

                <a
                  href={SEO_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-[#D6CCBE] hover:border-[#3B322C] transition-all group flex flex-col justify-between shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#3B322C] group-hover:bg-[#3B322C] group-hover:text-[#F3EEE7] transition-colors">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block">Directions</span>
                    <span className="text-xs font-medium text-[#3B322C] truncate block mt-0.5">Open Google Maps</span>
                  </div>
                </a>
              </div>

              {/* View 1: Confirmed Inquiry Card */}
              {confirmedInquiry ? (
                <div className="mt-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D6CCBE] text-center shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center mx-auto mb-4 shadow-md">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#8C7B6E]">
                      Message Received
                    </span>
                    <h4 className="font-mono font-black text-2xl text-[#3B322C] mt-1">
                      Ref #{confirmedInquiry.id}
                    </h4>
                    <p className="mt-2 text-sm text-[#8C7B6E]">
                      Thank you, <strong className="text-[#3B322C]">{confirmedInquiry.name}</strong>. Our barista and kitchen team will review your inquiry regarding <span className="font-semibold text-[#3B322C]">{confirmedInquiry.topic}</span> promptly.
                    </p>
                  </div>

                  {/* 🤖 Automated AI WhatsApp Reply Dispatched Notification */}
                  <div className="p-5 bg-[#FAF7F2] rounded-2xl border-2 border-[#C9A24B]/50 shadow-sm space-y-3 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#C9A24B] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                        Automated AI WhatsApp Response
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Dispatched Automatically
                      </span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#D6CCBE] text-xs text-[#2F2823] space-y-2 shadow-2xs font-sans">
                      <div className="flex items-center gap-2 text-[11px] text-[#8C7B6E] font-medium border-b border-[#E9E3DA] pb-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Direct Reply Dispatched to {confirmedInquiry.phone ? confirmedInquiry.phone : confirmedInquiry.name}:</span>
                      </div>
                      <p className="font-semibold text-[#3B322C] leading-relaxed">
                        &ldquo;Hi {confirmedInquiry.name}, thank you for reaching out to Cane's Serve regarding {confirmedInquiry.topic}! How can we help you?&rdquo;
                      </p>
                      {confirmedInquiry.autoReplyText && (
                        <p className="text-[#6B5E55] text-xs leading-relaxed whitespace-pre-wrap border-t border-[#E9E3DA]/80 pt-2">
                          {confirmedInquiry.autoReplyText.replace(`Hi ${confirmedInquiry.name}, thank you for reaching out to Cane's Serve regarding ${confirmedInquiry.topic}! How can we help you?`, '').trim()}
                        </p>
                      )}
                    </div>

                    {confirmedInquiry.customerWhatsAppChatUrl && (
                      <a
                        href={confirmedInquiry.customerWhatsAppChatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>View &amp; Continue Chat on WhatsApp</span>
                      </a>
                    )}
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D6CCBE] text-xs text-[#8C7B6E] flex items-start gap-2.5">
                    <Coffee className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                    <span>
                      Visiting in person? Walk-ins are warmly welcomed throughout opening hours. Just pull up a stool at the brew bar or pick an indoor table.
                    </span>
                  </div>

                  {/* WhatsApp Direct Connect Option */}
                  {confirmedInquiry.ownerWhatsAppChatUrl && (
                    <div className="p-4 bg-[#EAF7EE] rounded-2xl border border-[#A6E1BA] space-y-2 text-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E7E34] block">
                        Direct Roastery Channel
                      </span>
                      <p className="text-xs text-[#2A613B]">
                        Connect directly with our head roaster and kitchen manager on WhatsApp:
                      </p>
                      <a
                        href={confirmedInquiry.ownerWhatsAppChatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-full bg-[#1E7E34] hover:bg-[#155724] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>Open Roastery WhatsApp Chat</span>
                      </a>
                    </div>
                  )}

                  <button
                    onClick={handleResetForm}
                    type="button"
                    className="w-full py-3.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                /* View 2: Inquiry Form */
                <form onSubmit={handleSendMessage} className="space-y-4">
                  {/* Hidden Anti-Spam Honeypot field (bots fill this, humans cannot see) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website_url_hp">Leave this field blank</label>
                    <input
                      id="website_url_hp"
                      type="text"
                      name="website_url_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={websiteUrlHp}
                      onChange={(e) => setWebsiteUrlHp(e.target.value)}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                      <span className="font-bold">Notice:</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Topic Select */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B322C] mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={inquiryTopic}
                      onChange={(e) => setInquiryTopic(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] focus:outline-none focus:ring-2 focus:ring-[#3B322C] cursor-pointer"
                    >
                      <option value="Menu & Dietary Details">Menu &amp; Dietary Details (Coffee, Bakery, Pasta)</option>
                      <option value="Table Reservation Request">Table Reservation Request (Seating &amp; Time)</option>
                      <option value="Whole-Bean Coffee Supply">Whole-Bean Coffee &amp; Roastery Inquiries</option>
                      <option value="Catering & Pastry Platters">Catering, Bakery Boxes &amp; Large Orders</option>
                      <option value="Cafe Atmosphere & Amenities">Cafe Seating, Laptop Policy &amp; Patio</option>
                      <option value="General Feedback & Greeting">General Feedback &amp; Hello</option>
                    </select>
                  </div>

                  {/* Contact Info (Name, Mobile Phone) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B322C] mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      placeholder="e.g. David Miller"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B322C] mb-1">
                      Mobile Phone (for Call &amp; WhatsApp Reply) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={30}
                      placeholder="e.g. +1 (555) 234-5678"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                    />
                    <p className="text-[11px] text-[#8C7B6E] mt-1">
                      Our automated AI WhatsApp will instantly send your confirmation and greeting to this number.
                    </p>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B322C] mb-1">
                      Your Message or Question <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={1000}
                      placeholder="Ask about our coffee roasts, sourdough bake schedule, pasta ingredients, or directions..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                    />
                  </div>

                  {/* WhatsApp Consent Checkbox (Step 4 & 5 Compliance) */}
                  <label className="flex items-start gap-2.5 text-xs text-[#4A3E35] cursor-pointer pt-1 select-none">
                    <input
                      type="checkbox"
                      required
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded text-[#3B322C] focus:ring-[#3B322C] cursor-pointer w-4 h-4"
                    />
                    <span className="leading-relaxed">
                      By submitting, you agree to be contacted on WhatsApp or by phone regarding this request. (We never share your contact details; text STOP anytime to opt out).
                    </span>
                  </label>

                  {/* Privacy Assurance Callout */}
                  <div className="p-3 bg-[#E9E3DA] rounded-xl border border-[#D6CCBE] flex items-start gap-2.5 text-[11px] text-[#2F2823]">
                    <span className="text-base leading-none">🔒</span>
                    <p className="leading-relaxed">
                      <strong className="text-[#3B322C]">Strict Privacy Assured:</strong> Customer details are encrypted and accessible exclusively to the verified store owner. Data is never shared or published publicly.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-all disabled:opacity-50 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#F3EEE7] border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#C9A24B]" />
                          <span>Send Cafe Inquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-[#8C7B6E] mt-2">
                      Prompt WhatsApp alert notification sent to owner upon submission
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
