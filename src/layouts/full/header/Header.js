import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';


const Header = (props) => {

  const location = useLocation();
  const getPageHeaderText = () => {
    switch (location.pathname) {
      case '/dashboard/home':
        return 'Dashboard';
      case '/dashboard/agreement':
        return 'Quotation';
      case '/dashboard/agreementlist':
        return 'Quotations List';
      case '/dashboard/Contract':
        return 'Contract List';
      case '/dashboard/Customer':
        return 'Customer List';
      case '/dashboard/salesperson':
        return 'Sales Representative List';
      case '/dashboard/Clickup':
        return 'Clickup';
      default:
        return '';
    }
  };
 


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
 
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      
      <ToolbarStyled>
        <IconButton

          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>
    
        <Typography className='heading-nw' variant="h4" sx={{ mb: 5 }}>
        {getPageHeaderText()}

      </Typography>

        






       
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Button variant="contained" color="primary"  target="_blank" href="https://adminmart.com/product/modernize-react-mui-dashboard-template/">
            Upgrade to Pro
          </Button> */}
           <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
