import React from 'react'
import './InfoBox.css'
import { Card, Typography, CardContent } from '@material-ui/core'

function InfoBox( {title, cases, total, isRed, isBlue, active, ...props }) {
    return (
        <Card 
            className={`infoBox ${active && 'infoBox--selected'} 
            ${isRed && "infoBox--red"}
            ${isBlue && "infoBox--blue"}`}
            onClick={props.onClick}>
            <CardContent>
                {/* <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography> */}
                <h5 className="infoBox__title">{title}</h5>
                <h2 className={`infoBox__cases 
                    ${!isRed && !isBlue && "infoBox__cases--green"}
                    ${isBlue && "infoBox__cases--blue"}`}>{cases}</h2>
                <h3 className="infoBox__total">Total {total}</h3>
                {/* <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography> */}
                

            </CardContent>
        </Card>
    )
}

export default InfoBox
