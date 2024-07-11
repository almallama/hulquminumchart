var newHTML = "";
var audIPA;
var strTemp = "";
var intVol = 0.75;
var strHTMLT = "";
var bolPause = false;
var intMouseX = -1000;
var intMouseY = -1000;
var intGrabX = 0;
var intGrabY = 0;
var intOrigX = 0;
var intOrigY = 0;
var intElemX = 0;
var intElemY = 0;
var divBox = null;
document.onmousemove = UpdateXY; // UpdateXY(event) implied on NS, UpdateXY(null) implied on IE
UpdateXY();

newHTML = "<div class='preview' id='preview_div' onmousedown='GrabXY(this)'></div>";
newHTML = newHTML + "<div class='preview' id='symbol_div'></div>";
newHTML = newHTML + "<div class='preview' id='audio_div'></div>";
newHTML = newHTML + "<div class='tooltip' id='tooltip'></div>";
document.write(newHTML);
HideTooltip();

function HideTrail(strDiv) {
	if (strDiv == "preview_div") {
		document.getElementById(strDiv).style.display = "none";
		PlayClick("blank","PL");
		if (audIPA.readyState == 2 || audIPA.readyState == 4) {
			audIPA.pause();
		}
		HideTooltip();
	}
}

function ShowTrail(intSymbol) {
	HideTooltip();
	var x = intSymbol - 1;
	strSymbol = arrSymbols[x]["Symbol"];
	strHex = "&#x" + arrSymbols[x]["U_No"] + ";";
	strHex = strHex.replace(" + ",";&#x");
	strHex = strHex.replace(" + ",";&#x");
	if (arrHeader[1]["HState"] == 1) {
		InsertSymbol(strSymbol);
	}
	else {
		newHTML = "<div class='main_container' onmousemove='SelSymbol()'><div class='s_cont_left'>";
		if (arrSymbols[x]["IPA_No"]=="529" || arrSymbols[x]["IPA_No"]=="530" || arrSymbols[x]["IPA_No"]=="531" || arrSymbols[x]["IPA_No"]=="532" || arrSymbols[x]["IPA_No"]=="533") {
			newHTML = newHTML + "<div class='s_cont_L'";
		}
		else if (arrSymbols[x]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[x]["U_Range"] == "Combining Diacritical Marks Supplement") {
			if (isIE || isEdge) {
				newHTML = newHTML + "<div class='s_cont_S_IE'";
			}
			else if ((isBaidu || isYa) && !isUCBr && !isOprN) {
				newHTML = newHTML + "<div class='s_cont_S_Tor'";
				if (arrSymbols[x]["IPA_No"]=="427") {
					newHTML = newHTML + " style='max-width:245px'";
				}
				else if (arrSymbols[x]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[x]["U_Range"] == "Combining Diacritical Marks Supplement") {
					newHTML = newHTML + " style='max-width:320px'";
				}
			}
			else {
				newHTML = newHTML + "<div class='s_cont_S'";
			}
		}
		else {
			if (isIE || isEdge) {
				newHTML = newHTML + "<div class='s_cont_S_IE'";
			}
			else {
				newHTML = newHTML + "<div class='s_cont_S'";
			}
		}
		newHTML = newHTML + " ondblclick='InsertSymbol(\"" + strSymbol + "\")'><div class='copy_symbol'";
		newHTML = newHTML + " onmouseover='ShowTooltip(\"double-" + arrHeader[1]["BTitle"] + arrHeader[1]["BTitleAlt2"] + "\")' onmouseout='HideTooltip()'>";
		newHTML = newHTML + strHex + "</div></div></div>";
		newHTML = newHTML + "<div class='s_cont_right'>";
		newHTML = newHTML + "<div class='s_scont' id='table_container'>";
		newHTML = newHTML + "<table class='s_descr'>";
		newHTML = newHTML + "<tr><td class='s_descr_H' id='col_left'>Phonetic Description:</td><td class='s_descr' id='col_right'>" + arrSymbols[x]["Descr"] + "</td></tr>";
		newHTML = newHTML + "<tr><td colspan='2' class='symbol_blank'>&nbsp;</td></tr>";
		newHTML = newHTML + "<tr><td class='s_descr_H'>IPA Symbol:</td><td class='s_descr'>" + arrSymbols[x]["U_Name"] + "</td></tr>";
		newHTML = newHTML + "<tr><td class='s_descr_H'>Hul'q'umi'num' Name:</td><td class='s_descr'>" + arrSymbols[x]["U_Range"] + "</td></tr>";
		//newHTML = newHTML + "<tr><td class='s_descr_H'>Hex value:</td><td class='s_descr'>" + arrSymbols[x]["U_No"] + "</td></tr>";
		newHTML = newHTML + "<tr><td colspan='2' class='symbol_blank'>&nbsp;</td></tr>";
		newHTML = newHTML + "<tr><td colspan='2' class='symbol_blank'>&nbsp;</td></tr>";
		newHTML = newHTML + "</table>";
		
		newHTML = newHTML + "<table class='s_descr' id='rec_list'></table>";
		newHTML = newHTML + "</div>";
		
		newHTML = newHTML + "</div>";
		newHTML = newHTML + "</div>";
		if (isSafari) {
			newHTML = newHTML + "<div class='close_cont_IE' id='list_nav'></div>";
		}
		else {
			newHTML = newHTML + "<div class='close_cont' id='list_nav'></div>";
		}
		newHTML = newHTML + "</div>";
		document.getElementById("preview_div").innerHTML = newHTML;
		document.getElementById("preview_div").style.display = "block";
		
		var intWidthL = document.getElementById("col_left").clientWidth;
		intWidthL = intWidthL - 7;
		
		newHTML = "<tr><td class='s_descr_H' id='audio_all' style='width:"+intWidthL+"px'>Pronunciation:</td>";
		for (g=0;g<9;g++) {
			newHTML = newHTML + "<td class='audio_blank'>&nbsp;</td>";
		}
		newHTML = newHTML + "</tr>";
		for (g=0;g<arrAuthors.length;g++) {
			newHTML = newHTML + "<tr id='audio_" + arrAuthors[g]['AI'] + "'><td class='symbol_descr_audio' style='width:"+intWidthL+"px; min-width:"+intWidthL+"px; max-width:"+intWidthL+"px;'>" + arrAuthors[g]['AName'] + "</td>";
			var intAudio = 0;
			for (u=1;u<4;u++) {
				if (intAudio == 0) {
					newHTML = newHTML + "<td class='symbol_ex' id='audio_"+u+"_"+arrAuthors[g]['AI']+"_1'>&nbsp;</td>";
					if (arrSymbols[x]["Ex"] != undefined) {
						if (arrSymbols[x]["Ex"].length > 4) {
							newHTML = newHTML + "<td class='symbol_ex_long' id='audio_"+u+"_"+arrAuthors[g]['AI']+"_2' colspan='8'>&nbsp;</td>";
							intAudio = 1;
						}
						else {
							newHTML = newHTML + "<td class='symbol_ex_2' id='audio_"+u+"_"+arrAuthors[g]['AI']+"_2' colspan='2'>&nbsp;</td>";
						}
					}
					else {
						newHTML = newHTML + "<td class='symbol_ex_2' id='audio_"+u+"_"+arrAuthors[g]['AI']+"_2' colspan='2'>&nbsp;</td>";
					}
				}
			}
			newHTML = newHTML + "</tr>";
		}
		
		var strUni = arrSymbols[x]['U_No'];
		newHTML = newHTML + "<tr id='audio_player'><td class='s_descr_H' style='width:"+intWidthL+"px'>&nbsp;</td>";
		for (i=1;i<arrButtons.length;i++) {
			if (i > 3 && i < 7) {
				strTemp = arrButtons[i]["BTitle"] + "<br/>current volume: 100%";
			}
			else {
				strTemp = arrButtons[i]["BTitle"];
			}
			arrButtons[i]["BState"] = 0;
			newHTML = newHTML + "<td class='symbol_ex'><button class='"+arrButtons[i]["BName"]+"' id='"+arrButtons[i]["BName"]+"' onmouseover='ButtonOver(" + i + ",\"";
			newHTML = newHTML + arrButtons[i]["BName"] + "\",\"" + "\")' onmouseout='ButtonOut(" + i + ",\"" + arrButtons[i]["BName"] + "\")' onClick='ButtonClick(" + i + ")'>";
			newHTML = newHTML + "&nbsp;</button> ";
			newHTML = newHTML + "</td>";
		}
		newHTML = newHTML + "<td class='symbol_ex_3' colspan='3'>&nbsp;</td>";
		newHTML = newHTML + "</tr>";
		newHTML = newHTML + "<tr id='audio_player_blank'><td colspan='10' class='symbol_blank'>&nbsp;</td></tr>";
		document.getElementById("rec_list").innerHTML = newHTML;
		document.getElementById("audio_player_blank").style.height = document.getElementById("audio_player").clientHeight + "px";
		
		for (g=0;g<arrAuthors.length;g++) {
			intAudio = 0;
			arrAuthors[g]['ACounter'] = 0;
			for (f=0;f<arrAudio.length;f++) {
				if (arrSymbols[x]["Audio"][g][f] == 1 && f == 0) {
					if (arrSymbols[x]["Ex"] != undefined) {
						document.getElementById("audio_1_"+arrAuthors[g]['AI']+"_1").innerHTML = GetAudio(arrSymbols[x]["U_No"],0,g);
						document.getElementById("audio_1_"+arrAuthors[g]['AI']+"_2").innerHTML = arrSymbols[x]["Ex"];
					}
					else {
						document.getElementById("audio_1_"+arrAuthors[g]['AI']+"_1").innerHTML = GetAudio(arrSymbols[x]["U_No"],0,g);
						newHTML = newHTML + "<td class='symbol_ex' id='audio_1_"+arrAuthors[g]['AI']+"_1'>";
					}
					intAudio = 1;
					arrAuthors[g]['ACounter'] = 1;
				}
				else if (f > 0 && intAudio == 0) {
					if (arrSymbols[x]["Audio"][g][f] == 1) {
						if (arrSymbols[x]["Ex_"+f] != undefined) {
							document.getElementById("audio_"+f+"_"+arrAuthors[g]['AI']+"_1").innerHTML = GetAudio(arrSymbols[x]["U_No"],f,g);
							document.getElementById("audio_"+f+"_"+arrAuthors[g]['AI']+"_2").innerHTML = arrSymbols[x]["Ex_"+f];
						}
						else {
							document.getElementById("audio_"+f+"_"+arrAuthors[g]['AI']+"_1").innerHTML = GetAudio(arrSymbols[x]["U_No"],f,g);
						}
						arrAuthors[g]['ACounter'] = 1;
					}
				}
			}
		}
		
		//newHTML = NavButtons(x);
		newHTML = newHTML + "<button class='ex_button_x' id='ex_button_x' onClick='HideTrail(\"preview_div\")'";
		newHTML = newHTML + " onmouseover='ShowTooltip(\"close\")' onmouseout='HideTooltip()'>&#x2715;</button>";
		document.getElementById("list_nav").innerHTML = newHTML;

		intAudio = 0;
		for (g=0;g<arrAuthors.length;g++) {
			if (arrAuthors[g]['ACounter'] == 0) {
				document.getElementById("audio_" + arrAuthors[g]['AI']).hidden = true;
			}
			else {
				intAudio++;
			}
		}
		if (intAudio == 0) {
			document.getElementById("audio_all").hidden = true;
		}
		document.getElementById("audio_player").hidden = true;
		document.getElementById("audio_player_blank").hidden = false;
		var intWW = window.innerWidth;
		var intTW = document.getElementById("preview_div").clientWidth;
		var intLeft = (intWW - intTW) / 2;
		if (intElemX != 0 || intElemY != 0) {
			document.getElementById("preview_div").style.left = intElemX + "px";
			document.getElementById("preview_div").style.top = intElemY + "px";
		}
		else {
			document.getElementById("preview_div").style.left = (intLeft - 13) + "px";
			document.getElementById("preview_div").style.top = "60px";
		}
		document.getElementById("audio_div").innerHTML = "<div class='s_descr_H' id='audio_rec'></div>";
		HideTrail("audio_div");
		document.getElementById("symbol_div").innerHTML = "<div class='s_descr_H'><input type='text' class='sel_symbol' id='sel_symbol' value='" + strSymbol + "'></div>";
		document.getElementById("symbol_div").style.display = "block";
		HideTrail("symbol_div");
	}
}

