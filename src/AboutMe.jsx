import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";

const CHARS = [char1, char2, char3];

const REVEAL_CONTENT = [
  {
    title: "About This Website",
    body: "This website is based on the home screen of the video game Persona 3. Truth be told I’ve barely played this game, so this could be larp. But I am a big fan of the sound track and Persona 5, which I have played. I decided to make this website Persona 3 and not 5 themed simply because it was easier. It was easier because I had help from the wonderful Blair Jade (GH: blairxu13). She is a software developer as well and she already had the foundation and assets laid out to create this portfolio. I am working on my own Persona 5 themed portfolio, but that will take some time, so in the mean time this is a placeholder portfolio.",
  },
  {
    title: "Hobbies",
    body: "TODO",
  },
  {
    title: "Goals",
    body: "TODO",
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "website", label: "ABOUT THIS WEBSITE",
    stats: [
      { tag: "EXP", value: "3Y", color: "#9147ff" },
      { tag: "MS", value: "AI", color: "#bf94ff" },
    ],
  },
  {
    id: "hobbies", label: "HOBBIES",
    stats: [
      { tag: "SYS", value: "II", color: "#e1306c" },
      { tag: "SWE", value: "II", color: "#f77737" },
    ],
  },
  {
    id: "goals", label: "GOALS",
    stats: [
      { tag: "GPA", value: "3.67", color: "#00f2ea" },
      { tag: "BS", value: "AE", color: "#ff0050" },
    ],
  },
];

const HOBBIES = [
  {
    id: "video-games",
    label: "Video Games",
    body: [
      "I play a wide range of video games. But currently I am fixed on Valorant and my goal is to reach Diamond by EOY.",
      "I was on the UT Austin Esports team during undergrad. I was on both the 2k and Madden team and the captain of the 2k team.",
      "My top 3 games of all time are: 1. Assassins Creed: Black Flag 2. Titanfall 3. For Honor",
    ],
  },
  {
    id: "board-games",
    label: "Board Games",
    body: [
      "I love to play board/card games too, my favorite are Secret Hitler and Unstable Unicorns.",
    ],
  },
  {
    id: "sports",
    label: "Sports",
    body: [
      "I am a huge Dallas Mavericks and Cowboys fan (perpetual pain).",
      "I enjoy playing basketball recreationally.",
    ],
  },
  {
    id: "food-critic",
    label: "Self Proclaimed Food Critic",
    body: [
      "I try to eat out at a new restaurant at least once a week. And if I repeat a restaurant I get something new. I keep all my restaurant ratings and reviews on the Beli app. My Beli is: @HeranP27.",
    ],
  },
  {
    id: "anime",
    label: "Anime",
    body: [
      "Too much to talk about here, I am a weeb who’s been watching since elementary school. Even took a class on it during undergrad. Big part of my life. I am currently making an anime ranking website on the side, because I do not like MAL’s UI.",
      "My Top 3 (depends on the day your asking): 1. One Piece 2. SNAFU 3. Re: Zero",
    ],
  },
  {
    id: "website-design",
    label: "Website Design",
    body: [
      "It started when I joined a club called Business Professionals of America in High School. Through this club, I entered with 3 other friends the BPA Website Design competition. Long story short we placed 1st in Texas and 7th nationally, in a competition pool of 10,000+ people.",
      "This honestly was the most fun period of my life during high school. So after I got inspired to continue website designing on the side. Through some connections I was able to build a few websites for some local business, I did this side hustle up until college started.",
      "I’ve started this hobby again as it’s much easier with generative AI, but not for money just for fun. As I said before I am working on a Persona 5 themed portfolio and along with that a mini Sonic game/portfolio.",
    ],
  },
  {
    id: "weight-lifting",
    label: "Weight Lifting",
    body: [
      "Nothing much to say here except I go to the gym after work and pump weights. Not trying to be Mr. Olympia or anything, but just stay fit enough to justify my caloric intake.",
    ],
  },
  {
    id: "new-tools",
    label: "Exploring New Tools",
    body: [
      "With the boom in AI there have been an insane amount of new tools to come out that are free and accessible. I either find new tools from friends or get it recommended to me in some manner.",
      "So in my free time and on projects I’ll try to use new tools to see if they can benefit me in any way for current or future work.",
    ],
  },
];

const GOALS = [
  {
    title: "2026",
    items: [
      "learn Japanese",
      "Be able to do 75 pushups",
      "Bench 225",
      "Cut 20 lbs by eoy",
      "Cook more",
      "Drink 128 oz of water a day",
      "Take vitamin supplements",
      "Brush twice a day",
      "Read manga",
      "Read a book",
    ],
  },
  {
    title: "Long term",
    items: [
      "Run a marathon",
      "Open a bakery",
      "Be a Dallas mavericks Season ticket holder",
      "Kbbq grill/table",
      "Kotatsu",
    ],
  },
];

