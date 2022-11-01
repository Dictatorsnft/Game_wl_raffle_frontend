import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { checkWallet, createNotify, truncate } from "./utils/service";
import { CLIENT_ID, DOMAIN } from "./config/config";
import { toast } from "react-toastify";
import { Backdrop, Fade, Grid, Menu, MenuItem, Modal, Toolbar } from "@mui/material";
import logoIcon from "./assets/APIK.png";
import aptosIcon from "./assets/wallet/aptos.png";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

var effectFlag = false;
export default function MainLayout({ getWallet }) {

  const disData = JSON.parse(localStorage.getItem("discordUser"));
  const navigate = useNavigate();
  const [aptosAccount, setAccount] = useState(undefined);
  const [anchorElUser2, setAnchorElUser2] = useState(null);
  const [anchorElUser4, setAnchorElUser4] = useState(null);
  const ConnectWallet = async () => {
    try {
      var wallet = await window.martian.connect();
      setAccount(wallet.address);
      getWallet(wallet.address);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const DisconnectWallet = async () => {
    handleCloseUserMenu4();
    await window.martian.disconnect();
    setAccount(undefined);
    getWallet(undefined);
  };

  const handleOpenUserMenu2 = (event) => {
    setAnchorElUser2(event.currentTarget);
  };

  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  const handleOpenUserMenu4 = (event) => {
    setAnchorElUser4(event.currentTarget);
  };

  const handleCloseUserMenu4 = () => {
    setAnchorElUser4(null);
  };

  const handleDiscordLogin = async () => {
    const OAuthScope = ["identify"].join(" ");
    const OAuthData = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: `${DOMAIN}auth/callback`,
      scope: OAuthScope,
    });
    window.location.href = `https://discordapp.com/oauth2/authorize?${OAuthData}`;
  };

  const handleDiscordLogout = async () => {
    await localStorage.removeItem("discordUser");
    window.location.reload();
  };

  useEffect(() => {
    if (effectFlag === false) {
      effectFlag = true;
      ConnectWallet();
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar sx={{ background: "#512da8", boxShadow: "none" }}>
        <Toolbar sx={{ m: "10px 50px", p: "0px !important" }} className="m0p10">
          <Typography
            variant="h4"
            sx={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              display: "flex",
            }}
            component="div"
            className="rdc-text-m"
          >
            <img src={logoIcon} width='100px'/>
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              paddingLeft: "30px",
            }}
            className="dn"
          >
            <Button
              sx={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
            >
              Home
            </Button>
            <Button
              sx={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
              onClick={() => {
                navigate("/raffles");
              }}
            >
              Lottery
            </Button>
            <Button
              sx={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
              // onClick={() => {
              //   navigate('/coinflip')
              // }}
            >
              CoinFlip
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: "1",
              display: "flex",
              justifyContent: "flex-end",
              py: 1,
            }}
            className="dn"
          >
            {disData ? (
              <Box sx={{ flexGrow: 0 }}>
                {aptosAccount ? (
                  <Button
                    variant="contained"
                    sx={{
                      display: "flex",
                      textTransform: "unset",
                      bgcolor: "#fb00ff !important",
                      height: "100%",
                    }}
                    onClick={handleOpenUserMenu4}
                    className="btn"
                    size="large"
                    startIcon={
                      <img
                        src={aptosIcon}
                        style={{ width: "24px", borderRadius: "50%" }}
                      />
                    }
                  >
                    <Typography>{`${truncate(
                      aptosAccount,
                      [5, 5]
                    )}`}</Typography>
                  </Button>
                ) : (
                  <Button
                    sx={{
                      textTransform: "unset",
                      bgcolor: "#fb00ff !important",
                    }}
                    variant="contained"
                    size="large"
                    onClick={ConnectWallet}
                    className="btn"
                  >
                    Connect Aptos
                  </Button>
                )}
              </Box>
            ) : (
              <Button
                onClick={handleDiscordLogin}
                sx={{
                  textTransform: "unset",
                  bgcolor: "#fb00ff !important",
                  fontSize: "16px",
                  fontWeight: "bold",
                  p: "10px",
                }}
                variant="contained"
                size="large"
                className="btn"
              >
                Login With Discord
              </Button>
            )}

            {disData ? (
              disData && disData.avatar !== null ? (
                <img
                  // src={`https://lh3.google.com/u/0/d/1zed-ayMn6z7qhdg760Uv5_C27Fsve1Wy=w200-h190-p-k-nu-iv1`}
                  src={`https://cdn.discordapp.com/avatars/${disData.id}/${disData.avatar}.webp?size=128`}
                  alt="d_avatar"
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    marginLeft: "20px",
                    background:'#fb00ff'
                  }}
                  onClick={handleOpenUserMenu2}
                />
              ) : (
                <AccountCircleIcon onClick={handleOpenUserMenu2} sx={{ color: "white" }} />
              )
            ) : (
              <></>
            )}
            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorElUser2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser2)}
              onClose={handleCloseUserMenu2}
              className="usermenu"
            >
              <MenuItem onClick={handleDiscordLogout} sx={{bgcolor:'#fb00ff'}}>
                <Typography textAlign="center" sx={{ px: "20px" ,bgcolor:'#fb00ff'}}>
                  LogOut
                </Typography>
              </MenuItem>
            </Menu>
            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorElUser4}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser4)}
              onClose={handleCloseUserMenu4}
              className="usermenu"
            >
              <MenuItem onClick={DisconnectWallet}>
                <Typography textAlign="center" sx={{ px: "20px" }}>
                  Disconnect
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="mmt80 rdc-pd-m" sx={{ flexGrow: 1, pt: 11, height:'calc(100vh - 88px)',overflowY:'overlay'}}>
        <Outlet />
      </Box>
    </Box>
  );
}
