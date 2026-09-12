import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Clock3, Dumbbell, Facebook, Flame, Instagram, MapPin, Menu, MessageCircle, MoveUpRight, Phone, Play, Quote, ShieldCheck, Star, Users, X } from 'lucide-react';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const whatsappNumber = '94812491033';
const mapsUrl = 'https://maps.app.goo.gl/YQjrnaAfk2zUi8D46';
const facebookUrl = 'https://web.facebook.com/metrofitnesslk/?_rdc=1&_rdr';

function whatsappUrl(message = 'Hi Metro Fitness, I would like to enquire about membership.') {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${light ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" data-testid="link-logo">
      <span className={`relative grid h-9 w-9 place-items-center rounded-full border-2 ${light ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]' : 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'}`}>
        <span className="font-display text-xl font-bold leading-none">M</span>
        <span className={`absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full ${light ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--primary))]'}`} />
      </span>
      <span className={`font-display text-[22px] font-bold uppercase leading-none tracking-tight ${light ? 'text-[hsl(var(--card))]' : 'text-[hsl(var(--foreground))]'}`}>
        Metro<span className={light ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}>Fitness</span>
      </span>
    </a>
  );
}

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const links = [
    ['The gym', '#the-gym'],
    ['Membership', '#membership'],
    ['Gallery', '#gallery'],
    ['Find us', '#find-us'],
  ];
  return (
    <header className="absolute left-0 right-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-10 lg:py-7">
        <Logo light />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a href={href} key={href} className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--card)/.8)] transition-colors hover:text-[hsl(var(--accent))]" data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
          ))}
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="group flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--foreground))] transition-transform hover:-translate-y-0.5" data-testid="link-nav-enquire">
            Enquire <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--card)/.35)] text-[hsl(var(--card))] lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-4 rounded-2xl border border-[hsl(var(--card)/.14)] bg-[hsl(var(--secondary)/.97)] p-4 shadow-xl lg:hidden">
          {links.map(([label, href]) => (
            <a href={href} onClick={() => setMenuOpen(false)} key={href} className="block border-b border-[hsl(var(--card)/.1)] px-3 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[hsl(var(--card))]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
          ))}
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-4 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[hsl(var(--foreground))]" data-testid="link-mobile-enquire">Start a conversation <MessageCircle className="h-4 w-4" /></a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[720px] overflow-hidden bg-[hsl(var(--secondary))] lg:min-h-[800px]">
      <div className="absolute inset-0 bg-[url('/images/hero-training.jpg')] bg-cover bg-[center_35%] opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--secondary)/.96)] via-[hsl(var(--secondary)/.62)] to-[hsl(var(--secondary)/.18)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary)/.92)] via-transparent to-[hsl(var(--secondary)/.32)]" />
      <div className="relative mx-auto flex min-h-[720px] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-32 lg:min-h-[800px] lg:px-10 lg:pb-20">
        <div className="max-w-3xl reveal">
          <Eyebrow light>Training home · Kandy</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(4.5rem,12vw,10.5rem)] font-bold uppercase leading-[.83] tracking-[-.045em] text-[hsl(var(--card))]">
            Find your<br /><span className="text-[hsl(var(--accent))]">strong.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[hsl(var(--card)/.78)] lg:text-lg">
            A serious, welcoming place to train in the Kandy area. Show up as you are. Leave a little stronger.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl('Hi Metro Fitness, I would like to visit the gym and learn about membership.')} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--card))] transition-all hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]" data-testid="link-hero-whatsapp">
              Talk to us on WhatsApp <MessageCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#the-gym" className="flex items-center justify-center gap-3 rounded-full border border-[hsl(var(--card)/.45)] px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-hero-tour">
              Explore Metro <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-[hsl(var(--card)/.2)] pt-5 text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--card)/.6)] sm:flex-row lg:mt-24">
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[hsl(var(--accent))]" /> Open daily · 5:00 AM — 9:30 PM</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[hsl(var(--accent))]" /> Barigama–Halloluwa Road</span>
          <a href="tel:+94812491033" className="flex items-center gap-2 hover:text-[hsl(var(--accent))]" data-testid="link-hero-phone"><Phone className="h-4 w-4 text-[hsl(var(--accent))]" /> +94 812 491 033</a>
        </div>
      </div>
      <div className="vertical-label absolute bottom-20 right-5 hidden text-[10px] uppercase tracking-[.28em] text-[hsl(var(--card)/.45)] lg:block">Metro Fitness / 01</div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden bg-[hsl(var(--primary))] py-3.5 text-[hsl(var(--card))]">
      <div className="ticker-track flex w-max">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center">
            {['Move better', 'Train together', 'Feel at home', 'Kandy, Sri Lanka'].map((item) => (
              <span key={`${group}-${item}`} className="mx-7 flex items-center gap-7 whitespace-nowrap font-display text-xl font-semibold uppercase tracking-[.08em] sm:text-2xl">
                {item}<span className="text-[hsl(var(--accent))]">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TheGym() {
  return (
    <section id="the-gym" className="bg-[hsl(var(--background))] px-5 py-20 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.4fr] lg:gap-24">
          <div>
            <Eyebrow>The Metro difference</Eyebrow>
            <h2 className="mt-5 font-display text-6xl font-bold uppercase leading-[.88] tracking-[-.035em] text-[hsl(var(--secondary))] sm:text-8xl">More than<br /><span className="text-[hsl(var(--primary))]">a workout.</span></h2>
          </div>
          <div className="lg:pt-12">
            <p className="max-w-2xl text-2xl font-medium leading-tight text-[hsl(var(--secondary))] sm:text-3xl">A training floor with enough energy to pull you in, and enough space to make it your own.</p>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">Metro Fitness is built for the way people actually train. Whether you are starting from scratch, getting back into rhythm, or chasing a stronger version of your best, you will find the equipment, hours and atmosphere to keep going.</p>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))] transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-gym-maps">See the gym on Google Maps <MoveUpRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr] lg:mt-24">
          <div className="image-zoom group relative min-h-[330px] overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] md:min-h-[430px]">
            <img src="/images/strength-floor.jpg" alt="Strength training floor at Metro Fitness" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary)/.75)] to-transparent" />
            <span className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[.18em] text-[hsl(var(--card))]">A floor that works hard</span>
          </div>
          <div className="flex min-h-[250px] flex-col justify-between rounded-2xl bg-[hsl(var(--accent))] p-6 sm:p-8">
            <Dumbbell className="h-8 w-8 text-[hsl(var(--secondary))]" />
            <div><p className="font-display text-5xl font-bold uppercase leading-[.9] text-[hsl(var(--secondary))]">Open<br />every day.</p><p className="mt-4 text-sm leading-6 text-[hsl(var(--secondary)/.75)]">Your schedule is personal. Your access should be too.</p></div>
          </div>
          <div className="flex min-h-[250px] flex-col justify-between rounded-2xl bg-[hsl(var(--secondary))] p-6 text-[hsl(var(--card))] sm:p-8">
            <Users className="h-8 w-8 text-[hsl(var(--accent))]" />
            <div><p className="font-display text-5xl font-bold uppercase leading-[.9]">Come as<br />you are.</p><p className="mt-4 text-sm leading-6 text-[hsl(var(--card)/.62)]">No judgement. Just good people, good equipment and a reason to return.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const packages = [
  { name: 'Starter', note: 'A clear first step', description: 'Everything you need to establish a consistent training rhythm, with space to learn the floor at your pace.', icon: Flame, featured: false },
  { name: 'Performance', note: 'For the committed', description: 'Make the gym part of your week with full access to the training floor and a plan that keeps you progressing.', icon: ArrowUpRight, featured: true },
  { name: 'Personal Training', note: 'One-to-one focus', description: 'Get closer guidance around your goals with focused support and a session built around you.', icon: ShieldCheck, featured: false },
];

function Membership() {
  return (
    <section id="membership" className="bg-[hsl(var(--secondary))] px-5 py-20 text-[hsl(var(--card))] lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><Eyebrow light>Choose your starting point</Eyebrow><h2 className="mt-5 max-w-2xl font-display text-6xl font-bold uppercase leading-[.88] tracking-[-.035em] sm:text-8xl">A plan for<br /><span className="text-[hsl(var(--accent))]">your pace.</span></h2></div>
          <p className="max-w-xs text-sm leading-6 text-[hsl(var(--card)/.62)] lg:pb-2">Not sure which fits? Send us a WhatsApp and we will help you find the right place to begin.</p>
        </div>
        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
          {packages.map(({ name, note, description, icon: Icon, featured }, index) => (
            <article key={name} className={`hover-lift relative flex min-h-[370px] flex-col rounded-2xl border p-6 sm:p-8 ${featured ? 'border-[hsl(var(--accent))] bg-[hsl(var(--primary))]' : 'border-[hsl(var(--card)/.14)] bg-[hsl(var(--card)/.04)]'}`} data-testid={`card-package-${index}`}>
              {featured && <span className="absolute right-6 top-6 rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[hsl(var(--foreground))]">Most asked about</span>}
              <Icon className={`h-8 w-8 ${featured ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--accent))]'}`} />
              <div className="mt-auto"><p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[hsl(var(--card)/.58)]">{note}</p><h3 className="mt-2 font-display text-5xl font-bold uppercase leading-none">{name}</h3><p className="mt-5 max-w-sm text-sm leading-6 text-[hsl(var(--card)/.67)]">{description}</p><a href={whatsappUrl(`Hi Metro Fitness, I am interested in the ${name} option. Please share the details.`)} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[hsl(var(--accent))] hover:text-[hsl(var(--card))]" data-testid={`link-package-enquire-${index}`}>Ask about {name} <ChevronRight className="h-4 w-4" /></a></div>
            </article>
          ))}
        </div>
        <div className="mt-7 flex flex-col items-start justify-between gap-5 border-t border-[hsl(var(--card)/.14)] pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[hsl(var(--card)/.55)]">Membership details are shared directly by our team.</p>
          <a href={whatsappUrl('Hi Metro Fitness, I would like to ask about membership options.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--card))] px-5 py-3 text-[11px] font-bold uppercase tracking-[.15em] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--accent))]" data-testid="link-membership-whatsapp">Ask a question <MessageCircle className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

function TrainingBlock() {
  return (
    <section className="overflow-hidden bg-[hsl(var(--accent))] px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="relative min-h-[390px] overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] sm:min-h-[500px]">
          <img src="/images/training-detail.jpg" alt="Close-up of barbell training at Metro Fitness" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="font-display text-4xl font-bold uppercase leading-none text-[hsl(var(--card))]">Built for<br />the work.</span><span className="text-[10px] uppercase tracking-[.18em] text-[hsl(var(--card)/.7)]">02 / 03</span></div>
        </div>
        <div>
          <Eyebrow>How it feels here</Eyebrow>
          <h2 className="mt-5 font-display text-6xl font-bold uppercase leading-[.88] tracking-[-.035em] text-[hsl(var(--secondary))] sm:text-8xl">Progress is<br /><span className="text-[hsl(var(--primary))]">personal.</span></h2>
          <div className="mt-8 space-y-6 text-sm leading-7 text-[hsl(var(--secondary)/.72)]">
            <p>There is no single Metro member. There are early risers, after-work regulars, first-timers and people who have been lifting for years.</p>
            <p>The common thread is simple: a good place to train makes it easier to keep showing up. We keep the atmosphere focused, friendly and straightforward.</p>
          </div>
          <a href={whatsappUrl('Hi Metro Fitness, I would like to ask about getting started.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--secondary))] px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--card))] transition-colors hover:bg-[hsl(var(--primary))]" data-testid="link-training-start">Start a conversation <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-[hsl(var(--background))] px-5 py-20 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between gap-6"><div><Eyebrow>Inside Metro</Eyebrow><h2 className="mt-5 font-display text-6xl font-bold uppercase leading-[.88] tracking-[-.035em] text-[hsl(var(--secondary))] sm:text-8xl">The floor<br /><span className="text-[hsl(var(--primary))]">is yours.</span></h2></div><div className="hidden text-right sm:block"><p className="text-xs uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">Barigama / Kandy</p><a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--primary))]" data-testid="link-gallery-maps">Open directions <MoveUpRight className="h-3.5 w-3.5" /></a></div></div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-[1.15fr_.85fr_.85fr] lg:grid-rows-2">
          <div className="image-zoom relative min-h-[340px] overflow-hidden rounded-2xl sm:row-span-2 lg:min-h-[570px]"><img src="/images/community.jpg" alt="Metro Fitness members training together" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary)/.75)] to-transparent" /><span className="absolute bottom-5 left-5 font-display text-3xl font-bold uppercase text-[hsl(var(--card))]">Train together</span></div>
          <div className="image-zoom relative min-h-[220px] overflow-hidden rounded-2xl"><img src="/images/hero-training.jpg" alt="Athlete training at Metro Fitness" className="absolute inset-0 h-full w-full object-cover object-[center_45%]" /><div className="absolute inset-0 bg-[hsl(var(--secondary)/.15)]" /><span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[.18em] text-[hsl(var(--card))]">Find your strong</span></div>
          <div className="flex min-h-[220px] flex-col justify-between rounded-2xl bg-[hsl(var(--primary))] p-6 text-[hsl(var(--card))]"><Play className="h-7 w-7 text-[hsl(var(--accent))]" /><div><p className="font-display text-4xl font-bold uppercase leading-none">Your<br />next set.</p><p className="mt-3 text-sm text-[hsl(var(--card)/.66)]">That is the only one that matters right now.</p></div></div>
          <div className="image-zoom relative min-h-[220px] overflow-hidden rounded-2xl"><img src="/images/training-detail.jpg" alt="Training detail at Metro Fitness" className="absolute inset-0 h-full w-full object-cover object-[center_60%]" /><span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[.18em] text-[hsl(var(--card))]">Make it count</span></div>
          <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"><Dumbbell className="h-7 w-7 text-[hsl(var(--primary))]" /><div><p className="font-display text-4xl font-bold uppercase leading-none text-[hsl(var(--secondary))]">Ready<br />when you are.</p><a href={whatsappUrl('Hi Metro Fitness, I would like to visit the gym.')} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]" data-testid="link-gallery-enquire">Plan a visit <ArrowUpRight className="h-3.5 w-3.5" /></a></div></div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-[hsl(var(--secondary))] px-5 py-20 text-[hsl(var(--card))] lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
        <div><Eyebrow light>Real people. Real visits.</Eyebrow><div className="mt-8 flex items-end gap-4"><span className="font-display text-8xl font-bold leading-none text-[hsl(var(--accent))]">4.9</span><div className="pb-2"><div className="flex gap-1 text-[hsl(var(--accent))]">{[0,1,2,3,4].map((item) => <Star key={item} className="h-5 w-5 fill-current" />)}</div><p className="mt-2 text-xs uppercase tracking-[.15em] text-[hsl(var(--card)/.55)]">18 Google reviews</p></div></div><p className="mt-8 max-w-xs text-sm leading-7 text-[hsl(var(--card)/.66)]">See what members are saying, then come see the space for yourself.</p><a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--card)/.26)] px-5 py-3 text-[11px] font-bold uppercase tracking-[.15em] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-google-reviews">Read Google Reviews <MoveUpRight className="h-4 w-4" /></a></div>
        <div className="border-t border-[hsl(var(--card)/.16)] pt-8 lg:pt-3"><Quote className="h-8 w-8 text-[hsl(var(--primary))]" /><p className="mt-7 max-w-2xl font-display text-4xl font-semibold uppercase leading-[.98] sm:text-6xl">The best review is the one you leave after your own first session.</p><div className="mt-9 flex items-center gap-4 border-t border-[hsl(var(--card)/.16)] pt-5"><div className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary))] font-display text-xl font-bold">M</div><div><p className="text-sm font-semibold">Your next chapter</p><p className="text-xs text-[hsl(var(--card)/.5)]">Starts on the floor</p></div></div></div>
      </div>
    </section>
  );
}

