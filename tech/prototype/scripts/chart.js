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

function calculateAxis(values, plotHeight) {
    let minimum = Math.min(...values);
    let maximum = Math.max(...values);

    if (minimum === maximum) {
        const padding = Math.max(Math.abs(minimum) * 0.1, 1);
        minimum -= padding;
        maximum += padding;
    }

    const targetIntervals = Math.max(2, Math.floor(plotHeight / 40));
    const rawStep = (maximum - minimum) / targetIntervals;
    const magnitude = 10 ** Math.floor(Math.log10(rawStep));
    const normalizedStep = rawStep / magnitude;
    const stepFactor = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;
    const step = stepFactor * magnitude;
    let axisMin = Math.floor(minimum / step) * step;
    let axisMax = Math.ceil(maximum / step) * step;

    while (axisMin > minimum) {
        axisMin -= step;
    }
    while (axisMax < maximum) {
        axisMax += step;
    }

    return { minimum: axisMin, maximum: axisMax, step };
}

function drawLineChart(canvas, monthlyData, options) {
    const settings = options || {};
    const formatAmount = BudgetAggregate.formatAmount;
    const chart = prepareCanvas(canvas);

    if (!chart || monthlyData.length === 0) {
        return { markers: [], layout: null };
    }

    const ctx = chart.context;
    const chartTop = 36;
    const chartBottom = chart.height - 30;
    const chartLeft = 70;
    const chartRight = chart.width - 15;
    const chartHeight = chartBottom - chartTop;
    const chartWidth = chartRight - chartLeft;
    const monthCount = monthlyData.length;
    const xPosition = index => chartLeft + (monthCount === 1 ? chartWidth / 2 : (index / (monthCount - 1)) * chartWidth);
    const series = [
        { key: 'income', label: '収入', color: '#1F77B4' },
        { key: 'expenses', label: '支出', color: '#D62728' }
    ];
    const values = monthlyData.flatMap(month => series.map(item => month[item.key] / 10000));
    const axis = calculateAxis(values, chartHeight);
    const yPosition = value => chartBottom - ((value - axis.minimum) / (axis.maximum - axis.minimum)) * chartHeight;

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px sans-serif';

    const tickCount = Math.round((axis.maximum - axis.minimum) / axis.step);

    for (let index = 0; index <= tickCount; index++) {
        const step = Number((axis.minimum + index * axis.step).toPrecision(12));
        const y = yPosition(step);

        ctx.beginPath();
        ctx.strokeStyle = step === 0 ? '#94a3b8' : '#e2e8f0';
        ctx.lineWidth = step === 0 ? 2 : 1;
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.fillText(formatAmount(Number((step * 10000).toPrecision(12))), chartLeft - 8, y);
    }

    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.moveTo(chartLeft, chartTop);
    ctx.lineTo(chartLeft, chartBottom);
    ctx.stroke();

    if (settings.highlightMonth) {
        const highlightX = xPosition(settings.highlightMonth - 1);

        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = '#b6c6e2';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(highlightX, chartTop);
        ctx.lineTo(highlightX, chartBottom);
        ctx.stroke();
        ctx.restore();
    }

    const markers = [];

    series.forEach(item => {
        ctx.beginPath();
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        monthlyData.forEach((month, index) => {
            const x = xPosition(index);
            const y = yPosition(month[item.key] / 10000);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        monthlyData.forEach((month, index) => {
            const x = xPosition(index);
            const y = yPosition(month[item.key] / 10000);

            markers.push({
                x,
                y,
                month: index + 1,
                label: item.label,
                amount: month[item.key]
            });

            ctx.beginPath();
            ctx.arc(x, y, settings.highlightMonth === index + 1 ? 8 : 6, 0, Math.PI * 2);
            ctx.fillStyle = item.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = settings.highlightMonth === index + 1 ? 2.5 : 1;
            ctx.stroke();
        });
    });

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px sans-serif';

    const labelStep = chartWidth / monthCount < 30 ? 2 : 1;

    monthlyData.forEach((month, index) => {
        if (index % labelStep !== 0 && index !== monthCount - 1) {
            return;
        }

        ctx.fillText(`${month.month}月`, xPosition(index), chartBottom + 6);
    });

    return {
        markers,
        layout: { left: chartLeft, right: chartRight, top: chartTop, bottom: chartBottom }
    };
}
