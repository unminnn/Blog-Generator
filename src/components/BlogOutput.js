import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";

const BlogOutput = ({ content }) => {
  const blogContentRef = useRef(null);

  if (!content) return null;

  const handleDownloadPDF = () => {
    if (!blogContentRef.current) return;

    const element = blogContentRef.current;

    const opt = {
      margin: 10,
      filename: "blog-post.pdf",
      image: { type: "jpeg", quality: 0.8 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="blog-output">
      <div className="blog-header">
        <h2>Generated Blog</h2>
        <button
          className="download-btn"
          onClick={handleDownloadPDF}
          title="Download as PDF"
        >
          Download PDF
        </button>
      </div>
      <div className="blog-content" ref={blogContentRef}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogOutput;
