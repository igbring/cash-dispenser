/**
 * Created by Yannick Ebongue on 08/07/2017.
 */

(function(global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        exports["CashDispenser"] = module.exports = factory(global);
    } else {
        factory(global);
    }

})(this, function(global) {

    function CashDispenser() {
        var _cashUnits = [];

        var _denominate = function(amount, denoms, counts, usedCounts, index, result) {
            if (amount != 0 && index < denoms.length && result.values.length == 0) {
                var currentDenom = denoms[index];
                var count = Math.min(Math.floor(amount / currentDenom), counts[index]);
                while (count >= 0) {
                    var currentAmount = currentDenom * count;
                    usedCounts[index] = count;
                    if (amount == currentAmount) {
                        var values = [];
                        var i;
                        for (i = 0; i < usedCounts.length; i++) {
                            values.push(usedCounts[i]);
                        }
                        result.values = values;
                    } else {
                        _denominate(amount - currentAmount, denoms, counts, usedCounts, index + 1, result);
                    }
                    count--;
                }
                usedCounts[index] = 0;
            }
        };

        var _searchNextGreaterAmount = function(amount, denoms, availableCounts, index, total, usedCount) {
            var value = total;
            if (index < denoms.length) {
                var i;
                for (i = 0; i <= availableCounts[index]; i++) {
                    var currentTotal = total + i * denoms[index];
                    var newTotal = _searchNextGreaterAmount(amount, denoms, availableCounts, index + 1, currentTotal, usedCount + 1);
                    if (newTotal > amount) {
                        return newTotal;
                    }
                }
                value = total + (i - 1) * denoms[index];
            }
            return value;
        };

        var _searchNextSmallerAmount = function(amount, denoms, availableCounts, index, total, usedCount) {
            if (index < denoms.length) {
                var initialCount = Math.min(Math.floor((amount - total) / denoms[index]), availableCounts[index]);
                var i;
                for (i = initialCount; i >= 0; i--) {
                    var currentTotal = total + i * denoms[index];
                    var newTotal = _searchNextSmallerAmount(amount, denoms, availableCounts, index + 1, currentTotal, usedCount + 1);
                    if (newTotal < amount) {
                        return newTotal;
                    }
                }
            }
            return total;
        };

        this.getCashUnits = function() {
            return _cashUnits;
        };

        this.addCashUnit = function(cashUnit) {
            _cashUnits.push(cashUnit);
        };

        this.removeCashUnit = function(index) {
            _cashUnits.splice(index, 1);
        };

        this.getMinimumItem = function(currency) {
            var result = 0;
            var denoms = [];
            _cashUnits.forEach(function(unit) {
                if (unit.currency == currency && unit.count > 0) {
                    denoms.push(unit.values);
                }
            });
            if (denoms.length > 0) {
                denoms.sort(function(a, b) {return a - b;});
                result = denoms[0];
            }
            return result;
        };

        this.getTotalAmount = function(currency) {
            var totalAmount = 0;
            _cashUnits.forEach(function(unit) {
                if (unit.currency === currency) {
                    totalAmount += unit.values * unit.count;
                }
            });
            return totalAmount;
        };

        this.denominate = function(value, currency) {
            var denoms = [];
            var counts = [];
            var usedCounts = [];
            var result = {
                values: [],
                smallerAmount: 0,
                greaterAmount: 0
            };
            _cashUnits.forEach(function(unit) {
                if (unit.currency == currency) {
                    denoms.push(unit.values);
                    counts.push(unit.count);
                    usedCounts.push(0);
                }
            });
            _denominate(value, denoms, counts, usedCounts, 0, result);
            if (value != 0 && result.values.length == 0) {
                result.smallerAmount = _searchNextSmallerAmount(value, denoms, counts, 0, 0, 0);
                result.greaterAmount = _searchNextGreaterAmount(value, denoms, counts, 0, 0, 0);
            }
            return result;
        };

    }

    /* values of WFSCDMCASHUNIT.usType */

    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPENA = 1;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPEREJECTCASSETTE = 2;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPEBILLCASSETTE = 3;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPECOINCYLINDER = 4;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPECOINDISPENSER = 5;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPERETRACTCASSETTE = 6;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPECOUPON = 7;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPEDOCUMENT = 8;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPEREPCONTAINER = 11;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.TYPERECYCLING = 12;

    /* values of WFSCDMCASHUNIT.usStatus */

    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUOK = 0;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUFULL = 1;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUHIGH = 2;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCULOW = 3;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUEMPTY = 4;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUINOP = 5;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUMISSING = 6;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUNOVAL = 7;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUNOREF = 8;
    /**
     * @static
     * @type {number}
     * @const
     */
    CashDispenser.STATCUMANIP = 9;

    global.CashDispenser = CashDispenser;

    return CashDispenser;

});
