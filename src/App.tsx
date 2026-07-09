import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Award,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Clock,
  Shield,
  Hammer,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    icon: Hammer,
    title: 'Residential Building',
    description:
      'Full-scope residential construction including new builds, extensions, and structural alterations — all compliant and built to last.',
  },
  {
    icon: Shield,
    title: 'Carpentry & Joinery',
    description:
      'Precision carpentry from structural framing to bespoke joinery. Clean lines, quality materials, expert finishing.',
  },
  {
    icon: CheckCircle,
    title: 'Renovations & Fit-Outs',
    description:
      'Bathroom renovations, deck construction, kitchen fit-outs and full interior transformations done right.',
  },
  {
    icon: Clock,
    title: 'Structural Repairs & Alterations',
    description:
      'Specialising in structural repairs, structural alterations, renovations, remedial building works, carpentry, weatherproofing, and strata and insurance repairs.',
  },
];

const STATS = [
  { value: '14', label: 'Years Experience' },
  { value: '5★', label: 'Google Rating' },
  { value: '2x', label: 'Champion Awards' },
  { value: '100%', label: 'Licensed & Insured' },
];

const GALLERY = [
  { src: '/images/kg1.png', alt: 'Interior renovation with steel beams' },
  { src: '/images/kg3.png', alt: ''Bathroom renovation' },
  { src: '/images/kg4.png', alt: 'Timber deck with pool' },
  { src: '/images/kg5.png', alt: 'KG Construct on site' },
  { src: '/images/kg6.png', alt: 'Framing' },
  { src: '/images/kg2.png', alt: 'Timber deck with garden lighting' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'e6350e2d-af87-451b-98d3-b743f936700d',
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="text-gray-900 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#414141] shadow-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
            <img src="/images/kglogo.jpg" alt="KG Construct" className="h-16 w-auto rounded" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-white/90 hover:text-[#3b82f6] font-medium text-sm tracking-wide transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded text-sm font-semibold transition-colors duration-200"
            >
              Free Quote
            </button>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#414141] border-t border-white/10">
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-white/90 hover:text-[#3b82f6] font-medium text-left transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="bg-[#2563eb] text-white px-5 py-2.5 rounded font-semibold text-sm w-full"
              >
                Free Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/kg6.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#414141]/85 via-[#414141]/70 to-[#414141]/90" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/20 border border-[#2563eb]/40 text-[#93c5fd] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Star size={14} fill="currentColor" />
            5-Star Rated · Licensed Builder · Sydney
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Built Right.<br />
            <span className="text-[#3b82f6]">Built to Last.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            KG Construct delivers precision residential building and carpentry across Sydney's Bayside. 14 years of experience, zero shortcuts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
            >
              Get a Free Quote <ArrowRight size={18} />
            </button>
            <a
              href="tel:0421637320"
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Phone size={18} /> 0421 637 320
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollTo('#about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* STATS BAR */}
      <div className="bg-[#414141] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#3b82f6] mb-1">{s.value}</div>
              <div className="text-white/60 text-sm font-medium tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-widest mb-4">
                About KG Construct
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#414141] leading-tight mb-6">
                14 Years of Hands-On Building Excellence
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                KG Construct is a licensed, 5-star rated building and carpentry company based in Arncliffe, delivering precise, compliance-focused residential construction across Sydney's Bayside council areas.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Led by Kieren Gallagher — a hands-on builder with 14 years of industry experience — the business is known for clean workmanship, reliability, and transparent communication on every project.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Licensed & fully insured builder',
                  'Compliance-focused on every project',
                  'Transparent communication throughout',
                  'Emergency & same-day service available',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="text-[#2563eb] shrink-0" size={20} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <img src="/images/kglogo.jpg" alt="KG Construct" className="h-16 rounded-lg" />
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#f59e0b]" fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">5-Star Google Rating</p>
                  <a
                    href="https://share.google/EpVSNrjOUPce9qEwf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563eb] text-sm font-semibold hover:underline"
                  >
                    View Reviews &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/kg4.png"
                  alt="Bathroom renovation"
                  className="rounded-xl object-cover w-full h-64 shadow-lg"
                />
                <img
                  src="/images/kg5.png"
                  alt="Deck with lighting"
                  className="rounded-xl object-cover w-full h-64 shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#2563eb] text-white p-5 rounded-xl shadow-xl">
                <Award size={28} className="mb-2" />
                <div className="font-black text-xl">2x</div>
                <div className="text-sm font-medium text-blue-100">Champion Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-widest mb-4">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#414141] mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From structural builds to fine carpentry — every job completed with a builder's eye for detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#eff6ff] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2563eb] transition-colors duration-300">
                  <s.icon className="text-[#2563eb] group-hover:text-white transition-colors duration-300" size={26} />
                </div>
                <h3 className="text-lg font-bold text-[#414141] mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#414141] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Free quotes on all jobs</h3>
              <p className="text-white/60">No obligation. No hidden costs. Just honest pricing.</p>
            </div>
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-xl font-bold text-base transition-colors duration-200 whitespace-nowrap flex items-center gap-2"
            >
              Request a Quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS GALLERY */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-widest mb-4">
              Our Work
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#414141] mb-4">Recent Projects</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A snapshot of what clean workmanship looks like across Sydney's Bayside.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl group ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#414141]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white font-semibold text-sm">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-[#414141]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#3b82f6] font-semibold text-sm uppercase tracking-widest mb-4">
                Why KG Construct
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                The Standard Others Don't Match
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                KG Construct delivers a level of reliability, communication, and structural capability that most small building companies don't match. Every project is run with a builder's eye for detail, compliance, and long-term durability — not shortcuts.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Shield, title: 'Compliance-First Approach', desc: 'Every build meets Australian standards and council requirements.' },
                  { icon: MessageSquare, title: 'Transparent Communication', desc: 'You know what\'s happening on your site at every stage.' },
                  { icon: Award, title: 'Award-Winning Quality', desc: '2x Champion Award recipient for construction excellence.' },
                  { icon: Clock, title: 'On-Time Delivery', desc: 'Projects completed on schedule — no excuses, no surprises.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 bg-[#2563eb]/20 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#3b82f6]" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-white/50 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/whyKG.png"
                alt="Completed deck project"
                className="rounded-2xl w-full object-cover h-[520px] shadow-2xl"
              />
              <div className="absolute -top-5 -right-5 bg-[#2563eb] text-white p-6 rounded-2xl shadow-xl text-center">
                <div className="text-3xl font-black">14</div>
                <div className="text-xs font-medium text-blue-200 mt-1">Years<br/>Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS STRIP */}
      <div className="bg-[#f8fafc] py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-[#f59e0b]" fill="#f59e0b" />
              ))}
            </div>
            <span className="font-bold text-[#414141] text-lg">5.0 on Google Reviews</span>
          </div>
          <p className="text-gray-500 italic text-center md:text-left">
            "Clean workmanship, reliable, and great communication throughout the project."
          </p>
          <a
            href="https://share.google/EpVSNrjOUPce9qEwf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 whitespace-nowrap"
          >
            Read All Reviews
          </a>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#414141] mb-4">
              Request a Free Quote
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Ready to start your project? Get in touch and we'll get back to you fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-[#414141] mb-8">Contact Details</h3>
              <div className="flex flex-col gap-6 mb-10">
                <a href="tel:0421637320" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center group-hover:bg-[#2563eb] transition-colors duration-200">
                    <Phone className="text-[#2563eb] group-hover:text-white transition-colors duration-200" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone / SMS</div>
                    <div className="text-[#414141] font-bold text-lg">0421 637 320</div>
                  </div>
                </a>
                <a href="mailto:Kiereng2011@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center group-hover:bg-[#2563eb] transition-colors duration-200">
                    <Mail className="text-[#2563eb] group-hover:text-white transition-colors duration-200" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</div>
                    <div className="text-[#414141] font-bold">Kiereng2011@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center">
                    <MapPin className="text-[#2563eb]" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Location</div>
                    <div className="text-[#414141] font-bold">Arncliffe · Bayside Council Areas</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} className="text-[#2563eb]" />
                  <span className="font-bold text-[#414141]">Structural Repairs & Alterations</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Specialising in structural repairs, structural alterations, renovations, remedial building works, carpentry, weatherproofing, and strata and insurance repairs.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition"
                    placeholder="04xx xxx xxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Required</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition bg-white"
                >
                  <option value="">Select a service...</option>
                  <option>Residential Building</option>
                  <option>Carpentry & Joinery</option>
                  <option>Renovation / Fit-Out</option>
                  <option>Deck Construction</option>
                  <option>Structural Repairs & Alterations</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-gray-300 text-white py-4 rounded-lg font-bold text-base transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {formStatus === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <ArrowRight size={18} />
                  </>
                )}
              </button>

              {formStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} />
                  Message sent! We'll be in touch shortly.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
                  Something went wrong. Please call us directly on 0421 637 320.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#414141] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-white/10">
            <div>
              <img src="/images/kglogo.jpg" alt="KG Construct" className="h-14 rounded-lg mb-4" />
              <p className="text-white/50 text-sm leading-relaxed">
                Licensed building and carpentry company delivering precision residential construction across Sydney's Bayside.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="flex flex-col gap-2">
                {['Residential Building', 'Carpentry & Joinery', 'Renovations', 'Deck Construction', 'Structural Repairs & Alterations'].map((s) => (
                  <li key={s} className="text-white/50 text-sm hover:text-white/80 transition-colors cursor-default">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:0421637320" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <Phone size={14} /> 0421 637 320
                </a>
                <a href="mailto:Kiereng2011@gmail.com" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <Mail size={14} /> Kiereng2011@gmail.com
                </a>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin size={14} /> Arncliffe, NSW · Bayside Council Areas
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2025 KG Construct. All rights reserved.</p>
            <a
              href="https://www.itscold.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 text-sm transition-colors duration-200"
            >
              Website by Go Polar
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
