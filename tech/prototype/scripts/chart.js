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

function aggregateMonthlyData(categories) {
    const monthlyData = Array.from({ length: 10 }, () => ({ income: 0, expenses: 0 }));

    Object.values(categories).forEach(category => {
        if (typeof category.isExpense !== 'boolean' || !Array.isArray(category.details)) {
            throw new Error('Invalid budget category data.');
        }

        category.details.forEach(detail => {
            const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(detail.date);
            const amount = detail.amount;

            if (!dateMatch || !Number.isSafeInteger(amount) || amount < 0) {
                throw new Error('Invalid budget detail data.');
            }

            const year = Number(dateMatch[1]);
            const month = Number(dateMatch[2]);
            const day = Number(dateMatch[3]);
            const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

            if (year !== 2026 || month < 1 || month > monthlyData.length || day < 1 || day > daysInMonth) {
                throw new Error('Budget detail date is outside the supported period.');
            }

            const field = category.isExpense ? 'expenses' : 'income';
            monthlyData[month - 1][field] += amount;
        });
    });

    return monthlyData;
}

function drawAll(data, canvas) {
    const monthlyData = aggregateMonthlyData(data.categories);
    const currentMonth = monthlyData[monthlyData.length - 1];
    const currentBalance = currentMonth.income - currentMonth.expenses;

    data.incomeLabel.innerText = "¥" + currentMonth.income.toLocaleString();
    data.expenseLabel.innerText = "¥" + currentMonth.expenses.toLocaleString();
    data.balanceLabel.innerText = (currentBalance >= 0 ? "+" : "-") + "¥" + Math.abs(currentBalance).toLocaleString();
    data.balanceLabel.style.color = currentBalance >= 0 ? "#16a34a" : "#dc2626";

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

    const monthLabels = monthlyData.map((_, index) => (index + 1) + '月');
    const numMonths = monthlyData.length;
    const groupWidth = chartWidth / numMonths;
    const barWidth = 10;

    ctxBar.textAlign = 'center';
    ctxBar.textBaseline = 'top';

    for (let m = 0; m < numMonths; m++) {
        const groupCenterX = chartLeft + (m * groupWidth) + (groupWidth / 2);
        const hInc = (monthlyData[m].income / 1000 / 400) * chartHeight;
        ctxBar.fillStyle = '#1F77B4';
        ctxBar.fillRect(groupCenterX - barWidth - 1, chartBottom - hInc, barWidth, hInc);

        const hExp = (monthlyData[m].expenses / 1000 / 400) * chartHeight;
        ctxBar.fillStyle = '#D62728';
        ctxBar.fillRect(groupCenterX + 1, chartBottom - hExp, barWidth, hExp);

        ctxBar.fillStyle = '#64748b';
        ctxBar.font = 'bold 11px sans-serif';
        ctxBar.fillText(monthLabels[m], groupCenterX, chartBottom + 6);
    }
}
