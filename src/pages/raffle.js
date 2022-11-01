import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CLIENT_ID, DOMAIN } from "../config/config";
import {
  Modal,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import box1 from "../assets/box/box1.png";
import box2 from "../assets/box/box2.png";
import box3 from "../assets/box/box3.png";
import box4 from "../assets/box/box4.png";
import box5 from "../assets/box/box5.png";
import box6 from "../assets/box/box6.png";
import RecentHistory from './history';
import loadingGif from "../assets/processing.gif";
import { createNotify } from "../utils/service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1a1f2e",
  width: "500px",
  height: "350px",
  borderRadius: "12px",
  border:'0px',
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const loadingStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  width: "500px",
  height: "290px",
  borderRadius: "12px",
  border:'0px',
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function Raffles({wallet}) {
  
  const disData = JSON.parse(localStorage.getItem("discordUser"));
  const [openModal, setOpenModal] = useState(false);

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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const checkData = async () => {
    if (!disData) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const [processing, setProcessing] = useState(false);
  const handleOpenProcessing = () => setProcessing(true);
  const handleprocessing = () => setProcessing(false);
  const OpenBox = async(betAmount) => {
    if (!disData) {
      createNotify('error', 'Please Login with Discord!');
    } else if (!wallet) {
      console.log(wallet,'wallet')
      createNotify('error', 'Please Connect Wallet!');
    } else {
      handleOpenProcessing(true);
      var wallet = await window.martian.connect();
      var transactions = await window.martian.getAccountResources(wallet.address);
      console.log(transactions,'transactions----')
      var curPrice = 0;
      if(transactions[1].data.coin){
        curPrice = transactions[1].data.coin.value;
      }else{
        curPrice = transactions[0].data.coin.value;
      }
      if (curPrice >= betAmount * 10 ** 8) {
        console.log(betAmount,'3456789')
      } else {
        createNotify('error', 'Not enough Coin!');
      }
    }
  }
  useEffect(() => {
    checkData();
  }, []);

  return (
    <Box sx={{ px: "50px" }} className="px10">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="mw8h4">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="mw7"
            sx={{ width: "310px", textAlign: "center" }}
          >
            PLEASE LOGIN TO YOUR DISCORD TO CREATE A NEW RAFFLE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              className="btn"
              sx={{ color: "white !important",bgcolor:'#fb00ff !important' }}
              onClick={handleDiscordLogin}
            >
              Login With Discord
            </Button>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={processing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={loadingStyle}>
          <img src={loadingGif} style={{borderRadius:'12px'}} />
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100% !important",
          paddingBottom: "50px",
        }}
      >
        <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
          <Box>
            <h1>
            JUNGLEBOX LOTTERY
            </h1>
          </Box>
          <Box sx={{display:'flex',gap:'30px',mb:'30px'}}>
            <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
              <h1>
                Token
              </h1>
              <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{height:'50px',fontSize:'25px',border:'3px solid white',borderRadius:'20px',color:'white',bgcolor:'#fb00ff !important'}}>
                $APT 
              </Button>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
              <h1>
                Muliplier
              </h1>
              <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{height:'50px',fontSize:'25px',border:'3px solid white',borderRadius:'20px',color:'white',bgcolor:'#fb00ff !important'}}>
                10x or Nothing
              </Button>
            </Box>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item md={4} lg={2} sx={{display:'flex'}}>
                <Box sx={{border:'1px solid white',borderRadius:'12px',bgcolor:'rgb(144 202 249 / 50%)'}}>
                  <img src={box1} style={{width:'100%',borderRadius:'12px'}} />
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button sx={{background:'#512da8 !important',textAlign:'center',px:'20px',color:'white',fontSize:'20px'}}>Volcano Box</Button>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'30px'}}>Price : $0.5 APT</Typography>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',p:'10px'}}>
                    <Button variant="contained" sx={{bgcolor:'#fb00ff',color:'white',fontSize:'20px'}} fullWidth onClick={()=>{OpenBox(0.5)}}>Open</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} lg={2} sx={{display:'flex'}}>
                <Box sx={{border:'1px solid white',borderRadius:'12px',bgcolor:'rgb(144 202 249 / 50%)'}}>
                  <img src={box2} style={{width:'100%',borderRadius:'12px'}} />
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button sx={{background:'#512da8 !important',textAlign:'center',px:'20px',color:'white',fontSize:'20px'}}>eye box</Button>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'30px'}}>Price : $1 APT</Typography>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',p:'10px'}}>
                    <Button variant="contained" sx={{ bgcolor: '#fb00ff', color: 'white', fontSize: '20px' }} fullWidth onClick={() => {
                      OpenBox(1)
                    }}>Open</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} lg={2} sx={{display:'flex'}}>
                <Box sx={{border:'1px solid white',borderRadius:'12px',bgcolor:'rgb(144 202 249 / 50%)'}}>
                  <img src={box3} style={{width:'100%',borderRadius:'12px'}} />
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button sx={{background:'#512da8 !important',textAlign:'center',px:'20px',color:'white',fontSize:'20px'}}>Crystal box</Button>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'30px'}}>Price : $1.5 APT</Typography>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',p:'10px'}}>
                    <Button variant="contained" sx={{ bgcolor: '#fb00ff', color: 'white', fontSize: '20px' }} fullWidth onClick={() => {
                      OpenBox(1.5)
                    }}>Open</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} lg={2} sx={{display:'flex'}}>
                <Box sx={{border:'1px solid white',borderRadius:'12px',bgcolor:'rgb(144 202 249 / 50%)'}}>
                  <img src={box4} style={{width:'100%',borderRadius:'12px'}} />
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button sx={{background:'#512da8 !important',textAlign:'center',px:'20px',color:'white',fontSize:'20px'}}>Volacnp</Button>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'30px'}}>Price : $2.5 APT</Typography>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',p:'10px'}}>
                    <Button variant="contained" sx={{ bgcolor: '#fb00ff', color: 'white', fontSize: '20px' }} fullWidth onClick={() => {
                      OpenBox(2.5)
                    }}>Open</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} lg={2} sx={{display:'flex'}}>
                <Box sx={{border:'1px solid white',borderRadius:'12px',bgcolor:'rgb(144 202 249 / 50%)'}}>
                  <img src={box5} style={{width:'100%',borderRadius:'12px'}} />
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button sx={{background:'#512da8 !important',textAlign:'center',px:'20px',color:'white',fontSize:'20px'}}>Waterfall box</Button>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'30px'}}>Price : $5 APT</Typography>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',p:'10px'}}>
                    <Button variant="contained" sx={{ bgcolor: '#fb00ff', color: 'white', fontSize: '20px' }} fullWidth onClick={() => {
                      OpenBox(5)
                    }}>Open</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} lg={2} sx={{display:'flex'}}>
                <Box sx={{border:'1px solid white',borderRadius:'12px',bgcolor:'rgb(144 202 249 / 50%)'}}>
                  <img src={box6} style={{width:'100%',borderRadius:'12px'}} />
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button sx={{background:'#512da8 !important',textAlign:'center',px:'20px',color:'white',fontSize:'20px'}}>box</Button>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'30px'}}>Price : $10 APT</Typography>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',p:'10px'}}>
                    <Button variant="contained" sx={{ bgcolor: '#fb00ff', color: 'white', fontSize: '20px' }} fullWidth onClick={() => {
                      OpenBox(10)
                    }}>Open</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <RecentHistory />
    </Box>
  );
}
