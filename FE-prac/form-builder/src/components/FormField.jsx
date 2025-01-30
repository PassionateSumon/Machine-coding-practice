import React from "react";

const FormField = ({ index, field, setFields }) => {
  const handleUpdateField = (key, value) => {
    // console.log(value)
    setFields((prev) => {
      const newFields = [...prev];
      newFields[index] = { ...newFields[index], [key]: value };
      return newFields;
    });
  };
  const handleRemove = () => {
    setFields((prev) => prev?.filter((_, i) => i !== index));
  };
  return (
    <div className="mb-[10px] bg-[#292929] p-2 rounded-md mt-2 flex flex-col  ">
      <input
        type="text"
        className="border p-2 rounded mb-2 text-white "
        value={field.label}
        onChange={(e) => handleUpdateField("label", e.target.value)}
        placeholder="Label"
      />
      {field.type === "Text" && (
        <input
          type="text"
          className="border p-2 rounded mb-2 "
          value={field.placeholder}
          onChange={(e) => handleUpdateField("placeholder", e.target.value)}
          placeholder="Placeholder"
        />
      )}
      {field.type === "Dropdown" && (
        <textarea
          className="border p-2 rounded "
          value={field.options.join(",")}
          onChange={(e) =>
            handleUpdateField("options", e.target.value.split(","))
          }
          placeholder="Comma-separated options"
        />
      )}
      <button
        className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded mt-2 "
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
