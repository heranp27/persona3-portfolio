import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "heranpatel27@gmail.com",
    href: "mailto:heranpatel27@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/heran-patel",
    href: "https://www.linkedin.com/in/heran-patel",
  },
  {
    label: "GitHub",
    value: "heranp27",
    href: "https://github.com/heranp27?tab=repositories",
  },
  {
    label: "Resume",
    value: "Heran_Patel_Resume_2026.pdf",
    href: "/Heran_Patel_Resume_2026.pdf",
  },
];

export default function Socials() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .contact-root {
          position: absolute;
          inset: 0;
          z-index: 12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8vh 7vw;
          pointer-events: none;
        }

        .contact-panel {
          width: min(820px, 86vw);
          padding: 28px 32px 34px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            18px 18px 0 rgba(0, 6, 30, 0.58);
          opacity: 0;
          transform: translateY(24px) skewX(-3deg);
          transition: opacity 0.42s ease, transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
        }

        .contact-panel.mounted {
          opacity: 1;
          transform: translateY(0) skewX(-3deg);
        }

        .contact-heading {
          display: grid;
          grid-template-columns: 92px 1fr;
          align-items: center;
          gap: 18px;
          min-height: 92px;
          padding: 0 22px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          color: #08153f;
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: 12px 0 0 rgba(255, 94, 136, 0.88);
        }

        .contact-index {
          font-family: 'Anton', sans-serif;
          font-size: 54px;
          line-height: 1;
        }

        .contact-title {
          font-family: 'Anton', sans-serif;
          font-size: 58px;
          line-height: 0.92;
          letter-spacing: 1px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 22px;
        }

        .contact-row {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          align-items: center;
          gap: 18px;
          min-height: 68px;
          padding: 12px 18px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #edfaff;
          text-decoration: none;
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }

        .contact-row:hover {
          transform: translateX(5px);
          background: rgba(12, 26, 94, 1);
        }

        .contact-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #94f4ff;
        }

        .contact-value {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #ffffff;
          overflow-wrap: anywhere;
        }

        .contact-footer {
          margin-top: 20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.46);
          text-align: left;
          overflow-wrap: anywhere;
        }

        @media (max-width: 700px) {
          .contact-root {
            align-items: flex-start;
            padding: 7vh 4vw;
          }

          .contact-panel {
            width: 92vw;
            padding: 16px 16px 20px;
            transform: translateY(18px);
          }

          .contact-panel.mounted {
            transform: translateY(0);
          }

          .contact-heading {
            grid-template-columns: 54px 1fr;
            min-height: 64px;
            gap: 10px;
            padding: 0 14px;
          }

          .contact-index {
            font-size: 34px;
          }

          .contact-title {
            font-size: 38px;
          }

          .contact-row {
            grid-template-columns: 92px minmax(0, 1fr);
            gap: 10px;
            min-height: 58px;
            padding: 10px 12px;
          }

          .contact-label {
            font-size: 22px;
          }

          .contact-value {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="contact-root">
        <section className={`contact-panel${mounted ? " mounted" : ""}`}>
          <div className="contact-heading">
            <div className="contact-index">05</div>
            <div className="contact-title">CONTACT</div>
          </div>

          <div className="contact-grid">
            {CONTACT_ITEMS.map((item) => (
              <a className="contact-row" href={item.href} key={item.label} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <div className="contact-label">{item.label}</div>
                <div className="contact-value">{item.value}</div>
              </a>
            ))}
          </div>

          <div className="contact-footer">ESC / BACKSPACE / LEFT TO RETURN</div>
        </section>
      </div>
    </div>
  );
}
