import React from 'react';

const Wrapper = ({tree})=> (
	<div className="ui attached segment" style={{width:'auto'}} >
		<section>
			<article>
				{tree}
			</article>
		</section>
	</div>	
)

export default Wrapper