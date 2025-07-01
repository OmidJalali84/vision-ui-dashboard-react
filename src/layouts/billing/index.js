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
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import colors from "assets/theme/base/colors";

// Billing page components
import CreditBalance from "./components/CreditBalance";
import GreenLightning from "assets/images/shapes/green-lightning.svg";
import CircularProgress from "@mui/material/CircularProgress";
import VuiTypography from "components/VuiTypography";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { getUser, getStakes, getAvailableRewards } from "web3/actions";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import balance from "assets/images/billing-background-balance.png";
import Graph from "assets/images/shapes/graph-billing.svg";
import { FaEllipsisH } from "react-icons/fa";
import StakeMore from "./components/StakeMore";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Table from "examples/Tables/Table";
import { claimRewards } from "web3/actions";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "web3/Web3Provider";
import Stake from "./components/Stake";

function StackDashboard() {
  const { columns: prCols } = projectsTableData;

  const { isConnected, address } = useAccount();
  const userInfo = getUser(address);
  const stakes = getStakes(address);
  const availableRewards = getAvailableRewards(address);

  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [percentDone, setPercentDone] = useState(0);
  const [isFirstDay, setIsFirstDay] = useState(false);
  const [modalOpenStake, setModalOpenStake] = useState(false);
  const [modalOpenStakeMore, setModalOpenStakeMore] = useState(false);
  const [loading, setLoading] = useState(false);

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
            Total Reward
          </VuiTypography>
        </VuiBox>
      ),
      value: (
        <VuiTypography variant="button" color="white" fontWeight="medium" ml={2}>
          {userInfo?.stakePlan?.totalreward
            ? (Number(userInfo.stakePlan.totalreward) / 1e18).toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })
            : "0"}
          $
        </VuiTypography>
      ),
    },
  ];

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const nextFirst = new Date(year, month + 1, 1, 0, 0, 0);
      const diffSec = Math.floor((nextFirst - now) / 1000);

      const d = Math.floor(diffSec / 86400);
      const h = Math.floor((diffSec % 86400) / 3600);
      const m = Math.floor((diffSec % 3600) / 60);
      const s = diffSec % 60;

      setTimeLeft({ d, h, m, s });
      setIsFirstDay(now.getDate() === 1);

      const startThisMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const elapsedDays = now.getDate() - 1 + now.getHours() / 24;
      setPercentDone((elapsedDays / daysInMonth) * 100);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleModalClickStake = () => {
    setModalOpenStake(true);
  };

  const handleModalClickStakeMore = () => {
    setModalOpenStakeMore(true);
  };

  const handleClaimReward = async () => {
    setLoading(true);
    try {
      const tx = await claimRewards();
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Claim request sent!");
    } catch (e) {
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  if (!isConnected && !address) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="75vh"
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
  } else if (!userInfo || !userInfo?.data?.stakePlan?.isActive) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="75vh"
          textAlign="center"
          py={6}
        >
          <VuiBox mb={2} fontSize="lg" fontWeight="medium" color>
            You're not active in this plan
          </VuiBox>
          <VuiButton variant="contained" color="info" onClick={handleModalClickStake}>
            Active
          </VuiButton>
        </VuiBox>
        <Modal
          open={modalOpenStake}
          onClose={() => {
            setModalOpenStake(false);
          }}
          hideBackdrop={false}
          disableEscapeKeyDown={true}
        >
          <Box sx={style}>
            <Stake />
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
                  Total Staked
                </VuiTypography>
                {/* <FaEllipsisH color="white" size="18px" sx={{ cursor: "pointer" }} /> */}
              </VuiBox>
              <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                <VuiTypography variant="h2" color="white" fontWeight="bold" mr="auto">
                  ${Number(userInfo?.data?.stakePlan?.entryAmount) / 1e18}
                </VuiTypography>
                <VuiBox component="img" src={Graph} sx={{ width: "58px", height: "20px" }} />
              </VuiBox>
            </VuiBox>

            <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
              <Stack direction="row" spacing="10px" mr="auto">
                <VuiBox>
                  <VuiButton variant="contained" color="info" onClick={handleModalClickStakeMore}>
                    Stake More
                  </VuiButton>
                </VuiBox>
              </Stack>
            </VuiBox>
          </VuiBox>
        </Card>
        {/* </Grid> */}
        <Grid
          sx={{
            // MOBILE: also give it a little breathing room if needed
            width: { xs: "90%", sm: "50%" },
            mx: { xs: "auto", sm: 0 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <VuiBox display="flex" justifyContent="center" mt={6} alignItems="center">
            {true ? (
              <VuiBox
                p="24px"
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  width: "280px",
                  textAlign: "center",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
                }}
              >
                <VuiTypography variant="h6" color="white" fontWeight="bold" mb="12px">
                  Withdraw Available
                </VuiTypography>

                <VuiTypography variant="h3" color="white" fontWeight="bold" mb="16px">
                  {Number(availableRewards?.data) / 1e18} DAI
                </VuiTypography>

                <VuiBox>
                  <VuiButton
                    variant="contained"
                    color="info"
                    fullWidth
                    disabled={loading}
                    onClick={handleClaimReward}
                  >
                    {loading ? "Claiming…" : "Claim"}
                  </VuiButton>
                </VuiBox>
              </VuiBox>
            ) : (
              <VuiBox display="flex" flexDirection="column" alignItems="center">
                <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={percentDone}
                    size={170}
                    color="info"
                  />
                  <VuiBox
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VuiTypography color="white" variant="h2" fontWeight="bold">
                      {Math.round(percentDone)}%
                    </VuiTypography>
                    <VuiTypography color="text" variant="caption">
                      Month Progress
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>

                <VuiBox display="flex" alignItems="center" mt={3} sx={{ gap: "12px" }}>
                  <>
                    <VuiTypography color="white" variant="h5" fontWeight="bold">
                      {timeLeft.d}d
                    </VuiTypography>
                    <VuiTypography color="white" variant="h5" fontWeight="bold">
                      {timeLeft.h}h
                    </VuiTypography>
                    <VuiTypography color="white" variant="h5" fontWeight="bold">
                      {timeLeft.m}m
                    </VuiTypography>
                    <VuiTypography color="white" variant="h5" fontWeight="bold">
                      {timeLeft.s}s
                    </VuiTypography>
                  </>
                </VuiBox>
              </VuiBox>
            )}
          </VuiBox>
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

      <VuiBox
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: stakes.length > 0 ? "flex-start" : "center",
          py: 3,
          minHeight: stakes.length > 0 ? "auto" : "400px", // adjust as needed
        }}
      >
        {stakes?.data?.length > 0 ? (
          <VuiBox py={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                <VuiTypography variant="lg" color="white" mb="20px">
                  Positions
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
                <Grid
                  container
                  sx={({ breakpoints }) => ({
                    spacing: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    [breakpoints.only("sm")]: {
                      gap: "0px",
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
                  {stakes?.data?.map((stake, idx) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      key={idx}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <SatisfactionRate
                        amount={Number(stake.amount) / 1e18}
                        claimed={Number(stake.rewardClaimed) / 1e18}
                        percentage={(Number(stake.rewardClaimed) / Number(stake.amount) / 2) * 100}
                      />
                    </Grid>
                  ))}
                </Grid>{" "}
              </VuiBox>
            </Card>
          </VuiBox>
        ) : (
          <VuiTypography variant="button" color="text" textAlign="center">
            You have no active positions yet.
          </VuiTypography>
        )}
      </VuiBox>
      <Modal
        open={modalOpenStakeMore}
        onClose={() => {
          setModalOpenStakeMore(false);
        }}
        hideBackdrop={false}
        disableEscapeKeyDown={true}
      >
        <Box sx={style}>
          <StakeMore />
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default StackDashboard;
