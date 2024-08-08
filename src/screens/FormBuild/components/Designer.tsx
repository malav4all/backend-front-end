import { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import {
  DndContext,
  useDroppable,
  useDraggable,
  useDndMonitor,
  DragEndEvent,
} from "@dnd-kit/core";

import DeleteIcon from "@mui/icons-material/Delete";
import DesignerSidebar from "./DesignerSidebar";
import useDesigner from "./useDesigner";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import { idGenerator } from "./idGenerator";

const Designer = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;
      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex(
          (el: any) => el.id === overId
        );
        if (overElementIndex === -1) throw new Error("element not found");

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf)
          indexForNewElement = overElementIndex + 1;

        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const DraggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (DraggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
        const activeElementIndex = elements.findIndex(
          (el: any) => el.id === activeId
        );
        const overElementIndex = elements.findIndex(
          (el: any) => el.id === overId
        );
        if (activeElementIndex === -1 || overElementIndex === -1)
          throw new Error("element not found");

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);
        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf)
          indexForNewElement = overElementIndex + 1;

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <Box display="flex" width="100%" height="95vh">
      <Box
        p={4}
        flex={1}
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <Paper
          ref={droppable.setNodeRef}
          elevation={3}
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#09090B",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          {!droppable.isOver && elements.length === 0 && (
            <Typography variant="h4" color="textSecondary">
              Drop here
            </Typography>
          )}
          {droppable.isOver && elements.length === 0 && (
            <Box p={4} width="100%">
              <Box height={100} bgcolor="primary.main" borderRadius={1} />
            </Box>
          )}
          {elements.length > 0 && (
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              gap={2}
              p={4}
            >
              {elements.map((element: any) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
      <DesignerSidebar />
    </Box>
  );
};

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <Box
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      position="relative"
      height={100}
      display="flex"
      flexDirection="column"
      bgcolor="background.paper"
      borderRadius={1}
      border={1}
      borderColor="divider"
      // p={2}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <Box
        ref={topHalf.setNodeRef}
        sx={{ position: "absolute", width: "100%", height: "50%", top: 0 }}
      />
      <Box
        ref={bottomHalf.setNodeRef}
        sx={{ position: "absolute", width: "100%", height: "50%", bottom: 0 }}
      />
      {mouseIsOver && (
        <>
          <Button
            onClick={() => removeElement(element.id)}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              borderRadius: 0,
              backgroundColor: "error.main",
            }}
          >
            <DeleteIcon />
          </Button>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.7,
              color: "#000",
            }}
          >
            Click for properties or drag to move
          </Typography>
        </>
      )}
      {topHalf.isOver && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: 7,
            bgcolor: "primary.main",
          }}
        />
      )}
      <Box
        sx={{
          width: "100%",
          height: 100,
          display: "flex",
          alignItems: "center",
          bgcolor: "background.default",
          borderRadius: 1,
          // px: 4,
          // py: 2,
          opacity: mouseIsOver ? 0.3 : 1,
          pointerEvents: "none",
        }}
      >
        <DesignerElement elementInstance={element} />
      </Box>
      {bottomHalf.isOver && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 7,
            bgcolor: "primary.main",
          }}
        />
      )}
    </Box>
  );
};

export default Designer;
