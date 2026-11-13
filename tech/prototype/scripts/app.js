(function (global) {
    'use strict';

    const aggregate = global.BudgetAggregate;
    const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);

    function formatYen(value) {
        return `¥${aggregate.formatAmount(value)}`;
    }

    function formatSignedYen(value) {
        return `${value >= 0 ? '+' : '-'}¥${aggregate.formatAmount(Math.abs(value))}`;
    }

    function lastMonthOf(entries, year) {
        const months = entries.filter(entry => entry.year === year).map(entry => entry.month);

        return months.length > 0 ? Math.max(...months) : 0;
    }

    function createCell(text, className, tag) {
        const cell = document.createElement(tag || 'td');
        cell.textContent = text;

        if (className) {
            cell.className = className;
        }

        if (tag === 'th') {
            cell.setAttribute('scope', 'row');
        }

        return cell;
    }

    function createRow(cells, className) {
        const row = document.createElement('tr');
        cells.forEach(cell => row.append(cell));

        if (className) {
            row.className = className;
        }

        return row;
    }

    function populateYearSelect(select, years) {
        select.replaceChildren();

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = String(year);
            option.textContent = `${year}年`;
            select.append(option);
        });
    }

    function populateMonthSelect(select) {
        select.replaceChildren();

        const all = document.createElement('option');
        all.value = 'all';
        all.textContent = 'すべて';
        select.append(all);

        MONTHS.forEach(month => {
            const option = document.createElement('option');
            option.value = String(month);
            option.textContent = `${month}月`;
            select.append(option);
        });
    }

    function populateCategorySelect(select, entries) {
        select.replaceChildren();

        const all = document.createElement('option');
        all.value = 'all';
        all.textContent = 'すべて';
        select.append(all);

        const categories = new Map();

        entries.forEach(entry => {
            if (!categories.has(entry.categoryId)) {
                categories.set(entry.categoryId, entry.displayName);
            }
        });

        Array.from(categories.entries())
            .sort((left, right) => left[1].localeCompare(right[1], 'ja'))
            .forEach(([categoryId, displayName]) => {
                const option = document.createElement('option');
                option.value = categoryId;
                option.textContent = displayName;
                select.append(option);
            });
    }

    function restoreState(state, years, elements) {
        const params = new URLSearchParams(window.location.search);
        const year = Number(params.get('y'));
        const month = params.get('m');
        const categoryId = params.get('c');

        if (years.includes(year)) {
            state.year = year;
        }

        if (month === 'all') {
            state.month = 'all';
        } else if (MONTHS.includes(Number(month))) {
            state.month = Number(month);
        }

        const hasCategory = Array.from(elements.categorySelect.options)
            .some(option => option.value === categoryId);

        if (categoryId && hasCategory) {
            state.categoryId = categoryId;
        }

        elements.yearSelect.value = String(state.year);
        elements.monthSelect.value = String(state.month);
        elements.categorySelect.value = state.categoryId;
    }

    function writeUrlState(state) {
        const params = new URLSearchParams(window.location.search);
        params.set('y', String(state.year));
        params.set('m', String(state.month));
        params.set('c', state.categoryId);
        window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }

    function startBudgetPrototype(options) {
        const entries = aggregate.flattenBudgetData(options.categories);
        const years = aggregate.collectYears(entries);
        const state = { year: years[0], month: 'all', categoryId: 'all' };
        const elements = {
            yearSelect: document.getElementById('ctrl-year'),
            monthSelect: document.getElementById('ctrl-month'),
            categorySelect: document.getElementById('ctrl-category'),
            periodBadge: document.getElementById('period-badge'),
            incomeLabel: document.getElementById('lbl-inc'),
            expenseLabel: document.getElementById('lbl-exp'),
            balanceLabel: document.getElementById('lbl-bal'),
            chartTitle: document.getElementById('chart-title'),
            canvas: document.getElementById('cnvLine'),
            chartContainer: document.getElementById('chart-container'),
            chartTooltip: document.getElementById('chart-tooltip'),
            detailBody: document.getElementById('detail-body'),
            detailFooter: document.getElementById('detail-footer'),
            detailSummary: document.getElementById('detail-summary'),
            summaryList: document.getElementById('summary-list'),
            summaryFooter: document.getElementById('summary-footer'),
            monthlyBody: document.getElementById('monthly-body'),
            monthlyFooter: document.getElementById('monthly-footer')
        };

        populateYearSelect(elements.yearSelect, years);
        populateMonthSelect(elements.monthSelect);
        populateCategorySelect(elements.categorySelect, entries);
        restoreState(state, years, elements);

        let chartMarkers = [];

        const redrawChart = () => {
            const lastMonth = lastMonthOf(entries, state.year);
            const monthlyData = aggregate.monthlyTotals(entries, state.year).slice(0, lastMonth);
            const highlightMonth = state.month === 'all' || state.month > lastMonth ? 0 : state.month;
            const chart = drawLineChart(elements.canvas, monthlyData, { highlightMonth });

            chartMarkers = chart.markers;
            elements.chartTitle.textContent = lastMonth > 0
                ? `${state.year}年 収入と支出の推移（1〜${lastMonth}月）`
                : `${state.year}年 収入と支出の推移`;
        };

        const renderCards = () => {
            const totals = aggregate.sumEntries(aggregate.filterEntries(entries, {
                year: state.year,
                month: state.month
            }));

            elements.periodBadge.textContent = state.month === 'all'
                ? `${state.year}年 通年`
                : `${state.year}年 ${state.month}月`;
            elements.incomeLabel.textContent = formatYen(totals.income);
            elements.expenseLabel.textContent = formatYen(totals.expenses);
            elements.balanceLabel.textContent = formatSignedYen(totals.balance);
            elements.balanceLabel.style.color = totals.balance >= 0 ? '#16a34a' : '#dc2626';
        };

        const renderDetails = () => {
            const rows = aggregate.filterEntries(entries, {
                year: state.year,
                month: state.month,
                categoryId: state.categoryId
            });
            const totals = aggregate.sumEntries(rows);

            elements.detailBody.replaceChildren();

            if (rows.length === 0) {
                const cell = createCell('該当する明細はありません。', 'empty-note');
                cell.setAttribute('colspan', '4');
                elements.detailBody.append(createRow([cell]));
            } else {
                rows.forEach(entry => {
                    elements.detailBody.append(createRow([
                        createCell(entry.date.replace(/-/g, '/'), 'date-cell'),
                        createCell(entry.displayName),
                        createCell(entry.isExpense ? '支出' : '収入', entry.isExpense ? 'tag tag-expense' : 'tag tag-income'),
                        createCell(formatYen(entry.amount), 'num')
                    ]));
                });
            }

            elements.detailFooter.replaceChildren();

            const label = createCell(`合計（${totals.count}件）`, 'tfoot-label', 'th');
            label.setAttribute('colspan', '3');
            elements.detailFooter.append(createRow([
                label,
                createCell(formatSignedYen(totals.balance), 'num')
            ]));

            elements.detailSummary.textContent = `収入計 ${formatYen(totals.income)}／支出計 ${formatYen(totals.expenses)}／収支 ${formatSignedYen(totals.balance)}`;
        };

        const renderSummary = () => {
            const periodEntries = aggregate.filterEntries(entries, { year: state.year, month: state.month });
            const categories = aggregate.categoryTotals(periodEntries);
            const totals = aggregate.sumEntries(periodEntries);
            const maxAmount = categories.reduce((maximum, item) => Math.max(maximum, item.amount), 0);

            elements.summaryList.replaceChildren();

            if (categories.length === 0) {
                const note = document.createElement('li');
                note.className = 'empty-note';
                note.textContent = '該当する集計はありません。';
                elements.summaryList.append(note);
            }

            categories.forEach(item => {
                const row = document.createElement('li');
                row.className = item.categoryId === state.categoryId ? 'summary-item is-selected' : 'summary-item';

                const name = document.createElement('span');
                name.className = 'summary-name';
                name.textContent = item.displayName;

                const track = document.createElement('span');
                track.className = 'summary-track';

                const bar = document.createElement('span');
                bar.className = item.isExpense ? 'summary-bar expense' : 'summary-bar income';
                bar.style.width = `${maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0}%`;
                track.append(bar);

                const amount = document.createElement('span');
                amount.className = 'summary-amount';
                amount.textContent = `${formatYen(item.amount)}（${Math.round(item.share * 100)}%）`;

                row.append(name, track, amount);
                elements.summaryList.append(row);
            });

            elements.summaryFooter.textContent = `収入計 ${formatYen(totals.income)}／支出計 ${formatYen(totals.expenses)}／収支 ${formatSignedYen(totals.balance)}`;
        };

        const renderMonthlyTable = () => {
            const lastMonth = lastMonthOf(entries, state.year);
            const months = aggregate.monthlyTotals(entries, state.year).slice(0, lastMonth);
            const totals = months.reduce((accumulator, month) => {
                accumulator.income += month.income;
                accumulator.expenses += month.expenses;
                accumulator.balance += month.balance;

                return accumulator;
            }, { income: 0, expenses: 0, balance: 0 });

            elements.monthlyBody.replaceChildren();

            months.forEach(month => {
                elements.monthlyBody.append(createRow([
                    createCell(`${month.month}月`, 'date-cell'),
                    createCell(formatYen(month.income), 'num'),
                    createCell(formatYen(month.expenses), 'num'),
                    createCell(formatSignedYen(month.balance), month.balance >= 0 ? 'num is-positive' : 'num is-negative')
                ], state.month === month.month ? 'is-current' : ''));
            });

            elements.monthlyFooter.replaceChildren();
            elements.monthlyFooter.append(createRow([
                createCell('累計', 'tfoot-label', 'th'),
                createCell(formatYen(totals.income), 'num'),
                createCell(formatYen(totals.expenses), 'num'),
                createCell(formatSignedYen(totals.balance), 'num')
            ]));
        };

        const render = () => {
            renderCards();
            renderDetails();
            renderSummary();
            renderMonthlyTable();
            redrawChart();
        };

        const hideChartTooltip = () => {
            elements.chartTooltip.hidden = true;
            elements.canvas.style.cursor = '';
        };

        elements.canvas.addEventListener('pointermove', event => {
            const canvasRect = elements.canvas.getBoundingClientRect();
            const pointerX = event.clientX - canvasRect.left;
            const pointerY = event.clientY - canvasRect.top;
            const hits = chartMarkers
                .map(marker => ({
                    marker,
                    distance: Math.hypot(marker.x - pointerX, marker.y - pointerY)
                }))
                .filter(hit => hit.distance <= 12)
                .sort((left, right) => left.distance - right.distance);

            if (hits.length === 0) {
                hideChartTooltip();
                return;
            }

            elements.chartTooltip.textContent = hits
                .map(({ marker }) => `${state.year}年${marker.month}月・${marker.label}: ${formatYen(marker.amount)}`)
                .join('\n');
            elements.chartTooltip.hidden = false;
            elements.canvas.style.cursor = 'pointer';

            const containerRect = elements.chartContainer.getBoundingClientRect();
            const left = event.clientX - containerRect.left + 12;
            const top = event.clientY - containerRect.top - elements.chartTooltip.offsetHeight - 12;
            elements.chartTooltip.style.left = `${Math.max(8, Math.min(left, elements.chartContainer.clientWidth - elements.chartTooltip.offsetWidth - 8))}px`;
            elements.chartTooltip.style.top = `${Math.max(8, top)}px`;
        });

        elements.canvas.addEventListener('pointerleave', hideChartTooltip);

        elements.yearSelect.addEventListener('change', () => {
            state.year = Number(elements.yearSelect.value);
            render();
            writeUrlState(state);
        });

        elements.monthSelect.addEventListener('change', () => {
            const value = elements.monthSelect.value;
            state.month = value === 'all' ? 'all' : Number(value);
            render();
            writeUrlState(state);
        });

        elements.categorySelect.addEventListener('change', () => {
            state.categoryId = elements.categorySelect.value;
            render();
            writeUrlState(state);
        });

        let redrawFrame = 0;
        const scheduleRedraw = () => {
            if (!redrawFrame) {
                redrawFrame = requestAnimationFrame(() => {
                    redrawFrame = 0;
                    redrawChart();
                });
            }
        };

        window.addEventListener('resize', scheduleRedraw);

        if ('ResizeObserver' in window) {
            const canvasObserver = new ResizeObserver(scheduleRedraw);
            canvasObserver.observe(elements.canvas);
        }

        let pixelRatioQuery;
        const onPixelRatioChange = () => {
            watchPixelRatio();
            scheduleRedraw();
        };
        const watchPixelRatio = () => {
            if (pixelRatioQuery) {
                if (pixelRatioQuery.removeEventListener) {
                    pixelRatioQuery.removeEventListener('change', onPixelRatioChange);
                } else {
                    pixelRatioQuery.removeListener(onPixelRatioChange);
                }
            }

            pixelRatioQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);

            if (pixelRatioQuery.addEventListener) {
                pixelRatioQuery.addEventListener('change', onPixelRatioChange);
            } else {
                pixelRatioQuery.addListener(onPixelRatioChange);
            }
        };

        watchPixelRatio();
        render();

        return { state, entries, render };
    }

    global.startBudgetPrototype = startBudgetPrototype;
})(typeof window !== 'undefined' ? window : globalThis);
