$( () => 
{
    let pr , p ; 
    let pl = Array() ; 
    let pi = 0 ; 
    let f = null ; 
    fetch( new Request( "https://tcfshsu.github.io/law/json/parties.json" ) ).then( r => r.json() ).then( ( lll ) => 
    {
        pr = lll[0] ; 
        p = lll[0].Parties ; 
        console.log( p ) ; 
        for( let pp of p ) 
        {
            $( "#gen" ).before( $( "<div />" , { id: "p" + pp.Party + "_div" , append: $( "<span />" , { text: pp.PartyName } ) } ).append( $( "<input />" , { id: "p" + pp.Party , disabled: pp.PartyState == "廢止備案" , type: "checkbox" } ) ) ) ; 
            $( "#p" + pp.Party ).on( "input" , () => 
            {
                if( $( "#p" + pp.Party + "_box" ).length ) 
                {
                    $( "#p" + pp.Party + "_box" ).toggle() ; 
                    $( "#p" + pp.Party + "_pn" ).prop( "required" , !$( "#p" + pp.Party + "_pn" ).prop( "required" ) ) ; 
                    $( "#p" + pp.Party + "_st" ).prop( "required" , !$( "#p" + pp.Party + "_st" ).prop( "required" ) ) ; 
                }
                else if( $( "#p" + pp.Party ).is( ":checked" ) ) 
                {
                    $( "#p" + pp.Party + "_div" ).after( $( "<div />" , { id: "p" + pp.Party + "_box" , style: "position:relative;background:#333;color:#fff;border:#f00 3pt solid;margin:1rem;" } )
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨編號" } ) } )
                              .append( $( "<input />" , { value: pp.Party , id: "p" + pp.Party + "_p" , type: "number" , min: 0 , step: 1 , required: true } ) ) ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨名稱" } ) } )
                              .append( $( "<input />" , { value: pp.PartyName , id: "p" + pp.Party + "_pn" , type: "text" , required: true } ) ) ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨簡稱" } ) } )
                              .append( $( "<input />" , { value: pp.PartyAbbreviation , id: "p" + pp.Party + "_pa" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨標章檔案名稱" } ) } )
                              .append( $( "<div />" , { append: 
                                  $( "<span />" , { text: "＞ 圖檔" } ) } )
                                  .append( $( "<input />" , { value: pp.Logo[0] , id: "p" + pp.Party + "_lgi" , type: "text" } ) ) 
                              )
                              .append( $( "<div />" , { append: 
                                  $( "<span />" , { text: "＞ 音檔" } ) } )
                                  .append( $( "<input />" , { value: pp.Logo[1] , id: "p" + pp.Party + "_lga" , type: "text" } ) ) 
                              ) ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨負責人" } ) } )
                              .append( $( "<input />" , { value: pp.Chairman , id: "p" + pp.Party + "_cm" , type: "text" } ) ) ) 
                        .append( $( "<select />" , { id: "p" + pp.Party + "_st" , required: true } )
                            .append( $( "<option />" , { text: "政黨狀態" , value: "" , disabled: true } ) ) 
                            .append( $( "<option />" , { selected: pp.PartyState == "一般" , text: "一般" , value: "一般" } ) ) 
                            .append( $( "<option />" , { selected: pp.PartyState == "廢止備案" , text: "廢止備案" , value: "廢止備案" } ) ) 
                            .append( $( "<option />" , { selected: pp.PartyState == "自行解散" , text: "自行解散" , value: "自行解散（因合併而解散亦在此列）" } ) ) 
                        ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨成立大會日期" } ) } )
                              .append( $( "<input />" , { value: pp.PartyEstablishedDate , id: "p" + pp.Party + "_est" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨登記日期" } ) } )
                              .append( $( "<input />" , { value: pp.PartyRegisteredDate , id: "p" + pp.Party + "_reg" , type: "text" } ) ) ) 
                        .append( $( "<div />" , { append: 
                              $( "<span />" , { text: "政黨官網" } ) } )
                              .append( $( "<input />" , { value: pp.PartyURL , id: "p" + pp.Party + "_pu" , type: "text" } ) ) ) 
                    ) ; 
                }
            } ) ; 
            // $( "#p" + pp.Party + "_x" ).on( "click" , () => 
            // {
            //     $( "#p" + pp.Party ).prop( "disabled" , !$( "#p" + pp.Party ).prop( "disabled" ) ) ; 
            //     $( "#p" + pp.Party + "_pn" ).prop( "required" , !$( "#p" + pp.Party + "_pn" ).prop( "required" ) ) ; 
            //     $( "#p" + pp.Party + "_st" ).prop( "required" , !$( "#p" + pp.Party + "_st" ).prop( "required" ) ) ; 
            //     if( $( "#p" + pp.Party ).is( ":checked" ) ) 
            //     {
            //         $( "#p" + pp.Party + "_box" ).toggle() ; 
            //     }
            // } ) ; 
        }
        $( "#gen" ).before( $( "<button />" , { id: "add_party" , type: "button" , text: "+" } ) ) ; 
        $( "#add_party" ).on( "click" , () => 
        {
            pl.push( pi ) ; 
            $( "#add_party" ).before( $( "<div />" , { id: pi , style: "position:relative;background:#333;color:#fff;border:#f00 3pt solid;margin:1rem;" } )
                .append( $( "<span />" , { id: pi + "_x" , text: "×" , style: "cursor:pointer;position:absolute;right:0;top:0;user-select:none;" , onmouseenter: "$( this ).css( \"background\" , \"#f00\" )" , onmouseleave: "$( this ).css( \"background\" , \"\" )" } ) )
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨編號" } ) } )
                      .append( $( "<input />" , { id: pi + "_p" , type: "number" , min: 0 , step: 1 , value: p.length + pi , required: true } ) ) ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨名稱" } ) } )
                      .append( $( "<input />" , { id: pi + "_pn" , type: "text" , required: true } ) ) ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨簡稱" } ) } )
                      .append( $( "<input />" , { id: pi + "_pa" , type: "text" } ) ) ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨標章檔案名稱" } ) } )
                      .append( $( "<div />" , { append: 
                          $( "<span />" , { text: "＞ 圖檔" } ) } )
                          .append( $( "<input />" , { id: pi + "_lgi" , type: "text" } ) ) 
                      )
                      .append( $( "<div />" , { append: 
                          $( "<span />" , { text: "＞ 音檔" } ) } )
                          .append( $( "<input />" , { id: pi + "_lga" , type: "text" } ) ) 
                      ) ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨負責人" } ) } )
                      .append( $( "<input />" , { id: pi + "_cm" , type: "text" } ) ) ) 
                .append( $( "<select />" , { id: pi + "_st" , required: true } )
                    .append( $( "<option />" , { text: "政黨狀態" , value: "" , disabled: true , selected: true } ) ) 
                    .append( $( "<option />" , { text: "一般" , value: "一般" } ) ) 
                    .append( $( "<option />" , { text: "廢止備案" , value: "廢止備案" } ) ) 
                    .append( $( "<option />" , { text: "自行解散" , value: "自行解散（因合併而解散亦在此列）" } ) ) 
                ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨成立大會日期" } ) } )
                      .append( $( "<input />" , { id: pi + "_est" , type: "text" } ) ) ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨登記日期" } ) } )
                      .append( $( "<input />" , { id: pi + "_reg" , type: "text" } ) ) ) 
                .append( $( "<div />" , { append: 
                      $( "<span />" , { text: "政黨官網" } ) } )
                      .append( $( "<input />" , { id: pi + "_pu" , type: "text" } ) ) ) 
            ) ; 
            const iii = pi ; 
            $( "#" + iii + "_x" ).on( "click" , () => 
            {
                let check = ( () => 
                {
                    for( const v of $( "#" + iii + " input[type=\"text\"]" ) ) 
                    {
                        if( v.value != "" ) 
                        {
                            return true ; 
                        }
                    }
                    for( const v of $( "#" + iii + " input[type=\"checkbox\"]" ) ) 
                    {
                        if( v.checked ) 
                        {
                            return true ; 
                        }
                    }
                    for( const v of $( "#" + iii + " select" ) ) 
                    {
                        if( v.value != "" ) 
                        {
                            return true ; 
                        }
                    }
                    return $( "#" + iii + " input[type=\"number\"]" ).val() != 0 ; 
                } )() ; 
                if( check )
                {
                    if( !confirm( "此欄非空，確定刪去？" ) )
                    {
                        return ; 
                    }
                }
                $( "#" + iii ).remove() ; 
                pl.splice( pl.indexOf( iii ) ) ; 
            } ) ; 
            ++ pi ; 
        } ) ; 
        fetch_done = true ; 
    } ) ; 
    $( "#p" ).on( "submit" , () => 
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
        out += "\t\t\"Parties\": [\n" ; 
        for( let i = 0 ; i < p.length ; ++ i ) 
        {
            out += "\t\t\t{\n" ; 
            out += "\t\t\t\t\"Party\": \"" + ( $( "#p" + i + "_p" ).val() ? $( "#p" + i + "_p" ).val() : p[i].Party ) + "\", \n" ; 
            out += "\t\t\t\t\"PartyName\": \"" + ( $( "#p" + i + "_pn" ).val() ? $( "#p" + i + "_pn" ).val() : p[i].PartyName ) + "\", \n" ; 
            out += "\t\t\t\t\"PartyAbbreviation\": \"" + ( $( "#p" + i + "_pa" ).val() ? $( "#p" + i + "_pa" ).val() : p[i].PartyAbbreviation ) + "\", \n" ; 
            out += "\t\t\t\t\"Logo\": [\"" + ( !$( "#p" + i + "_lgi" ).val() ? p[i].Logo[0] : $( "#p" + i + "_lgi" ).val() ) + "\"" + ( $( "#p" + i + "_lga" ).val() ? " , \"" + $( "#p" + i + "_lga" ).val() + "\"" : ( p[i].Logo[1] ? " , \"" + p[i].Logo[1] + "\"" : "" ) ) + "], \n" ; 
            out += "\t\t\t\t\"Chairman\": \"" + ( $( "#p" + i + "_cm" ).val() ? $( "#p" + i + "_cm" ).val() : p[i].Chairman ) + "\", \n" ; 
            out += "\t\t\t\t\"PartyState\": \"" + ( $( "#p" + i + "_st" ).val() ? $( "#p" + i + "_st" ).val() : p[i].PartyState ) + "\", \n" ; 
            out += "\t\t\t\t\"PartyEstablishedDate\": \"" + ( $( "#p" + i + "_est" ).val() ? $( "#p" + i + "_est" ).val() : p[i].PartyEstablishedDate ) + "\", \n" ; 
            out += "\t\t\t\t\"PartyRegisteredDate\": \"" + ( $( "#p" + i + "_reg" ).val() ? $( "#p" + i + "_reg" ).val() : p[i].PartyRegisteredDate ) + "\", \n" ; 
            out += "\t\t\t\t\"PartyURL\": \"" + ( $( "#p" + i + "_pu" ).val() ? $( "#p" + i + "_pu" ).val() : p[i].PartyURL ) + "\", \n" ; 
            out += "\t\t\t}" + ( i == p.length - 1 ? "" : "," ) + " \n" ; 
        }
        for( let i = 0 ; i < pl.length ; ++ i ) 
        {
            out += "\t\t\t{\n" ; 
            out += "\t\t\t\t\"Party\": \"" + $( "#" + i + "_p" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"PartyName\": \"" + $( "#" + i + "_pn" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"PartyAbbreviation\": \"" + $( "#" + i + "_pa" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"Logo\": [\"" + ( !$( "#" + i + "_lgi" ).val() ? "" : $( "#" + i + "_lgi" ).val() ) + "\"" + ( !$( "#" + i + "_lga" ).val() ? "" : " , \"" + $( "#" + i + "_lga" ).val() + "\"" ) + "], \n" ; 
            out += "\t\t\t\t\"Chairman\": \"" + $( "#" + i + "_cm" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"PartyState\": \"" + $( "#" + i + "_st" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"PartyEstablishedDate\": \"" + $( "#" + i + "_est" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"PartyRegisteredDate\": \"" + $( "#" + i + "_reg" ).val() + "\", \n" ; 
            out += "\t\t\t\t\"PartyURL\": \"" + $( "#" + i + "_pu" ).val() + "\", \n" ; 
            out += "\t\t\t}" + ( i == pl.length - 1 ? "" : "," ) + " \n" ; 
        }
        out += "\t\t] \n" ; 
        out += "\t} \n" ; 
        out += "] " ; 
        out = out.replaceAll( "\t" , "    " ) ; 
        $( "#out" ).text( out ) ; 
        if( f !== null ) 
        {
            window.URL.revokeObjectURL( f ) ; 
        }
        f = window.URL.createObjectURL( new Blob( [ out ] , { type : "application/json" } ) ) ; 
        if( $( "#dl" ).length ) 
        {
            $( "#dl" ).remove() ; 
        }
        $( "#preview" ).before( $( "<div />" , { id: "dl" , append: "<a href=\"" + f + "\" download=\"parties.json\">下載</a>" } ) ) ; 
    } ) ; 
} ) ; 