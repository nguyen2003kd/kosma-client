'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  className?: string;
}

export default function ErrorBoundary({ error, reset, className }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error('Error caught by boundary:', error);
    
    // You can add error reporting service here
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <div className={cn(
      'min-h-[400px] flex items-center justify-center p-4',
      className
    )}>
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl">⚠️</div>
        
        <h2 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h2>
        
        <p className="text-gray-600">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto text-red-600">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
        
        <p className="text-xs text-gray-500">
          Error ID: {error.digest || 'Unknown'}
        </p>
      </div>
    </div>
  );
}

// 404 Error Component
interface NotFoundProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NotFound({ 
  title = "Page not found",
  description = "The page you're looking for doesn't exist.",
  className 
}: NotFoundProps) {
  return (
    <div className={cn(
      'min-h-[400px] flex items-center justify-center p-4',
      className
    )}>
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl">🔍</div>
        
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>
        
        <p className="text-gray-600">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Offline Error Component
export function OfflineError() {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl">📡</div>
        
        <h2 className="text-2xl font-bold text-gray-900">
          You&apos;re offline
        </h2>
        
        <p className="text-gray-600">
          Please check your internet connection and try again.
        </p>
        
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}