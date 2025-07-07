/*
=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoGlobe, IoPricetagOutline } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";

// Wagmi & ConnectKit
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { getContractStage, getUser, getUserTeam } from "web3/actions";
import Owner from "./components/Owner";
import { contractOwner } from "web3/helper";

function Overview() {
  const { address, isConnected } = useAccount();
  const contractStage = getContractStage();
  const userInfo = getUser(address);
  const userTeam = getUserTeam(address);
  // If not connected, show a prompt and the Connect button
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
                title={{ text: "total directs" }}
                count={userInfo?.data?.directs.toString()}
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total members" }}
                count={Number(userTeam?.data?.[6]).toString()}
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Reward" }}
                count={
                  "$" +
                  (
                    (Number(userInfo?.data?.tokenPlan?.totalReward) +
                      Number(userInfo?.data?.pointPlan?.totalReward) +
                      Number(userInfo?.data?.stakePlan?.totalReward)) /
                    1e18
                  ).toString()
                }
                icon={{
                  color: "info",
                  component: <FaMoneyCheck size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Unity Price", fontWeight: "regular" }}
                count={"$" + (Number(contractStage?.data?.[3]) / 1e18).toFixed(8).toString()}
                icon={{
                  color: "info",
                  component: <IoPricetagOutline size="22px" color="white" />,
                }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="10px" justifyContent="space-around">
            <Grid item xs={12} lg={6} xl={6}>
              <WelcomeMark name={userInfo?.data?.username} />
            </Grid>
            <Grid item xs={12} lg={6} xl={6}>
              <ReferralTracking
                title={"Unity Plan Tracking"}
                levels={userInfo?.data?.tokenPlan?.unlockedLevels}
                account={userTeam?.data?.[0]}
                members={userTeam?.data?.[3]}
                isActive={userInfo?.data?.tokenPlan?.isActive}
              />
            </Grid>
            <Grid item xs={12} lg={6} xl={6}>
              <ReferralTracking
                title={"Unirx Tracking"}
                levels={userInfo?.data?.pointPlan?.unlockedLevels}
                account={userTeam?.data?.[1]}
                members={userTeam?.data?.[4]}
                isActive={userInfo?.data?.pointPlan?.isActive}
              />
            </Grid>
            <Grid item xs={12} lg={6} xl={6}>
              <ReferralTracking
                title={"Stake Tracking"}
                levels={userInfo?.data?.stakePlan?.unlockedLevels}
                account={userTeam?.data?.[2]}
                members={userTeam?.data?.[5]}
                isActive={userInfo?.data?.stakePlan?.isActive}
              />
            </Grid>
          </Grid>
        </VuiBox>
        {address === contractOwner ? <Owner /> : null}
      </VuiBox>
    </DashboardLayout>
  );
}

export default Overview;
