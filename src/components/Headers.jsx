import React from 'react';

export const FamilyTreeHeader = ()=> (
	<h3 className="ui top attached header">
	  <i className="smile icon"></i>
	  <div className="content">
	    Families
	    <div className="sub header">Every single child has own parent </div>
	  </div>
	</h3>
)

export const PoorTreeHeader = ()=> (
	<h3 className="ui top attached header">
	  <i className="frown icon"></i>
	  <div className="content">
	    Poors
	    <div className="sub header">Have parent ID, but has no parent in the list </div>
	  </div>
	</h3>
)