export function createFamilyTree(people){
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
}