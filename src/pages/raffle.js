import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CLIENT_ID, DOMAIN } from "../config/config";
import {
  FormControl,
  MenuItem,
  Modal,
  Select,
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
import { AptosClient, AptosAccount, CoinClient, FaucetClient } from "aptos";
import { NODE_URL, FAUCET_URL } from "../config/section";;

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

export default function Raffles({ address }) {

  const client = new AptosClient(NODE_URL);
  const coinClient = new CoinClient(client);
  let enc = new TextEncoder();
  const admin_account = new AptosAccount(enc.encode("0xeb8f1dd138b30fd22726a901537e80acb23bc9a897a1c8552727dc5e1d28c32a"), "0x54e6a173cc3cff14740136277d1a4586d0fd372d368e49b675fe9889b00c21aa");
  const user_account = new AptosAccount(undefined, "0x4d9b73547ed4a62ebcda82df09c7ac5d7aef02b854415b951e3854bd3aa8d412");
  
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

  const [wallet, setWallet] = useState(undefined);
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
      var transactions = await window.martian.getAccountResources(wallet);
      console.log(transactions,'transactions----')
      var curPrice = 0;
      if(transactions[1].data.coin){
        curPrice = transactions[1].data.coin.value;
      }else{
        curPrice = transactions[0].data.coin.value;
      }
      if (curPrice >= betAmount * 10 ** 8) {
        let txnHash = await coinClient.transfer(admin_account, user_account, 1_000, { gasUnitPrice: BigInt(100) }); // <:!:section_5
        let result = await client.waitForTransaction(txnHash);
        console.log(result, 'result');
        handleOpenProcessing(false);

        // if (bettype === 1) {
        //   var rnd = Math.random() * 100;
        //   console.log(rnd,'3456789')
        // } else {
        //   console.log('bettype 2')
        // }
      } else {
        createNotify('error', 'Not enough Coin!');
      }
    }
  }

  const [bettype, setBetType] = useState(1);

  const changeBettype = (event) => {
    setBetType(event.target.value);
  };

  useEffect(() => {
    checkData();
  }, []);

  useEffect(() => {
    setWallet(address);
  }, [address]);

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
              <Box sx={{p:'0px',m:'0px'}}>
                <FormControl fullWidth sx={{border:'3px solid white',borderRadius:'20px',color:'white',bgcolor:'#fb00ff !important'}}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bettype}
                    onChange={changeBettype}
                    sx={{ fontSize: '25px' }}
                    className='betType'
                  >
                    <MenuItem value={1}>10x or Nothing</MenuItem>
                    <MenuItem value={2}>50/50</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
