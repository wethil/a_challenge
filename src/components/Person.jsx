import React from 'react';
import emitter from './emitter.js'

 const  Person = (props)=> {
 	var childs = []
 	let content
 	var person = props.person
 	//console.log(person)
if (person.children&&person.children.length!==0) {
		 content = <details><summary> {person.Name} <button onClick={()=>emitter.emit('delete',person)} > delete</button> </summary>  {childs} </details>
	person.children.forEach((p)=> {
		childs.push( <Person person={p} /> )
	}); 
} else {
		 content =<div className="alone" >{person.Name} <button onClick={()=>emitter.emit('delete',person)} > delete</button>  </div>  
}	

		return content
}
export default Person;

