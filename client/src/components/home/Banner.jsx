import Carousel from 'react-material-ui-carousel';
import {bannerData} from '../../constants/data';
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles({
    image : {
        width : '100%',
        height : 280
    },
    carousel : {
        marginTop : 10
    }
})

const Banner = () => {
    const classes = useStyle();
    return (
        <Carousel
            autoPlay={true}
            animation='slide'
            indicators={false}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
                style : {
                    backgroundColor : '#FFFFFF',
                    color : '#494949',
                    borderRadius : 0,
                    margin : 0
                }
            }}
            className={classes.carousel}
        >
            {
                bannerData.map( (image) => (
                    <img className={classes.image} src={image} />
                ))
            }
        </Carousel>
    )
}

export default Banner;