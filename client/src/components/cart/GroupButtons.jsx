import { Button,ButtonGroup,makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyle = makeStyles({
    component : {
        marginTop:30,
    },
    button : {
        borderRadius : '50%'
    }
})

const GroupButtons = () => {
    const classes = useStyle();
    const [count,setCount] = useState(1);

    return (
        <ButtonGroup className={classes.component}>
            <Button onClick={() => setCount(count=>count-1)} disabled={count===1} className={classes.button}>-</Button>
            <Button>{count}</Button>
            <Button onClick={() => setCount(count=>count+1)} className={classes.button}>+</Button>
        </ButtonGroup>
    )
}


export default GroupButtons;