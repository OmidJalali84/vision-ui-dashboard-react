/*
=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoGlobe, IoPricetagOutline } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";

// Wagmi & ConnectKit
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { getContractStage, getUser, getStaker } from "web3/actions";

function Overview() {
  const { address, isConnected } = useAccount();
  const contractStage = getContractStage();
  const userInfo = getUser(address);
  const staker = getStaker(address);
  console.log(staker);

  // If not connected, show a prompt and the Connect button
  if (!isConnected) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="60vh"
          textAlign="center"
          py={6}
        >
          <VuiBox mb={2} fontSize="lg" fontWeight="medium">
            Please first connect wallet
          </VuiBox>
          <ConnectKitButton />
        </VuiBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // If connected, show the original dashboard content
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total users" }}
                count={contractStage?.data?.[0].toString()}
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Price", fontWeight: "regular" }}
                count={"$" + (Number(contractStage?.data?.[3]) / 1e18).toString()}
                icon={{
                  color: "info",
                  component: <IoPricetagOutline size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "usdt liquidity" }}
                count={"$" + (Number(contractStage?.data?.[1]) / 1e18).toString()}
                icon={{
                  color: "info",
                  component: <FaMoneyCheck size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total supply" }}
                count={(Number(contractStage?.data?.[2]) / 1e18).toString()}
                icon={{
                  color: "info",
                  component: <FaMoneyCheck size="20px" color="white" />,
                }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="10px" justifyContent="space-around">
            <Grid item xs={12} lg={12} xl={4}>
              <WelcomeMark name={userInfo?.data?.username} />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking
                title={"Plan Tracking"}
                levels={userInfo?.data?.unlockedLevels}
                totalReward={userInfo?.data?.totalReward}
                directs={userInfo?.data?.directs}
              />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking
                title={"Stake Tracking"}
                levels={staker?.data?.[2]}
                totalReward={staker?.data?.[5]}
                directs={staker?.data?.[4]}
              />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
