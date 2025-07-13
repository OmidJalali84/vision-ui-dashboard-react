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
import { useState } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

import VuiTypography from "components/VuiTypography";
import {
  claimIsOpen,
  isPaused,
  openClaim,
  closeClaim,
  pause,
  unpause,
  openSwap,
  totalAvailableRewards,
  changeLevel1,
  changeLevel1Stake,
} from "web3/actions";
import { swapIsOpen } from "web3/actions";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "web3/Web3Provider";
import colors from "assets/theme/base/colors";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";

function Owner() {
  const { gradients, info } = colors;

  const [loadingClaim, setLoadingClaim] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingSwap, setLoadingSwap] = useState(false);
  const [loadinglevel1, setLoadingSwapLevel1] = useState(false);
  const [loadinglevel1Stake, setLoadingSwapLevel1Stake] = useState(false);
  const [level1, setLevel1] = useState("");
  const [level1Stake, setLevel1Stake] = useState("");

  const claimIsOpenValue = claimIsOpen();
  const isPausedValue = isPaused();
  const totalRewards = totalAvailableRewards();

  const handleOpenOrCloseClaim = async () => {
    setLoadingClaim(true);
    try {
      const tx = (await claimIsOpenValue?.data) === true ? closeClaim() : openClaim();
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success(`${claimIsOpenValue?.data === true ? "Close" : "Open"} request sent!`);
    } catch (e) {
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setLoadingClaim(false);
    }
  };

  const handlePauseOrUnpause = async () => {
    setLoadingPause(true);

    try {
      const tx = (await isPausedValue?.data) === true ? unpause() : pause();
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success(`${isPausedValue?.data === true ? "Unpause" : "Pause"} request sent!`);
    } catch (e) {
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setLoadingPause(false);
    }
  };

  const handleOpenSwap = async () => {
    setLoadingSwap(true);
    try {
      const tx = await openSwap();
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Open Swap request sent!");
    } catch (e) {
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setLoadingSwap(false);
    }
  };

  const handleChangeLevel1 = async () => {
    if (!level1 || isNaN(level1)) {
      toast.error("Please enter a valid number");
      return;
    }

    setLoadingSwapLevel1(true);
    try {
      const tx = await changeLevel1(level1);
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Change minimum request sent!");
    } catch (e) {
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setLoadingSwapLevel1(false);
    }
  };

  const handleChangeLevel1Stake = async () => {
    if (!level1Stake || isNaN(level1Stake)) {
      toast.error("Please enter a valid number");
      return;
    }

    setLoadingSwapLevel1Stake(true);
    try {
      const tx = await changeLevel1Stake(level1Stake);
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Change minimum request sent!");
    } catch (e) {
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setLoadingSwapLevel1Stake(false);
    }
  };

  // If connected, show the original dashboard content
  return (
    <Grid container spacing={3} mt={10} justifyContent={"space-evenly"}>
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
          {claimIsOpenValue?.data === true ? "Close Claim" : "Open Claim"}
        </VuiTypography>

        <VuiTypography variant="h3" color="white" fontWeight="bold" mb="16px">
          {Number(totalRewards?.data) / 1e18} DAI
        </VuiTypography>

        <VuiBox>
          <VuiButton
            variant="contained"
            color="info"
            fullWidth
            disabled={loadingClaim}
            onClick={handleOpenOrCloseClaim}
          >
            {loadingClaim
              ? claimIsOpenValue?.data === true
                ? "Closing..."
                : "Opening..."
              : claimIsOpenValue?.data === true
              ? "Close"
              : "Open"}
          </VuiButton>
        </VuiBox>
      </VuiBox>

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
          {isPausedValue?.data === true ? "Unpause Stake" : "Pause Stake"}
        </VuiTypography>

        <VuiBox>
          <VuiButton
            variant="contained"
            color="info"
            fullWidth
            disabled={loadingPause}
            onClick={handlePauseOrUnpause}
          >
            {loadingPause
              ? isPausedValue?.data === true
                ? "Unpausing..."
                : "Pausing..."
              : isPausedValue?.data === true
              ? "Unpause"
              : "Pause"}
          </VuiButton>
        </VuiBox>
      </VuiBox>

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
          Open Swap
        </VuiTypography>

        <VuiBox>
          <VuiButton
            variant="contained"
            color="info"
            fullWidth
            disabled={loadingSwap}
            onClick={handleOpenSwap}
          >
            {loadingSwap ? "Opening..." : "Open"}
          </VuiButton>
        </VuiBox>
      </VuiBox>

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
          Change Minimum Unity & Unirx
        </VuiTypography>

        <VuiBox>
          <VuiInput
            fullWidth
            value={level1}
            onChange={(e) => setLevel1(e.target.value)}
            type="number"
            placeholder="0.0"
          />
          <VuiButton
            variant="contained"
            color="info"
            fullWidth
            disabled={loadinglevel1}
            onClick={handleChangeLevel1}
          >
            {loadinglevel1 ? "Changing..." : "Change"}
          </VuiButton>
        </VuiBox>
      </VuiBox>

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
          Change Minimum Stake
        </VuiTypography>
        <VuiInput
          fullWidth
          value={level1Stake}
          onChange={(e) => setLevel1Stake(e.target.value)}
          type="number"
          placeholder="0.0"
        />
        <VuiBox>
          <VuiButton
            variant="contained"
            color="info"
            fullWidth
            disabled={loadinglevel1Stake}
            onClick={handleChangeLevel1Stake}
          >
            {loadinglevel1Stake ? "Changing..." : "Change"}
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </Grid>
  );
}

export default Owner;
