import { Typography, Box } from "@mui/material";


interface Props {
  title?: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: Props) => (
  <Box mb="40px">

    <Typography component="h1" variant="h1">
      {title}
    </Typography>
    <Typography component="h1" variant="body1">
      {subtitle}
    </Typography>
  </Box>
);

export default PageHeader;
