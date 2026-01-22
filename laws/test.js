$( () => 
{
    let lr , l , f = null , domain = "https://tcfshsu.github.io/law"; 
    fetch( new Request( domain + "/json/laws.json" ) ).then( ( res ) => res.json() ).then( ( lll ) => 
    {
        lr = lll[0] ; 
        l = lll[0].Laws ; 
        for( let a of l ) 
        {
            $( "#gen" ).before( $( "<div />" , 
            {
                text: a.LawAbandonNote + a.LawName, 
                append: $( "<input />" , 
                {
                    type: "checkbox", 
                    disabled: a.LawAbandonNote == "廢", 
                    id: a.LawURL.replace( domain + "/laws/law?a=" , "" )
                } )
            } ) ) ; 
            $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).on( "input" , () => 
            {
                if( $("#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).is( ":checked" ) ) 
                {
                    console.log( a.LawName + " on" ) ; 
                }
                else 
                {
                    console.log( a.LawName + " off" ) ; 
                }
            } ) ; 
        }
        $( "#gen" ).before() ; 
    } ) ; 
    $( "#l" ).on( "submit" , () => 
    {
        const now = new Date() ; 
        const u = String( now.getFullYear() ).padStart( 4 , "0" ) + "/" + String( now.getMonth() + 1 ).padStart( 2 , "0" ) + "/" + String( now.getDate() ).padStart( 2 , "0" ) ; 
        console.log( u ) ; 
        let out = "[\n" ; 
        out += "\t{\n" ; 
        out += "\t\t\"UpdateDate\": \"" + u + "\",\n" ; 
        out += "\t\t\"Laws\": [\n" ; 
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
            if( $( "#" + a.LawURL.replace( domain + "/laws/law?a=" , "" ) ).is( ":checked" ) ) 
            {
                $
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
                    out += "\t\t\t\t\t\t\"FileName\": \"" + a.LawAttachments.FileName + "\", \n" ; 
                    out += "\t\t\t\t\t\t\"FileURL\": \"" + a.LawAttachments.FileURL + "\" \n" ; 
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
            append: "<a href=\"" + f + "\" download=\"laws.json\">下載</a>", 
            appendTo: "main" 
        } ) ; 
    } ) ; 
} ) ; 