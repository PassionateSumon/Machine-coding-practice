import { useState } from "react";
import "./App.css";
import FormPreview from "./components/FormPreview";
import FormBuilder from "./components/FormBuilder";

function App() {
  const [fields, setFields] = useState([]);
  const [preview, setPreview] = useState(false);
  return (
    <div className="min-h-screen bg-[#292929] text-white flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4 ">Form Builder</h1>
      {preview ? (
        <FormPreview fields={fields} setPreview={setPreview} />
      ) : (
        <FormBuilder
          fields={fields}
          setFields={setFields}
          setPreview={setPreview}
        />
      )}
    </div>
  );
}

export default App;
