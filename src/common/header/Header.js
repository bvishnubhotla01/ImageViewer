import React, {Component} from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    grow: {
      flexGrow: 1
    },
    search: {
      position: 'relative',
      borderRadius: '4px',
      backgroundColor: '#c0c0c0',
      marginLeft: 0,
      width: '300px',
    },
    searchIcon: {
      width: '40px',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:'#000000'
    },
    inputInput: {
      paddingTop: '10px',
      paddingRight: '10px',
      paddingBottom: '10px',
      paddingLeft: '40px',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200
        }
      }
    },
    avatar: {
      width: 50,
      height: 50,
    },
    appHeader:{
      backgroundColor:'#263238'
    },
    hr:{
      height:'1.5px',
      backgroundColor:'#f2f2f2',
      marginLeft:'5px',
      marginRight:'5px'
    }
  })
  

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      searchString:''
    }
    this.handleSearch.bind(this)
  }
  handleSearch = (e) => {
      e.preventDefault();
      this.setState({searchString: e.target.value})
      this.props.searchHandler(e.target.value)
  }
    
    render(){
        const { classes, screen } = this.props;
        return (
            <div>
            <AppBar className={classes.appHeader}>
              <Toolbar> 

                { /* ********* Display Image Viewer Logo on all pages ************** */ }
                
                {(screen==="Login" || screen==="Home") && 
                <span className="logo">Image Viewer</span> }

                { /* ********* In case of Profile page Logo acts as Link to HomePage ************** */ }
                {(screen === "Profile") && 
                  <Link style={{ textDecoration: 'none', color: 'white' }} to="/home"><span className="header-logo">Image Viewer</span></Link>}
                <div className={classes.grow}/>

                { /*   Here, we are checking if the UI page is Home page, then display Search bar */ }
            {(screen === "Home") &&
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase 
                  name="searchString"
                  value={this.state.searchString}
                  onChange={this.handleSearch} 
                  placeholder="Search…" 
                  classes={{
                    input: classes.inputInput
                  }}/>
              </div>
            }

            { /*   Here, we are checking if the UI page is Home or Profile page, then display Profile icon */ }
            {(screen === "Home" || screen === "Profile")  &&
              <div>
                <IconButton onClick={this.handleClick}>
                  <Avatar alt="Profile Pic" src="profile.png" className={classes.avatar} style={{border: "1px solid #fff"}}/>
                </IconButton>
                <Popover
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                    <div style={{padding:'5px'}}>

                      { /*   If the UI page is Home page, then drop down on the profile icon should display 2 options : 1. My Account 2. Logout */ }
                      { (screen === "Home") &&
                        <div>
                          <MenuItem onClick={this.handleAccount}>My Account</MenuItem>
                          <div className={classes.hr}/>
                        </div>
                      }
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </div>
                </Popover>
              </div>
            }
          </Toolbar>
        </AppBar>
    </div>)
  }

  handleClick = (event) =>{
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleAccount = ()=>{
    // Perform navigate to Profile page by clicking on My Account dropdown action
    this.props.handleAccount();
    this.handleClose();
  }

  handleLogout = ()=>{
    // Perform logout operation
    this.props.handleLogout();
    this.handleClose();
  }

  handleClose = () =>{
    this.setState({ anchorEl: null });
  }
}

export default withStyles(styles)(Header)
    