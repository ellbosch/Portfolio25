import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfTextDocument, sfCheckmarkCircle, sfExclamationmarkCircle } from '@bradleyhodges/sfsymbols';

interface VerifyResponse {
  success: boolean;
  resumeUrl?: string;
  expiresIn?: number;
  error?: string;
}

type VerificationState = 'idle' | 'verifying' | 'verified' | 'error';

export default function Resume() {
  const [verificationState, setVerificationState] = useState<VerificationState>('idle');
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  const handleTurnstileSuccess = async (token: string) => {
    if (!apiEndpoint) {
      setVerificationState('error');
      setErrorMessage('API endpoint not configured. Please contact the site administrator.');
      return;
    }

    setVerificationState('verifying');
    setErrorMessage('');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data: VerifyResponse = await response.json();

      if (response.ok && data.success && data.resumeUrl) {
        setResumeUrl(data.resumeUrl);
        setVerificationState('verified');

        // Auto-open resume in new tab after verification
        window.open(data.resumeUrl, '_blank');
      } else {
        setVerificationState('error');
        setErrorMessage(data.error || 'Verification failed. Please try again.');
      }
    } catch (err) {
      console.error('Error verifying Turnstile token:', err);
      setVerificationState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const handleTurnstileError = () => {
    setVerificationState('error');
    setErrorMessage('Verification widget failed to load. Please refresh the page.');
  };

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!resumeUrl) return;

    setIsDownloading(true);

    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Elliot_Boschwitz_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setErrorMessage('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderContent = () => {
    switch (verificationState) {
      case 'idle':
        return (
          <>
            <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <SFIcon icon={sfTextDocument} size={40} className="text-white dark:text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Access Resume
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please verify you're human to view and download the resume.
            </p>

            <div className="flex justify-center mb-6">
              <Turnstile
                siteKey={turnstileSiteKey}
                onSuccess={handleTurnstileSuccess}
                onError={handleTurnstileError}
                options={{
                  theme: 'auto',
                  size: 'normal',
                }}
              />
            </div>
          </>
        );

      case 'verifying':
        return (
          <>
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <SFIcon icon={sfTextDocument} size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Verifying...
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please wait while we verify your request.
            </p>
          </>
        );

      case 'verified':
        return (
          <>
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SFIcon icon={sfCheckmarkCircle} size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Resume Access Granted
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your resume has opened in a new tab. If it didn't open automatically, use the buttons below.
            </p>

            <div className="flex flex-col gap-3">
              {resumeUrl && (
                <>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
                  >
                    <SFIcon icon={sfTextDocument} size={20} />
                    Open Resume
                  </a>

                  <a
                    href="#"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                  >
                    <SFIcon icon={sfTextDocument} size={20} />
                    {isDownloading ? 'Downloading...' : 'Download Resume'}
                  </a>
                </>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Link expires in 5 minutes for security.
              </p>
            </div>
          </>
        );

      case 'error':
        return (
          <>
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SFIcon icon={sfExclamationmarkCircle} size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Verification Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>

            <button
              onClick={() => {
                setVerificationState('idle');
                setErrorMessage('');
              }}
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
            >
              Try Again
            </button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
          {renderContent()}

          <Link
            to="/"
            className="inline-block mt-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
