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
import i from './cutout/i.jpg';
import smile from './cutout/smile.jpg';
import taste from './cutout/taste.jpg';
import your from './cutout/your.jpg';
import create from './cutout/create.jpg';
import iama from './cutout/iama.jpg';
import know from './cutout/know.jpg';
import living from './cutout/living.jpg';
import look from './cutout/look.jpg';
import me from './cutout/me.jpg';
import sleep from './cutout/sleep.jpg';
import wander from './cutout/wander.jpg';
import you from './cutout/you.jpg';
import love from './cutout/love.jpg';
import wwith from './cutout/with.jpg';

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
			},
			{
				src: i,
				text: "i",
				id: "i"
			},
			{
				src: smile,
				text: "smile",
				id: "smile"
			},
			{
				src: taste,
				text: "taste",
				id: "taste"
			},
			{
				src: your,
				text: "your",
				id: "your"
			},
			{
				src: create,
				text: "create",
				id: "create"
			},
			{
				src: iama,
				text: "iama",
				id: "iama"
			},
			{
				src: know,
				text: "know",
				id: "know"
			},
			{
				src: living,
				text: "living",
				id: "living"
			},
			{
				src: look,
				text: "look",
				id: "look"
			},
			{
				src: me,
				text: "me",
				id: "me"
			},
			{
				src: sleep,
				text: "sleep",
				id: "sleep"
			},
			{
				src: wander,
				text: "wander",
				id: "wander"
			},
			{
				src: you,
				text: "you",
				id: "you"
			},
			{
				src: wwith,
				text: "wwith",
				id: "wwith"
			},
			{
				src: love,
				text: 'love',
				id: 'love'
			}
			],
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
			let wordTemplate = <img onDrag={(event) => this.drag(event)} onTouchStart={ (event) => this.drag(event)} onTouchEnd={(event) => this.drop(event)}  id={stateRansom[i].id} key={i} className="word-img" src={stateRansom[i].src} alt="" data-text={stateRansom[i].text}/>;
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
	clearRansom()
	{
		let stateRansom = this.state.ransom;
		let stateWords = this.state.words;
		for (let i = 0; i < stateRansom.length; i++)
		{
			let source = stateRansom[i].src;
			let text = stateRansom[i].text;
			let id = stateRansom[i].id;

			stateWords.push({ src: source, text: text, id: id});
		}
		this.setState({
			words: stateWords,
			ransom: []
		});
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
			let wordTemplate = <img onDrag={(event) => this.drag(event)} onTouchStart={ (event) => this.drag(event)} onTouchEnd={(event) => this.drop(event)} id={stateWords[i].id} key={i} className="word-img" src={stateWords[i].src} alt="" data-text={stateWords[i].text}/>;
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
							<div droppable="true" className="words-container" id="word-box" onDragOver={(event) => this.allowDrop(event)} onDrop={(event) => this.drop(event)}>{this.renderWords()}</div>
						</div>
						<div className="col-md-6">
							<h4 className='title'>Sentence Area</h4>
							<div droppable="true" onDragOver={(event) => this.allowDrop(event)} onDrop={(event) => this.drop(event)} className="ransom-box" id="ransom-box">{this.renderRansom()}</div>
							<div className="center-button"><button onClick={()=>this.clearRansom()}>Clear Sentence</button></div>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<RansomConsole />, document.getElementById('root'));

