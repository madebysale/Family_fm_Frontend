import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  
  return (
    <PageContainer title="Login" description="this is Login page">
      
      <Box
     
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
            // margin:'15px',
          },
        }}
      >
     
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
  
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className='grid-login'
          >
               
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', margin:'20px' }}>
            {/* <span style={{textAlign:'center',color:"red"}}>
First, the admin of VibzFM needs to verify you, and then you can <span >log In</span> .</span> */}
              <Box display="flex" alignItems="center" justifyContent="center" >
                {/* <div style={{width:'10px'}}> */}
                <Logo  />
                {/* </div> */}
               
              </Box>
              <AuthLogin
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Your Social Campaigns
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                    Don't have an account?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Register Here
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