function GetAudio(strUni,intEx,intA) {
	var strID = "play_1_" + arrAuthors[g]['AI'];
	if (intEx != 0) {
		strID += "_" + intEx;
		strUni +=  "_" + intEx;
	}
	strUni = strUni.replace(" + ", "_");
	var strButton = "<button class='play_1' id='" + strID + "' ";
	strButton += "onmouseover='ButtonOver(0,\"" + strID + "\",\"" + arrAuthors[g]['AName'] + "\")' ";
	strButton += "onmouseout='ButtonOut(0,\"" + strID + "\")' ";
	strButton += "onClick='PlayClick(\"" + strUni + "\",\"" + strID + "\")' ";
	strButton += ">&nbsp;</button>";
	return(strButton);
}

function PlayClick(strFileName,strAudio) {
	var strPath = "";
	if (strAudio.indexOf("JE") > -1) {
		strPath = "sounds/JE/" + strFileName + ".mp3";
	}
	else if (strAudio.indexOf("JH") > -1) {
		strPath = "sounds/JH/" + strFileName + ".mp3";
	}
	else if (strAudio.indexOf("PL") > -1) {
		strPath = "sounds/PL/" + strFileName + ".mp3";
	}
	else if (strAudio.indexOf("JW") > -1) {
		strPath = "sounds/JW/" + strFileName + ".mp3";
	}
	else {
		strPath = "";
	}
	if (strPath != "" && !isSafariOld) {
		strAudio = "<audio src='" + strPath + "' id='" + strFileName + "'";
		strAudio = strAudio + " onplaying='AudioPlaying()' onended='AudioEnd()' onpause='AudioPause()'";
		strAudio = strAudio + "></audio>";
		document.getElementById("audio_rec").innerHTML = strAudio;
		audIPA = document.getElementById(strFileName);
		arrButtons[1]["BState"] = 1;
		arrButtons[2]["BState"] = 0;
		arrButtons[3]["BState"] = 0;
		audIPA.loop = false;
		if (isIE || isEdge) {
			audIPA.play();
		}
		else {
			audIPA.onloadeddata = audIPA.play();
		}
		document.getElementById("audio_player").hidden = false;
		document.getElementById("audio_player_blank").hidden = true;
	}
	else {
		console.log("Your browser does not support the <audio> element.");
		document.getElementById("audio_rec").innerHTML = "&nbsp;";
		audIPA = null;
		document.getElementById("audio_player").hidden = true;
		document.getElementById("audio_player_blank").hidden = false;
	}
}

