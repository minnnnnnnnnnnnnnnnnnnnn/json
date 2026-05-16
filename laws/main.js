$( () => 
{
    const spaces = { "編": "" , "章": "   " , "節" : "      " , "款" : "         " , "目": "            " } ; 
    $( "#in" ).on( "change" , () => 
    {
        let temp = $( "#in" ).val().split( /\r\n|\r|\n/g ) ; 
        let out = "\t\t\t{\n" ; 
        out += "\t\t\t\t\"LawLevel\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawName\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawURL\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawCategory\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawModifiedDate\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawEffectiveDate\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawEffectiveNote\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawAbandonNote\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawHasEngVersion\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"EngLawName\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\", \n" ; 
        out += "\t\t\t\t\"LawAttachments\": [" ; 
        let tempp , i = 0 ; 
        while( tempp = temp.shift() )
        {
            out += ( i == 0 ? "" : ", " ) + "\n" ; 
            out += "\t\t\t\t\t{\n" ; 
            out += "\t\t\t\t\t\t\"FileName\": \"" + ( tempp ? tempp : "" ) + "\", \n" ; 
            out += "\t\t\t\t\t\t\"FileURL\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\" \n" ; 
            out += "\t\t\t\t\t}" ; 
            out += ( temp[0] ? "" : "\n\t\t\t\t" ) ; 
            ++ i ; 
        }
        out += "], \n" ; 
        out += "\t\t\t\t\"LawHistories\": \"" ; 
        while( tempp = temp.shift() )
        {
            out += tempp ? tempp : "" ; 
            out += temp[0] ? "\\r\\n" : "" ; 
        }
        out += "\", \n" ; 
        out += "\t\t\t\t\"LawForeword\": \"" ; 
        while( tempp = temp.shift() )
        {
            out += tempp ? tempp : "" ; 
            out += temp[0] ? "\\r\\n" : "" ; 
        }
        out += "\", \n" ; 
        out += "\t\t\t\t\"LawArticles\": [\n" ; 
        i = 0 ; 
        while( tempp = temp.shift() ) 
        {
            if( /^第 [一二三四五六七八九十百壹貳參肆伍陸柒捌玖拾佰]+ [編章節款目]/.test( tempp ) ) 
            {
                out += ( i ? ", \n" : "" ) + "\t\t\t\t\t{ \n" ; 
                out += "\t\t\t\t\t\t\"ArticleType\": \"C\" \n" ; 
                out += "\t\t\t\t\t\t\"ArticleNo\": \"\" \n" ; 
                out += "\t\t\t\t\t\t\"ArticleContent\": \"" + spaces[ tempp.replace( /^第 [一二三四五六七八九十百壹貳參肆伍陸柒捌玖拾佰]+ / , "" )[0] ] + tempp + "\" \n" ; 
                out += "\t\t\t\t\t}" ; 
                temp.shift() ; 
            }
            else 
            {
                out += ( i ? ", \n" : "" ) + "\t\t\t\t\t{ \n" ; 
                out += "\t\t\t\t\t\t\"ArticleType\": \"A\" \n" ; 
                out += "\t\t\t\t\t\t\"ArticleNo\": \"" + tempp + "\" \n" ; 
                out += "\t\t\t\t\t\t\"ArticleContent\": \"" ; 
                while( !/^C$|^Rel$|^Ref$/.test( temp[0] ) && ( tempp = temp.shift() ) ) 
                {
                    out += tempp ? tempp : "" ; 
                    out += ( !/^C$|^Rel$|^Ref$/.test( temp[0] ) && temp[0] ) ? "\\r\\n" : "" ; 
                }
                out += "\", \n" ; 
                out += "\t\t\t\t\t\t\"Cases\": [" ; 
                if( /^C$/.test( temp[0] ) ) 
                {
                    temp.shift() ; 
                    i = 0 ; 
                    while( !/^Rel$|^Ref$/.test( temp[0] ) && ( tempp = temp.shift() ) )
                    {
                        out += ( i == 0 ? "" : ", " ) + "\n" ; 
                        out += "\t\t\t\t\t\t\t{\n" ; 
                        out += "\t\t\t\t\t\t\t\t\"CaseNo\": \"" + ( tempp ? tempp : "" ) + "\", \n" ; 
                        out += "\t\t\t\t\t\t\t\t\"CaseUrl\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\" \n" ; 
                        out += "\t\t\t\t\t\t\t}" ; 
                        out += ( temp[0] ? "" : "\n\t\t\t\t\t\t" ) ; 
                        ++ i ; 
                    }
                }
                out += "], \n" ; 
                out += "\t\t\t\t\t\t\"Rel\": [" ; 
                if( /^Rel$/.test( temp[0] ) ) 
                {
                    temp.shift() ; 
                    i = 0 ; 
                    while( !/^C$|^Ref$/.test( temp[0] ) && ( tempp = temp.shift() ) )
                    {
                        out += ( i == 0 ? "" : ", " ) + "\n" ; 
                        out += "\t\t\t\t\t\t\t{\n" ; 
                        out += "\t\t\t\t\t\t\t\t\"Name\": \"" + ( tempp ? tempp : "" ) + "\", \n" ; 
                        out += "\t\t\t\t\t\t\t\t\"Url\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\" \n" ; 
                        out += "\t\t\t\t\t\t\t}" ; 
                        out += ( temp[0] ? "" : "\n\t\t\t\t\t\t" ) ; 
                        ++ i ; 
                    }
                }
                out += "], \n" ; 
                out += "\t\t\t\t\t\t\"Ref\": [" ; 
                if( /^Ref$/.test( temp[0] ) ) 
                {
                    temp.shift() ; 
                    i = 0 ; 
                    while( !/^C$|^Rel$/.test( temp[0] ) && ( tempp = temp.shift() ) )
                    {
                        out += ( i == 0 ? "" : ", " ) + "\n" ; 
                        out += "\t\t\t\t\t\t\t{\n" ; 
                        out += "\t\t\t\t\t\t\t\t\"Name\": \"" + ( tempp ? tempp : "" ) + "\", \n" ; 
                        out += "\t\t\t\t\t\t\t\t\"Url\": \"" + ( temp[0] ? temp.shift() : ( temp[0] === "" ? temp.shift() : "" ) ) + "\" \n" ; 
                        out += "\t\t\t\t\t\t\t}" ; 
                        out += ( temp[0] ? "" : "\n\t\t\t\t\t\t" ) ; 
                        ++ i ; 
                    }
                }
                out += "] \n" ; 
                out += "\t\t\t\t\t}" ; 
            }
            ++ i ; 
        }
        out += "\n\t\t\t\t] \n" ; 
        out += "\t\t\t} \n" ; 
        console.log( out ) ; 
        $( "#out" ).text( out ) ; 
    } ) ; 
} ) ; 