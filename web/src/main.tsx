import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <div className="bg-aurora" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">P</div>
          <div>
            <p className="brand-title">Poopla</p>
            <p className="brand-sub">AI screening for infant stool patterns</p>
          </div>
        </div>
        <div className="topbar-pill">Privacy-first · No identifiers</div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Screening support, not a diagnosis</span>
            <h1>Calm clarity when you are unsure.</h1>
            <p>
              Upload a single image. We run quality checks, explain what the AI
              focused on, and escalate uncertain results for clinician review.
            </p>
            <div className="pill-row">
              <span className="pill">On-device ready</span>
              <span className="pill">Consent-first</span>
              <span className="pill">Audit-friendly</span>
            </div>
            <div className="trust-grid">
              <div className="trust-card">
                <p className="trust-label">Quality gate</p>
                <h3>We reject low-quality images</h3>
                <ul>
                  <li>Good lighting & focus</li>
                  <li>Single stool sample</li>
                  <li>No faces or identifiers</li>
                </ul>
              </div>
              <div className="trust-card">
                <p className="trust-label">Explainability</p>
                <h3>Transparent AI signals</h3>
                <p>
                  Confidence, uncertainty, and a visual focus preview are shown
                  every time.
                </p>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="upload-card">
              <div className="camera-orb">??</div>
              <h2>Upload a photo</h2>
              <p>
                Clear, well-lit, and only the sample in view. We auto-reject
                faces or identifiers.
              </p>
              <button className="primary-cta">Select image</button>
              <p className="consent">By uploading, you consent to processing.</p>
              <div className="quality-list">
                <span>? Focused</span>
                <span>? No flash glare</span>
                <span>? No PII</span>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-row">
          <div className="feature">
            <h4>Privacy-first</h4>
            <p>Images screened for identifiers before analysis.</p>
          </div>
          <div className="feature">
            <h4>Explainable output</h4>
            <p>Confidence and focus region are always visible.</p>
          </div>
          <div className="feature">
            <h4>Clinician escalation</h4>
            <p>Uncertain cases route to expert review.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-pill">Medical Disclaimer</div>
        <p>
          Poopla provides screening support only and does not replace clinician
          judgment.
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
