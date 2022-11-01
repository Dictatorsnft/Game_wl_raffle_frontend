import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import box1 from "../assets/box/box1.png";
import { Grid } from '@mui/material';

export default function MediaControlCard() {
  const theme = useTheme();

    return (
      <Box sx={{pb:'30px'}}>
            <Box>
                <h1>
                    Recent History
                </h1>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box sx={{pb:'30px'}}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={box1}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%' }}>
                            <CardContent sx={{ flex: '1 auto',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                            <Typography component="div" variant="h5">
                                AWW...fT5 opened 1 APT and won 1 APT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{textAlign:'right'}}>
                                2mins ago
                            </Typography>
                            </CardContent>
                        </Box>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
      </Box>
  );
}
