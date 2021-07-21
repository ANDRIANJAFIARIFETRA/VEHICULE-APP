import React from 'react'

export class  Clock extends React.Component{

	constructor(props){
		super(props)
		this.state = {data: new Date()}
		this.timer = null
	}

	render(){
		return <div>
			 <span> {this.state.data.toLocaleDateString()} - {this.state.data.toLocaleTimeString()} </span>
		</div>
	}

	componentDidMount(){
		this.timer = window.setInterval(
			this.tik.bind(this)
		, 1000);
	}

	componentWillUnmount(){
		window.clearInterval(this.timer);
	}
	 tik(){
		 this.setState({data:new Date()})
	 }

}

export class Increment  extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			number:this.props.number,
			timer:null
		}
	}

	increment(){
		this.setState((state) => {
				return {number:this.state.number + 1}
		})
	}

	pause(){
		window.clearInterval(this.state.timer)
		this.setState({
			timer:  null
		})
	}
 
	play(){

		this.setState({
			timer:  window.setInterval(this.increment.bind(this) , 1000)
		})
	}
	componentDidMount(){
		this.play()
	}
	componentWillUnmount(){
		window.clearInterval(this.timer)
	}

	playPause(){

		if(!this.state.timer){
			this.play()
		}else{
			this.pause()

		}

	}

	render(){ 


		const label = this.state.timer ? 'Pause' : 'Play'
		return <span>{this.state.number} &nbsp; 
			<button onClick={this.playPause.bind(this)}>{label}</button>
		</span>
	}

}