function ButtonOver(intB_ID,strB_Name,strAuthor) {
	if (isSafariOld) {
		strTooltip = "Your browser does not support the HTML5 <i>audio</i> element.";
	}
	else if (intB_ID > 0) {
		document.getElementById(arrButtons[intB_ID]["BName"]).style.background = "url(images/" + arrButtons[intB_ID]['BName'] + "_over.png)";
		if (intB_ID > 3) {
			strTooltip = arrButtons[intB_ID]["BTitle"] + "<br/>current volume: " + Math.round(audIPA.volume*100) + "%";
		}
		else {
			if (arrButtons[intB_ID]["BState"] == 1) {
				strTooltip = arrButtons[intB_ID]["BTitleAlt"];
			}
			else if (arrButtons[intB_ID]["BState"] == 0) {
				strTooltip = arrButtons[intB_ID]["BTitle"];
			}
		}
		if (audIPA.muted) {
			strTooltip = strTooltip + ", muted";
		}
	}
	else {
		strTooltip = "play recording by " + strAuthor;
	}
	ShowTooltip(strTooltip);
}

function ButtonOut(intB_ID,strB_Name) {
	if (intB_ID > 0) {
		BHighlight(intB_ID);
	}
	HideTooltip();
}

function ButtonClick(intB_ID) {
	if (arrButtons[intB_ID]["BName"] == "play_2") {
		if (audIPA.readyState == 2 || audIPA.readyState == 4) {
			arrButtons[intB_ID]["BState"] = 1;
			arrButtons[intB_ID+1]["BState"] = 0;
			audIPA.play();
		}
	}
	else if (arrButtons[intB_ID]["BName"] == "pause") {
		if (arrButtons[intB_ID]["BState"] == 1) {
			arrButtons[intB_ID]["BState"] = 0;
			if (audIPA.loop) {
				arrButtons[intB_ID-1]["BState"] = 1;
				bolPause = false;
				audIPA.play();
			}
		}
		else {
			arrButtons[intB_ID]["BState"] = 1;
			arrButtons[intB_ID-1]["BState"] = 0;
			bolPause = true;
			audIPA.pause();
		}
	}
	else if (arrButtons[intB_ID]["BName"] == "loop") {
		if (arrButtons[intB_ID]["BState"] == 1) {
			arrButtons[intB_ID]["BState"] = 0;
			audIPA.loop = false;
		}
		else {
			arrButtons[intB_ID]["BState"] = 1;
			audIPA.loop = true;
		}
	}
	else if (arrButtons[intB_ID]["BName"] == "volup") {
		if (audIPA.volume <= 0.95) {
			audIPA.volume = audIPA.volume + 0.05;
			intVol += 0.05;
		}
		else {
			audIPA.volume = 1;
			intVol = 1;
		}
	}
	else if (arrButtons[intB_ID]["BName"] == "voldown") {
		if (audIPA.volume >= 0.05) {
			audIPA.volume = audIPA.volume - 0.05;
			intVol -= 0.05;
		}
		else {
			audIPA.volume = 0;
			intVol = 0;
		}
	}
	else if (arrButtons[intB_ID]["BName"] == "mute") {
		if (arrButtons[intB_ID]["BState"] == 1) {
			arrButtons[intB_ID]["BState"] = 0;
			audIPA.muted = false;
		}
		else {
			arrButtons[intB_ID]["BState"] = 1;
			audIPA.muted = true;
		}
	}
	BHighlight(intB_ID);
}

