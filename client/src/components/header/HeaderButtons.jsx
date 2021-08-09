import { useContext, useState } from 'react';
import {Box, Button, makeStyles, Typography, Badge} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import LoginDialog from '../login/LoginDialog';
import Profile from './Profile';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

const useStyle = makeStyles({
    login : {
        background:'#FFFFFF',
        color:'#2874f0',
        textTransform:'none',
        fontWeight: 600,
        borderRadius:2,
        padding: '5px 40px',
        boxShadow:'none'
    },
    wrapper : {
        margin: '0 7% 0 auto',
        display : 'flex',
        '& > *' : {
            marginRight: 50,
            alignItems:'center',
            textDecoration:'none',
            color:'#fff'
        }
    },
    container : {
        display : 'flex',
    }
})

const HeaderButtons = () => {
    const classes = useStyle();
    const [open,setOpen] = useState(false);
    const {account,setAccount} = useContext(LoginContext);

    const {cartItems} = useSelector(state => state.cart);

    const openLoginDialog = () => {
        setOpen(true);
    }

    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount}/>:
                <Link>
                    <Button variant="contained" className={classes.login} onClick={openLoginDialog} >Login</Button>
                </Link>
            }
            <Typography style={{marginTop:4}}>More</Typography>
            <Link to="/cart" className={classes.container}>
                <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCart/>
                </Badge>    
                <Typography style={{marginLeft:10}}>Cart</Typography>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount}/>
        </Box>
    )
}

export default HeaderButtons;