export function QueryForm(params) {
  const handleChange = (event) => {
    let newQueryObject = { ...params.formObject };
    newQueryObject[event.target.name] = event.target.value;
    params.setFormObject(newQueryObject);
  };

  function onSubmitClick(event) {
    event.preventDefault();
    if (!params.formObject.queryName) {
      alert("please provide a name for the query!");
      return;
    }
    if (!params.formObject.q || params.formObject.q.length === 0) {
      alert("please provide some text for the query field!");
      return;
    }
    params.submitToParent(params.formObject);
  }

  function currentUserIsAdmin() {
    if (params.currentUser) {
      if (params.currentUser.user) {
        if (params.currentUser.user === "admin") {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div className="form-modern">
      <div className="form-group">
        <label htmlFor="queryName" className="form-label">
          <i className="fas fa-tag"></i> Query Name
        </label>
        <input
          type="text"
          className="form-input"
          id="queryName"
          name="queryName"
          placeholder="e.g., Tech News, Sports Updates"
          value={params.formObject.queryName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="q" className="form-label">
          <i className="fas fa-search"></i> Search Terms
        </label>
        <input
          type="text"
          className="form-input"
          id="q"
          name="q"
          placeholder="Enter keywords to search for..."
          value={params.formObject.q}
          onChange={handleChange}
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={onSubmitClick}>
        <i className="fas fa-paper-plane"></i>
        Create Query
      </button>

      <div className={`${currentUserIsAdmin() ? "visible" : "hidden"} mt-4`}>
        <div
          style={{
            background: "#f8f9fa",
            padding: "1rem",
            borderRadius: "8px",
            border: "2px dashed #dee2e6",
          }}
        >
          <div className="form-group">
            <label htmlFor="language" className="form-label">
              <i className="fas fa-globe"></i> Language
            </label>
            <select
              id="language"
              name="language"
              className="form-select"
              value={params.formObject.language}
              onChange={handleChange}
            >
              <option value="">All Languages</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pageSize" className="form-label">
              <i className="fas fa-list-ol"></i> Page Size
            </label>
            <input
              type="number"
              className="form-input"
              id="pageSize"
              name="pageSize"
              min={1}
              max={100}
              placeholder="Number of articles (1-100)"
              value={params.formObject.pageSize}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