function BHighlight(intB_ID) {
	audIPA.volume = intVol;
	if (audIPA.muted) {
		arrButtons[4]["BState"] = 0;
		arrButtons[5]["BState"] = 0;
		arrButtons[6]["BState"] = 1;
	}
	else if (audIPA.volume == 0) {
		arrButtons[4]["BState"] = 0;
		arrButtons[5]["BState"] = 1;
		arrButtons[6]["BState"] = 0;
	}
	else if (audIPA.volume == 1) {
		arrButtons[4]["BState"] = 1;
		arrButtons[5]["BState"] = 0;
		arrButtons[6]["BState"] = 0;
	}
	else {
		arrButtons[4]["BState"] = 0;
		arrButtons[5]["BState"] = 0;
		arrButtons[6]["BState"] = 0;
	}
	for (k=1;k<arrButtons.length;k++) {
		if (arrButtons[k]["BState"] == 0) {
			document.getElementById(arrButtons[k]["BName"]).style.background = "url(images/" + arrButtons[k]["BName"] + "_out.png)";
		}
		else if (arrButtons[k]["BState"] == 1) {
			document.getElementById(arrButtons[k]["BName"]).style.background = "url(images/" + arrButtons[k]["BName"] + "_down.png)";
		}
		if (k == intB_ID) {
			if (intB_ID <= 3) {
				if (arrButtons[k]["BState"] == 0) {
					strTooltip = arrButtons[intB_ID]["BTitle"];
				}
				else if (arrButtons[k]["BState"] == 1) {
					strTooltip = arrButtons[intB_ID]["BTitleAlt"];
				}
			}
			else if (intB_ID > 3) {
				strTooltip = arrButtons[intB_ID]["BTitle"] + "<br/>current volume: " + Math.round(audIPA.volume*100) + "%";
				if (audIPA.muted) {
					strTooltip = strTooltip + ", muted";
				}
			}
		}
		if (intB_ID != 0) {
			ShowTooltip(strTooltip);
		}
	}
}

