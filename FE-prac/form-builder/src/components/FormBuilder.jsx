import React, { useState } from "react";
import FormField from "./FormField";

const fieldTypes = ["Text", "Checkbox", "Dropdown"];
const FormBuilder = ({ fields, setFields, setPreview }) => {
  const [newField, setNewField] = useState("Text");
  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type: newField,
        label: "",
        placeholder: "",
        options: [],
      },
    ]);
  };
  return (
    <div className="mt-[20px] bg-white p-4 shadow-lg rounded-lg w-full max-w-md ">
      <select
        className="border p-2 rounded-md mb-2 w-full bg-[#292929] text-center cursor-pointer "
        onChange={(e) => setNewField(e.target.value)}
      >
        {fieldTypes?.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full "
        onClick={handleAddField}
      >
        Add Field
      </button>
      <div className="mt-4">
        {fields?.map((f, i) => (
          <FormField key={i} index={i} field={f} setFields={setFields} />
        ))}
      </div>
      <button
        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded w-full "
        onClick={() => setPreview(true)}
      >
        Preview
      </button>
    </div>
  );
};

export default FormBuilder;
