import { FormElement } from "./FormElements";
import { Button, Box, Typography } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        height: 120,
        width: 120,
        cursor: "grab",
        ...(draggable.isDragging && {
          boxShadow: "0 0 0 2px",
          borderColor: "primary.main",
        }),
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon style={{ height: 32, width: 32, color: "#1976d2" }} />
      <Typography variant="body2">{label}</Typography>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        height: 120,
        width: 120,
        cursor: "grab",
      }}
    >
      <Icon style={{ height: 32, width: 32, color: "#1976d2" }} />
      <Typography variant="body2">{label}</Typography>
    </Button>
  );
}

export default SidebarBtnElement;
