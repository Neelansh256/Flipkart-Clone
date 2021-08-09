import {Box,makeStyles,Typography,Button} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';

import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import Totalview from './TotalView';

import {removeFromCart} from '../../redux/actions/cartActions.js';

import { payUsingPaytm } from "../../service/api.js";
import { post } from "../../utils/paytm.js";

const useStyle = makeStyles({
    component : {
        marginTop : 55,
        padding : '30px 135px',
        display : 'flex'
    },
    leftComponent : {
        width : '67%'
    },
    rightComponent : {

    },
    header : {
        padding : '15px 24px',
        background : '#ffffff'
    },
    button : {
        background : '#fb641b',
        color : '#fff',
        borderRadius : 2,
        height : 50,
        width : 250,
        display : 'flex',
        marginLeft : 'auto'
    },
    bottom : {
        padding : '16px 22px',
        background : '#fff',
        borderTop : '1px solid #f0f0f0',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)'
    }
})

const Cart = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);

    const removeItem = (id) => {
        dispatch(removeFromCart(id));
    }

    const buyNow = async () => {
        let response = await payUsingPaytm({amount : 500 , email : 'codeforinterview01@gmail.com'});

        let information = {
            action : 'https://securegw-stage.paytm.in/order/process',
            params : response
        }
        post(information);
    }

    return(
        <>
            {
                cartItems.length ? 
                    <Box className={classes.component}>
                        <Box className={classes.leftComponent}>
                            <Box className={classes.header}>
                                <Typography style={{fontWeight:600,fontSize:18}}>My Cart ({cartItems.length})</Typography>
                            </Box>
                            {
                                cartItems.map(item => (
                                    <CartItem item={item} removeItem={removeItem}/>
                                ))
                            }
                            <Box className={classes.bottom}>
                                <Button onClick={buyNow} className={classes.button} variant='contained'>Place Order</Button>
                            </Box>
                        </Box>
                        <Totalview cartItems={cartItems}/>
                    </Box> 
                    : <EmptyCart/>
            }
        </>
    )
}

export default Cart;