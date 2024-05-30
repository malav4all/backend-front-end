export const rolesTableHeader = [
  {
    name: "Role Name",
    field: "name",
  },
  {
    name: "Industry Type",
    field: "industryType",
  },
  {
    name: "Permission And Resources",
    field: "resources",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const initialRoleData = {
  name: "",
  industryType: "",
  description: "",
  resources: [{ name: "", permissions: [] }],
};

export const staticPredefinedRoles: any[] = [
  {
    name: "Contact",
    path: "contact",
    permissions: ["fetch", "add", "update", "delete", "upload"],
    tooltipContent:
      "Use this for Viewing, Adding, Uploading, Updating, and Deleting Contacts.",
  },
  {
    name: "Social",
    path: "social",
    permissions: ["fetch", "add", "delete"],
    tooltipContent:
      "Use this for Viewing, Adding, and Deleting Social Media Posts",
  },
];

export const campaignerPreDefinedRoleData: any[] = [
  {
    name: "Campaign",
    path: "campaign",
    permissions: ["fetch", "add", "update", "delete"],
  },
  {
    name: "Contact",
    path: "contact",
    permissions: ["fetch", "add", "update", "delete", "upload"],
  },
  {
    name: "Campaigner",
    path: "campaigner",
    permissions: ["fetch", "add", "update", "delete"],
  },
];

export const createRoleFormData = (roleDetails: any, edit: boolean) => {
  let roleFormData: any = {
    name: {
      value: roleDetails.name,
      error: "",
    },
    description: {
      value: roleDetails.description,
      error: "",
    },
    industryType: {
      value: edit ? roleDetails?.industryType?._id : roleDetails?.industryType,
      error: "",
    },
    resources: [],
  };

  roleDetails.resources.forEach((item: any) => {
    roleFormData.resources.push({
      name: {
        value: item.name,
        error: "",
      },
      permissions: {
        value: item.permissions,
        error: "",
      },
    });
  });

  return roleFormData;
};

export const roleFormValidation = (
  roleFormData: any,
  isAddResourceValidation: boolean
) => {
  let isValid = true;
  let errors = { ...roleFormData };

  if (!errors.name.value && !isAddResourceValidation) {
    isValid = false;
    errors.name.error = "Please enter a role name";
  }

  if (!errors.industryType.value && !isAddResourceValidation) {
    isValid = false;
    errors.industryType.error = "Please select industry type";
  }
  errors.resources.forEach((role: any) => {
    if (!role.name.value) {
      isValid = false;
      role.name.error = "Select a resource type";
    }
    if (role.permissions.value.length == 0) {
      isValid = false;
      role.permissions.error = "Select atleast one permission";
    }
  });

  return { isValid, errors };
};

export const getResourceObj = (predefindedResource?: any) => {
  return {
    name: {
      value: predefindedResource?.name ?? "",
      error: "",
    },
    industryType: predefindedResource?.industryType ?? "",
    description: predefindedResource?.description ?? "",
    permissions: {
      value: predefindedResource?.permissions ?? [],
      error: "",
    },
  };
};

export const mapFormDataToValues = (roleFormData: any) => {
  let roleData: any = {
    name: roleFormData?.name?.value,
    industryType: roleFormData.industryType?.value,
    description: roleFormData?.description?.value,
    resources: [],
  };

  roleFormData.resources.forEach((item: any) => {
    roleData.resources.push({
      name: item.name.value,
      permissions: item.permissions.value,
    });
  });

  return roleData;
};
