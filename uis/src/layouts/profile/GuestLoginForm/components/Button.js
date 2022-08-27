import React from "react";
import MDButton from "components/MDButton";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();


  // const [disableButtons, setDisableButtons] = React.useState(false);

  const handleSubmit = () => {
    submitForm();
    // setDisableButtons(true)
  };

  const configButton = {
    variant: "contained",
    color: "info",
    size:"medium",
    onClick: handleSubmit,
    // disabled :  disableButtons
    
  };

  return <MDButton  {...configButton}>{children}</MDButton>;
};

export default ButtonWrapper;
