import React, { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';

interface DownloadAnimationProps {
  fileName: string;
  onDownload: () => void;
  className?: string;
  children: React.ReactNode;
}

const DownloadAnimation: React.FC<DownloadAnimationProps> = ({ 
  fileName, 
  onDownload, 
  className = '',
  children 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = () => {
    if (isDownloading || isComplete) return;
    
    setIsDownloading(true);
    onDownload();
    
    // Simulate download progress
    setTimeout(() => {
      setIsDownloading(false);
      setIsComplete(true);
      
      // Reset after showing completion
      setTimeout(() => {
        setIsComplete(false);
      }, 2000);
    }, 2500);
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={className}
      >
        {children}
      </button>

      {/* Download Animation Overlay */}
      {(isDownloading || isComplete) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl">
            <div className="text-center">
              {isDownloading ? (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-blue-600 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Downloading...</h3>
                  <p className="text-gray-600 mb-4">{fileName}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{
                      animation: 'progress 2.5s ease-in-out forwards'
                    }}></div>
                  </div>
                  
                  <p className="text-sm text-gray-500">Please wait while we prepare your file...</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Download Complete!</h3>
                  <p className="text-gray-600">{fileName}</p>
                  <p className="text-sm text-green-600 mt-2">File saved to your Downloads folder</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          20% { width: 15%; }
          40% { width: 35%; }
          60% { width: 60%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </>
  );
};

export default DownloadAnimation;