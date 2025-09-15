"use client";

import React, { useEffect, useState } from "react";

const FloatingAscii: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [asciiLines, setAsciiLines] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true); // ensure this runs only on client
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const chars = ["#", "@", "%", "&", "*", "+", "="];
    const interval = setInterval(() => {
      const line = Array.from({ length: 80 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      setAsciiLines((prev) => [...prev.slice(-20), line]);
    }, 120);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <pre className="absolute inset-0 text-green-500 opacity-20 pointer-events-none font-mono text-[0.6rem] leading-[0.65rem] z-[-1]">
      {asciiLines.join("\n")}
    </pre>
  );
};

export default FloatingAscii;
