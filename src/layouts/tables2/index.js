/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import { Card, Stack, Grid, Modal, Box } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";

import colors from "assets/theme/base/colors";

import balance from "assets/images/billing-background-balance.png";
import Graph from "assets/images/shapes/graph-billing.svg";
import { FaEllipsisH } from "react-icons/fa";

import linearGradient from "assets/theme/functions/linearGradient";
import { IoCash, IoDocumentText } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";

import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  getUser,
  getTokenBalance,
  getPointBalance,
  getLockedBalance,
  getUserTeam,
} from "web3/actions";
import Register from "./components/Register";
import UpgradePlan from "./components/UpgradePlan";
import { useState } from "react";

function PlanDashboard() {
  const { columns: prCols } = projectsTableData;
  const { gradients, info } = colors;
  const { cardContent } = gradients;
  const { isConnected, address } = useAccount();
  const userInfo = getUser(address);
  const userTeam = getUserTeam(address);

  const tokenBalance = getTokenBalance(address);
  const lockedBalance = getLockedBalance(address);
  const pointsBalance = getPointBalance(address);

  const [modalOpenRegister, setModalOpenRegister] = useState(false);
  const [modalOpenUpgrade, setModalOpenUpgrade] = useState(false);
  const handleModalClickRegister = () => {
    setModalOpenRegister(true);
  };
  const handleModalClickUpgrade = () => {
    setModalOpenUpgrade(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    boxShadow: 24,
    borderRadius: "8px",
  };

  const prRows = [
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            1.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Referrer
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {userInfo?.data?.referrerUsername}
        </VuiTypography>
      ),
    },
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            2.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Underlines
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {Number(userInfo?.data?.directs ?? 0).toLocaleString()}
        </VuiTypography>
      ),
    },
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            3.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Unlocked Levels
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {Number(userInfo?.data?.unlockedLevels ?? 0).toLocaleString()}
        </VuiTypography>
      ),
    },
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            4.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            First Direct Lock
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {userInfo?.data?.firstDirectLockAmount
            ? (Number(userInfo.data.firstDirectLockAmount) / 1e18).toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })
            : "$ 0"}
        </VuiTypography>
      ),
    },
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            5.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Register Time
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {userInfo?.data?.registrationTime
            ? new Date(Number(userInfo.data.registrationTime) * 1000).toLocaleString()
            : "—"}
        </VuiTypography>
      ),
    },
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            6.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Team Members
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {userTeam?.data?.[4] ? Number(userTeam.data[4]).toString() : "0"}
        </VuiTypography>
      ),
    },
    {
      data: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            7.
          </VuiTypography>
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Team Balance
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {userTeam?.data?.[1]
            ? (Number(userTeam.data[1]) / 1e18).toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })
            : "0"}
          $
        </VuiTypography>
      ),
    },
  ];

  if (!isConnected && !address) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="90vh"
          textAlign="center"
          py={6}
        >
          <VuiBox mb={2} fontSize="lg" fontWeight="medium">
            Please first connect wallet
          </VuiBox>
          <ConnectKitButton />
        </VuiBox>
      </DashboardLayout>
    );
  } else if (!userInfo || !userInfo?.data?.unirxPlan?.isActive) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="90vh"
          textAlign="center"
          py={6}
        >
          <VuiBox mb={2} fontSize="lg" fontWeight="medium" color>
            You're not active in this plan
          </VuiBox>
          <VuiButton variant="contained" color="info" onClick={handleModalClickRegister}>
            Active
          </VuiButton>
        </VuiBox>
        <Modal
          open={modalOpenRegister}
          onClose={() => {
            setModalOpenRegister(false);
          }}
          hideBackdrop={false}
          disableEscapeKeyDown={true}
        >
          <Box sx={style}>
            <Register plan={1} />
          </Box>
        </Modal>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Stack
        spacing="24px"
        background="#fff"
        justifyContent={{ xs: "center", sm: "space-between" }}
        sx={({ breakpoints }) => ({
          // Mobile first: columns
          flexDirection: "column",
          gap: "24px",
          alignItems: { xs: "center", sm: "stretch" },

          // From sm up: two columns
          [breakpoints.up("sm")]: {
            flexDirection: "row",
          },

          // (you can add further tweaks at md, lg if you like)
        })}
      >
        <Card
          sx={{
            // MOBILE: make it 90% wide and center it
            width: { xs: "90%", sm: "50%" },
            mx: { xs: "auto", sm: 0 },
          }}
        >
          <VuiBox display="flex" flexDirection="column">
            <VuiBox
              mb="32px"
              p="20px"
              display="flex"
              flexDirection="column"
              sx={{
                backgroundImage: `url(${balance})`,
                backgroundSize: "cover",
                borderRadius: "18px",
              }}
            >
              <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                <VuiTypography variant="caption" color="white" fontWeight="medium" mr="auto">
                  Entry Amount
                </VuiTypography>
                {/* <FaEllipsisH color="white" size="18px" sx={{ cursor: "pointer" }} /> */}
              </VuiBox>
              <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                <VuiTypography variant="h2" color="white" fontWeight="bold" mr="auto">
                  ${Number(userInfo?.data?.unirxPlan?.entryAmount) / 1e18}
                </VuiTypography>
                {/* <VuiBox component="img" src={Graph} sx={{ width: "58px", height: "20px" }} /> */}
              </VuiBox>
              <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                <VuiTypography
                  color="white"
                  fontWeight="bold"
                  textAlign="left"
                  mt="15px"
                  variant="button"
                  // width="75px"
                  paddingLeft="10px"
                  paddingRight="10px"
                  paddingTop="5px"
                  paddingBottom="5px"
                  borderRadius="10px"
                  sx={({ breakpoints }) => ({
                    background: linearGradient(
                      cardContent.main,
                      cardContent.state,
                      cardContent.deg
                    ),
                    [breakpoints.only("xl")]: {
                      fontSize: "10px",
                    },
                  })}
                >
                  Credit: &nbsp;{(Number(userInfo?.data?.unirxPlan?.credit) / 1e18).toString()}$
                </VuiTypography>
              </VuiBox>
            </VuiBox>

            <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
              <Stack direction="row" spacing="10px" mr="auto">
                <VuiBox>
                  <VuiButton variant="contained" color="info" onClick={handleModalClickUpgrade}>
                    Upgrade Plan
                  </VuiButton>
                </VuiBox>
              </Stack>
            </VuiBox>
          </VuiBox>
        </Card>
        <Grid
          container
          sx={({ breakpoints }) => ({
            spacing: "24px",
            [breakpoints.only("sm")]: {
              columnGap: "0px",
              rowGap: "24px",
            },
            [breakpoints.up("md")]: {
              gap: "24px",
              ml: "50px !important",
            },
            [breakpoints.only("xl")]: {
              gap: "12px",
              mx: "auto !important",
            },
          })}
        >
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                minHeight: "110px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Username
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  {userInfo?.data?.username}
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoDocumentText color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                minHeight: "110px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Total Reward
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  {Number(userInfo?.data?.unirxPlan?.totalReward) / 1e18}$
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoCash color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                minHeight: "110px",
                borderRadius: "20px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Unity Balance
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  {Number(tokenBalance?.data) / 1e18}
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoWallet color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>

          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                minHeight: "110px",
                borderRadius: "20px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Unirx Balance
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  {Number(pointsBalance?.data) / 1e18}
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoWallet color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
        </Grid>
      </Stack>

      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              Data Table
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </VuiBox>
        </Card>
      </VuiBox>
      <Modal
        open={modalOpenUpgrade}
        onClose={() => {
          setModalOpenUpgrade(false);
        }}
        hideBackdrop={false}
        disableEscapeKeyDown={true}
      >
        <Box sx={style}>
          <UpgradePlan />
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default PlanDashboard;
