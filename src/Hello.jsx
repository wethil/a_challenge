import React, { Component } from 'react';
import people from './lib/people.js'
import {createFamilyTree,goToChildren,markAnchestors,deleteFromTree} from './components/functions.js'
import Person from './components/Person.jsx'
import emitter from './components/emitter.js'
import {FamilyTreeHeader,PoorTreeHeader} from './components/Headers.jsx'
import Wrapper from './components/Wrapper.jsx'

 class Hello extends Component {
 	constructor(props) {
		  super(props);
		  this.state = {
		  	people:people,
		  	familyTree:null,
		  	poors:null
		  };
		}

componentDidMount(){
	emitter.addListener('delete', (person,poor) => { this.deletePerson(person,poor) });
}		


componentWillMount(){
	this.createFamilyTree();
}

deletePerson(person,poor){
	const {familyTree,poorsTree} = this.state
	var group = !poor ? familyTree : poorsTree
	this.deleteFromTree(person,group,poor)
}

deleteFromTree(person, group, poor) {
   const {tree,family} = deleteFromTree(person,group,poor)
   this.setState({ [tree] : family }) 
}






createFamilyTree(){
	const {familyMap,poors} = createFamilyTree(this.state.people)
	console.log(createFamilyTree(this.state.people))
	this.setState({
	   familyTree: familyMap,
	   poorsTree:poors
	})
}



	render() {
		
		const {familyTree,poorsTree} = this.state
		var familyList=[]
		var poorList = []

		familyTree.forEach((person) => {
			familyList.push(<Person person={person} mLeft={0} poor={false} />)
		});
		
		poorsTree.forEach((person) => {
			poorList.push(<Person person={person} mLeft={0} poor={true} />)
		});

		return (
			<div>
				<FamilyTreeHeader />
				<Wrapper tree={familyList} />
				<PoorTreeHeader />
				<Wrapper tree={poorList} />	
			</div>
		);
	}
}
export default Hello;