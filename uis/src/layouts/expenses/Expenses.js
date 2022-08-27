import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";

import MDProgress from "components/MDProgress";

export default function data() {
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "BranchName", accessor: "BranchName", align: "left" },
      { Header: "Title", accessor: "Title", align: "center" },
      { Header: "ExpenseDate", accessor: "ExpenseDate", align: "center" },
      { Header: "Amount", accessor: "Amount", align: "center" },
      { Header: "Reason", accessor: "Reason", align: "center" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: [
      {
        BranchName: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            Branch One
          </MDTypography>
        ),
        Title: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            Daily Needs
          </MDTypography>
        ),
        ExpenseDate: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            04-Feb-2022
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Amount: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            10,000/-
          </MDTypography>
        ),
        Reason: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            Inventory repair
          </MDTypography>
        ),
        Action: (
          <MDButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
        ),
      },
    ],
  };
}
