import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview(""); // Clear previous review
    try {
      const response = await axios.post(
        "https://code-reviewer-backend-coral.vercel.app/ai/get-review",
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      setReview(response.data);
    } catch (error) {
      console.error('Error:', error);
      setReview("⚠️ Error fetching review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Add this useEffect after your existing useEffect
  useEffect(() => {
    const preElements = document.querySelectorAll('.right pre');

    preElements.forEach(pre => {
      pre.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          pre.classList.add('copied');
          setTimeout(() => pre.classList.remove('copied'), 1000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }, [review]); // Add review as dependency to update listeners when review changes

  return (
    <div className="container">
      <main>
        {/* Left Section - Code Editor */}
        <div className="left">
          <div className="code">
            <Editor
              placeholder="Code Generator and Reviewer - Review, debug, optimize, and generate professional code for any request..."
              className="inscroll"
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={15}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                backgroundColor: "#0d0d2b",
                color: "#00ffcc",
                borderRadius: "10px",
                overflow: "auto"
                // boxShadow: "0 4px 10px rgba(0, 255, 204, 0.2)",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? "Processing..." : "Review & Generate Code"}
          </div>
        </div>

        {/* Right Section - Review Output */}
        <div className="right inscroll">
          {loading ? (
            <div className="loading-container">
            <div className="spinner"></div>
            <p>Reviewing & Generating Code...</p>
          </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
