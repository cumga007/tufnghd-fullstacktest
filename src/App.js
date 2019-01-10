import React, { Component } from 'react';
import './App.css';

import SeqGenerator  from './components/SeqGenerator';

class App extends Component {
	render() {
		return (
			<div className="App">
				<SeqGenerator />
			</div>
		);
	}
}

export default App;
