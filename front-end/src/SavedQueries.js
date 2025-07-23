export function SavedQueries(params) {
  function onSavedQueryClick(savedQuery) {
    params.onQuerySelect(savedQuery);
  }

  function onResetClick() {
    params.onResetQueries();
  }

  function getQueries() {
    return params.savedQueries.map((item, idx) => {
      let trimTitle = item.queryName.substring(0, 30);
      const isSelected = item.queryName === params.selectedQueryName;

      // Format query properties for display
      const formatQueryProperties = (query) => {
        const properties = [];

        // Search term
        if (query.q) {
          properties.push({
            label: "Search",
            value: `"${query.q}"`,
            icon: "fa-search",
          });
        }

        // Language
        if (query.language) {
          const languageMap = {
            en: "🇺🇸 English",
            es: "🇪🇸 Spanish",
            fr: "🇫🇷 French",
            de: "🇩🇪 German",
          };
          properties.push({
            label: "Language",
            value: languageMap[query.language] || query.language,
            icon: "fa-globe",
          });
        }

        // Page size
        if (query.pageSize) {
          properties.push({
            label: "Articles",
            value: `${query.pageSize} max`,
            icon: "fa-list-ol",
          });
        }

        return properties;
      };

      const queryProperties = formatQueryProperties(item);

      return (
        <li
          key={idx}
          onClick={() => onSavedQueryClick(item)}
          style={{
            padding: "1rem 1.25rem",
            margin: "0.75rem 0",
            background: isSelected
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "#f8f9fa",
            color: isSelected ? "white" : "#4a5568",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            border: isSelected ? "none" : "2px solid #e2e8f0",
            fontSize: "0.9rem",
            fontWeight: isSelected ? "500" : "400",
            boxShadow: isSelected
              ? "0 4px 12px rgba(102, 126, 234, 0.3)"
              : "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.background = "#edf2f7";
              e.currentTarget.style.borderColor = "#cbd5e0";
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.background = "#f8f9fa";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
            }
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <div style={{ marginTop: "0.25rem" }}>
              <i
                className={`fas ${
                  isSelected ? "fa-check-circle" : "fa-bookmark"
                }`}
                style={{ fontSize: "1.1rem" }}
              ></i>
            </div>

            <div style={{ flex: 1 }}>
              {/* Query Name - Large and Bold */}
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  lineHeight: "1.3",
                }}
              >
                {trimTitle}
              </div>

              {/* Query Properties - Smaller, Non-bold */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  opacity: isSelected ? 0.9 : 0.75,
                }}
              >
                {queryProperties.map((prop, propIdx) => (
                  <div
                    key={propIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.8rem",
                      fontWeight: "400",
                    }}
                  >
                    <i
                      className={`fas ${prop.icon}`}
                      style={{
                        width: "12px",
                        fontSize: "0.75rem",
                        opacity: 0.7,
                      }}
                    ></i>
                    <span style={{ fontWeight: "500" }}>{prop.label}:</span>
                    <span>{prop.value}</span>
                  </div>
                ))}

                {queryProperties.length === 0 && (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                      opacity: 0.6,
                    }}
                  >
                    <i
                      className="fas fa-info-circle"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Basic query settings
                  </div>
                )}
              </div>
            </div>

            {isSelected && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  padding: "0.25rem",
                  marginTop: "0.25rem",
                }}
              >
                <i
                  className="fas fa-arrow-right"
                  style={{ fontSize: "0.8rem" }}
                ></i>
              </div>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <div>
      {/* Reset button - only show when user is logged in and there are saved queries */}
      {params.currentUser &&
        params.savedQueries &&
        params.savedQueries.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={onResetClick}
              className="btn btn-secondary btn-small"
              style={{
                width: "100%",
                backgroundColor: "#dc3545",
                color: "white",
                border: "2px solid #dc3545",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c82333";
                e.target.style.borderColor = "#c82333";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#dc3545";
                e.target.style.borderColor = "#dc3545";
              }}
            >
              <i
                className="fas fa-trash-alt"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Reset Query List
            </button>
          </div>
        )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {params.savedQueries && params.savedQueries.length > 0 ? (
          getQueries()
        ) : (
          <li
            style={{
              padding: "2rem 1rem",
              textAlign: "center",
              color: "#718096",
              fontStyle: "italic",
            }}
          >
            <i
              className="fas fa-bookmark"
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                display: "block",
              }}
            ></i>
            No Saved Queries Yet!
            <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Create your first query to get started
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
