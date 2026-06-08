import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "education", badge: "I", title: "EDUCATION", subtitle: "UT Austin / AI / Aerospace" },
  { id: "skills", badge: "II", title: "SKILLS", subtitle: "Software / ML / Systems" },
  { id: "projects", badge: "III", title: "PROJECTS", subtitle: "NASA / ML / Research" },
  { id: "experience", badge: "IV", title: "EXPERIENCE", subtitle: "Lockheed / ML / SpaceX" },
];

const DETAILS = {
  education: {
    title: "EDUCATION LOG",
    subject: "Education",
    rows: [
      { index: "01", title: "MS Computer and Data Science - Artificial Intelligence, UT Austin", status: "MAY 2026" },
      { index: "02", title: "BS Aerospace Engineering + Computational Engineering Certificate, UT Austin", status: "MAY 2023" },
      { index: "03", title: "NVIDIA DLI: Deep Learning, Accelerated Data Science, LLM Customization", status: "CERT" },
    ],
    bullets: [
      "Graduate work centers on artificial intelligence, data science, and production-ready modeling.",
      "Aerospace background adds physics, simulation, and systems engineering discipline.",
      "NVIDIA coursework adds practical deep learning and predictive maintenance tooling.",
    ],
  },
  skills: {
    title: "SKILL GRID",
    subject: "Skills",
    rows: [
      { index: "01", title: "Python, C++, Java, Matlab", status: "CODE" },
      { index: "02", title: "Docker, Git, GitHub, GitLab, Bitbucket, Linux, AWS", status: "TOOLS" },
      { index: "03", title: "Jupyter, machine learning pipelines, ensemble models, neural networks", status: "ML" },
      { index: "04", title: "Cameo, Rhapsody, DOORS, Simulink, SolidWorks, Visio", status: "SYS" },
    ],
    bullets: [
      "Comfortable moving between software implementation, requirements, modeling, and documentation.",
      "Experienced with Agile/Scrum workflows and Atlassian tools including JIRA and Confluence.",
      "Strongest overlap: AI-enabled engineering systems and mission-focused software.",
    ],
  },
  projects: {
    title: "PROJECT LIST",
    subject: "Projects",
    rows: [
      { index: "01", title: "Predicting Bike-Sharing Demand with ML and Weather Data", status: "ML" },
      { index: "02", title: "NASA MITTIC: NASA ZONE commercialization concept", status: "7TH" },
      { index: "03", title: "Blended-Wing Body aircraft research with SpaceX mentorship", status: "BWB" },
      { index: "04", title: "ML model research and deployment support at Quaternion Studios", status: "R&D" },
      { index: "05", title: "Hybrid AI Medical Symptom Chatbot for rapid disease prediction", status: "AIHC" },
      { index: "06", title: "Residual debiasing for robust natural language inference", status: "NLP" },
    ],
    bullets: [
      "Bike-share pipeline forecasts station-level demand with temporal, weather, lag, ensemble, and neural-network features.",
      "NASA MITTIC team represented UT Austin and placed 7th nationally.",
      "Independent aerospace study targeted an 8%-15% reduction in commercial-aircraft carbon emissions.",
      "AI in Healthcare chatbot combined SentenceTransformer + FAISS retrieval, MiniLM reranking, and a fine-tuned DistilBERT classifier to return top-3 diagnoses, medications, care advice, and clarifying questions; reported ~83% accuracy, 94% top-3 recall, and ~1.4s GPU response time.",
      "NLP project investigated SNLI hypothesis-only artifacts with ELECTRA-small, comparing an 88.28% full NLI baseline against a 68.84% hypothesis-only model, then applying residual debiasing to preserve accuracy at 88.03% while reducing reliance on negation, lexical-overlap, and polarity shortcuts.",
    ],
  },
  experience: {
    title: "BATTLE RECORD",
    subject: "Experience",
    rows: [
      { index: "01", title: "Lockheed Martin - Software Engineer II, Huntsville, AL", status: "NOW" },
      { index: "02", title: "Lockheed Martin - Systems Engineer II, Fort Worth, TX", status: "23'-25'" },
      { index: "03", title: "Quaternion Studios - Machine Learning Research Intern", status: "2023" },
      { index: "04", title: "SpaceX - Independent Study and Mentorship Program", status: "2020" },
    ],
    bullets: [
      "Current role covers software design, development, documentation, testing, debugging, and mission-problem solutions.",
      "Systems role included MBSE co-lead duties, mission planning, ground security, requirements, and Agile software development.",
      "ML internship focused on transforming business needs into technical models and improving performance through fine-tuning.",
    ],
  },
};

