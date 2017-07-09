/**
 * Created by Yann on 09/07/2017.
 */

QUnit.module("cash-dispenser: denominate", {
    before: function() {
        this.cashDispenser = new CashDispenser();
        this.cashDispenser.addCashUnit({"number": "1", "type": CashDispenser.TYPERECYCLING, "currency": "EUR", "values": 5000, "initialCount": 1000, "count": 1000, "status": CashDispenser.STATCUOK});
        this.cashDispenser.addCashUnit({"number": "2", "type": CashDispenser.TYPERECYCLING, "currency": "EUR", "values": 2000, "initialCount": 1000, "count": 1000, "status": CashDispenser.STATCUOK});
        this.cashDispenser.addCashUnit({"number": "3", "type": CashDispenser.TYPERECYCLING, "currency": "EUR", "values": 1000, "initialCount": 1000, "count": 1000, "status": CashDispenser.STATCUOK});
    }
});

QUnit.test("Denominate amount EUR 70.00", function(assert) {
    var result = this.cashDispenser.denominate(7000, "EUR");
    assert.equal(result.values[0], 1, "1x50.00");
    assert.equal(result.values[1], 1, "1x20.00");
    assert.equal(result.values[2], 0, "0x10.00");
});

QUnit.test("Denominate amount EUR 100.00", function(assert) {
    var result = this.cashDispenser.denominate(10000, "EUR");
    assert.equal(result.values[0], 2, "2x50.00");
    assert.equal(result.values[1], 0, "0x20.00");
    assert.equal(result.values[2], 0, "0x10.00");
});

QUnit.test("Denominate amount EUR 110.00", function(assert) {
    var result = this.cashDispenser.denominate(11000, "EUR");
    assert.equal(result.values[0], 2, "2x50.00");
    assert.equal(result.values[1], 0, "0x20.00");
    assert.equal(result.values[2], 1, "1x10.00");
});

QUnit.test("Denominate amount EUR 115.00", function(assert) {
    var result = this.cashDispenser.denominate(11500, "EUR");
    assert.equal(result.values.length, 0, "No result found");
    assert.equal(result.smallerAmount, 11000, "The smaller amount is EUR 110.00");
    assert.equal(result.greaterAmount, 12000, "The greater amount is EUR 120.00");
});
