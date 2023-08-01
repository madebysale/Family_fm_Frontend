import { Link } from 'react-router-dom';
import  LogoDar  from 'src/assets/images/logos/fm_logo.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '100px',
  marginTop:'18px',
  width: '100px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
   

<img className='logo-img' src = {LogoDar} alt='log'  style={{ marginBottom:"15px"}}/>
  
 
   
 
   
  
     
   
    
  )
};

export default Logo;
