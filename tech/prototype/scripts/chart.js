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

    monthlyData.forEach(month => {
        month.balance = month.income - month.expenses;
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

    const lineChart = prepareCanvas(canvas.line);

    if (!lineChart) {
        return;
    }

    const ctx = lineChart.context;

    const chartTop = 20;
    const chartBottom = lineChart.height - 30;
    const chartLeft = 45;
    const chartRight = lineChart.width - 15;
    const chartHeight = chartBottom - chartTop;
    const chartWidth = chartRight - chartLeft;
    const monthLabels = monthlyData.map((_, index) => (index + 1) + '月');
    const numMonths = monthlyData.length;
    const xPosition = index => chartLeft + (index / (numMonths - 1)) * chartWidth;
    const series = [
        { key: 'income', color: '#1F77B4' },
        { key: 'expenses', color: '#D62728' }
    ];
    const values = monthlyData.flatMap(month => series.map(item => month[item.key] / 1000));
    const axisStep = 50;
    const axisMin = Math.floor(Math.min(0, ...values) / axisStep) * axisStep;
    const axisMax = Math.ceil(Math.max(0, ...values) / axisStep) * axisStep + axisStep;
    const yPosition = value => chartBottom - ((value - axisMin) / (axisMax - axisMin)) * chartHeight;

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px sans-serif';

    for (let step = axisMin; step <= axisMax; step += axisStep) {
        const y = yPosition(step);
        ctx.beginPath();
        ctx.strokeStyle = step === 0 ? '#94a3b8' : '#e2e8f0';
        ctx.lineWidth = step === 0 ? 2 : 1;
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.fillText(step === 0 ? '0' : step + 'K', chartLeft - 8, y);
    }

    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.moveTo(chartLeft, chartTop);
    ctx.lineTo(chartLeft, chartBottom);
    ctx.stroke();

    series.forEach(item => {
        ctx.beginPath();
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        monthlyData.forEach((month, index) => {
            const x = xPosition(index);
            const y = yPosition(month[item.key] / 1000);
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();
        ctx.fillStyle = item.color;

        monthlyData.forEach((month, index) => {
            const x = xPosition(index);
            const y = yPosition(month[item.key] / 1000);
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    });

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px sans-serif';

    for (let index = 0; index < numMonths; index++) {
        ctx.fillText(monthLabels[index], xPosition(index), chartBottom + 6);
    }
}
