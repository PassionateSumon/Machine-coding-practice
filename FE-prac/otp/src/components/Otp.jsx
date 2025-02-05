import React, { createRef, useEffect, useState } from "react";

const Otp = ({ box }) => {
  const dynamicArray = Array(box).fill("");
  const refs = Array(box)
    .fill(null)
    .map((_) => createRef());
  const [inputs, setInputs] = useState(dynamicArray);
  const [missing, setMissing] = useState(dynamicArray);
  const PIN = "1234";

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleInputChange = (e, ind) => {
    const { value } = e.target;
    if (!Number(value)) return;

    if (ind < box - 1) {
      refs[ind + 1].current.focus();
    }

    const newInputs = [...inputs];
    newInputs[ind] = value;
    setInputs(newInputs);

    setMissing((prev) => prev.filter((i) => i !== ind));
  };

  const handleKeyDown = (e, ind) => {
    if (e.key === "Backspace") {
      const copyInputs = [...inputs];
      copyInputs[ind] = "";
      setInputs(copyInputs);

      if (ind > 0) {
        refs[ind - 1].current.focus();
      }
    }
    if (e.key === "ArrowLeft" && ind > 0) {
      refs[ind - 1].current.focus();
    }
    if (e.key === "ArrowRight" && ind < box - 1) {
      refs[ind + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    const copiedValue = e.clipboardData.getData("Text");
    if (!Number(copiedValue) || copiedValue.length !== box) return;

    const finalInputs = copiedValue.split("");
    setInputs(finalInputs);
    refs[box - 1].current.focus();
  };

  const handleSubmit = () => {
    const missed = inputs
      .map((ip, ind) => {
        if (ip === "") return ind;
      })
      .filter((ind) => ind !== undefined);
    setMissing(missed);
    if (missing.length > 0) return;

    const enteredPin = inputs.join("");
    const matched = PIN === enteredPin;
    const msg = matched ? "Valid Pin" : "Invalid pin";
    alert(msg);
    setInputs(dynamicArray);
  };

  const handleReset = () => {
    setInputs(dynamicArray);
    setMissing(dynamicArray);
    refs[0].current.focus();
  };

  return (
    <div className="otp-con">
      <div className="otp-box">
        {Array(box)
          .fill("")
          .map((_, ind) => (
            <input
              ref={refs[ind]}
              key={ind}
              type={inputs[ind] ? "password" : "text"}
              value={inputs[ind]}
              maxLength="1"
              onKeyDown={(e) => handleKeyDown(e, ind)}
              onPaste={handlePaste}
              onFocus={(e) => (e.target.type = "text")}
              onBlur={(e) => (e.target.type = "password")}
              onChange={(e) => handleInputChange(e, ind)}
              className={missing.includes(ind) ? "error" : ""}
            />
          ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Otp;
