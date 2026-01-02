$( () => 
{
    let lr , l ; 
    let first = true ; 
    let att_i = 0 ; 
    fetch( new Request( "https://tcfshsu.github.io/law/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        lr = lll[0] ; 
        l = lll[0].Laws ; 
        console.log( l ) ; 
    } ) ; 
    $( "#he" ).on( "input" , () => 
    {
        $( "#en" ).prop( "required" , $( "#he" ).is( ":checked" ) ) ; 
    } ) ; 
    $( "#lat" ).on( "input" , () => 
    {
        if( first && $( "#lat" ).is( ":checked" ) ) 
        {
            first = false ; 
            $( "<div />" , 
            {
                id : "att" + att_i , 
                append : "<span>附件 " + ( att_i + 1 ) + " 檔案網址</span><input type=\"text\" id=\"att_f_u_" + att_i + "\" /><br /><span>附件 " + ( att_i + 1 ) + " 檔案名稱</span><input type=\"text\" required id=\"att_f_n_" + att_i + "\" />" , 
                appendTo : "#att" 
            } ) ; 
            ++ att_i ; 
            $( "<button />" , 
            {
                id : "add_att" , 
                type : "button" , 
                text : "+" , 
                appendTo : "#att" 
            } ) ; 
            $( "#add_att" ).on( "click" , () => 
            {
                $( "#add_att" ).before( $( "<div />" , 
                {
                    append : "<span>附件 " + ( att_i + 1 ) + " 檔案網址</span><input type=\"text\" id=\"att_f_u_" + att_i + "\" /><br /><span>附件 " + ( att_i + 1 ) + " 檔案名稱</span><input type=\"text\" required id=\"att_f_n_" + att_i + "\" />" , 
                } ) ) ; 
                ++ att_i ; 
                console.log( att_i ) ; 
            } ) ; 
            // $( "<button />" , 
            // {
            //     id : "rem_att" , 
            //     type : "button" , 
            //     text : "-" , 
            //     appendTo : "#att" 
            // } ) ; 
            // $( "#rem_att" ).on( "click" , () => 
            // {
            //     $( "#att" + att_i ).remove() ; 
            //     -- att_i ; 
            //     console.log( att_i ) ; 
            // } ) ; 
            return ; 
        }
        if( $( "#lat" ).is( ":checked" ) ) 
        {
            $( "#att" ).prop( "style" , "display:block;" ) ; 
        }
        else 
        {
            $( "#att" ).prop( "style" , "display:none;" ) ; 
        }
        for( let i = 0 ; i < att_i ; i ++ ) 
        {
            $( "#att_f_n_" + i ).prop( "required" , $( "#lat" ).is( ":checked" ) ) ; 
        }
    } ) ; 
    $( "#l" ).on( "submit" , () => 
    {
        
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() + 1 ).padStart( 2 , "0" ) + "/" + String( now.getDay() ).padStart( 2 , "0" ) ; 
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
        out += "\t\t\t\"LawAttachments\": [" // + ( $( "#lat" ).is( ":checked" ) ? "\n\n\t\t\t" : "" ) + "], \n" ; 
        for( let i = 0 ; i < att_i ; i ++ )
        {
            out += ( i == 0 ? "" : ", " ) + "\n" ; 
            out += "\t\t\t\t{\n" ; 
            out += "\t\t\t\t\t\"FileName\": \"" + $( "#att_f_n_" + i ).val() + "\", \n" ; 
            out += "\t\t\t\t\t\"FileURL\": \"" + $( "#att_f_u_" + i ).val() + "\" \n" ; 
            out += "\t\t\t\t}" ; 
            out += ( i == att_i - 1 ? "\n\t\t\t" : "" ) ; 
        }
        out += "], \n" ; 
        out += "\t\t\t\"LawHistories\": \"" + $( "#lh" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawForeword\": \"" + $( "#lf" ).val() + "\", \n" ; 
        out += "\t\t\t\"LawArticles\": [\n\n\t\t\t] \n\t\t} " ; 
        $( "#out" ).text( out.replaceAll( "\t" , "    " ) ) ; 
    } ) ; 
} ) ; 