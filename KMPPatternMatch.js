/**
 *  @author         Parveen.Chahal
 *  @category       Business Logic.
 *  @desc           String searching with linear complexity O(m + n).
 *                  Create an object passing pattern in a constructor and pass text at the time of match.
 *  @Methods        contains   - return true/false.
 *                  allMatches - return an array of index of occurences.
 *                  firstMatch - return index of first occurence.
 *                  lastMatch  - return index of last occurence.
 *  @constructor    Accepts two params first one(pattern) is mandatory and second ignoreCase(true/false) is optional.
 */
com.pc.PatternMatch = function (pattern, ignoreCases) {
	try {
		if (pattern === null || pattern === undefined || typeof(pattern) !== "string") {
			throw "Invalid Input Exception: Expected input is string type";
		}
		if (pattern === "") {
			throw "Invalid Input Exception in com.pc.PatternMatch: Empty string found!";
		}
		//handling boolean value of string type
		try {
			if (JSON.parse(String(ignoreCases).toLowerCase()) === true) {
				ignoreCases = true;
			} else {
				ignoreCases = false;
			}
		} catch (err) {
			ignoreCases = false;
		}
		this._pattern = pattern;
		this._failure = [];
		this._ignoreCases = ignoreCases;
		this._reverseFailure = [];

		//Build failure array for non-reverse.
		var firstIndex = 0;
		var lastIndex = this._pattern.length - 1;

		var index = firstIndex;
		var i = index + 1;
		this._failure[index] = index;
		while (i <= lastIndex) {
			if (checkEquality.call(this, this._pattern.charAt(index), this._pattern.charAt(i))) {
				this._failure[i++] = ++index;
			} else if (index == firstIndex) {
				this._failure[i++] = firstIndex;
			} else {
				index = this._failure[index - 1];
			}
		}

		//Build failure array for reverse match
		index = lastIndex;
		i = index - 1;
		this._reverseFailure[index] = index;
		while (i >= firstIndex) {
			if (checkEquality.call(this, this._pattern.charAt(index), this._pattern.charAt(i))) {
				this._reverseFailure[i--] = --index;
			} else if (index == lastIndex) {
				this._reverseFailure[i--] = lastIndex;
			} else {
				index = this._reverseFailure[index + 1];
			}
		}
	} catch (err) {
		console.log(err);
	}

	function checkEquality(str1, str2) {
		if (this._ignoreCases === true) {
			return str1.toLowerCase() === str2.toLowerCase();
		}
		return str1 === str2;
	}

	function match(text, onlyFirstOccurence) {
		var patternFirstIndex = 0;
		var patternLength = this._pattern.length;
		var textFirstIndex = 0;
		var textLen = text.length;

		var occurence = [];
		var i = textFirstIndex;
		var index = patternFirstIndex;
		while (i < textLen) {
			if (checkEquality.call(this, text.charAt(i), this._pattern.charAt(index))) {
				i++;
				index++;
			} else if (index == patternFirstIndex) {
				i++;
			} else {
				index = this._failure[index - 1];
			}
			if (index >= patternLength) {
				occurence.push(i - patternLength);
				index--;
				if (onlyFirstOccurence) {
					break;
				}
			}
		}
		return occurence;
	}

	function reverseFirstMatch(text) {
		var patternLastIndex = this._pattern.length - 1;
		var patternFirstIndex = 0;
		var textLastIndex = text.length - 1;
		var textFirstIndex = 0;

		var i = textLastIndex;
		var index = patternLastIndex;
		while (i >= textFirstIndex) {
			if (checkEquality.call(this, text.charAt(i), this._pattern.charAt(index))) {
				i--;
				index--;
			} else if (index == patternLastIndex) {
				i--;
			} else {
				index = this._reverseFailure[index + 1];
			}
			if (index < patternFirstIndex) {
				return i + 1;
			}
		}
		return null;
	}

	com.pc.PatternMatch.prototype.allMatches = function (text) {
		try {
			if (text === null || text === undefined || typeof(text) !== "string") {
				throw "Invalid Input Exception in com.pc.PatternMatch.prototype.allMatches: Expected input is string type";
			}
			return match.call(this, text, false); ;
		} catch (err) {
			console.log(err);
		}
	}

	com.pc.PatternMatch.prototype.contains = function (text) {
		try {
			return this.firstMatch(text) !== null;
		} catch (err) {
			console.log(err);
		}
	};

	com.pc.PatternMatch.prototype.firstMatch = function (text) {
		try {
			if (text === null || text === undefined || typeof(text) !== "string") {
				throw "Invalid Input Exception in com.pc.PatternMatch.prototype.firstMatch: Expected input is string type";
			}
			var occurence = match.call(this, text, true);
			if (occurence.length <= 0) {
				return null;
			}
			return occurence[0];
		} catch (err) {
			console.log(err);
		}
	}

	com.pc.PatternMatch.prototype.lastMatch = function (text) {
		try {
			if (text === null || text === undefined || typeof(text) !== "string") {
				throw "Invalid Input Exception in com.pc.PatternMatch.prototype.lastMatch: Expected input is string type";
			}
			return reverseFirstMatch.call(this, text);
		} catch (err) {
			console.log(err);
		}
	}
};
