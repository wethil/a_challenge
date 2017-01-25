import {rawPeople,familyOne,familyTwo,poor} from '../src/lib/testObjects.js'
import {createFamilyTree,deleteFromTree} from '../src/components/functions.js'


let test1="createFamilyTree will build family and poors tree,delete every child on top of family tree and add anchestor id to all child"
let test2="delete function will delete children value from person object if every children are deleted for this person"

var familyMapTest = new Map();
var poorTest = new Map();
familyMapTest.set(familyOne.ID,familyOne);
familyMapTest.set(familyTwo.ID,familyTwo);

test(test1,()=>{
	poorTest.set(poor.ID,poor);
	const {familyMap,poors} = createFamilyTree(rawPeople)
	
	expect({familyMap,poors}).toEqual({"familyMap":familyMapTest,"poors":poorTest});
})

test(test2,()=>{
	let Anna = familyOne.children[0];
	let newAnna = deleteFromTree(Anna,familyMapTest,false);
	let Alex = familyMapTest.get(0);
	
	expect(Alex.children).toBeUndefined();
})


/*
familyOne ={  
   "ID":0,
   "Name":"Alex",
   "City":"Charleston",
   "children":[  
      {  
         "ID":1,
         "Name":"Ann",
         "City":"Boston",
         "parentID":0,
         "anc_id":0,
         "children":[  
            {  
               "ID":2,
               "Name":"Kahn",
               "City":"Springfield",
               "parentID":1,
               "anc_id":0,
            },
            {  
               "ID":3,
               "Name":"Tylor",
               "City":"Matton",
               "parentID":1,
               "anc_id":0,
               "children":[  
                  {  
                     "ID":4,
                     "Name":"Harlie",
                     "City":"Austin",
                     "anc_id":0,
                     "parentID":3
                  }
               ]
            }
         ]
      }
   ]
};

*/