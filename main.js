$(() => 
{
    fetch( new Request( "https://tcfshsu.github.io/law/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( l ) => 
    {
        console.log( l[0] ) ; 
    } ) ; 
    $("#confirm").on("click", () => 
    {
        let out = "{\n" ; 
        out += "\t\"LawLevel\": \"" + ( $( "#ll" ).val() == null ? "" : $( "#ll" ).val() ) + "\", \n" ; 
        out += "\t\"LawName\": \"" + $( "#ln" ).val() + "\", \n" ; 
        out += "\t\"LawURL\": \"" + $( "#lu" ).val() + "\", \n" ; 
        out += "\t\"LawCategory\": \"" + $( "#lc" ).val() + "\", \n" ; 
        out += "\t\"LawModifiedDate\": \"" + $( "#lm" ).val() + "\", \n" ; 
        out += "\t\"LawEffectiveDate\": \"" + $( "#led" ).val() + "\", \n" ; 
        out += "\t\"LawEffectiveNote\": \"\", \n" ; 
        out += "\t\"LawAbandonNote\": \"" + ( $( "#lan" ).is( ":checked" ) ? "廢" : "" ) + "\", \n" ; 
        out += "\t\"LawHasEngVersion\": \"" + ( $( "#he" ).is( ":checked" ) ? "Y" : "N" ) + "\", \n" ; 
        out += "\t\"EngLawName\": \"" + $( "#en" ).val() + "\", \n" ; 
        out += "\t\"LawAttachments\": [], \n" ; 
        out += "\t\"LawHistories\": \"" + $( "#lh" ).val() + "\", \n" ; 
        out += "\t\"LawForeword\": \"" + $( "#lf" ).val() + "\", \n" ; 
        out += "\t\"LawArticles\": [\n\n\t] \n} " ; 
        $( "#out" ).text( out ) ; 
    } ) ; 
} ) ; 