export default function AboutMe() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [activeHobby, setActiveHobby] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (activeHobby) setActiveHobby(null);
        else if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, activeHobby, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && (
        <div key={`panel-${active}`} className={`about-detail-panel${mounted ? " mounted" : ""}`}>
          <div className="about-detail-top">
            <div className="about-detail-index">{String(active + 1).padStart(2, "0")}</div>
            <div className="about-detail-title">
              {activeHobby ? HOBBIES.find((hobby) => hobby.id === activeHobby)?.label : REVEAL_CONTENT[active].title}
            </div>
          </div>
          {active === 1 && !activeHobby ? (
            <div className="hobby-grid">
              {HOBBIES.map((hobby) => (
                <button className="hobby-button" type="button" key={hobby.id} onClick={() => setActiveHobby(hobby.id)}>
                  {hobby.label}
                </button>
              ))}
            </div>
          ) : activeHobby ? (
            <div className="about-detail-copy hobby-copy">
              {HOBBIES.find((hobby) => hobby.id === activeHobby)?.body.map((line) => (
                <p className="hobby-copy-line" key={line}>{line}</p>
              ))}
              <button className="hobby-back" type="button" onClick={() => setActiveHobby(null)}>
                &lt; Back to Hobbies
              </button>
            </div>
          ) : active === 2 ? (
            <div className="about-detail-copy goals-copy">
              {GOALS.map((section) => (
                <section className="goal-column" key={section.title}>
                  <h3 className="goal-heading">{section.title}</h3>
                  <ul className="goal-list">
                    {section.items.map((item) => (
                      <li className="goal-item" key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : Array.isArray(REVEAL_CONTENT[active].body) ? (
            <div className="about-detail-copy">
              {REVEAL_CONTENT[active].body.map((line) => (
                <p className="about-copy-line" key={line}>{line}</p>
              ))}
            </div>
          ) : (
            <div className="about-detail-copy">{REVEAL_CONTENT[active].body}</div>
          )}
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 14;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 5;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .about-detail-panel {
          position: absolute;
          top: 15vh;
          right: 5vw;
          width: min(46vw, 680px);
          z-index: 13;
          padding: 20px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          max-height: 78vh;
          overflow-y: auto;
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
        }
        .about-detail-panel.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .about-detail-top {
          display: grid;
          grid-template-columns: 70px minmax(0, 1fr);
          align-items: center;
          gap: 14px;
          min-height: 84px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .about-detail-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .about-detail-title {
          font-family: 'Anton', sans-serif;
          font-size: 40px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .about-detail-copy {
          margin-top: 18px;
          min-height: 180px;
          padding: 22px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          line-height: 1.15;
          color: #edfaff;
        }
        .about-copy-line {
          margin: 0;
          font-size: 24px;
          line-height: 1.12;
        }
        .about-copy-line + .about-copy-line {
          margin-top: 7px;
        }
        .goals-copy {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 18px;
          min-height: 0;
          font-size: 18px;
        }
        .goal-column {
          min-width: 0;
          padding-right: 8px;
        }
        .goal-heading {
          margin: 0 0 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          line-height: 1;
          color: #8ef5ff;
        }
        .goal-list {
          display: grid;
          gap: 6px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .goal-item {
          position: relative;
          padding-left: 16px;
          font-size: 18px;
          line-height: 1.12;
          overflow-wrap: anywhere;
        }
        .goal-item::before {
          content: "-";
          position: absolute;
          left: 0;
          color: #8ef5ff;
        }
        .hobby-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 18px;
        }
        .hobby-button {
          min-height: 58px;
          border: 0;
          padding: 10px 14px;
          background: rgba(5, 13, 57, 0.97);
          color: #edfaff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          line-height: 1.05;
          text-align: left;
          cursor: pointer;
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .hobby-button:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .hobby-copy {
          font-size: 19px;
          min-height: 0;
        }
        .hobby-copy-line + .hobby-copy-line {
          margin-top: 12px;
        }
        .hobby-back {
          margin-top: 18px;
          border: 0;
          background: transparent;
          color: #8df6ff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          cursor: pointer;
          text-align: left;
        }
        .hobby-back:hover {
          color: #ffffff;
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -3vw;
          z-index: 13;
          pointer-events: none;
          width: 43vw;
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 20px;
          letter-spacing: 0.5px;
          line-height: 1.15;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          height: 20%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 22px;
          letter-spacing: 0.4px;
          text-transform: lowercase;
          padding-left: 22px;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 118px;
          padding-right: 18px;
          min-width: 0;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
          text-align: center;
          white-space: normal;
          overflow-wrap: normal;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        @media (max-width: 900px) {
          .sc-root {
            justify-content: flex-start;
            padding-top: 9vh;
          }
          .sc-bar,
          .sc-bar-red {
            width: 72vw;
          }
          .about-detail-panel {
            top: 46vh;
            left: 4vw;
            right: auto;
            width: 92vw;
            max-height: 50vh;
            padding: 12px 14px 16px;
          }
          .about-detail-top {
            grid-template-columns: 48px minmax(0, 1fr);
            min-height: 58px;
            gap: 10px;
            padding: 0 12px;
          }
          .about-detail-index {
            font-size: 30px;
          }
          .about-detail-title {
            font-size: 28px;
          }
          .about-detail-copy {
            min-height: 120px;
            margin-top: 10px;
            padding: 14px;
            font-size: 22px;
          }
          .hobby-grid {
            grid-template-columns: 1fr;
            gap: 7px;
            margin-top: 10px;
          }
          .hobby-button {
            min-height: 42px;
            font-size: 16px;
          }
          .hobby-copy {
            font-size: 13px;
          }
          .hobby-copy-line + .hobby-copy-line {
            margin-top: 8px;
          }
          .hobby-back {
            margin-top: 12px;
            font-size: 18px;
          }
          .goals-copy {
            grid-template-columns: 1fr;
            gap: 14px;
            font-size: 14px;
          }
          .goal-heading {
            margin-bottom: 7px;
            font-size: 22px;
          }
          .goal-list {
            gap: 4px;
          }
          .goal-item {
            font-size: 14px;
            line-height: 1.08;
          }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              setActive(i);
              setActiveHobby(null);
              setRevealed(true);
            }}
            onMouseEnter={() => {
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
