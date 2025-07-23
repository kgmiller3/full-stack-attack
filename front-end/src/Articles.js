import { useState } from "react";

export function Articles(params) {
  let articles = params.data.articles ? params.data.articles : [];
  let queryName = params.query.queryName ? params.query.queryName : "na";
  let articleCount = params.data.totalResults ? params.data.totalResults : 0;
  const [showDetails, setShowDetails] = useState(false);

  function formatQueryDetails(query) {
    const details = [];
    for (const [key, value] of Object.entries(query)) {
      if (value && key !== "queryName") {
        details.push(
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        );
      }
    }
    return details;
  }

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        Query: {queryName}
        <br />
        Count: {articleCount}
        <br />
        <button
          onClick={toggleDetails}
          style={{
            fontSize: "12px",
            padding: "4px 8px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "3px",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        {showDetails && (
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "8px",
              margin: "8px 0",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <strong>Query Details:</strong>
            <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
              {formatQueryDetails(params.query)}
            </ul>
          </div>
        )}
      </div>
      <ol
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.4",
          paddingLeft: "20px",
        }}
      >
        {articles.map((item, idx) => {
          if (item) {
            if (item.title) {
              if (item.title === "[Removed]") {
                return (
                  <li
                    key={idx}
                    style={{
                      fontSize: "14px",
                      marginBottom: "8px",
                      color: "#999",
                    }}
                  >
                    Was Removed
                  </li>
                );
              }
              let trimTitle = item.title.substring(0, 100);
              return (
                <li
                  key={idx}
                  style={{
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#0066cc",
                      fontSize: "14px",
                      fontFamily: "Georgia, serif",
                      lineHeight: "1.3",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                  >
                    {trimTitle}
                    {item.title.length > 100 ? "..." : ""}
                  </a>
                </li>
              );
            } else {
              return (
                <li
                  key={idx}
                  style={{
                    fontSize: "14px",
                    marginBottom: "8px",
                    color: "#999",
                  }}
                >
                  No Title
                </li>
              );
            }
          } else {
            return (
              <li
                key={idx}
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  color: "#999",
                }}
              >
                No Item
              </li>
            );
          }
        })}
      </ol>
    </div>
  );
}
