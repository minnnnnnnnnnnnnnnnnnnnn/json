$( () => 
{
    let cr , c ; 
    let cr_i , co_i ; 
    let f = null ; 
    fetch( new Request( "https://tcfshsu.github.io/law/json/cases.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        cr = lll[0] ; 
        c = lll[0].Cases ; 
        let i = 0 ; 
        cr_i = Array( c.length ).fill( 0 ) ; 
        co_i = Array( c.length ).fill( 0 ) ; 
        for( let a of c ) 
        {
            const id = i ; 
            $( "#gen" ).before( $( "<div />" , { id: id + "_div" , append: $( "<span />" , { text: a.No } ) } ).append( $( "<input />" , { type: "checkbox" , id: id } ) ) ) ; 
            $( "#" + id ).on( "input" , () => 
            {
                if( $( "#" + id ).is( ":checked" ) ) 
                {
                    if( !$( "#" + id + "_box" ).length )
                    {
                        // $( "#p" + pp.Party + "_div" ).after( $( "<div />" , { id: "p" + pp.Party + "_box" , style: "position:relative;background:#333;color:#fff;border:#f00 3pt solid;margin:1rem;" } ) ) ; 
                        $( "#" + id + "_div" ).after( $( "<div />" , { id: id + "_box" , style: "position:relative;background:#333;color:#fff;border:#f00 3pt solid;margin:1rem;" } ) ) ; 
                        $( "#" + id + "_box" ).append( $( "<div />" , { append: 
                            $( "<span />" , { text: "案號" } ) } )
                            .append( $( "<input />" , { value: a.No , id: id + "_cn" , type: "text" } ) ) ) 
                        .append( $( "<select />" , { id: id + "_cc" , required: true } )
                            .append( $( "<option />" , { text: "案件類別" , value: "" , disabled: true } ) ) 
                            .append( $( "<option />" , { selected: a.Category == "章程訴訟" , text: "章程訴訟" , value: "章程訴訟" } ) ) 
                            .append( $( "<option />" , { selected: a.Category == "一般訴訟" , text: "一般訴訟" , value: "一般訴訟" } ) ) 
                            .append( $( "<option />" , { selected: a.Category == "懲戒訴訟" , text: "懲戒訴訟" , value: "懲戒訴訟" } ) ) 
                        )
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "判決日" } ) } )
                            .append( $( "<input />" , { value: a.DeliberationDate , id: id + "_dd" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "聲請人" } ) } )
                            .append( $( "<input />" , { value: a.Petitioner , id: id + "_pt" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "原告" } ) } )
                            .append( $( "<input />" , { value: a.Plaintiff , id: id + "_plt" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "被告" } ) } )
                            .append( $( "<input />" , { value: a.Defendant , id: id + "_df" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "標題" } ) } )
                            .append( $( "<input />" , { value: a.Title , id: id + "_t" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "案由" } ) } )
                            .append( $( "<input />" , { value: a.Cause , id: id + "_c" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "判決主文" } ) } )
                            .append( $( "<input />" , { value: a.Syllabus , id: id + "_s" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "案件狀態" } ) } )
                            .append( $( "<input />" , { value: a.State , id: id + "_st" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "判決全文網址" } ) } )
                            .append( $( "<input />" , { value: a.FullJudgement , id: id + "_fj" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "有裁定就勾" } ) } )
                            .append( $( "<input />" , { id: id + "_cr" , type: "checkbox" } ) ) ) 
                        .append( "<div id=\"" + id + "_rul\"></div>" ) 
                        .append( $( "<div />" , { append: 
                            $( "<span />" , { text: "有意見書就勾" } ) } )
                            .append( $( "<input />" , { id: id + "_co" , type: "checkbox" } ) ) ) 
                        .append( "<div id=\"" + id + "_op\"></div>" ) ; 
                        $( "#" + id + "_cr" ).on( "input" , () => 
                        {
                            if( $( "#" + id + "_rul" ).length && $( "#" + id + "_cr" ).is( ":checked" ) ) 
                            {
                                $( "<div />" , 
                                {
                                    id : id + "_rul_" + cr_i[id] , 
                                    append : "<span>裁定 " + ( cr_i[id] + 1 ) + " 字號</span><input type=\"text\" required id=\"" + id + "_cr_n_" + cr_i[id] + "\" /><br /><span>裁定 " + ( cr_i[id] + 1 ) + " 全文網址</span><input type=\"text\" id=\"" + id + "_cr_u_" + cr_i[id] + "\" />" , 
                                    appendTo : "#" + id + "_rul" 
                                } ) ; 
                                ++ cr_i[id] ; 
                                $( "<button />" , 
                                {
                                    id : "add_" + id + "_rul" , 
                                    type : "button" , 
                                    text : "+" , 
                                    appendTo : "#" + id + "_rul" 
                                } ) ; 
                                $( "#add_" + id + "_rul" ).on( "click" , () => 
                                {
                                    $( "#add_" + id + "_rul" ).before( $( "<div />" , 
                                    {
                                        id : "rul_" + cr_i[id] , 
                                        append : "<span>裁定 " + ( cr_i[id] + 1 ) + " 字號</span><input type=\"text\" required id=\"" + id + "_cr_n_" + cr_i[id] + "\" /><br /><span>裁定 " + ( cr_i[id] + 1 ) + " 全文網址</span><input type=\"text\" id=\"" + id + "_cr_u_" + cr_i[id] + "\" />" , 
                                    } ) ) ; 
                                    ++ cr_i[id] ; 
                                    if( $( "#rem_" + id + "_rul" ).length ) 
                                    {
                                        $( "#rem_" + id + "_rul" ).remove() ; 
                                    }
                                    $( "<button />" , 
                                    {
                                        id : "rem_" + id + "_rul" , 
                                        type : "button" , 
                                        text : "-" , 
                                        appendTo : "#" + id + "_rul" 
                                    } ) ; 
                                    $( "#rem_" + id + "_rul" ).on( "click" , () => 
                                    {
                                        -- cr_i[id] ; 
                                        $( "#rul_" + cr_i[id] ).remove() ; 
                                        if( cr_i[id] < 2 ) 
                                        {
                                            $( "#rem_" + id + "_rul" ).remove() ; 
                                        }
                                    } ) ; 
                                } ) ; 
                                return ; 
                            }
                            if( $( "#" + id + "_cr" ).is( ":checked" ) ) 
                            {
                                $( "#" + id + "_rul" ).prop( "style" , "display:block;" ) ; 
                            }
                            else 
                            {
                                $( "#" + id + "_rul" ).prop( "style" , "display:none;" ) ; 
                            }
                            for( let i = 0 ; i < cr_i[id] ; i ++ ) 
                            {
                                $( "#" + id + "_cr_n_" + i ).prop( "required" , $( "#" + id + "_cr" ).is( ":checked" ) ) ; 
                            }
                        } ) ; 
                        $( "#" + id + "_co" ).on( "input" , () => 
                        {
                            if( $( "#" + id + "_co" ).length && $( "#" + id + "_co" ).is( ":checked" ) ) 
                            {
                                $( "<div />" , 
                                {
                                    id : id + "_op_" + co_i[id] , 
                                    append : "<select required id=\"" + id + "_co_t_" + co_i[id] + "\"><option selected disabled value=\"\">意見書 " + ( co_i[id] + 1 ) + " 類型</option><option value=\"協同意見書\">協同意見書</option><option value=\"不同意見書\">不同意見書</option><option value=\"協同意見書\">部分協同意見書</option><option value=\"不同意見書\">部分不同意見書</option><option value=\"部分協同部分不同意見書\">部分協同部分不同意見書</option></select><br /><span>意見書 " + ( co_i[id] + 1 ) + " 評議委員</span><input type=\"text\" required id=\"" + id + "_co_m_" + co_i[id] + "\" /><br /><span>意見書 " + ( co_i[id] + 1 ) + " 全文網址</span><input type=\"text\" required id=\"" + id + "_co_u_" + co_i[id] + "\" />" , 
                                    appendTo : "#" + id + "_op" 
                                } ) ; 
                                ++ co_i[id] ; 
                                $( "<button />" , 
                                {
                                    id : "add_" + id + "_op" , 
                                    type : "button" , 
                                    text : "+" , 
                                    appendTo : "#" + id + "_op" 
                                } ) ; 
                                $( "#add_" + id + "_op" ).on( "click" , () => 
                                {
                                    $( "#add_" + id + "_op" ).before( $( "<div />" , 
                                    {
                                        id : id + "_op_" + co_i[id] , 
                                        append : "<select required id=\"co_t_" + co_i[id] + "\"><option selected disabled value=\"\">意見書 " + ( co_i[id] + 1 ) + " 類型</option><option value=\"協同意見書\">協同意見書</option><option value=\"不同意見書\">不同意見書</option><option value=\"協同意見書\">部分協同意見書</option><option value=\"不同意見書\">部分不同意見書</option><option value=\"部分協同部分不同意見書\">部分協同部分不同意見書</option></select><br /><span>意見書 " + ( co_i[id] + 1 ) + " 評議委員</span><input type=\"text\" required id=\"co_m_" + co_i[id] + "\" /><br /><span>意見書 " + ( co_i[id] + 1 ) + " 全文網址</span><input type=\"text\" required id=\"co_u_" + co_i[id] + "\" />" , 
                                    } ) ) ; 
                                    ++ co_i[id] ; 
                                    if( $( "#rem_" + id + "_op" ).length ) 
                                    {
                                        $( "#rem_" + id + "_op" ).remove() ; 
                                    }
                                    $( "<button />" , 
                                    {
                                        id : "rem_" + id + "_op" , 
                                        type : "button" , 
                                        text : "-" , 
                                        appendTo : "#" + id + "_op" 
                                    } ) ; 
                                    $( "#rem_" + id + "_op" ).on( "click" , () => 
                                    {
                                        -- co_i[id] ; 
                                        $( "#" + id + "_op_" + co_i[id] ).remove() ; 
                                        if( co_i[id] < 2 ) 
                                        {
                                            $( "#rem_" + id + "_op" ).remove() ; 
                                        }
                                    } ) ; 
                                } ) ; 
                                return ; 
                            }
                            if( $( "#" + id + "_co" ).is( ":checked" ) ) 
                            {
                                $( "#" + id + "_op" ).prop( "style" , "display:block;" ) ; 
                            }
                            else 
                            {
                                $( "#" + id + "_op" ).prop( "style" , "display:none;" ) ; 
                            }
                            for( let i = 0 ; i < co_i[id] ; i ++ ) 
                            {
                                $( "#" + id + "_co_t_" + i ).prop( "required" , $( "#" + id + "_co" ).is( ":checked" ) ) ; 
                                $( "#" + id + "_co_m_" + i ).prop( "required" , $( "#" + id + "_co" ).is( ":checked" ) ) ; 
                                $( "#" + id + "_co_u_" + i ).prop( "required" , $( "#" + id + "_co" ).is( ":checked" ) ) ; 
                            }
                        } ) ; 
                    }
                    else 
                    {
                        $( "#" + id + "_box" ).show() ; 
                    }
                }
                else 
                {
                    $( "#" + id + "_box" ).hide() ; 
                }
            } ) ; 
            i ++ ; 
        }
    } ) ; 
    $( "#c" ).on( "submit" , () => 
    {
        
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() + 1 ).padStart( 2 , "0" ) + "/" + String( now.getDate() ).padStart( 2 , "0" ) ; 
        console.log( u ) ; 
        let out = "[\n" ; 
        out += "\t{\n" ; 
        out += "\t\t\"UpdateDate\": \"" + u + "\",\n" ; 
        out += "\t\t\"Cases\": [\n" ; 
        for( let i = 0 ; i < c.length ; ++ i )
        {
            const pre = "#" + i + "_" ; 
            out += "\t\t\t{\n" ; 
            out += "\t\t\t\t\"No\": \"" + ( $( pre + "cn" ).val() ? $( pre + "cn" ).val() : c[i].No ) + "\", \n" ; 
            out += "\t\t\t\t\"Category\": \"" + ( $( pre + "cc" ).val() ? $( pre + "cc" ).val() : c[i].Category ) + "\", \n" ; 
            out += "\t\t\t\t\"DeliberationDate\": \"" + ( $( pre + "dd" ).val() ? $( pre + "dd" ).val() : c[i].DeliberationDate ) + "\", \n" ; 
            out += "\t\t\t\t\"Petitioner\": \"" + ( $( pre + "pt" ).val() ? $( pre + "pt" ).val() : c[i].Petitioner ) + "\", \n" ; 
            out += "\t\t\t\t\"Plaintiff\": \"" + ( $( pre + "plt" ).val() ? $( pre + "plt" ).val() : c[i].Plaintiff ) + "\", \n" ; 
            out += "\t\t\t\t\"Defendant\": \"" + ( $( pre + "df" ).val() ? $( pre + "df" ).val() : c[i].Defendant ) + "\", \n" ; 
            out += "\t\t\t\t\"Title\": \"" + ( $( pre + "t" ).val() ? $( pre + "t" ).val() : c[i].Title ) + "\", \n" ; 
            out += "\t\t\t\t\"Cause\": \"" + ( $( pre + "c" ).val() ? $( pre + "c" ).val() : c[i].Cause ) + "\", \n" ; 
            out += "\t\t\t\t\"Syllabus\": \"" + ( $( pre + "s" ).val() ? $( pre + "s" ).val() : c[i].Syllabus ) + "\", \n" ; 
            out += "\t\t\t\t\"State\": \"" + ( $( pre + "st" ).val() ? $( pre + "st" ).val() : c[i].State ) + "\", \n" ; 
            out += "\t\t\t\t\"FullJudgement\": \"" + ( $( pre + "fj" ).val() ? $( pre + "fj" ).val() : c[i].FullJudgement ) + "\", \n" ; 
            out += "\t\t\t\t\"Rulings\": [" 
            if( $( pre + "cr" ).is( ":checked" ) ) 
            {
                for( let ii = 0 ; ii < cr_i[i] ; ii ++ )
                {
                    out += ( ii == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"RulingNo\": \"" + $( pre + "cr_n_" + ii ).val() + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"FullRulingURL\": \"" + $( pre + "cr_u_" + ii ).val() + "\" \n" ; 
                    out += "\t\t\t\t\t}" ; 
                    out += ( ii == cr_i[i] - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
            }
            out += "], \n" ; 
            out += "\t\t\t\t\"Opinions\": [" ; 
            if( $( pre + "co" ).is( ":checked" ) ) 
            {
                for( let ii = 0 ; ii < co_i[i] ; ii ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"Type\": \"" + $( pre + "co_t_" + ii ).val() + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"Member\": \"" + $( pre + "co_m_" + ii ).val() + "\" \n" ; 
                    out += "\t\t\t\t\t\t\"URL\": \"" + $( pre + "co_u_" + ii ).val() + "\" \n" ; 
                    out += "\t\t\t\t\t}" ; 
                    out += ( ii == co_i[i] - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
            }
            out += "] \n" ; 
            out += "\t\t\t}" + ( i == c.length - 1 ? "" : "," ) + " \n" ; 
        }
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
        $( "#preview" ).before( $( "<div />" , { id: "dl" , append: "<a href=\"" + f + "\" download=\"cases.json\">下載</a>" } ) ) ; 
    } ) ; 
} ) ; 