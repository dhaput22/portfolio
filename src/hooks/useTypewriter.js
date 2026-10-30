import { useEffect, useState } from "react";

// Efek mengetik & menghapus kata secara bergantian.
export default function useTypewriter(words, opts = {}) {
  const { typeSpeed = 85, deleteSpeed = 45, pause = 1500 } = opts;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[index];
    let t;

    if (!deleting && text === full) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 250);
    } else {
      t = setTimeout(
        () =>
          setText(
            deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, pause, typeSpeed, deleteSpeed]);

  return text;
}
