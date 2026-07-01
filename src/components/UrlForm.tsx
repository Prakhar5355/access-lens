import React, { useState, FormEvent } from 'react';

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const DEMO_URLS = ['https://google.com', 'https://wikipedia.org', 'https://youtube.com'];

const UrlForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const val = url.trim();
    if (!val) { setError('Please enter a URL.'); return; }
    setError('');
    onSubmit(val);
  };

  return (
    <form className="audit-form" onSubmit={handleSubmit} noValidate>
      <div className={`input-row${error ? ' input-row--error' : ''}`}>
        <input
          type="url"
          className="url-input"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://example.com"
          aria-label="Website URL to audit"
          autoComplete="off"
          spellCheck={false}
          disabled={loading}
        />
        <button type="submit" className="audit-btn" disabled={loading}>
          {loading ? <span className="btn-spinner" aria-hidden="true" /> : 'Run Audit'}
        </button>
      </div>
      {error && <p className="input-error" role="alert">{error}</p>}

      <div className="demo-links">
        <span className="demo-label">Try an example:</span>
        {DEMO_URLS.map(u => (
          <button
            key={u}
            type="button"
            className="demo-link"
            onClick={() => { setUrl(u); onSubmit(u); }}
            disabled={loading}
          >
            {u.replace('https://', '')}
          </button>
        ))}
      </div>
    </form>
  );
};

export default UrlForm;
