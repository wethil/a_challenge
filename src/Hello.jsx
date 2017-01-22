import React, { Component } from 'react';
import people from './lib/people.js'
import $ from 'jquery'
import Person from './components/Person.jsx'

 class Hello extends Component {
 	constructor(props) {
		  super(props);
		
		  this.state = {
		  	people:people,
		  	familyTree:null
		  };
		}

componentWillMount(){
	this.createFamilyTree();
}


createFamilyTree(){
	var people = this.state.people;
	var result = new Map(people.map((i) => [i.id, i]));
	result.forEach((value, key) => {
	   if (Reflect.has(value, 'p_id')) {
	      let pID = Number(value.p_id);
	      parent = result.get(pID)
	      parent.children = parent.children ? parent.children : []
	      parent.children.push(value)
	   }
	})

	for (var [key, value] of result) {
	   if (Reflect.has(value, 'p_id')) {
	      result.delete(key)
	   }
	}
	this.setState({
	   familyTree: result
	})
}



	render() {
		
		const {familyTree} = this.state
		var familyList=[]
		familyTree.forEach((person) => {
			familyList.push(<Person person={person} />)
		});
		return (
			<div>
			<section>
				<article >
					{familyList}
				</article>
			</section>	
			</div>
		);
	}
}
export default Hello;