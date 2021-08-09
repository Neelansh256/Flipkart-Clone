import { useState } from "react";
import { Box, Dialog,DialogContent,makeStyles,Typography,Button,TextField} from "@material-ui/core";
import { authenticateSignup,authenticateLogin } from "../../service/api.js";

const useStyle = makeStyles({
    component : {
        height : '70vh',
        width : '90vh'
    },
    image : {
        backgroundImage : `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        height : '70vh',
        backgroundRepeat : 'no-repeat',
        backgroundColor : '#2874f0',
        width : '40%',
        padding : '45px 35px',
        backgroundPosition : 'center 85%',
        '& > *' : {
            color : '#fff',
            fontWeight : 600
        }
    },
    login : {
        padding : '25px 35px',
        display : 'flex',
        flex : 1,
        flexDirection : 'column',
        '& > *' : {
            marginTop : 20
        }
    },
    txt1 : {
        fontSize : 12,
        color : '#878787'
    },
    txt2 : {
        fontSize : 14,
        textAlign : 'center',
        color : '#2874f0',
        marginTop : 'auto',
        fontWeight : 600,
        cursor : 'pointer'
    },
    loginBtn : {
        textTransform : 'none',
        color : '#fff',
        background : '#fB641B',
        height : 48,
        borderRadius : 2,
    },
    requestBtn : {
        textTransform : 'none',
        color : '#2874f0',
        background : '#fff',
        height : 48,
        borderRadius : 2,
        boxShadow : '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    error : {
        color : '#ff6161',
        marginTop : 10,
        fontWeight : 600,
        lineHeight : 0,
        fontSize : 10
    }
})


const initialValue = {
    login : {
        view : 'login',
        heading : 'Login',
        subHeading : 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup : {
        view : 'signup',
        heading : "Looks like you're new here!",
        subHeading : 'Sign up with your mobile number to get started'
    }
}

const signupInitialValues = {
    firstname : '',
    lastname : '',
    username:'',
    email : '',
    password : '',
    phone : ''
}

const loginInitialValues = {
    username : '',
    password : ''
}

const LoginDialog = ({open,setOpen,setAccount}) => {
    const classes = useStyle();

    const [account,toggleAccount] = useState(initialValue.login);
    const [signup,setSignup] = useState(signupInitialValues);
    const [login,setLogin] = useState(loginInitialValues);
    const [error,setError] = useState(false);

    const handleClose = () => {
         setOpen(false);
         toggleAccount(initialValue.login);
    }

    const toggleUserAccount = () => {
        toggleAccount(initialValue.signup);
    }

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        setAccount(signup.username);
    }

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        if(!response) { 
            setError(true);
            return;
        }
        handleClose();
        setAccount(login.username);
    }

    const handleChange = (e) => {
        setSignup({...signup, [e.target.name] : e.target.value});
        //console.log(signup);
    }

    const handleLogin = (e) => {
        setLogin({...login, [e.target.name] : e.target.value })
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent className={classes.component}>
                <Box style={{display:'flex'}}>
                    <Box className={classes.image}>
                        <Typography variant='h5'>{account.heading}</Typography>
                        <Typography style={{marginTop : 20}}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ? 
                        <Box className={classes.login}>
                            <TextField onChange={handleLogin} name='username' label='Enter Email/Mobile number'/>
                            <TextField onChange={handleLogin} name='password' label='Enter Password'/>
                            { error && <Typography className={classes.error}>Invalid username or password</Typography>}
                            <Typography className={classes.txt1}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                            <Button onClick={loginUser} variant='contained' className={classes.loginBtn}>Login</Button>
                            <Typography className={classes.txt1} style={{textAlign:'center'}}>OR</Typography>
                            <Button variant='contained' className={classes.requestBtn}>Request OTP</Button>
                            <Typography onClick={toggleUserAccount} className={classes.txt2}>New to Flipkart? Create an account</Typography>
                        </Box> : 
                        <Box className={classes.login}>
                            <TextField onChange={handleChange} name='firstname' label='Enter Firstname'/>
                            <TextField onChange={handleChange} name='lastname' label='Enter Lastname'/>
                            <TextField onChange={handleChange} name='username' label='Enter Username'/>
                            <TextField onChange={handleChange} name='email' label='Enter Email'/>
                            <TextField onChange={handleChange} name='password' label='Enter Password'/>
                            <TextField onChange={handleChange} name='phone' label='Enter Phone number'/>
                            <Button variant='contained' className={classes.loginBtn} onClick={signupUser}>Signup</Button>
                        </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;