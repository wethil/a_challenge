export const rawPeople = [
  {
    "ID" :0,
    "Name":"Alex",
    "City":"Charleston"
  },
   {
    "ID" :1,
    "Name":"Ann",
    "City":"Boston",
    "parentID":0
  },
   {
    "ID" :2,
    "Name":"Kahn",
    "City":"Springfield",
    "parentID":1
  },
   {
    "ID" :3,
    "Name":"Tylor",
    "City":"Matton",
    "parentID":1
  },
  {
    "ID" :4,
    "Name":"Harlie",
    "City":"Austin",
    "parentID":3
  },
  {
    "ID" :5,
    "Name":"Fabian",
    "City":"Berlin",
    "parentID":8
  },
   {
    "ID" :7,
    "Name":"Jessica",
    "City":"Chicago"
  },
  {  
    "ID":12,
    "Name":"Lisa",
    "City":"San Francisco",
    "parentID":7,
   }
  
]; 




export const familyOne ={  
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

export const familyTwo ={  
   "ID":7,
   "Name":"Jessica",
   "City":"Chicago",
   "children":[  
      {  
         "ID":12,
         "Name":"Lisa",
         "City":"San Francisco",
         "parentID":7,
         "anc_id":7,
      }
   ]
};


export const poor = {
    "ID" :5,
    "Name":"Fabian",
    "City":"Berlin",
    "parentID":8
  };