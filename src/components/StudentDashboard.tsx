import {useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import UserProfile from './UserProfile';
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import ViewUser from './ViewUser';
import { Button } from '@mui/material';
import { Widgets } from '@mui/icons-material';
import { Interface } from 'readline';

import ShowLeaves from './ShowLeaves';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/heet434">
        Heet Patel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoadingComponent = () => <div>Loading...</div>;

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Student({userLoginUtility}: {userLoginUtility: any}) {

    interface studentData {
        studentData: {
            studentData: {
                roll_no: number;
                name: string;
                branch: string;
                stream: string;
                joining_year: number;
            };
            leaveData: [{
                leave_id: number;
                leave_date: number;
                reason: string;
                user_id: number;
                user_role: string;
                status: string;
                course_code: string;
            }];
            enrollmentData: [{
                roll_no: number;
                course_code: string;
                leave_percentage: number;
            }];
        }
    }

    // Secure the route
    const navigate = useNavigate();
    useEffect(() => {
        if(!userLoginUtility.getUserStatus()){
            alert("User is not logged in, please sign in to continue.");
            navigate('/');
        }
    }, [])
    const [studentData, setStudentData] = React.useState<any>(null); // Initialize as null

  // Fetch student data on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = UserProfile.getUserName();
        const response = await axios.get(`http://localhost:5001/studentData`, { params: { user_id } });
        setStudentData(response.data);
      } catch (error) {
        console.error('Cannot get Student Data', error);
        // Handle error, e.g., logging, error reporting, etc.
      }
    };

    fetchData(); // Fetch data
  }, []);

  // States
  const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
    setOpen(!open);
    };
    const [openUser, setOpenUser] = React.useState(false);

  // If data is still loading, render the loading component
  if (!studentData) {
    return <LoadingComponent />;
  }
  console.log(studentData.studentData.name);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
               Welcome {studentData.studentData.name}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'flex-end',
              px: [1],
            }}
          > 
            <Button style={{ width: '100%' }} onClick={() => setOpenUser(!openUser)}>
                {openUser ? 'View Dashboard' : 'View User'}
            </Button>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List> */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            {openUser ? <ViewUser user = {{userData: studentData.studentData,isOpen: openUser}}/> : null}
            {!openUser ?
            <div>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <ShowLeaves leaves={studentData.leaveData}/>
                  {/* <Chart /> */}
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    Nice
                  {/* <Deposits /> */}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    Meet
                  {/* <Orders /> */}
                </Paper>
            </Grid>
            </div> : null}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}