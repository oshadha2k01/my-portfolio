import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 60%, #1f2937 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '48px',
        }}
      >
        <div style={{ fontSize: 28, color: '#93c5fd', marginBottom: 16 }}>About</div>
        <div style={{ fontSize: 64, fontWeight: 700, textAlign: 'center' }}>Oshadha Pathiraja</div>
        <div style={{ fontSize: 30, color: '#cbd5e1', marginTop: 12 }}>Full Stack Developer</div>
      </div>
    ),
    size
  );
}
