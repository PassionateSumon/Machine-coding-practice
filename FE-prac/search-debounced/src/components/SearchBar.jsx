import React, { useRef, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const debouncedRef = useRef(null); // to store the timeout ID

  const fetchData = async (value) => {
    if (!value) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://api.github.com/search/users?q=${value}`);
      const curr = await res.json();
      if(curr.items) setData(curr.items.slice(0, 10));
      setLoading(false);
    } catch (error) {
      setError(`Can't fetch the data`);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);

    if (debouncedRef.current) {
      clearTimeout(debouncedRef.current);
    }
    debouncedRef.current = setTimeout(() => {
      fetchData(e.target.value);
    }, 500);
  };

  const highlightedText = (text, highlight) => {
    if(!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((p, ind) => regex.test(p) ? <span key={ind} style={{color: "white"}}>{p}</span> : p )
  }

  return (
    <div className="container">
      <input
        type="text"
        className="ip"
        value={query}
        placeholder="Search GitHub users"
        onChange={handleChange}
      />
      {loading && <p className="load">Loading...</p>}
      {error && <p className="err">{error}</p>}
      {
        data.length > 0 && (
          <ul className="list-outside">
            {
              data.map(d => (
                <li key={d.id} className="list">
                  <img src={d.avatar_url} alt={d.login} width="30" height="30" />
                  <span>{highlightedText(d.login, query)}</span>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default SearchBar;
