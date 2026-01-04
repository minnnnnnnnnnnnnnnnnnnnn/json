$( () => 
{
    let pr , p ; 
    let first_r = true , first_o = true ; 
    let cr_i = 0 , co_i = 0 ; 
    let f = null ; 
    fetch( new Request( "https://tcfshsu.github.io/law/json/parties.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        pr = lll[0] ; 
        p = lll[0].Parties ; 
        console.log( p ) ; 
    } ) ; 
    $( "#cr" ).on( "input" , () => 
    {
        if( first_r && $( "#cr" ).is( ":checked" ) ) 
        {
            first_r = false ; 
            $( "<div />" , 
            {
                id : "rul_" + cr_i , 
                append : "<span>裁定 " + ( cr_i + 1 ) + " 字號</span><input type=\"text\" required id=\"cr_n_" + cr_i + "\" /><br /><span>裁定 " + ( cr_i + 1 ) + " 全文網址</span><input type=\"text\" id=\"cr_u_" + cr_i + "\" />" , 
                appendTo : "#rul" 
            } ) ; 
            ++ cr_i ; 
            $( "<button />" , 
            {
                id : "add_rul" , 
                type : "button" , 
                text : "+" , 
                appendTo : "#rul" 
            } ) ; 
            $( "#add_rul" ).on( "click" , () => 
            {
                $( "#add_rul" ).before( $( "<div />" , 
                {
                    id : "rul_" + cr_i , 
                    append : "<span>裁定 " + ( cr_i + 1 ) + " 字號</span><input type=\"text\" required id=\"cr_n_" + cr_i + "\" /><br /><span>裁定 " + ( cr_i + 1 ) + " 全文網址</span><input type=\"text\" id=\"cr_u_" + cr_i + "\" />" , 
                } ) ) ; 
                ++ cr_i ; 
                if( $( "#rem_rul" ).length ) 
                {
                    $( "#rem_rul" ).remove() ; 
                }
                $( "<button />" , 
                {
                    id : "rem_rul" , 
                    type : "button" , 
                    text : "-" , 
                    appendTo : "#rul" 
                } ) ; 
                $( "#rem_rul" ).on( "click" , () => 
                {
                    -- cr_i ; 
                    $( "#rul_" + cr_i ).remove() ; 
                    if( cr_i < 2 ) 
                    {
                        $( "#rem_rul" ).remove() ; 
                    }
                } ) ; 
            } ) ; 
            return ; 
        }
        if( $( "#cr" ).is( ":checked" ) ) 
        {
            $( "#rul" ).prop( "style" , "display:block;" ) ; 
        }
        else 
        {
            $( "#rul" ).prop( "style" , "display:none;" ) ; 
        }
        for( let i = 0 ; i < cr_i ; i ++ ) 
        {
            $( "#rul_n_" + i ).prop( "required" , $( "#cr" ).is( ":checked" ) ) ; 
        }
    } ) ; 
    $( "#co" ).on( "input" , () => 
    {
        if( first_o && $( "#co" ).is( ":checked" ) ) 
        {
            first_o = false ; 
            $( "<div />" , 
            {
                id : "op_" + co_i , 
                append : "<select required id=\"co_t_" + co_i + "\"><option selected disabled value=\"\">意見書 " + ( co_i + 1 ) + " 類型</option><option value=\"協同意見書\">協同意見書</option><option value=\"不同意見書\">不同意見書</option><option value=\"部分協同部分不同意見書\">部分協同部分不同意見書</option></select><br /><span>意見書 " + ( co_i + 1 ) + " 評議委員</span><input type=\"text\" required id=\"co_m_" + co_i + "\" /><br /><span>意見書 " + ( co_i + 1 ) + " 全文網址</span><input type=\"text\" required id=\"co_u_" + co_i + "\" />" , 
                appendTo : "#op" 
            } ) ; 
            ++ co_i ; 
            $( "<button />" , 
            {
                id : "add_op" , 
                type : "button" , 
                text : "+" , 
                appendTo : "#op" 
            } ) ; 
            $( "#add_op" ).on( "click" , () => 
            {
                $( "#add_op" ).before( $( "<div />" , 
                {
                    id : "op_" + co_i , 
                    append : "<select required id=\"co_t_" + co_i + "\"><option selected disabled value=\"\">意見書 " + ( co_i + 1 ) + " 類型</option><option value=\"協同意見書\">協同意見書</option><option value=\"不同意見書\">不同意見書</option><option value=\"部分協同部分不同意見書\">部分協同部分不同意見書</option></select><br /><span>意見書 " + ( co_i + 1 ) + " 評議委員</span><input type=\"text\" required id=\"co_m_" + co_i + "\" /><br /><span>意見書 " + ( co_i + 1 ) + " 全文網址</span><input type=\"text\" required id=\"co_u_" + co_i + "\" />" , 
                } ) ) ; 
                ++ co_i ; 
                if( $( "#rem_op" ).length ) 
                {
                    $( "#rem_op" ).remove() ; 
                }
                $( "<button />" , 
                {
                    id : "rem_op" , 
                    type : "button" , 
                    text : "-" , 
                    appendTo : "#op" 
                } ) ; 
                $( "#rem_op" ).on( "click" , () => 
                {
                    -- co_i ; 
                    $( "#op_" + co_i ).remove() ; 
                    if( co_i < 2 ) 
                    {
                        $( "#rem_op" ).remove() ; 
                    }
                } ) ; 
            } ) ; 
            return ; 
        }
        if( $( "#co" ).is( ":checked" ) ) 
        {
            $( "#op" ).prop( "style" , "display:block;" ) ; 
        }
        else 
        {
            $( "#op" ).prop( "style" , "display:none;" ) ; 
        }
        for( let i = 0 ; i < co_i ; i ++ ) 
        {
            $( "#co_n_" + i ).prop( "required" , $( "#co" ).is( ":checked" ) ) ; 
        }
    } ) ; 
    $( "#p" ).on( "submit" , () => 
    {
        
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() + 1 ).padStart( 2 , "0" ) + "/" + String( now.getDate() ).padStart( 2 , "0" ) ; 
        console.log( u ) ; 
        let out = "[\n" ; 
        out += "\t{\n" ; 
        out += "\t\t\"UpdateDate\": \"" + u + "\",\n" ; 
        out += "\t\t\"Parties\": [\n" ; 
        out += "\t\t\t{\n" ; 
        out += "\t\t\t\t\"Party\": \"" + $( "#p" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyName\": \"" + $( "#pn" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyAbbreviation\": \"" + $( "#pa" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyLogo\": [\"" + ( $( "#lgi" ).val() == null ? "" : $( "#lgi" ).val() ) + "\"" + ( $( "#lga" ).val() == "" ? "" : " , \"" + $( "#lga" ).val() + "\"" ) + "], \n" ; 
        out += "\t\t\t\t\"Chairman\": \"" + $( "#cm" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyState\": \"" + $( "#st" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyEstablishedDate\": \"" + $( "#est" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyRegisteredDate\": \"" + $( "#reg" ).val() + "\", \n" ; 
        out += "\t\t\t\t\"PartyURL\": \"" + $( "#pu" ).val() + "\", \n" ; 
        out += "\t\t\t} \n" ; 
        out += "\t\t] \n" ; 
        out += "\t} \n" ; 
        out += "] " ; 
        out = out.replaceAll( "\t" , "    " ) ; 
        $( "#out" ).text( out ) ; 
        // let d = new Blob( [ out ] , { type : "application/json" } ) ; 
        if( f !== null ) 
        {
            window.URL.revokeObjectURL( f ) ; 
        }
        f = window.URL.createObjectURL( /* d */ new Blob( [ out ] , { type : "application/json" } ) ) ; 
        if( $( "#dl" ).length ) 
        {
            $( "#dl" ).remove() ; 
        }
        $( "<div />" , 
        {
            id: "dl", 
            append: "<a href=\"" + f + "\" download>下載</a>", 
            appendTo: "main" 
        } ) ; 
    } ) ; 
} ) ; 