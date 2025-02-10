export interface APIData {
  category: string
  location_type: string
  location: {
    latitude:string
    street:{
      id:string
      name:string
    }
    longitude:string
  }
  context:string
  outcome_status:string
  persistent_id:string
  id:number
  location_subtype:string
  month:string
  
  }