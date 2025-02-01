import React, { useState } from "react";
import Profile from "./Profile";
import Interest from "./Interest";
import Settings from "./Settings";

const TabFormView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [err, setErr] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    interests: [],
    theme: "",
  });
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validation: () => {
        const { name, email, age } = data;
        const errors = {};
        if (!name || name.length < 3) {
          errors.name = "Name is not valid";
        }
        if (!email || !email.split("").includes("@")) {
          errors.email = "Email is not valid";
        }
        if (!age || age < 18) {
          errors.age = "Age is not valid";
        }
        setErr(errors);
        return errors.name || errors.email || errors.age ? false : true;
      },
    },
    {
      name: "Interest",
      component: Interest,
      validation: () => {
        const { interests } = data;
        const errors = {};
        if (interests.length === 0) {
          errors.interests = "You must have selected at least one interest!";
        }
        setErr(errors);
        return errors.interests ? false : true;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validation: () => {
        const { theme } = data;
        const errors = {};
        if (theme.length < 1) {
          errors.theme = "You must have selected a theme!";
        }
        setErr(errors);
        return errors.theme ? false : true;
      },
    },
  ];

  const CurrActiveTabComponent = tabs[activeTab].component;

  const handlePrev = () => {
    if (tabs[activeTab].validation() === true) {
      setActiveTab((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (tabs[activeTab].validation() === true) {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // API call
    if (tabs[activeTab].validation() === true) {
      console.log(data);
      setData({
        name: "",
        email: "",
        age: "",
        interests: [],
        theme: "",
      });
    }
  };

  return (
    <div className="tab-form-view">
      <h1 className="heading">Multi Level Form</h1>
      <div>
        {tabs.map((tab, ind) => (
          <button
            className="tabs"
            key={ind}
            onClick={() => {
              if (ind === activeTab) return;
              //   console.log(ind, activeTab)
              if (tabs[activeTab].validation() === true) {
                setActiveTab(ind);
              }
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {<CurrActiveTabComponent data={data} setData={setData} err={err} />}
      </div>
      <div className="bottom-buttons">
        {activeTab > 0 && (
          <button className="btn" onClick={handlePrev}>
            Prev
          </button>
        )}
        {activeTab < tabs.length - 1 && (
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        )}
        {tabs[activeTab].name === tabs[tabs.length - 1].name && (
          <button className="btn" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TabFormView;
