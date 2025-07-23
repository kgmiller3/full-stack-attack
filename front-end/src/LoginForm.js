export function LoginForm(params) {
  const handleChange = (event) => {
    let newCredentials = { ...params.credentials };
    newCredentials[event.target.name] = event.target.value;
    params.setCredentials(newCredentials);
  };

  return (
    <div className="login-card">
      <div className="login-content">
        <div className="user-info">
          <div className="user-avatar">
            <i
              className={
                params.currentUser ? "fas fa-user" : "fas fa-user-slash"
              }
            ></i>
          </div>
          <span>
            {params.currentUser ? (
              <span>
                Welcome, <strong>{params.currentUser.user}</strong>
              </span>
            ) : (
              <span className="text-muted">Not logged in</span>
            )}
          </span>
        </div>

        <button
          onClick={params.login}
          className={`btn ${
            params.currentUser ? "btn-secondary" : "btn-primary"
          } btn-small`}
        >
          <i
            className={`fas ${
              params.currentUser ? "fa-sign-out-alt" : "fa-sign-in-alt"
            }`}
          ></i>
          {params.currentUser ? "Logout" : "Login"}
        </button>

        <div
          className={`${params.currentUser ? "hidden" : "visible"} form-modern`}
        >
          <div className="form-group">
            <label htmlFor="user" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-input"
              id="user"
              name="user"
              placeholder="Enter your username"
              value={params.credentials.user}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={params.credentials.password}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
