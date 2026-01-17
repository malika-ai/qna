import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Error Boundary component to catch rendering errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#dc2626', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Terjadi Kesalahan Aplikasi</h1>
          <p style={{ marginBottom: '1rem' }}>Mohon refresh halaman. Jika masalah berlanjut, hubungi admin.</p>
          <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fee2e2', textAlign: 'left', overflow: 'auto' }}>
            <pre style={{ fontSize: '0.875rem' }}>{this.state.error?.message}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);