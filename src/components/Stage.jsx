// Pembungkus satu atau beberapa section dengan latar bergradasi; batas antar Stage berbaur halus (lihat .stage di index.css).
export default function Stage({ children, divider = false }) {
  return <div className={divider ? "stage" : "stage stage-first"}>{children}</div>;
}
