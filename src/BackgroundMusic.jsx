import { useEffect, useRef } from "react";

const SOUNDCLOUD_SRC = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1725828009&color=%2394f4ff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false";
const API_SRC = "https://w.soundcloud.com/player/api.js";
const START_EVENTS = ["pointerdown", "keydown", "touchstart"];

function loadSoundCloudApi() {
  if (window.SC?.Widget) return Promise.resolve(window.SC);

  const existingScript = document.querySelector(`script[src="${API_SRC}"]`);
  if (existingScript) {
    return new Promise((resolve) => {
      existingScript.addEventListener("load", () => resolve(window.SC), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = API_SRC;
    script.async = true;
    script.onload = () => resolve(window.SC);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function BackgroundMusic({ muted }) {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const isReadyRef = useRef(false);
  const shouldPlayRef = useRef(false);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;

    const widget = widgetRef.current;
    if (!widget || !isReadyRef.current) return;

    if (shouldPlayRef.current && !muted) {
      widget.setVolume(18);
      widget.play();
    } else {
      widget.pause();
    }
  }, [muted]);

  useEffect(() => {
    let cancelled = false;

    loadSoundCloudApi()
      .then((SC) => {
        if (cancelled || !iframeRef.current || !SC?.Widget) return;

        const widget = SC.Widget(iframeRef.current);
        widgetRef.current = widget;

        widget.bind(SC.Widget.Events.READY, () => {
          isReadyRef.current = true;
          widget.setVolume(18);
          if (shouldPlayRef.current && !mutedRef.current) widget.play();
        });

        widget.bind(SC.Widget.Events.FINISH, () => {
          if (!shouldPlayRef.current || mutedRef.current) return;
          widget.seekTo(0);
          widget.play();
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const playMusic = () => {
      shouldPlayRef.current = true;

      const widget = widgetRef.current;
      if (!widget || mutedRef.current) return;

      widget.setVolume(18);
      widget.play();
    };

    START_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, playMusic, { capture: true, passive: true });
    });

    return () => {
      START_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, playMusic, { capture: true });
      });
    };
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        className="soundcloud-background-player"
        title="Color Your Night background music"
        width="100%"
        height="96"
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={SOUNDCLOUD_SRC}
      />
      <style>{`
        .soundcloud-background-player {
          position: fixed;
          left: -9999px;
          bottom: 0;
          width: 1px;
          height: 1px;
          border: 0;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
