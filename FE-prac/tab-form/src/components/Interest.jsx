import React from "react";

const Interest = ({ data, setData, err }) => {
  const { interests } = data;
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, name]
        : prev.interests.filter((i) => i !== name),
    }));
  };
  return (
    <div className="interest-container">
      <h3>Interests</h3>
      <div>
        <label className="int-label">
          <input
            type="checkbox"
            name="coding"
            checked={interests.includes("coding")}
            onChange={handleChange}
          />
          Coding
        </label>
      </div>

      <div>
        <label className="int-label">
          <input
            type="checkbox"
            name="cooking"
            checked={interests.includes("cooking")}
            onChange={handleChange}
          />
          Cooking
        </label>
      </div>

      <div>
        <label className="int-label">
          <input
            type="checkbox"
            name="dancing"
            checked={interests.includes("dancing")}
            onChange={handleChange}
          />
          Dancing
        </label>
      </div>

      <div>
        <label className="int-label">
          <input
            type="checkbox"
            name="chess-playing"
            checked={interests.includes("chess-playing")}
            onChange={handleChange}
          />
          Chess Playing
        </label>
      </div>

      <div>
        <label className="int-label">
          <input
            type="checkbox"
            name="travelling"
            checked={interests.includes("travelling")}
            onChange={handleChange}
          />
          Travelling
        </label>
      </div>

      <div>
        <label className="int-label">
          <input
            type="checkbox"
            name="studying"
            checked={interests.includes("studying")}
            onChange={handleChange}
          />
          Studying
        </label>
      </div>

      {err.interests && <span className="err">{err.interests}</span>}
    </div>
  );
};

export default Interest;
