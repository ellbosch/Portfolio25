import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfTextDocument } from '@bradleyhodges/sfsymbols';

export default function Resume() {
  const [verified, setVerified] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Cloudflare Turnstile test site key (for development)
  // For production, get your own key from: https://dash.cloudflare.com/
  const TURNSTILE_SITE_KEY = '1x00000000000000000000AA';

  const handleCaptchaSuccess = (token: string) => {
    console.log('CAPTCHA verified:', token);
    setVerified(true);
    // Obfuscated PDF loading - only load after verification
    loadPDF();
  };

  const loadPDF = async () => {
    try {
      // Dynamic import to obfuscate PDF path from source
      const pdfModule = await import('../assets/resume.pdf');
      setPdfUrl(pdfModule.default);
    } catch (err) {
      console.error('Error loading PDF:', err);
    }
  };

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!pdfUrl) return;

    try {
      // Obfuscated download - generate blob URL only on click
      const response = await fetch(pdfUrl);
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
      alert('Failed to download resume. Please try again.');
    }
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <SFIcon icon={sfTextDocument} size={40} className="text-white dark:text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Resume
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please verify you're human to view my resume
            </p>

            {/* Cloudflare Turnstile CAPTCHA */}
            <div className="flex justify-center mb-6">
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={handleCaptchaSuccess}
                options={{
                  theme: 'auto',
                  size: 'normal',
                }}
              />
            </div>

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Resume
          </h1>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
            >
              <SFIcon icon={sfTextDocument} size={20} />
              Download Resume
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        {pdfUrl && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <iframe
              src={pdfUrl}
              className="w-full h-[800px] border-0"
              title="Resume PDF"
            />
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
