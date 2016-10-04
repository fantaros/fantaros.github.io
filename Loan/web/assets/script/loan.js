/**
 * by fantaros
 */

(function (window, $loan, undefined){
	var gz = 7540;//8682+3074-4216
	
	$loan.addTimePayment = function (info, result){
		
	};
	
	$loan.addMoneyPayment = function (info, result){
		
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
			sydk = sydk - dqbj
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