/*
poors: has parent id but hs no parent on the list
families: has parent id and has parent or has no parent id
*/
export function createFamilyTree(people) {
   var poors = new Map() //create map for poors
   var familyMap = new Map(people.map((person) => [person.ID, person])); //create map for parents and children
   familyMap.forEach((value, key) => {
      if (Reflect.has(value, 'parentID')) { //find people with parent ID (children)
         let pID = Number(value.parentID);
         let parent = familyMap.get(pID) // find this child's parent on familyMap
         if (parent) {
            parent.children = parent.children ? parent.children : [] //create children value for this parent obj
            parent.children.push(value) //push this person(value)  to its parent's children array
         } else {
            poors.set(key, value) //if no parent found, save this person on poors map
         }
      }
   })

   for (var [key, value] of familyMap) {
      if (Reflect.has(value, 'parentID')) {
         familyMap.delete(key) //delete all of the children on top of map
      } else {
         markAnchestors(value)
      }
   }
   poors.forEach((value) => {
      markAnchestors(value) //do it for poors 
   }); 
   return {
      familyMap,
      poors
   }
}




export function goToChildren(obj, func) { //with this func, we can go through nested parents until their last child
   func(obj)
   if (obj.children && obj.children.length !== 0) {
      obj.children.forEach((children) => {
         goToChildren(children, func);
      });
   }
}


export function markAnchestors(value) { //put ancherstor id to all of the children obj  
   goToChildren(value, function(obj) {
      if (obj.children && obj.children.length !== 0) {
         obj.children.map(child => {
            child.anc_id = value.ID
         });
      }
   });
}

export function deleteFromTree(person, group, poor) { //group represents poor people or families,
   if (Reflect.has(person, 'anc_id')) {
      goToChildren(group.get(person.anc_id), function(obj) {
         if (obj.children && obj.children.length !== 0) {
            let children = obj.children
            children.map((child, index) => {
               if (child.ID === person.ID) {
                  children.splice(index, 1) //if any child has deleted, function will find it's index and delete from array
               }
               if (children.length === 0) {
                  delete obj.children //if parent obj has no any child after deleting, it's children value will be deleted.
               }
            });
         }
      });
   } else {
      group.delete(person.ID)
   }
   let tree = !poor ? "familyTree" : "poorsTree"
   var family = group
   return {
      tree,
      family
   }
}