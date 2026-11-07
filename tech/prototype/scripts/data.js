function prepareCanvas(canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (width === 0 || height === 0) {
        return null;
    }

    const pixelRatio = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * pixelRatio);
    const pixelHeight = Math.round(height * pixelRatio);

    if (canvas.width !== pixelWidth) {
        canvas.width = pixelWidth;
    }

    if (canvas.height !== pixelHeight) {
        canvas.height = pixelHeight;
    }

    const context = canvas.getContext('2d');
    context.setTransform(pixelWidth / width, 0, 0, pixelHeight / height, 0, 0);
    context.clearRect(0, 0, width, height);

    return { context, width, height };
}

function drawAll(data, canvas) {
    const ju = Math.max(0, parseInt(data.expenseInputs.ju.value) || 0);
    const shoku = Math.max(0, parseInt(data.expenseInputs.shoku.value) || 0);
    const kou = Math.max(0, parseInt(data.expenseInputs.kou.value) || 0);
    const tsu = Math.max(0, parseInt(data.expenseInputs.tsu.value) || 0);
    const go = Math.max(0, parseInt(data.expenseInputs.go.value) || 0);

    const currentTotalExpense = ju + shoku + kou + tsu + go;
    const currentIncome = data.income;
    const currentBalance = currentIncome - currentTotalExpense;

    data.expenseLabel.innerText = "¥" + currentTotalExpense.toLocaleString();
    data.balanceLabel.innerText = (currentBalance >= 0 ? "+" : "-") + "¥" + Math.abs(currentBalance).toLocaleString();
    data.balanceLabel.style.color = currentBalance >= 0 ? "#16a34a" : "#dc2626";

    const mExp = [...data.historicalExpenses, currentTotalExpense / 1000];

    const pie = prepareCanvas(canvas.pie);

    if (!pie) {
        return;
    }

    const ctxPie = pie.context;

    const centerPieX = pie.width / 2;
    const centerPieY = pie.height / 2;
    const radiusPie = Math.min(centerPieX, centerPieY) - 10;
    const totalForPie = currentTotalExpense || 1;

    const pieValues = [ju, shoku, go, kou, tsu];
    const pieColors = ['#B4C6E7', '#F8CBAD', '#FFE699', '#8FAADC', '#A9D18E'];
    let startAngle = -Math.PI / 2;

    for (let i = 0; i < pieValues.length; i++) {
        if (pieValues[i] > 0) {
            const sliceAngle = (pieValues[i] / totalForPie) * (Math.PI * 2);
            ctxPie.beginPath();
            ctxPie.moveTo(centerPieX, centerPieY);
            ctxPie.arc(centerPieX, centerPieY, radiusPie, startAngle, startAngle + sliceAngle);
            ctxPie.closePath();
            ctxPie.fillStyle = pieColors[i];
            ctxPie.fill();

            startAngle += sliceAngle;
        }
    }

    const bar = prepareCanvas(canvas.bar);

    if (!bar) {
        return;
    }

    const ctxBar = bar.context;

    const chartTop = 20;
    const chartBottom = bar.height - 25;
    const chartLeft = 35;
    const chartRight = bar.width - 10;
    const chartHeight = chartBottom - chartTop;
    const chartWidth = chartRight - chartLeft;

    ctxBar.strokeStyle = '#e2e8f0';
    ctxBar.lineWidth = 1;
    ctxBar.fillStyle = '#64748b';
    ctxBar.font = '11px sans-serif';
    ctxBar.textAlign = 'right';
    ctxBar.textBaseline = 'middle';

    const steps = [0, 50, 100, 150, 200, 250, 300, 350, 400];

    for (let s = 0; s < steps.length; s++) {
        const yPos = chartBottom - (steps[s] / 400) * chartHeight;
        ctxBar.beginPath();
        ctxBar.moveTo(chartLeft, yPos);
        ctxBar.lineTo(chartRight, yPos);
        ctxBar.stroke();
        ctxBar.fillText(steps[s] === 0 ? '0' : steps[s] + 'K', chartLeft - 6, yPos);
    }

    ctxBar.strokeStyle = '#94a3b8';
    ctxBar.lineWidth = 2;
    ctxBar.beginPath();
    ctxBar.moveTo(chartLeft, chartBottom);
    ctxBar.lineTo(chartRight, chartBottom);
    ctxBar.moveTo(chartLeft, chartTop);
    ctxBar.lineTo(chartLeft, chartBottom);
    ctxBar.stroke();

    const monthLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'];
    const numMonths = 10;
    const groupWidth = chartWidth / numMonths;
    const barWidth = 10;

    ctxBar.textAlign = 'center';
    ctxBar.textBaseline = 'top';

    for (let m = 0; m < numMonths; m++) {
        const groupCenterX = chartLeft + (m * groupWidth) + (groupWidth / 2);
        const hInc = (data.historicalIncome[m] / 400) * chartHeight;
        ctxBar.fillStyle = '#1F77B4';
        ctxBar.fillRect(groupCenterX - barWidth - 1, chartBottom - hInc, barWidth, hInc);

        const hExp = (mExp[m] / 400) * chartHeight;
        ctxBar.fillStyle = '#D62728';
        ctxBar.fillRect(groupCenterX + 1, chartBottom - hExp, barWidth, hExp);

        ctxBar.fillStyle = '#64748b';
        ctxBar.font = 'bold 11px sans-serif';
        ctxBar.fillText(monthLabels[m], groupCenterX, chartBottom + 6);
    }
}
