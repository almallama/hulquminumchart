var intCount = 0;
var intFirst = 0;
var strSymbol = "";
var strDescr = "";
var strTemp = "";
var strTable = "";
var el;
var style;
var fontSize;
var strHex = "";
var strTooltip = "";
var intCH = 0;
var intMDH = 0;
var strSH;

document.title = "IPA i-charts (" + n + ")";

var strHeader = "<div class='sel_type'>";
for (i=0;i<arrHeader.length;i++) {
	if (i == 0) {
		strHeader = strHeader + "<button class='blank_W' id='"+arrHeader[i]["HName"]+"'";
	}
	else {
		strHeader = strHeader + "<button class='blank_N' id='"+arrHeader[i]["HName"]+"'";
	}
	strHeader = strHeader + " onmouseover='BLongOver("+i+")' onmouseout='BLongOut("+i+")' ";
	strHeader = strHeader + "onclick='BLongClick("+i+")'>" + arrHeader[i]["HLabel"] + "</button> ";
}
strHeader = strHeader + "</div>";

var strTitle = arrHeader[0]["BTitle"];

var strType = "<div class='type_cont' id='type_cont'>";
strType = strType + "<div class='tc_H' id='h_T' onClick='ShowHideTable(-1)' onmouseover='TableTTOver(-1)' onmouseout='TableTTOut(-1)'>TRANSCRIPTION −</div>";
strType = strType + "<table class='trans_fsize' id='trans_fsize'><tr><td class='trans_fsize'>";
for (i=0;i<arrTrButtons.length;i++) {
	var intBtr = i + 1;
	if (i > 4) {
		strType = strType + "<button class='trans_button_U'";
	}
	else if (isKonq) {
		strType = strType + "<button class='trans_button_K'";
	}
	else {
		strType = strType + "<button class='trans_button'";
	}
	strType = strType + " id='btr"+intBtr+"' onClick='"+arrTrButtons[i]["TrBFunction"]+"' onmouseover='BTrOver("+intBtr+")'";
	strType = strType + " onmouseout='BTrOut("+intBtr+")'>";
	if ((isIE || isEdge || isKonq) && i == 8) {
		strType = strType + arrTrButtons[i]["TrBLabelIE"];
	}
	else {
		strType = strType + arrTrButtons[i]["TrBLabel"];
	}
	strType = strType + "</button>";
}
strType = strType + "</td></tr></table>";
strType = strType + "<div id='trans_cont'>";
if (isIE || isEdge) {
	strType = strType + "<div class='trans_IE' id='trans'>";
}
else {
	strType = strType + "<div class='trans' id='trans'>";
}
strType = strType + "<textarea class='";
if (isKonq) {
	strType = strType + "trans_i_K";
}
else {
	strType = strType + "trans_i";
}
strType = strType + "' id='trans_i' spellcheck='false' oninput='TextAreaResize()' onchange='TextAreaResize()'";
if (!isIE && !isEdge && !isKonq) {
	strType = strType + " onmouseup='ChangeHeight()' onresize='ChangeHeight()'>";
}
else if (isKonq) {
	strType = strType + ">Please note that changing font size doesn't work as expected on Konqueror!";
}
else {
	strType = strType + ">";
}
strType = strType + "</textarea></div>";
strType = strType + "<div class='comment'>&nbsp;</div>";
strType = strType + "</div></div>";

//Consonants - pulmonic
var strCP = "<div class='table_cont' id='cp_cont'>";

strCP = strCP + "<h1 id='h_0' onClick='ShowHideTable(0)' onmouseover='TableTTOver(0)' onmouseout='TableTTOut(0)'>" + arrTables[0]["T_Name"] + " −</h1>";
strCP = strCP + "<div id='tc_0'>";
strCP = strCP + "<table id='t_0'>";
strCP = strCP + "<tr>";
strCP = strCP + "<td class='cpmetaL'><div class='colhead'>&nbsp;</div></td>";
for (i=0;i<arrPlaces.length;i++) {
	if (i == arrPlaces.length-1) {
		strCP = strCP + "<td colspan='2' class='cpmetaR'><div class='colhead'>" + SentenceCase(arrPlaces[i]) + "</div></td>";
	}
	//else if (i == 5 || i == 6 || i == 7) {
	//	strCP = strCP + "<td colspan='2' class='cpmeta_colR'><div class='colhead'>" + SentenceCase(arrPlaces[i]) + "</div></td>";
	//}
	else {
		strCP = strCP + "<td colspan='2' class='cpmeta_colL'><div class='colhead'>" + SentenceCase(arrPlaces[i]) + "</div></td>";
	}
}
strCP = strCP + "</tr>";

for (i=0;i<arrManners.length;i++) {
	strCP = strCP + "<tr><td class='cpmeta_row'><div class='rowhead'>"+SentenceCase(arrManners[i])+"</div></td>";
	for (n=0;n<arrTables[0]["T_Cols"];n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 0 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				strSymbol = "' id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail(" + arrSymbols[a]["SID"] + ")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				if (isIE || isEdge) {
					strSymbol = strSymbol + "<div class='symS'><div class='symS_IE'>" + strHex + "</div></div>";
				}
				else {
					strSymbol = strSymbol + "<div class='symS'>" + strHex + "</div>";
				}
				strSymbol = strSymbol + "</td>";
				a = arrSymbols.length;
			}
			else {
				strSymbol = "";
			}
		}
		if (strSymbol == "") {
			for (a=0;a<arrImp.length;a++) {
				if (arrImp[a]["Col_No"] == n+1 && arrImp[a]["Row_No"] == i+1) {
					strSymbol = "blank'>&nbsp;</td>";
					a = arrImp.length;
				}
				else {
					strSymbol = "";
				}
			}
		}
		if (strSymbol == "") {
			strSymbol = "'>&nbsp;</td>";
		}
		/*if ((n==5 || n==6 || n==7 || n==8) && i != 4) {
			strSymbol = "none" + strSymbol;
		}*/
		else if ((n==18 || n==19 || n==20 || n==21) && i == 0) {
			strSymbol = "<td class='cpall" + strSymbol;
		}
			if (strSymbol.indexOf("<td class='") == -1) {
			if (IsOdd(n+1) == 0) {
				strSymbol = "<td class='cpvd" + strSymbol;
			}
			else if (IsOdd(n+1) == 1) {
				strSymbol = "<td class='cpvless" + strSymbol;
			}
		}
		strCP = strCP + strSymbol;
	}
	strCP = strCP + "</tr>";
}

