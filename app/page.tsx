'use client';

import { FormEvent, useState, useEffect } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      business: formData.get('business') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      productInterest: formData.get('productInterest') as string,
      message: formData.get('message') as string,
    };

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! Our team will contact you within 24 hours.');
        event.currentTarget.reset();
      } else {
        throw new Error('Failed to send enquiry.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again or contact us directly.');
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5%] py-5 bg-[rgba(26,58,42,0.96)] backdrop-blur-[12px] border-b border-[rgba(168,216,122,0.15)]">
        <div className="nav-logo flex items-center gap-3">
          <div className="nav-logo-icon w-[42px] h-[42px] bg-gradient-to-br from-leaf to-lime rounded-[8px] flex items-center justify-center font-[Playfair Display] font-black text-[1.2rem] text-forest">Q</div>
          <div className="nav-logo-text font-[Playfair Display] font-semibold text-[1.3rem] text-white tracking-[0.02em]">
            Omni<span className="text-lime">Q</span> Materials
          </div>
        </div>
        <ul className="nav-links flex items-center gap-[2.5rem] list-none">
          <li><a href="#about" className="text-[rgba(245,240,232,0.8)] no-underline text-[0.9rem] font-medium tracking-[0.05em] uppercase transition-colors duration-300 hover:text-lime">About</a></li>
          <li><a href="#products" className="text-[rgba(245,240,232,0.8)] no-underline text-[0.9rem] font-medium tracking-[0.05em] uppercase transition-colors duration-300 hover:text-lime">Products</a></li>
          <li><a href="#manufacturing" className="text-[rgba(245,240,232,0.8)] no-underline text-[0.9rem] font-medium tracking-[0.05em] uppercase transition-colors duration-300 hover:text-lime">Manufacturing</a></li>
          <li><a href="#contact" className="nav-cta bg-lime text-forest px-[1.3rem] py-[0.55rem] rounded-[4px] font-semibold uppercase transition duration-300 hover:bg-leaf hover:-translate-y-1">Get a Quote</a></li>
        </ul>
      </nav>

      <section className="hero min-h-screen bg-forest relative overflow-hidden flex items-center px-[5%] pt-[8rem] pb-[5rem]">
        <div className="hero-bg-pattern absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(106,173,110,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(168,216,122,0.06)_0%,transparent_40%),radial-gradient(circle_at_60%_80%,rgba(74,124,89,0.1)_0%,transparent_40%)]" />
        <div className="hero-grid-lines absolute inset-0 bg-[linear-gradient(rgba(168,216,122,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(168,216,122,0.04)_1px,transparent_1px)] bg-[length:80px_80px]" />
        <div className="hero-leaf-deco absolute right-[-5%] top-1/2 transform -translate-y-1/2 w-[55%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(74,124,89,0.18)_0%,transparent_70%)] rounded-full" />

        <div className="hero-content relative z-20 max-w-[680px]">
          <div className="hero-badge inline-flex items-center gap-2 rounded-[50px] bg-[rgba(168,216,122,0.12)] border border-[rgba(168,216,122,0.3)] text-lime px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] mb-7 opacity-0 animate-fadeup">
            Sustainable Packaging Solutions
          </div>
          <h1 className="hero-title font-[Playfair Display] font-black text-[clamp(3rem,6vw,5.2rem)] leading-[1.05] text-white mb-4 opacity-0 animate-fadeup" style={{ animationDelay: '0.15s' }}>
            One Source.<br />
            <span className="highlight relative inline-block text-lime">Infinite</span><br />
            Solutions.
          </h1>
          <p className="hero-tagline font-[DM Mono] text-[1rem] text-tan tracking-[0.15em] uppercase mb-6 opacity-0 animate-fadeup" style={{ animationDelay: '0.25s' }}>
            OmniQ Materials — <span className="text-accent font-medium">Eco-Friendly Packaging</span>
          </p>
          <p className="hero-desc text-[1.1rem] leading-[1.75] text-[rgba(245,240,232,0.75)] max-w-[520px] mb-10 opacity-0 animate-fadeup" style={{ animationDelay: '0.35s' }}>
            Trusted supplier of sustainable packaging across Delhi NCR. From kraft paper bags to corrugated boxes — we deliver quality, reliability, and environmental responsibility in every order.
          </p>
          <div className="hero-actions flex flex-wrap gap-4 opacity-0 animate-fadeup" style={{ animationDelay: '0.45s' }}>
            <a href="#products" className="btn-primary bg-lime text-forest px-8 py-3 rounded-[6px] font-bold text-[0.95rem] no-underline inline-flex items-center gap-2 tracking-[0.03em] transition duration-300 hover:bg-leaf hover:-translate-y-0.5 shadow-hero">Explore Products →</a>
            <a href="#contact" className="btn-secondary border-[1.5px] border-[rgba(168,216,122,0.4)] text-lime px-8 py-3 rounded-[6px] font-medium text-[0.95rem] no-underline inline-flex items-center gap-2 transition duration-300 hover:border-lime hover:bg-[rgba(168,216,122,0.08)] hover:-translate-y-0.5">📞 Get a Quote</a>
          </div>
        </div>

        <div className="hero-stats absolute right-[5%] bottom-[10%] flex gap-12 opacity-0 animate-fadeup" style={{ animationDelay: '0.6s' }}>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-[Playfair Display] text-[2.4rem] font-black text-lime leading-[1]">500+</div>
            <div className="hero-stat-label text-[0.78rem] text-tan uppercase tracking-[0.08em] mt-1">Clients Served</div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-[Playfair Display] text-[2.4rem] font-black text-lime leading-[1]">9+</div>
            <div className="hero-stat-label text-[0.78rem] text-tan uppercase tracking-[0.08em] mt-1">Product Lines</div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-[Playfair Display] text-[2.4rem] font-black text-lime leading-[1]">100%</div>
            <div className="hero-stat-label text-[0.78rem] text-tan uppercase tracking-[0.08em] mt-1">Eco-Friendly</div>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tan text-[0.75rem] uppercase tracking-[0.12em] opacity-0 animate-fadein">
          <span>Scroll</span>
          <div className="scroll-line w-[1px] h-[40px] bg-[linear-gradient(to_bottom,rgba(193,166,123,1),transparent)] animate-scrollDrop" />
        </div>
      </section>

      <section className="about bg-cream grid grid-cols-[1fr_1fr] gap-[5rem] items-center px-[5%] py-[6rem]" id="about">
        <div className="about-content reveal">
          <div className="section-label flex items-center gap-2 text-sage text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3">
            <span className="block w-6 h-[2px] bg-leaf rounded" />
            Who We Are
          </div>
          <h2 className="section-title font-[Playfair Display] text-[clamp(2rem,4vw,3.2rem)] font-black text-forest leading-[1.1] mb-3">Your Reliable <span className="accent text-sage">Packaging</span> Partner</h2>
          <p className="section-desc text-[1.05rem] leading-[1.8] text-[#555] max-w-[600px]">
            OmniQ Materials is a trusted supplier of sustainable packaging solutions across Noida, Delhi NCR, including Gurgaon and surrounding regions. We specialize in eco-friendly packaging products — kraft paper bags, biodegradable packaging, food-grade containers, and custom-printed boxes.
          </p>
          <br />
          <p className="section-desc text-[1.05rem] leading-[1.8] text-[#555] max-w-[600px]">
            Whether you are a retailer, food business, or manufacturer, OmniQ Materials serves as your reliable, one-stop destination for high-quality, eco-friendly packaging solutions — backed by bulk supply capabilities, competitive pricing, and dependable on-time delivery.
          </p>
          <br />
          <div className="certifications flex flex-wrap gap-2.5">
            <span className="cert-badge bg-[rgba(168,216,122,0.15)] border border-[rgba(106,173,110,0.4)] text-forest rounded px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em]">🌿 Eco-Certified</span>
            <span className="cert-badge bg-[rgba(168,216,122,0.15)] border border-[rgba(106,173,110,0.4)] text-forest rounded px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em]">♻️ Biodegradable</span>
            <span className="cert-badge bg-[rgba(168,216,122,0.15)] border border-[rgba(106,173,110,0.4)] text-forest rounded px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em]">🍃 FSC Compliant</span>
            <span className="cert-badge bg-[rgba(168,216,122,0.15)] border border-[rgba(106,173,110,0.4)] text-forest rounded px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em]">✅ Food-Grade Safe</span>
          </div>
        </div>

        <div className="about-visual reveal relative">
          <div className="about-card-main relative overflow-hidden rounded-[16px] bg-forest p-[3rem] text-white">
            <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(106,173,110,0.25)_0%,transparent_70%)]" />
            <div className="section-label text-lime flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3">
              <span className="block w-6 h-[2px] bg-leaf rounded" />
              Our Offering
            </div>
            <h3 className="font-[Playfair Display] text-[1.8rem] font-semibold mb-2">End-to-End Packaging Solutions</h3>
            <p className="text-[0.9rem] leading-[1.6] text-[rgba(245,240,232,0.65)] mb-6">
              From product concept to delivered packaging — we handle everything with precision and care.
            </p>
            <div className="about-icon-grid grid grid-cols-2 gap-4 mt-8">
              <div className="about-icon-item flex items-center gap-2 rounded-[10px] border border-[rgba(168,216,122,0.2)] bg-[rgba(168,216,122,0.1)] p-4 text-[0.85rem] text-[rgba(245,240,232,0.85)]">
                <span className="icon text-[1.3rem]">🏭</span> Bulk Manufacturing
              </div>
              <div className="about-icon-item flex items-center gap-2 rounded-[10px] border border-[rgba(168,216,122,0.2)] bg-[rgba(168,216,122,0.1)] p-4 text-[0.85rem] text-[rgba(245,240,232,0.85)]">
                <span className="icon text-[1.3rem]">🎨</span> Custom Printing
              </div>
              <div className="about-icon-item flex items-center gap-2 rounded-[10px] border border-[rgba(168,216,122,0.2)] bg-[rgba(168,216,122,0.1)] p-4 text-[0.85rem] text-[rgba(245,240,232,0.85)]">
                <span className="icon text-[1.3rem]">🚚</span> Timely Delivery
              </div>
              <div className="about-icon-item flex items-center gap-2 rounded-[10px] border border-[rgba(168,216,122,0.2)] bg-[rgba(168,216,122,0.1)] p-4 text-[0.85rem] text-[rgba(245,240,232,0.85)]">
                <span className="icon text-[1.3rem]">📦</span> All Sizes & Specs
              </div>
              <div className="about-icon-item flex items-center gap-2 rounded-[10px] border border-[rgba(168,216,122,0.2)] bg-[rgba(168,216,122,0.1)] p-4 text-[0.85rem] text-[rgba(245,240,232,0.85)]">
                <span className="icon text-[1.3rem]">💰</span> Competitive Pricing
              </div>
              <div className="about-icon-item flex items-center gap-2 rounded-[10px] border border-[rgba(168,216,122,0.2)] bg-[rgba(168,216,122,0.1)] p-4 text-[0.85rem] text-[rgba(245,240,232,0.85)]">
                <span className="icon text-[1.3rem]">🤝</span> Dedicated Support
              </div>
            </div>
          </div>
          <div className="about-card-accent absolute bottom-[-1.5rem] right-[-1.5rem] rounded-[12px] bg-accent p-[1.5rem_2rem] text-forest font-semibold text-[0.9rem] shadow-[0_8px_30px_rgba(212,168,67,0.35)]">
            <span className="big block font-[Playfair Display] text-[2.5rem] font-black leading-[1]">NCR</span>
            Pan-Region<br />Delivery
          </div>
        </div>
      </section>

      <section className="mv-section relative overflow-hidden bg-forest py-[6rem] px-[5%]" id="mission">
        <div className="mv-section-before absolute inset-0 bg-[linear-gradient(rgba(168,216,122,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,216,122,0.03)_1px,transparent_1px)] bg-[length:60px_60px]" />
        <div className="mv-header relative z-10 text-center mb-[4rem]">
          <div className="section-label mx-auto flex items-center justify-center gap-2 text-lime text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3">
            <span className="block w-6 h-[2px] bg-leaf rounded" />
            Our Purpose
          </div>
          <h2 className="section-title font-[Playfair Display] text-[clamp(2rem,4vw,3.2rem)] font-black text-white leading-[1.1]">
            Built on Belief,<br />
            <span className="text-lime">Driven by Purpose</span>
          </h2>
        </div>

        <div className="mv-grid relative z-10 grid gap-6 grid-cols-1 max-[900px]:grid-cols-1 min-[901px]:grid-cols-3">
          <div className="mv-card mission rounded-[14px] border border-[rgba(106,173,110,0.3)] bg-[rgba(74,124,89,0.25)] p-[2.5rem] transition-transform duration-300 hover:-translate-y-1.5">
            <span className="mv-card-icon block mb-[1.2rem] text-[2.5rem]">🎯</span>
            <div className="mv-card-label text-lime font-[DM Mono] text-[0.72rem] uppercase tracking-[0.15em] mb-2">Our Mission</div>
            <h3 className="mv-card-title font-[Playfair Display] text-[1.6rem] font-semibold text-white mb-4">Enabling Greener Businesses</h3>
            <p className="mv-card-text text-[0.95rem] leading-[1.75] text-[rgba(245,240,232,0.72)]">
              To help businesses transition toward environmentally responsible packaging solutions that are durable, cost-effective, and aligned with modern sustainability standards. We are committed to making eco-friendly packaging accessible to every business — regardless of size.
            </p>
          </div>

          <div className="mv-card vision rounded-[14px] border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] p-[2.5rem] transition-transform duration-300 hover:-translate-y-1.5">
            <span className="mv-card-icon block mb-[1.2rem] text-[2.5rem]">🌱</span>
            <div className="mv-card-label text-lime font-[DM Mono] text-[0.72rem] uppercase tracking-[0.15em] mb-2">Our Vision</div>
            <h3 className="mv-card-title font-[Playfair Display] text-[1.6rem] font-semibold text-white mb-4">A Sustainable Tomorrow</h3>
            <p className="mv-card-text text-[0.95rem] leading-[1.75] text-[rgba(245,240,232,0.72)]">
              To be the most trusted and innovative sustainable packaging company in India — where every product we deliver contributes to a healthier planet. We envision a future where businesses choose sustainability not as an obligation, but as a competitive advantage.
            </p>
          </div>

          <div className="mv-card values rounded-[14px] border border-[rgba(212,168,67,0.25)] bg-[rgba(212,168,67,0.12)] p-[2.5rem] transition-transform duration-300 hover:-translate-y-1.5">
            <span className="mv-card-icon block mb-[1.2rem] text-[2.5rem]">⚡</span>
            <div className="mv-card-label text-accent font-[DM Mono] text-[0.72rem] uppercase tracking-[0.15em] mb-2">Our Values</div>
            <h3 className="mv-card-title font-[Playfair Display] text-[1.6rem] font-semibold text-white mb-4">What Drives Us</h3>
            <ul className="mv-card-values-list list-none mt-2">
              <li className="flex items-center gap-2 text-[rgba(245,240,232,0.72)] text-[0.92rem] py-1 border-b border-[rgba(212,168,67,0.12)] last:border-none"><span className="text-accent text-[0.8rem]">→</span>Environmental Responsibility</li>
              <li className="flex items-center gap-2 text-[rgba(245,240,232,0.72)] text-[0.92rem] py-1 border-b border-[rgba(212,168,67,0.12)] last:border-none"><span className="text-accent text-[0.8rem]">→</span>Quality Without Compromise</li>
              <li className="flex items-center gap-2 text-[rgba(245,240,232,0.72)] text-[0.92rem] py-1 border-b border-[rgba(212,168,67,0.12)] last:border-none"><span className="text-accent text-[0.8rem]">→</span>Customer-First Approach</li>
              <li className="flex items-center gap-2 text-[rgba(245,240,232,0.72)] text-[0.92rem] py-1 border-b border-[rgba(212,168,67,0.12)] last:border-none"><span className="text-accent text-[0.8rem]">→</span>Innovation & Adaptability</li>
              <li className="flex items-center gap-2 text-[rgba(245,240,232,0.72)] text-[0.92rem] py-1 border-b border-[rgba(212,168,67,0.12)] last:border-none"><span className="text-accent text-[0.8rem]">→</span>Transparent Partnerships</li>
              <li className="flex items-center gap-2 text-[rgba(245,240,232,0.72)] text-[0.92rem] py-1 last:border-none"><span className="text-accent text-[0.8rem]">→</span>On-Time, Every Time</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="products bg-white py-[6rem] px-[5%]" id="products">
        <div className="products-header reveal flex flex-wrap justify-between items-end gap-4 mb-[3.5rem]">
          <div>
            <div className="section-label flex items-center gap-2 text-sage text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3"><span className="block w-6 h-[2px] bg-leaf rounded" />What We Offer</div>
            <h2 className="section-title font-[Playfair Display] text-[clamp(2rem,4vw,3.2rem)] font-black text-forest leading-[1.1]">Complete <span className="accent text-sage">Product</span> Range</h2>
          </div>
          <p className="text-[#888] text-[0.9rem] max-w-[280px] text-right">All products available in custom sizes, prints & bulk quantities</p>
        </div>

        <div className="products-grid reveal grid gap-6 grid-cols-1 min-[901px]:grid-cols-2 min-[1101px]:grid-cols-3">
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-kraft h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">🛍️</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Retail</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Kraft Paper Bags</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Premium kraft and paper carry bags for retail, gifting, and food delivery. Available in all sizes with custom branding.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-cup h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">☕</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Food-Grade</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Paper Cups</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Single and double-walled paper cups for hot and cold beverages. FDA-compliant food-grade materials.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-tub h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">🪣</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Food Service</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Paper Tubs</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Sturdy paper tubs ideal for ice cream, snacks, and takeaway containers. Leak-resistant and biodegradable.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-bowl h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">🥗</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Food Service</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Paper Bowls</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Eco-friendly paper bowls for salads, noodles, soups, and more. Available in various sizes for restaurants and caterers.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-straw h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">🥤</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Eco-Alternative</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Paper Straws</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">FSC-certified paper straws as a sustainable replacement for plastic. Customizable colors and lengths.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-mono h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">📦</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Branding</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Mono Cartons</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Custom mono carton boxes for pharmaceutical, FMCG, and consumer goods. High-quality offset and flexo printing.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-corr h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">📫</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Shipping</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Corrugated Boxes</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">3-ply and 5-ply corrugated boxes for safe shipping and storage. Available in all standard and custom dimensions.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-capa h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">🗂️</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Industrial</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">CAPA Board Boxes</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Heavy-duty CAPA board boxes for industrial packaging. Excellent compression strength and moisture resistance.</p>
            </div>
          </div>
          <div className="product-card rounded-[14px] overflow-hidden border-[1.5px] border-parchment bg-white transition-all duration-300 cursor-pointer hover:border-leaf hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,58,42,0.1)]">
            <div className="product-card-img bg-industrial h-[180px] flex items-center justify-center text-[4rem] relative overflow-hidden">🏭</div>
            <div className="product-card-body p-[1.5rem]">
              <div className="product-tag inline-block bg-[rgba(74,124,89,0.1)] text-sage text-[0.7rem] font-semibold uppercase tracking-[0.08em] px-[0.6rem] py-[0.2rem] rounded-[3px] mb-2">Industrial</div>
              <div className="product-name font-[Playfair Display] text-[1.2rem] font-semibold text-forest mb-2">Industrial Paper Solutions</div>
              <p className="product-desc text-[0.88rem] text-[#666] leading-[1.6]">Complete industrial paper packaging — edge protectors, paper rolls, wrapping solutions, and custom industrial packs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="manufacturing relative overflow-hidden bg-parchment py-[6rem] px-[5%]" id="manufacturing">
        <div className="mfg-header reveal mb-[4rem]">
          <div className="section-label flex items-center gap-2 text-sage text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3"><span className="block w-6 h-[2px] bg-leaf rounded" />How We Work</div>
          <h2 className="section-title font-[Playfair Display] text-[clamp(2rem,4vw,3.2rem)] font-black text-forest leading-[1.1] mb-4">Precision from <span className="accent text-sage">Mill to Market</span></h2>
          <p className="section-desc text-[1.05rem] leading-[1.8] text-[#555] max-w-[600px]">Our manufacturing approach ensures every product meets the highest standards of quality, sustainability, and consistency — at scale.</p>
        </div>

        <div className="mfg-grid grid gap-[4rem] grid-cols-1 min-[901px]:grid-cols-2 items-center">
          <div className="mfg-steps reveal flex flex-col gap-0">
            <div className="mfg-step relative flex gap-[1.5rem] pb-[2rem]">
              <div className="mfg-step-num w-[50px] h-[50px] flex-shrink-0 rounded-full bg-forest text-lime flex items-center justify-center font-[DM Mono] font-medium text-[0.9rem] relative z-10">01</div>
              <div className="mfg-step-content">
                <div className="mfg-step-title font-[Playfair Display] text-[1.1rem] font-semibold text-forest mb-1">Sustainable Raw Material Sourcing</div>
                <p className="mfg-step-desc text-[0.9rem] leading-[1.6] text-[#666]">We source FSC-certified kraft paper, recycled paper pulp, and food-grade coated boards from verified suppliers committed to sustainable forestry.</p>
              </div>
              <span className="mfg-step-line absolute left-[24px] top-[52px] bottom-0 w-[2px] bg-[linear-gradient(to_bottom,rgba(106,173,110,1),transparent)]" />
            </div>
            <div className="mfg-step relative flex gap-[1.5rem] pb-[2rem]">
              <div className="mfg-step-num w-[50px] h-[50px] flex-shrink-0 rounded-full bg-forest text-lime flex items-center justify-center font-[DM Mono] font-medium text-[0.9rem] relative z-10">02</div>
              <div className="mfg-step-content">
                <div className="mfg-step-title font-[Playfair Display] text-[1.1rem] font-semibold text-forest mb-1">Custom Design & Pre-Press</div>
                <p className="mfg-step-desc text-[0.9rem] leading-[1.6] text-[#666]">Our in-house design team prepares artwork for offset, flexo, and digital printing. Every design is reviewed for brand accuracy before production.</p>
              </div>
              <span className="mfg-step-line absolute left-[24px] top-[52px] bottom-0 w-[2px] bg-[linear-gradient(to_bottom,rgba(106,173,110,1),transparent)]" />
            </div>
            <div className="mfg-step relative flex gap-[1.5rem] pb-[2rem]">
              <div className="mfg-step-num w-[50px] h-[50px] flex-shrink-0 rounded-full bg-forest text-lime flex items-center justify-center font-[DM Mono] font-medium text-[0.9rem] relative z-10">03</div>
              <div className="mfg-step-content">
                <div className="mfg-step-title font-[Playfair Display] text-[1.1rem] font-semibold text-forest mb-1">High-Volume Manufacturing</div>
                <p className="mfg-step-desc text-[0.9rem] leading-[1.6] text-[#666]">State-of-the-art machinery for cutting, creasing, gluing, and forming ensures dimensional accuracy and high throughput for bulk orders.</p>
              </div>
              <span className="mfg-step-line absolute left-[24px] top-[52px] bottom-0 w-[2px] bg-[linear-gradient(to_bottom,rgba(106,173,110,1),transparent)]" />
            </div>
            <div className="mfg-step relative flex gap-[1.5rem] pb-[2rem]">
              <div className="mfg-step-num w-[50px] h-[50px] flex-shrink-0 rounded-full bg-forest text-lime flex items-center justify-center font-[DM Mono] font-medium text-[0.9rem] relative z-10">04</div>
              <div className="mfg-step-content">
                <div className="mfg-step-title font-[Playfair Display] text-[1.1rem] font-semibold text-forest mb-1">Quality Control & Inspection</div>
                <p className="mfg-step-desc text-[0.9rem] leading-[1.6] text-[#666]">Multi-stage QC checks including print quality, structural integrity, and food-grade compliance ensure every batch meets specification.</p>
              </div>
              <span className="mfg-step-line absolute left-[24px] top-[52px] bottom-0 w-[2px] bg-[linear-gradient(to_bottom,rgba(106,173,110,1),transparent)]" />
            </div>
            <div className="mfg-step relative flex gap-[1.5rem] pb-[2rem]">
              <div className="mfg-step-num w-[50px] h-[50px] flex-shrink-0 rounded-full bg-forest text-lime flex items-center justify-center font-[DM Mono] font-medium text-[0.9rem] relative z-10">05</div>
              <div className="mfg-step-content">
                <div className="mfg-step-title font-[Playfair Display] text-[1.1rem] font-semibold text-forest mb-1">Delivery Across Delhi NCR & Beyond</div>
                <p className="mfg-step-desc text-[0.9rem] leading-[1.6] text-[#666]">Reliable logistics ensure on-time delivery to Noida, Greater Noida, Gurgaon, Delhi, and surrounding regions — with dedicated account support.</p>
              </div>
            </div>
          </div>

          <div className="mfg-visual reveal grid gap-4 grid-cols-1 min-[901px]:grid-cols-2">
            <div className="mfg-stat-card rounded-[12px] border-[1.5px] border-forest bg-forest text-white p-[1.8rem_1.5rem] flex items-center justify-between hover:-translate-y-0.75 transition-transform duration-300">
              <div>
                <div className="mfg-stat-num font-[Playfair Display] text-[2.8rem] font-black text-leaf leading-[1]">48hr</div>
                <div className="mfg-stat-label text-[0.82rem] text-white/70 mt-1 uppercase tracking-[0.05em]">Average Sample Turnaround</div>
              </div>
              <div className="text-right">
                <div className="text-[2rem]">⚡</div>
                <div className="text-[0.8rem] text-[rgba(245,240,232,0.5)] mt-1">Express Available</div>
              </div>
            </div>
            <div className="mfg-stat-card rounded-[12px] border-[1.5px] border-tan bg-white text-forest p-[1.8rem_1.5rem] hover:-translate-y-0.75 transition-transform duration-300">
              <div className="mfg-stat-num font-[Playfair Display] text-[2.8rem] font-black leading-[1]">100%</div>
              <div className="mfg-stat-label text-[0.82rem] text-[#888] mt-1 uppercase tracking-[0.05em]">Eco-Friendly Materials</div>
            </div>
            <div className="mfg-stat-card rounded-[12px] border-[1.5px] border-tan bg-white text-forest p-[1.8rem_1.5rem] hover:-translate-y-0.75 transition-transform duration-300">
              <div className="mfg-stat-num font-[Playfair Display] text-[2.8rem] font-black leading-[1]">MOQ</div>
              <div className="mfg-stat-label text-[0.82rem] text-[#888] mt-1 uppercase tracking-[0.05em]">Flexible Minimums</div>
            </div>
            <div className="mfg-stat-card rounded-[12px] border-[1.5px] border-tan bg-white text-forest p-[1.8rem_1.5rem] hover:-translate-y-0.75 transition-transform duration-300">
              <div className="mfg-stat-num font-[Playfair Display] text-[2.8rem] font-black leading-[1]">9+</div>
              <div className="mfg-stat-label text-[0.82rem] text-[#888] mt-1 uppercase tracking-[0.05em]">Product Categories</div>
            </div>
            <div className="mfg-stat-card rounded-[12px] border-[1.5px] border-tan bg-white text-forest p-[1.8rem_1.5rem] hover:-translate-y-0.75 transition-transform duration-300">
              <div className="mfg-stat-num font-[Playfair Display] text-[2.8rem] font-black leading-[1]">360°</div>
              <div className="mfg-stat-label text-[0.82rem] text-[#888] mt-1 uppercase tracking-[0.05em]">Custom Branding</div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-us bg-white py-[6rem] px-[5%]">
        <div className="why-grid grid gap-[5rem] grid-cols-1 min-[901px]:grid-cols-[1fr_1.5fr] items-center">
          <div>
            <div className="section-label flex items-center gap-2 text-sage text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3"><span className="block w-6 h-[2px] bg-leaf rounded" />Why OmniQ</div>
            <h2 className="section-title font-[Playfair Display] text-[clamp(2rem,4vw,3.2rem)] font-black text-forest leading-[1.1] mb-8">Why Businesses <span className="accent text-sage">Trust Us</span></h2>
            <div className="why-features reveal flex flex-col gap-[1.2rem]">
              <div className="why-feature flex gap-[1.2rem] items-start rounded-[12px] border border-transparent p-[1.5rem] transition duration-300 hover:bg-cream hover:border-leaf cursor-pointer">
                <div className="why-feature-icon w-[44px] h-[44px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">🌱</div>
                <div>
                  <div className="why-feature-title font-bold text-forest mb-1 text-[1rem]">100% Sustainable Products</div>
                  <p className="why-feature-desc text-[0.88rem] leading-[1.6] text-[#666]">Every product we supply is biodegradable, recyclable, or made from FSC-certified paper — because we believe packaging should never cost the planet.</p>
                </div>
              </div>
              <div className="why-feature flex gap-[1.2rem] items-start rounded-[12px] border border-transparent p-[1.5rem] transition duration-300 hover:bg-cream hover:border-leaf cursor-pointer">
                <div className="why-feature-icon w-[44px] h-[44px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">🏷️</div>
                <div>
                  <div className="why-feature-title font-bold text-forest mb-1 text-[1rem]">Competitive Bulk Pricing</div>
                  <p className="why-feature-desc text-[0.88rem] leading-[1.6] text-[#666]">We offer transparent, market-leading pricing for bulk orders — so you can scale your business without scaling costs.</p>
                </div>
              </div>
              <div className="why-feature flex gap-[1.2rem] items-start rounded-[12px] border border-transparent p-[1.5rem] transition duration-300 hover:bg-cream hover:border-leaf cursor-pointer">
                <div className="why-feature-icon w-[44px] h-[44px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">🎨</div>
                <div>
                  <div className="why-feature-title font-bold text-forest mb-1 text-[1rem]">Custom Branding & Printing</div>
                  <p className="why-feature-desc text-[0.88rem] leading-[1.6] text-[#666]">Full custom printing services — your logo, your colors, your message — on every packaging product we make.</p>
                </div>
              </div>
              <div className="why-feature flex gap-[1.2rem] items-start rounded-[12px] border border-transparent p-[1.5rem] transition duration-300 hover:bg-cream hover:border-leaf cursor-pointer">
                <div className="why-feature-icon w-[44px] h-[44px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">🚀</div>
                <div>
                  <div className="why-feature-title font-bold text-forest mb-1 text-[1rem]">Reliable On-Time Delivery</div>
                  <p className="why-feature-desc text-[0.88rem] leading-[1.6] text-[#666]">Our delivery network covers all of Delhi NCR with committed timelines and real-time coordination for every order.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="why-showcase reveal relative overflow-hidden rounded-[20px] bg-forest p-[3rem]">
            <div className="absolute top-[-1rem] left-[2rem] font-[Playfair Display] text-[12rem] text-[rgba(168,216,122,0.08)] leading-[1]">"</div>
            <h3 className="why-showcase-title relative z-10 font-[Playfair Display] text-[1.8rem] font-semibold text-white mb-4">Serving All of Delhi NCR & Beyond</h3>
            <p className="why-showcase-text relative z-10 text-[0.95rem] leading-[1.8] text-[rgba(245,240,232,0.72)] mb-8">
              From food businesses and retail brands to pharma and industrial manufacturers — OmniQ Materials is the packaging partner for businesses that demand quality, reliability, and sustainability. We bring bulk packaging capabilities to businesses of all sizes across the region.
            </p>
            <div className="region-tags relative z-10 flex flex-wrap gap-2.5">
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Noida</span>
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Greater Noida</span>
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Delhi</span>
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Gurgaon</span>
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Faridabad</span>
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Ghaziabad</span>
              <span className="region-tag rounded-full border border-[rgba(168,216,122,0.25)] bg-[rgba(168,216,122,0.12)] text-lime px-3 py-1 text-[0.82rem]">📍 Pan India</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact bg-cream py-[6rem] px-[5%]" id="contact">
        <div className="contact-grid grid gap-[4rem] grid-cols-1 min-[901px]:grid-cols-[1fr_1.2fr] items-start">
          <div className="contact-info reveal">
            <div className="section-label flex items-center gap-2 text-sage text-[0.75rem] font-medium uppercase tracking-[0.18em] mb-3"><span className="block w-6 h-[2px] bg-leaf rounded" />Reach Us</div>
            <h2 className="section-title font-[Playfair Display] text-[clamp(2rem,4vw,3.2rem)] font-black text-forest leading-[1.1] mb-4">Let's Build Something <span className="accent text-sage">Sustainable</span></h2>
            <p className="section-desc text-[1.05rem] leading-[1.8] text-[#555] max-w-[600px]">Ready to switch to eco-friendly packaging? Get in touch for bulk quotes, product samples, or custom design discussions.</p>

            <div className="contact-details mt-[2.5rem] flex flex-col gap-[1.5rem]">
              <div className="contact-item flex gap-[1.2rem] items-start">
                <div className="contact-item-icon w-[46px] h-[46px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">📞</div>
                <div>
                  <div className="contact-item-label text-[0.72rem] font-[DM Mono] uppercase tracking-[0.1em] text-sage mb-1">Phone / WhatsApp</div>
                  <div className="contact-item-value font-semibold text-forest text-[0.95rem] leading-[1.5]"><a href="tel:+919217693426" className="no-underline text-forest hover:text-sage">+91 92176 93426</a></div>
                </div>
              </div>
              <div className="contact-item flex gap-[1.2rem] items-start">
                <div className="contact-item-icon w-[46px] h-[46px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">✉️</div>
                <div>
                  <div className="contact-item-label text-[0.72rem] font-[DM Mono] uppercase tracking-[0.1em] text-sage mb-1">Email</div>
                  <div className="contact-item-value font-semibold text-forest text-[0.95rem] leading-[1.5]"><a href="mailto:info@omnmaterials.com" className="no-underline text-forest hover:text-sage">info@omnmaterials.com</a></div>
                </div>
              </div>
              <div className="contact-item flex gap-[1.2rem] items-start">
                <div className="contact-item-icon w-[46px] h-[46px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">🏢</div>
                <div>
                  <div className="contact-item-label text-[0.72rem] font-[DM Mono] uppercase tracking-[0.1em] text-sage mb-1">Head Office</div>
                  <div className="contact-item-value font-semibold text-forest text-[0.95rem] leading-[1.5]">Office No. 1583, 15th Floor,<br />Gaur City Office Spaces,<br />Greater Noida, UP – 201318</div>
                </div>
              </div>
              <div className="contact-item flex gap-[1.2rem] items-start">
                <div className="contact-item-icon w-[46px] h-[46px] flex items-center justify-center rounded-[10px] bg-forest text-[1.2rem]">🕑</div>
                <div>
                  <div className="contact-item-label text-[0.72rem] font-[DM Mono] uppercase tracking-[0.1em] text-sage mb-1">Business Hours</div>
                  <div className="contact-item-value font-semibold text-forest text-[0.95rem] leading-[1.5]">Mon–Sat: 9:30 AM – 6:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper reveal rounded-[16px] border border-parchment bg-white p-[2.5rem] shadow-[0_4px_30px_rgba(26,58,42,0.06)]">
            <div className="form-title font-[Playfair Display] text-[1.5rem] font-semibold text-forest mb-1">Request a Quote</div>
            <p className="form-subtitle text-[0.88rem] text-[#888] mb-[1.8rem]">Tell us about your packaging needs and we'll get back within 24 hours.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-row grid gap-4 grid-cols-1 min-[901px]:grid-cols-2 mb-4">
                <div className="form-group flex flex-col gap-1 mb-4">
                  <label className="text-[0.8rem] font-semibold text-forest uppercase tracking-[0.06em]">Your Name</label>
                  <input name="name" type="text" placeholder="Full Name" className="rounded-[8px] border border-parchment bg-white px-4 py-3 text-[0.92rem] text-charcoal outline-none transition duration-200 focus:border-leaf" required />
                </div>
                <div className="form-group flex flex-col gap-1 mb-4">
                  <label className="text-[0.8rem] font-semibold text-forest uppercase tracking-[0.06em]">Business Name</label>
                  <input name="business" type="text" placeholder="Company / Brand" className="rounded-[8px] border border-parchment bg-white px-4 py-3 text-[0.92rem] text-charcoal outline-none transition duration-200 focus:border-leaf" required />
                </div>
              </div>

              <div className="form-row grid gap-4 grid-cols-1 min-[901px]:grid-cols-2 mb-4">
                <div className="form-group flex flex-col gap-1 mb-4">
                  <label className="text-[0.8rem] font-semibold text-forest uppercase tracking-[0.06em]">Phone</label>
                  <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="rounded-[8px] border border-parchment bg-white px-4 py-3 text-[0.92rem] text-charcoal outline-none transition duration-200 focus:border-leaf" required />
                </div>
                <div className="form-group flex flex-col gap-1 mb-4">
                  <label className="text-[0.8rem] font-semibold text-forest uppercase tracking-[0.06em]">Email</label>
                  <input name="email" type="email" placeholder="you@company.com" className="rounded-[8px] border border-parchment bg-white px-4 py-3 text-[0.92rem] text-charcoal outline-none transition duration-200 focus:border-leaf" required />
                </div>
              </div>

              <div className="form-group flex flex-col gap-1 mb-4">
                <label className="text-[0.8rem] font-semibold text-forest uppercase tracking-[0.06em]">Product Interest</label>
                <select name="productInterest" className="rounded-[8px] border border-parchment bg-white px-4 py-3 text-[0.92rem] text-charcoal outline-none transition duration-200 focus:border-leaf" required>
                  <option value="">Select Product Category</option>
                  <option>Kraft Paper Bags</option>
                  <option>Paper Cups</option>
                  <option>Paper Tubs</option>
                  <option>Paper Bowls</option>
                  <option>Paper Straws</option>
                  <option>Mono Cartons</option>
                  <option>Corrugated Boxes</option>
                  <option>CAPA Board Boxes</option>
                  <option>Industrial Paper Solutions</option>
                  <option>Multiple Products</option>
                </select>
              </div>

              <div className="form-group flex flex-col gap-1 mb-4">
                <label className="text-[0.8rem] font-semibold text-forest uppercase tracking-[0.06em]">Message / Requirements</label>
                <textarea name="message" rows={4} placeholder="Tell us about quantity, size, custom printing needs, or any other specifications..." className="rounded-[8px] border border-parchment bg-white px-4 py-3 text-[0.92rem] text-charcoal outline-none transition duration-200 focus:border-leaf resize-none" required />
              </div>

              <button type="submit" className="form-submit w-full bg-forest text-lime border-none rounded-[8px] px-4 py-3 font-[DM Sans] text-[1rem] font-bold tracking-[0.05em] transition duration-300 hover:bg-moss hover:-translate-y-0.5 flex items-center justify-center gap-2">
                {status === 'sending' ? 'Sending...' : 'Send Enquiry →'}
              </button>
              {message ? (
                <p className={`mt-4 text-sm ${status === 'success' ? 'text-forest' : 'text-red-600'}`}>{message}</p>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal px-[5%] pt-[4rem] pb-[2rem] text-[rgba(245,240,232,0.6)]">
        <div className="footer-grid grid gap-[4rem] grid-cols-1 min-[901px]:grid-cols-[1.8fr_1fr_1fr] pb-[3rem] mb-[3rem] border-b border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="footer-brand-name font-[Playfair Display] text-[1.6rem] font-black text-white mb-1">Omni<span className="text-lime">Q</span> Materials</div>
            <div className="footer-tagline font-[DM Mono] text-[0.75rem] text-accent uppercase tracking-[0.12em] mb-4">One Source | Infinite Solutions</div>
            <p className="footer-desc text-[0.88rem] leading-[1.7] mb-6">Trusted supplier of sustainable and eco-friendly packaging solutions across Delhi NCR and beyond. Helping businesses package better — for people and the planet.</p>
            <div className="certifications flex flex-wrap gap-2.5">
              <span className="cert-badge bg-[rgba(168,216,122,0.15)] border border-[rgba(106,173,110,0.4)] text-forest rounded px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em]">🌿 Eco-Certified</span>
              <span className="cert-badge bg-[rgba(168,216,122,0.15)] border border-[rgba(106,173,110,0.4)] text-forest rounded px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em]">♻️ Biodegradable</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title text-white text-[0.9rem] font-bold uppercase tracking-[0.08em] mb-3">Products</div>
            <ul className="footer-links flex flex-col gap-2.5 list-none">
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Kraft Paper Bags</a></li>
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Paper Cups & Tubs</a></li>
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Paper Bowls & Straws</a></li>
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Mono Cartons</a></li>
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Corrugated Boxes</a></li>
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">CAPA Board Boxes</a></li>
              <li><a href="#products" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Industrial Solutions</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title text-white text-[0.9rem] font-bold uppercase tracking-[0.08em] mb-3">Company</div>
            <ul className="footer-links flex flex-col gap-2.5 list-none">
              <li><a href="#about" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">About OmniQ</a></li>
              <li><a href="#mission" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Mission & Vision</a></li>
              <li><a href="#manufacturing" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Manufacturing</a></li>
              <li><a href="#contact" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">Contact Us</a></li>
              <li><a href="tel:+919217693426" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">+91 92176 93426</a></li>
              <li><a href="mailto:info@omnmaterials.com" className="text-[rgba(245,240,232,0.55)] no-underline text-[0.88rem] transition-colors duration-200 hover:text-lime">info@omnmaterials.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex flex-wrap justify-between items-center gap-4 text-[0.82rem]">
          <span>© 2025 OmniQ Materials. All rights reserved. | Greater Noida, UP – 201318</span>
          <div className="footer-eco flex items-center gap-2 text-lime text-[0.8rem] font-semibold">🌱 Committed to a Greener Earth</div>
        </div>
      </footer>
    </>
  );
}
