"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ctas = [
  { href: "/check/new", label: "Start Checking", variant: "primary" as const },
  { href: "#", label: "Clinician/Admin Portal", variant: "secondary" as const }
];

const infoCards = [
  {
    id: "quality",
    label: "Image Quality",
    detail: "Checks framing, blur, and file quality before AI screening."
  },
  {
    id: "context",
    label: "Context Questions",
    detail: "Captures infant age, feeding type, stool duration, and recent medication."
  },
  {
    id: "safety",
    label: "Safety First",
    detail: "Uncertain cases are flagged for clinician review rather than forced output."
  }
];

export default function HomePage() {
  const [activeCard, setActiveCard] = useState(infoCards[0].id);
  const [scrollY, setScrollY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  const activeDetail = useMemo(
    () => infoCards.find((card) => card.id === activeCard)?.detail ?? "",
    [activeCard]
  );

  const orbShift = reduceMotion ? 0 : Math.min(scrollY, 320);
  const cardShift = reduceMotion ? 0 : Math.min(scrollY * 0.08, 20);

  return (
    <main className="home-page">
      <section className="hero-shell hero-shell-parallax">
        <div
          className="parallax-orb orb-one"
          aria-hidden="true"
          style={{ transform: `translate3d(0, ${orbShift * -0.18}px, 0)` }}
        />
        <div
          className="parallax-orb orb-two"
          aria-hidden="true"
          style={{ transform: `translate3d(0, ${orbShift * -0.08}px, 0)` }}
        />

        <section
          className="hero-card hero-card-parallax"
          aria-labelledby="hero-title"
          style={{ transform: `translate3d(0, ${cardShift}px, 0)` }}
        >
          <p className="hero-kicker">Responsible AI Infant Screening</p>
          <h1 id="hero-title" className="hero-title">
            Poopla
          </h1>
          <p className="hero-copy">
            AI-assisted stool image screening that helps parents and clinicians
            triage infant GI concerns earlier, with transparency and safety cues.
          </p>

          <div className="hero-actions">
            {ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={`hero-btn ${cta.variant === "primary" ? "hero-btn-primary" : "hero-btn-secondary"}`}
              >
                {cta.label}
              </Link>
            ))}
          </div>

          <div className="info-tabs" role="tablist" aria-label="Poopla highlights">
            {infoCards.map((card) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={card.id === activeCard}
                className={`info-chip ${card.id === activeCard ? "info-chip-active" : ""}`}
                onClick={() => setActiveCard(card.id)}
              >
                {card.label}
              </button>
            ))}
          </div>
          <p className="info-panel">{activeDetail}</p>

          <div className="hero-notes" role="note" aria-label="Safety notice">
            <p>
              This is not a diagnosis. If your child is unwell, seek medical
              care.
            </p>
            <p>
              Data minimization: upload stool images only. Avoid faces,
              identifiable backgrounds, and names.
            </p>
          </div>
        </section>
      </section>

      <section className="home-mini" aria-label="How it works">
        <p className="hero-kicker">How It Works</p>
        <p className="home-mini-copy">
          Upload one image, answer a few context questions, and receive a
          screening output with confidence and clear next steps.
        </p>
        <Link href="/check/new" className="hero-btn hero-btn-secondary">
          Start Checking
        </Link>
      </section>
    </main>
  );
}
