$( () => 
{
    let lr , l ; 
    fetch( new Request( "https://tcfshsu.github.io/law/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        lr = lll ; 
        l = lll[0].Laws ; 
        console.log( l ) ; 
    } ) ; 
    $( "#he" ).on( "input" , () => 
    {
        $( "#en" ).prop( "required" , $( "#he" ).is( ":checked" ) ) ; 
    } ) ; 
    $( "#l" ).on( "submit" , () => 
    {
        
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() ).padStart( 2 , "0" ) + "/" + String( now.getDay() ).padStart( 2 , "0" ) ; 
        console.log( u ) ; 
        let out = "\t\t{\n" ; 
        out += "\t\t\t\"LawLevel\": \"" + ( $( "#ll" ).val() == null ? "" : $( "#ll" ).val() ) + "\", \n" ; 
        out += "\t\t\t\"LawName\": \"" + $( "#ln" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawURL\": \"" ; 
        for( let a of l ) 
        {
            if( a.LawName == $( "#ln" ).val() ) 
            {
                out += a.LawURL ; 
                break ; 
            }
        }
        out += "\", \n" ; 
        // out += "\t\t\t\"LawURL\": \"" + $( "#lu" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawCategory\": \"" + ( $( "#lc" ).val() == null ? "" : $( "#lc" ).val() ) + "\", \n" ; 
        out += "\t\t\t\"LawModifiedDate\": \"" + $( "#lm" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawEffectiveDate\": \"" + $( "#led" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawEffectiveNote\": \"\", \n" ; 
        out += "\t\t\t\"LawAbandonNote\": \"" + ( $( "#lan" ).is( ":checked" ) ? "廢" : "" ) + "\", \n" ; 
        out += "\t\t\t\"LawHasEngVersion\": \"" + ( $( "#he" ).is( ":checked" ) ? "Y" : "N" ) + "\", \n" ; 
        out += "\t\t\t\"EngLawName\": \"" + $( "#en" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawAttachments\": [], \n" ; 
        out += "\t\t\t\"LawHistories\": \"" + $( "#lh" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawForeword\": \"" + $( "#lf" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawArticles\": [\n\n\t\t\t] \n\t\t} " ; 
        $( "#out" ).text( out ) ; 
    } ) ; 
} ) ; 