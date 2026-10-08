import { ImageResponse } from 'next/og';

export const alt = 'Kunalistic — Bespoke Software Labs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#08080a',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 65%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '28px',
          }}
        />

        {/* Studio Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 20px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            fontSize: '14px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#a1a1aa',
            marginBottom: '24px',
          }}
        >
          <span>ARCHITECTED BY KUNAL</span>
          <span>•</span>
          <span style={{ color: '#ffffff' }}>BESPOKE SOFTWARE LABS</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            textAlign: 'center',
            margin: '0 0 16px 0',
            color: '#ffffff',
          }}
        >
          KUNALISTIC
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '24px',
            color: '#a1a1aa',
            maxWidth: '750px',
            textAlign: 'center',
            lineHeight: 1.4,
            margin: '0 0 32px 0',
          }}
        >
          Digital Artifacts. Engineered In The Shadows.
        </p>

        {/* Feature Pills */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
          }}
        >
          <div
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '1px',
            }}
          >
            LIVE PORTFOLIO
          </div>
          <div
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              fontSize: '13px',
              letterSpacing: '1px',
            }}
          >
            CUSTOM MVPS
          </div>
          <div
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              fontSize: '13px',
              letterSpacing: '1px',
            }}
          >
            NEON POSTGRESQL
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
