import React, { useState } from "react";
import { Card } from "@mui/material";
import VuiBox from "../../../../components/VuiBox";
import VuiTypography from "../../../../components/VuiTypography";
import gif from "../../../../assets/images/cardimgfree.png";

const WelcomeMark = ({ name }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <Card
      sx={() => ({
        height: "340px",
        py: "32px",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      })}
    >
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            Welcome back,
          </VuiTypography>
          <VuiTypography
            color="white"
            variant="h3"
            fontWeight="bold"
            mb="18px"
            onClick={handleCopy}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {copied ? "Copied!" : name}
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            Glad to see you again!
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