function AudioPlaying() {
	arrButtons[1]["BState"] = 1;
	arrButtons[2]["BState"] = 0;
	bolPause = false;
	if (strTooltip.indexOf("play") > -1 && strTooltip.indexOf("rec") == -1) {
		BHighlight(1);
	}
	else {
		BHighlight(0);
	}
};

function AudioEnd() {
	arrButtons[1]["BState"] = 0;
	arrButtons[2]["BState"] = 0;
	bolPause = false;
	if (strTooltip.indexOf("play") > -1 && strTooltip.indexOf("rec") == -1) {
		BHighlight(1);
	}
	else {
		BHighlight(0);
	}
};

function AudioPause() {
	if (strTooltip.indexOf("pause") > -1 && bolPause) {
		BHighlight(2);
	}
	else {
		BHighlight(0);
	}
};

function NavButtons(intSID) {
	var intNavS = 0;
	var intNavT = 0;
	var strNav = "";
	for (j=0;j<arrNavButtons.length;j++) {
		strNav = strNav + "<button class='ex_button' id='ex_button_" + j + "' onClick='";
		if (j == 0) {
			intNavT = arrSymbols[intSID]['T_Type'] - 1;
			if (intNavT < 0) {
				intNavT = 6;
			}
			intNavS = PrevNextT(intNavT);
		}
		else if (j == 1) {
			intNavS = arrSymbols[intSID]['SID'] - 1;
			if (intNavS == 0) {
				intNavS = arrSymbols.length;
			}
			intNavT = arrSymbols[intNavS-1]['T_Type'];
		}
		else if (j == 2) {
			intNavS = arrSymbols[intSID]['SID'] + 1;
			if (intNavS > arrSymbols.length) {
				intNavS = 1;
			}
			intNavT = arrSymbols[intNavS-1]['T_Type'];
		}
		else if (j == 3) {
			intNavT = arrSymbols[intSID]['T_Type'] + 1;
			if (intNavT > 6) {
				intNavT = 0;
			}
			intNavS = PrevNextT(intNavT);
		}
		strNav = strNav + "ShowTrail(" + intNavS + ")' onmouseover='NavOver(" + j + ")' onmouseout='NavOut(" + j + ")'>" + arrNavButtons[j]['NavBLabel'] + "</button>";
		if (j == 0 || j == 3) {
			strHTMLT = "<table class='table_plain'>";
			strHTMLT = strHTMLT + "<tr>";
			strHTMLT = strHTMLT + "<td class='tooltipL'>" + arrNavButtons[j]['NavBTitle1'] + "</td>";
			strHTMLT = strHTMLT + "<td class='tooltipR' id='tooltipS2'>" + arrTables[intNavT]['T_Name'].toLowerCase() + "</td>";
			strHTMLT = strHTMLT + "</tr><tr>";
			strHTMLT = strHTMLT + "<td class='tooltipL'>" + arrNavButtons[j]['NavBTitle2'] + "</td>";
			//strHTMLT = strHTMLT + "<td class='tooltipR' id='tooltipS1'>" + SymbolType(intNavS-1) + "</td>";
			strHTMLT = strHTMLT + "</tr>";
			strHTMLT = strHTMLT + "</table>";
			arrNavButtons[j]["NavTooltip"] = strHTMLT;
		}
		else {
			strHTMLT = "<table class='table_plain'>";
			strHTMLT = strHTMLT + "<tr>";
			strHTMLT = strHTMLT + "<td class='tooltipL'>" + arrNavButtons[j]['NavBTitle1'] + "</td>";
			strHTMLT = strHTMLT + "<td class='tooltipR' id='tooltipS1'>" + SymbolType(intNavS-1) + "</td>";
			strHTMLT = strHTMLT + "</tr><tr>";
			strHTMLT = strHTMLT + "<td class='tooltipL'>" + arrNavButtons[j]['NavBTitle2'] + "</td>";
			strHTMLT = strHTMLT + "<td class='tooltipR' id='tooltipS2'>" + arrTables[intNavT]['T_Name'].toLowerCase() + "</td>";
			strHTMLT = strHTMLT + "</tr>";
			strHTMLT = strHTMLT + "</table>";
			arrNavButtons[j]["NavTooltip"] = strHTMLT;
		}
	}
	return(strNav);
};

