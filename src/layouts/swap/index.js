/*  Swap Page – Vision UI React
    ------------------------------------------------------------
    NOTE: 100 % UI – no web3 logic.  Replace the TODO sections
    with your wagmi / ethers / viem calls.                    */

import { useEffect, useState } from "react";

// @mui
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

// Vision UI
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Wagmi / ConnectKit
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

// Icons
import { IoSwapVerticalSharp } from "react-icons/io5";

import { getPrice, getTokenBalance, getDaiBalance } from "web3/actions";

import { Modal, Box } from "@mui/material";
import SwapModal from "./components/Modal";

function Swap() {
  /* -----------------------------  local state  ---------------------------- */
  const [tokenIn, setTokenIn] = useState("0");
  const [tokenOut, setTokenOut] = useState("0");
  const [direction, setDirection] = useState("A-to-B"); // or "B-to-A"
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [rate, setRate] = useState(false);
  const [unityBalance, setUnityBalance] = useState(false);
  const [daiBalance, setDaiBalance] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* ----------------------------  wallet state  ---------------------------- */
  const { address, isConnected } = useAccount();

  const { data: rateWithDecimals } = getPrice();
  const { data: unityBalanceWithDecimals } = getTokenBalance(address);
  const { data: daiBalanceWithDecimals } = getDaiBalance(address);

  /* ----------------------------  handlers  -------------------------------- */

  useEffect(() => {
    const handleGetRate = () => {
      const daiPerUnity = Number(rateWithDecimals) / 1e18;
      const unityPerDai = 1 / daiPerUnity;
      setRate(unityPerDai);
    };

    handleGetRate();
  }, [rateWithDecimals]);

  useEffect(() => {
    const handleFetchBalances = () => {
      if (!unityBalanceWithDecimals || !daiBalanceWithDecimals) {
        return;
      }
      setUnityBalance((Number(unityBalanceWithDecimals) / 1e18)?.toFixed(2));
      setDaiBalance((Number(daiBalanceWithDecimals) / 1e18)?.toFixed(2));
    };

    handleFetchBalances();
  }, [unityBalanceWithDecimals, daiBalanceWithDecimals]);

  const handleSwitchDirection = () => {
    setDirection((d) => (d === "A-to-B" ? "B-to-A" : "A-to-B"));
    // Swap the values visually
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  };

  const handleGetQuote = async (value) => {
    setTokenIn(value);

    if (fromToken.symbol === "DAI") {
      setTokenOut(value * rate);
    } else {
      setTokenOut(value / rate);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
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

  /* ----------------------------  render  ---------------------------------- */
  if (!isConnected && !address)
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="70vh"
          textAlign="center"
        >
          <VuiTypography variant="lg" fontWeight="bold" mb={2}>
            Please connect your wallet
          </VuiTypography>
          <ConnectKitButton />
        </VuiBox>
      </DashboardLayout>
    );

  /* -------------------------------- UI ------------------------------------ */
  const tokenA = { symbol: "DAI", address: "0x320f0Ed6Fc42b0857e2b598B5DA85103203cf5d3" }; // hard-coded pair
  const tokenB = { symbol: "UNITY", address: "0x3Fc28ff6BB78acB702DF816D88525a85e6c7a7E0" };

  const fromToken = direction === "A-to-B" ? tokenA : tokenB;
  const toToken = direction === "A-to-B" ? tokenB : tokenA;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={8}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <VuiBox
              p={3}
              sx={{
                background:
                  "linear-gradient(135deg, rgba(29,41,64,0.9) 0%, rgba(21,32,50,0.9) 100%)",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,.2)",
              }}
            >
              <VuiTypography variant="h4" fontWeight="bold" mb={3} color="white">
                Token Swap
              </VuiTypography>

              {/* ----- FROM ----- */}
              <VuiTypography variant="caption" color="text" mb={1}>
                From ({fromToken.symbol})
              </VuiTypography>
              <VuiInput
                fullWidth
                value={tokenIn}
                onChange={(e) => handleGetQuote(e.target.value)}
                type="number"
                placeholder="0.0"
              />
              {/* TODO – web3: Use balance from the wallet */}
              <VuiTypography variant="caption" color="textSecondary" mt={1}>
                {fromToken.symbol === "DAI"
                  ? `Balance: ${daiBalance} DAI`
                  : `Balance: ${unityBalance} UNITY`}
              </VuiTypography>

              {/* Center swap-arrow button */}
              <VuiBox display="flex" justifyContent="center" my={2}>
                <IconButton
                  onClick={handleSwitchDirection}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                  size="large"
                >
                  <IoSwapVerticalSharp size={24} />
                </IconButton>
              </VuiBox>

              {/* ----- TO ----- */}
              <VuiTypography variant="caption" color="text" mb={1}>
                To ({toToken.symbol})
              </VuiTypography>
              <VuiInput fullWidth value={tokenOut} disabled placeholder="0.0" />
              {/* TODO – web3: Expected output, slippage, price impact */}
              <VuiTypography variant="caption" color="textSecondary" mt={1}>
                Estimated output
              </VuiTypography>

              {/* ----- DETAILS ----- */}
              <VuiBox mt={3} mb={2}>
                <VuiTypography
                  variant="caption"
                  color="textSecondary"
                  display="flex"
                  justifyContent="space-between"
                >
                  <span>Rate</span>
                  {/* TODO – web3: real rate */}
                  <span>
                    {rate ?? fromToken.symbol === "DAI"
                      ? `1 ${fromToken.symbol} ≈ ${rate?.toFixed(2).toString() + toToken.symbol}`
                      : `1 ${fromToken.symbol} ≈ ${
                          (1 / rate)?.toFixed(8).toString() + toToken.symbol
                        }`}
                  </span>
                </VuiTypography>
              </VuiBox>

              {/* ----- SWAP BUTTON ----- */}
              <VuiButton
                color="primary"
                variant="gradient"
                size="large"
                fullWidth
                disabled={Number(tokenIn) === 0 || loadingQuote}
                onClick={handleOpenModal}
              >
                Swap
              </VuiButton>
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        hideBackdrop={false}
        disableEscapeKeyDown={true}
      >
        <Box sx={style}>
          <SwapModal daiForUnity={fromToken.symbol === "DAI"} amount={tokenIn} />
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Swap;
