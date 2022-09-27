import { Alert, AppBar, Avatar, Badge, Box, Button, Dialog, Divider, IconButton, InputBase, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled, alpha, StyledEngineProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Home as HomeIcon, Notifications as NotificationsIcon, 
         Search as SearchIcon, AddBox as AddBoxIcon, AccountCircle, More as MoreIcon, HomeOutlined as HomeOutlinedIcon, Settings, MessageRounded} from '@mui/icons-material';

import { ReactComponent as AideaLogo} from '../Assets/AIDEA.svg';
import CreatePostModal from './CreatePostModal';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { getUserData } from '../Helpers/firebaseHelpers/getUserData';
import { StyledMenu } from '../Helpers/CustomComponents/StyledComponents';
import '../Styles/NavBarStyles.scss';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import SearchIcon from '@mui/icons-material/Search';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MoreIcon from '@mui/icons-material/More';


// styled components
const StyledToolbar = styled(Toolbar)({
    backgroundColor : '#ffffff', 
    color : '#262626', 
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
    borderBottom : '1px solid #d4d4d4'
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F5F5F5',
    '&:hover': {
      backgroundColor: '#D9D9D9',
      '&.searchIcon' :  {
        display : 'none'
      }

    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '40%',
    },
  }));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width : '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      //vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
  }));


function NavBar({user}) {


  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertDialog, setAlertDialog] = useState(false)
  const profileOpen = Boolean(anchorEl);
  const [ userData, setUserData] = useState('');

  const navigate = useNavigate();

  const signUserOut = () =>{
    auth.signOut();
    navigate('/');
  }

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAlertDialog = () =>{
    setAlertDialog(false)
  }

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  useEffect( () => {getUserData(user.displayName,'all').then(result => setUserData(result[0]))}
  , [])
  console.log(userData)


  //userData.then(result => {console.log(result)})

  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky" elevation={0} sx = {{borderBottom : '1px solid #efefef ', height : '60px'}}>
        <StyledToolbar>

            <AideaLogo style = {{height : '80%', margin : '1%'}} onClick = {() => navigate('/home')} className = 'navbar-logo' />
            
          <Search>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, width : '20%', justifyContent : 'space-evenly'}}>

            <IconButton
              size="large"
              aria-label="show 3 new notifications"
              color="inherit"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon   sx = {{width : '32px', height : '32px'}} />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="Add to feed "
              color="inherit"
              onClick={ user ? () => setCreatePostOpen(true) :
                () => setAlertDialog(true) }
            >

                <AddBoxIcon  sx = {{width : '32px', height : '32px'}}  />

            </IconButton>

            <IconButton  size = 'large' color="inherit" >
              <MessageRounded sx = {{width : '32px', height : '32px'}} />
            </IconButton>

            <Tooltip title="Manage Profile">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileClick}
                aria-controls={profileOpen ? 'account-menu' : undefined}
                aria-expanded={profileOpen ? 'true' : undefined}
              >
                  <Avatar alt= {userData.username} src={userData.profilePic} sx = {{width : '32px', height : '32px'}}  />

              </IconButton>
            </Tooltip>

          </Box>
          <StyledMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={profileOpen}
            onClose={handleProfileClose}
            onClick={handleProfileClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Stack direction = 'column'>
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <Avatar alt= {userData.username} src = ''/>
              </ListItemIcon>
              My Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings sx ={{width : '32px', height : '32px', marginRight : '8px', marginLeft : '-4px'}} />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem sx = {{display : 'flex', alignContent : 'center', justifyContent : 'center'}}>

              <Button onClick ={ user !== null ?  () => {signUserOut();
                                                  } : () =>navigate("/sign-up")}>
              
                {user ? 
                    <Typography variant = 'body' sx ={{color : 'black'}}>Log Out</Typography>
                    :
                    <Typography variant = 'body'>Sign Up</Typography>
                }

              </Button>

            </MenuItem>

          </Stack>

        </StyledMenu>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon  sx = {{width : '32px', height : '32px'}}  />
            </IconButton>
          </Box>
          </StyledToolbar>
      </AppBar>

      {user?.displayName ?  (
        <CreatePostModal open = {createPostOpen} handleClose = {() => setCreatePostOpen(false)} username = {user.displayName}/>)
          : ''  }

      <Dialog open = {alertDialog} onClose = { handleAlertDialog}> 
        <Alert
        sx = {{
          backgroundColor : 'rgb(255 255 255)',
          color : 'black',
          "& .MuiAlert-icon": {
            color: "black"
        }}}
        severity="warning"
          action={
            <Button color="inherit" size="small" onClick ={ () =>navigate("/sign-in")} >
              Login
            </Button>
                }
        >
          You need to be logged in to post. 

        </Alert>

      </Dialog>   

    </Box>
  </StyledEngineProvider>
  )
}

export default NavBar