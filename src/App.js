import React, { useState } from "react";
import Header from "./components/Header";
import BlogForm from "./components/BlogForm";
import BlogOutput from "./components/BlogOutput";
import { generateBlog } from "./services/googleai";

const App = () => {
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateBlog = async (tone, length, topic) => {
    setLoading(true);
    setError(null);
    try {
      const content = await generateBlog(tone, length, topic);
      setBlogContent(content);
    } catch (err) {
      setError("Failed to generate blog content. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <BlogForm onGenerateBlog={handleGenerateBlog} loading={loading} />
        {error && <div className="error-message">{error}</div>}
        <BlogOutput content={blogContent} />
      </div>
    </>
  );
};

export default App;
