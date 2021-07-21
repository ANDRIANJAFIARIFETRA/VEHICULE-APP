import './App.css';
import React from 'react';
import Formulaire from './components/vehicule/Formulaire';
import { MonNavbar } from './components/navbar';
import { Home } from './components/home/home';
import { Liste } from './components/vehicule/Liste'
import { Route, Switch,  BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Marques } from './components/marque/marque';


function App() {


	return(

		<Router>
			
			<MonNavbar	/>
			<div className="content">
				<Switch>
					<Route path="/list" component={Liste}/>
					<Route path="/edit" component={Formulaire}/>
					<Route path="/categorie" component={Marques}/>
					<Route exact path="/" component={Home}/> 
				</Switch>
			</div>		

		</Router>
	)

}


export default App;
