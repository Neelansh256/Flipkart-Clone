import { Box, makeStyles } from '@material-ui/core';

import {ImageURL} from '../../constants/data.js';

const useStyle = makeStyles({
    wrapper: {
        display: 'flex',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    image: {
        width: '33%'
    }
})

const MidSection = () => {
    const classes = useStyle();
    const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    return (
        <>
            <Box className={classes.wrapper}>
                {
                    ImageURL.map(image => (
                        <img src={image} className={classes.image} />
                    ))
                }
            </Box>
            <img src={url} className={classes.wrapper} style={{width: '100%'}} />
        </>
    )
}

export default MidSection;