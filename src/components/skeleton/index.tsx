/* eslint-disable no-plusplus */
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Box, Card, Divider, Grid, Paper, Skeleton, Stack, Typography, styled } from "@mui/material";
import { range } from "lodash";
import { ReactNode } from "react";

import { ReactComponent as LineChartSvg } from "../../assets/svg/line.svg";
import rem from "../../utils/rem";
// import HeaderInputs from "../headerInputs";

interface StatBoxProps {
  title?: string;
  icon?: ReactNode;
}

const StyledCard = styled(Card)`
  ${({ theme }) => `
    max-width: ${theme.typography.pxToRem(240)};
    border-radius: ${theme.typography.pxToRem(32)};
    border: 1.19px solid #E2E2E8;
    box-shadow:none;

    &:hover {
      box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const StyledBox = styled(Box)`
  ${({ theme }) => `
  margin-right:${theme.typography.pxToRem(0)};
  & .MuiBox-root{
    margin-right: 0 !important;
  }
  & .MuiDataGrid-root {
    border: none !important;
  }
  & .MuiDataGrid-withBorderColor{
    border-color:transparent !important;
  }
  & .MuiDataGrid-columnHeaderTitle {
    font-weight: 600;
    font-size:${theme.typography.pxToRem(14)};
  }
  & .MuiDataGrid-cell {
    outline: none !important;
  }

  `}
`;
const StyledDivider = styled(Divider)`
  ${() => `
 margin:3px 0 !important ;
`}
`;

export function ListSkeleton() {
  const numberOfRows = 5;
  const arr = range(1, numberOfRows + 1);

  return (
    <Stack spacing={2}>
      <Skeleton variant="text" height={50} sx={{ mt: "8px" }} />
      {arr.map(val => (
        <Skeleton key={val} variant="rectangular" width={"100%"} height={40} />
      ))}
    </Stack>
  );
}

export const SkeletonCard = () => (
  <StyledCard sx={{ width: "100%", height: "330px", textAlign: "center", borderRadius: "32px", padding: "30px 16px" }}>
    <Stack sx={{ alignItems: "center" }}>
      <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width={80} height={22} sx={{ mb: "9.6px" }} />
      <Skeleton variant="rectangular" width={120} height={16} sx={{ mb: "8px" }} />
      <Skeleton variant="rectangular" width={120} height={16} sx={{ mb: "20px" }} />
      <Skeleton variant="rectangular" width={50} height={16} sx={{ mb: "12px" }} />
      <Skeleton variant="rectangular" width={70} height={32} />
    </Stack>
  </StyledCard>
);

export function GridSkelton() {
  const numberOfCards = 8;
  const arr = range(1, numberOfCards + 1);

  return (
    <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(224)}, 1fr))`} gap={2.5}>
      {arr.map(val => (
        <SkeletonCard key={val} />
      ))}
    </Box>
  );
}

export function TrainerProfileSkeleton() {
  return (
    <>
      <Box display="flex" columnGap="24px">
        <Paper variant="outlined" sx={{ borderRadius: "32px", minWidth: "504px", padding: "32px 24px", height: "518.5px" }}>
          <Box>
            <Box position="relative">
              <Box display="flex" columnGap="24px" alignItems="center">
                <Skeleton variant="circular" width={120} height={120} />

                <Box>
                  <Stack>
                    <Skeleton variant="rectangular" width={100} height={24} sx={{ fontSize: "1rem", mb: "24px" }} />
                    <Skeleton variant="rectangular" width={66} height={32} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
                    <Skeleton variant="rectangular" width={100} height={20} sx={{ fontSize: "1rem", mt: "12px" }} />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>

          <Skeleton variant="text" width="100%" height={2} sx={{ fontSize: "1rem", margin: "32px 0" }} />

          <Box marginTop="32px" display="flex" flexDirection="column" rowGap="16px">
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="rectangular" width="100%" height={24} sx={{ fontSize: "1rem" }} />
            </Box>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ borderRadius: "32px", minWidth: "504px", padding: "24px 24px 16px", height: "518.5px" }}>
          <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Box mb="12px">
              <Skeleton variant="rectangular" width="100%" height={38.4} sx={{ fontSize: "1rem" }} />
            </Box>
            <StyledBox height="421px" overflow="auto">
              <Stack spacing={3}>
                <Skeleton variant="text" width="100%" height={39} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ fontSize: "1rem" }} />
              </Stack>
            </StyledBox>
          </Box>
        </Paper>
      </Box>
      <Box width="1032px">
        <Box display="flex" justifyContent="space-between" maxWidth="1032px" alignItems="center" margin="24px 0" height={45.5}>
          <Typography variant="h4">Transaction History</Typography>
        </Box>
        <StyledBox>
          <ListSkeleton />
        </StyledBox>
      </Box>
    </>
  );
}

export function ReportsCardSkeleton() {
  return (
    <Paper
      sx={{
        gridColumn: "span 3",
        gridRow: "span 1",
        borderRadius: "20px",
        boxShadow: "0 0 16px 8px rgba(0, 0, 255, 0.02)",
        border: "1.19px solid #E2E2E8",
        padding: "8px 16px",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }
      }}
    >
      <Box display="flex" height="100%" alignItems="center" columnGap={1}>
        <Box>
          <Skeleton variant="circular" width={64} height={64} />
        </Box>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={100} height={22.3} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width={100} height={20} sx={{ fontSize: "1rem" }} />
        </Stack>
      </Box>
    </Paper>
  );
}

export function ReportsSkeleton() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="104px" gap="20px">
      <ReportsCardSkeleton />
      <ReportsCardSkeleton />
      <ReportsCardSkeleton />
      <ReportsCardSkeleton />

      <Paper sx={{ gridColumn: "span 8", gridRow: "span 4", boxShadow: "0 0 16px 8px rgba(0, 0, 255, 0.02)", border: "1.19px solid #E2E2E8" }}>
        <Box padding="24px">
          <Skeleton variant="text" width={"30%"} height={20} sx={{ fontSize: "1rem", mb: "40px" }} />
          <Skeleton variant="rectangular" width={"100%"} height={364} />
        </Box>
      </Paper>
      <Paper
        sx={{
          gridColumn: "span 4",
          gridRow: "span 4",
          boxShadow: "0 0 16px 8px rgba(0, 0, 255, 0.02)",
          border: "1.19px solid #E2E2E8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Skeleton variant="circular" width={264} height={264} />
      </Paper>
    </Box>
  );
}

function ImageUploadSkeleton() {
  return (
    <Box display="flex" alignItems="center" columnGap="20px" marginBottom="40px">
      <Box>
        <Skeleton variant="circular" width={200} height={200} />
      </Box>

      <Box marginLeft="40px">
        <Skeleton variant="rectangular" width={"180px"} height={24} sx={{ fontSize: "1rem" }} />

        <Box display="flex" columnGap="20px" margin="24px 0 16px 0">
          <Skeleton variant="rectangular" width={92} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width={92} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
        </Box>
        <Skeleton variant="rectangular" width={"211px"} height={24} sx={{ fontSize: "1rem" }} />
      </Box>
    </Box>
  );
}

export function EditPageSkeleton() {
  return (
    <Box>
      <ImageUploadSkeleton />
      <Box>
        {/* <HeaderInputs text="Personal Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
        </Box>
        <Grid container>
          <Grid xs={7.93} mt={2}>
            <Skeleton variant="rectangular" width={596} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          </Grid>
        </Grid>
      </Box>
      <Box marginTop="50px">
        {/* <HeaderInputs text="Gym Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width={290} height={42} sx={{ fontSize: "1rem", borderRadius: "8px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export function InvoiceSkeleton() {
  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Skeleton variant="rectangular" width={80} height={40} sx={{ borderRadius: "4px", mb: 3 }} />
      </Box>
      <Box>
        <Skeleton variant="rectangular" width="30%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem", mb: 2 }} />
      </Box>
      <Box display="grid" gridTemplateColumns="160px 200px 300px" columnGap="16px" margin="16px 0">
        <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", mt: 1 }} />

        <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px" }} />

        <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px" }} />
      </Box>
      <Box>
        <Stack spacing={0.5}>
          <Skeleton variant="rectangular" width="932px" height={50} sx={{ borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width="932px" height={38} sx={{ borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width="932px" height={38} sx={{ borderRadius: "8px" }} />
          <Skeleton variant="rectangular" width="932px" height={38} sx={{ borderRadius: "8px" }} />
        </Stack>
        <Skeleton variant="rectangular" width="100%" height={45} sx={{ borderRadius: "8px", mt: 2, mb: "px" }} />
      </Box>

      <Box width="900px" height="48px" marginTop="88px">
        <Skeleton variant="rectangular" width={930} height={74} sx={{ borderRadius: "8px" }} />
      </Box>
    </div>
  );
}

export function PackageEditSkeleton() {
  return (
    <Box>
      {/* <HeaderInputs text="Package Details" /> */}
      <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2} marginBottom="16px">
        <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />

        <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
    </Box>
  );
}

export function GymManagerEditSkeleton() {
  return (
    <>
      <ImageUploadSkeleton />
      <Box>
        {/* <HeaderInputs text="Personal Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
        </Box>
        <Grid container>
          <Grid xs={7.93} mt={2}>
            <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export function GymPlanCardSkeleton() {
  return (
    <>
      <Paper
        sx={{
          width: "250px",
          padding: "18px 24px",
          borderRadius: "20px",
          border: "1px solid rgba(226, 226, 232, 1)",
          boxShadow: "0 0 16px 8px rgba(0, 0, 0, 0.02)",
          transition: "background-color 0.3s",

          "& .MuiSvgIcon-root": {
            marginRight: "6px",
            height: "14px",
            width: "14px",
            marginTop: "4px"
          },
          "& ul": {
            listStyleType: "none",
            fontSize: "14px"
          },
          "& .MuiChip-root": {
            fontWeight: "500",
            padding: "6px 8px"
          }
        }}
      >
        <Skeleton variant="rectangular" width={125} height={24} sx={{ borderRadius: "16px" }} />
        <Box display="flex" margin="16px 0" columnGap={1}>
          <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: "4px" }} />

          <Skeleton variant="rectangular" width="30%" height={24} />
        </Box>

        <Stack spacing={1}>
          <Skeleton variant="rectangular" width="80%" height={21} />
          <Skeleton variant="rectangular" width="80%" height={21} />
        </Stack>

        <Box mt={2.4} mb={2}>
          <Skeleton variant="rectangular" width="70%" height={24} sx={{ fontSize: "1rem" }} />
        </Box>
        <Box mb={1} mt={1}>
          <ul>
            <li style={{ display: "flex", alignItems: "center", columnGap: "12px" }}>
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="text" width="40%" height={20} sx={{ fontSize: "1rem" }} />
            </li>
            <li style={{ display: "flex", alignItems: "center", columnGap: "12px" }}>
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="text" width="40%" height={20} sx={{ fontSize: "1rem" }} />
            </li>
            <li style={{ display: "flex", alignItems: "center", columnGap: "12px" }}>
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="text" width="40%" height={20} sx={{ fontSize: "1rem" }} />
            </li>
            <li style={{ display: "flex", alignItems: "center", columnGap: "12px" }}>
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="text" width="40%" height={20} sx={{ fontSize: "1rem" }} />
            </li>
          </ul>
        </Box>
        <Box marginTop="29px">
          <Skeleton variant="rectangular" width="100%" height={36.33} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
        </Box>
      </Paper>
    </>
  );
}
export function GymSettingsSkeleton() {
  const numberOfCards = 3;
  const arr = range(1, numberOfCards + 1);

  return (
    <>
      <Box margin="32px 0 16px ">
        {/* <HeaderInputs text="Pricing Plan" /> */}
        <Box display="flex" columnGap="16px">
          {arr.map(val => (
            <GymPlanCardSkeleton key={val} />
          ))}
        </Box>
      </Box>
    </>
  );
}

export function DashboardNewMembersSkeleton() {
  return (
    <>
      <div>
        <Box display="flex" alignItems="center">
          <Skeleton variant="circular" width={40} height={40} sx={{ marginRight: "4px" }} />

          <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: "4px" }} />
        </Box>
        <StyledDivider />
      </div>
    </>
  );
}

export function DashboardStatBoxSkeleton({ icon, title }: StatBoxProps) {
  return (
    <>
      <Box width="100%" m="18px 16px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{title}</Typography>
          {icon}
        </Box>
        <Box mt={1}>
          <Skeleton variant="circular" width={94} height={96} sx={{ m: "0px auto" }} />
        </Box>

        <Box display="flex" justifyContent="space-between" marginTop="24px">
          <Box>
            <Box>
              <Skeleton variant="rectangular" width="44px" height={17} sx={{ borderRadius: "4px", mb: 1 }} />
            </Box>

            <Box margin="0 auto">
              <Skeleton variant="rectangular" width="24px" height={17} sx={{ borderRadius: "4px", margin: "0 auto" }} />
            </Box>
          </Box>
          <Box>
            <Box>
              <Skeleton variant="rectangular" width="44px" height={17} sx={{ borderRadius: "4px", mb: 1 }} />
            </Box>

            <Box margin="0 auto">
              <Skeleton variant="rectangular" width="24px" height={17} sx={{ borderRadius: "4px", margin: "0 auto" }} />
            </Box>
          </Box>
          <Box>
            <Box>
              <Skeleton variant="rectangular" width="44px" height={17} sx={{ borderRadius: "4px", mb: 1 }} />
            </Box>

            <Box margin="0 auto">
              <Skeleton variant="rectangular" width="24px" height={17} sx={{ borderRadius: "4px", margin: "0 auto" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="240px" gap="20px">
      <Paper
        sx={{
          width: "240px",
          gridColumn: "span 3",
          variant: "outlined",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          border: "1px solid rgba(226, 226, 232, 1)",
          boxShadow: "0 0 16px 8px rgba(0, 0, 0, 0.02)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }
        }}
      >
        <DashboardStatBoxSkeleton title="Members" icon={<GroupOutlinedIcon color="primary" fontSize="small" />} />
      </Paper>

      <Paper
        sx={{
          width: "240px",
          gridColumn: "span 3",
          variant: "outlined",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          border: "1px solid rgba(226, 226, 232, 1)",
          boxShadow: "0 0 16px 8px rgba(0, 0, 0, 0.02)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }
        }}
      >
        <DashboardStatBoxSkeleton title="Trainers" icon={<DirectionsRunIcon color="primary" fontSize="small" />} />
      </Paper>

      <Box gridColumn="span 6" gridRow="span 2" margin="0">
        <LineChartSvg />
      </Box>

      <Paper
        sx={{
          gridColumn: "span 6",
          gridRow: "span 1",
          variant: "outlined",
          borderRadius: "32px",
          border: "1px solid rgba(226, 226, 232, 1)",
          boxShadow: "0 0 16px 8px rgba(0, 0, 0, 0.02)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }
        }}
      >
        <Box padding="24px 16px 24px 24px">
          <Typography variant="h4" marginBottom="16px">
            New Members
          </Typography>
          <Box overflow="auto" height="145px">
            <DashboardNewMembersSkeleton />
            <DashboardNewMembersSkeleton />
            <DashboardNewMembersSkeleton />
          </Box>
        </Box>
      </Paper>
      <Box width="1032px" gridColumn="span 12">
        <Box display="flex" justifyContent="space-between" maxWidth="1032px" alignItems="center" margin="24px 0" height={45.5}>
          <Typography variant="h4">Transaction History</Typography>
        </Box>
        <StyledBox>
          <ListSkeleton />
        </StyledBox>
      </Box>
    </Box>
  );
}

export function MemberProfileSkeleton() {
  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: "32px",
          width: "1032px",
          overflow: "hidden",
          height: "543.5px"
        }}
      >
        <Box position="relative" p="24px" display="flex" flexDirection="column" alignItems="center">
          <Skeleton variant="circular" width={112.5} height={112.5} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width={150} height={25} />
          <Box mt="16px" mb="2px">
            <Skeleton variant="rectangular" width={66} height={32} sx={{ borderRadius: "8px" }} />
          </Box>
        </Box>
        <Divider variant="middle" />
        <Box display="grid" gridTemplateColumns="1fr 34px 1fr" padding="24px">
          <Box>
            {[1, 2, 3, 4, 5, 6].map(item => (
              <Box key={item} display="flex" justifyContent="space-between" padding="8px 0">
                <Skeleton variant="rectangular" width={"100%"} height={24.5} sx={{ fontSize: "1rem" }} />
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="center">
            <Divider orientation="vertical" variant="middle" />
          </Box>
          <Box>
            {[1, 2, 3].map(item => (
              <Box key={item} display="flex" justifyContent="space-between" alignItems="center" padding="8px 0">
                <Skeleton variant="rectangular" width={"100%"} height={24.5} sx={{ fontSize: "1rem" }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
      <Box width="1032px">
        <Box display="flex" justifyContent="space-between" maxWidth="1032px" alignItems="center" margin="24px 0" height={45.5}>
          <Typography variant="h4">Transaction History</Typography>
        </Box>
        <StyledBox>
          <ListSkeleton />
        </StyledBox>
      </Box>
    </Box>
  );
}

export function MemberAddEditSkeleton() {
  return (
    <>
      <ImageUploadSkeleton />
      <Box>
        {/* <HeaderInputs text="Personal Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />

          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />

          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />

          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />

          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem", gridColumnEnd: "span 2" }} />
        </Box>
      </Box>
      <Box marginTop="50px">
        {/* <HeaderInputs text="Gym Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />

          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
        </Box>
      </Box>
    </>
  );
}

export function TrainerEditSkeleton() {
  return (
    <Box>
      <ImageUploadSkeleton />
      <Box>
        {/* <HeaderInputs text="Personal Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
        </Box>
        <Grid container>
          <Grid xs={7.93} mt={2}>
            <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          </Grid>
        </Grid>
      </Box>
      <Box marginTop="50px">
        {/* <HeaderInputs text="Gym Information" /> */}
        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${rem(240)}, 1fr))`} gap={2}>
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width="100%" height={46} sx={{ borderRadius: "8px", fontSize: "1rem" }} />
        </Box>
      </Box>
    </Box>
  );
}
