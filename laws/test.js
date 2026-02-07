$( () => 
{
    let fetch_done = false , lr , l , f = null , /* fl = null , */ domain = "https://tcfshsu.github.io/law" , aNote , first , att_i , ai = 0 , li = 0 , la , lfirst , l_att_i , n_art ; 
    const ch_num = "○一二三四五六七八九十" ; 
    fetch( new Request( domain + "/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        lr = lll[0] ; 
        l = lll[0].Laws ; 
        aNote = Array( l.length ) ; 
        aNote.fill( false ) ; 
        first = Array( l.length ) ; 
        first.fill( true ) ; 
        att_i = Array( l.length ) ; 
        att_i.fill( 0 ) ; 
        la = Array() ; 
        lfirst = Array() ; 
        l_att_i = Array() ; 
        n_art = Array() ; 
        for( let a of l ) 
        {
            const i = ai ; 
            $( "#gen" ).before( $( "<div />" , { id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" , append: $( "<span />" , { text: a.LawAbandonNote + a.LawName } ) } ) ) ; 
            $( "<input />" , 
            {
                type: "checkbox", 
                disabled: a.LawAbandonNote == "廢", 
                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ), 
                appendTo: "#l div:last-of-type"
            } ) ; 
            $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).on( "input" , () => 
            {
                if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).is( ":checked" ) ) 
                {
                    if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).length ) 
                    {
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).show() ; 
                    }
                    else 
                    {
                        $( "<div />" , 
                            {
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b", 
                                style: "background:#333;color:#efeeee;padding:.5rem;border:#f00 3pt solid;margin:.25rem;margin-left:1rem;", 
                                appendTo: $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ) 
                            } )
                        // law last modified date
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "最後更改日期（章程、法律或議會命令：全案表決通過大會日期；學生會或評委會命令：公布日）" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lm", 
                                required: true
                            } ) ) )
                        // law effective date
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "生效日" , append: "<small>（有特殊條件（如待命令完成後實施等，不含明訂實施日期或自公布日（通過日）實施者）才生效才要填）</small>" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_led"
                            } ) ) )
                        // law has eng ver.
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "有英文版勾；沒別勾；原本就有英文版並且英文名沒改也別勾" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "checkbox", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he"
                            } ) ) )
                        // law attachments
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "附件有變動才勾" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "checkbox", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat"
                            } ) ) )
                        .append( "<div id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att\"></div>" ) 
                        // law histories
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "沿革" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lh", 
                                value: a.LawHistories.replaceAll( "\r\n" , "\\r\\n" ), 
                                width: "80%", 
                                required: true
                            } ) ) )
                        // law foreword
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "法規前言或宗旨那種東西" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lf"
                            } ) ) ) ; 
                        for( let aa of a.LawArticles )
                        {
                            $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: aa.ArticleType == "C" ? aa.ArticleContent : aa.ArticleNo } ) 
                            } ) )
                                .append( $( "<div />" , { append: "<small style=\"margin-left:.5rem;\"><button id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" + aa.ArticleType.toLowerCase() + "_" + a.LawArticles.indexOf( aa ) + "_btn" + "\" style=\"width:.8rem;margin:0;padding:0;\" type=\"button\">↓</button>原條文 </small>" } )
                                    .append( $( "<input />" , { id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" + aa.ArticleType.toLowerCase() + "_" + a.LawArticles.indexOf( aa ) + "_o" , type: "text" , width: "70%" , value: aa.ArticleContent.replaceAll( "\r\n" , "\\r\\n" ) , disabled: true } ) ) 
                                    .append( "<br />" ) 
                                    .append( "<small style=\"margin-left:.5rem;\">修正條文 </small>" ) 
                                    .append( $( "<input />" , { id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" + aa.ArticleType.toLowerCase() + "_" + a.LawArticles.indexOf( aa ) , type: "text" , width: "70%" , value: aa.ArticleContent.replaceAll( "\r\n" , "\\r\\n" ) } ) ) 
                            ) ; 
                            $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" + aa.ArticleType.toLowerCase() + "_" + a.LawArticles.indexOf( aa ) + "_btn" ).on( "click" , () => { $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" + aa.ArticleType.toLowerCase() + "_" + a.LawArticles.indexOf( aa ) ).val( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" + aa.ArticleType.toLowerCase() + "_" + a.LawArticles.indexOf( aa ) + "_o" ).val() ) } ) ; 
                        }
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).on( "input" , () => 
                        {
                            if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).is( ":checked" ) ) 
                            {
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).after( $( "<div />" , { id : a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_en_container" , append : "<span>法規英文名稱</span><input type=\"text\" required id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_en\" />" } ) ) ; 
                            }
                            else 
                            {
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) +  "_en_container" ).remove() ; 
                            }
                        } ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).on( "input" , () => 
                        {
                            if( first[i] && $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).is( ":checked" ) ) 
                            {
                                first[i] = false ; 
                                $( "<div />" , 
                                {
                                    id : a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_" + att_i[i] , 
                                    append : "<span>附件 " + ( att_i[i] + 1 ) + " 檔案名稱</span><input type=\"text\" required id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_n_" + att_i[i] + "\" /><br /><span>附件 " + ( att_i[i] + 1 ) + " 檔案網址</span><input type=\"text\" id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_u_" + att_i[i] + "\" />" , 
                                    appendTo : "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att" 
                                } ) ; 
                                ++ att_i[i] ; 
                                $( "<button />" , 
                                {
                                    id : a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_add_att" , 
                                    type : "button" , 
                                    text : "+" , 
                                    appendTo : "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att" 
                                } ) ; 
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_add_att" ).on( "click" , () => 
                                {
                                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_add_att" ).before( $( "<div />" , 
                                    {
                                        id : a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_" + att_i[i] , 
                                        append : "<span>附件 " + ( att_i[i] + 1 ) + " 檔案名稱</span><input type=\"text\" required id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_n_" + att_i[i] + "\" /><br /><span>附件 " + ( att_i[i] + 1 ) + " 檔案網址</span><input type=\"text\" id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_u_" + att_i[i] + "\" />" , 
                                    } ) ) ; 
                                    ++ att_i[i] ; 
                                    if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_rem_att" ).length ) 
                                    {
                                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_rem_att" ).remove() ; 
                                    }
                                    $( "<button />" , 
                                    {
                                        id : a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_rem_att" , 
                                        type : "button" , 
                                        text : "-" , 
                                        appendTo : "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att" 
                                    } ) ; 
                                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_rem_att" ).on( "click" , () => 
                                    {
                                        -- att_i[i] ; 
                                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_" + att_i[i] ).remove() ; 
                                        if( att_i[i] < 2 ) 
                                        {
                                            $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_rem_att" ).remove() ; 
                                        }
                                    } ) ; 
                                } ) ; 
                                return ; 
                            }
                            if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).is( ":checked" ) ) 
                            {
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att" ).prop( "style" , "display:block;" ) ; 
                            }
                            else 
                            {
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att" ).prop( "style" , "display:none;" ) ; 
                            }
                            for( let ii = 0 ; ii < att_i[i] ; ii ++ ) 
                            {
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_n_" + ii ).prop( "required" , $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).is( ":checked" ) ) ; 
                            }
                        } ) ; 
                    }
                }
                else 
                {
                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).prop( "checked" , false ).triggerHandler( "input" ) ; 
                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).prop( "checked" , false ).triggerHandler( "input" ) ; 
                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).hide() ; 
                }
                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lm" ).prop( "required" , $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).is( ":checked" ) ) ; 
                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lh" ).prop( "required" , $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).is( ":checked" ) ) ; 
            } ) ; 
            if( a.LawAbandonNote != "廢" ) 
            {
                $( "<span />" , 
                {
                    text: "×", 
                    style: "cursor:pointer;user-select:none;", 
                    id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_x", 
                    appendTo: "#l div:last-of-type" 
                } ) ; 
                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_x" ).on( "click" , () => 
                {
                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lm" ).prop( "required" , aNote[i] ) ; 
                    $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lh" ).prop( "required" , aNote[i] ) ; 
                    if( !aNote[i] ) 
                    {
                        aNote[i] = true ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ).css( "text-decoration" , "line-through" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ).css( "color" , "#f00" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).prop( "disabled" , aNote[i] ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).prop( "checked" , false ).triggerHandler( "input" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).prop( "checked" , false ).triggerHandler( "input" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).hide() ; 
                    }
                    else 
                    {
                        aNote[i] = false ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ).css( "text-decoration" , "none" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ).css( "color" , "" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).prop( "disabled" , aNote[i] ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).show() ; 
                    }
                } ) ; 
            }
            ++ai ; 
        }
        $( "#gen" ).before( $( "<button />" , { id: "add_law" , type: "button" , text: "+" } ) ) ; 
        $( "#add_law" ).on( "click" , () => 
        {
            $( "#add_law" ).before( $( "<div />" , { id: String( li ) , style: "position:relative;background:#333;color:#fff;border:#f00 3pt solid;margin:1rem;" } )
            .append( $( "<span />" , { id: String( li ) + "_x" , text: "×" , style: "cursor:pointer;position:absolute;right:0;top:0;user-select:none;" , onmouseenter: "$( this ).css( \"background\" , \"#f00\" )" , onmouseleave: "$( this ).css( \"background\" , \"\" )" } ) )
            .append( $( "<select />" , { id: String( li ) + "_ll" , required: true } )
                .append( $( "<option />" , { text: "法規位階" , value: "" , disabled: true , selected: true } ) ) 
                .append( $( "<option />" , { text: "章程" , value: "章程" } ) ) 
                .append( $( "<option />" , { text: "法律" , value: "法律" } ) ) 
                .append( $( "<option />" , { text: "命令" , value: "命令" } ) ) 
            ) 
            .append( $( "<div />" , { append: 
                  $( "<span />" , { text: "法規名稱" } ) } )
                  .append( $( "<input />" , { id: String( li ) + "_ln" , type: "text" , required: true } ) ) ) 
            .append( $( "<select />" , { id: String( li ) + "_lc" , required: true } ) 
                .append( $( "<option />" , { text: "法規類別" , value: "" , disabled: true , selected: true } ) ) 
                .append( $( "<option />" , { text: "中央法規" , value: "中央法規" } ) ) 
                .append( $( "<option />" , { text: "行政法規" , value: "行政法規" } ) ) 
                .append( $( "<option />" , { text: "立法法規" , value: "立法法規" } ) ) 
                .append( $( "<option />" , { text: "司法法規" , value: "司法法規" } ) ) 
                .append( $( "<option />" , { text: "選舉法規" , value: "選舉法規" } ) ) 
                .append( $( "<option />" , { text: "中央法規/選舉法規" , value: "中央法規/選舉法規" } ) ) 
                .append( $( "<option />" , { text: "行政法規/選舉法規" , value: "行政法規/選舉法規" } ) ) 
                .append( $( "<option />" , { text: "立法法規/選舉法規" , value: "立法法規/選舉法規" } ) ) 
            ) 
            .append( $( "<div />" , { append: 
                $( "<span />" , { text: "最後更改日期（章程、法律或議會命令：全案表決通過大會日期；學生會或評委會命令：公布日）" } ) } )
                .append( $( "<input />" , { id: String( li ) + "_lm" , type: "text" , required: true } ) ) ) 
            .append( $( "<div />" , { append: 
                $( "<span />" , { text: "生效日" , append: "<small>（有特殊條件（如待命令完成後實施等，不含明訂實施日期或自公布日（通過日）實施者）才生效才要填）</small>" } ) } )
                .append( $( "<input />" , { id: String( li ) + "_led" , type: "text" } ) ) ) 
            .append( $( "<div />" , { append: 
                $( "<span />" , { text: "有英文版勾；沒別勾" } ) } )
                .append( $( "<input />" , { type: "checkbox", id: String( li ) + "_he" } ) ) ) 
            .append( $( "<div />" , { append: 
                $( "<span />" , { text: "有附件才勾" } ) } )
                .append( $( "<input />" , { type: "checkbox", id: String( li ) + "_lat" } ) ) )
            .append( "<div id=\"" + String( li ) + "_att\"></div>" ) 
            .append( $( "<div />" , { append: 
                $( "<span />" , { text: "沿革" } ) } )
                .append( $( "<input />" , { id: String( li ) + "_lh" , type: "text" , required: true } ) ) ) 
            .append( $( "<div />" , { append: 
                $( "<span />" , { text: "法規前言或宗旨那種東西" } ) } )
                .append( $( "<input />" , { id: String( li ) + "_lf" , type: "text" } ) ) ) 
            .append( $( "<div />" , { append: 
                $( "<select />" , { id: String( li ) + "_nf_a" , required: true } )
                    .append( $( "<option />" , { text: "條號" , selected: true , disabled: true , value: "" } ) )
                    .append( $( "<option />" , { text: "中文小寫數字" , value: "ch" } ) )
                    .append( $( "<option />" , { text: "阿拉伯數字" , value: "" } ) ) } ) ) 
            .append( $( "<div />" , { append: 
                $( "<select />" , { id: String( li ) + "_nf_c" , required: true } )
                    .append( $( "<option />" , { text: "編章節款目序號" , selected: true , disabled: true , value: "" } ) )
                    .append( $( "<option />" , { text: "中文小寫數字" , value: "ch" } ) )
                    .append( $( "<option />" , { text: "阿拉伯數字" , value: "" } ) ) } ) ) 
            .append( $( "<div />" , { id: "" , append: 
                $( "<span />" , { text: "條文" , append: "<small>（註：條號部分小數點代表「之」，例：1.1代表1之1，1.10代表1之10，最多接受小數點後兩位（即最多「之99」））</small>" } ) } ) 
                .append( "<div id=\"" + String( li ) + "_art\"></div>" )
                .append( $( "<button />" , { id: String( li ) + "_art_add" , type: "button" , text: "+" , style: "cursor:pointer;user-select:none;" } ) ) )
            ) ; 
            la.push( li ) ; 
            n_art.push( { first: true , art: Array() } ) ; 
            const iii = li ; 
            $( "#" + String( li ) + "_x" ).on( "click" , () => 
            {
                let check = ( () => 
                {
                    for( const v of $( "#" + String( iii ) + " input[type=\"text\"]" ) ) 
                    {
                        if( v.value != "" ) 
                        {
                            return true ; 
                        }
                    }
                    for( const v of $( "#" + String( iii ) + " input[type=\"checkbox\"]" ) ) 
                    {
                        if( v.checked ) 
                        {
                            console.log( v ) ; 
                            return true ; 
                        }
                    }
                    for( const v of $( "#" + String( iii ) + " select" ) ) 
                    {
                        if( v.value != "" ) 
                        {
                            console.log( v ) ; 
                            return true ; 
                        }
                    }
                    return false ; 
                } )() ; 
                if( check )
                {
                    if( !confirm( "此欄非空，確定刪去？" ) )
                    {
                        return ; 
                    }
                }
                $( "#" + String( iii ) ).remove() ; 
                la.splice( la.indexOf( iii ) ) ; 
            } ) ; 
            $( "#" + String( li ) + "_he" ).on( "input" , () => 
            {
                if( $( "#" + String( iii ) + "_he" ).is( ":checked" ) ) 
                {
                    $( "#" + String( iii ) + "_he" ).after( $( "<div />" , { id : String( iii ) + "_en_container" , append : "<span>法規英文名稱</span><input type=\"text\" required id=\"" + String( iii ) + "_en\" />" } ) ) ; 
                }
                else 
                {
                    $( "#" + String( iii ) +  "_en_container" ).remove() ; 
                }
            } ) ; 
            lfirst.push( true ) ; 
            l_att_i.push( 0 ) ; 
            $( "#" + String( li ) + "_lat" ).on( "input" , () => 
            {
                if( lfirst[iii] && $( "#" + String( iii ) + "_lat" ).is( ":checked" ) ) 
                {
                    lfirst[iii] = false ; 
                    $( "<div />" , 
                    {
                        id : String( iii ) + "_att_" + l_att_i[iii] , 
                        append : "<span>附件 " + ( l_att_i[iii] + 1 ) + " 檔案名稱</span><input type=\"text\" required id=\"" + String( iii ) + "_att_f_n_" + l_att_i[iii] + "\" /><br /><span>附件 " + ( l_att_i[iii] + 1 ) + " 檔案網址</span><input type=\"text\" id=\"" + String( iii ) + "_att_f_u_" + l_att_i[iii] + "\" />" , 
                        appendTo : "#" + String( iii ) + "_att" 
                    } ) ; 
                    ++ l_att_i[iii] ; 
                    $( "<button />" , 
                    {
                        id : String( iii ) + "_add_att" , 
                        type : "button" , 
                        text : "+" , 
                        appendTo : "#" + String( iii ) + "_att" 
                    } ) ; 
                    $( "#" + String( iii ) + "_add_att" ).on( "click" , () => 
                    {
                        $( "#" + String( iii ) + "_add_att" ).before( $( "<div />" , 
                        {
                            id : String( iii ) + "_att_" + l_att_i[iii] , 
                            append : "<span>附件 " + ( l_att_i[iii] + 1 ) + " 檔案名稱</span><input type=\"text\" required id=\"" + String( iii ) + "_att_f_n_" + l_att_i[iii] + "\" /><br /><span>附件 " + ( l_att_i[iii] + 1 ) + " 檔案網址</span><input type=\"text\" id=\"" + String( iii ) + "_att_f_u_" + l_att_i[iii] + "\" />" , 
                        } ) ) ; 
                        ++ l_att_i[iii] ; 
                        if( $( "#" + String( iii ) + "_rem_att" ).length ) 
                        {
                            $( "#" + String( iii ) + "_rem_att" ).remove() ; 
                        }
                        $( "<button />" , 
                        {
                            id : String( iii ) + "_rem_att" , 
                            type : "button" , 
                            text : "-" , 
                            appendTo : "#" + String( iii ) + "_att" 
                        } ) ; 
                        $( "#" + String( iii ) + "_rem_att" ).on( "click" , () => 
                        {
                            -- l_att_i[iii] ; 
                            $( "#" + String( iii ) + "_att_" + l_att_i[iii] ).remove() ; 
                            if( l_att_i[iii] < 2 ) 
                            {
                                $( "#" + String( iii ) + "_rem_att" ).remove() ; 
                            }
                        } ) ; 
                    } ) ; 
                    return ; 
                }
                if( $( "#" + String( iii ) + "_lat" ).is( ":checked" ) ) 
                {
                    $( "#" + String( iii ) + "_att" ).prop( "style" , "display:block;" ) ; 
                }
                else 
                {
                    $( "#" + String( iii ) + "_att" ).prop( "style" , "display:none;" ) ; 
                }
                for( let ii = 0 ; ii < l_att_i[iii] ; ii ++ ) 
                {
                    $( "#" + String( iii ) + "_att_f_n_" + ii ).prop( "required" , $( "#" + String( iii ) + "_lat" ).is( ":checked" ) ) ; 
                }
            } ) ; 
            $( "#" + String( li ) + "_art_add" ).on( "click" , () => 
       			{
                const a_l = n_art[iii].art.length , constant = String( iii ) + "_art_" + n_art[iii].art.length ; 
                $( "#" + String( iii ) + "_art" ).append( $( "<div />" , { id: constant } )
                    .append( "<span>第</span>" )
                    .append( $( "<input />" , { id: constant + "_n" , type: "number" , required: true , value: a_l + 1 , min: 1 , step: .01 , style: "width:5em;" } ) )
                    .append( $( "<select />" , { id: constant + "_t" } )
                        .append( $( "<option />" , { value: "條" , text: "條" } ) )
                        .append( $( "<option />" , { value: "編" , text: "編" } ) )
                        .append( $( "<option />" , { value: "章" , text: "章" } ) )
                        .append( $( "<option />" , { value: "節" , text: "節" } ) )
                        .append( $( "<option />" , { value: "款" , text: "款" } ) )
                        .append( $( "<option />" , { value: "目" , text: "目" } ) )
                    )
                    .append( "<span class=\"" + constant + "_name\">【</span>" )
                    .append( $( "<input />" , { id: constant + "_a" , class: constant + "_name" , type: "text" } ) )
                    .append( "<span class=\"" + constant + "_name\">】</span>" )
                    .append( "<br  class=\"" + constant + "_name\" />" )
                    .append( $( "<input />" , { id: constant + "_c" , type: "text" , required: true } ) )
                ) ; 
                $( "#" + constant + "_t" ).on( "input" , () => 
                {
                    if( $( "#" + constant + "_t" ).val() != "條" )
                    {
                        $( "." + constant + "_name" ).hide() ; 
                    }
                    else 
                    {
                        $( "." + constant + "_name" ).show() ; 
                    }
                } ) ; 
                n_art[iii].art.push( { id: "#" + String( iii ) + "_art_" + n_art[iii].art.length } ) ; 
                if( n_art[iii].first ) 
                {
                    n_art[iii].first = false ; 
                    $( "#" + String( iii ) + "_art_add" ).after( $( "<button />" , { id: String( iii ) + "_art_rem" , type: "button" , text: "-" , style: "cursor:pointer;user-select:none;" } ) ) ; 
                    $( "#" + String( iii ) + "_art_rem" ).on( "click" , () => 
                    {
                        $( n_art[iii].art[n_art[iii].art.length - 1].id ).remove() ; 
                        n_art[iii].art.pop() ; 
                        if( !n_art[iii].art.length ) 
                        {
                            $( "#" + String( iii ) + "_art_rem" ).remove() ; 
                            n_art[iii].first = true ; 
                        }
                    } ) ; 
                }
       			} ) ; 
            ++li ; 
        } ) ; 
        fetch_done = true ; 
    } ) ; 
    $( "#l" ).on( "submit" , () => 
    {
        if( !fetch_done ) 
        {
            console.log( "太快了吧" ) ; 
            return ; 
        }
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() + 1 ).padStart( 2 , "0" ) + "/" + String( now.getDate() ).padStart( 2 , "0" ) ; 
        let out = "[\n" ; 
        out += "\t{\n" ; 
        out += "\t\t\"UpdateDate\": \"" + u + "\",\n" ; 
        out += "\t\t\"Laws\": [\n" ; 
        let iii = 0 ; 
        let LawURL_offset = { 'c' : 1 , 'x' : 1 , 'l' : 1 , 'j' : 1 , 'e' : 1 } ; 
        function outPlusEquals( ii , c , uid ) 
        {
            out += ", \n\t\t\t{ \n"
            const id = "#" + ii + "_" ; 
            out += "\t\t\t\t\"LawLevel\": \"" + $( id + "ll" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"LawName\": \"" + $( id + "ln" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"LawURL\": \"" + domain + "/laws/law?a=" + c + String( Number( uid ) + LawURL_offset[c]++ ).padStart( 9 , '0' ) + "\", \n" ; 
            out += "\t\t\t\t\"LawCategory\": \"" + $( id + "lc" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"LawModifiedDate\": \"" + ( $( id + "lm" ).val() == undefined ? "" : $( id + "lm" ).val() ) + "\", \n" ; 
            out += "\t\t\t\t\"LawEffectiveDate\": \"" + ( $( id + "led" ).val() == undefined ? "" : $( id + "led" ).val() ) + "\", \n" ; 
            out += "\t\t\t\t\"LawEffectiveNote\": \"" + ( $( id + "efn" ).val() == undefined ? "" : $( id + "efn" ).val() ) + "\", \n" ; 
            out += "\t\t\t\t\"LawAbandonNote\": \"\", \n" ; 
            out += "\t\t\t\t\"LawHasEngVersion\": \"" + ( $( id + "he" ).is( ":checked" ) ? "Y" : "N" ) + "\", \n" ; 
            out += "\t\t\t\t\"EngLawName\": \"" + ( $( id + "he" ).is( ":checked" ) ? ( $( id + "en" ).val() == undefined ? "" : $( id + "en" ).val() ) : "" ) + "\", \n" ; 
            out += "\t\t\t\t\"LawAttachments\": [" ; 
            if( $( id + "lat" ).is( ":checked" ) ) 
            {
                for( let i = 0 ; i < l_att_i[ii] ; i ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"FileName\": \"" + $( id + "att_f_n_" + i ).val() + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"FileURL\": \"" + $( id + "att_f_u_" + i ).val() + "\" \n" ; 
                    out += "\t\t\t\t\t}" ; 
                    out += ( i == l_att_i[ii] - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
            }
            out += "], \n" ; 
            out += "\t\t\t\t\"LawHistories\": \"" + ( $( id + "lh" ).val() == undefined ? "" : $( id + "lh" ).val() ) + "\", \n" ; 
            out += "\t\t\t\t\"LawForeword\": \"" + ( $( id + "lf" ).val() == undefined ? "" : $( id + "lf" ).val() ) + "\", \n" ; 
            out += "\t\t\t\t\"LawArticles\": [" ; 
            const spaces = { "條": "" , "編": "" , "章": "   " , "節" : "      " , "款" : "         " , "目": "            " } ; 
            function a_n( n , a , nf ) 
            {
                return "a" ; 
            }
            for( let i = 0 ; i < $( id + "art div" ).length ; i ++ )
            {
                out += ( i == 0 ? "" : ", " ) + "\n" ; 
                out += "\t\t\t\t\t{\n" ; 
                const AorC = $( id + "art_" + i + "_t" ).val() == "條" ; 
                out += "\t\t\t\t\t\t\"ArticleType\": \"" + ( AorC ? "A" : "C" ) + "\", \n" ; 
                out += "\t\t\t\t\t\t\"ArticleNo\": \"" + ( AorC ? a_n( $( id + "art_" + i + "_n" ).val() , $( id + "art_" + i + "_a" ).val() , $( id + "nf_a" ) ) : "" ) + "\", \n" ; 
                out += "\t\t\t\t\t\t\"ArticleContent\": \"" + $( id + "art_" + i + "_c" ).val().replace( /^\s*/ , spaces[$( id + "art_" + i + "_t" ).val()] ).replaceAll( "\r\n" , "\\r\\n" ) + "\"" + ( AorC ? "," : "" ) + " \n" ; 
                if( AorC ) 
                {
                    out += "\t\t\t\t\t\t\"Cases\": [" ; 
                    // for( let j = 0 ; j < a.LawArticles[i].Cases.length ; j ++ )
                    // {
                    //     out += ( j == 0 ? "" : ", " ) + "\n" ; 
                    //     out += "\t\t\t\t\t\t\t{\n" ; 
                    //     out += "\t\t\t\t\t\t\t\t\"CaseNo\": \"" + a.LawArticles[i].Cases[j].CaseNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                    //     out += "\t\t\t\t\t\t\t\t\"CaseUrl\": \"" + a.LawArticles[i].Cases[j].CaseUrl + "\" \n" ; 
                    //     out += "\t\t\t\t\t\t\t}" ; 
                    //     out += ( j == a.LawArticles[i].Cases.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                    // }
                    out += "], \n" ; 
                    out += "\t\t\t\t\t\t\"Rel\": [" ; 
                    // for( let j = 0 ; j < a.LawArticles[i].Rel.length ; j ++ )
                    // {
                    //     out += ( j == 0 ? "" : ", " ) + "\n" ; 
                    //     out += "\t\t\t\t\t\t\t{\n" ; 
                    //     out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Rel[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                    //     out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Rel[j].Url + "\" \n" ; 
                    //     out += "\t\t\t\t\t\t\t}" ; 
                    //     out += ( j == a.LawArticles[i].Rel.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                    // }
                    out += "], \n" ; 
                    out += "\t\t\t\t\t\t\"Ref\": [" ; 
                    // for( let j = 0 ; j < a.LawArticles[i].Ref.length ; j ++ )
                    // {
                    //     out += ( j == 0 ? "" : ", " ) + "\n" ; 
                    //     out += "\t\t\t\t\t\t\t{\n" ; 
                    //     out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Ref[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                    //     out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Ref[j].Url + "\" \n" ; 
                    //     out += "\t\t\t\t\t\t\t}" ; 
                    //     out += ( j == a.LawArticles[i].Ref.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                    // }
                    out += "] \n" ; 
                }
                out += "\t\t\t\t\t}" ; 
                out += ( i == $( id + "art div" ).length - 1 ? "\n\t\t\t\t" : "" ) ; 
            }
            out += "] \n" ; 
            out += "\t\t\t}" ; 
        }
        for( let a of l ) 
        {
            if( a.LawURL == domain + "/laws/law?a=c000000001" ) 
            {
                out += "\t\t\t{ \n" ; 
            }
            else 
            {
                out += ", \n\t\t\t{ \n"
            }
            if( aNote[iii] )
            {
                out += "\t\t\t\t\"LawLevel\": \"" + a.LawLevel.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawName\": \"" + a.LawName.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawURL\": \"" + a.LawURL.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawCategory\": \"" + a.LawCategory.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawModifiedDate\": \"" + a.LawModifiedDate.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveDate\": \"" + a.LawEffectiveDate.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveNote\": \"" + a.LawEffectiveNote.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAbandonNote\": \"廢\", \n" ; 
                out += "\t\t\t\t\"LawHasEngVersion\": \"" + a.LawHasEngVersion.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"EngLawName\": \"" + a.EngLawName.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAttachments\": [" ; 
                for( let i = 0 ; i < a.LawAttachments.length ; i ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"FileName\": \"" + a.LawAttachments[i].FileName + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"FileURL\": \"" + a.LawAttachments[i].FileURL + "\" \n" ; 
                    out += "\t\t\t\t\t}" ; 
                    out += ( i == a.LawAttachments.length - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
                out += "], \n" ; 
                out += "\t\t\t\t\"LawHistories\": \"" + a.LawHistories.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawForeword\": \"" + a.LawForeword.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawArticles\": [" ; 
                for( let i = 0 ; i < a.LawArticles.length ; i ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"ArticleType\": \"" + a.LawArticles[i].ArticleType + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"ArticleNo\": \"" + a.LawArticles[i].ArticleNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"ArticleContent\": \"" + a.LawArticles[i].ArticleContent.replaceAll( "\r\n" , "\\r\\n" ) + "\"" + ( a.LawArticles[i].ArticleType == "A" ? "," : "" ) + " \n" ; 
                    if( a.LawArticles[i].ArticleType == "A" ) 
                    {
                        out += "\t\t\t\t\t\t\"Cases\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Cases.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"CaseNo\": \"" + a.LawArticles[i].Cases[j].CaseNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"CaseUrl\": \"" + a.LawArticles[i].Cases[j].CaseUrl + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Cases.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "], \n" ; 
                        out += "\t\t\t\t\t\t\"Rel\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Rel.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Rel[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Rel[j].Url + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Rel.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "], \n" ; 
                        out += "\t\t\t\t\t\t\"Ref\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Ref.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Ref[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Ref[j].Url + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Ref.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "] \n" ; 
                    }
                    out += "\t\t\t\t\t}" ; 
                    out += ( i == a.LawArticles.length - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
                out += "] \n" ; 
                out += "\t\t\t}" ; 
            }
            else if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).is( ":checked" ) ) 
            {
                const id = "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_" ; 
                out += "\t\t\t\t\"LawLevel\": \"" + ( $( id + "ll" ).val() == undefined ? a.LawLevel.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "ll" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawName\": \"" + ( $( id + "ln" ).val() == undefined ? a.LawName.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "ln" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawURL\": \"" + a.LawURL.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawCategory\": \"" + a.LawCategory.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawModifiedDate\": \"" + ( $( id + "lm" ).val() == undefined ? a.LawModifiedDate.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "lm" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveDate\": \"" + ( $( id + "led" ).val() == undefined ? a.LawEffectiveDate.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "led" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveNote\": \"" + ( $( id + "efn" ).val() == undefined ? a.LawEffectiveNote.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "efn" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAbandonNote\": \"\", \n" ; 
                out += "\t\t\t\t\"LawHasEngVersion\": \"" + ( $( id + "he" ).is( ":checked" ) ? "Y" : "N" ) + "\", \n" ; 
                out += "\t\t\t\t\"EngLawName\": \"" + ( $( id + "he" ).is( ":checked" ) ? ( $( id + "en" ).val() == undefined ? a.EngLawName.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "en" ).val() ) : "" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAttachments\": [" ; 
                if( $( id + "lat" ).is( ":checked" ) ) 
                {
                    for( let i = 0 ; i < att_i[iii] ; i ++ )
                    {
                        out += ( i == 0 ? "" : ", " ) + "\n" ; 
                        out += "\t\t\t\t\t{\n" ; 
                        out += "\t\t\t\t\t\t\"FileName\": \"" + $( id + "att_f_n_" + i ).val() + "\", \n" ; 
                        out += "\t\t\t\t\t\t\"FileURL\": \"" + $( id + "att_f_u_" + i ).val() + "\" \n" ; 
                        out += "\t\t\t\t\t}" ; 
                        out += ( i == att_i[iii] - 1 ? "\n\t\t\t\t" : "" ) ; 
                    }
                }
                out += "], \n" ; 
                out += "\t\t\t\t\"LawHistories\": \"" + ( $( id + "lh" ).val() == undefined ? a.LawHistories.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "lh" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawForeword\": \"" + ( $( id + "lf" ).val() == undefined ? a.LawForeword.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "lf" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawArticles\": [" ; 
                for( let i = 0 ; i < a.LawArticles.length ; i ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"ArticleType\": \"" + a.LawArticles[i].ArticleType + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"ArticleNo\": \"" + a.LawArticles[i].ArticleNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"ArticleContent\": \"" + a.LawArticles[i].ArticleContent.replaceAll( "\r\n" , "\\r\\n" ) + "\"" + ( a.LawArticles[i].ArticleType == "A" ? "," : "" ) + " \n" ; 
                    if( a.LawArticles[i].ArticleType == "A" ) 
                    {
                        out += "\t\t\t\t\t\t\"Cases\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Cases.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"CaseNo\": \"" + a.LawArticles[i].Cases[j].CaseNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"CaseUrl\": \"" + a.LawArticles[i].Cases[j].CaseUrl + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Cases.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "], \n" ; 
                        out += "\t\t\t\t\t\t\"Rel\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Rel.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Rel[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Rel[j].Url + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Rel.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "], \n" ; 
                        out += "\t\t\t\t\t\t\"Ref\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Ref.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Ref[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Ref[j].Url + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Ref.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "] \n" ; 
                    }
                    out += "\t\t\t\t\t}" ; 
                    out += ( i == a.LawArticles.length - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
                out += "] \n" ; 
                out += "\t\t\t}" ; 
            }
            else 
            {
                out += "\t\t\t\t\"LawLevel\": \"" + a.LawLevel.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawName\": \"" + a.LawName.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawURL\": \"" + a.LawURL.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawCategory\": \"" + a.LawCategory.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawModifiedDate\": \"" + a.LawModifiedDate.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveDate\": \"" + a.LawEffectiveDate.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveNote\": \"" + a.LawEffectiveNote.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAbandonNote\": \"" + a.LawAbandonNote.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawHasEngVersion\": \"" + a.LawHasEngVersion.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"EngLawName\": \"" + a.EngLawName.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAttachments\": [" ; 
                for( let i = 0 ; i < a.LawAttachments.length ; i ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"FileName\": \"" + a.LawAttachments[i].FileName + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"FileURL\": \"" + a.LawAttachments[i].FileURL + "\" \n" ; 
                    out += "\t\t\t\t\t}" ; 
                    out += ( i == a.LawAttachments.length - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
                out += "], \n" ; 
                out += "\t\t\t\t\"LawHistories\": \"" + a.LawHistories.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawForeword\": \"" + a.LawForeword.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawArticles\": [" ; 
                for( let i = 0 ; i < a.LawArticles.length ; i ++ )
                {
                    out += ( i == 0 ? "" : ", " ) + "\n" ; 
                    out += "\t\t\t\t\t{\n" ; 
                    out += "\t\t\t\t\t\t\"ArticleType\": \"" + a.LawArticles[i].ArticleType + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"ArticleNo\": \"" + a.LawArticles[i].ArticleNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"ArticleContent\": \"" + a.LawArticles[i].ArticleContent.replaceAll( "\r\n" , "\\r\\n" ) + "\"" + ( a.LawArticles[i].ArticleType == "A" ? "," : "" ) + " \n" ; 
                    if( a.LawArticles[i].ArticleType == "A" ) 
                    {
                        out += "\t\t\t\t\t\t\"Cases\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Cases.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"CaseNo\": \"" + a.LawArticles[i].Cases[j].CaseNo.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"CaseUrl\": \"" + a.LawArticles[i].Cases[j].CaseUrl + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Cases.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "], \n" ; 
                        out += "\t\t\t\t\t\t\"Rel\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Rel.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Rel[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Rel[j].Url + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Rel.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "], \n" ; 
                        out += "\t\t\t\t\t\t\"Ref\": [" ; 
                        for( let j = 0 ; j < a.LawArticles[i].Ref.length ; j ++ )
                        {
                            out += ( j == 0 ? "" : ", " ) + "\n" ; 
                            out += "\t\t\t\t\t\t\t{\n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Name\": \"" + a.LawArticles[i].Ref[j].Name.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                            out += "\t\t\t\t\t\t\t\t\"Url\": \"" + a.LawArticles[i].Ref[j].Url + "\" \n" ; 
                            out += "\t\t\t\t\t\t\t}" ; 
                            out += ( j == a.LawArticles[i].Ref.length - 1 ? "\n\t\t\t\t\t\t" : "" ) ; 
                        }
                        out += "] \n" ; 
                    }
                    out += "\t\t\t\t\t}" ; 
                    out += ( i == a.LawArticles.length - 1 ? "\n\t\t\t\t" : "" ) ; 
                }
                out += "] \n" ; 
                out += "\t\t\t}" ; 
            }
            ++ iii ; 
            // last of each category check
            if( ( a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] != "j" && a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] != l[iii].LawURL.replace( domain + "/laws/law?a=" , "" )[0] ) || a == l[l.length - 1] ) 
            {
                for( let ii of la ) 
                {
                    switch( $( "#" + ii + "_lc" ).val() ) 
                    {
                        case "中央法規":
                            if( a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] == 'c' ) 
                            {
                                console.log( 'c' ) ; 
                                outPlusEquals( ii , a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] , a.LawURL.replace( domain + "/laws/law?a=" , "" ).substring( 1 ) ) ; 
                            }
                            else 
                            {
                                continue ; 
                            }
                            break ; 
                        case "行政法規":
                            if( a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] == 'x' ) 
                            {
                                console.log( 'x' ) ; 
                                outPlusEquals( ii , a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] , a.LawURL.replace( domain + "/laws/law?a=" , "" ).substring( 1 ) ) ; 
                            }
                            else 
                            {
                                continue ; 
                            }
                            break ; 
                        case "立法法規":
                            if( a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] == 'l' ) 
                            {
                                console.log( 'l' ) ; 
                                outPlusEquals( ii , a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] , a.LawURL.replace( domain + "/laws/law?a=" , "" ).substring( 1 ) ) ; 
                            }
                            else 
                            {
                                continue ; 
                            }
                            break ; 
                        case "司法法規":
                            if( a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] == 'j' ) 
                            {
                                console.log( 'j' ) ; 
                                outPlusEquals( ii , a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] , a.LawURL.replace( domain + "/laws/law?a=" , "" ).substring( 1 ) ) ; 
                            }
                            else 
                            {
                                continue ; 
                            }
                            break ; 
                        case "選舉法規":
                        case "中央法規/選舉法規":
                        case "行政法規/選舉法規":
                        case "立法法規/選舉法規":
                            if( a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] == 'e' ) 
                            {
                                console.log( 'e' ) ; 
                                outPlusEquals( ii , a.LawURL.replace( domain + "/laws/law?a=" , "" )[0] , a.LawURL.replace( domain + "/laws/law?a=" , "" ).substring( 1 ) ) ; 
                            }
                            else 
                            {
                                continue ; 
                            }
                            break ; 
                        default: 
                          console.log( "something went wrong" ) ; 
                          break ; 
                    }
                }
            }
        }
        out += "\n\t\t] \n" ; 
        out += "\t} \n" ; 
        out += "] " ; 
        out = out.replaceAll( "\t" , "    " ) ; 
        console.log( out ) ; 
        if( f !== null ) 
        {
            window.URL.revokeObjectURL( f ) ; 
        }
        f = window.URL.createObjectURL( new Blob( [ out ] , { type : "application/json" } ) ) ; 
        if( $( "#dl" ).length ) 
        {
            $( "#dl" ).remove() ; 
        }
        $( "<div />" , 
        {
            id: "dl", 
            append: "<a href=\"" + f + "\" download=\"laws.json\">下載laws.json</a>", 
            appendTo: "main" 
        } ) ; 
        // ---latest.json-----------------
        // let lout = "[" ; 
        // lout += "\t{" ; 
        // lout += "\t\t\"No: \"" + "" + "\"" ; 
        // if( fl !== null ) 
        // {
        //     window.URL.revokeObjectURL( fl ) ; 
        // }
        // fl = window.URL.createObjectURL( new Blob( [ lout ] , { type : "application/json" } ) ) ; 
        // if( $( "#ldl" ).length ) 
        // {
        //     $( "#ldl" ).remove() ; 
        // }
        // $( "<div />" , 
        // {
        //     id: "ldl", 
        //     append: "<a href=\"" + f + "\" download=\"latest.json\">下載latest.json</a>", 
        //     appendTo: "main" 
        // } ) ; 
    } ) ; 
} ) ; 
