import React, { useContext } from "react";
import { FormElementInstance } from "./FormElements";
import { DesignerContext } from "./DesignerContext";

function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used within a DesignerContext");
  }
  return context as {
    elements: FormElementInstance[];
    setElements: React.Dispatch<React.SetStateAction<FormElementInstance[]>>;
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement: React.Dispatch<
      React.SetStateAction<FormElementInstance | null>
    >;
    updateElement: (id: string, element: FormElementInstance) => void;
  };
}

export default useDesigner;
