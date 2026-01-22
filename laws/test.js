$( () => 
{
    let lr , l ; 
    fetch( new Request( "https://tcfshsu.github.io/law/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        lr = lll[0] ; 
        l = lll[0].Laws ; 
        for( let a of l ) 
        {
            $( "<div />" , 
            {
                text: a.LawAbandonNote + a.LawName, 
                append: $( "<input />" , 
                {
                    type: "checkbox", 
                    disabled: a.LawAbandonNote == "廢", 
                    id: a.LawURL.replace( "https://tcfshsu.github.io/law/laws/law?a=" , "" )
                } ), 
                appendTo: "main"
            } ) ; 
            $( "#" + a.LawURL.replace( "https://tcfshsu.github.io/law/laws/law?a=" , "" ) ).on( "input" , () => 
            {
                if( $("#" + a.LawURL.replace( "https://tcfshsu.github.io/law/laws/law?a=" , "" ) ).is( ":checked" ) ) 
                {
                    console.log( a.LawName + " on" ) ; 
                }
                else 
                {
                    console.log( a.LawName + " off" ) ; 
                }
            } ) ; 
        }
    } ) ; 
    // should be local
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() + 1 ).padStart( 2 , "0" ) + "/" + String( now.getDate() ).padStart( 2 , "0" ) ; 
        console.log( u ) ; 
        let out = "[\n" ; 
        out += "\t{\n" ; 
        out += "\t\t\"UpdateDate\": \"" + u + "\",\n" ; 
        out += "\t\t\"Laws\": [\n" ; 
        // laws
        out += "\t\t] \n" ; 
        out += "\t} \n" ; 
        out += "] " ; 
        out = out.replaceAll( "\t" , "    " ) ; 
    // should be local
} ) ; 