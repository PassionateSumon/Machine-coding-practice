import React from "react";

const Profile = ({ data, setData, err }) => {
  const { name, email, age } = data;
  const handleChange = (e, key) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  return (
    <div className="profile-container">
      <h3>Profile</h3>
      <div className="profile-input-wrapper-div">
        <label>
          Name
          <input
            type="text"
            className="profile-input"
            value={name}
            onChange={(e) => handleChange(e, "name")}
          />
        </label>
        {err.name && <span className="err">{err.name}</span>}
      </div>

      <div className="profile-input-wrapper-div">
        <label>
          Email
          <input
            type="email"
            className="profile-input"
            value={email}
            onChange={(e) => handleChange(e, "email")}
          />
        </label>
        {err.email && <span className="err">{err.email}</span>}
      </div>

      <div className="profile-input-wrapper-div">
        <label>Age
        <input
          type="number"
          className="profile-input"
          value={age}
          onChange={(e) => handleChange(e, "age")}
        />
        </label>
        {err.age && <span className="err">{err.age}</span>}
      </div>
    </div>
  );
};

export default Profile;
