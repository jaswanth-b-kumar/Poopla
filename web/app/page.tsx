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
  const mockUser = { firstName: "Aanya" };
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
        <div className="auth-corner" aria-label="Authentication">
          {mockUser ? (
            <button type="button" className="hero-btn hero-btn-danger auth-btn">
              Logout
            </button>
          ) : (
            <div className="auth-actions">
              <button type="button" className="hero-btn hero-btn-secondary auth-btn">
                Google Sign-in
              </button>
              <button type="button" className="hero-btn hero-btn-primary auth-btn">
                Register
              </button>
            </div>
          )}
        </div>
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

        <div className="hero-stack">
          {mockUser ? (
            <p className="hero-greeting" aria-label="Signed in user">
              Hi, {mockUser.firstName}
            </p>
          ) : null}

          <div className="hero-columns">
          <section
            className="hero-card hero-card-parallax"
            aria-labelledby="hero-title"
            style={{ transform: `translate3d(0, ${cardShift}px, 0)` }}
          >
            <p className="hero-kicker">Responsible AI infant GI tract screening</p>
            <h1 id="hero-title" className="hero-title">
              Poopla
            </h1>
            <p className="hero-copy">
              AI assisted stool image screening that helps parents/ guardians and clinician, triage GI concerns timely, with transparency and safety cues
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
                This is a screening tool - not a diagnosis . If child looks unwell please consult doctor to seek medical care.
              </p>
              <p>
                Data minimization: upload stool images only. Avoid faces,
                identifiable backgrounds, and names.
              </p>
            </div>
          </section>

            <section className="home-mini" aria-label="How it works">
              <div className="home-mini-head">
                <p className="hero-kicker">How It Works</p>
                <p className="home-mini-subcopy">Choose the path that fits your needs.</p>
              </div>
              <div
                className="benefit-grid"
                style={
                  {
                    "--benefit-shift": `${reduceMotion ? 0 : Math.min(scrollY * 0.05, 18)}px`
                  } as React.CSSProperties
                }
              >
                <article className="benefit-card">
                  <div className="benefit-top">
                    <span className="benefit-pill">Fast</span>
                    <h3>Quick Screening</h3>
                    <button type="button" className="benefit-cta">
                      Start One-Time
                    </button>
                  </div>
                  <ul>
                    <li>Single image</li>
                    <li>Confidence score + Explaination</li>
                    <li>No required sign-in</li>
                  </ul>
                </article>
                <article className="benefit-card">
                  <div className="benefit-top">
                    <span className="benefit-pill">Dashboard</span>
                    <h3>Signed-In Benefits</h3>
                    <button type="button" className="benefit-cta">
                      Start Checking
                    </button>
                  </div>
                  <ul>
                    <li>Dashboard of all checks</li>
                    <li>Continuity across sessions</li>
                    <li>Clinician review for flagged outputs</li>
                  </ul>
                </article>
                <article className="benefit-card">
                  <div className="benefit-top">
                    <span className="benefit-pill">Privacy</span>
                    <h3>Opt-Out Anytime</h3>
                    <button type="button" className="benefit-cta">
                      Learn About Opt-Out
                    </button>
                  </div>
                  <ul>
                    <li>One-time screening, no follow-up</li>
                    <li>Opt out even if signed in</li>
                    <li>Data minimization by default</li>
                  </ul>
                </article>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
