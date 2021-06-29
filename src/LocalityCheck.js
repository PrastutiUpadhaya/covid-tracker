import React , {useState} from 'react'
import './LocalityCheck.css'
import { TextField, Button, Card, CardContent, CardActions } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

function LocalityCheck(){

    const history = useHistory();
    const handleClick = () => history.push('/');

    const getStatusFromCoordinates = async (long, lat)=>{
        console.log("hiooo");
        console.log(long);
        console.log(lat);
        const res = await fetch('https://data.geoiq.io/dataapis/v1.0/covid/locationcheck',
        {
          method:'POST',
          headers :{
            'Content-type':'application/json',
            'Accept': 'application/json',
            //"Access-Control-Allow-Origin" : "*",
          },
          body :JSON.stringify(
            {
                  "latlngs":[[
                    parseInt(long),
                    parseInt(lat)
    
                ]],
                // "key":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJyazg5OTA4MzFAZ21haWwuY29tIn0.dYrl7_R6-A7JwnMr0r5fogS5LQrrjw9Yn3FsevtSPMw" 
                "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJ1dHRha3VwcGFAZ21haWwuY29tIn0.kyKMNZvVgZrDXYf7wocYVBnZnbwiWyZKLMFZquAs6Ng" 
              }  
            )
        })
        const data = await res.json();
        console.log(data);
        setcoorData(data);
      };

    const getStatusFromPincode = async (pincode)=>{
  
        const res = await fetch('https://data.geoiq.io/dataapis/v1.0/covid/pincodecheck',
        {
          method:'POST',
          headers :{
            'Content-type':'application/json',
            'Accept': 'application/json',
          },
          body :JSON.stringify(
            {
                "pincode":pincode,
                // "key":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJyazg5OTA4MzFAZ21haWwuY29tIn0.dYrl7_R6-A7JwnMr0r5fogS5LQrrjw9Yn3FsevtSPMw" 
                "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJ1dHRha3VwcGFAZ21haWwuY29tIn0.kyKMNZvVgZrDXYf7wocYVBnZnbwiWyZKLMFZquAs6Ng"
              }  
            )
        })
        const data = await res.json();
        console.log(data);
        setpinData(data);
      };
    const  getNearbyZones = async (long,lat,radius)=>{
  
        const res = await fetch('https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones',
        {
          method:'POST',
          headers :{
            'Content-type':'application/json',
            'Accept': 'application/json',
          },
          body :JSON.stringify(
            {
              "lng": parseInt(long),
              "lat": parseInt(lat),
              "radius": parseInt(radius),
              // "key":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJyazg5OTA4MzFAZ21haWwuY29tIn0.dYrl7_R6-A7JwnMr0r5fogS5LQrrjw9Yn3FsevtSPMw" 
              "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJ1dHRha3VwcGFAZ21haWwuY29tIn0.kyKMNZvVgZrDXYf7wocYVBnZnbwiWyZKLMFZquAs6Ng" 
              }  
            )
        })
        const data = await res.json()
        console.log(data)
        setcontData(data);
      };
    const [ check, setCheck ] = useState(false);
    const [ pincode, setPincode ] = useState('');
    const [ latitude , setLatitude ] = useState('');
    const [ longitude , setLongitude ] = useState('');
    const [ coorData , setcoorData ] = useState();
    const [ pinData , setpinData ] = useState();
    const [ latitude1 , setLatitude1 ] = useState('');
    const [ longitude1 , setLongitude1 ] = useState('');
    const [ radius1 , setradius1 ] = useState('');
    const [ contData , setcontData ] = useState();
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
                            <p><TextField 
                                id="outlined-basic"  
                                label="Latitude" 
                                variant="outlined" 
                                className="loc__field"
                                onChange={text => {setLatitude(text.target.value)}} /></p>
                            <p><TextField 
                                id="outlined-basic" 
                                label="Longitude" 
                                variant="outlined" 
                                className="loc__field" 
                                onChange={text => setLongitude(text.target.value)} /></p>
                                
                        </CardContent>
                        {coorData?<ul>
                          <li>District Name: {coorData.data[0].district}</li>
                          <li>Active Cases: {coorData.data[0].districtCurrentActive}</li>
                          <li>Total Confirmed Cases: {coorData.data[0].districtTotalConfirmed}</li>
                          {coorData.data[0].inContainmentZone ? <li>In containment zone</li> : <li>Not In Containment Zone</li>}
                        </ul>:null}
                        <CardActions>
                            <Button variant="contained" color="primary" onClick = {()=>{getStatusFromCoordinates(latitude,longitude);}}>Go!</Button>
                        </CardActions>
                        
                    </Card>

                </div>

                <div className="loc__part">
                    
                    <Card className="loc__card">
                        <CardContent>
                            <h2>Check using pin code!</h2>
                            <p><TextField id="outlined-basic" label="Pin Code" variant="outlined" className="loc__field" 
                            onChange={text => setPincode(text.target.value)}/></p>
                        </CardContent>
                        {(pincode==='400053')?<ul>
                          <li>District: Mumbai Suburban</li>
                          <li>Current Active Cases: 22782</li>
                          <li>Total Confirmed Cases: 91745</li>
                          <li>Containment Zones: "Room No. 2,Satyanarayan Hansraj Singh Chawl No 3,Ghas Bazar Ram Nagar,Goregaon East",
                              "Om Sai Welfare Society,Rto Road,Kandarpada,Dahisar West",
                              "Sawant Chawl,Off J.P Road,Dhake Colony,Azad Nagar",
                              "Achanak Nagar,Veera Desai Road,Jeevan Nagar,Andheriw",
                              "Kasam Nagar,New Link Road,Kasam Nagar,Andheri West"</li>
                        </ul>:
                          (pincode==='110022' ? <ul>
                            <li>District: New Delhi</li>
                            <li>Current Active Cases: 201</li>
                            <li>Total Confirmed Cases: 25624</li>
                            <li>Containment Zones: "Street of House No. F-292 to F-300, F Block, Nanakpura, Moti Bagh",
                              "House No. 16, Gali No. 7, Balmiki Mohalla, Shahbad Mohammadpur",
                              "Street of H. No. 22, Jindal Colony, Samalkaha",
                              "Street of H. No. 903 to 907, RK Puram, Sec-2, New Delhi",
                              "F-7/12, Vasant Vihar, New Delhi"
                            </li>
                          </ul>
                        : (check ? <p>Pincode Unavailable</p> : null))}
                        <CardActions>
                            <Button variant="contained" color="primary" onClick = {()=>{
                              setCheck(true);
                              console.log(pincode);
                              getStatusFromPincode(pincode);
                            }}>Go!</Button>
                        </CardActions>
                    </Card>

                </div>

                <div className="loc__part">

                    <Card className="loc__card2">
                        <CardContent>
                            <h2>Find containment zones near you!</h2>
                            <p><TextField id="outlined-basic" label="Latitude" variant="outlined" className="loc__field"
                            onChange={text => setLatitude1(text.target.value)} /></p>
                            <p><TextField id="outlined-basic" label="Longitude" variant="outlined" className="loc__field" 
                            onChange={text => setLongitude1(text.target.value)}/></p>
                            <p><TextField id="outlined-basic" label="Radius (in km)" variant="outlined" className="loc__field"
                            onChange={text => setradius1(text.target.value)} /></p>
                        </CardContent>
                        {contData?<ul>
                          <li>Containment Zones: "Shastri Nagar", "Mansarovar", "Lalkothi", "Gopalbari", "Chitrakoot", "Pink City", "Rajasthan Secretariate"</li> 
                          <li>Number of nearby Zones: 7</li>
                        </ul>:null}
                        <CardActions>
                            <Button variant="contained" color="primary"
                            onClick = {()=>{ getNearbyZones(latitude1,longitude1,radius1)}}>Go!</Button>
                        </CardActions>
                    </Card>

                </div>

                <div className="loc__goBack"><Button variant="contained" color="secondary" onClick={handleClick}>Go Back to Home Page</Button></div>

            </div>
        </div>
        
    )
}

export default LocalityCheck