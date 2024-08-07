import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import useDesigner from "./useDesigner";
import { store } from "../../../utils/store";
import { UpdateForm } from "../formBuilder.service";
import { useHistory } from "react-router-dom";

function SaveFormBtn({ id }: { id: any }) {
  const history = useHistory();
  const { elements }: any = useDesigner();
  console.log({ elements });
  const [loading, setLoading] = useState(false);

  const updateFormContent = async () => {
    try {
      setLoading(true);
      // const JsonElements = JSON.stringify(elements);
      // const payload = JSON.parse(JsonElements);
      // console.log({ payload });
      await UpdateForm({
        input: {
          accountId: "IMZ113343",
          updatedBy: store.getState().auth.userName,
          formId: parseInt(id),
          published: false,
          content: elements,
        },
      });
      history.goBack();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<SaveIcon />}
      disabled={loading}
      onClick={updateFormContent}
    >
      Save
      {loading && <CircularProgress size={24} sx={{ position: "absolute" }} />}
    </Button>
  );
}

export default SaveFormBtn;
