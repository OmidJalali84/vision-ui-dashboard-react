// @ts-nocheck
import { useRef, useState } from "react";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import { Stepper, Step, StepLabel, Card } from "@mui/material";
import { approveUsdt, swap, approveUnity } from "web3/actions";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "web3/Web3Provider";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export default function SwapModal({ daiForUnity, amount }) {
  const amountRef = useRef();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { address } = useAccount();

  const handleApprove = async () => {
    setLoading(true);
    try {
      amount = (amount * 106) / 100;
      const tx = daiForUnity ? await approveUsdt(amount) : await approveUnity(amount);
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

  const handleSwap = async () => {
    setLoading(true);
    try {
      const tx = await swap(address, !daiForUnity, amount);
      await waitForTransactionReceipt(config, { hash: tx });
      toast.success("Swap request sent!");
    } catch (e) {
      console.error(e);
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
          Swap
        </VuiTypography>
      </VuiBox>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {["Approve", "Swap"].map((label) => (
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
            <VuiInput fullWidth value={amount} disabled />
            <VuiTypography variant="button" color="white">
              {daiForUnity ? "DAI" : "UNITY"}
            </VuiTypography>
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
        ) : (
          <VuiButton
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleSwap}
            fullWidth
          >
            {loading ? "Staking..." : "Swap"}
          </VuiButton>
        )}
      </VuiBox>
    </Card>
  );
}
