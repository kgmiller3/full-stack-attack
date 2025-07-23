export function SavedQueries(params) {
  function onSavedQueryClick(savedQuery) {
    params.onQuerySelect(savedQuery);
  }

  function getQueries() {
    return params.savedQueries.map((item, idx) => {
      let trimTitle = item.queryName.substring(0, 30);
      const isSelected = item.queryName === params.selectedQueryName;

      return (
        <li
          key={idx}
          onClick={() => onSavedQueryClick(item)}
          style={{
            padding: "0.75rem 1rem",
            margin: "0.5rem 0",
            background: isSelected
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "#f8f9fa",
            color: isSelected ? "white" : "#4a5568",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            border: isSelected ? "none" : "2px solid #e2e8f0",
            fontSize: "0.9rem",
            fontWeight: isSelected ? "500" : "400",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.target.style.background = "#edf2f7";
              e.target.style.borderColor = "#cbd5e0";
              e.target.style.transform = "translateX(4px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.target.style.background = "#f8f9fa";
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.transform = "translateX(0)";
            }
          }}
        >
          <i
            className={`fas ${isSelected ? "fa-check-circle" : "fa-bookmark"}`}
          ></i>
          <div>
            <div style={{ fontWeight: "500" }}>{trimTitle}</div>
            <div
              style={{
                fontSize: "0.8rem",
                opacity: 0.8,
                fontStyle: "italic",
              }}
            >
              "{item.q}"
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <div>
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
