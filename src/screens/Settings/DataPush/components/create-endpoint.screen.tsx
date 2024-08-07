import React, { useEffect, useState } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import Toast from "./toast";
import {
  getEndpoints,
  toggleEndpointStatus,
  createEndpoint,
} from "./services/endpoint.services"; // Import the API functions

interface FormValues {
  convoyUrl: string;
  rateLimitDuration: string;
  webhookUrl: string;
  ownerId: string;
  supportEmail: string;
  name: string;
  projectId: string;
  disabled: boolean;
  secret: string;
  apiKey: string;
  rateLimit: string;
}

interface AuthValues {
  useName: string;
  password: string;
  tokenValue: string;
  basicAuthToken: string;
}

const initialFormValues: FormValues = {
  convoyUrl: process.env.REACT_APP_CONVOY_URL!,
  rateLimitDuration: "",
  webhookUrl: "",
  ownerId: process.env.REACT_APP_OWNER_ID!,
  supportEmail: "",
  name: "",
  projectId: "",
  disabled: false,
  secret: "",
  apiKey: "",
  rateLimit: "",
};

const initialAuthValues: AuthValues = {
  useName: "",
  password: "",
  tokenValue: "",
  basicAuthToken: "",
};

const Modal: React.FC<{
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  url: string;
  isPaused: boolean;
}> = ({ show, onClose, onSave, url, isPaused }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
        <p>
          Are you sure you want to {isPaused ? "resume" : "pause"} the data push
          to this URL?
        </p>
        <p className="text-blue-500">{url}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateEndpointForm: React.FC<{
  onSuccess: (data: {
    projectId: string;
    apiKey: string;
    endpointId: string;
  }) => void;
}> = ({ onSuccess }) => {
  const [authMethod, setAuthMethod] = useState("");
  const [authValues, setAuthValues] = useState<AuthValues>(initialAuthValues);
  const [endpoints, setEndpoints] = useState<any[]>([]);

  const [errors, setErrors] = useState<any>({});
  const [generatedToken, setGeneratedToken] = useState("");
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);

  useEffect(() => {
    fetchAllEndPoints();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const fetchAllEndPoints = async () => {
    try {
      const endpointsData = await getEndpoints(
        formValues?.projectId,
        formValues?.apiKey
      );
      setEndpoints(endpointsData);
    } catch (error: any) {
      // Toast?.error({
      //   message: error,
      // });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e?.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthMethod(e?.target?.value);
    setAuthValues(initialAuthValues); // Reset auth values on change
    setGeneratedToken("");
    setFormValues({ ...formValues, secret: "" });
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      authMethod: "",
      secret: "",
    }));
  };

  const handleAuthValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setAuthValues((prevState) => {
      const updatedValues = {
        ...prevState,
        [name]: value,
      };

      if (
        authMethod === "BasicAuth" &&
        updatedValues?.useName &&
        updatedValues?.password
      ) {
        const token = btoa(
          `${updatedValues?.useName}:${updatedValues?.password}`
        );
        updatedValues.basicAuthToken = `Basic ${token}`;
        setGeneratedToken(updatedValues?.basicAuthToken);
        setFormValues((prevValues) => ({
          ...prevValues,
          secret: updatedValues?.basicAuthToken,
        }));
      } else if (authMethod === "Bearer") {
        setFormValues((prevValues) => ({
          ...prevValues,
          secret: value,
        }));
      }

      return updatedValues;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      authentication: {
        api_key: {
          header_name: "Authorization",
          header_value: formValues?.secret,
        },
        type: "api_key",
      },
      is_disabled: formValues?.disabled,
      name: formValues?.name,
      support_email: formValues?.supportEmail,
      url: formValues?.webhookUrl, // Using the webhookUrl from form values
    };

    try {
      const response = await createEndpoint(
        formValues?.projectId,
        payload,
        formValues?.apiKey
      );
      if (response?.status) {
        // Toast.success({
        //   message: response?.message,
        // });
        const responseData = response.data;
        const apiKey = formValues.apiKey;
        onSuccess({
          projectId: responseData?.project_id,
          apiKey: apiKey,
          endpointId: responseData?.uid,
        });
        await fetchAllEndPoints();
      }
    } catch (error) {
      // Toast.error({
      //   message: error,
      // });
    }
  };

  const handleToggleClick = (endpoint: any) => {
    setSelectedEndpoint(endpoint);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedEndpoint(null);
  };

  const handleModalSave = async () => {
    if (!selectedEndpoint) return;

    try {
      const response = await toggleEndpointStatus(
        formValues?.projectId,
        selectedEndpoint?.uid,
        formValues?.apiKey
      );
      if (response?.status) {
        // Toast.success({
        //   message: response?.message,
        // });
        await fetchAllEndPoints(); // Fetch the updated endpoints after pausing/resuming
      }
    } catch (error: any) {
      // Toast.error({
      //   message: error.message || "An error occurred",
      // });
    } finally {
      handleModalClose();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Convoy Configuration Form</h2>
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {renderInputField(
          "Convoy URL",
          "convoyUrl",
          formValues,
          handleInputChange,
          errors
        )}
        {renderInputField(
          "Webhook URL",
          "webhookUrl",
          formValues,
          handleInputChange,
          errors
        )}
        {renderInputField(
          "Support Email",
          "supportEmail",
          formValues,
          handleInputChange,
          errors,
          "email"
        )}
        {renderInputField(
          "Name",
          "name",
          formValues,
          handleInputChange,
          errors
        )}
        {renderInputField(
          "Project ID",
          "projectId",
          formValues,
          handleInputChange,
          errors
        )}
        {renderSelectField(
          "Authentication",
          "authMethod",
          authMethod,
          handleAuthChange,
          errors,
          ["BasicAuth", "Bearer"]
        )}

        {authMethod === "BasicAuth" && (
          <div className="mt-4 space-y-4 col-span-2">
            {renderInputField(
              "Username",
              "useName",
              authValues,
              handleAuthValueChange,
              errors
            )}
            {renderInputField(
              "Password",
              "password",
              authValues,
              handleAuthValueChange,
              errors,
              "password"
            )}
          </div>
        )}

        {authMethod === "Bearer" && (
          <div className="mt-4 col-span-2">
            {renderInputField(
              "Token",
              "tokenValue",
              authValues,
              handleAuthValueChange,
              errors
            )}
            {generatedToken && (
              <div className="mt-4 p-2 border border-gray-300 rounded-md shadow-sm">
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Generated Token
                </label>
                <p className="break-all">{generatedToken}</p>
              </div>
            )}
          </div>
        )}

        {renderCheckboxField(
          "Disabled",
          "disabled",
          formValues,
          handleCheckboxChange
        )}
        {renderInputField(
          "Secret",
          "secret",
          formValues,
          handleInputChange,
          errors
        )}
        {renderInputField(
          "API Key",
          "apiKey",
          formValues,
          handleInputChange,
          errors
        )}
      </form>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 text-center bg-blue-500 text-white p-2 rounded"
        >
          Save Configuration
        </button>
      </div>
      {endpoints && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Endpoints:</h3>
          <ol className="list-decimal list-inside">
            {endpoints?.map((endpoint: any, index: any) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                {endpoint?.url}
                <label className="flex items-center cursor-pointer ml-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={endpoint?.status === "active"}
                      onChange={() => handleToggleClick(endpoint)}
                      className="sr-only"
                    />
                    <div
                      className={`block bg-gray-600 w-14 h-8 rounded-full ${
                        endpoint?.status === "active" ? "bg-green-500" : ""
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                        endpoint?.status === "active"
                          ? "transform translate-x-full"
                          : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    {endpoint?.status === "active" ? "Active" : "Paused"}
                  </span>
                </label>
              </li>
            ))}
          </ol>
        </div>
      )}

      <Modal
        show={modalVisible}
        onClose={handleModalClose}
        onSave={handleModalSave}
        url={selectedEndpoint?.url || ""}
        isPaused={selectedEndpoint?.status !== "active"}
      />
    </div>
  );
};

const renderInputField = (
  label: string,
  name: string,
  values: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: any,
  type: string = "text"
) => (
  <div>
    <label className="block text-gray-700">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={values[name]}
      onChange={handleChange}
      className="w-full mt-1 p-2 border rounded"
      placeholder={label}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
    )}
  </div>
);

const renderSelectField = (
  label: string,
  name: string,
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  errors: any,
  options: string[]
) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2 text-sm">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
    )}
  </div>
);

const renderCheckboxField = (
  label: string,
  name: string,
  values: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input
      type="checkbox"
      name={name}
      checked={values[name]}
      onChange={handleChange}
      className="mt-2"
    />
  </div>
);

export default CreateEndpointForm;
