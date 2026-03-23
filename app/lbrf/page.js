"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import kingsChatWebSdk from "kingschat-web-sdk";
import "kingschat-web-sdk/dist/stylesheets/style.min.css";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const clientId = "31414fbe-48d9-4806-9acf-4ed4bf58679b";
const loginOptions = {
  scopes: ["send_chat_message"],
  clientId: clientId,
};

const baseUrl = "https://letsreadthebible.club";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [kingsChatHandle, setKingsChatHandle] = useState(null);
  const [viewAvatar, setViewAvatar] = useState(false);
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasPopupBeenShown = sessionStorage.getItem("hasPopupBeenShown");
      if (!hasPopupBeenShown) {
        setViewAvatar(false);
        sessionStorage.setItem("hasPopupBeenShown", "true");
      }
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser({
      email,
      fullName,
      kingsChatHandle,
      type: "lbrf",
      gender,
    });
  };

  async function registerUser(userData) {
    try {
      const response = await fetch(`https://lovetoons.org/php/lbrf.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (result?.error) {
        toast.error(result.message);
      } else if (result?.result) {
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("You successfully registered!");
        router.push("/fiesta");
      } else console.error(result);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  async function registerKCUser(userData) {
    try {
      const response = await fetch(`https://lovetoons.org/php/lbrf.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (result?.error) {
        toast.error(result.message);
      } else if (result?.result) {
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("You successfully registered!");
        router.push("/fiesta");
      } else console.error(result);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  function loginWithKingsChat() {
    kingsChatWebSdk
      .login(loginOptions)
      .then((authenticationTokenResponse) => {
        fetchUserProfile(authenticationTokenResponse.accessToken);
      })
      .catch((error) => console.error(error));
  }

  async function fetchUserProfile(accessToken) {
    try {
      const response = await fetch(
        "https://connect.kingsch.at/developer/api/profile",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      const { username, name, email } = data?.profile;
      await registerKCUser({
        email,
        fullName: name,
        kingsChatHandle: username,
        type: "kingschat",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        .lbrf-root {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #0c0c1a;
        }
        @media (max-width: 768px) {
          .lbrf-root { grid-template-columns: 1fr; }
          .lbrf-banner { height: 200px !important; }
        }

        /* ── OVERLAY ── */
        .lbrf-overlay {
          position: fixed; inset: 0; z-index: 99;
          background: rgba(12,12,26,0.65);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .lbrf-dialog {
          background: #fff;
          border-radius: 22px;
          padding: 2.5rem 2rem;
          max-width: 420px; width: 100%;
          text-align: center;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35);
          animation: fadeUp .3s ease;
        }
        @keyframes fadeUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .lbrf-dialog-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 2.8rem);
          color: #c8851f;
          letter-spacing: 2px;
          margin: 0 0 .6rem;
        }
        .lbrf-dialog p {
          color: #555; font-size: .95rem;
          margin: 0 0 1.75rem; line-height: 1.65;
        }
        .lbrf-dialog-actions { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; }
        .btn-ghost {
          border: 2px solid #0c0c1a; background: transparent; color: #0c0c1a;
          border-radius: 999px; padding: .6rem 1.4rem;
          font-size: .875rem; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s, color .18s;
        }
        .btn-ghost:hover { background: #0c0c1a; color: #fff; }
        .btn-upload-dialog {
          background: #0c0c1a; color: #f5c257;
          border: 2px solid #0c0c1a;
          border-radius: 999px; padding: .6rem 1.4rem;
          font-size: .875rem; font-weight: 600; cursor: pointer;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s, box-shadow .18s;
        }
        .btn-upload-dialog:hover { background: #1e1e3a; box-shadow: 0 6px 20px rgba(0,0,0,.3); }

        /* ── BANNER ── */
        .lbrf-banner {
          position: relative;
          overflow: hidden;
          height: 100vh;
        }
        .lbrf-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(12,12,26,.5) 0%, rgba(12,12,26,.1) 100%);
          pointer-events: none;
        }
        .lbrf-banner-badge {
          position: absolute; bottom: 2rem; left: 2rem;
          background: rgba(12,12,26,.78);
          border: 1px solid rgba(245,194,87,.35);
          border-radius: 12px;
          padding: .7rem 1.1rem;
          backdrop-filter: blur(4px);
        }
        .lbrf-banner-badge-title {
          font-family: 'Bebas Neue', sans-serif;
          color: #f5c257;
          font-size: 1.05rem;
          letter-spacing: 1.5px;
          margin: 0;
        }
        .lbrf-banner-badge-sub {
          color: rgba(255,255,255,.65);
          font-size: .75rem;
          font-weight: 300;
          margin: 2px 0 0;
        }

        /* ── FORM PANEL ── */
        .lbrf-panel {
          background: #f7f5f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 2rem;
          overflow-y: auto;
          position: relative;
          min-height: 100vh;
        }
        .lbrf-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #c8851f 0%, #f5c257 50%, #c8851f 100%);
        }

        .lbrf-logo { width: 84px; margin-bottom: 1.25rem; }

        .lbrf-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.7rem, 3vw, 2.2rem);
          color: #0c0c1a;
          letter-spacing: 2px;
          margin: 0 0 .2rem;
          text-align: center;
        }
        .lbrf-sub {
          color: #999;
          font-size: .82rem;
          text-align: center;
          margin: 0 0 1.75rem;
          font-weight: 300;
          letter-spacing: .02em;
        }

        /* ── CTA BUTTONS ── */
        .lbrf-ctas {
          display: flex; flex-direction: column; gap: .65rem;
          width: 100%; max-width: 360px;
          margin-bottom: 1.5rem;
        }
        .btn-bible {
          display: flex; align-items: center; justify-content: center; gap: .55rem;
          background: #1a6b2e; color: #fff;
          border-radius: 11px; padding: .8rem 1.25rem;
          font-weight: 600; font-size: .875rem;
          text-decoration: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s, transform .14s;
          box-shadow: 0 4px 16px rgba(26,107,46,.22);
        }
        .btn-bible:hover { background: #155c26; transform: translateY(-1px); }

        .btn-kingschat {
          display: flex; align-items: center; justify-content: center; gap: .55rem;
          background: #1565c0; color: #fff;
          border-radius: 11px; padding: .8rem 1.25rem;
          font-weight: 600; font-size: .875rem;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s, transform .14s;
          box-shadow: 0 4px 16px rgba(21,101,192,.22);
        }
        .btn-kingschat:hover { background: #0d47a1; transform: translateY(-1px); }

        /* ── DIVIDER ── */
        .lbrf-divider {
          display: flex; align-items: center; gap: .7rem;
          width: 100%; max-width: 360px;
          margin-bottom: 1.4rem;
          color: #bbb; font-size: .78rem;
          font-weight: 300;
        }
        .lbrf-divider::before, .lbrf-divider::after {
          content: ''; flex: 1; height: 1px; background: #e0ddd8;
        }

        /* ── FORM ── */
        .lbrf-form { width: 100%; max-width: 360px; display: flex; flex-direction: column; gap: .9rem; }

        .lbrf-field { display: flex; flex-direction: column; gap: .3rem; }
        .lbrf-label {
          font-size: .72rem; font-weight: 500;
          color: #666;
          text-transform: uppercase; letter-spacing: .07em;
          display: flex; align-items: center; gap: .4rem;
        }
        .lbrf-input-wrap {
          display: flex; align-items: center;
          background: #fff;
          border: 1.5px solid #e0ddd8;
          border-radius: 10px;
          padding: .62rem .85rem;
          gap: .5rem;
          transition: border-color .18s, box-shadow .18s;
        }
        .lbrf-input-wrap:focus-within {
          border-color: #c8851f;
          box-shadow: 0 0 0 3px rgba(200,133,31,.11);
        }
        .lbrf-input-wrap input {
          border: none; outline: none; background: transparent;
          font-size: .92rem; color: #1a1a2e; width: 100%;
          font-family: 'DM Sans', sans-serif;
        }
        .lbrf-input-wrap input::placeholder { color: #c0bdb8; }
        .lbrf-prefix { color: #bbb; font-size: .92rem; user-select: none; }
        .lbrf-icon { flex-shrink: 0; color: #ccc; }

        .btn-register {
          margin-top: .3rem;
          background: linear-gradient(135deg, #c8851f 0%, #f0b93a 100%);
          color: #1a0e00;
          border: none; border-radius: 11px;
          padding: .88rem;
          font-size: .95rem; font-weight: 700;
          cursor: pointer; letter-spacing: .04em;
          font-family: 'DM Sans', sans-serif;
          transition: opacity .18s, transform .14s, box-shadow .18s;
          box-shadow: 0 4px 18px rgba(200,133,31,.32);
        }
        .btn-register:hover {
          opacity: .93; transform: translateY(-1px);
          box-shadow: 0 8px 26px rgba(200,133,31,.38);
        }
        .btn-register:active { transform: translateY(0); }

        .lbrf-footnote {
          margin-top: 1.25rem;
          font-size: .72rem; color: #bbb;
          text-align: center; line-height: 1.65;
          max-width: 300px;
          font-weight: 300;
        }

        /* ── FLOATING SCRIPTURE BADGES ── */
        .scripture-badge {
          position: absolute;
          display: flex; align-items: center; gap: .65rem;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border-radius: 14px;
          padding: .55rem .85rem .55rem .55rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.6) inset;
          border: 1px solid rgba(255,255,255,0.7);
          min-width: 190px;
          animation: floatBadge 4s ease-in-out infinite;
          z-index: 10;
          cursor: default;
          user-select: none;
        }
        .scripture-badge:nth-child(1) { top: 2rem; right: 1.5rem; animation-delay: 0s; }
        .scripture-badge:nth-child(2) { top: 6rem; right: 1.5rem; animation-delay: 1.8s; }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .scripture-badge-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .scripture-badge-icon.faith {
          background: linear-gradient(135deg, #f0b93a 0%, #c8851f 100%);
        }
        .scripture-badge-icon.love {
          background: linear-gradient(135deg, #e05c7a 0%, #a0244e 100%);
        }
        .scripture-badge-text { display: flex; flex-direction: column; gap: 1px; }
        .scripture-badge-title {
          font-size: .82rem; font-weight: 600;
          color: #1a1a2e; line-height: 1.2;
        }
        .scripture-badge-verse {
          font-size: .72rem; color: #888;
          font-weight: 300; line-height: 1.2;
        }
      `}</style>

      <div className="lbrf-root">
        <Toaster position="top-right" />

        {/* ── WELCOME OVERLAY ── */}
        {viewAvatar && (
          <div className="lbrf-overlay">
            <div className="lbrf-dialog">
              <p className="lbrf-dialog-title">Welcome to LBRF</p>
              <p>
                Kindly take a picture of you reading the scripture and upload it
                to show your participation.
              </p>
              <div className="lbrf-dialog-actions">
                <button
                  className="btn-ghost"
                  onClick={() => setViewAvatar(false)}
                >
                  Register instead
                </button>
                <Link href="/lbrf/picture" className="btn-upload-dialog">
                  Upload my picture
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── LEFT: BANNER ── */}
        <div className="lbrf-banner">
          <Image
            src="/images/banner2.png"
            alt="LBRF banner"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="lbrf-banner-overlay" />

          {/* ── FLOATING SCRIPTURE BADGES ── */}
          <div className="scripture-badge">
            <div className="scripture-badge-icon faith">✦</div>
            <div className="scripture-badge-text">
              <span className="scripture-badge-title">Faith</span>
              <span className="scripture-badge-verse">Hebrews 11:1</span>
            </div>
          </div>
          <div className="scripture-badge" style={{ top: "6rem" }}>
            <div className="scripture-badge-icon love">♥</div>
            <div className="scripture-badge-text">
              <span className="scripture-badge-title">Love</span>
              <span className="scripture-badge-verse">John 3:16</span>
            </div>
          </div>

          <div className="lbrf-banner-badge">
            <p className="lbrf-banner-badge-title">LBRF 2026</p>
            <p className="lbrf-banner-badge-sub">
              Lovetoons Bible Reading Fiesta
            </p>
          </div>
        </div>

        {/* ── RIGHT: FORM PANEL ── */}
        <div className="lbrf-panel">
          <Image
            src="/images/logo_fiesta.png"
            alt="LBRF Logo"
            width={84}
            height={84}
            className="lbrf-logo"
          />

          <h1 className="lbrf-heading">
            Register For Lovetoons Bible Reading Fiesta
          </h1>
          <p className="lbrf-sub">Join thousands reading the Bible together</p>

          {/* Quick CTAs */}
          <div className="lbrf-ctas">
            <Link href="/lbrf/picture" className="btn-bible">
              <svg
                className="lbrf-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Upload Bible reading picture
            </Link>
            <button className="btn-kingschat" onClick={loginWithKingsChat}>
              <svg
                className="lbrf-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Register with KingsChat
            </button>
          </div>

          <div className="lbrf-divider">or register manually</div>

          {/* Manual form */}
          <form className="lbrf-form" onSubmit={handleRegister}>
            <div className="lbrf-field">
              <label className="lbrf-label">Full name</label>
              <div className="lbrf-input-wrap">
                <svg
                  className="lbrf-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="lbrf-field">
              <label className="lbrf-label">
                <Image
                  src="/images/kingschat.webp"
                  alt="KingsChat"
                  width={14}
                  height={14}
                  style={{ borderRadius: 2 }}
                />
                KingsChat username
                <span
                  style={{
                    color: "#bbb",
                    fontWeight: 300,
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  (optional)
                </span>
              </label>
              <div className="lbrf-input-wrap">
                <span className="lbrf-prefix">@</span>
                <input
                  type="text"
                  name="kingsChatHandle"
                  placeholder="your_username"
                  value={kingsChatHandle ?? ""}
                  onChange={(e) => setKingsChatHandle(e.target.value)}
                />
              </div>
            </div>

            <div className="lbrf-field">
              <label className="lbrf-label">Gender</label>
              <div className="lbrf-input-wrap">
                <svg
                  className="lbrf-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="lbrf-field">
              <label className="lbrf-label">Email address</label>
              <div className="lbrf-input-wrap">
                <svg
                  className="lbrf-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-register">
              Register Now →
            </button>
          </form>

          <p className="lbrf-footnote">
            By registering you agree to participate in the Lovetoons Bible
            Reading Fiesta.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
