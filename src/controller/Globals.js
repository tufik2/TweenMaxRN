import {StyleSheet} from "react-native";
import { cuppa } from "src/libs/cuppa";

export class Globals{
    static heightHeaderBar = cuppa.sDim(0, 43, "h").height;
    static heightTabBar = cuppa.sDim(0, 43, "h").height;
}


export var GlobalStyles = StyleSheet.create({
    headerBar:{ backgroundColor:"#00A0FF", height:Globals.heightHeaderBar, flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
    tabBar:{ backgroundColor:"#FFF", height:Globals.heightHeaderBar, flexDirection: "row", justifyContent: "space-around", alignItems: "center", elevation:2,  },
    headerText:{ fontSize:16, color:"#FFF", fontWeight: 'bold' },
    separatorV:{ borderRightWidth: 1, borderRightColor:"#fff", borderStyle:"solid", height:"100%" },
    separatorH:{ borderTopWidth: 1, borderTopColor:"#fff", borderStyle:"solid", height:"100%" },
});


