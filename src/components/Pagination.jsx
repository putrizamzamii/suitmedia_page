import React from "react";
import "./Pagination.css"; 

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Jika total halaman <= maxVisiblePages, tampilkan semua
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
    
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pages = renderPageNumbers();

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        className={`nav-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="ellipsis">...</span>
          ) : (
            <button
              className={`page-button ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        className={`nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}