export default function ResumePage({ src, initialActive = 1, initialMode = "overview" }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(initialActive);
  const [mode, setMode] = useState(initialMode);
  const [mounted, setMounted] = useState(false);
  const activeItem = ITEMS[active];
  const activeDetail = DETAILS[activeItem.id];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (mode === "overview") {
        if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "Enter" || e.key === "ArrowRight") setMode("details");
        if (e.key === "ArrowLeft") navigate(-1);
      } else {
        if (e.key === "ArrowLeft" || e.key === "Backspace") setMode("overview");
      }
      if (e.key === "Escape") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow-y: auto;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 7vh;
          right: 2.8vw;
          width: min(43vw, 660px);
          max-height: 88vh;
          z-index: 12;
          padding: 18px 22px 20px 22px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px minmax(0, 1fr);
          align-items: center;
          gap: 14px;
          min-height: 76px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px minmax(0, 1fr) 72px;
          align-items: center;
          gap: 12px;
          min-height: 58px;
          padding: 7px 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          line-height: 1.08;
          color: #f2fcff;
          min-width: 0;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          justify-self: end;
          text-align: center;
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 14px;
          padding: 14px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          line-height: 1.15;
          color: #edfaff;
        }
        .resume-more-card {
          position: relative;
          margin-top: 14px;
          min-height: 106px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 22px;
          background: #ffffff;
          color: #07113d;
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: 10px 8px 0 rgba(214, 50, 50, 0.92);
          cursor: pointer;
          pointer-events: all;
          transition: transform 0.18s ease;
        }
        .resume-more-card:hover {
          transform: translateX(5px);
        }
        .resume-more-label {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-more-meta {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #ffffff;
          background: #000;
          padding: 8px 14px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          white-space: nowrap;
        }
        .resume-nested-panel {
          position: absolute;
          top: 7vh;
          right: 2.8vw;
          width: min(43vw, 660px);
          max-height: 86vh;
          z-index: 13;
          padding: 18px 22px 20px 22px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.97) 0%, rgba(8, 16, 68, 0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow-y: auto;
          pointer-events: all;
        }
        .resume-nested-title {
          position: relative;
          padding: 18px 20px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-nested-kicker {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-nested-heading {
          font-family: 'Anton', sans-serif;
          font-size: 48px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-nested-copy {
          position: relative;
          margin-top: 16px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-nested-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          line-height: 1.18;
          color: #edfaff;
        }
        .resume-nested-bullet + .resume-nested-bullet {
          margin-top: 14px;
        }
        .resume-nested-back {
          margin-top: 18px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          color: #8df6ff;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
          text-align: left;
          pointer-events: all;
        }
        .resume-nested-back:hover {
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .resume-stack {
            top: 3vh;
            left: 3vw;
            width: 720px;
            transform: scale(0.52);
          }

          .resume-list-tag {
            font-size: 76px;
            margin-bottom: 4px;
          }

          .resume-detail-panel {
            top: 42vh;
            left: 4vw;
            right: auto;
            width: 92vw;
            max-height: 55vh;
            padding: 10px 12px 12px 12px;
            box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.16);
          }

          .resume-detail-top {
            grid-template-columns: 44px minmax(0, 1fr);
            min-height: 52px;
            gap: 8px;
            padding: 0 10px;
          }

          .resume-detail-top-index {
            font-size: 30px;
          }

          .resume-detail-top-title {
            font-size: 24px;
          }

          .resume-detail-list {
            gap: 6px;
            margin-top: 9px;
          }

          .resume-detail-row {
            grid-template-columns: 32px minmax(0, 1fr) 46px;
            min-height: 42px;
            gap: 7px;
            padding: 5px 8px;
          }

          .resume-detail-row-index {
            font-size: 18px;
          }

          .resume-detail-row-title {
            font-size: 12px;
            line-height: 1.08;
          }

          .resume-detail-status {
            font-size: 14px;
            padding: 5px 7px;
          }

          .resume-detail-bottom {
            margin-top: 8px;
            padding: 9px;
          }

          .resume-detail-bottom-title {
            font-size: 20px;
            margin-bottom: 6px;
          }

          .resume-detail-bullets {
            gap: 5px;
          }

          .resume-detail-bullet {
            font-size: 10px;
            line-height: 1.14;
          }
          .resume-more-card {
            min-height: 66px;
            margin-top: 8px;
            padding: 10px 12px;
            gap: 10px;
          }
          .resume-more-label {
            font-size: 22px;
          }
          .resume-more-meta {
            font-size: 16px;
            padding: 5px 8px;
          }
          .resume-nested-panel {
            top: 42vh;
            left: 4vw;
            right: auto;
            width: 92vw;
            max-height: 55vh;
            padding: 10px 12px 12px 12px;
            box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.16);
          }
          .resume-nested-title {
            padding: 12px 14px;
          }
          .resume-nested-kicker {
            font-size: 18px;
          }
          .resume-nested-heading {
            font-size: 30px;
          }
          .resume-nested-copy {
            margin-top: 10px;
            padding: 12px;
          }
          .resume-nested-bullet {
            font-size: 13px;
          }
          .resume-nested-bullet + .resume-nested-bullet {
            margin-top: 9px;
          }
          .resume-nested-back {
            margin-top: 10px;
            font-size: 18px;
          }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>RESUME</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                if (mode === "overview") setActive(index);
              }}
              onClick={() => {
                setActive(index);
                setMode("overview");
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mode === "overview" && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">{String(active + 1).padStart(2, "0")}</div>
              <div className="resume-detail-top-title">{activeDetail.title}</div>
            </div>

            <div className="resume-detail-list">
              {activeDetail.rows.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div
              className="resume-more-card"
              onClick={() => setMode("details")}
              role="button"
              tabIndex={0}
            >
              <div className="resume-more-label">Click for more details</div>
              <div className="resume-more-meta">{activeItem.title}</div>
            </div>
          </div>
        )}

        {mode === "details" && (
          <div className="resume-nested-panel">
            <div className="resume-nested-title">
              <div className="resume-nested-kicker">More Details</div>
              <div className="resume-nested-heading">{activeDetail.subject}</div>
            </div>
            <div className="resume-nested-copy">
              {activeDetail.bullets.map((bullet) => (
                <div className="resume-nested-bullet" key={bullet}>- {bullet}</div>
              ))}
            </div>
            <button className="resume-nested-back" type="button" onClick={() => setMode("overview")}>
              &lt; Back to {activeDetail.title}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
