import React, { useEffect, useRef } from "react";

const dummyLinks = [
  "https://www.youtube.com/watch?v=Kl8dINgeQCY",
  "https://www.youtube.com/watch?v=Kl8dINgeQCY",
];

const getEmbedUrl = (url: string) => {
  try {
    const u = new URL(url);
    const id = u.searchParams.get("v");

    const origin = window.location.origin;

    return `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&origin=${origin}&playsinline=1&controls=1&modestbranding=1&rel=0`;
  } catch {
    return url;
  }
};

const YoutubeColumn: React.FC = () => {
  const refs = useRef<(HTMLIFrameElement | null)[]>([]);
  const ready = useRef<boolean[]>([]);

  // Optional: block right-click on whole page
  useEffect(() => {
    const blockContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", blockContext);
    return () => document.removeEventListener("contextmenu", blockContext);
  }, []);

  const sendCommand = (index: number, func: string) => {
    const iframe = refs.current[index];
    if (!iframe || !ready.current[index]) return;

    iframe.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args: [],
      }),
      "*"
    );
  };

  const handleLoad = (index: number) => {
    ready.current[index] = true;
    // Optional: auto-play first video (remove if not wanted)
    // if (index === 0) sendCommand(0, "playVideo");
  };

  return (
    <div style={styles.container}>
      {dummyLinks.map((link, i) => (
        <div key={i} style={styles.videoWrapper}>
          <iframe
            ref={(el) => (refs.current[i] = el)}
            src={getEmbedUrl(link)}
            title={`video-${i}`}
            style={styles.iframe}
            onLoad={() => handleLoad(i)}
            allow="autoplay; encrypted-media"
          />

          {/* Top overlay ~20% */}
          <div style={styles.topOverlay} />

          {/* Bottom overlay ~20% */}
          <div style={styles.bottomOverlay} />

          {/* Optional: debug label - remove in production */}
          {/* <div style={{ position: "absolute", top: "50%", left: "50%", color: "white", pointerEvents: "none", transform: "translate(-50%, -50%)" }}>
            Middle is clickable
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default YoutubeColumn;

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "60px",
    backgroundColor: "#f5f7fb",
    padding: "80px 0",
  },
  videoWrapper: {
    width: "80%",
    maxWidth: "1200px",
    aspectRatio: "16 / 9",     // better than fixed height
    background: "#000",
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "20%",           // ← top 20%
    background: "transparent",
    zIndex: 2,
    pointerEvents: "auto",   // blocks clicks
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "5.8%",           // ← bottom 20%
    background: "black", // for testing - make it transparent in production
    zIndex: 2,
    pointerEvents: "auto",   // blocks clicks
  },
};