import React, { Component } from 'react';
import people from './lib/people.js'
import {createFamilyTree,goToChildren,markAnchestors,deleteFromTree} from './components/functions.js'
import Person from './components/Person.jsx'
import emitter from './components/emitter.js'
import {FamilyTreeHeader,PoorTreeHeader} from './components/Headers.jsx'
import Wrapper from './components/Wrapper.jsx'
import InfCol from './components/InfCol.jsx'

/*
poors: has parent id but hs no parent on the list
families: has parent id and has parent or has no parent id
*/

 class Main extends Component {
 	constructor(props) {
		  super(props);
		  this.state = {
		  	people:people,//raw json data
		  	familyTree:null,
		  	poors:null
		  };
		}

componentDidMount(){
	emitter.addListener('delete', (person,poor) => { this.deletePerson(person,poor) }); //emit from components/Person.jsx
}		


componentWillMount(){
	this.createFamilyTree(); 
}

deletePerson(person,poor){
	const {familyTree,poorsTree} = this.state
	var group = !poor ? familyTree : poorsTree //detect group is poor or family
	this.deleteFromTree(person,group,poor)
}

deleteFromTree(person, group, poor) {
   const {tree,family} = deleteFromTree(person,group,poor) //delete person and get new map tree. look at components/functions.js
   this.setState({ [tree] : family })  //update state with new map
}



createFamilyTree(){
	const {familyMap,poors} = createFamilyTree(this.state.people) //craete and get map for families. look at components/functions.js
	this.setState({ //update state with those maps
	   familyTree: familyMap,
	   poorsTree:poors
	})
}



	render() {
		
		const {familyTree,poorsTree} = this.state
		var familyList=[]
		var poorList = []
		//we should know if person is poor or not
		//mLeft represents margin left. it has to increase for every generation to ensure intendation for children. Check components/Person.jsx
		familyTree.forEach((person) => {
			familyList.push(<Person person={person} mLeft={0} poor={false} />) 
		});
		
		poorsTree.forEach((person) => {
			poorList.push(<Person person={person} mLeft={0} poor={true} />)
		});

		return (
			<div className="ui  container" style={{marginTop:20}} >
				<div className="ui stackable grid">
					<div className="five wide center aligned column">
						<InfCol />
					</div>
					<div className="eleven wide column" >
						<FamilyTreeHeader />
						<Wrapper tree={familyList} />
						<PoorTreeHeader />
						<Wrapper tree={poorList} />	
					</div>
				</div>
			</div>
		);
	}
}
export default Main;
