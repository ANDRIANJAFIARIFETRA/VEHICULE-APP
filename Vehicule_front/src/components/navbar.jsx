
import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export class MonNavbar extends React.Component {


    render(){

        return(
            <Navbar className="Navbar" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="47"fill="#fff" style={{marginBottom:'4px', marginTop:'-5px'}}><g id="outline"><path d="M252.422,159.155l16,8a8,8,0,1,0,7.156-14.31L264,147.056V128a8,8,0,0,0-16,0v24A8,8,0,0,0,252.422,159.155Z"/><path d="M464,240h24a8,8,0,0,0,8-8V168a8,8,0,0,0-8-8H311.419a56,56,0,1,0-110.838,0H24a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8H48V392H24a8,8,0,0,0,0,16H488a8,8,0,0,0,0-16H464ZM448,360H425.869a23.933,23.933,0,0,0,4.509-24.657A7.954,7.954,0,0,0,432,330.527V296a7.97,7.97,0,0,0-2.333-5.645l-.01-.012-26.728-26.728A25.831,25.831,0,0,0,384.544,256H313a26.127,26.127,0,0,0-20.8,10.4l-16.941,22.589-27.674,4.421A27.877,27.877,0,0,0,224,321.059V344a8,8,0,0,0,8,8h17.376a24.015,24.015,0,0,0,4.755,8H208V240H448ZM240,336V321.059a11.948,11.948,0,0,1,10.107-11.85L282.722,304H344v32H294.624a24,24,0,0,0-45.248,0Zm144.544-64a9.936,9.936,0,0,1,7.071,2.929L404.686,288H360V272ZM360,336V304h56v17.376A23.985,23.985,0,0,0,385.376,336Zm56,8a8,8,0,1,1-8-8A8.009,8.009,0,0,1,416,344Zm-72-56H296l9-12a10.046,10.046,0,0,1,8-4h31Zm-64,56a8,8,0,1,1-8-8A8.009,8.009,0,0,1,280,344Zm14.624,8h90.752a24.015,24.015,0,0,0,4.755,8H289.869A24.015,24.015,0,0,0,294.624,352ZM256,112a40,40,0,1,1-40,40A40.045,40.045,0,0,1,256,112ZM32,176H205.414a56.251,56.251,0,0,0,11.448,16H56a8,8,0,0,0,0,16H456a8,8,0,0,0,0-16H295.138a56.251,56.251,0,0,0,11.448-16H480v48H32Zm32,64H192V392H176V280a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8V392H64Zm32,64V288h64v16Zm0,16h24v72H96Zm40,72V320h24v72Zm72,0V376H448v16Z"/></g></svg>

                    {/* <svg  width="30px" style={{marginBottom:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff">
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    &nbsp;  */} &nbsp;
                       Véhicule-app
                    </Navbar.Brand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div  id="navbarSupportedContent"> {/* className="collapse navbar-collapse" */}
                        <Nav className="me-auto">
                            <Nav.Link href="/">
                                <svg width="17px" style={{marginBottom:5}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg> &nbsp;
                                Accueil
                            </Nav.Link>
                            <Nav.Link href="/list">
                                <svg width="17px" style={{marginBottom:5}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>&nbsp;
                                Liste
                            </Nav.Link>
                            <Nav.Link href="/categorie">
                                <svg width="17px" style={{marginBottom:5}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg> &nbsp;
                                Catégories
                            </Nav.Link>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        )

    }

}

