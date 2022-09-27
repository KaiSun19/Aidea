import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react';
import '../Styles/LandingPageCardStyles.scss';

function landingPageCard({media}) {

    if(media.includes('firebasestorage')){
        return (
            <Card className='landingPage-card'>
                <CardMedia
                component="img"
                image={media}
                alt="example post"
                />
            </Card>
            )
    }
    else{
        return(
            <Card className='landingPage-card'>
                <CardContent>

                    <Typography  variant="h3" component="div">
                        {media}
                    </Typography>

                </CardContent>
            </Card>
        )
    }
}

export default landingPageCard