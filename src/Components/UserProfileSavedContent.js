import { Box, Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import React from 'react';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function UserProfileSavedContent() {
  return (
    <StyledEngineProvider injectFirst>
        <Box className='slide-left'>
        <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
                alt="green iguana"
                />
            </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
                alt="green iguana"
                />
            </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
                alt="green iguana"
                />
            </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={6} md={8}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
                alt="green iguana"
                />
            </CardActionArea>
            </Card>
        </Grid>
        </Grid>
    </Box>
  </StyledEngineProvider>
  )
}

export default UserProfileSavedContent