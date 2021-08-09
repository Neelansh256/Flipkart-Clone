import {Box, makeStyles} from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {getProducts as listProducts} from '../../redux/actions/productActions.js';

import NavBar from "./NavBar";
import Banner from './Banner';
import Slide from './Slide';
import MidSection from './MidSection';

const useStyle = makeStyles({
    component : {
        padding : 10,
        backgroundColor : '#f2f2f2'
    },
    rightWrapper : {
        background : '#fff',
        padding : 5,
        margin : '12px 0 0 10px',
        width : '17%'
    }
})


const Home = () => {
    const classes = useStyle();
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

    const {products} = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])

    return (
        <div>
            <NavBar/>
            <Box className={classes.component}>
                <Banner/>
                <Box style={{display:'flex'}}>
                    <Box style={{width : '83%'}}>
                        <Slide products={products} timer={true} title="Deal of the Day"/>
                    </Box>
                    <Box className={classes.rightWrapper}>
                        <img src={adURL} style={{width:230}}/>
                    </Box>
                </Box>
                <MidSection/>
                <Slide products={products} timer={false} title="Discounts For You"/>
                <Slide products={products} timer={false} title="Suggested Items"/>
                <Slide products={products} timer={false} title="Top Selection"/>
                <Slide products={products} timer={false} title="Recommended Items"/>
                <Slide products={products} timer={false} title="Bestsellers"/>
            </Box>
        </div>
    )
}

export default Home;