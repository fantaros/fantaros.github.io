(function (window, undefined){
	var $ = window.jQuery,
	isjssj = true,
	currentResult;
	
	function add (){
		var info = {}, i, $tr, $td, $tbody = $("#maintable").find("tbody").eq(0),array,j;
		$(".form-control").each(function (){
			info[$(this).attr("id")] = $(this).val();
		});
		currentResult = $loan.addPayment(info, currentResult, isjssj ? 1:0);
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
		$("#isjssj").click(function (){
			isjssj = true;
			$(this).removeClass("btn-default").addClass("btn-primary");
			$("#isjsed").removeClass("btn-primary").addClass("btn-default");
		});
		$("#isjsed").click(function (){
			isjssj = false;
			$(this).removeClass("btn-default").addClass("btn-primary");
			$("#isjssj").removeClass("btn-primary").addClass("btn-default");
		});
	});
})(window);