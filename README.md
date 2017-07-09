# Cash Dispenser

[![npm Version][npm-badge]][npm] [![build status][travis-badge]][travis]

This library is a partial representation of a cash dispenser module (CDM) used in an automated teller machine (ATM).

The main usage of this library is to provide an optimal solution for the known 'coin change problem'.

## Installation

### Loading in a web browser

```html
<script src="dist/cash-dispenser.js"></script>
```

### Loading in Node.js

```javascript
var CashDispenser = require("cash-dispenser");
```

## Usage

Create a new `CashDispenser` object instance

```javascript
var cashDispenser = new CashDispenser();
```

Add some cash units to the cash dispenser

```javascript
cashDispenser.addCashUnit({
    "number": "1",
    "type": CashDispenser.TYPERECYCLING,
    "currency": "EUR",
    "values": 5000,
    "initialCount": 1000,
    "count": 1000,
    "status": CashDispenser.STATCUOK});
cashDispenser.addCashUnit({
    "number": "2",
    "type": CashDispenser.TYPERECYCLING,
    "currency": "EUR",
    "values": 2000,
    "initialCount": 1000,
    "count": 1000,
    "status": CashDispenser.STATCUOK});
cashDispenser.addCashUnit({
    "number": "3",
    "type": CashDispenser.TYPERECYCLING,
    "currency": "EUR",
    "values": 1000,
    "initialCount": 1000,
    "count": 1000,
    "status": CashDispenser.STATCUOK});
```

Perform a denominate operation by supplying the amount value and the currency reference

Example 1

```javascript
var result = cashDispenser.denominate(7000, "EUR");

// -> {"values": [1, 1, 0], "smallerAmount": 0, "greaterAmount": 0}
```

Example 2

```javascript
var result = cashDispenser.denominate(10000, "EUR");

// -> {"values": [2, 0, 0], "smallerAmount": 0, "greaterAmount": 0}
```

Example 3

```javascript
var result = cashDispenser.denominate(11000, "EUR");

// -> {"values": [2, 0, 1], "smallerAmount": 0, "greaterAmount": 0}
```

Example 4

```javascript
var result = cashDispenser.denominate(11500, "EUR");

// -> {"values": [], "smallerAmount": 11000, "greaterAmount": 12000}
```

## License

Copyright (c) 2017 Yannick Ebongue

Released under the MIT License (see [LICENSE.txt](LICENSE.txt))


[npm]: https://www.npmjs.org/package/cash-dispenser
[npm-badge]: https://img.shields.io/npm/v/cash-dispenser.svg
[travis]: https://travis-ci.org/yannickebongue/cash-dispenser
[travis-badge]: https://img.shields.io/travis/yannickebongue/cash-dispenser.svg
