
    //提前还歀计算
    function play() {
        if (document.tqhdjsq.dkzws.value == '') {
            alert('请填入贷款总额');
            return;

        } else dkzys = parseFloat(document.tqhdjsq.dkzws.value) * 10000;
        if (document.tqhdjsq.tqhkfs[1].checked && document.tqhdjsq.tqhkws.value == '') {
            alert('请填入部分提前还款额度');
            return;
        }

        s_yhkqs = parseInt(document.tqhdjsq.yhkqs.value);
        //月利率
        if (document.getElementById("tqhklx").value == 1) {

            if (s_yhkqs > 60) {
                dklv = getlilv(document.tqhdjsq.lilv.value, 2, 10) / 12; //公积金贷款利率5年以上4.23%
            } else {
                dklv = getlilv(document.tqhdjsq.lilv.value, 2, 3) / 12;  //公积金贷款利率5年(含)以下3.78%
            }
        }
        if (document.getElementById("tqhklx").value) {
            if (s_yhkqs > 60) {
                dklv = getlilv(document.tqhdjsq.lilv.value, 1, 10) / 12; //商业性贷款利率5年以上5.31%
            } else {
                dklv = getlilv(document.tqhdjsq.lilv.value, 1, 3) / 12; //商业性贷款利率5年(含)以下4.95%
            }
        }
        //已还贷款期数
        yhdkqs = (parseInt(document.tqhdjsq.tqhksjn.value) * 12 + parseInt(document.tqhdjsq.tqhksjy.value)) - (parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value));

        if (yhdkqs < 0 || yhdkqs > s_yhkqs) {
            alert('预计提前还款时间与第一次还款时间有矛盾，请查实');
            return false;
        }

        yhk = dkzys * (dklv * Math.pow((1 + dklv), s_yhkqs)) / (Math.pow((1 + dklv), s_yhkqs) - 1);
        yhkjssj = Math.floor((parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value) + s_yhkqs - 2) / 12) + '年' + ((parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value) + s_yhkqs - 2) % 12 + 1) + '月';
        yhdkys = yhk * yhdkqs;

        yhlxs = 0;
        yhbjs = 0;
        for (i = 1; i <= yhdkqs; i++) {
            yhlxs = yhlxs + (dkzys - yhbjs) * dklv;
            yhbjs = yhbjs + yhk - (dkzys - yhbjs) * dklv;
        }

        remark = '';
        if (document.tqhdjsq.tqhkfs[1].checked) {
            tqhkys = parseInt(document.tqhdjsq.tqhkws.value) * 10000;
            if (tqhkys + yhk >= (dkzys - yhbjs) * (1 + dklv)) {
                remark = '您的提前还款额已足够还清所欠贷款！';
            } else {
                yhbjs = yhbjs + yhk;
                byhk = yhk + tqhkys;
                if (document.tqhdjsq.clfs[0].checked) {
                    yhbjs_temp = yhbjs + tqhkys;
                    for (xdkqs = 0; yhbjs_temp <= dkzys; xdkqs++) yhbjs_temp = yhbjs_temp + yhk - (dkzys - yhbjs_temp) * dklv;
                    xdkqs = xdkqs - 1;
                    xyhk = (dkzys - yhbjs - tqhkys) * (dklv * Math.pow((1 + dklv), xdkqs)) / (Math.pow((1 + dklv), xdkqs) - 1);
                    jslx = yhk * s_yhkqs - yhdkys - byhk - xyhk * xdkqs;
                    xdkjssj = Math.floor((parseInt(document.tqhdjsq.tqhksjn.value) * 12 + parseInt(document.tqhdjsq.tqhksjy.value) + xdkqs - 2) / 12) + '年' + ((parseInt(document.tqhdjsq.tqhksjn.value) * 12 + parseInt(document.tqhdjsq.tqhksjy.value) + xdkqs - 2) % 12 + 1) + '月';
                } else {
                    xyhk = (dkzys - yhbjs - tqhkys) * (dklv * Math.pow((1 + dklv), (s_yhkqs - yhdkqs))) / (Math.pow((1 + dklv), (s_yhkqs - yhdkqs)) - 1);
                    jslx = yhk * s_yhkqs - yhdkys - byhk - xyhk * (s_yhkqs - yhdkqs);
                    xdkjssj = yhkjssj;
                }
            }
        }

        if (document.tqhdjsq.tqhkfs[0].checked || remark != '') {
            byhk = (dkzys - yhbjs) * (1 + dklv);
            xyhk = 0;
            jslx = yhk * s_yhkqs - yhdkys - byhk;
            xdkjssj = document.tqhdjsq.tqhksjn.value + '年' + document.tqhdjsq.tqhksjy.value + '月';
        }

        document.tqhdjsq.ykhke.value = Math.round(yhk * 100) / 100;
        document.tqhdjsq.yhkze.value = Math.round(yhdkys * 100) / 100;
        document.tqhdjsq.yhlxe.value = Math.round(yhlxs * 100) / 100;
        document.tqhdjsq.gyyihke.value = Math.round(byhk * 100) / 100;
        document.tqhdjsq.xyqyhke.value = Math.round(xyhk * 100) / 100;
        document.tqhdjsq.jslxzc.value = Math.round(jslx * 100) / 100;
        document.tqhdjsq.yzhhkq.value = yhkjssj;
        document.tqhdjsq.xdzhhkq.value = xdkjssj;
        document.tqhdjsq.jsjgts.value = remark;

        //布码:代码执行时机改为点击“开始计算”成功返回计算结果后

        _ub.city = $("#cityName").val(); //所在城市（中文）
        _ub.biz = 'j'; //固定
        _ub.location = 0; //方位 ，网通为0，电信为1，如果无法获取方位，记录0

        _ub.collect(146, {
            'vwg.page': 'jrcalculatortqhk', 'vwj.loanamount': encodeURIComponent(document.tqhdjsq.dkzws.value + '万元'), 'vwj.loantime': encodeURIComponent(document.tqhdjsq.yhkqs.value + '期'), 'vwj.annualinterestrate': encodeURIComponent(dklv * 100 + '%'),
            'vwj.repaymenttime': encodeURIComponent(document.tqhdjsq.yhksjn.value + '年' + document.tqhdjsq.yhksjy.value + '月'), 'vwj.repaymenttimeadvance': encodeURIComponent(document.tqhdjsq.tqhksjn.value + '年' + document.tqhdjsq.tqhksjy.value + '月'),
            'vwj.repaymentmethod': encodeURIComponent(document.tqhdjsq.tqhkfs[0].checked ? ' 一次提前还清' : ' 部分提前还款' + document.tqhdjsq.tqhkws.value + '万元'), 'vwj.treatmentmethod': encodeURIComponent(document.tqhdjsq.clfs[0].checked ? '缩短还款期限,月还款额基本不变' : '减少月还款额,还款期限不变')
        });
    }


    function displaySubMenu(li) {
        var subMenu = li.getElementsByTagName("ul")[0];
        subMenu.style.display = "block";
    }
    function hideSubMenu(li) {
        var subMenu = li.getElementsByTagName("ul")[0];
        subMenu.style.display = "none";
    }
    function toggleCity() {
        $("#citydiv").toggle();
    }