strCP = strCP + "</table>";
strCP = strCP + "<div class='comment' id='comment_0'>&nbsp;</div>";
strCP = strCP + "</div>";
strCP = strCP + "</div>";
/*
//Consonants - non-pulmonic
var strCnP = "<div class='table_cont' id='cnp_cont'>";

strCnP = strCnP + "<h1 id='h_1' onClick='ShowHideTable(1)' onmouseover='TableTTOver(1)' onmouseout='TableTTOut(1)'>" + arrTables[1]["T_Name"] + " −</h1>";
strCnP = strCnP + "<div id='tc_1'>";
strCnP = strCnP + "<table id='t_1'>";
strCnP = strCnP + "<tr>";
for (i=0;i<arrAirstreams.length;i++) {
	if (i == 0) {
		strCnP = strCnP + "<td class='cnpmetaL' colspan='2'><div class='colhead'>" + SentenceCase(arrAirstreams[i]) + "</div></td>";
	}
	else if (i == arrAirstreams.length-1) {
		strCnP = strCnP + "<td class='cnpmetaR' colspan='2'><div class='colhead'>" + SentenceCase(arrAirstreams[i]) + "</div></td>";
	}
	else {
		strCnP = strCnP + "<td class='cnpmeta' colspan='2'><div class='colhead'>" + SentenceCase(arrAirstreams[i]) + "</div></td>";
	}
}
strCnP = strCnP + "</tr>";
intCount = 0;
intFirst = 1;

for (i=0;i<arrTables[1]["T_Rows"];i++) {
	strCnP = strCnP + "<tr>";
	for (n=0;n<arrAirstreams.length;n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 1 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				strSymbol = " id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail(" + arrSymbols[a]["SID"] + ")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				if (isIE || isEdge) {
					strSymbol = strSymbol + "<div class='symS'><div class='symS_IE'>" + strHex + "</div></div>";
				}
				else {
					strSymbol = strSymbol + "<div class='symS'>" + strHex + "</div>";
				}
				strSymbol = strSymbol + "</td>";
				strDescr = "><div class='sym_descr'>" + SentenceCase(arrSymbols[a]["Descr_Short"]) + "</div></td>";
				a = arrSymbols.length;
			}
			else {
				strSymbol = ">&nbsp;</td>";
				strDescr = ">&nbsp;</td>";
			}
		}
		if (i == 0) {
			strTemp = "T";
		}
		else if (i == arrTables[1]["T_Rows"]-1) {
			strTemp = "B";
		}
		else {
			strTemp = "";
		}
		strCnP = strCnP + "<td class='cnpsym" + strTemp + "'" + strSymbol + "<td class='cnpdescr" + strTemp + "'" + strDescr;
	}
	strCnP = strCnP + "</tr>";
}

strCnP = strCnP + "</table>";
strCnP = strCnP + "<div class='comment' id='comment_1'>&nbsp;</div>";
strCnP = strCnP + "</div>";
strCnP = strCnP + "</div>";

//Other symbols
var strCO = "<div class='table_cont' id='co_cont'>";

strCO = strCO + "<h1 id='h_2' onClick='ShowHideTable(2)' onmouseover='TableTTOver(2)' onmouseout='TableTTOut(2)'>" + arrTables[2]["T_Name"] + " −</h1>";
strCO = strCO + "<div id='tc_2'>";
strCO = strCO + "<div class='table_cont_2' id='table_cont_t_2'>";
strCO = strCO + "<table class='table_plain' id='t_2'>";

for (i=0;i<arrTables[2]["T_Rows"];i++) {
	strCO = strCO + "<tr>";
	for (n=0;n<arrTables[2]["T_Cols"];n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 2 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				if (n > 0 && i == 3) {
					strDescr = strDescr;
				}
				else {
					strDescr = "'><div class='sym_descr'>" + SentenceCase(arrSymbols[a]["Descr"]) + "</div></td>";
				}
				if ((isBaidu || isYa) && (arrSymbols[a]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[a]["U_Range"] == "Combining Diacritical Marks Supplement")) {
					strSymbol = "'><div class='symS_Tor'";
				}
				else {
					strSymbol = "'><div class='symS'";
				}
				strSymbol = strSymbol + " id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail("+arrSymbols[a]["SID"]+")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				if (isIE || isEdge) {
					strSymbol = strSymbol + "<div class='symS_IE'>" + strHex + "</div>";
				}
				else {
					strSymbol = strSymbol + strHex;
				}
				strSymbol = strSymbol + "</div></td>";
				a = arrSymbols.length;
			}
			else {
				if (n == 1 && i == 3) {
					strDescr = "'><div class='sym_descr_com'>" + SentenceCase(arrTables[2]["T_Comm"]) + "</div></td>";
				}
				else {
					strSymbol = "'>&nbsp;</td>";
					strDescr = "'>&nbsp;</td>";
				}
			}
		}
		strTemp = "";
		if (n == 1) {
			strTemp = "vless";
		}
		else if (n == 2) {
			if (i == 2) {
				strDescr = "'><div class='sym_descr'>Simultaneous ʃ and x</div></td>";
			}
			strTemp = "vd";
		}
		strSymbol = " class='cosym" + strTemp + strSymbol;
		strDescr = " class='codescr" + strDescr;
		if (i == 3 && n == 1) {
			strSymbol = "";
			strDescr = "<td rowspan='2' colspan='3'" + strDescr;
		}
		else if ((i == 3 && n == 2) || (i == 4 && n > 0)) {
			strSymbol = "";
			strDescr = "";
		}
		else if (i == 5 && n > 0) {
			strSymbol = "<td" + strSymbol;
			if (n == 2) {
				strDescr = "<td class='codescr'><div class='sym_descr'>Tie bar (below/above)</div></td>";
			}
		}
		else {
			strSymbol = "<td" + strSymbol;
			strDescr = "<td" + strDescr;
		}
		if (strDescr.indexOf("Voiced alveolo") > -1) {
			strDescr = strDescr.replace("Voiced alveolo-palatal fricative","Alveolo-palatal fricatives");
		}
		strCO = strCO + strSymbol;
		if (i == 3 && n == 1) {
			strCO = strCO + strDescr;
		}
		else if (n != 1) {
			strCO = strCO + strDescr;
		}
	}
	strCO = strCO + "</tr>";
}

strCO = strCO + "</table>";
strCO = strCO + "</div>";
strCO = strCO + "<div class='comment' id='comment_2'>&nbsp;</div>";
strCO = strCO + "</div>";
strCO = strCO + "</div>";

//Diacritics
var strDia = "<div class='table_cont' id='dia_cont'>";

strDia = strDia + "<h1 id='h_3' onClick='ShowHideTable(3)' onmouseover='TableTTOver(3)' onmouseout='TableTTOut(3)'>" + arrTables[3]["T_Name"] + " −</h1>";
strDia = strDia + "<div id='tc_3'>";
strDia = strDia + "<div class='table_cont_3' id='table_cont_t_3'>";
strDia = strDia + "<table class='table_plain' id='t_3'>";

for (i=0;i<arrTables[3]["T_Rows"];i++) {
	strDia = strDia + "<tr>";
	for (n=0;n<arrTables[3]["T_Cols"];n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 3 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				strSymbol = " id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail(" + arrSymbols[a]["SID"] + ")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				if ((isBaidu || isYa) && !isUCBr && !isOprN && (arrSymbols[a]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[a]["U_Range"] == "Combining Diacritical Marks Supplement")) {
					strSymbol = strSymbol + "<div class='symS_Tor'";
					if (arrSymbols[a]["IPA_No"]=="427") {
						strSymbol = strSymbol + " style='padding-right:23px'";
					}
					strSymbol = strSymbol + ">";
				}
				else {
					strSymbol = strSymbol + "<div class='symS'>";
				}
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				if (isIE || isEdge) {
					strSymbol = strSymbol + "<div class='symS_IE'>" + strHex + "</div>";
				}
				else {
					strSymbol = strSymbol + strHex;
				}
				strSymbol = strSymbol + "</div></td>";
				strDescr = ">" + SentenceCase(arrSymbols[a]["Descr"]) + "</td>";
				a = arrSymbols.length;
			}
			else {
				strSymbol = ">&nbsp;</td>";
				strDescr = ">&nbsp;</td>";
			}
		}
		if (i > 6 && n > 0) {
			if (i > 6 && n == 1) {
				strDia = strDia + "<td class='diasym'" + strSymbol + "<td class='diadescr'" + " colspan='3'" + strDescr;
			}
		}
		else {
			strDia = strDia + "<td class='diasym'" + strSymbol + "<td class='diadescr'" + strDescr;
		}
	}
	strDia = strDia + "</tr>";
}

strDia = strDia + "</table>";
strDia = strDia + "</div>";
strDia = strDia + "<div class='comment' id='comment_3'>&nbsp;</div>";
strDia = strDia + "</div>";
strDia = strDia + "</div>";

//Vowels
var strVs = "<div class='table_cont' id='vs_cont'>";
strVs = strVs + "<h1 id='h_4' onClick='ShowHideTable(4)' onmouseover='TableTTOver(4)' onmouseout='TableTTOut(4)'>" + arrTables[4]["T_Name"] + " −</h1>";
strVs = strVs + "<div id='tc_4'>";
strVs = strVs + "<div class='table_cont_2' id='table_cont_t_4'>";
if (isIE) {strVs = strVs + "<div class='bckg_v_IE'>";}
else if (isEdge) {strVs = strVs + "<div class='bckg_v_Edge'>";}
else if (isBaidu) {strVs = strVs + "<div class='bckg_v_Baidu'>";}
else if (isSafari) {strVs = strVs + "<div class='bckg_v_Safari'>";}
else if (isOpera) {strVs = strVs + "<div class='bckg_v_Opera'>";}
else if (isYa) {strVs = strVs + "<div class='bckg_v_Baidu'>";}
else if (isChrome) {strVs = strVs + "<div class='bckg_v_Chrome'>";}
else if (isFirefox) {strVs = strVs + "<div class='bckg_v_Firefox'>";}
else {strVs = strVs + "<div class='bckg_v_other'>";}
strVs = strVs + "<table class='table_plain_vs' id='t_4'>";

strVs = strVs + "<tr>";
a = 0;
for (n=0;n<arrTables[4]["T_Cols"]/6;n++) {
	if (IsOdd(n) == 0) {
		strVs = strVs + "<td class='vsym5' colspan='5'>&nbsp;</td>";
	}
	else if (IsOdd(n) == 1) {
		if (a == arrFBness.length-1) {
			strVs = strVs + "<td class='vdescr7' colspan='7'><div class='sym_descr_v'>" + arrFBness[a] + "</div></td>";
		}
		else {
			strVs = strVs + "<td class='vdescr7' colspan='7'><div class='sym_descr_v'>" + arrFBness[a] + "</div></td>";
		}
		a++;
	}
}
strVs = strVs + "</tr>";
intCounter = 0;

for (i=0;i<arrTables[4]["T_Rows"];i++) {
	strVs = strVs + "<tr>";
	for (n=0;n<arrTables[4]["T_Cols"];n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 4 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				strSymbol = "<td class='vsym3' colspan='3' id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail(" + arrSymbols[a]["SID"] + ")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				strSymbol = strSymbol + "<div class='symS";
				n+=2;
				if (a < arrSymbols.length-1) {
					if (arrSymbols[a]["T_Type"] == arrSymbols[a+1]["T_Type"]) {
						if (arrSymbols[a]["Row_No"] == arrSymbols[a+1]["Row_No"] && arrSymbols[a]["Col_No"]+4 == arrSymbols[a+1]["Col_No"]) {
							if (arrSymbols[a]["Descr"].replace("UNROUNDED", "ROUNDED") == arrSymbols[a+1]["Descr"]) {
								strSymbol = strSymbol + "R2'>" + strHex + "</div></td>";
								strSymbol = strSymbol + "<td class='vsym'>&nbsp;</td>";
								a = arrSymbols.length;
								n++;
							}
						}
						else if (arrSymbols[a]["Row_No"] == arrSymbols[a+1]["Row_No"] && arrSymbols[a]["Col_No"]+3 == arrSymbols[a+1]["Col_No"]) {
							if (arrSymbols[a]["Descr"].replace("UNROUNDED", "ROUNDED") == arrSymbols[a+1]["Descr"]) {
								strSymbol = strSymbol + "R3'>" + strHex + "</div></td>";
								a = arrSymbols.length;
							}
						}
					}
				}
				else if (a > 0) {
					if (arrSymbols[a]["T_Type"] == arrSymbols[a-1]["T_Type"]) {
						if (arrSymbols[a]["Row_No"] == arrSymbols[a-1]["Row_No"] && arrSymbols[a]["Col_No"]-4 == arrSymbols[a-1]["Col_No"]) {
							strSymbol = strSymbol + "'>" + strHex + "</div></td>";
							a = arrSymbols.length;
						}
					}
				}
				if (a < arrSymbols.length-1) {
					if (arrSymbols[a]["T_Type"] == arrSymbols[a-1]["T_Type"]) {
						if (arrSymbols[a]["Row_No"] == arrSymbols[a-1]["Row_No"] && arrSymbols[a]["Col_No"]-4 == arrSymbols[a-1]["Col_No"]) {
							if (arrSymbols[a-1]["Descr"].replace("UNROUNDED", "ROUNDED") == arrSymbols[a]["Descr"]) {
								strSymbol = strSymbol + "L2'>" + strHex + "</div></td>";
								a = arrSymbols.length;
							}
						}
						else if (arrSymbols[a]["Row_No"] == arrSymbols[a-1]["Row_No"] && arrSymbols[a]["Col_No"]-3 == arrSymbols[a-1]["Col_No"]) {
							if (arrSymbols[a-1]["Descr"].replace("UNROUNDED", "ROUNDED") == arrSymbols[a]["Descr"]) {
								strSymbol = strSymbol + "L3'>" + strHex + "</div></td>";
								a = arrSymbols.length;
							}
						}
						else {
							strSymbol = strSymbol + "'>" + strHex + "</div></td>";
							a = arrSymbols.length;
						}
					}
				}
			}
			else {
				strSymbol = "<td class='vsym'>&nbsp;</td>";
			}
		}
		if (n == 0) {
			if (i == 0) {
				strSymbol = "<td class='vdescr5' colspan='5'><div class='sym_descr_v'>" + arrHeight[intCounter] + "</div></td>";
				intCounter++;
				n+=4;
			}
			else if (i == 2 || i == 4 || i == 6) {
				strSymbol = "<td class='vdescr9' colspan='9'><div class='sym_descr_v'>" + arrHeight[intCounter] + "</div></td>";
				intCounter++;
				n+=8;
			}
			else {
				strSymbol = "<td class='vdescr'>&nbsp;</td>";
			}
		}
		strVs = strVs + strSymbol;
	}
	strVs = strVs + "</tr>";
}

strVs = strVs + "</table>";
strVs = strVs + "</div>";
strVs = strVs + "</div>";
strVs = strVs + "<div class='comment_v' id='comment_4'>&nbsp;</div>";
strVs = strVs + "</div>";
strVs = strVs + "</div>";

//Suprasegmentals
var strSupra = "<div class='table_cont' id='supra_cont'>";

strSupra = strSupra + "<h1 id='h_5' onClick='ShowHideTable(5)' onmouseover='TableTTOver(5)' onmouseout='TableTTOut(5)'>" + arrTables[5]["T_Name"] + " −</h1>";
strSupra = strSupra + "<div id='tc_5'>";
strSupra = strSupra + "<div class='table_cont_2' id='table_cont_t_5'>";
strSupra = strSupra + "<table class='table_plain' id='t_5'>";

for (i=0;i<arrTables[5]["T_Rows"];i++) {
	strSupra = strSupra + "<tr>";
	for (n=0;n<arrTables[5]["T_Cols"];n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 5 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				strSymbol = " id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail(" + arrSymbols[a]["SID"] + ")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				if ((isBaidu || isYa) && !isUCBr && !isOprN && (arrSymbols[a]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[a]["U_Range"] == "Combining Diacritical Marks Supplement")) {
					strSymbol = strSymbol + "<div class='symS_Tor'>";
				}
				else {
					strSymbol = strSymbol + "<div class='symS'>";
				}
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				if (isIE || isEdge) {
					strSymbol = strSymbol + "<div class='symS_IE'>" + strHex + "</div>";
				}
				else {
					strSymbol = strSymbol + strHex;
				}
				strSymbol = strSymbol + "</div></td>";
				strDescr = ">" + SentenceCase(arrSymbols[a]["Descr"]) + "</td>";
				a = arrSymbols.length;
			}
			else {
				strSymbol = ">&nbsp;</td>";
				strDescr = ">&nbsp;</td>";
			}
		}
		strSupra = strSupra + "<td class='suprasym'" + strSymbol + "<td class='supradescr'" + strDescr;
	}
	strSupra = strSupra + "</tr>";
}

strSupra = strSupra + "</table>";
strSupra = strSupra + "</div>";
strSupra = strSupra + "<div class='comment' id='comment_5'>&nbsp;</div>";
strSupra = strSupra + "</div>";
strSupra = strSupra + "</div>";

//Tones
var strTones = "<div class='table_cont' id='cp_cont'>";
strTones = strTones + "<h1 id='h_6' onClick='ShowHideTable(6)' onmouseover='TableTTOver(6)' onmouseout='TableTTOut(6)'>" + arrTables[6]["T_Name"] + " −</h1>";
strTones = strTones + "<div id='tc_6'>";
strTones = strTones + "<table id='t_6'>";
strTones = strTones + "<tr>";
for (i=0;i<arrTones.length;i++) {
	if (i == arrTones.length-1) {
		strTones = strTones + "<td colspan='4' class='cpmetaR'><div class='colhead'>" + SentenceCase(arrTones[i]) + "</div></td>";
	}
	else if (i == 0) {
		strTones = strTones + "<td colspan='4' class='cpmetaL'><div class='colhead'>" + SentenceCase(arrTones[i]) + "</div></td>";
	}
	else {
		strTones = strTones + "<td colspan='4' class='cpmeta'><div class='colhead'>" + SentenceCase(arrTones[i]) + "</div></td>";
	}
}
strTones = strTones + "</tr>";


for (i=0;i<arrTables[6]["T_Rows"];i++) {
	strTones = strTones + "<tr>";
	for (n=0;n<arrTables[6]["T_Cols"];n++) {
		for (a=0;a<arrSymbols.length;a++) {
			if (arrSymbols[a]["T_Type"] == 6 && arrSymbols[a]["Col_No"] == n+1 && arrSymbols[a]["Row_No"] == i+1) {
				strSymbol = " id='" + arrSymbols[a]["SID"] + "' onClick='ShowTrail(" + arrSymbols[a]["SID"] + ")'";
				strSymbol = strSymbol + " onmouseover='ShowTooltip(strTitle)' onmouseout='HideTooltip()'>";
				strHex = "&#x" + arrSymbols[a]["U_No"] + ";";
				strHex = strHex.replace(" + ",";&#x");
				strHex = strHex.replace(" + ",";&#x");
				if (arrSymbols[a]["IPA_No"] == "529" || arrSymbols[a]["IPA_No"] == "530" || arrSymbols[a]["IPA_No"] == "531" || arrSymbols[a]["IPA_No"] == "532" || arrSymbols[a]["IPA_No"] == "533") {
					strSymbol = strSymbol + "<div class='symL'>";
					if (isIE || isEdge) {
						strSymbol = strSymbol + "<div class='symL_IE'>" + strHex + "</div>";
					}
					else {
						strSymbol = strSymbol + strHex;
					}
				}
				else {
					if ((isBaidu || isYa) && !isUCBr && !isOprN && (arrSymbols[a]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[a]["U_Range"] == "Combining Diacritical Marks Supplement")) {
						strSymbol = strSymbol + "<div class='symS_Tor'>";
					}
					else {
						strSymbol = strSymbol + "<div class='symS'>";
					}
					if (isIE || isEdge) {
						strSymbol = strSymbol + "<div class='symS_IE'>" + strHex + "</div>";
					}
					else {
						strSymbol = strSymbol + strHex;
					}
				}
				strSymbol = strSymbol + "</div></td>";
				strDescr = "><div class='sym_descr_t'>" + SentenceCase(arrSymbols[a]["Descr_Short"]) + "</div></td>";
				a = arrSymbols.length;
			}
			else {
				strSymbol = ">&nbsp;</td>";
				strDescr = ">&nbsp;</td>";
			}
		}
		if (n == 0 || n == 2) {
			if (i == 0) {
				strDescr = "M'><div class='sym_descr_t'>or</div></td>";
			}
			else if (i == 5 || i == 6) {
				strDescr = "R' colspan='3'" + strDescr;
			}
			else {
				strDescr = "'>&nbsp;</td>";
			}
			strTemp = "";
			if (i == arrTables[6]["T_Rows"]-1) {
				if (strDescr.indexOf("R'") > -1) {
					strDescr = strDescr.replace("R'","RB'");
				}
				else {
					strDescr = "B'" + strDescr;
				}
				strTemp = "LB";
			}
			else {
				strTemp = "L";
			}
			strTones = strTones + "<td class='tsym" + strTemp + "'" + strSymbol + "<td class='tdescr" + strDescr;
		}
		else if (n == 1 || n == 3) {
			strTemp = "";
			if (i != 5 && i != 6) {
				strDescr = "R'" + strDescr;
				strTones = strTones + "<td class='tsym" + strTemp + "'" + strSymbol + "<td class='tdescr" + strDescr;
			}
		}
	}
	strTones = strTones + "</tr>";
}

strTones = strTones + "</table>";
strTones = strTones + "<div class='comment' id='comment_6'>&nbsp;</div>";
strTones = strTones + "</div>";
strTones = strTones + "</div>";
*/
var strContent = "";

