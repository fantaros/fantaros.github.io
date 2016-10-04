(function (window, undefined){
	var $ = window.jQuery,
	currentResult;
	
	function add (){
		var info = {}, i, $tr, $td, $tbody = $("#maintable").find("tbody").eq(0),array,j;
		$(".form-control").each(function (){
			info[$(this).attr("id")] = $(this).val();
		});
		currentResult = $loan.addPayment(info, currentResult, $("#isjssj").attr("checked") == "checked" ? 1:0);
		if(currentResult != null && currentResult.length > 0) {
			$tbody.html("");
			for(i=0;i<currentResult.length;++i) {
				$tr = $("<tr>");
				array = currentResult[i];
				if(array != null && array.length > 0) {
					for(j=0;j<array.length;++j) {
						$td = $("<td>");
						$td.text(array[j]);
						$tr.append($td);
					}
				}
				$tbody.append($tr);
			}
		}
	}
	
	function calc (){
		var info = {}, i, $tr, $td, $tbody = $("#maintable").find("tbody").eq(0),array,j;
		$(".form-control").each(function (){
			info[$(this).attr("id")] = $(this).val();
		});
		currentResult = $loan.calculateLoan(info);
		if(currentResult != null && currentResult.length > 0) {
			$tbody.html("");
			for(i=0;i<currentResult.length;++i) {
				$tr = $("<tr>");
				array = currentResult[i];
				if(array != null && array.length > 0) {
					for(j=0;j<array.length;++j) {
						$td = $("<td>");
						$td.text(array[j]);
						$tr.append($td);
					}
				}
				$tbody.append($tr);
			}
		}
	}
	
	$(function (){
		$("#jsloanbtn").click(calc);
		$("#addloanbtn").click(add);
	});
})(window);