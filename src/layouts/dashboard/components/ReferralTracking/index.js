import React from "react";
import { Card, Stack } from "@mui/material";
import VuiBox from "../../../../components/VuiBox";
import VuiTypography from "../../../../components/VuiTypography";
import colors from "../../../../assets/theme/base/colors";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import CircularProgress from "@mui/material/CircularProgress";

function ReferralTracking({ levels, title, members, account, isActive }) {
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  return (
    <Card
      sx={{
        height: "100%",
        background: linearGradient(
          gradients.cardDark.main,
          gradients.cardDark.state,
          gradients.cardDark.deg
        ),
      }}
    >
      <VuiBox sx={{ width: "100%" }}>
        <VuiBox
          display="flex"
          alignItems="center"
          justifyContent="space-beetween"
          sx={{ width: "100%" }}
          mb="40px"
        >
          <VuiTypography variant="lg" color="white" mr="auto" fontWeight="bold">
            {title}
          </VuiTypography>
        </VuiBox>
        <VuiBox
          display="flex"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
            },
            [breakpoints.up("md")]: {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          })}
        >
          {isActive ? (
            <>
              <Stack
                direction="column"
                spacing="20px"
                width="500px"
                maxWidth="50%"
                sx={({ breakpoints }) => ({
                  mr: "auto",
                  [breakpoints.only("md")]: {
                    mr: "75px",
                  },
                  [breakpoints.only("xl")]: {
                    width: "500px",
                    maxWidth: "40%",
                  },
                })}
              >
                <VuiBox
                  display="flex"
                  width="220px"
                  p="20px 22px"
                  flexDirection="column"
                  sx={({ breakpoints }) => ({
                    background: linearGradient(
                      cardContent.main,
                      cardContent.state,
                      cardContent.deg
                    ),
                    borderRadius: "20px",
                    [breakpoints.up("xl")]: {
                      maxWidth: "110px !important",
                    },
                    [breakpoints.up("xxl")]: {
                      minWidth: "180px",
                      maxWidth: "100% !important",
                    },
                  })}
                >
                  <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
                    Members
                  </VuiTypography>
                  <VuiTypography color="white" variant="lg" fontWeight="bold">
                    {Number(members)}
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  display="flex"
                  width="220px"
                  p="20px 22px"
                  flexDirection="column"
                  sx={({ breakpoints }) => ({
                    background: linearGradient(
                      cardContent.main,
                      cardContent.state,
                      cardContent.deg
                    ),
                    borderRadius: "20px",
                    [breakpoints.up("xl")]: {
                      maxWidth: "110px !important",
                    },
                    [breakpoints.up("xxl")]: {
                      minWidth: "180px",
                      maxWidth: "100% !important",
                    },
                  })}
                >
                  <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
                    Total Balance
                  </VuiTypography>
                  <VuiTypography color="white" variant="lg" fontWeight="bold">
                    {Number(account) / 1e6}
                  </VuiTypography>
                </VuiBox>
              </Stack>
              <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={Math.round((Number(levels) / 20) * 100)}
                  size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
                  color="success"
                />
                <VuiBox
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VuiBox
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <VuiTypography color="text" variant="button" mb="4px">
                      Unlocked Levels
                    </VuiTypography>
                    <VuiTypography
                      color="white"
                      variant="d5"
                      fontWeight="bold"
                      mb="4px"
                      sx={({ breakpoints }) => ({
                        [breakpoints.only("xl")]: {
                          fontSize: "32px",
                        },
                      })}
                    >
                      {Number(levels)}/20
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </VuiBox>
            </>
          ) : (
            <VuiTypography
              color="white"
              variant="d5"
              fontWeight="bold"
              mb="4px"
              sx={({ breakpoints }) => ({
                [breakpoints.only("xl")]: {
                  fontSize: "32px",
                },
              })}
            >
              NOT ACTIVE
            </VuiTypography>
          )}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;

