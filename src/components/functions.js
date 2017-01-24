export function createFamilyTree(people){
	var poors=new Map()
	var familyMap = new Map(people.map((person) => [person.ID, person]));
	familyMap.forEach((value, key) => {
	   if (Reflect.has(value, 'parentID')) {
	      let pID = Number(value.parentID);
	      let parent = familyMap.get(pID)
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
		markAnchestors(value)
	   }
	}
	poors.forEach((value)=> {markAnchestors(value)});
	return {familyMap,poors}
}




export function goToChildren(obj, func){
	func(obj)
	if (obj.children && obj.children.length!==0 ) {
       obj.children.forEach((children)=> {
            goToChildren(children, func);
        });
    }
}


export function markAnchestors(value){
 	goToChildren(value, function(obj) {
      if (obj.children && obj.children.length !== 0) {
         obj.children.map(child => {
            child.anc_id = value.ID
         });
      }
   });
}

export function deleteFromTree(person, group, poor) {
   if (Reflect.has(person, 'anc_id')) {
      goToChildren(group.get(person.anc_id), function(obj) {
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
      group.delete(person.ID)
   }
   let tree=!poor ? "familyTree":"poorsTree"
   var family = group
   return {tree,family}
}