function FindUs() {
  return (
    <section id="find-us" className="bg-[hsl(var(--background))] px-5 py-20 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid overflow-hidden rounded-2xl bg-[hsl(var(--accent))] lg:grid-cols-[1fr_1fr]">
          <div className="p-7 sm:p-12 lg:p-16"><Eyebrow>Come find us</Eyebrow><h2 className="mt-5 font-display text-6xl font-bold uppercase leading-[.88] tracking-[-.035em] text-[hsl(var(--secondary))] sm:text-8xl">Your new<br /><span className="text-[hsl(var(--primary))]">training home.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--secondary)/.72)]">We are on Barigama–Halloluwa Road, Sri Lanka. Easy to find, open every day, ready when you are.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--secondary))] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--card))] hover:bg-[hsl(var(--primary))]" data-testid="link-find-maps"><MapPin className="h-4 w-4" /> Get directions</a><a href="tel:+94812491033" className="inline-flex items-center justify-center gap-2 rounded-full border border-[hsl(var(--secondary)/.35)] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--secondary))] hover:border-[hsl(var(--secondary))]" data-testid="link-find-phone"><Phone className="h-4 w-4" /> Call the gym</a></div></div>
          <div className="group relative min-h-[350px] overflow-hidden bg-[hsl(var(--secondary))] lg:min-h-[500px]" data-testid="map-visual">
            <iframe
              title="Metro Fitness location on Google Maps"
              src="https://www.google.com/maps?q=Metro%20fitness%2C%20Barigama-Halloluwa%20Rd%2C%20Sri%20Lanka&z=15&output=embed"
              className="absolute inset-0 h-full w-full border-0 opacity-75 grayscale-[.35] contrast-[1.08] transition duration-700 group-hover:opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(var(--secondary)/.1)] via-transparent to-[hsl(var(--secondary)/.65)]" />
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--secondary)/.9)] px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--card))] transition-colors hover:bg-[hsl(var(--primary))]" data-testid="link-map-visual">
              Open in Google Maps <MoveUpRight className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
            </a>
            <div className="pointer-events-none absolute bottom-6 left-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[hsl(var(--accent))]">Metro Fitness</p><p className="mt-1 text-sm text-[hsl(var(--card)/.82)]">Barigama–Halloluwa Rd, Sri Lanka</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--secondary))] px-5 pb-8 pt-16 text-[hsl(var(--card))] lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-[hsl(var(--card)/.16)] pb-14 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div><Logo light /><p className="mt-7 max-w-xs text-sm leading-6 text-[hsl(var(--card)/.57)]">A serious, welcoming training home for the Kandy area.</p><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-[11px] font-bold uppercase tracking-[.15em] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]" data-testid="link-footer-whatsapp">WhatsApp us <MessageCircle className="h-4 w-4" /></a></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[hsl(var(--accent))]">Navigate</p><div className="mt-5 flex flex-col gap-3 text-sm text-[hsl(var(--card)/.68)]"><a href="#the-gym" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-gym">The gym</a><a href="#membership" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-membership">Membership</a><a href="#gallery" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-gallery">Gallery</a><a href="#find-us" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-find-us">Find us</a></div></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[hsl(var(--accent))]">Contact</p><div className="mt-5 flex flex-col gap-4 text-sm text-[hsl(var(--card)/.68)]"><a href="tel:+94812491033" className="flex items-center gap-2 hover:text-[hsl(var(--accent))]" data-testid="link-footer-phone"><Phone className="h-4 w-4" /> +94 812 491 033</a><span className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0" /> Every day · 5:00 AM–9:30 PM</span><a href={facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[hsl(var(--accent))]" data-testid="link-facebook"><Facebook className="h-4 w-4" /> Facebook</a></div></div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[.15em] text-[hsl(var(--card)/.4)] sm:flex-row"><span>© {new Date().getFullYear()} Metro Fitness</span><span>Barigama · Kandy · Sri Lanka</span></div>
      </div>
    </footer>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="grain min-h-[100dvh] overflow-x-hidden"><Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><Hero /><Ticker /><TheGym /><Membership /><TrainingBlock /><Gallery /><Reviews /><FindUs /><Footer /><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-[hsl(var(--card))] shadow-lg transition-transform hover:scale-105 sm:bottom-7 sm:right-7" data-testid="link-floating-whatsapp"><MessageCircle className="h-5 w-5" /> <span className="hidden sm:inline">WhatsApp us</span></a></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;