import { Box,makeStyles,Typography,Table,TableBody,TableRow,TableCell} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import clsx from 'clsx';
import {LocalOffer as Badge} from '@material-ui/icons';
import ActionItems from "./ActionItems";

const useStyle = makeStyles({
    component : {
        marginTop : 55,
        backgroundColor : '#F2F2F2'
    },
    container : {
        margin : '0 80px',
        backgroundColor : '#ffffff',
        display : 'flex'
    },
    rightContainer : {
        marginTop : 50,
        '& > *' : {
            marginTop : 10
        }
    },
    smallText : {
        fontSize : 14,
        verticalAlign:'baseline',
        '& > *' : {
            fontSize : 14,
            marginTop : 10 
        }
    },
    greyText : {
        color : '#878787'
    },
    price : {
        fontSize : 20,
        fontWeight : 600
    },
    badge : {
        fontSize : 14,
        marginRight : 10,
        color : '#00CC00'
    }
})


const DetailView = ({match}) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const sellerUrl = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

    const {product} = useSelector(state => state.getProductDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    }, [dispatch]);

    return (
        <Box className={classes.component}>
        {
            product && Object.keys(product).length &&
                <Box className={classes.container}>
                    <Box style={{minWidth:'40%'}}>
                        <ActionItems product={product}/>
                    </Box>
                    <Box className={classes.rightContainer}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography className={clsx(classes.smallText,classes.greyText)}>
                        8 Ratings & 2 Reviews
                        <span><img src = {fassured} style={{width : 77,marginLeft : 20}}/></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp;
                            <span className={classes.greyText}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{color:'#388E3C'}}>{product.price.discount} off</span>
                        </Typography>
                        <Typography style={{marginTop:20,fontWeight:600}}>Available offers</Typography>
                        <Box className={classes.smallText}>
                            <Typography><Badge className={classes.badge}/>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Typography>
                            <Typography><Badge className={classes.badge}/>Bank OfferFlat ₹100 off on first Flipkart Pay Later order of ₹500 and aboveT&C</Typography>
                            <Typography><Badge className={classes.badge}/>Special PriceGet extra 12% off (price inclusive of discount)T&C</Typography>
                            <Typography><Badge className={classes.badge}/>Partner OfferGST Invoice Available! Save up to 28% for business purchasesKnow More</Typography>
                        </Box>
                        <Table>
                            <TableBody>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyText}>Delivery</TableCell>
                                    <TableCell style={{fontWeight:600}}>{date.toDateString()} | ₹40</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyText}>Warranty</TableCell>
                                    <TableCell>No Warranty</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyText}>Seller</TableCell>
                                    <TableCell className={classes.smallText}>
                                        <span style={{color:'#2874f0'}}>SuperComNet</span>
                                        <Typography>GST Invoice Available</Typography>
                                        <Typography>14 Days Return Policy</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell colSpan={2}><img src={sellerUrl} style={{width:390}}/></TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyText}>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
        }
        </Box>
    )
}

export default DetailView;  