/**
 * by fantaros
 */

(function (window, $loan, undefined){
	var gz = 7540;//8682+3074-4216
	
	function copyArray(array){
		var narray = [], i;
		if(array != null && array.length > 0) {
			for(i=0;i<array.length;++i) {
				narray.push(array[i]);
			}
		}
		return narray;
	}
	
	function copy(obj){
		var jsonStr = JSON.stringify(obj), nobj = JSON.parse(jsonStr);
		return nobj;
	}
	
	$loan.addTimePayment = function (info, result){
		if(result != null && result.length > 0) {
			var mlv = info.lv / 1200.0,
			i, array, date, year, month, nresult, 
			infoy = info.tqhksj.substr(0,4), 
			infom = info.tqhksj.substr(4,2),
			fxl = (+info.fx)/100.0, 
			bjjs = (+info.tqhked) * (1-fxl), 
			recalc = false,
			firstre = false,
			sydk, dic, dkqs = +info.dkqs,
			oldpm = ((+info.dked) * mlv * Math.pow(mlv + 1, +(info.dkqs)))/(Math.pow(mlv + 1, +(info.dkqs)) - 1);
			nresult = [];
			for(i=0;i<result.length;++i) {
				array = result[i];
			
					if(array != null && array.length > 0) {
						nresult.push(copy(array));
						date = array[1];
						year = date.substr(0,4);
						month = date.substr(4,2);
						if(year == infoy && month == infom) {
							//重新计算剩余期数
							sydk = +array[2];
							sydk = sydk - bjjs;
							for(j=i+1;j<result.length;++j) {
								dic = [];
								dic.push(""+(j));
								dic.push((""+year) + (month<10?"0"+(+month):""+month));
								month = (+month) + 1;
								if(month > 12) {
									year = (+year) + 1;
									month = 1;
								}
								dqlx = sydk * mlv;
								dqbj = oldpm - dqlx;
								sydk = sydk - dqbj;
								dic.push(""+sydk);
								dic.push(""+oldpm);
								dic.push(""+dqbj);
								dic.push(""+dqlx);
								dic.push(""+(gz - oldpm));
								nresult.push(dic);
							}
							return nresult;
						}
					}
			}
			
			return result;
		}
	};
	
	$loan.addMoneyPayment = function (info, result){
		if(result != null && result.length > 0) {
			var mlv = info.lv / 1200.0,
			i, array, date, year, month, 
			infoy = info.tqhksj.substr(0,4), 
			infom = info.tqhksj.substr(4,2),
			fxl = (+info.fx)/100.0, 
			bjjs = (+info.tqhked) * (1-fxl), 
			recalc = false, 
			firstre = false,
			sydk, dic, permonth;

			for(i=0;i<result.length;++i) {
				array = result[i];
				if(recalc) {
					if (firstre) {
						lastarray = result[i-1];
						sydk = +lastarray[2];
						sydk = sydk - bjjs;
						permonth = (sydk * mlv * Math.pow(mlv + 1, +(info.dkqs - i)))/(Math.pow(mlv + 1, +(info.dkqs - i)) - 1);
						if(sydk > 0) {
							dqlx = sydk * mlv;
							dqbj = permonth - dqlx;
							sydk = sydk - dqbj;
							array[2] = (""+sydk);
							array[3] = (""+permonth);
							array[4] = (""+dqbj);
							array[5] = (""+dqlx);
							array[6] = (""+(gz - permonth));
							result[i] = array;
						} else {
							break;
						}
						firstre = false;
					} else {
						dqlx = sydk * mlv;
						dqbj = permonth - dqlx;
						sydk = sydk - dqbj;
						array[2] = (""+sydk);
						array[3] = (""+permonth);
						array[4] = (""+dqbj);
						array[5] = (""+dqlx);
						array[6] = (""+(gz - permonth));
						result[i] = array;
					}
				} else {
					if(array != null && array.length > 0) {
						date = array[1];
						year = date.substr(0,4);
						month = date.substr(4,2);
						if(year == infoy && month == infom) {
							recalc = true;
							firstre = true;
						}
					}
				}				
			}
			return result;
		}
	};
	$loan.addPayment = function (info, result, type){
		if(type == 1) {
			return $loan.addTimePayment(info, result);
		} else {
			return $loan.addMoneyPayment(info, result);
		}
	};
	
	$loan.calculateLoan = function (info){
		var mlv = info.lv / 1200.0, 
		permonth = ((+info.dked) * mlv * Math.pow(mlv + 1, +(info.dkqs)))/(Math.pow(mlv + 1, +(info.dkqs)) - 1),
		syear=info.schksj.substr(0,4),smonth=info.schksj.substr(4,2),year=+syear,month=+smonth,
		sydk = +info.dked, dqlx, dqbj,
		i,result=[],dic;
		
		for(i=0;i< +(info.dkqs);++i) {
			dic = [];
			dic.push(""+(i+1));
			dic.push((""+year) + (month<10?"0"+(+month):""+month));
			month = (+month) + 1;
			if(month > 12) {
				year = (+year) + 1;
				month = 1;
			}
			dqlx = sydk * mlv;
			dqbj = permonth - dqlx;
			sydk = sydk - dqbj;
			dic.push(""+sydk);
			dic.push(""+permonth);
			dic.push(""+dqbj);
			dic.push(""+dqlx);
			dic.push(""+(gz - permonth));
			result.push(dic);
		}
		return result;
	};
	window.$loan = $loan;
})(window, window.$loan || function $loan(){
	
});