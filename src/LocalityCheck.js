import React from 'react'
import './LocalityCheck.css'
import { TextField, Button, Card, CardContent, CardActions } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

function LocalityCheck(){

    const history = useHistory();
    const handleClick = () => history.push('/');

    return(
        <div className="loc">

            <div className="loc__header">
                <h2 className="loc__heading">Locality Check</h2>
                <p>This feature is only for users in India. Users can search whether their location is a containment zone or not.</p>
            </div>

            <div className="loc__body">

                <div className="loc__part">
                    
                    <Card className="loc__card">
                        <CardContent>
                            <h2>Check using coordinates!</h2>
                            <p><TextField id="outlined-basic" label="Latitude" variant="outlined" className="loc__field" /></p>
                            <p><TextField id="outlined-basic" label="Longitude" variant="outlined" className="loc__field" /></p>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary">Go!</Button>
                        </CardActions>
                    </Card>

                </div>

                <div className="loc__part">
                    
                    <Card className="loc__card">
                        <CardContent>
                            <h2>Check using pin code!</h2>
                            <p><TextField id="outlined-basic" label="Pin Code" variant="outlined" className="loc__field" /></p>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary">Go!</Button>
                        </CardActions>
                    </Card>

                </div>

                <div className="loc__part">

                    <Card className="loc__card2">
                        <CardContent>
                            <h2>Find containment zones near you!</h2>
                            <p><TextField id="outlined-basic" label="Latitude" variant="outlined" className="loc__field" /></p>
                            <p><TextField id="outlined-basic" label="Longitude" variant="outlined" className="loc__field" /></p>
                            <p><TextField id="outlined-basic" label="Radius (in km)" variant="outlined" className="loc__field" /></p>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary">Go!</Button>
                        </CardActions>
                    </Card>

                </div>

                <div className="loc__goBack"><Button variant="contained" color="secondary" onClick={handleClick}>Go Back to Home Page</Button></div>

            </div>
        </div>
        
    )
}

export default LocalityCheck