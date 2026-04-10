// app/components/HitTracker.jsx
"use client";

import { useEffect } from "react";

export default function HitTracker() {
  useEffect(() => {
    fetch("https://parentforum.lovetoons.org/php/hit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: "lbrf" }),
      keepalive: true,
    });
  }, []);

  return null;
}