function PrevNextT(intT) {
	for (d=0;d<arrSymbols.length;d++) {
		if (arrSymbols[d]['T_Type'] == intT) {
			return(arrSymbols[d]['SID']);
		}
	}
};

function SymbolType(intST) {
	strHTMLT = "";
	if (isIE || isEdge) {
		if (arrSymbols[intST]["U_Range"] == "Combining Diacritical Marks" || arrSymbols[intST]["U_Range"] == "Combining Diacritical Marks Supplement" || arrSymbols[intST]["IPA_No"] == "509") {
			strHTMLT = strHTMLT + "<div class='tooltip_S_IE'>";
		}
		else {
			strHTMLT = strHTMLT + "<div class='tooltip_L'>";
		}
	}
	//else {
		if (arrSymbols[intST]["IPA_No"] == "529" || arrSymbols[intST]["IPA_No"] == "530" || arrSymbols[intST]["IPA_No"] == "531" || arrSymbols[intST]["IPA_No"] == "532" || arrSymbols[intST]["IPA_No"] == "533") {
			strHTMLT = strHTMLT + "<div class='tooltip_L'>";
		}
		else {
			strHTMLT = strHTMLT + "<div class='tooltip_S'>";
		}
	//}
	strHex = "&#x" + arrSymbols[intST]["U_No"] + ";";
	strHex = strHex.replace(" + ",";&#x");
	strHex = strHex.replace(" + ",";&#x");
	strHTMLT = strHTMLT + strHex + "</div>";
	return(strHTMLT);
}

