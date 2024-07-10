export interface FormField {
  id: string;
  type: string;
  label: string;
  options?: string[];
  required?: boolean;
}

export interface Form {
  id: string;
  title: string;
  fields: FormField[];
  enabled?: boolean;
}

