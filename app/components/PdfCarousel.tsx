'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';

interface PdfCarouselProps {
  pdfUrl: string;
  title?: string;
  totalPages?: number; // Approximate page count for UI
}

/**
 * PDF Carousel Component
 * Displays a PDF with left/right navigation buttons to scroll through pages.
 * Uses iframe with hash navigation (#page=N) for page control.
 */
export default function PdfCarousel({ pdfUrl, title, totalPages = 10 }: PdfCarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const pdfUrlWithPage = `${pdfUrl}#page=${currentPage}`;

  return (
    <div style={containerStyle}>
      {/* Title */}
      {title && <h3 style={titleStyle}>{title}</h3>}

      {/* PDF Viewer Container */}
      <div style={viewerContainerStyle}>
        {/* Left Arrow Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={arrowButtonStyle(currentPage === 1)}
          aria-label="Previous page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* PDF Frame */}
        <div style={iframeContainerStyle}>
          <iframe
            src={pdfUrlWithPage}
            title={title || 'PDF Viewer'}
            style={iframeStyle}
            allowFullScreen
          />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={arrowButtonStyle(currentPage === totalPages)}
          aria-label="Next page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Page Indicator */}
      <div style={pageIndicatorStyle}>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: '24px 0',
};

const titleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  color: '#0a0f1f',
};

const viewerContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'center',
  width: '100%',
};

const arrowButtonStyle = (disabled: boolean): React.CSSProperties => ({
  background: disabled ? '#e5e7eb' : '#2e9e8e',
  color: disabled ? '#999' : '#ffffff',
  border: 'none',
  borderRadius: '8px',
  padding: '12px 16px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  flexShrink: 0,
  opacity: disabled ? 0.6 : 1,
});

const iframeContainerStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  aspectRatio: '8.5 / 11', // Standard letter/A4 ratio
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
  background: '#fff',
};

const pageIndicatorStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '14px',
  color: '#666',
  fontWeight: '500',
};
