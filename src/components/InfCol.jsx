import React from 'react';
const InfCol =()=>(
	<div>
		<a href="https://adphorus.com/" target="_blank" > <img src="https://s27.postimg.org/8505bhner/adphorus.png" width={184} height={35} /> </a>
		<h3 className="ui blue header"> Frontend Challenge </h3>
		<h5 className="ui grey center aligned icon  header">
			<i className="users icon"></i>
			<div className="content">
				Represents people with child
			</div>
		</h5>
		<h5 className="ui grey center aligned icon  header">
			<i className="user icon"></i>
			<div className="content">
				Represents people without child
			</div>
		</h5>
		<p style={{fontSize:18}} > test : npm test</p>
	</div>
)

export default InfCol;