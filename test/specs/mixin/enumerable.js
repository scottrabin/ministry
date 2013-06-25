"use strict";

define(function(require) {
	var create = require('main');
	var Enumerable = require('mixin/enumerable');

	var MissingClass = create(Enumerable);
	var ConstructedClass = create(Enumerable, {
		forEach: function(callback, thisObject) {
			['zero', 'one', 'two', 'three', 'four', 'five'].forEach(callback, thisObject || this);
		}
	});

	describe("mixin/enumerable", function() {
		beforeEach(function() {
			this.badInstance = new MissingClass();
			this.instance = new ConstructedClass();
		});
		describe("#forEach", function() {
			it("should throw an error when trying to invoke `forEach` when not defined", function() {
				expect(function() {
					this.badInstance.forEach(function(){});
				}).toThrow();
			});
		});

		describe("#every", function() {
			it("should throw an error when trying to invoke `every` when `forEach` is not defined", function() {
				expect(function() {
					this.badInstance.every(function(){});
				}).toThrow();
			});

			it("should return true if the function evaluates to true for all elements in the array", function() {
				expect(this.instance.every(function() { return true; })).toBe(true);
			});

			it("should return false if the function evaluates to false for any invocation", function() {
				expect(this.instance.every(function(value, key, array) {
					return key > 0;
				})).toBe(false);
			});
		});

		describe("#some", function() {
			it("should throw an error when trying to invoke `some` when `forEach` is not defined", function() {
				expect(function() {
					this.badInstance.some(function(){});
				}).toThrow();
			});

			it("should return true if the function evaluates to true for any element in the array", function() {
				expect(this.instance.some(function(value, key, array) {
					return key === 0;
				})).toBe(true);
			});

			it("should return false if the function evaluates to false for every invocation", function() {
				expect(this.instance.some(function(value, key, array) {
					return false;
				})).toBe(false);
			});
		});

		describe("#filter", function() {
			it("should throw an error when trying to invoke `filter` when `forEach` is not defined", function() {
				expect(function() {
					this.badInstance.filter(function(){});
				}).toThrow();
			});

			it("should return a new array comprising the elements for which the provided function returns true", function() {
				expect(this.instance.filter(function(value, key, array) {
					return key % 2 === 0;
				})).toEqual(['zero', 'two', 'four']);
			});
		});

		describe("#map", function() {
			it("should throw an error when trying to invoke `map` when `forEach` is not defined", function() {
				expect(function() {
					this.badInstance.map(function(){});
				}).toThrow();
			});

			it("should return a new array comprising the values returned by invoking the provided function on each element of the object", function() {
				expect(this.instance.map(function(value, key, array) {
					return value.toUpperCase();
				})).toEqual(['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']);
			});
		});

		describe("#reduce", function() {
			it("should throw an error when trying to invoke `reduce` when `forEach` is not defined", function() {
				expect(function() {
					this.badInstance.reduce(function(){});
				}).toThrow();
			});

			it("should return the result of applying the provided function in a left-to-right direction", function() {
				expect(this.instance.reduce(function(previousValue, nextValue) {
					return previousValue + nextValue;
				}, '')).toBe('zeroonetwothreefourfive');
			});
		});

		describe("#reduceRight", function() {
			// TODO: reduceRight
		});
	});
});