if (isKonq) {
	strContent = strHeader + strType + "<div class='tablesT' id='t_top'>" + strCP + "</div>";
	strContent = strContent + "<table class='table_plain'><tr>";
//	strContent = strContent + "<td class='td_plain' id='t_left'>" + strCnP + "<div class='tablesM'>" + strCO + "</div><div class='tablesM'>" + strDia + "</div></td>";
//	strContent = strContent + "<td class='td_plain' id='t_right'>" + strVs + "<div class='tablesM'>" + strSupra + "</div><div class='tablesM'>" + strTones + "</div></td>";
	strContent = strContent + "</tr></table>";
}
else {
	strContent = strHeader + strType + "<div class='tablesT' id='t_top'>" + strCP + "</div>";
	strContent = strContent + "<div class='tablesL' id='t_left'>";
//	strContent = strContent + strCnP + "<div class='tablesM'>" + strCO + "</div><div class='tablesM'>" + strDia + "</div></div>";
	strContent = strContent + "<div class='tablesR' id='t_right'>";
//	strContent = strContent + strVs + "<div class='tablesM'>" + strSupra + "</div><div class='tablesM'>" + strTones + "</div></div>";
}

document.write(strContent);
//GetFontSize(-1);

BLongOut(-1);
document.getElementById("btr3").style.color = "rgba(227,101,40,1)";
document.getElementById("btr7").style.color = "rgba(227,101,40,1)";
document.getElementById("btr8").style.color = "rgba(227,101,40,1)";

