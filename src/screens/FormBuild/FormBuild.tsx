import React, { useEffect, useState } from "react";
import { CustomAppHeader } from "../../global/components";
import {
  boldFont,
  getRelativeFontSize,
  primaryHeadingColor,
} from "../../utils/styles";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CreateFormButton from "./CreateFormButton";
import { FaEdit } from "react-icons/fa";
import { GetForms } from "./formBuilder.service";
import moment from "moment";
import formBuilderStyles from "./FormBuild.service";
import { store } from "../../utils/store";

const FormBuilder: React.FC = () => {
  const theme = useTheme();
  const classes = formBuilderStyles;
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await GetForms({
        input: {
          accountId: store.getState().auth.tenantId,
          page: 1,
          limit: 10,
        },
      });
      setForms(response.fetchFormBuilder.data);
      setLoading(false);
    };

    fetchForms();
  }, []);

  const getHeader = () => {
    return (
      <Box>
        <Typography
          sx={{ ...classes.mainCardHeading, color: theme.palette.text.primary }}
        >
          Form Builder
        </Typography>
      </Box>
    );
  };

  function FormCardSkeleton() {
    return (
      <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />
    );
  }

  function FormCard({ form }: { form: any }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between p-20">
            <Typography variant="h6" className="truncate font-bold">
              {form?.name || "Test"}
            </Typography>
            {form.published ? (
              <Badge color="success">Published</Badge>
            ) : (
              <Badge color="error">Draft</Badge>
            )}
          </div>
          <Typography variant="body2">
            {moment(form.createdAt).fromNow()}
          </Typography>
        </CardHeader>
        <CardContent className="h-[20px] truncate text-sm">
          {form?.name || "No description"}
        </CardContent>
        <CardContent className="h-[20px] truncate text-sm">
          {form?.description || "No description"}
        </CardContent>
        <CardContent>
          {!form.published && (
            <Button
              href={`/builder/${form.formId}`}
              variant="outlined"
              fullWidth
            >
              Edit form <FaEdit style={{ marginLeft: "0.5rem" }} />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  function FormCards({ forms }: { forms: any[] }) {
    return (
      <>
        {forms.map((form) => (
          <FormCard key={form.formId} form={form} />
        ))}
      </>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: "100%",
        paddingTop: "2rem",
      }}
    >
      <CustomAppHeader
        className={{
          ...classes.headerBackgroundColor,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              fontSize: getRelativeFontSize(6),
              ...boldFont,
              color: primaryHeadingColor,
            }}
          >
            {getHeader()}
          </Typography>
        </Stack>
      </CustomAppHeader>
      <Box sx={{ padding: "20px 100px" }}>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Your Forms
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "16px",
          }}
        >
          <CreateFormButton />
          {loading ? (
            [1, 2, 3, 4].map((el) => <FormCardSkeleton key={el} />)
          ) : (
            <FormCards forms={forms} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FormBuilder;
