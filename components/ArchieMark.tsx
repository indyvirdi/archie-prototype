/* Archie brand mark — the real Sidekick/Archie gradient "spark" logo
   (89×120). `size` sets the height; width keeps the 89:120 aspect ratio. */
export default function ArchieMark({ size = 120 }: { size?: number }) {
  const height = size;
  const width = Math.round((size * 89) / 120);
  return (
    <svg width={width} height={height} viewBox="0 0 89 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Archie">
      <path d="M69.5557 95.303C69.0817 95.303 68.6077 95.275 68.1337 95.1908L8.52274 86.7485C3.08581 85.9912 -0.678209 80.9987 0.102477 75.5855C0.883164 70.2004 5.90186 66.442 11.3388 67.2273L70.9498 75.6696C76.3867 76.4269 80.1507 81.4194 79.37 86.8326C78.673 91.741 74.4071 95.303 69.5557 95.303Z" fill="#20DFFF" />
      <path d="M78.1061 52.8489C77.6322 52.8489 77.1582 52.8215 76.6842 52.7392L17.0732 44.4866C11.6363 43.7463 7.87227 38.866 8.65295 33.6019C9.43364 28.3378 14.4802 24.6638 19.8893 25.4315L79.5002 33.6841C84.9371 34.4244 88.7012 39.3047 87.9205 44.5963C87.2234 49.3943 82.9576 52.8763 78.1061 52.8763V52.8489Z" fill="#FF00DF" />
      <path d="M78.029 52.8484C75.4835 52.8484 72.9379 51.906 70.9797 49.9936L36.7962 16.623C32.9079 12.8258 32.9079 6.64503 36.7962 2.84787C40.6845 -0.949289 47.0065 -0.949289 50.8948 2.84787L85.1063 36.2462C88.9946 40.0434 88.9946 46.2242 85.1063 50.0213C83.1482 51.9338 80.6026 52.8761 78.057 52.8761L78.029 52.8484Z" fill="url(#archie-p0)" />
      <path d="M69.5482 95.3039C67.0127 95.3039 64.4772 94.3559 62.5268 92.4321L11.4551 42.0516C7.58226 38.2319 7.58226 32.0145 11.4551 28.1948C15.328 24.3752 21.6249 24.3752 25.4978 28.1948L76.5695 78.5754C80.4423 82.3951 80.4423 88.6125 76.5695 92.4321C74.6191 94.3559 72.0836 95.3039 69.5482 95.3039Z" fill="url(#archie-p1)" />
      <path d="M44.1719 119.972C41.625 119.972 39.0781 119.03 37.119 117.117L2.91774 83.7465C-0.97258 79.9493 -0.97258 73.7686 2.91774 69.9714C6.80806 66.1742 13.1333 66.1742 17.0236 69.9714L51.2249 103.37C55.1152 107.167 55.1152 113.348 51.2249 117.145C49.2657 119.057 46.7188 120 44.1719 120V119.972Z" fill="url(#archie-p2)" />
      <defs>
        <linearGradient id="archie-p0" x1="33.859" y1="26.4346" x2="88.0156" y2="26.4346" gradientUnits="userSpaceOnUse">
          <stop stopColor="#20DFFF" />
          <stop offset="1" stopColor="#FF00DF" />
        </linearGradient>
        <linearGradient id="archie-p1" x1="79.4672" y1="60.3135" x2="8.55744" y2="60.3135" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFCF20" />
          <stop offset="1" stopColor="#FF00DF" />
        </linearGradient>
        <linearGradient id="archie-p2" x1="0.00699698" y1="93.5581" x2="54.1636" y2="93.5581" gradientUnits="userSpaceOnUse">
          <stop stopColor="#20DFFF" />
          <stop offset="1" stopColor="#00FFAF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
