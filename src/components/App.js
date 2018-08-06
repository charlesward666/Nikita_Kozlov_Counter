import React, {Component} from 'react'
import {createStore} from 'redux'

const initialState = { num: 0 }

function reducer(state = { num: 0 }, action) {
	switch(action.type) {
		case 'NEXT': return { num: state.num + action.amount }
		case 'BACK': return { num: state.num - action.amount }
		case 'RESET': return { num: 0 }
		default: return state
	}
}


function next(amount) {
	return { type: 'NEXT', amount }
}

function back(amount) {
	return { type: 'BACK', amount }
}

function reset() {
	return { type: 'RESET' }
}

const store = createStore(reducer, initialState)

class App extends React.Component {
	constructor(props) {
		super(props)
		this.back = this.back.bind(this)
		this.next = this.next.bind(this)
		this.reset = this.reset.bind(this)
	}

	componentDidMount() {
		store.subscribe(() => this.forceUpdate())
	}

	back () {
		let amount = parseInt(this.refs.amount.value || 1)
		store.dispatch(back(amount))
	}

	next () {
		let amount = parseInt(this.refs.amount.value || 1)
		store.dispatch(next(amount))
	}

	reset () {
		store.dispatch(reset())
	}
	
	render () {
		const num = store.getState().num
		return (
			<div>
				<button onClick={this.back}>-</button>
				{num}
				<button onClick={this.next}>+</button>
				<button onClick={this.reset}>RESET</button>

				<input type="text" ref="amount" defaultValue="1"></input>
			</div>
		)
	}

}

export default App