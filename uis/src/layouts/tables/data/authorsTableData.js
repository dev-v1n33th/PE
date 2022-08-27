import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function data() {
  const Guest = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "buildingno", accessor: "buildingno", align: "center" },
      { Header: "roomno", accessor: "roomno", align: "center" },
      { Header: "bedno", accessor: "bedno", align: "center" },
      {
        Header: "transactionamount",
        accessor: "transactionamount",
        align: "center",
      },
      { Header: "dueamount", accessor: "dueamount", align: "center" },
      {
        Header: "transactiontype",
        accessor: "transactiontype",
        align: "center",
      },
      { Header: "transactionid", accessor: "transactionid", align: "center" },
      {
        Header: "transactiondate",
        accessor: "transactiondate",
        align: "center",
      },
    ],

    rows: [
      {
        name: <Guest name="Prasad" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            One
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Two
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            5000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            674026896
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            09-12-2020
          </MDTypography>
        ),
      },
      {
        name: <Guest name="Ram" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            2000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            456674026896
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23-08-2021
          </MDTypography>
        ),
      },
      {
        name: <Guest name="Michael" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            56674026896
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23-08-2021
          </MDTypography>
        ),
      },
      {
        name: <Guest name="Kabhir" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Three
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Two
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            67467026896
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            13-09-2021
          </MDTypography>
        ),
      },
      {
        name: <Guest name="Swami" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Two
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            One
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            One
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            3000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            677026896
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            04-09-2021
          </MDTypography>
        ),
      },
      {
        name: <Guest name="John" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Four
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            1000
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            124456456757
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23-08-2021
          </MDTypography>
        ),
      },
      {
        name: <Guest name="Michael" />,
        buildingno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Five
          </MDTypography>
        ),
        roomno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Five
          </MDTypography>
        ),
        bedno: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Five
          </MDTypography>
        ),
        transactionamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            2000
          </MDTypography>
        ),
        dueamount: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            100
          </MDTypography>
        ),
        transactiontype: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            UPI
          </MDTypography>
        ),
        transactionid: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            8976594844356755
          </MDTypography>
        ),
        transactiondate: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            25-08-2021
          </MDTypography>
        ),
      },
    ],
  };
}
