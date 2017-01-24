import React from 'react';
import emitter from './emitter.js'

 const  Person = ({mLeft,person,poor})=> {
 	const styles ={
		uIcon:{
			fontSize:'1em',
			paddingTop:'0em'
		},
		trashIcon:{
			marginLeft: '1em',
		    color: '#D32F2F',
		    cursor: 'pointer'
		},
		pContent:{
			padding:'.4rem'
		},
		personWchild:{
			 margin:`0px ${mLeft}.2em`,
			 cursor:'pointer'
		},
		personWOUTchild:{
			 margin:`0px ${mLeft}.2em`,
		}
	}


 	let childs = []
 	let content
 	const {Name,City,Phone} = person
	if (person.children&&person.children.length!==0) {
		
		content = <details>
		 				<summary>
		 					<h5 className="ui grey header" style={styles.personWchild} >
								<i className="users icon" style={styles.uIcon} ></i>
								<div className="content" style={styles.pContent}>
									{Name} <span style={{fontSize:'0.78em'}} > from </span> {City} <span style={{color:'#212121'}} > {Phone} </span>
					 				<i onClick={()=>emitter.emit('delete',person,poor)} style={styles.trashIcon} className="trash outline icon"></i>
								</div>
							</h5>
		 				</summary>
		 					{childs}
		 			</details>
		person.children.forEach((p)=> {
			childs.push( <Person person={p}  mLeft={mLeft+2} poor={poor} /> )
		}); 
	} else {
		 content =	<h5 className="ui grey header" style={styles.personWOUTchild} >
						<i className="user icon" style={styles.uIcon} ></i>
						<div className="content" style={styles.pContent} >
							{Name} <span style={{fontSize:'0.78em'}} > from </span> {City} <span style={{color:'#212121'}} > {Phone} </span>
			 				<i onClick={()=>emitter.emit('delete',person,poor)} style={styles.trashIcon} className="trash outline icon"></i>
						</div>
					</h5>
	}	

	return content
}
export default Person;

