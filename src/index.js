import React from 'react';
import ReactDOM from 'react-dom';
//import { DragDropContext } from 'react-dnd';
//import MultiBackend from 'react-dnd-multi-backend';
//import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; // or any other pipeline
import Words from './Words';
import Ransom from "./Ransom";
//import PropTypes from 'prop-types';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

  // images importing

import geek from "./cutout/geek.jpg";
import baby from "./cutout/baby.jpg";
import make from "./cutout/make.jpg";

class RansomConsole extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			words: [{
				src: geek,
				text: "geek",
				id: "geek"
			},
			{
				src: baby,
				text: "baby",
				id: "baby"
			},
			{
				src: make,
				text: "make",
				id: "make"
			}],
			ransom: [],
		}
		this.isDrag = "";
		this.parent="";	
	}
	touchStart(ev)
	{
		console.log('inside touchStart()');
	}
	renderRansom()
	{
		let ransomArray = [];
		let stateRansom = this.state.ransom;
		for (let i = 0; i < stateRansom.length; i++)
		{
			let wordTemplate = <img onTouchStart={(event) => this.touchStart(event)} onDrag={(event) => this.drag(event)} id={stateRansom[i].id} key={i} className="word-img" src={stateRansom[i].src} alt="" data-text={stateRansom[i].text}/>;
			ransomArray.push(wordTemplate);
		}
		return(
			<Ransom
				value={ransomArray}
			/>
			);
	}
	rebuild()
	{
		let current = this.isDrag;
		let source;
		let stateWords = this.state.words;
		let stateRansom = this.state.ransom;
		for (let i =0; i < stateWords.length; i++)
		{
			if (stateWords[i].id === current)
			{
				source = stateWords[i].src;
				stateWords.splice(i,1);
			}
		}
		for (let i=0; i < stateRansom.length; i++)
		{
			if (stateRansom[i].id === current)
			{
				source = stateRansom[i].src;
				stateRansom.splice(i,1);
			}
		}
		if (this.parent === "word-box")
		{
			stateRansom.push({src: source, text: current, id: current});
		}
		if (this.parent === "ransom-box")
		{
			console.log('inside ransom-box match');
			stateWords.push({src: source, text: current, id: current});
		}
		console.log("stateRansom:" + stateRansom);
		console.log("stateWords:" + stateWords);
		
		this.setState({
			words: stateWords,
			ransom: stateRansom
		})
		console.log(stateWords);
		this.isDrag = "";
		this.parent = "";
	}
	allowDrop(ev)
	{
		ev.preventDefault();

	}
	drag(ev)
	{
		console.log('in draG()');
		let id = ev.target.id;
		let domRep = document.getElementById(id);
		let parent = domRep.parentNode.id;
		this.parent = parent;
		ev.dataTransfer.setData("text", ev.target.id);
		this.isDrag = id;
	}
	// Find index of current element inside the this.state.words array and move it
	drop(ev)
	{
		ev.preventDefault();
		this.rebuild();
	}
	ondragover(ev)
	{
		console.log('container being dragged over!');
		console.log(ev.currentTarget);
	}
	renderWords()
	{
		let wordsArray = [];
		let stateWords = this.state.words;
		for (let i = 0; i < stateWords.length; i++)
		{
			let wordTemplate = <img onTouchStart={(event) => this.touchStart(event)} onDrag={(event) => this.drag(event)} id={stateWords[i].id} key={i} className="word-img" src={stateWords[i].src} alt="" data-text={stateWords[i].text}/>;
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
							<div droppable="true" className="words-container" id="word-box" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>{this.renderWords()}</div>
						</div>
						<div className="col-md-6">
							<h4 className='title'>Sentence Area</h4>
							<div droppable="true" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)} className="ransom-box" id="ransom-box">{this.renderRansom()}</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<RansomConsole />, document.getElementById('root'));

