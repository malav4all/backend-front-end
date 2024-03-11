import React from "react";
import { useTranslation } from "react-i18next";
const Dashboard = () => {
  const { t } = useTranslation();
  return <div>{t("welcome")}</div>;
};

export default Dashboard;