intCounter = document.getElementById("t_0").clientWidth;
if (isIE || isEdge) {
	document.getElementById("trans").style.width = intCounter - 22 + "px";
}
else {
	document.getElementById("trans").style.width = intCounter - 20 + "px";
}

intCounter = document.getElementById("t_5").clientWidth;
document.getElementById("table_cont_t_5").style.width = intCounter + "px";
intCounter = document.getElementById("t_4").clientWidth;
document.getElementById("table_cont_t_4").style.width = intCounter + "px";
intCounter = document.getElementById("t_3").clientWidth;
document.getElementById("table_cont_t_3").style.width = intCounter - 1 + "px";
intCounter = document.getElementById("t_2").clientWidth;
document.getElementById("table_cont_t_2").style.width = intCounter + "px";
intCounter = document.getElementById("table_cont_t_4").clientWidth;
document.getElementById("t_right").style.width = intCounter + "px";
TextAreaResize();

if (isKonq) {
	document.getElementById("t_left").style.width = document.getElementById("t_top").clientWidth - document.getElementById("t_right").clientWidth + "px";
}

for (i=0;i<arrTables.length;i++) {
	if (i != 2 && arrTables[i]["T_Comm"] != "&nbsp;") {
		intCounter = document.getElementById("t_"+i).clientWidth;
		if (i == 4) {
			intCounter -= 95;
		}
		document.getElementById("comment_"+i).style.width = intCounter + "px";
		document.getElementById("comment_"+i).textContent = arrTables[i]["T_Comm"];
	}
}

