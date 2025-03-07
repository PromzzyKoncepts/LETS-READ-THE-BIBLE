import { useState, useEffect } from "react";
import { Howl } from "howler";
import { useBibleStore } from "./store";
import { getBooks } from "./readApi";
import { ActionIcon, rem } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import '@mantine/core/styles.css';
import { FaPlay, FaPause } from "react-icons/fa6";
const Audio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const activeBook = useBibleStore((state) => state.activeBook);
  const activeChapter = useBibleStore((state) => state.activeChapter);

  useEffect(() => {
    if (isPlaying) {
      if (audio !== null) audio.stop();
      const index = getBooks().findIndex(
        (book) => book.book_name === activeBook
      );
      const audioHowl = new Howl({
        src: [
          `https://wordpocket.org/bibles/app/audio/1/${
            index + 1
          }/${activeChapter}.mp3`,
        ],
        html5: true,
        pool: 1,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });
      setAudio(audioHowl);
      audioHowl.play();
    } else audio?.stop();

    return () => {
      audio?.unload();
    };
  }, [activeBook, activeChapter, isPlaying]);

  return (
    <ActionIcon
      variant="transparent"
      onClick={() => setIsPlaying((value) => !value)}
    >
      {isPlaying ? (
        <FaPause color="white" size={rem(20)} />
      ) : (
        <FaPlay color="white" size={rem(20)} />
      )}
    </ActionIcon>
  );
};

export default Audio;
