  import { Component } from 'react';
  import { DragDropContext } from 'react-dnd';
  import MultiBackend from 'react-dnd-multi-backend';
  import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; // or any other pipeline


  

  class Ransom extends Component {

  	render(props)
  	{
  		return(
  			this.props.value
  			);
  	}
  }
  export default DragDropContext(MultiBackend(HTML5toTouch))(Ransom);