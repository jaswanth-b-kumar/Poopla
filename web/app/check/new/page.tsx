"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { PatientDashboard } from "./patient-dashboard";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export default function NewCheckPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fileMeta = useMemo(() => {
    if (!selectedFile) return null;
    return `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`;
  }, [selectedFile]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const consent = formData.get("consent");

    if (!selectedFile) {
      setErrorMessage("Please upload one stool image to continue.");
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (selectedFile.size < 70 * 1024) {
      setErrorMessage("Image quality is too low. Upload a clearer image (larger than 70KB).");
      return;
    }

    if (selectedFile.size > 8 * 1024 * 1024) {
      setErrorMessage("Image is too large. Keep file size under 8MB.");
      return;
    }

    if (!consent) {
      setErrorMessage("Consent is required before running a check.");
      return;
    }

    setSuccessMessage(
      "Input received. Next step will run quality checks and model inference."
    );
  };

  return (
    <main className="flow-shell">
      <section className="intake-layout">
        <section className="flow-card" aria-labelledby="new-check-title">
          <div className="flow-head">
            <p className="hero-kicker">Patient Intake</p>
            <h1 id="new-check-title" className="flow-title">
              New Check
            </h1>
            <p className="flow-copy">
              Upload one stool image and add minimal context to support safe AI-assisted
              screening.
            </p>
          </div>

          <form className="intake-form" onSubmit={onSubmit} noValidate>
            <label className="field">
              <span>Stool image</span>
              <input
                className="field-input file-input"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => {
                  setSuccessMessage("");
                  setErrorMessage("");
                  const file = event.target.files?.[0] ?? null;
                  setSelectedFile(file);
                }}
                required
              />
              <small>Single image per session. Avoid filters, flash glare, and blur.</small>
              {fileMeta ? <small className="status-soft">Selected: {fileMeta}</small> : null}
            </label>

            <div className="field-grid">
              <label className="field">
                <span>Infant age (months)</span>
                <input
                  className="field-input"
                  type="number"
                  name="ageMonths"
                  min={0}
                  max={24}
                  required
                />
              </label>

              <label className="field">
                <span>Feeding type</span>
                <select className="field-input" name="feedingType" defaultValue="" required>
                  <option value="" disabled>
                    Select feeding type
                  </option>
                  <option value="breastmilk">Breastmilk</option>
                  <option value="formula">Formula</option>
                  <option value="mixed">Mixed feeding</option>
                  <option value="solids">Started solids</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span>How long has this stool pattern been observed?</span>
              <select className="field-input" name="duration" defaultValue="" required>
                <option value="" disabled>
                  Select duration
                </option>
                <option value="lt_24h">Less than 24 hours</option>
                <option value="one_three_days">1 to 3 days</option>
                <option value="four_seven_days">4 to 7 days</option>
                <option value="gt_week">More than 1 week</option>
              </select>
            </label>

            <label className="field">
              <span>Recent medications (optional)</span>
              <textarea
                className="field-input text-area"
                name="medications"
                maxLength={220}
                placeholder="Example: iron drops, antibiotics, probiotics"
              />
            </label>

            <label className="consent-row">
              <input type="checkbox" name="consent" />
              <span>
                I confirm consent and understand this is a screening support tool, not a
                diagnosis.
              </span>
            </label>

            {errorMessage ? (
              <p className="status error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="status success" role="status">
                {successMessage}
              </p>
            ) : null}

            <div className="flow-actions">
              <button type="submit" className="hero-btn hero-btn-primary">
                Continue to Quality Check
              </button>
              <Link href="/" className="hero-btn hero-btn-secondary">
                Back to Home
              </Link>
            </div>
          </form>

          <div className="hero-notes" role="note" aria-label="Safety and privacy note">
            <p>This is not a diagnosis. If your child is unwell, seek medical care.</p>
            <p>
              Data minimization: upload stool images only. Do not upload faces, names, or
              identifiable room details.
            </p>
          </div>
        </section>

        <PatientDashboard />
      </section>
    </main>
  );
}
