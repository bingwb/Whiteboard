(function (global) {
    'use strict';

    const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

    function parseDate(text) {
        const match = DATE_PATTERN.exec(String(text));

        if (!match) {
            throw new Error(`Invalid date: ${text}`);
        }

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

        if (year < 1970 || month < 1 || month > 12 || day < 1 || day > daysInMonth) {
            throw new Error(`Invalid date: ${text}`);
        }

        return { year, month, day };
    }

    function compareEntries(left, right) {
        if (left.date !== right.date) {
            return left.date < right.date ? 1 : -1;
        }

        if (left.isExpense !== right.isExpense) {
            return left.isExpense ? 1 : -1;
        }

        if (left.categoryId !== right.categoryId) {
            return left.categoryId < right.categoryId ? -1 : 1;
        }

        return right.amount - left.amount;
    }

    function flattenBudgetData(categories) {
        if (!categories || typeof categories !== 'object') {
            throw new Error('Invalid budget data.');
        }

        const entries = [];

        Object.keys(categories).forEach(categoryId => {
            const category = categories[categoryId];

            if (typeof category.isExpense !== 'boolean' || !Array.isArray(category.details)) {
                throw new Error(`Invalid budget category: ${categoryId}`);
            }

            const displayName = typeof category.displayName === 'string' && category.displayName !== ''
                ? category.displayName
                : categoryId;

            category.details.forEach(detail => {
                const amount = detail.amount;

                if (!Number.isSafeInteger(amount) || amount < 0) {
                    throw new Error(`Invalid amount: ${categoryId}`);
                }

                const { year, month, day } = parseDate(detail.date);

                entries.push({
                    categoryId,
                    displayName,
                    isExpense: category.isExpense,
                    date: detail.date,
                    year,
                    month,
                    day,
                    amount
                });
            });
        });

        return entries.sort(compareEntries);
    }

    function collectYears(entries) {
        return Array.from(new Set(entries.map(entry => entry.year))).sort((left, right) => right - left);
    }

    function filterEntries(entries, filter) {
        const year = filter.year;
        const month = filter.month === undefined ? 'all' : filter.month;
        const categoryId = filter.categoryId === undefined ? 'all' : filter.categoryId;

        return entries.filter(entry => entry.year === year
            && (month === 'all' || entry.month === month)
            && (categoryId === 'all' || entry.categoryId === categoryId));
    }

    function sumEntries(entries) {
        const totals = { count: entries.length, income: 0, expenses: 0, balance: 0 };

        entries.forEach(entry => {
            if (entry.isExpense) {
                totals.expenses += entry.amount;
            } else {
                totals.income += entry.amount;
            }
        });

        totals.balance = totals.income - totals.expenses;

        return totals;
    }

    function monthlyTotals(entries, year) {
        const months = Array.from({ length: 12 }, (_, index) => ({
            month: index + 1,
            income: 0,
            expenses: 0,
            balance: 0
        }));

        entries.forEach(entry => {
            if (entry.year !== year) {
                return;
            }

            const target = months[entry.month - 1];

            if (entry.isExpense) {
                target.expenses += entry.amount;
            } else {
                target.income += entry.amount;
            }
        });

        months.forEach(month => {
            month.balance = month.income - month.expenses;
        });

        return months;
    }

    function categoryTotals(entries) {
        const groups = new Map();

        entries.forEach(entry => {
            const group = groups.get(entry.categoryId) || {
                categoryId: entry.categoryId,
                displayName: entry.displayName,
                isExpense: entry.isExpense,
                amount: 0
            };

            group.amount += entry.amount;
            groups.set(entry.categoryId, group);
        });

        const totals = sumEntries(entries);

        return Array.from(groups.values())
            .map(group => {
                const base = group.isExpense ? totals.expenses : totals.income;

                return Object.assign({}, group, { share: base > 0 ? group.amount / base : 0 });
            })
            .sort((left, right) => right.amount - left.amount
                || left.displayName.localeCompare(right.displayName, 'ja'));
    }

    function formatAmount(value) {
        const [integer, fraction] = Math.abs(value).toString().split('.');
        const groupedInteger = integer.replace(/\B(?=(\d{4})+(?!\d))/g, ',');

        return (value < 0 ? '-' : '') + groupedInteger + (fraction ? '.' + fraction : '');
    }

    const api = {
        parseDate,
        flattenBudgetData,
        collectYears,
        filterEntries,
        sumEntries,
        monthlyTotals,
        categoryTotals,
        formatAmount
    };

    global.BudgetAggregate = api;

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : window);