function NavOver(intNav) {
	strTooltip = arrNavButtons[intNav]["NavTooltip"];
	ShowTooltip(strTooltip);
}

function NavOut(intNav) {
	HideTooltip();
	strTooltip = "";
}

function ShowTooltip(strT) {
	document.getElementById("tooltip").innerHTML = strT;
	document.getElementById("tooltip").style.display = "block";
	if (strT.indexOf("tooltipS") > -1) {
		var intH = document.getElementById("tooltipS1").clientHeight;
		if (strT.indexOf("tooltip_L") > -1) {
			if (!isOpera && !isSafari && !isChrome && !isBaidu) {
				intH = intH + 2;
			}
			else {
				intH = intH + 1;
			}
			if (isIE || isEdge) {
				intH = intH + 3;
			}
			document.getElementById("tooltipS1").style.height = intH + "px";
		}
		document.getElementById("tooltipS2").style.height = intH + "px";
	}
	else {
		strHTMLT = "<table class='table_plain'>";
		strHTMLT = strHTMLT + "<tr>";
		strHTMLT = strHTMLT + "<td class='tooltipM'>" + strT + "</td>";
		strHTMLT = strHTMLT + "</tr>";
		strHTMLT = strHTMLT + "</table>";
		document.getElementById("tooltip").innerHTML = strHTMLT;
	}
	if (strHTMLT.indexOf("manually") > -1 || strHTMLT.indexOf("scroll bar") > -1 || strHTMLT.indexOf("display") > -1 || strHTMLT.indexOf("resources") > -1) {
		document.getElementById("tooltip").style.maxWidth = "345px";
		document.getElementById("tooltip").style.whiteSpace = "normal";
	}
	else {
		document.getElementById("tooltip").style.maxWidth = "500px";
		document.getElementById("tooltip").style.whiteSpace = "nowrap";
	}
	if (intMouseX + document.getElementById("tooltip").offsetWidth > window.innerWidth) {
		document.getElementById("tooltip").style.left = (window.innerWidth - document.getElementById("tooltip").offsetWidth - 25) + "px";
	}
	else {
		document.getElementById("tooltip").style.left = intMouseX + "px";
	}
	if (intMouseY + document.getElementById("tooltip").offsetHeight + 30 > window.innerHeight) {
		document.getElementById("tooltip").style.top = (intMouseY - document.getElementById("tooltip").offsetHeight - 10) + "px";
	}
	else {
		document.getElementById("tooltip").style.top = intMouseY + 25 + "px";
	}
}

