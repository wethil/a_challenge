import React from 'react';

 const  Person = (props)=> {
 	var childs = []
 	var person = props.person
 	console.log(person)
if (person.children&&person.children.length!==0) {
	person.children.forEach((p)=> {
		childs.push( <Person person={p} /> )
	});
}
		return (
			<details><summary> {person.name} </summary> {childs} </details>
		);
	
}
export default Person;