function GetTitle(intTableID) {
	if (intTableID > -1) {
		strTemp = arrTables[intTableID]["T_Name"];
	}
	else {
		strTemp = "TRANSCRIPTION";
	}
	return strTemp;
}

function GetStyle(intTableID) {
	if (intTableID > -1) {
		strTemp = "tc_"+intTableID;
	}
	else {
		strTemp = "trans_cont";
	}
	strTemp = document.getElementById(strTemp).currentStyle ? document.getElementById(strTemp).currentStyle.display : getComputedStyle(document.getElementById(strTemp), null).display;
	return strTemp;
}

function GetHeader(intTableID) {
	if (intTableID > -1) {
		strTemp = "h_"+intTableID;
	}
	else {
		strTemp = "h_T";
	}
	return strTemp;
}

function GetTT(intTableID) {
	if (intTableID > -1) {
		strTooltip = "this table";
	}
	else {
		strTooltip = "transcription field";
	}
	strSH = GetStyle(intTableID);
	if (strSH == "block") {
		strTooltip = "click here to collapse " + strTooltip;
	}
	else if (strSH == "none") {
		strTooltip = "click here to show " + strTooltip;
	}
	return strTooltip;
}

function ShowHideTable(intTableID) {
	strTable = GetHeader(intTableID);
	strSH = GetStyle(intTableID);
	if (strSH == "block") {
		if (intTableID > -1) {
			document.getElementById("tc_"+intTableID).style.display = "none";
		}
		else {
			document.getElementById("trans_fsize").style.display = "none";
			document.getElementById("trans_cont").style.display = "none";
		}
		document.getElementById(strTable).textContent = GetTitle(intTableID) + " +";
		document.getElementById(strTable).style.color = "rgba(174,174,174,0.75)";
	}
	else if (strSH == "none") {
		if (intTableID > -1) {
			document.getElementById("tc_"+intTableID).style.display = "block";
		}
		else {
			document.getElementById("trans_fsize").style.display = "block";
			document.getElementById("trans_cont").style.display = "block";
		}
		document.getElementById(strTable).textContent = GetTitle(intTableID) + " −";
		document.getElementById(strTable).style.color = "rgba(227,101,40,1)";
	}
	ShowTooltip(GetTT(intTableID));
}
/*
function TableTTOver(intTableID) {
	strTable = GetHeader(intTableID);
	document.getElementById(strTable).style.color = "rgba(254,206,49,1)";
	ShowTooltip(GetTT(intTableID));
}

function TableTTOut(intTableID) {
	strTable = GetHeader(intTableID);
	strSH = GetStyle(intTableID);
	if (strSH == "block") {
		document.getElementById(strTable).style.color = "rgba(227,101,40,1)";
	}
	else if (strSH == "none") {
		document.getElementById(strTable).style.color = "rgba(174,174,174,0.75)";
	}
	HideTooltip();
}
*/
function SentenceCase(strChange) {
	strChange = strChange.toLowerCase();
	var strUC = "";
	for (z=0;z<strChange.length;z++) {
		strUC = strChange.substr(z,1).toUpperCase();
		if (IsALetter(strUC)) {
			strChange = strChange.replace(strUC.toLowerCase(),strUC);
			z = strChange.length;
		}
	}
	return(strChange);
}

