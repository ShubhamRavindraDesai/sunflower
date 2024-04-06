"use client";

import { prevIcon, pauseIcon, playIcon, nextIcon } from "@/app/assets/icons";
import { useState } from "react";

export const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="flex gap-4 absolute right-4 justify-center items-center">
      <figure>{prevIcon}</figure>
      {isPlaying ? (
        <figure onClick={handleClick}>{pauseIcon}</figure>
      ) : (
        <figure onClick={handleClick}>{playIcon}</figure>
      )}
      <figure>{nextIcon}</figure>
    </section>
  );
};
