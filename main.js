$( () => 
{
    fetch( new Request( "https://tcfshsu.github.io/law/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( l ) => 
    {
        console.log( l[0] ) ; 
    } ) ; 
    $("#confirm").on("click", () => 
    {
        let out = "\t{\n" ; 
        out += "\t\t\"LawLevel\": \"" + ( $( "#ll" ).val() == null ? "" : $( "#ll" ).val() ) + "\", \n" ; 
        out += "\t\t\"LawName\": \"" + $( "#ln" ).val() + "\", \n" ; 
        out += "\t\t\"LawURL\": \"" + $( "#lu" ).val() + "\", \n" ; 
        out += "\t\t\"LawCategory\": \"" + $( "#lc" ).val() + "\", \n" ; 
        out += "\t\t\"LawModifiedDate\": \"" + $( "#lm" ).val() + "\", \n" ; 
        out += "\t\t\"LawEffectiveDate\": \"" + $( "#led" ).val() + "\", \n" ; 
        out += "\t\t\"LawEffectiveNote\": \"\", \n" ; 
        out += "\t\t\"LawAbandonNote\": \"" + ( $( "#lan" ).is( ":checked" ) ? "廢" : "" ) + "\", \n" ; 
        out += "\t\t\"LawHasEngVersion\": \"" + ( $( "#he" ).is( ":checked" ) ? "Y" : "N" ) + "\", \n" ; 
        out += "\t\t\"EngLawName\": \"" + $( "#en" ).val() + "\", \n" ; 
        out += "\t\t\"LawAttachments\": [], \n" ; 
        out += "\t\t\"LawHistories\": \"" + $( "#lh" ).val() + "\", \n" ; 
        out += "\t\t\"LawForeword\": \"" + $( "#lf" ).val() + "\", \n" ; 
        out += "\t\t\"LawArticles\": [\n\n\t\t] \n\t} " ; 
        $( "#out" ).text( out ) ; 
    } ) ; 
} ) ; 