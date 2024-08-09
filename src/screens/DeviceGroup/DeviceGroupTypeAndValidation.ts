import { store } from "../../utils/store";

export const deviceGroupTableHeader = [
  {
    name: "Device Group Name",
    field: "deviceGroupName",
  },
  {
    name: "IMEI Number",
    field: "imei",
  },
  {
    name: "Created By",
    field: "createdBy",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const insertDeviceGroupField = (data?: any) => {
  return {
    deviceGroupName: {
      value: data?.deviceGroupName ?? "",
      error: "",
    },
    imeiList: {
      value: data?.imeiList ?? "",
      error: "",
    },
    createdBy: {
      value: store?.getState().auth.userName,
      error: "",
    },
  } as any;
};

export const validateAddDeviceGroupForm = (
  deviceGroupFromFields: any,
  edit = false
) => {
  let isValid = true;
  let errors: any = { ...deviceGroupFromFields };
  if (!errors.deviceGroupName?.value) {
    errors.deviceGroupName.error = "Please enter Device Group Name";
    isValid = false;
  }
  if (!errors.imeiList?.value) {
    errors.imeiList.error = "Please select Imei";
    isValid = false;
  }
  return { isValid, errors };
};
