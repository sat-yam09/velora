import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '16px' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>
        Could not find the requested luxury destination.
      </p>
      <Link
        href="/"
        style={{
          background: '#0E1B29',
          color: '#FFFFFF',
          padding: '12px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Return to Velora
      </Link>
    </div>
  );
}
