import { QueryForm } from "./QueryForm";
import { Articles } from "./Articles";
import { useState, useEffect } from "react";
import { exampleQuery, exampleData } from "./data";
import { SavedQueries } from "./SavedQueries";
import { LoginForm } from "./LoginForm";
import cannedQueries from "./cannedQueries.json"; // Importing canned queries

export function NewsReader() {
  const [query, setQuery] = useState(exampleQuery); // latest query send to newsapi
  const [data, setData] = useState(exampleData); // current data returned from newsapi
  const [queryFormObject, setQueryFormObject] = useState({ ...exampleQuery });
  const [currentUser, setCurrentUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const urlNews = "/news";
  const urlQueries = "/queries";
  const urlUsersAuth = "/users/authenticate";

  const [savedQueries, setSavedQueries] = useState([{ ...exampleQuery }]);

  useEffect(() => {
    getNews(query);
  }, [query]);

  useEffect(() => {
    getQueryList();
  }, [login]);

  async function getQueryList() {
    if (currentUser === null) {
      // if no user is logged in, we cannot retrieve saved queries
      //   alert("Log in if you want to create new queries!");
      setSavedQueries(cannedQueries);

      return;
    }
    try {
      const response = await fetch(urlQueries);
      if (response.ok) {
        const data = await response.json();
        console.log("savedQueries has been retrieved: ");
        setSavedQueries(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  async function login() {
    if (currentUser !== null) {
      // logout
      setCurrentUser(null);
    } else {
      // login
      try {
        const response = await fetch(urlUsersAuth, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (response.status === 200) {
          setCurrentUser({ ...credentials });
          setCredentials({ user: "", password: "" });
          setQueryFormObject({
            queryName: "",
            q: "",
            language: "",
            pageSize: "",
          });
          getQueryList();
        } else {
          alert(
            "Error during authentication! " +
              credentials.user +
              "/" +
              credentials.password
          );
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setCurrentUser(null);
      }
    }
  }

  async function saveQueryList(savedQueries) {
    try {
      const response = await fetch(urlQueries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedQueries),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("savedQueries array has been persisted:");
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
  }

  function currentUserMatches(user) {
    if (currentUser) {
      if (currentUser.user) {
        if (currentUser.user === user) {
          return true;
        }
      }
    }
    return false;
  }

  function onFormSubmit(queryObject) {
    if (currentUser === null) {
      alert("Log in if you want to create new queries!");
      return;
    }
    if (savedQueries.length >= 3 && currentUserMatches("guest")) {
      alert(
        "guest users cannot submit new queries once saved query count is 3 or greater!"
      );
      return;
    }
    let newSavedQueries = [];
    newSavedQueries.push(queryObject);
    for (let query of savedQueries) {
      if (query.queryName !== queryObject.queryName) {
        newSavedQueries.push(query);
      }
    }
    console.log(JSON.stringify(newSavedQueries));
    saveQueryList(newSavedQueries);
    setSavedQueries(newSavedQueries);
    setQuery(queryObject);
  }

  async function getNews(queryObject) {
    if (queryObject.q) {
      try {
        const response = await fetch(urlNews, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryObject),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      setData({});
    }
  }

  return (
    <div className="main-container">
      <div className="login-container">
        <LoginForm
          login={login}
          credentials={credentials}
          currentUser={currentUser}
          setCredentials={setCredentials}
        />
      </div>

      {currentUser !== null && (
        <div className="card-modern">
          <div className="card-header">
            <i className="fas fa-search"></i>
            <span>Create Query</span>
          </div>
          <div className="card-content">
            <QueryForm
              currentUser={currentUser}
              setFormObject={setQueryFormObject}
              formObject={queryFormObject}
              submitToParent={onFormSubmit}
            />
          </div>
        </div>
      )}

      <div className="card-modern">
        <div className="card-header">
          <i className="fas fa-bookmark"></i>
          <span>Saved Queries</span>
        </div>
        <div className="card-content">
          <SavedQueries
            savedQueries={savedQueries}
            selectedQueryName={query.queryName}
            onQuerySelect={onSavedQuerySelect}
          />
        </div>
      </div>

      <div className="card-modern articles-card">
        <div className="card-header">
          <i className="fas fa-newspaper"></i>
          <span>Latest Articles</span>
        </div>
        <div className="articles-content">
          <Articles query={query} data={data} />
        </div>
      </div>
    </div>
  );
}
