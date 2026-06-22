"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandWordmark } from "@/components/brand-wordmark";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen && !guideOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setGuideOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, guideOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-[#100813]/86 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(100%-2rem,1360px)] items-center justify-between gap-5 py-3">
          <Link href="/" className="flex min-w-0 shrink-0 items-center" aria-label="Lavie Home">
            <BrandWordmark />
          </Link>

          <nav className="hidden items-center gap-1.5 lg:flex">
            <Link className="nav-link" href="/#rooms">
              KhÃ¡m PhÃ¡
            </Link>
            <Link className="nav-link" href="/checking">
              Tra Cá»©u
            </Link>
            <button
              className="nav-link cursor-pointer border-none bg-transparent text-left"
              onClick={() => setGuideOpen(true)}
            >
              HÆ°á»›ng Dáº«n
            </button>
            <Link className="nav-link" href="/contacts">
              Chi NhÃ¡nh
            </Link>
            <Link className="nav-link" href="/dashboard">
              Admin
            </Link>
            <Link
              className="primary-button ml-2 min-h-11 px-5 py-2.5 text-sm"
              href="/#booking"
              style={{ textTransform: "none" }}
            >
              Äáº·t phÃ²ng ngay
            </Link>
          </nav>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 active:scale-95 lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-sidebar"
            aria-label="Má»Ÿ menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={`mobile-drawer-shell lg:hidden ${mobileOpen ? "is-open" : ""}`}>
          <button
            className="mobile-drawer-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-label="ÄÃ³ng menu"
          />
          <aside
            id="mobile-sidebar"
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Ä‘iá»u hÆ°á»›ng"
          >
            <div className="mobile-drawer-head" style={{ justifyContent: "flex-end" }}>
              <button
                className="mobile-drawer-close"
                onClick={() => setMobileOpen(false)}
                aria-label="ÄÃ³ng menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <Link className="mobile-drawer-link" href="/#rooms" onClick={() => setMobileOpen(false)}>
                KhÃ¡m PhÃ¡ PhÃ²ng
              </Link>
              <Link className="mobile-drawer-link" href="/checking" onClick={() => setMobileOpen(false)}>
                Tra Cá»©u Äáº·t PhÃ²ng
              </Link>
              <button
                className="mobile-drawer-link border-none bg-transparent text-left"
                onClick={() => {
                  setMobileOpen(false);
                  setGuideOpen(true);
                }}
              >
                HÆ°á»›ng Dáº«n Sá»­ Dá»¥ng
              </button>
              <Link className="mobile-drawer-link" href="/contacts" onClick={() => setMobileOpen(false)}>
                Há»‡ Thá»‘ng Chi NhÃ¡nh
              </Link>
              <Link className="mobile-drawer-link" href="/dashboard" onClick={() => setMobileOpen(false)}>
                Admin Dashboard
              </Link>
              <Link
                className="mobile-drawer-link is-primary justify-center"
                href="/#booking"
                onClick={() => setMobileOpen(false)}
                style={{ textTransform: "none" }}
              >
                Äáº·t phÃ²ng ngay
              </Link>
            </nav>

            <p className="mobile-drawer-note">Lavie Home self check-in 24/7</p>
          </aside>
        </div>
      </header>

      {guideOpen && (
        <div
          className="guide-modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setGuideOpen(false)}
        >
          <div
            className="guide-modal-card glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mobile-drawer-close absolute right-4 top-4"
              onClick={() => setGuideOpen(false)}
              aria-label="ÄÃ³ng hÆ°á»›ng dáº«n"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <h2 className="border-b border-white/10 pb-4 text-center text-xl font-extrabold text-pink-200">
              HÆ°á»›ng Dáº«n Sá»­ Dá»¥ng
            </h2>

            <div className="mt-6 max-h-[70vh] space-y-6 overflow-y-auto pr-1 text-sm text-white/80">
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-xs text-pink-200">
                    1
                  </span>
                  DÃ nh cho khÃ¡ch hÃ ng
                </h3>
                <ul className="list-disc space-y-1.5 pl-8 text-white/70">
                  <li>TÃ¬m kiáº¿m phÃ²ng phÃ¹ há»£p vá»›i yÃªu cáº§u cá»§a quÃ½ khÃ¡ch.</li>
                  <li>Chọn khung giờ và nhấn &quot;Xác nhận đặt phòng&quot;.</li>
                  <li>Nháº­p thÃ´ng tin ngÆ°á»i Ä‘áº·t vÃ  hoÃ n táº¥t thanh toÃ¡n.</li>
                  <li>Chá» xÃ¡c nháº­n tá»± Ä‘á»™ng hoáº·c tá»« lá»… tÃ¢n Lavie Home qua Zalo.</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-xs text-pink-200">
                    2
                  </span>
                  Há»§y Ä‘Æ¡n & hoÃ n tiá»n
                </h3>
                <ul className="list-disc space-y-1.5 pl-8 text-white/70">
                  <li>
                    QuÃ½ khÃ¡ch vui lÃ²ng gá»i Hotline{" "}
                    <a href="tel:0909123456" className="font-bold text-yellow-200 hover:underline">
                      0909.123.456
                    </a>{" "}
                    Ä‘á»ƒ yÃªu cáº§u há»§y.
                  </li>
                  <li>Hoáº·c liÃªn há»‡ tÃ i khoáº£n Zalo há»— trá»£.</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-xs text-pink-200">
                    3
                  </span>
                  Há»— trá»£ phÃ¡t sinh
                </h3>
                <ul className="list-disc space-y-1.5 pl-8 text-white/70">
                  <li>Lavie Home sáºµn sÃ ng há»— trá»£ 24/7 má»i váº¥n Ä‘á» liÃªn quan dá»‹ch vá»¥.</li>
                  <li>Vui lÃ²ng tuÃ¢n thá»§ quy Ä‘á»‹nh an ninh táº¡i chi nhÃ¡nh.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

