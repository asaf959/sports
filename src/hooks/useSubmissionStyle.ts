import { SxProps } from "@mui/material";
import { useNavigation } from "react-router-dom";

const style = {
  opacity: 0.3,
  pointerEvents: "none"
};

const useSubmissionStyle = () => {
  const navigation = useNavigation();
  const submissionStyle: SxProps = navigation.state === "submitting" ? style : {};

  return submissionStyle;
};

export default useSubmissionStyle;
