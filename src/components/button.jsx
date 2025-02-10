import { useState } from "react";
// import { button } from "@/components/ui/button";

export default function InputToJson() {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([
      ...fields,
      { event_id: "", filter: "", num_of_filters: "", filters: [] },
    ]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const addFilter = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].filters.push({ filter: "", value: "" });
    updatedFields[index].num_of_filters = updatedFields[index].filters.length;
    setFields(updatedFields);
  };

  const updateFilter = (fieldIndex, filterIndex, key, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].filters[filterIndex][key] = value;
    setFields(updatedFields);
  };

  const handleSave = () => {
    console.log("Saving input to JSON:", fields);
    const formattedData = fields.reduce((acc, field, index) => {
      acc[index] = {
        event_id: field.event_id,
        filter: field.filter,
        num_of_filters: field.filters.length,
        ...field.filters.reduce((filters, f, i) => {
          filters[`filter${i + 1}`] = { filter: f.filter, value: f.value };
          return filters;
        }, {}),
      };
      return acc;
    }, {});
    
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formattedData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      {fields.map((field, index) => (
        <div key={index} className="border p-2 rounded">
          <input
            type="text"
            value={field.event_id}
            onChange={(e) => updateField(index, "event_id", e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Event ID"
          />
          <input
            type="text"
            value={field.filter}
            onChange={(e) => updateField(index, "filter", e.target.value)}
            className="border p-2 rounded w-full mt-2"
            placeholder="Filter (Y/N)"
          />
          {field.filters.map((f, filterIndex) => (
            <div key={filterIndex} className="mt-2">
              <input
                type="text"
                value={f.filter}
                onChange={(e) => updateFilter(index, filterIndex, "filter", e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Filter Field"
              />
              <input
                type="text"
                value={f.value}
                onChange={(e) => updateFilter(index, filterIndex, "value", e.target.value)}
                className="border p-2 rounded w-full mt-1"
                placeholder="Filter Value"
              />
            </div>
          ))}
          <button onClick={() => addFilter(index)} className="mt-2">Add Filter</button>
        </div>
      ))}
      <button onClick={addField} className="mt-4">Add Event</button>
      <button onClick={handleSave} className="mt-4">Save to JSON</button>
    </div>
  );
}