function IsALetter(strChar) {
    if (strChar.toUpperCase() != strChar.toLowerCase()) {
       return true;
	}
    else {
       return false;
	}
}

function IsOdd(intNumber) {
	return intNumber % 2;
}

function BLongOver(intButton) {
	document.getElementById(arrHeader[intButton]["HName"]).style.color = "rgba(50,50,50,1)";
	document.getElementById(arrHeader[intButton]["HName"]).style.background = "url(images/blank_over.png)";
	if (intButton == 0) {
		strTooltip = arrHeader[intButton]["BTitle"];
	}
	else {
		strTooltip = arrHeader[intButton]["BTitleAlt"];
	}
	ShowTooltip(strTooltip);
}

function BLongOut(intButton) {
	for (i=0;i<arrHeader.length;i++) {
		if (arrHeader[i]["HState"] == 0) {
			document.getElementById(arrHeader[i]["HName"]).style.color = "rgba(255,255,255,0.75)";
			document.getElementById(arrHeader[i]["HName"]).style.background = "url(images/blank_out.png)";
		}
		else if (arrHeader[i]["HState"] == 1) {
			document.getElementById(arrHeader[i]["HName"]).style.color = "rgba(50,50,50,1)";
			document.getElementById(arrHeader[i]["HName"]).style.background = "url(images/blank_down.png)";
		}
	}
	if (intButton > -1) {
		HideTooltip();
	}
}

