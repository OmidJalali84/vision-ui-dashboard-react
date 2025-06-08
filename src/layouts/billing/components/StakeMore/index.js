// @ts-nocheck
import { useRef, useState } from "react";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { Stepper, Step, StepLabel, Card } from "@mui/material";
import { approveUsdt, getStackerInfo, stake } from "web3/actions";
import { waitForTransactionReceipt } from "@wagmi/core";
import { zeroAddress } from "viem";
import { config } from "web3/Web3Provider";
import { toast } from "react-toastify";

export default function StakeMore({ staker }) {
  const amountRef = useRef();
  const [loading, setLoading] = useState(false);
  const [referrer, setReferrer] = useState("");
  const [amount, setAmount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const referrerInfo = getStackerInfo(referrer);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const amt = Number(amountRef.current.value).toString();
      console.log(amt);
      const tx = await approveUsdt(amt);
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Approval successful!");
      setActiveStep(1);
    } catch (e) {
      console.error(e);
      toast.error(`Approval failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async () => {
    console.log(referrer);

    setLoading(true);
    try {
      if (staker?.data?.[0] !== zeroAddress) {
        setReferrer(zeroAddress);
      }
      console.log(referrer);
      const tx = await stake(amount, referrer);
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Stake request sent!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckReferral = () => {
    setLoading(true);
    try {
      if (referrerInfo?.data?.[0] && referrerInfo?.data?.[0] !== zeroAddress) {
        toast.success("Referral Confirmed!");
        setActiveStep(2);
      } else {
        toast.error("Invalid Referral!");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card // bgGradient={`linear-gradient(135deg, #141727 0%, #3A416F 100%)`}
      borderRadius="20px"
      p={4}
      width="400px"
      mx="auto"
    >
      {/* Header */}
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <VuiTypography variant="h5" color="white" fontWeight="bold">
          Stake
        </VuiTypography>
      </VuiBox>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {(staker?.data?.[0] === zeroAddress
          ? ["Approve", "Referrel", "Stake"]
          : ["Approve", "Stake"]
        ).map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: (theme) => ({
                  color: theme.palette.grey[700],
                  "&.Mui-active": { color: theme.palette.info.main },
                  "&.Mui-completed": { color: theme.palette.success.main },
                }),
              }}
            >
              <VuiTypography variant="caption" color="white">
                {label}
              </VuiTypography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Amount Input */}
      {activeStep === 0 ? (
        <VuiBox mb={2}>
          <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
            Amount in USD
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" gap={1}>
            <VuiBox flexGrow={1}>
              <VuiBox
                component="input"
                ref={amountRef}
                type="number"
                placeholder="0.00"
                disabled={loading}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  width: "100%",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "1rem",
                  "&:focus": {
                    outline: "none",
                    borderColor: "#4FD1C5",
                  },
                }}
              />
            </VuiBox>
            <VuiTypography variant="button" color="white">
              USDT
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      ) : activeStep === 1 && staker?.data?.[0] === zeroAddress ? (
        <VuiBox mb={2}>
          <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
            Referral
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" gap={1}>
            <VuiBox flexGrow={1}>
              <VuiBox
                component="input"
                ref={amountRef}
                type="text"
                placeholder="Referral Code"
                disabled={loading}
                value={referrer}
                onChange={(e) => setReferrer(e.target.value)}
                sx={{
                  width: "100%",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "1rem",
                  "&:focus": {
                    outline: "none",
                    borderColor: "#4FD1C5",
                  },
                }}
              />
            </VuiBox>
          </VuiBox>
        </VuiBox>
      ) : null}

      {/* Action Button */}
      <VuiBox display="flex" flexDirection="column" gap={2} mt={3}>
        {activeStep === 0 ? (
          <VuiButton
            variant="contained"
            color="info"
            disabled={loading}
            onClick={handleApprove}
            fullWidth
          >
            {loading ? "Approving…" : "Approve"}
          </VuiButton>
        ) : activeStep === 1 && staker?.data?.[0] === zeroAddress ? (
          <VuiButton
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleCheckReferral}
            fullWidth
          >
            {loading ? "Checking..." : "Check"}
          </VuiButton>
        ) : (
          <VuiButton
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleStake}
            fullWidth
          >
            {loading ? "Staking..." : "Stake"}
          </VuiButton>
        )}
      </VuiBox>
    </Card>
  );
}
