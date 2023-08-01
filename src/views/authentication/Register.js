import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';

const Register2 = () => (
  <PageContainer title="Register" description="this is Register page">
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
          margin:'15px'
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={20}
          sm={12}
          lg={6}
          xl={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className='grid-regis'
        >
          <Card elevation={9} sx={{ p: 1, zIndex: 1, width: '200%', maxWidth: '700px' ,margin:'15px'}}>
            <Box display="flex" alignItems="center" justifyContent="center" >
              <Logo />
            </Box>
            <AuthRegister
          
              subtitle={
                <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Already have an Account?
                  </Typography>
                  <Typography 
                    component={Link}
                    to="/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Sign In
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

export default Register2;