function BLongClick(intButton) {
	var intBTemp = 0;
	if (intButton == 0) {
		intBTemp = 1;
	}
	if (arrHeader[intButton]["HState"] == 0) {
		arrHeader[intButton]["HState"] = 1;
		arrHeader[intBTemp]["HState"] = 0;
	}
	else if (arrHeader[intButton]["HState"] == 1) {
		arrHeader[intButton]["HState"] = 0;
		arrHeader[intBTemp]["HState"] = 1;
	}
	strTitle = arrHeader[intButton]["BTitle"];
	BLongOut(-1);
}

function GetFontSize(intFS) {
	if (intFS > -1) {
		el = document.getElementById('trans_i');
		style = window.getComputedStyle(el, null).getPropertyValue('font-size');
		fontSize = Math.round(parseFloat(style));
		strTooltip = "<b>" + arrTrButtons[intFS]["TrBTitle"] + "</b><br/><i>default font size: 20px</i><br/>current font size: " + fontSize + "px";
		ShowTooltip(strTooltip);
	}
}

function AdjFontSize(intFS) {
	el = document.getElementById('trans_i');
	style = window.getComputedStyle(el, null).getPropertyValue('font-size');
	fontSize = parseFloat(style);
	if (intFS != 0) {
		if (isKonq) {
			fontSize = fontSize + intFS;
		}
		else {
			fontSize = (fontSize/14) + (intFS/14);
		}
	}
	else {
		if (isKonq) {
			fontSize = 20;
		}
		else {
			fontSize = 1.4285;
		}
	}
	if (fontSize < 0) {
		fontSize = 0;
	}
	if (isKonq) {
		el.style.fontSize = fontSize + 'px';
	}
	else {
		el.style.fontSize = fontSize + 'em';
	}
	for (m=0;m<5;m++) {
		arrTrButtons[m]["TrBState"] = 0;
	}
	style = window.getComputedStyle(el, null).getPropertyValue('font-size');
	fontSize = Math.round(parseFloat(style));
	if (fontSize == 20) {
		arrTrButtons[2]["TrBState"] = 1;
	}
	else if (fontSize > 20) {
		arrTrButtons[3]["TrBState"] = 1;
	}
	else if (fontSize < 20) {
		arrTrButtons[1]["TrBState"] = 1;
	}
	if (intFS == -10) {
		GetFontSize(0);
	}
	else if (intFS == -1) {
		GetFontSize(1);
	}
	else if (intFS == 0) {
		GetFontSize(2);
	}
	else if (intFS == 1) {
		GetFontSize(3);
	}
	else if (intFS == 10) {
		GetFontSize(4);
	}
	for (m=1;m<6;m++) {
		if (arrTrButtons[m-1]["TrBState"] == 0) {
			document.getElementById("btr"+m).style.color = "rgba(174,174,174,0.75)";
		}
		else if (arrTrButtons[m-1]["TrBState"] == 1) {
			document.getElementById("btr"+m).style.color = "rgba(227,101,40,1)";
		}
	}
	TextAreaResize();
}

function AnchorField() {
	document.getElementById("type_cont").style.zIndex = 110;
	if (document.getElementById("type_cont").style.position == "fixed") {
		document.getElementById("type_cont").style.position = "relative";
		strTooltip = arrTrButtons[6]["TrBTitle"];
		ShowTooltip(strTooltip);
		arrTrButtons[6]["TrBState"] = 1;
	}
	else {
		document.getElementById("type_cont").style.position = "fixed";
		strTooltip = arrTrButtons[6]["TrBTitleAlt"];
		ShowTooltip(strTooltip);
		arrTrButtons[6]["TrBState"] = 0;
	}
}

function ClearField() {
	document.getElementById('trans_i').value = "";
	document.getElementById('trans_i').focus();
	document.getElementById('trans_i').selectionStart = 0;
	document.getElementById('trans_i').selectionEnd = 0;
	TextAreaResize();
}

