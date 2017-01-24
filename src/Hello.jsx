import React, { Component } from 'react';
import people from './lib/people.js'
import $ from 'jquery'
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
	var family = !poor ? familyTree : poorsTree
	this.deleteFromTree(person,family,poor)
}

deleteFromTree(person, family, poor) {
   console.log(poor)
   console.log(family)
   if (Reflect.has(person, 'anc_id')) {
      this.goToChildren(family.get(person.anc_id), function(obj) {
         if (obj.children && obj.children.length !== 0) {
            let children = obj.children
            children.map((child, index) => {
               if (child.ID === person.ID) {
                  children.splice(index, 1)
               }
               if (children.length === 0) {
                  delete obj.children
               }
            });
         }
      });
   } else {
      family.delete(person.ID)
   }
   let tree=!poor ? "familyTree":"poorsTree"
   this.setState({ [tree] : family }) 
}



goToChildren(obj, func){
	func(obj)
	if (obj.children && obj.children.length!==0 ) {
       obj.children.forEach((children)=> {
            this.goToChildren(children, func);
        });
    }
}

markAnchestors(value){
 this.goToChildren(value, function(obj) {
      if (obj.children && obj.children.length !== 0) {
         obj.children.map(child => {
            child.anc_id = value.ID
         });
      }
   });
}


createFamilyTree(){
	var poors=new Map()
	var people = this.state.people;
	var familyMap = new Map(people.map((person) => [person.ID, person]));
	familyMap.forEach((value, key) => {
	   if (Reflect.has(value, 'parentID')) {
	      let pID = Number(value.parentID);
	      parent = familyMap.get(pID)
	      if (parent){
	    	  parent.children = parent.children ? parent.children : []
	     	  parent.children.push(value)
	       }else{
	       poors.set(key,value)
	       }
	   }
	})

	for (var [key, value] of familyMap) {
	    if (Reflect.has(value, 'parentID')) {
	      familyMap.delete(key)
	   } else {
		this.markAnchestors(value)
	   }
	}
	poors.forEach((value)=> {this.markAnchestors(value)});
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