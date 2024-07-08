export interface FormField {
  id: string;
  type: string;
  label: string;
  options?: string[];
  required?: boolean; // Optional boolean property
  multiple?: boolean; // Optional boolean property
}

export interface Form {
  id: string;
  title: string;
  fields: FormField[];
}
