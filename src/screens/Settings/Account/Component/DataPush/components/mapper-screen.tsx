import React, { useEffect, useState } from "react";
import { validateMapperForm } from "./formValidation/convoyValidation";
import { collectionOptions, Track, Trip } from "./helper/formFieldsConfig";
import { RiDeleteBin6Line } from "react-icons/ri";
import Toast from "./toast";
import {
  getAllDataFeeds,
  saveDataFeed,
  updateDataFeedByAccount,
} from "./services/mapper.services"; // Import the API functions

interface DataFeed {
  _id: string;
  account: string[];
  convoyUrl: string;
  convoyApiKey: string;
  collectionName: string[];
  convoyProjectId: string;
  convoyEndpointId: string;
  pushData: string;
  tripDataMapper: Record<string, { enabled: boolean; newKey: string }>;
  trackDataMapper: Record<string, { enabled: boolean; newKey: string }>;
  addOnFields: Record<string, { enabled: boolean; newKey: string }>;
  dynamicData: any;
}

interface MapperValues {
  projectId: string;
  apiKey: string;
  endpointId: string;
}

const initialFormValues = {
  _id: "",
  projectId: "",
  apiKey: "",
  endpointId: "",
  accountId: "",
  collectionName: "",
  pushData: "allTimes",
  wrapper: "",
};