function HideTooltip() {
	document.getElementById("tooltip").innerHTML = "";
	document.getElementById("tooltip").style.display = "none";
	document.getElementById("tooltip").style.left = "-3000px";
	strTooltip = "";
}

function GetCaretPosition() {
	var intCaret = 0;
	if (document.selection) {
		trans_i.focus();
		var oSel = document.selection.createRange();
		oSel.moveStart('character', -trans_i.value.length);
		intCaret = oSel.text.length;
	}
	else if (trans_i.selectionStart || trans_i.selectionStart == '0') {
		intCaret = trans_i.selectionStart;
	}
	return intCaret;
}

function InsertSymbol(strISymbol) {
	var strTrans = document.getElementById("trans_i").value;
	var intTrans = GetCaretPosition();
	document.getElementById("trans_i").value = strTrans.substring(0,intTrans) + strISymbol;
	document.getElementById("trans_i").value = document.getElementById("trans_i").value + strTrans.substring(intTrans,strTrans.length);
	intTrans = intTrans + strISymbol.length;
	trans_i.selectionStart = intTrans;
	trans_i.selectionEnd = intTrans;
}

function SelSymbol() {
	document.getElementById("sel_symbol").focus();
	document.getElementById("sel_symbol").select();
}

//---------------- [start of] adapted from http://dunnbypaul.net/js_mouse/ ----------------//

function GetMouseXY(e) { // works on IE6,FF,Moz,Opera7
	if (!e) {
		e = window.event; // works on IE, but not NS (we rely on NS passing us the event)
	}
	if (e) { 
		intMouseX = e.clientX;
		intMouseY = e.clientY;
	}
}

function UpdateXY(e) {
	GetMouseXY(e); // NS is passing (event), while IE is passing (null)
}

function GrabXY(divWhat) {
	UpdateXY();
	document.onmousemove = UpdateXY;
	document.onmousedown = false; // in NS this prevents cascading of events, thus disabling text selection
	divBox = divWhat;
	document.onmousemove = DragBox;
	document.onmouseup = DropBox;
	intGrabX = intMouseX;
	intGrabY = intMouseY;
	intElemX = intOrigX = divBox.offsetLeft;
	intElemY = intOrigY = divBox.offsetTop;
}

function DragBox(e) { // parameter passing is important for NS family 
	if (divBox) {
		intElemX = intOrigX + (intMouseX - intGrabX);
		intElemY = intOrigY + (intMouseY - intGrabY);
		divBox.style.left = intElemX + 'px';
		divBox.style.top  = intElemY + 'px';
	}
	UpdateXY(e);
	HideTooltip();
	return false; // in IE this prevents cascading of events, thus text selection is disabled
}

function DropBox() {
	if (divBox) {
		divBox = null;
	}
	UpdateXY();
	document.onmousemove = UpdateXY;
	document.onmouseup = null;
	document.onmousedown = null; // re-enables text selection on NS
}

//---------------- [end of] adapted from http://dunnbypaul.net/js_mouse/ ----------------//
