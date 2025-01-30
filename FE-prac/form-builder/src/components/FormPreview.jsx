import React, { Fragment, useState } from "react";

const FormPreview = ({ fields, setPreview }) => {
  const [formData, setFormData] = useState({});
  const handleChange = (id, value) => {
    // console.log(id, value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    console.log(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
  };
  return (
    <div className="mt-[20px] bg-[#424141] p-7 rounded-2xl ">
      <h2 className="text-2xl font-bold mb-4 text-center ">Preview</h2>
      <form className="cursor-pointer mb-4 " onSubmit={handleSubmit}>
        {fields?.map((f) => (
          <div key={f.id} className="mb-3">
            <label className="block font-medium">{f.label}</label>
            {f.type === "Text" && (
              <input
                type="text"
                className="border p-2 rounded w-full"
                onChange={(e) => handleChange(f.id, e.target.value)}
                placeholder={f.placeholder}
              />
            )}
            {f.type === "Checkbox" && (
              <input
                type="checkbox"
                className="ml-2"
                onChange={(e) => handleChange(f.id, e.target.checked)}
                placeholder={f.placeholder}
              />
            )}
            {f.type === "Dropdown" && (
              <select
                className="cursor-pointer border p-2 rounded w-full"
                onChange={(e) => handleChange(f.id, e.target.value)}
                placeholder={f.placeholder}
              >
                {f.options?.map((op, ind) => (
                  <Fragment key={op}>
                    {ind === 0 && (
                      <option className="cursor-pointer text-black">
                        Not selected
                      </option>
                    )}
                    <option className="cursor-pointer text-black" value={op}>
                      {op}
                    </option>
                  </Fragment>
                ))}
              </select>
            )}
          </div>
        ))}
        <button
          className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded w-full mt-3 "
          type="submit"
        >
          Submit
        </button>
      </form>
      <button
        className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded w-full"
        onClick={() => setPreview(false)}
      >
        Back
      </button>
    </div>
  );
};

export default FormPreview;