function ResizeField(intROpt) {
	if (intROpt == 1) {
		arrTrButtons[7]["TrBState"] = 1;
		arrTrButtons[8]["TrBState"] = 0;
		document.getElementById("btr8").style.color = "rgba(227,101,40,1)";
		document.getElementById("btr9").style.color = "rgba(174,174,174,0.75)";
	}
	else {
		arrTrButtons[7]["TrBState"] = 0;
		arrTrButtons[8]["TrBState"] = 1;
		document.getElementById("btr8").style.color = "rgba(174,174,174,0.75)";
		document.getElementById("btr9").style.color = "rgba(227,101,40,1)";
		intMDH = document.getElementById("trans_i").clientHeight;
		if (isIE || isEdge || isKonq) {
			strTooltip = arrTrButtons[8]["TrBTitleIE"];
		}
		else {
			strTooltip = arrTrButtons[8]["TrBTitle"];
		}
		if (!isIE && !isEdge && !isKonq) {
			strTooltip = strTooltip + "<p class='resize'>";
			if (isFirefox || isBaidu) {
				strTooltip = strTooltip + arrTrButtons[8]["TrBTitleAlt1a"];
			}
			else {
				strTooltip = strTooltip + arrTrButtons[8]["TrBTitleAlt1b"];
			}
			strTooltip = strTooltip + "</p>" + arrTrButtons[8]["TrBTitleAlt2"];
		}
		ShowTooltip(strTooltip);
	}
	TextAreaResize();
}

function BTrOver(intBTr) {
	document.getElementById("btr"+intBTr).style.color = "rgba(254,206,49,1)";
	intBTr--;
	if (intBTr < 5) {
		GetFontSize(intBTr);
	}
	else {
		if (intBTr == 6 && document.getElementById("type_cont").style.position == "fixed") {
			strTooltip = arrTrButtons[6]["TrBTitleAlt"];
		}
		else if (intBTr == 8) {
			if (isIE || isEdge || isKonq) {
				strTooltip = arrTrButtons[8]["TrBTitleIE"];
			}
			else {
				strTooltip = arrTrButtons[8]["TrBTitle"];
			}
			if (arrTrButtons[8]["TrBState"] == 1) {
				if (!isIE && !isEdge && !isKonq) {
					strTooltip = strTooltip + "<p class='resize'>";
					if (isFirefox) {
						strTooltip = strTooltip + arrTrButtons[8]["TrBTitleAlt1a"];
					}
					else {
						strTooltip = strTooltip + arrTrButtons[8]["TrBTitleAlt1b"];
					}
					strTooltip = strTooltip + "</p>" + arrTrButtons[8]["TrBTitleAlt2"];
				}
				intMDH = document.getElementById("trans_i").clientHeight;
			}
		}
		else {
			strTooltip = arrTrButtons[intBTr]["TrBTitle"];
		}
		ShowTooltip(strTooltip);
	}
}

function BTrOut(intBTr) {
	for (i=1;i<arrTrButtons.length+1;i++) {
		if (arrTrButtons[i-1]["TrBState"] == 0) {
			document.getElementById("btr"+i).style.color = "rgba(174,174,174,0.75)";
		}
		else {
			document.getElementById("btr"+i).style.color = "rgba(227,101,40,1)";
		}
	}
	HideTooltip();
}

function TextAreaResize() {
	document.getElementById("trans_i").style.overflow = 'hidden';
	document.getElementById("trans_i").style.resize = 'none';
	var strTrans = "";
	if (arrTrButtons[8]["TrBState"] == 1) {
		if (!isIE && !isEdge && !isKonq) {
			document.getElementById("trans_i").style.resize = 'vertical';
		}
		else {
			strTrans = document.getElementById("trans_i").value;
			document.getElementById("trans_i").value = "lj";
		}
	}
	if (arrTrButtons[7]["TrBState"] == 1 || ((isIE || isEdge || isKonq) && arrTrButtons[8]["TrBState"] == 1)) {
		el = document.getElementById('trans_i');
		style = window.getComputedStyle(el, null).getPropertyValue('font-size');
		fontSize = Math.round(parseFloat(style));
		style = window.getComputedStyle(el, null).getPropertyValue('line-height');
		var lineHeight = Math.round(parseFloat(style));
		document.getElementById("trans_i").style.minHeight = "0px";
		document.getElementById("trans_i").style.height = "0px";
		var intBM = lineHeight * 0.0864197530864198;
		var intTM = lineHeight * 0.1950617283950617;
		intCH = 0;
		intCH = Math.round(document.getElementById("trans_i").scrollHeight - intBM + intTM);
		if (isChrome || isOpera) {
			if (fontSize > 20) {
				intCH = intCH - 5;
			}
			else {
				intCH = intCH - 3;
			}
		}
		else if (isSafari) {
			if (fontSize > 19) {
				intCH = intCH - 5;
			}
			else {
				intCH = intCH - 3;
			}
		}
		if (fontSize < 20) {
			intCH = intCH - 1;
		}
		if (intCH < 17) {
			intCH = 17;
		}
		intMDH = intCH;
		document.getElementById("trans_i").style.height = intCH + 'px';
	}
	if ((isIE || isEdge || isKonq) && arrTrButtons[8]["TrBState"] == 1) {
		document.getElementById("trans_i").value = strTrans;
	}
	if (document.getElementById("trans_i").clientHeight < (document.getElementById("trans_i").scrollHeight-5) && arrTrButtons[8]["TrBState"] == 1) {
		document.getElementById("trans_i").style.overflowY = 'scroll';
	}
	else {
		document.getElementById("trans_i").style.overflowY = 'hidden';
	}
}

function ChangeHeight() {
	var intCH = document.getElementById("trans_i").clientHeight;
	var intSH = document.getElementById("trans_i").scrollHeight;
	document.getElementById("trans_i").style.Height = "17px";
	if (arrTrButtons[8]["TrBState"] == 1) {
		document.getElementById("trans_i").style.Height = intCH + "px";
		if (intCH < intSH) {
			document.getElementById("trans_i").style.overflowY = 'scroll';
		}
		else {
			document.getElementById("trans_i").style.overflow = 'hidden';
		}
		intMDH = intCH;
	}
	else {
		document.getElementById("trans_i").style.Height = intCH + "px";
	}
}
