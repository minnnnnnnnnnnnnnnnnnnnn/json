$( () => 
{
    let fetch_done = false , lr , l , f = null , /* fl = null , */ domain = "https://tcfshsu.github.io/law" , aNote , first , att_i , ai = 0 ; 
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
                    console.log( a.LawName + " on" ) ; 
                    if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).length ) 
                    {
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).show() ; 
                    }
                    else 
                    {
                        $( "<div />" , 
                            {
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b", 
                                style: "background:#333;color:#efeeee;", 
                                appendTo: $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ) 
                            } )
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "最後更改日期（章程、法律或議會命令：全案表決通過大會日期；學生會或評委會命令：公布日）" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lm", 
                                required: true
                            } ) ) )
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "生效日" , append: "<small>（有特殊條件（如待命令完成後實施等，不含明訂實施日期或自公布日（通過日）實施者）才生效才要填）</small>" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_led"
                            } ) ) )
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "有英文版勾；沒別勾；原本就有英文版並且英文名沒改也別勾" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "checkbox", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he"
                            } ) ) )
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "附件有變動才勾" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "checkbox", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat"
                            } ) ) )
                        .append( "<div id=\"" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att\"></div>" ) 
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "沿革" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lh", 
                                required: true
                            } ) ) )
                        .append( $( "<div />" , 
                            {
                                append: $( "<span />" , { text: "法規前言或宗旨那種東西" } ) 
                            } ).append( $( "<input />" , 
                            {
                                type: "text", 
                                id: a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lf"
                            } ) ) ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).on( "input" , () => 
                        {
                            if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).is( ":checked" ) ) 
                            {
                                $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).after( $( "<div />" , { id : a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_en_container" , append : "<span>法規英文名稱</span><input type=\"text\" required id=\"en\" />" } ) ) ; 
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
                    style: "cursor:pointer;", 
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
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).prop( "disabled" , aNote[i] ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_he" ).prop( "checked" , false ).triggerHandler( "input" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).prop( "checked" , false ).triggerHandler( "input" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).hide() ; 
                    }
                    else 
                    {
                        aNote[i] = false ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_div" ).css( "text-decoration" , "none" ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).prop( "disabled" , aNote[i] ) ; 
                        $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_b" ).show() ; 
                    }
                } ) ; 
            }
            ++ai ; 
        }
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
        console.log( u ) ; 
        let out = "[\n" ; 
        out += "\t{\n" ; 
        out += "\t\t\"UpdateDate\": \"" + u + "\",\n" ; 
        out += "\t\t\"Laws\": [\n" ; 
        let iii = 0 ; 
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
                const id = "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + " " ; 
                out += "\t\t\t\t\"LawLevel\": \"" + ( $( id + "#ll" ).val() == null ? a.LawLevel.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#ll" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawName\": \"" + ( $( id + "#ln" ).val() == null ? a.LawName.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#ln" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawURL\": \"" + a.LawURL.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawCategory\": \"" + a.LawCategory.replaceAll( "\r\n" , "\\r\\n" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawModifiedDate\": \"" + ( $( id + "#lm" ).val() == null ? a.LawModifiedDate.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#lm" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveDate\": \"" + ( $( id + "#led" ).val() == null ? a.LawEffectiveDate.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#led" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawEffectiveNote\": \"" + ( $( id + "#efn" ).val() == null ? a.LawEffectiveNote.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#efn" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAbandonNote\": \"\", \n" ; 
                out += "\t\t\t\t\"LawHasEngVersion\": \"" + ( $( "#he" ).is( ":checked" ) ? "Y" : "N" ) + "\", \n" ; 
                out += "\t\t\t\t\"EngLawName\": \"" + ( $( "#he" ).is( ":checked" ) ? ( $( "#en" ).val() == null ? a.EngLawName.replaceAll( "\r\n" , "\\r\\n" ) : $( "#en" ).val() ) : "" ) + "\", \n" ; 
                out += "\t\t\t\t\"LawAttachments\": [" ; 
                if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_lat" ).is( ":checked" ) ) 
                {
                    for( let i = 0 ; i < att_i[iii] ; i ++ )
                    {
                        out += ( i == 0 ? "" : ", " ) + "\n" ; 
                        out += "\t\t\t\t\t{\n" ; 
                        out += "\t\t\t\t\t\t\"FileName\": \"" + $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_n_" + i ).val() + "\", \n" ; 
                        out += "\t\t\t\t\t\t\"FileURL\": \"" + $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) + "_att_f_u_" + i ).val() + "\" \n" ; 
                        out += "\t\t\t\t\t}" ; 
                        out += ( i == att_i[iii] - 1 ? "\n\t\t\t\t" : "" ) ; 
                    }
                }
                out += "], \n" ; 
                out += "\t\t\t\t\"LawHistories\": \"" + ( $( id + "#lh" ).val() == null ? a.LawHistories.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#lh" ).val() ) + "\", \n" ; 
                out += "\t\t\t\t\"LawForeword\": \"" + ( $( id + "#lf" ).val() == null ? a.LawForeword.replaceAll( "\r\n" , "\\r\\n" ) : $( id + "#lf" ).val() ) + "\", \n" ; 
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
            ++iii ; 
        }
        out += "\t\t] \n" ; 
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