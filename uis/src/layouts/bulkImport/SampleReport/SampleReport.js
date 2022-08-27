import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import MDProgress from "components/MDProgress";

export default function data() {
  const Project = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      {
        Header: "BedId",
        accessor: "BedId",
        align: "left",
        fontWeight: "medium",
        fontSize: 20,
      },
      { Header: "Name", accessor: "Name", align: "center" },
      { Header: "Due", accessor: "Due", align: "center" },
      { Header: "Lastpaidon ", accessor: "Lastpaidon", align: "center" },
      { Header: "NoticeGivenOn", accessor: "NoticeGivenOn", align: "center" },
      { Header: "CheckoutOn", accessor: "CheckoutOn", align: "center" },
    ],

    rows: [
      {
        BedId: <Project name="P1C" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Utkarsh Kamuni
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            09-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            09-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            31-oct-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="G7A" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Suresh Kumar Dogra
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            4000
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            16-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            31-oct-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="30BA" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Saptarshi Sarkar
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            05-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            17-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            02-nov-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="307A" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Om Pandey
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            01-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            17-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            02-nov-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="408B" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Gaurav Dhameeja
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            01-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            17-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            02-nov-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="501B" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            P Charan Kumar
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            19-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            19-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            04-nov-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="107A" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Thota Chendra Sekharam
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            19-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            28-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            12-oct-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="P1C" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Utkarsh Kamuni
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            09-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            09-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            31-oct-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="G7A" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Suresh Kumar Dogra
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            4000
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            16-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            31-oct-21
          </MDTypography>
        ),
      },
      {
        BedId: <Project name="30BA" />,
        Name: (
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Saptarshi Sarkar
          </MDTypography>
        ),
        Due: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            0
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        Lastpaidon: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            05-oct-21
          </MDTypography>
        ),
        NoticeGivenOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            17-oct-21
          </MDTypography>
        ),
        CheckoutOn: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            02-nov-21
          </MDTypography>
        ),
      },
    ],
  };
}
