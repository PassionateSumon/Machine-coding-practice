import React from "react";

const Settings = ({ data, setData, err }) => {
  const { theme } = data;
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, theme: e.target.name }));
  };
  return (
    <div className="interest-container">
      <h3>Settings</h3>
      <div>
        <label className="int-label">
          <input
            type="radio"
            name="dark"
            checked={theme === "dark"}
            onChange={handleChange}
          />
          Dark
        </label>
      </div>
      <div>
        <label className="int-label">
          <input
            type="radio"
            name="light"
            checked={theme === "light"}
            onChange={handleChange}
          />
          Light
        </label>
      </div>
      {err.theme && <span className="err">{err.theme}</span>}
    </div>
  );
};

export default Settings;
