export interface FormField {
  id: string;
  type: string;
  label: string;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  fields: FormField[];
}
