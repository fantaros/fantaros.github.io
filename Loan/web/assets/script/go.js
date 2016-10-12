/**
 * 
 * $loan.calcloan({
			"201707" : { m:200000, f:0.03, t:1 }
			,"201807" : { m:50000, f:0.02, t:0 }
			,"201907" : { m:50000, f:0.01, t:0 }
			,"202007" : { m:50000, f:0, t:0 }
			,"202107" : { m:50000, f:0, t:0 }
			,"202207" : { m:50000, f:0, t:0 }
			,"202307" : { m:50000, f:0, t:0 }
			,"202407" : { m:50000, f:0, t:0 }
			,"202507" : { m:50000, f:0, t:0 }
			,"202607" : { m:50000, f:0, t:0 }
		} ,[
		       "201707"
		       ,"201807"
		       ,"201907"
		       ,"202007"
		       ,"202107"
		       ,"202207"
		       ,"202307"
		       ,"202407"
		       ,"202507"
		       ,"202607"
		       ]);
 * 
 */
(function (window, undefined) {
	var $ = window.jQuery;
	
	function monthpay(money, fee, times) {
		money = +money;
		fee = +fee;
		times = +times;
		return (money * fee * Math.pow(fee + 1, +(times)))/(Math.pow(fee + 1, +(times)) - 1);
	}
	
	function tocsv(obj, cols) {
		var txt = "", i=0;
		for(;i < cols.length; ++i) {
			if(i == 0) {
				txt = obj[cols[i]];
			} else {
				txt = txt + "," + obj[cols[i]];
			}
		}
		return txt;
	}
	
	function copyjson(obj){
		var jsonStr = JSON.stringify(obj), nobj = JSON.parse(jsonStr);
		return nobj;
	}
	
	function calc(inputpl, inputpla){
		var l = {m:1150000, q:300, f:0.0035525, p:"201607"},
		pl = {
			"201707" : { m:200000, f:0.03, t:0 }
			,"201807" : { m:50000, f:0.02, t:1 }
			,"201907" : { m:50000, f:0.01, t:1 }
			,"202007" : { m:50000, f:0, t:1 }
			,"202107" : { m:50000, f:0, t:1 }
			,"202207" : { m:50000, f:0, t:1 }
			,"202307" : { m:50000, f:0, t:1 }
			,"202407" : { m:50000, f:0, t:1 }
			,"202507" : { m:50000, f:0, t:1 }
			,"202607" : { m:50000, f:0, t:1 }
		},
		pla = [
		       "201707"
		       ,"201807"
		       ,"201907"
		       ,"202007"
		       ,"202107"
		       ,"202207"
		       ,"202307"
		       ,"202407"
		       ,"202507"
		       ,"202607"
		       ],
		keys = ["期数","还款日期","当月还款","计息剩余贷款","当月利息","当月还本","结余"],
		i = 0, result = [], rtext = "", syqs = l.q, zqs = l.q, 
		mp = monthpay(l.m, l.f, zqs),
		mdic, year = "2016", month = "07", date,
		gz = 7540, //8682+3074-4216
		sydk = l.m, jgqs = 0, dylx, dybj,
		tq, tqsssydk, tqsssyqs, tqssdylx, tqssdybj, tqssjgqs,
		pc, tqdate, dqdate, nresult, recalc = false, firstre = true,
		lastdic, summp, sumlx, txt, rtx;
		
		if(inputpl != null && inputpl.length > 0 && inputpla != null && inputpla.length > 0) {
			pl = inputpl;
			pla = inputpla;
		}
		
		while((+(""+sydk.toFixed(2))) > 0 && +syqs > 0) {
			mdic = {};
			date = "" + (year) + ((+month) < 10 ? ("0"+(+month)) : (""+month));
			mdic["期数"] = (i + 1);
			mdic["还款日期"] = date;
			month = (+month) + 1;
			if(month > 12) {
				month = "01";
				year = (+year) + 1;
			}
			mdic["当月还款"] = mp.toFixed(3);
			mdic["计息剩余贷款"] = sydk.toFixed(3);
			dylx = sydk * l.f;
			dybj = mp - dylx;
			sydk = sydk - dybj;
			mdic["当月利息"] = dylx.toFixed(3);
			mdic["当月还本"] = dybj.toFixed(3);
			mdic["结余"] = (gz - mp).toFixed(3);
			
			result.push(mdic);
			
			i = i + 1;
			syqs = syqs - 1;
			jgqs = jgqs + 1;
		}
		
		if(pla != null && pla.length > 0) {
			zqs = 300;
			for(pc = 0; pc < pla.length ; ++pc) {
				zqs = result.length;
				tqdate = pla[pc];
				tq = pl[tqdate];
				if(tq.m <= 0) {
					break;
				}
				nresult = [];
				for(i = 0; i < zqs; ++i) {
					if(recalc) {
						if (firstre) {
							lastdic = result[i-1];
							mdic = result[i];
							sydk = +lastdic["计息剩余贷款"];
							sydk = sydk - (tq.m * (1 - tq.f));
							mp = monthpay(sydk, l.f, syqs);
							if(sydk > 0) {
								dylx = sydk * l.f;
								dybj = mp - dylx;
								mdic["计息剩余贷款"] = ((+sydk).toFixed(3));
								sydk = sydk - dybj;
								
								mdic["当月还款"] = ((+mp).toFixed(3));
								mdic["当月还本"] = ((+dybj).toFixed(3));
								mdic["当月利息"] = ((+dylx).toFixed(3));
								mdic["结余"] = ((+(gz - mp)).toFixed(3));
								result[i] = mdic;
							} else {
								continue;
							}
							firstre = false;
						} else {
							mdic = result[i];
							dylx = sydk * l.f;
							dybj = mp - dylx;
							mdic["计息剩余贷款"] = ((+sydk).toFixed(3));
							sydk = sydk - dybj;
							
							mdic["当月还款"] = ((+mp).toFixed(3));
							mdic["当月还本"] = ((+dybj).toFixed(3));
							mdic["当月利息"] = ((+dylx).toFixed(3));
							mdic["结余"] = ((+(gz - mp)).toFixed(3));
							result[i] = mdic;
						}
					} else {
						mdic = result[i];
						
						dqdate = mdic["还款日期"];
						nresult.push(copyjson(mdic));
						if(dqdate == tqdate) {
							if(tq.t == 1) {
								//time
								lastdic = result[i-1];
								sydk = +lastdic["计息剩余贷款"];
								sydk = sydk - (tq.m * (1 - tq.f));
								year = lastdic["还款日期"].substr(0, 4);
								month = lastdic["还款日期"].substr(4, 2);
								for(j = i + 1;j < result.length; ++j) {
									if(sydk < 0) {
										break;
									}
									month = (+month) + 1;
									if(month > 12) {
										year = (+year) + 1;
										month = 1;
									}
									mdic = copyjson(result[j]);
									if(mdic == null) {
										mdic = {};
									}
									mdic["计息剩余贷款"] = ((+sydk).toFixed(3));
									dylx = sydk * l.f;
									dybj = mp - dylx;
									sydk = sydk - dybj;
									mdic["期数"] = (""+(j+1));
									mdic["还款日期"] = ((""+year) + (month<10?"0"+(+month):""+month));
									mdic["当月还款"] = ((+mp).toFixed(3));
									mdic["当月还本"] = ((+dybj).toFixed(3));
									mdic["当月利息"] = ((+dylx).toFixed(3));
									mdic["结余"] = ((+(gz - mp)).toFixed(3));
									nresult.push(mdic);
								}
								result = nresult;
								break;
							} else {
								//重新计算 mp
								recalc = true;
								firstre = true;
								syqs = result.length - i - 1;
							}
						}
					}
				}
				recalc = false;
				firstre = false;
			}
		}
		
		rtext = "";
		rtx = "";
		summp = 0;
		sumlx = 0;
		
		for(i = 0;i < keys.length; ++i) {
			if(i == 0) {
				rtx = keys[i];
			} else {
				rtx = rtx + "," + keys[i];
			}
		}
		rtx = rtx + "\r\n";
		for(i = 0; i < result.length; ++i) {
			
			rtx = rtx + tocsv(result[i], keys) + "\r\n";
			summp = summp + (+result[i]["当月还款"]);
			sumlx = sumlx + (+result[i]["当月利息"]);
		}
		
		rtext = rtext + "总期数:," + result.length + ",总还:," + summp.toFixed(3) + ",总利息:," + sumlx.toFixed(3) +"\r\n\r\n";
		
		rtext = rtext + "还款方法:\r\n";
		
		txt = "提前还款时间,提前还款金额,提前还款罚息,提前还款方式\r\n";
		for(i = 0;i < pla.length; ++i) {
			tq = pl[pla[i]];
			txt = txt + pla[i];
			txt = txt + "," + tq.m;
			txt = txt + "," + tq.f;
			if(tq.t == 1) {
				txt = txt + ",减少时间";
			} else {
				txt = txt + ",减少月供";
			}
			txt = txt + "\r\n";
		}
		
		rtext = rtext + txt + "\r\n";
		
		rtext = rtext + rtx;
		
		$("#resultregion")
			.width(document.body.scrollWidth - 8)
			.height(document.body.scrollHeight - 8)
			.text(rtext);
	}
	window.$loan = {};
	window.$loan.calcloan = calc;
	
	if($ != null) {
		$(calc);
	}
	
})(window);