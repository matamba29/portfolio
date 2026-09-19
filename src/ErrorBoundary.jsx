import React from 'react';
import { X } from 'lucide-react';

// Prevents a white/black screen crash from taking down the whole page
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught UI Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-red-500 p-8 flex flex-col items-center justify-center font-sans">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><X className="w-6 h-6" /> Something went wrong</h2>
            <p className="text-zinc-400 text-sm mb-4">The application encountered an unexpected error and had to halt.</p>
            <div className="bg-zinc-950 p-4 rounded-lg border border-red-900/50 overflow-auto font-mono text-xs">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
