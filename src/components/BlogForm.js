import React, { useState } from "react";

const BlogForm = ({ onGenerateBlog }) => {
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onGenerateBlog(tone, length, topic);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="topic">Blog Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter the topic for your blog post"
          required
        />
      </div>
      <div>
        <label htmlFor="tone">Tone:</label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="humorous">Humorous</option>
          <option value="formal">Formal</option>
          <option value="informative">Informative</option>
        </select>
      </div>
      <div>
        <label htmlFor="length">Length:</label>
        <select
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
