import React from 'react';
import './App.css';
import { useAudit } from './hooks/useAudit';
import UrlForm from './components/UrlForm';
import ResultsPanel from './components/ResultsPanel';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';

const App: React.FC = () => {
  const { state, result, error, loadingStep, runAudit, reset } = useAudit();

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="12" stroke="#4F46E5" strokeWidth="2"/>
              <circle cx="13" cy="13" r="4.5" fill="#4F46E5"/>
              <line x1="13" y1="1" x2="13" y2="5.5" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
              <line x1="13" y1="20.5" x2="13" y2="25" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="13" x2="5.5" y2="13" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
              <line x1="20.5" y1="13" x2="25" y2="13" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="logo-text">AccessLens</span>
          </div>
          <span className="header-badge">WCAG 2.1</span>
        </div>
      </header>

      <main className="main" id="main-content">
        <section className="hero">
          <h1 className="hero-title">
            Audit any webpage for <span className="accent">accessibility issues</span>
          </h1>
          <p className="hero-sub">
            Checks against WCAG 2.1 A &amp; AA guidelines — contrast, structure, ARIA, keyboard, and more.
          </p>
          <UrlForm onSubmit={runAudit} loading={state === 'loading'} />
          {error && (<div className="error-banner" role="alert"><p className="error-title">⚠ Could not fetch this page</p><p className="error-msg">{error.split("\n")[0]}</p><p className="error-tips">Try: <strong>example.com</strong>, <strong>wikipedia.org</strong> — sites blocking third-party requests (Google, Twitter) cannot be audited via browser.</p></div>)}
        </section>

        {state === 'loading' && <LoadingState step={loadingStep} />}
        {state === 'success' && result && <ResultsPanel result={result} onReset={reset} />}
        {(state === 'idle' || state === 'error') && <EmptyState />}
      </main>

      <footer className="footer">
        <p>
          Built with React + TypeScript ·{' '}
          <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
            WCAG 2.1 Reference
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
