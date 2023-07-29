import { Link } from 'react-router-dom';
import  LogoDar  from 'src/assets/images/logos/fm_logo.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '100px',
  marginTop:'18px',
  width: '220px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
   

 <img src = {LogoDar} alt='log' height={70} style={{marginLeft:"15px", marginBottom:"25px"}}/>
   
 
   
  
     
   
    
  )
};

export default Logo;