// import React from "react";
// import { Card, Stack } from "@mui/material";
// import VuiBox from "../../../../components/VuiBox";
// import VuiTypography from "../../../../components/VuiTypography";
// import colors from "../../../../assets/theme/base/colors";
// import linearGradient from "../../../../assets/theme/functions/linearGradient";
// import CircularProgress from "@mui/material/CircularProgress";

// function ReferralTracking() {
//   const { info, gradients } = colors;
//   const { cardContent } = gradients;

//   return (
//     <Card
//       sx={{
//         height: "100%",
//         background: linearGradient(
//           gradients.cardDark.main,
//           gradients.cardDark.state,
//           gradients.cardDark.deg
//         ),
//       }}
//     >
//       <VuiBox sx={{ width: "100%" }}>
//         <VuiBox
//           display="flex"
//           alignItems="center"
//           justifyContent="space-beetween"
//           sx={{ width: "100%" }}
//           mb="40px"
//         >
//           <VuiTypography variant="lg" color="white" mr="auto" fontWeight="bold">
//             Referral Tracking
//           </VuiTypography>
//         </VuiBox>
//         <VuiBox
//           display="flex"
//           sx={({ breakpoints }) => ({
//             [breakpoints.up("xs")]: {
//               flexDirection: "column",
//               gap: "16px",
//               justifyContent: "center",
//               alignItems: "center",
//             },
//             [breakpoints.up("md")]: {
//               flexDirection: "row",
//               justifyContent: "flex-start",
//               alignItems: "center",
//             },
//           })}
//         >
//           <Stack
//             direction="column"
//             spacing="20px"
//             width="500px"
//             maxWidth="50%"
//             sx={({ breakpoints }) => ({
//               mr: "auto",
//               [breakpoints.only("md")]: {
//                 mr: "75px",
//               },
//               [breakpoints.only("xl")]: {
//                 width: "500px",
//                 maxWidth: "40%",
//               },
//             })}
//           >
//             <VuiBox
//               display="flex"
//               width="220px"
//               p="20px 22px"
//               flexDirection="column"
//               sx={({ breakpoints }) => ({
//                 background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
//                 borderRadius: "20px",
//                 [breakpoints.up("xl")]: {
//                   maxWidth: "110px !important",
//                 },
//                 [breakpoints.up("xxl")]: {
//                   minWidth: "180px",
//                   maxWidth: "100% !important",
//                 },
//               })}
//             >
//               <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
//                 Invited
//               </VuiTypography>
//               <VuiTypography color="white" variant="lg" fontWeight="bold">
//                 145 people
//               </VuiTypography>
//             </VuiBox>
//             <VuiBox
//               display="flex"
//               width="220px"
//               p="20px 22px"
//               flexDirection="column"
//               sx={({ breakpoints }) => ({
//                 background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
//                 borderRadius: "20px",
//                 [breakpoints.up("xl")]: {
//                   maxWidth: "110px !important",
//                 },
//                 [breakpoints.up("xxl")]: {
//                   minWidth: "180px",
//                   maxWidth: "100% !important",
//                 },
//               })}
//             >
//               <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
//                 Bonus
//               </VuiTypography>
//               <VuiTypography color="white" variant="lg" fontWeight="bold">
//                 1,465
//               </VuiTypography>
//             </VuiBox>
//           </Stack>
//           <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
//             <CircularProgress
//               variant="determinate"
//               value={33}
//               size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
//               color="success"
//             />
//             <VuiBox
//               sx={{
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//                 position: "absolute",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <VuiBox
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <VuiTypography color="text" variant="button" mb="4px">
//                   Unlocked Levels
//                 </VuiTypography>
//                 <VuiTypography
//                   color="white"
//                   variant="d5"
//                   fontWeight="bold"
//                   mb="4px"
//                   sx={({ breakpoints }) => ({
//                     [breakpoints.only("xl")]: {
//                       fontSize: "32px",
//                     },
//                   })}
//                 >
//                   5/20
//                 </VuiTypography>
//               </VuiBox>
//             </VuiBox>
//           </VuiBox>
//         </VuiBox>
//       </VuiBox>
//     </Card>
//   );
// }

// export default ReferralTracking;
