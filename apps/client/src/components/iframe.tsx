import React, { useRef, useEffect, useState } from "react";

function IframeScrollDetector() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleScroll = () => {
      const iframeWindow = iframe.contentWindow;
      const scrollHeight =
        iframeWindow?.document.documentElement.scrollHeight ?? 0;
      const scrollTop = iframeWindow?.document.documentElement.scrollTop ?? 0;
      const clientHeight =
        iframeWindow?.document.documentElement.clientHeight ?? 0;

      if (scrollHeight - Math.ceil(scrollTop) === clientHeight) {
        setIsAtBottom(true);
        console.log("iframeのスクロールが最下部に達しました");
      } else {
        setIsAtBottom(false);
      }
    };

    iframe.addEventListener("load", () => {
      iframe.contentWindow?.addEventListener("scroll", handleScroll);
    });

    return () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <iframe ref={iframeRef} src="your-iframe-url" title="Your iframe title" />
      {isAtBottom && <p>スクロールが最下部に達しました</p>}
    </div>
  );
}

export default IframeScrollDetector;