const MapperScreen: React.FC<{ mapperValues: MapperValues }> = ({
  mapperValues,
}) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [dataFeeds, setDataFeeds] = useState<DataFeed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDataFeed, setSelectedDataFeed] = useState<DataFeed | null>(
    null
  );
  const [checkedFields, setCheckedFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [fixedFieldValues, setFixedFieldValues] = useState<{
    [key: string]: string;
  }>({});
  const [savedAddOnFields, setSavedAddOnFields] = useState<{
    [key: string]: string;
  }>({});
  const [newFields, setNewFields] = useState<string[]>([""]);
  const [addOnFieldValues, setAddOnFieldValues] = useState<{
    [key: string]: string;
  }>({});
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...mapperValues,
    }));
  }, [mapperValues]);

  const fetchData = async () => {
    try {
      const data = await getAllDataFeeds();
      setDataFeeds(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dataFeed: any, _id: string) => {
    setSelectedDataFeed(dataFeed);
    setFormValues({
      _id,
      projectId: dataFeed.convoyProjectId,
      apiKey: dataFeed.convoyApiKey,
      endpointId: dataFeed.convoyEndpointId,
      accountId: dataFeed.account?.join(", "),
      collectionName: dataFeed.collectionName[0],
      pushData: dataFeed.pushData,
      wrapper: "",
    });
    setCheckedFields(
      Object.keys(dataFeed.tripDataMapper).reduce((acc, key) => {
        acc[key] = dataFeed.tripDataMapper[key].enabled;
        return acc;
      }, {} as { [key: string]: boolean })
    );
    setFixedFieldValues(
      Object.keys(dataFeed.tripDataMapper).reduce((acc, key) => {
        acc[key] = dataFeed.tripDataMapper[key].newKey;
        return acc;
      }, {} as { [key: string]: string })
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
    }));
  };

  const handleCheckboxChange = (field: string) => {
    setCheckedFields((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleFixedFieldChange = (field: string, value: string) => {
    setFixedFieldValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddOnFieldChange = (
    index: number,
    type: number,
    value: string
  ) => {
    const keyField = `addOnField${index + 1}-1`;
    const valueField = `addOnField${index + 1}-2`;

    setAddOnFieldValues((prevState) => ({
      ...prevState,
      [type === 0 ? keyField : valueField]: value,
    }));
  };

  const handleSaveAddOnField = (index: number) => {
    const keyField = `addOnField${index + 1}-1`;
    const valueField = `addOnField${index + 1}-2`;

    if (addOnFieldValues[keyField] && addOnFieldValues[valueField]) {
      setSavedAddOnFields((prevState) => ({
        ...prevState,
        [addOnFieldValues[keyField]]: addOnFieldValues[valueField],
      }));
      setAddOnFieldValues((prevState) => {
        const newValues = { ...prevState };
        delete newValues[keyField];
        delete newValues[valueField];
        return newValues;
      });
      setNewFields((prevState) => prevState.filter((_, i) => i !== index));
    }
  };

  const handleDeleteAddOnField = (key: string) => {
    setSavedAddOnFields((prevState) => {
      const newFields = { ...prevState };
      delete newFields[key];
      return newFields;
    });
  };

  const handleAddNewField = () => {
    setNewFields((prevState) => [...prevState, ""]);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      pushData: e.target.value,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      pushData: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateMapperForm(formValues);
    setErrors(errors);
    if (!isValid) {
      return;
    }

    const accountIdArray = formValues.accountId
      .split(",")
      .map((id) => id.trim());
    const tripDataMapper = createDataMapper(
      Trip,
      checkedFields,
      fixedFieldValues
    );
    const trackDataMapper = createDataMapper(
      Track,
      checkedFields,
      fixedFieldValues
    );
    const addOnField = createAddOnFields(savedAddOnFields);

    const payload = {
      account: accountIdArray,
      convoyUrl: process.env.REACT_APP_CONVOY_URL,
      convoyApiKey: formValues.apiKey,
      wrapper: formValues.wrapper,
      collectionName: [formValues.collectionName],
      convoyProjectId: formValues.projectId,
      convoyEndpointId: formValues.endpointId,
      pushData: formValues.pushData,
      tripDataMapper,
      trackDataMapper,
      addOnFields: addOnField,
    };

    try {
      const result = await saveDataFeed(payload);
      Toast.success({ message: result.message });
      resetForm();
      await fetchData();
    } catch (error: any) {
      Toast.error({ message: error.message });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDataFeed) {
      return;
    }

    const { isValid, errors } = validateMapperForm(formValues);
    setErrors(errors);
    if (!isValid) {
      return;
    }

    const accountIdArray = formValues.accountId
      .split(",")
      .map((id) => id.trim());
    const tripDataMapper = createDataMapper(
      Trip,
      checkedFields,
      fixedFieldValues
    );
    const trackDataMapper = createDataMapper(
      Track,
      checkedFields,
      fixedFieldValues
    );
    const addOnField = createAddOnFields(savedAddOnFields);

    const payload = {
      id: formValues._id,
      updateData: {
        account: accountIdArray,
        convoyUrl: process.env.REACT_APP_CONVOY_URL,
        convoyApiKey: formValues.apiKey,
        collectionName: [formValues.collectionName],
        convoyProjectId: formValues.projectId,
        wrapper: formValues.wrapper,
        convoyEndpointId: formValues.endpointId,
        pushData: formValues.pushData,
        tripDataMapper,
        trackDataMapper,
        addOnFields: addOnField,
      },
    };

    try {
      const result = await updateDataFeedByAccount(payload);
      Toast.success({ message: result.message });
      resetForm();
      await fetchData();
      window.location.reload();
    } catch (error: any) {
      Toast.error({ message: error.message });
    }
  };

  const createDataMapper = (
    data: Record<string, string>,
    checkedFields: { [key: string]: boolean },
    fixedFieldValues: { [key: string]: string }
  ) => {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = {
        enabled: !!checkedFields[key],
        newKey: checkedFields[key] ? fixedFieldValues[key] || data[key] : key,
      };
      return acc;
    }, {} as { [key: string]: { enabled: boolean; newKey: string } });
  };

  const createAddOnFields = (savedAddOnFields: { [key: string]: string }) => {
    return Object.keys(savedAddOnFields).reduce((acc, key) => {
      acc[key] = {
        enabled: true,
        newKey: savedAddOnFields[key],
      };
      return acc;
    }, {} as { [key: string]: { enabled: boolean; newKey: string } });
  };

  const resetForm = () => {
    setFormValues(initialFormValues);
    setCheckedFields({});
    setFixedFieldValues({});
    setSavedAddOnFields({});
    setNewFields([""]);
    setAddOnFieldValues({});
    setSelectedDataFeed(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mapper Screen</h2>
      <form
        className="space-y-6"
        onSubmit={selectedDataFeed ? handleUpdate : handleSubmit}
      >
        <div className="flex gap-4">
          {renderInputField(
            "Convoy Project ID",
            "projectId",
            formValues,
            handleInputChange,
            errors
          )}
          {renderInputField(
            "Convoy API Key",
            "apiKey",
            formValues,
            handleInputChange,
            errors
          )}
          {renderInputField(
            "Convoy Endpoint ID",
            "endpointId",
            formValues,
            handleInputChange,
            errors
          )}
          {renderInputField(
            "Account ID",
            "accountId",
            formValues,
            handleInputChange,
            errors,
            "Account ID (comma separated)"
          )}
          {renderSelectField(
            "Collection Name",
            "collectionName",
            formValues,
            handleSelectChange,
            errors,
            collectionOptions
          )}
          {renderSelectField(
            "Wrapper",
            "wrapper",
            formValues,
            handleSelectChange,
            errors,
            ["array", "object"]
          )}
          {renderRadioGroup(
            "Push Data",
            "pushData",
            formValues,
            handleRadioChange,
            errors,
            ["allTimes", "duringTrip"]
          )}
        </div>
        <div className="flex gap-4">
          {renderFieldMapping(
            "Map Fixed Fields (Track)",
            Track,
            checkedFields,
            fixedFieldValues,
            handleCheckboxChange,
            handleFixedFieldChange
          )}
          {renderFieldMapping(
            "Map Fixed Fields (Trip)",
            Trip,
            checkedFields,
            fixedFieldValues,
            handleCheckboxChange,
            handleFixedFieldChange
          )}
          {renderAddOnFields(
            savedAddOnFields,
            newFields,
            addOnFieldValues,
            handleAddOnFieldChange,
            handleSaveAddOnField,
            handleDeleteAddOnField,
            handleAddNewField
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 text-center bg-blue-500 text-white p-2 rounded"
          >
            {selectedDataFeed ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4 mt-8">Data Feeds</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <DataFeedsTable dataFeeds={dataFeeds} handleEdit={handleEdit} />
      )}
    </div>
  );
};

const renderInputField = (
  label: string,
  name: string,
  formValues: any,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: any,
  placeholder?: string
) => (
  <div className="flex-1">
    <label className="block text-gray-700">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name={name}
      value={formValues[name]}
      onChange={handleInputChange}
      className="w-full mt-1 p-2 border rounded"
      placeholder={placeholder || label}
    />
    {errors[`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`] && (
      <p className="text-red-500 text-xs mt-1">
        {errors[`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`]}
      </p>
    )}
  </div>
);

const renderSelectField = (
  label: string,
  name: string,
  formValues: any,
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  errors: any,
  options: string[]
) => (
  <div className="flex-1">
    <label className="block text-gray-700">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      value={formValues[name]}
      onChange={handleSelectChange}
      className="w-full mt-1 p-2 border rounded"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {errors[`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`] && (
      <p className="text-red-500 text-xs mt-1">
        {errors[`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`]}
      </p>
    )}
  </div>
);

const renderRadioGroup = (
  label: string,
  name: string,
  formValues: any,
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: any,
  options: string[]
) => (
  <div className="flex-1 flex flex-col">
    <label className="block text-gray-700">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <div className="flex mt-1">
      {options.map((option) => (
        <label key={option} className="mr-4 flex items-center">
          <input
            type="radio"
            name={name}
            value={option}
            checked={formValues[name] === option}
            onChange={handleRadioChange}
            className="mr-1"
          />
          {option}
        </label>
      ))}
    </div>
    {errors[`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`] && (
      <p className="text-red-500 text-xs mt-1">
        {errors[`mapper${name.charAt(0).toUpperCase() + name.slice(1)}`]}
      </p>
    )}
  </div>
);

const renderFieldMapping = (
  title: string,
  fields: Record<string, string>,
  checkedFields: { [key: string]: boolean },
  fixedFieldValues: { [key: string]: string },
  handleCheckboxChange: (field: string) => void,
  handleFixedFieldChange: (field: string, value: string) => void
) => (
  <div className="flex-1 overflow-y-auto" style={{ maxHeight: "500px" }}>
    <div className="mb-6">
      <label className="text-left block text-gray-700 font-medium mb-2 text-sm">
        {title}
      </label>
      <div className="grid grid-cols-12 gap-4">
        {Object.keys(fields).map((field) => (
          <div key={field} className="col-span-12 flex items-center">
            <input
              type="checkbox"
              id={field}
              className="mr-2"
              checked={!!checkedFields[field]}
              onChange={() => handleCheckboxChange(field)}
            />
            <label
              htmlFor={field}
              className="text-gray-700 text-left text-sm w-1/3"
            >
              {field}
            </label>
            <input
              type="text"
              className="w-2/3 block py-1 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={`Enter new key for ${field}`}
              value={fixedFieldValues[field] || ""}
              disabled={!checkedFields[field]}
              onChange={(e) => handleFixedFieldChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const renderAddOnFields = (
  savedAddOnFields: { [key: string]: string },
  newFields: string[],
  addOnFieldValues: { [key: string]: string },
  handleAddOnFieldChange: (index: number, type: number, value: string) => void,
  handleSaveAddOnField: (index: number) => void,
  handleDeleteAddOnField: (key: string) => void,
  handleAddNewField: () => void
) => (
  <div className="flex-1 overflow-y-auto" style={{ maxHeight: "500px" }}>
    <div className="mb-6">
      <label className="text-left block text-gray-700 font-medium mb-2 text-sm">
        Add-On Fields
      </label>
      <div className="grid grid-cols-12 gap-4">
        {Object.keys(savedAddOnFields).map((key) => (
          <div key={key} className="col-span-12 flex items-center space-x-2">
            <input
              type="text"
              value={key}
              readOnly
              className="block w-1/2 py-1 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              value={savedAddOnFields[key]}
              readOnly
              className="block w-1/2 py-1 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => handleDeleteAddOnField(key)}
              className="inline-flex justify-center py-2 text-md px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ))}
        {newFields.map((_, index) => {
          const keyField = `addOnField${index + 1}-1`;
          const valueField = `addOnField${index + 1}-2`;
          return (
            <div
              key={index}
              className="col-span-12 flex items-center space-x-2"
            >
              <input
                type="text"
                value={addOnFieldValues[keyField] || ""}
                className="block w-1/2 py-1 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Key"
                onChange={(e) =>
                  handleAddOnFieldChange(index, 0, e.target.value)
                }
              />
              <input
                type="text"
                value={addOnFieldValues[valueField] || ""}
                className="block w-1/2 py-1 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Value"
                onChange={(e) =>
                  handleAddOnFieldChange(index, 1, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => handleSaveAddOnField(index)}
                className="inline-flex justify-center py-1 px-3 text-sm border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={handleAddNewField}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add New Field
      </button>
    </div>
  </div>
);

const DataFeedsTable: React.FC<{
  dataFeeds: any;
  handleEdit: (dataFeed: any, _id: string) => void;
}> = ({ dataFeeds, handleEdit }) => (
  <table className="min-w-full bg-white border-collapse border border-gray-200">
    <thead>
      <tr>
        <th className="border border-gray-300 py-2 px-4">Account</th>
        <th className="border border-gray-300 py-2 px-4">Collection Name</th>
        <th className="border border-gray-300 py-2 px-4">Convoy Project ID</th>
        <th className="border border-gray-300 py-2 px-4">Convoy Endpoint ID</th>
        <th className="border border-gray-300 py-2 px-4">Push Data</th>
        <th className="border border-gray-300 py-2 px-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {dataFeeds.map((item: any) => (
        <tr key={item._id}>
          <td className="border border-gray-300 py-2 px-4">
            {item?.data?.account?.join(", ")}
          </td>
          <td className="border border-gray-300 py-2 px-4">
            {item?.data.collectionName?.join(", ")}
          </td>
          <td className="border border-gray-300 py-2 px-4">
            {item?.data?.convoyProjectId}
          </td>
          <td className="border border-gray-300 py-2 px-4">
            {item?.data?.convoyEndpointId}
          </td>
          <td className="border border-gray-300 py-2 px-4">{item.pushData}</td>
          <td className="border border-gray-300 py-2 px-4">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(item.data, item._id)}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MapperScreen;
