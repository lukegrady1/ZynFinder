import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      gap: '1rem'
    }}>
      <h2>Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/" style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: 'white',
        borderRadius: '0.375rem',
        textDecoration: 'none'
      }}>
        Return Home
      </Link>
    </div>
  )
} 