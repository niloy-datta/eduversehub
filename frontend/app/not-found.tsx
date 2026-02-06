import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-3xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-dark-400 mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Maybe you mistyped the URL? 
          <span className="text-primary-400"> (ironically)</span>
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/typing" className="btn-outline">
            Practice Typing
          </Link>
        </div>

        {/* Fun keyboard illustration */}
        <div className="mt-12 text-6xl opacity-50">
          ⌨️
        </div>
      </div>
    </div>
  );
}
