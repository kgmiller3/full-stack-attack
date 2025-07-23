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
          <li key={key} style={{ marginBottom: "0.25rem" }}>
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
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            padding: "1rem",
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "2px solid #e2e8f0",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "0.25rem",
              }}
            >
              <i
                className="fas fa-search"
                style={{ marginRight: "0.5rem", color: "#667eea" }}
              ></i>
              {queryName}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "#718096",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i className="fas fa-newspaper"></i>
              <span>{articleCount} articles found</span>
              <span>•</span>
              <span>Showing {articles.length}</span>
            </div>
          </div>

          <button
            onClick={toggleDetails}
            className="btn btn-secondary btn-small"
          >
            <i className={`fas ${showDetails ? "fa-eye-slash" : "fa-eye"}`}></i>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showDetails && (
          <div
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              padding: "1rem",
              margin: "0 0 1rem 0",
              border: "2px solid #dee2e6",
              borderRadius: "8px",
              fontSize: "0.9rem",
              color: "#495057",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#343a40",
              }}
            >
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Query Details:
            </div>
            <ul
              style={{
                margin: "0",
                paddingLeft: "1.5rem",
                color: "#6c757d",
              }}
            >
              {formatQueryDetails(params.query)}
            </ul>
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {articles.map((item, idx) => {
          if (item) {
            if (item.title) {
              if (item.title === "[Removed]") {
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      background: "#f8d7da",
                      border: "1px solid #f5c6cb",
                      borderRadius: "8px",
                      color: "#721c24",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Article was removed
                  </div>
                );
              }

              let trimTitle = item.title.substring(0, 120);
              return (
                <article
                  key={idx}
                  style={{
                    background: "white",
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.05)";
                  }}
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <div style={{ marginBottom: "0.75rem" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1rem",
                        fontWeight: "600",
                        lineHeight: "1.4",
                        color: "#2d3748",
                        fontFamily: "Merriweather, serif",
                      }}
                    >
                      {trimTitle}
                      {item.title.length > 120 ? "..." : ""}
                    </h3>
                  </div>

                  {item.description && (
                    <p
                      style={{
                        margin: "0 0 1rem 0",
                        fontSize: "0.875rem",
                        color: "#718096",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.description.substring(0, 150)}
                      {item.description.length > 150 ? "..." : ""}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#a0aec0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {item.source && (
                        <>
                          <i className="fas fa-globe"></i>
                          <span>{item.source.name}</span>
                        </>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#667eea",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                      }}
                    >
                      <span>Read more</span>
                      <i className="fas fa-external-link-alt"></i>
                    </div>
                  </div>
                </article>
              );
            } else {
              return (
                <div
                  key={idx}
                  style={{
                    padding: "1rem",
                    background: "#f1f3f4",
                    border: "1px solid #dadce0",
                    borderRadius: "8px",
                    color: "#5f6368",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  <i
                    className="fas fa-file-alt"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  No title available
                </div>
              );
            }
          } else {
            return (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  background: "#f1f3f4",
                  border: "1px solid #dadce0",
                  borderRadius: "8px",
                  color: "#5f6368",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                <i
                  className="fas fa-exclamation-circle"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                No content available
              </div>
            );
          }
        })}
      </div>

      {articles.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "#718096",
          }}
        >
          <i
            className="fas fa-search"
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              display: "block",
              opacity: 0.3,
            }}
          ></i>
          <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            No articles found
          </div>
          <div style={{ fontSize: "0.9rem" }}>
            Try adjusting your search terms or creating a new query
          </div>
        </div>
      )}
    </div>
  );
}
