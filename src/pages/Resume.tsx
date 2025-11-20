import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Turnstile } from '@marsidev/react-turnstile';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfTextDocument } from '@bradleyhodges/sfsymbols';

export default function Resume() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Load and open PDF immediately on page load
  useEffect(() => {
    const openPDF = async () => {
      try {
        // Dynamic import to load PDF
        const pdfModule = await import('../assets/resume.pdf');
        const pdfPath = pdfModule.default;
        setPdfUrl(pdfPath);

        // Open PDF in new tab with native browser viewer
        window.open(pdfPath, '_blank');
      } catch (err) {
        console.error('Error loading PDF:', err);
      }
    };

    openPDF();
  }, []);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!pdfUrl) return;

    try {
      // Download PDF
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
            Your resume has opened in a new tab. If it didn't open automatically, use the button below.
          </p>

          <div className="flex flex-col gap-3">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                <SFIcon icon={sfTextDocument} size={20} />
                Open Resume
              </a>
            )}

            <a
              href="#"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              <SFIcon icon={sfTextDocument} size={20} />
              Download Resume
            </a>
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

/*
 * CAPTCHA CODE - PRESERVED FOR FUTURE BACKEND IMPLEMENTATION
 *
 * To re-enable CAPTCHA protection:
 * 1. Uncomment Turnstile import
 * 2. Add verification state back
 * 3. Replace useEffect with CAPTCHA verification flow
 * 4. Implement backend token validation
 *
 * Cloudflare Turnstile site keys:
 * - Testing (localhost): '1x00000000000000000000AA'
 * - Production: '0x4AAAAAACB5wZZBEC-BEapo' (elliotboschwitz.com)
 */
