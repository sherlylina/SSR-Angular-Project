export interface Menu {
    text : String,
    url : String,
    anchor : Boolean | String
    two_colom : Boolean
    add_class : String
    children: {
        text : String,
        url : String,
        anchor : Boolean | String
    }[] | Boolean
}