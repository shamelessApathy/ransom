import React from 'react';
import ReactDOM from 'react-dom';
//import { DragDropContext } from 'react-dnd';
//import MultiBackend from 'react-dnd-multi-backend';
//import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; // or any other pipeline
import Words from './Words';
//import PropTypes from 'prop-types';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

  // images importing

import geek from "./cutout/geek.jpg";
import baby from "./cutout/baby.jpg";

class Ransom extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			words: [{
				src: geek,
				text: "geek"
			},
			{
				src: baby,
				text: "baby"
			}]
		}	
	}
	renderWords()
	{
		let wordsArray = [];
		let stateWords = this.state.words;
		for (let i = 0; i < stateWords.length; i++)
		{
			let wordTemplate = <img key={i} src={stateWords[i].src} alt="" data-text={stateWords[i].text}/>;
			wordsArray.push(wordTemplate);
		}
		return(
			<Words
				value={wordsArray}
			/>
			);
	}
	render()
	{
		return(
			<div>
				<div className="ransom-container">
					<h4 className="title">Ransom Note App</h4>
					<div className="row">
						<div className="col-md-6">
							<h4 className='title'>Words Container</h4>
							<div className="words-container">{this.renderWords()}</div>
						</div>
						<div className="col-md-6"> Testing 456 </div>
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<Ransom />, document.getElementById('root'));

