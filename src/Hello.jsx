import React, { Component } from 'react';
import people from './lib/people.js'
import $ from 'jquery'
import Person from './components/Person.jsx'
import emitter from './components/emitter.js'

 class Hello extends Component {
 	constructor(props) {
		  super(props);
		
		  this.state = {
		  	people:people,
		  	familyTree:null
		  };
		}

componentDidMount(){
	emitter.addListener('delete', (person) => { this.deletePerson(person) });
}		


componentWillMount(){
	this.createFamilyTree();
}

deletePerson(person){
	console.log(person)
	var familyMap=this.state.familyTree
	console.log(familyMap.get(person.anc_id))
	if (Reflect.has(person, 'anc_id')){
			this.process(familyMap.get(person.anc_id) , function (obj) {
				   if (obj.children && obj.children.length!==0 ){
				   		let children = obj.children
				             children.map((child,index)=>{
				               if(child.ID===person.ID){
				                children.splice(index,1)
				               }
				               if(children.length===0){
				                 delete obj.children
				               }
				            });
				   }
				});
	}

	this.setState({familyTree:familyMap})
}

process(obj, func){
	func(obj)
	if (obj.children && obj.children.length!==0 ) {
       obj.children.forEach((children)=> {
            this.process(children, func);
        });
    }
}


createFamilyTree(){
	var poors=[]
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
	       	poors.push(value)
	       }
	   }
	})

	for (var [key, value] of familyMap) {
	   if (Reflect.has(value, 'parentID')) {
	      familyMap.delete(key)
	   }
	}


	for (var [key, value] of familyMap) {
	   this.process(value, function(obj) {
	      if (obj.children && obj.children.length !== 0) {
	         obj.children.map(child => {
	            child.anc_id = value.ID
	         });
	      }
	   });
	}


for (var [key, value] of familyMap) {
	 console.log(value)
	}



	this.setState({
	   familyTree: familyMap,
	   poors:poors
	})
}



	render() {
		
		const {familyTree,poors} = this.state
		var familyList=[]
		var poorList = []
		familyTree.forEach((person) => {
			familyList.push(<Person person={person} />)
		});
		poors.forEach((person) => {
			poorList.push(<Person person={person} />)
		});

		return (
			<div>
			<section>
				<article >
					{familyList}
				</article>
			</section>	
			<h5>Poors</h5>
			<section>
				<article >
					{poorList}
				</article>
			</section>
			</div>
		);
	}
}
export default Hello;