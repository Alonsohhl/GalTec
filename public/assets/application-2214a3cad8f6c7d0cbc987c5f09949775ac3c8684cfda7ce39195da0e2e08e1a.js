/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
* http://jqueryui.com
* Includes: widget.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */


(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );

	} else if ( typeof exports === "object" ) {

		// Node/CommonJS
		factory( require( "jquery" ) );

	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat(args) );
			}

			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;



}));
/*
 * jQuery Iframe Transport Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */


;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',
            /*jshint scripturl: false */
                form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="' + initialIframeSrc +
                            '" name="iframe-transport-' + counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input)
                                    .prop('name', clone.prop('name'))
                                    .attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));
/*
 * jQuery File Upload Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */


;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('./vendor/jquery.ui.widget')
        );
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).then(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).then(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.then(send);
                } else {
                    this._sequence = this._sequence.then(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (!filesLength) {
                return false;
            }
            if (limitSize && files[0].size === undefined) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true),
                restoreFocus = input.is(document.activeElement);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // If the fileInput had focus before it was detached,
            // restore focus to the inputClone.
            if (restoreFocus) {
                inputClone.focus();
            }
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                },
                dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).then(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).then(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                this.element[0].attributes,
                function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));

/**
 * Cloudinary's JavaScript library - Version 2.3.0
 * Copyright Cloudinary
 * see https://github.com/cloudinary/cloudinary_js
 *
 */

var slice = [].slice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(root, factory) {
  var name, ref, results, value;
  if ((typeof define === 'function') && define.amd) {
    return define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    return module.exports = factory(require('jquery'));
  } else {
    root.cloudinary || (root.cloudinary = {});
    ref = factory(jQuery);
    results = [];
    for (name in ref) {
      value = ref[name];
      results.push(root.cloudinary[name] = value);
    }
    return results;
  }
})(this, function(jQuery) {

  /*
   * Includes common utility methods and shims
   */
  var ArrayParam, BaseUtil, ClientHintsMetaTag, Cloudinary, CloudinaryJQuery, Condition, Configuration, Expression, ExpressionParam, HtmlTag, ImageTag, Layer, LayerParam, Param, RangeParam, RawParam, SubtitlesLayer, TextLayer, Transformation, TransformationBase, TransformationParam, Util, VideoTag, addClass, allStrings, camelCase, cloneDeep, cloudinary, compact, contains, convertKeys, crc32, defaults, difference, functions, getAttribute, getData, hasClass, identity, isEmpty, isNumberLike, isString, m, merge, parameters, reWords, removeAttribute, setAttribute, setAttributes, setData, smartEscape, snakeCase, utf8_encode, webp, width, withCamelCaseKeys, withSnakeCaseKeys, without;
  allStrings = function(list) {
    var item, j, len;
    for (j = 0, len = list.length; j < len; j++) {
      item = list[j];
      if (!Util.isString(item)) {
        return false;
      }
    }
    return true;
  };
  without = function(array, item) {
    var i, length, newArray;
    newArray = [];
    i = -1;
    length = array.length;
    while (++i < length) {
      if (array[i] !== item) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  };
  isNumberLike = function(value) {
    return (value != null) && !isNaN(parseFloat(value));
  };
  smartEscape = function(string, unsafe) {
    if (unsafe == null) {
      unsafe = /([^a-zA-Z0-9_.\-\/:]+)/g;
    }
    return string.replace(unsafe, function(match) {
      return match.split("").map(function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
      }).join("");
    });
  };
  defaults = function() {
    var destination, sources;
    destination = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return sources.reduce(function(dest, source) {
      var key, value;
      for (key in source) {
        value = source[key];
        if (dest[key] === void 0) {
          dest[key] = value;
        }
      }
      return dest;
    }, destination);
  };

  /** Used to match words to create compound words. */
  reWords = (function() {
    var lower, upper;
    upper = '[A-Z]';
    lower = '[a-z]+';
    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  })();
  camelCase = function(source) {
    var i, word, words;
    words = source.match(reWords);
    words = (function() {
      var j, len, results;
      results = [];
      for (i = j = 0, len = words.length; j < len; i = ++j) {
        word = words[i];
        word = word.toLocaleLowerCase();
        if (i) {
          results.push(word.charAt(0).toLocaleUpperCase() + word.slice(1));
        } else {
          results.push(word);
        }
      }
      return results;
    })();
    return words.join('');
  };
  snakeCase = function(source) {
    var i, word, words;
    words = source.match(reWords);
    words = (function() {
      var j, len, results;
      results = [];
      for (i = j = 0, len = words.length; j < len; i = ++j) {
        word = words[i];
        results.push(word.toLocaleLowerCase());
      }
      return results;
    })();
    return words.join('_');
  };
  convertKeys = function(source, converter) {
    var key, result, value;
    if (converter == null) {
      converter = Util.identity;
    }
    result = {};
    for (key in source) {
      value = source[key];
      key = converter(key);
      if (!Util.isEmpty(key)) {
        result[key] = value;
      }
    }
    return result;
  };
  withCamelCaseKeys = function(source) {
    return convertKeys(source, Util.camelCase);
  };
  withSnakeCaseKeys = function(source) {
    return convertKeys(source, Util.snakeCase);
  };
  BaseUtil = {

    /**
     * Return true if all items in list are strings
     * @param {Array} list - an array of items
     */
    allStrings: allStrings,

    /**
    * Convert string to camelCase
    * @param {string} string - the string to convert
    * @return {string} in camelCase format
     */
    camelCase: camelCase,
    convertKeys: convertKeys,

    /**
     * Assign values from sources if they are not defined in the destination.
     * Once a value is set it does not change
     * @param {Object} destination - the object to assign defaults to
     * @param {...Object} source - the source object(s) to assign defaults from
     * @return {Object} destination after it was modified
     */
    defaults: defaults,

    /**
     * Convert string to snake_case
     * @param {string} string - the string to convert
     * @return {string} in snake_case format
     */
    snakeCase: snakeCase,

    /**
    * Creates a new array without the given item.
    * @param {Array} array - original array
    * @param {*} item - the item to exclude from the new array
    * @return {Array} a new array made of the original array's items except for `item`
     */
    without: without,

    /**
    * Return true is value is a number or a string representation of a number.
    * @example
    *    Util.isNumber(0) // true
    *    Util.isNumber("1.3") // true
    *    Util.isNumber("") // false
    *    Util.isNumber(undefined) // false
     */
    isNumberLike: isNumberLike,
    smartEscape: smartEscape,
    withCamelCaseKeys: withCamelCaseKeys,
    withSnakeCaseKeys: withSnakeCaseKeys
  };

  /**
    * Includes utility methods and lodash / jQuery shims
   */

  /**
    * Get data from the DOM element.
    *
    * This method will use jQuery's `data()` method if it is available, otherwise it will get the `data-` attribute
    * @param {Element} element - the element to get the data from
    * @param {string} name - the name of the data item
    * @returns the value associated with the `name`
    * @function Util.getData
   */
  getData = function(element, name) {
    return jQuery(element).data(name);
  };

  /**
    * Set data in the DOM element.
    *
    * This method will use jQuery's `data()` method if it is available, otherwise it will set the `data-` attribute
    * @param {Element} element - the element to set the data in
    * @param {string} name - the name of the data item
    * @param {*} value - the value to be set
    *
   */
  setData = function(element, name, value) {
    return jQuery(element).data(name, value);
  };

  /**
    * Get attribute from the DOM element.
    *
    * This method will use jQuery's `attr()` method if it is available, otherwise it will get the attribute directly
    * @param {Element} element - the element to set the attribute for
    * @param {string} name - the name of the attribute
    * @returns {*} the value of the attribute
    *
   */
  getAttribute = function(element, name) {
    return jQuery(element).attr(name);
  };

  /**
    * Set attribute in the DOM element.
    *
    * This method will use jQuery's `attr()` method if it is available, otherwise it will set the attribute directly
    * @param {Element} element - the element to set the attribute for
    * @param {string} name - the name of the attribute
    * @param {*} value - the value to be set
    *
   */
  setAttribute = function(element, name, value) {
    return jQuery(element).attr(name, value);
  };
  removeAttribute = function(element, name) {
    return jQuery(element).removeAttr(name);
  };
  setAttributes = function(element, attributes) {
    return jQuery(element).attr(attributes);
  };
  hasClass = function(element, name) {
    return jQuery(element).hasClass(name);
  };
  addClass = function(element, name) {
    return jQuery(element).addClass(name);
  };
  width = function(element) {
    return jQuery(element).width();
  };
  isEmpty = function(item) {
    return (item == null) || (jQuery.isArray(item) || Util.isString(item)) && item.length === 0 || (jQuery.isPlainObject(item) && jQuery.isEmptyObject(item));
  };
  isString = function(item) {
    return typeof item === 'string' || (item != null ? item.toString() : void 0) === '[object String]';
  };
  merge = function() {
    var args, i;
    args = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = arguments.length; j < len; j++) {
        i = arguments[j];
        results.push(i);
      }
      return results;
    }).apply(this, arguments);
    args.unshift(true);
    return jQuery.extend.apply(this, args);
  };
  compact = function(arr) {
    var item, j, len, results;
    results = [];
    for (j = 0, len = arr.length; j < len; j++) {
      item = arr[j];
      if (item) {
        results.push(item);
      }
    }
    return results;
  };
  cloneDeep = function() {
    var args;
    args = jQuery.makeArray(arguments);
    args.unshift({});
    args.unshift(true);
    return jQuery.extend.apply(this, args);
  };
  contains = function(arr, item) {
    var i, j, len;
    for (j = 0, len = arr.length; j < len; j++) {
      i = arr[j];
      if (i === item) {
        return true;
      }
    }
    return false;
  };
  difference = function(arr, values) {
    var item, j, len, results;
    results = [];
    for (j = 0, len = arr.length; j < len; j++) {
      item = arr[j];
      if (!contains(values, item)) {
        results.push(item);
      }
    }
    return results;
  };
  functions = function(object) {
    var i, results;
    results = [];
    for (i in object) {
      if (jQuery.isFunction(object[i])) {
        results.push(i);
      }
    }
    return results;
  };
  identity = function(value) {
    return value;
  };

  /**
   * @class Util
   */
  Util = jQuery.extend(BaseUtil, {
    hasClass: hasClass,
    addClass: addClass,
    getAttribute: getAttribute,
    setAttribute: setAttribute,
    removeAttribute: removeAttribute,
    setAttributes: setAttributes,
    getData: getData,
    setData: setData,
    width: width,
    isString: isString,
    isArray: jQuery.isArray,
    isEmpty: isEmpty,

    /**
     * Assign source properties to destination.
     * If the property is an object it is assigned as a whole, overriding the destination object.
     * @param {Object} destination - the object to assign to
     */
    assign: jQuery.extend,

    /**
     * Recursively assign source properties to destination
    * @param {Object} destination - the object to assign to
     * @param {...Object} [sources] The source objects.
     */
    merge: merge,

    /**
     * Create a new copy of the given object, including all internal objects.
     * @param {Object} value - the object to clone
     * @return {Object} a new deep copy of the object
     */
    cloneDeep: cloneDeep,

    /**
     * Creates a new array from the parameter with "falsey" values removed
     * @param {Array} array - the array to remove values from
     * @return {Array} a new array without falsey values
     */
    compact: compact,

    /**
     * Check if a given item is included in the given array
     * @param {Array} array - the array to search in
     * @param {*} item - the item to search for
     * @return {boolean} true if the item is included in the array
     */
    contains: contains,

    /**
     * Returns values in the given array that are not included in the other array
     * @param {Array} arr - the array to select from
     * @param {Array} values - values to filter from arr
     * @return {Array} the filtered values
     */
    difference: difference,

    /**
     * Returns true if argument is a function.
     * @param {*} value - the value to check
     * @return {boolean} true if the value is a function
     */
    isFunction: jQuery.isFunction,

    /**
     * Returns a list of all the function names in obj
     * @param {Object} object - the object to inspect
     * @return {Array} a list of functions of object
     */
    functions: functions,

    /**
     * Returns the provided value. This functions is used as a default predicate function.
     * @param {*} value
     * @return {*} the provided value
     */
    identity: identity,
    isPlainObject: jQuery.isPlainObject,

    /**
     * Remove leading or trailing spaces from text
     * @param {string} text
     * @return {string} the `text` without leading or trailing spaces
     */
    trim: jQuery.trim
  });

  /**
   * UTF8 encoder
   *
   */
  utf8_encode = function(argString) {
    var c1, enc, end, n, start, string, stringl, utftext;
    if (argString === null || typeof argString === 'undefined') {
      return '';
    }
    string = argString + '';
    utftext = '';
    start = void 0;
    end = void 0;
    stringl = 0;
    start = end = 0;
    stringl = string.length;
    n = 0;
    while (n < stringl) {
      c1 = string.charCodeAt(n);
      enc = null;
      if (c1 < 128) {
        end++;
      } else if (c1 > 127 && c1 < 2048) {
        enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
      } else {
        enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.slice(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
      n++;
    }
    if (end > start) {
      utftext += string.slice(start, stringl);
    }
    return utftext;
  };

  /**
   * CRC32 calculator
   * Depends on 'utf8_encode'
   */
  crc32 = function(str) {
    var crc, i, iTop, table, x, y;
    str = utf8_encode(str);
    table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    crc = 0;
    x = 0;
    y = 0;
    crc = crc ^ -1;
    i = 0;
    iTop = str.length;
    while (i < iTop) {
      y = (crc ^ str.charCodeAt(i)) & 0xFF;
      x = '0x' + table.substr(y * 9, 8);
      crc = crc >>> 8 ^ x;
      i++;
    }
    crc = crc ^ -1;
    if (crc < 0) {
      crc += 4294967296;
    }
    return crc;
  };
  Layer = (function() {

    /**
     * Layer
     * @constructor Layer
     * @param {Object} options - layer parameters
     */
    function Layer(options) {
      this.options = {};
      if (options != null) {
        ["resourceType", "type", "publicId", "format"].forEach((function(_this) {
          return function(key) {
            var ref;
            return _this.options[key] = (ref = options[key]) != null ? ref : options[Util.snakeCase(key)];
          };
        })(this));
      }
    }

    Layer.prototype.resourceType = function(value) {
      this.options.resourceType = value;
      return this;
    };

    Layer.prototype.type = function(value) {
      this.options.type = value;
      return this;
    };

    Layer.prototype.publicId = function(value) {
      this.options.publicId = value;
      return this;
    };


    /**
     * Get the public ID, formatted for layer parameter
     * @function Layer#getPublicId
     * @return {String} public ID
     */

    Layer.prototype.getPublicId = function() {
      var ref;
      return (ref = this.options.publicId) != null ? ref.replace(/\//g, ":") : void 0;
    };


    /**
     * Get the public ID, with format if present
     * @function Layer#getFullPublicId
     * @return {String} public ID
     */

    Layer.prototype.getFullPublicId = function() {
      if (this.options.format != null) {
        return this.getPublicId() + "." + this.options.format;
      } else {
        return this.getPublicId();
      }
    };

    Layer.prototype.format = function(value) {
      this.options.format = value;
      return this;
    };


    /**
     * generate the string representation of the layer
     * @function Layer#toString
     */

    Layer.prototype.toString = function() {
      var components;
      components = [];
      if (this.options.publicId == null) {
        throw "Must supply publicId";
      }
      if (!(this.options.resourceType === "image")) {
        components.push(this.options.resourceType);
      }
      if (!(this.options.type === "upload")) {
        components.push(this.options.type);
      }
      components.push(this.getFullPublicId());
      return Util.compact(components).join(":");
    };

    return Layer;

  })();
  TextLayer = (function(superClass) {
    extend(TextLayer, superClass);


    /**
     * @constructor TextLayer
     * @param {Object} options - layer parameters
     */

    function TextLayer(options) {
      var keys;
      TextLayer.__super__.constructor.call(this, options);
      keys = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "text"];
      if (options != null) {
        keys.forEach((function(_this) {
          return function(key) {
            var ref;
            return _this.options[key] = (ref = options[key]) != null ? ref : options[Util.snakeCase(key)];
          };
        })(this));
      }
      this.options.resourceType = "text";
    }

    TextLayer.prototype.resourceType = function(resourceType) {
      throw "Cannot modify resourceType for text layers";
    };

    TextLayer.prototype.type = function(type) {
      throw "Cannot modify type for text layers";
    };

    TextLayer.prototype.format = function(format) {
      throw "Cannot modify format for text layers";
    };

    TextLayer.prototype.fontFamily = function(fontFamily) {
      this.options.fontFamily = fontFamily;
      return this;
    };

    TextLayer.prototype.fontSize = function(fontSize) {
      this.options.fontSize = fontSize;
      return this;
    };

    TextLayer.prototype.fontWeight = function(fontWeight) {
      this.options.fontWeight = fontWeight;
      return this;
    };

    TextLayer.prototype.fontStyle = function(fontStyle) {
      this.options.fontStyle = fontStyle;
      return this;
    };

    TextLayer.prototype.textDecoration = function(textDecoration) {
      this.options.textDecoration = textDecoration;
      return this;
    };

    TextLayer.prototype.textAlign = function(textAlign) {
      this.options.textAlign = textAlign;
      return this;
    };

    TextLayer.prototype.stroke = function(stroke) {
      this.options.stroke = stroke;
      return this;
    };

    TextLayer.prototype.letterSpacing = function(letterSpacing) {
      this.options.letterSpacing = letterSpacing;
      return this;
    };

    TextLayer.prototype.lineSpacing = function(lineSpacing) {
      this.options.lineSpacing = lineSpacing;
      return this;
    };

    TextLayer.prototype.text = function(text) {
      this.options.text = text;
      return this;
    };


    /**
     * generate the string representation of the layer
     * @function TextLayer#toString
     * @return {String}
     */

    TextLayer.prototype.toString = function() {
      var components, hasPublicId, hasStyle, publicId, re, res, start, style, text, textSource;
      style = this.textStyleIdentifier();
      if (this.options.publicId != null) {
        publicId = this.getFullPublicId();
      }
      if (this.options.text != null) {
        hasPublicId = !Util.isEmpty(publicId);
        hasStyle = !Util.isEmpty(style);
        if (hasPublicId && hasStyle || !hasPublicId && !hasStyle) {
          throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
        }
        re = /\$\([a-zA-Z]\w*\)/g;
        start = 0;
        textSource = Util.smartEscape(this.options.text, /[,\/]/g);
        text = "";
        while (res = re.exec(textSource)) {
          text += Util.smartEscape(textSource.slice(start, res.index));
          text += res[0];
          start = res.index + res[0].length;
        }
        text += Util.smartEscape(textSource.slice(start));
      }
      components = [this.options.resourceType, style, publicId, text];
      return Util.compact(components).join(":");
    };

    TextLayer.prototype.textStyleIdentifier = function() {
      var components;
      components = [];
      if (this.options.fontWeight !== "normal") {
        components.push(this.options.fontWeight);
      }
      if (this.options.fontStyle !== "normal") {
        components.push(this.options.fontStyle);
      }
      if (this.options.textDecoration !== "none") {
        components.push(this.options.textDecoration);
      }
      components.push(this.options.textAlign);
      if (this.options.stroke !== "none") {
        components.push(this.options.stroke);
      }
      if (!(Util.isEmpty(this.options.letterSpacing) && !Util.isNumberLike(this.options.letterSpacing))) {
        components.push("letter_spacing_" + this.options.letterSpacing);
      }
      if (!(Util.isEmpty(this.options.lineSpacing) && !Util.isNumberLike(this.options.lineSpacing))) {
        components.push("line_spacing_" + this.options.lineSpacing);
      }
      if (!Util.isEmpty(Util.compact(components))) {
        if (Util.isEmpty(this.options.fontFamily)) {
          throw "Must supply fontFamily. " + components;
        }
        if (Util.isEmpty(this.options.fontSize) && !Util.isNumberLike(this.options.fontSize)) {
          throw "Must supply fontSize.";
        }
      }
      components.unshift(this.options.fontFamily, this.options.fontSize);
      components = Util.compact(components).join("_");
      return components;
    };

    return TextLayer;

  })(Layer);
  SubtitlesLayer = (function(superClass) {
    extend(SubtitlesLayer, superClass);


    /**
     * Represent a subtitles layer
     * @constructor SubtitlesLayer
     * @param {Object} options - layer parameters
     */

    function SubtitlesLayer(options) {
      SubtitlesLayer.__super__.constructor.call(this, options);
      this.options.resourceType = "subtitles";
    }

    return SubtitlesLayer;

  })(TextLayer);

  /**
   * Transformation parameters
   * Depends on 'util', 'transformation'
   */
  Param = (function() {

    /**
     * Represents a single parameter
     * @class Param
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} shortName - The name of the serialized form of the parameter.
     *                         If a value is not provided, the parameter will not be serialized.
     * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
     * @ignore
     */
    function Param(name, shortName, process) {
      if (process == null) {
        process = cloudinary.Util.identity;
      }

      /**
       * The name of the parameter in snake_case
       * @member {string} Param#name
       */
      this.name = name;

      /**
       * The name of the serialized form of the parameter
       * @member {string} Param#shortName
       */
      this.shortName = shortName;

      /**
       * Manipulate origValue when value is called
       * @member {function} Param#process
       */
      this.process = process;
    }


    /**
     * Set a (unprocessed) value for this parameter
     * @function Param#set
     * @param {*} origValue - the value of the parameter
     * @return {Param} self for chaining
     */

    Param.prototype.set = function(origValue) {
      this.origValue = origValue;
      return this;
    };


    /**
     * Generate the serialized form of the parameter
     * @function Param#serialize
     * @return {string} the serialized form of the parameter
     */

    Param.prototype.serialize = function() {
      var val, valid;
      val = this.value();
      valid = cloudinary.Util.isArray(val) || cloudinary.Util.isPlainObject(val) || cloudinary.Util.isString(val) ? !cloudinary.Util.isEmpty(val) : val != null;
      if ((this.shortName != null) && valid) {
        return this.shortName + "_" + val;
      } else {
        return '';
      }
    };


    /**
     * Return the processed value of the parameter
     * @function Param#value
     */

    Param.prototype.value = function() {
      return this.process(this.origValue);
    };

    Param.norm_color = function(value) {
      return value != null ? value.replace(/^#/, 'rgb:') : void 0;
    };

    Param.prototype.build_array = function(arg) {
      if (arg == null) {
        arg = [];
      }
      if (cloudinary.Util.isArray(arg)) {
        return arg;
      } else {
        return [arg];
      }
    };


    /**
    * Covert value to video codec string.
    *
    * If the parameter is an object,
    * @param {(string|Object)} param - the video codec as either a String or a Hash
    * @return {string} the video codec string in the format codec:profile:level
    * @example
    * vc_[ :profile : [level]]
    * or
      { codec: 'h264', profile: 'basic', level: '3.1' }
    * @ignore
     */

    Param.process_video_params = function(param) {
      var video;
      switch (param.constructor) {
        case Object:
          video = "";
          if ('codec' in param) {
            video = param['codec'];
            if ('profile' in param) {
              video += ":" + param['profile'];
              if ('level' in param) {
                video += ":" + param['level'];
              }
            }
          }
          return video;
        case String:
          return param;
        default:
          return null;
      }
    };

    return Param;

  })();
  ArrayParam = (function(superClass) {
    extend(ArrayParam, superClass);


    /**
     * A parameter that represents an array
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} shortName - The name of the serialized form of the parameter
     *                         If a value is not provided, the parameter will not be serialized.
     * @param {string} [sep='.'] - The separator to use when joining the array elements together
     * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
     * @class ArrayParam
     * @extends Param
     * @ignore
     */

    function ArrayParam(name, shortName, sep, process) {
      if (sep == null) {
        sep = '.';
      }
      this.sep = sep;
      ArrayParam.__super__.constructor.call(this, name, shortName, process);
    }

    ArrayParam.prototype.serialize = function() {
      var arrayValue, flat, t;
      if (this.shortName != null) {
        arrayValue = this.value();
        if (cloudinary.Util.isEmpty(arrayValue)) {
          return '';
        } else if (cloudinary.Util.isString(arrayValue)) {
          return this.shortName + "_" + arrayValue;
        } else {
          flat = (function() {
            var j, len, results;
            results = [];
            for (j = 0, len = arrayValue.length; j < len; j++) {
              t = arrayValue[j];
              if (cloudinary.Util.isFunction(t.serialize)) {
                results.push(t.serialize());
              } else {
                results.push(t);
              }
            }
            return results;
          })();
          return this.shortName + "_" + (flat.join(this.sep));
        }
      } else {
        return '';
      }
    };

    ArrayParam.prototype.value = function() {
      var j, len, ref, results, v;
      if (cloudinary.Util.isArray(this.origValue)) {
        ref = this.origValue;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          results.push(this.process(v));
        }
        return results;
      } else {
        return this.process(this.origValue);
      }
    };

    ArrayParam.prototype.set = function(origValue) {
      if ((origValue == null) || cloudinary.Util.isArray(origValue)) {
        return ArrayParam.__super__.set.call(this, origValue);
      } else {
        return ArrayParam.__super__.set.call(this, [origValue]);
      }
    };

    return ArrayParam;

  })(Param);
  TransformationParam = (function(superClass) {
    extend(TransformationParam, superClass);


    /**
     * A parameter that represents a transformation
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} [shortName='t'] - The name of the serialized form of the parameter
     * @param {string} [sep='.'] - The separator to use when joining the array elements together
     * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
     * @class TransformationParam
     * @extends Param
     * @ignore
     */

    function TransformationParam(name, shortName, sep, process) {
      if (shortName == null) {
        shortName = "t";
      }
      if (sep == null) {
        sep = '.';
      }
      this.sep = sep;
      TransformationParam.__super__.constructor.call(this, name, shortName, process);
    }

    TransformationParam.prototype.serialize = function() {
      var joined, result, t;
      if (cloudinary.Util.isEmpty(this.value())) {
        return '';
      } else if (cloudinary.Util.allStrings(this.value())) {
        joined = this.value().join(this.sep);
        if (!cloudinary.Util.isEmpty(joined)) {
          return this.shortName + "_" + joined;
        } else {
          return '';
        }
      } else {
        result = (function() {
          var j, len, ref, results;
          ref = this.value();
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            t = ref[j];
            if (t != null) {
              if (cloudinary.Util.isString(t) && !cloudinary.Util.isEmpty(t)) {
                results.push(this.shortName + "_" + t);
              } else if (cloudinary.Util.isFunction(t.serialize)) {
                results.push(t.serialize());
              } else if (cloudinary.Util.isPlainObject(t) && !cloudinary.Util.isEmpty(t)) {
                results.push(new Transformation(t).serialize());
              } else {
                results.push(void 0);
              }
            }
          }
          return results;
        }).call(this);
        return cloudinary.Util.compact(result);
      }
    };

    TransformationParam.prototype.set = function(origValue1) {
      this.origValue = origValue1;
      if (cloudinary.Util.isArray(this.origValue)) {
        return TransformationParam.__super__.set.call(this, this.origValue);
      } else {
        return TransformationParam.__super__.set.call(this, [this.origValue]);
      }
    };

    return TransformationParam;

  })(Param);
  RangeParam = (function(superClass) {
    extend(RangeParam, superClass);


    /**
     * A parameter that represents a range
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} shortName - The name of the serialized form of the parameter
     *                         If a value is not provided, the parameter will not be serialized.
     * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
     * @class RangeParam
     * @extends Param
     * @ignore
     */

    function RangeParam(name, shortName, process) {
      if (process == null) {
        process = this.norm_range_value;
      }
      RangeParam.__super__.constructor.call(this, name, shortName, process);
    }

    RangeParam.norm_range_value = function(value) {
      var modifier, offset;
      offset = String(value).match(new RegExp('^' + offset_any_pattern + '$'));
      if (offset) {
        modifier = offset[5] != null ? 'p' : '';
        value = (offset[1] || offset[4]) + modifier;
      }
      return value;
    };

    return RangeParam;

  })(Param);
  RawParam = (function(superClass) {
    extend(RawParam, superClass);

    function RawParam(name, shortName, process) {
      if (process == null) {
        process = cloudinary.Util.identity;
      }
      RawParam.__super__.constructor.call(this, name, shortName, process);
    }

    RawParam.prototype.serialize = function() {
      return this.value();
    };

    return RawParam;

  })(Param);
  LayerParam = (function(superClass) {
    var LAYER_KEYWORD_PARAMS;

    extend(LayerParam, superClass);

    function LayerParam() {
      return LayerParam.__super__.constructor.apply(this, arguments);
    }

    LayerParam.prototype.value = function() {
      var layerOptions, result;
      layerOptions = this.origValue;
      if (cloudinary.Util.isPlainObject(layerOptions)) {
        if (layerOptions.resource_type === "text" || (layerOptions.text != null)) {
          result = new cloudinary.TextLayer(layerOptions).toString();
        } else if (layerOptions.resource_type === "subtitles") {
          result = new cloudinary.SubtitlesLayer(layerOptions).toString();
        } else {
          result = new cloudinary.Layer(layerOptions).toString();
        }
      } else {
        result = layerOptions;
      }
      return result;
    };

    LAYER_KEYWORD_PARAMS = [["font_weight", "normal"], ["font_style", "normal"], ["text_decoration", "none"], ["text_align", null], ["stroke", "none"], ["letter_spacing", null], ["line_spacing", null]];

    LayerParam.prototype.textStyle = function(layer) {
      return (new cloudinary.TextLayer(layer)).textStyleIdentifier();
    };

    return LayerParam;

  })(Param);
  ExpressionParam = (function(superClass) {
    extend(ExpressionParam, superClass);

    function ExpressionParam() {
      return ExpressionParam.__super__.constructor.apply(this, arguments);
    }

    ExpressionParam.prototype.serialize = function() {
      return Expression.normalize(ExpressionParam.__super__.serialize.call(this));
    };

    return ExpressionParam;

  })(Param);
  parameters = {};
  parameters.Param = Param;
  parameters.ArrayParam = ArrayParam;
  parameters.RangeParam = RangeParam;
  parameters.RawParam = RawParam;
  parameters.TransformationParam = TransformationParam;
  parameters.LayerParam = LayerParam;
  parameters.ExpressionParam = ExpressionParam;
  Expression = (function() {

    /**
     * @internal
     */
    var faceCount;

    Expression.OPERATORS = {
      "=": 'eq',
      "!=": 'ne',
      "<": 'lt',
      ">": 'gt',
      "<=": 'lte',
      ">=": 'gte',
      "&&": 'and',
      "||": 'or',
      "*": "mul",
      "/": "div",
      "+": "add",
      "-": "sub"
    };


    /**
     * @internal
     */

    Expression.PREDEFINED_VARS = {
      "aspect_ratio": "ar",
      "aspectRatio": "ar",
      "current_page": "cp",
      "currentPage": "cp",
      "face_count": "fc",
      "faceCount": "fc",
      "height": "h",
      "initial_aspect_ratio": "iar",
      "initial_height": "ih",
      "initial_width": "iw",
      "initialAspectRatio": "iar",
      "initialHeight": "ih",
      "initialWidth": "iw",
      "page_count": "pc",
      "page_x": "px",
      "page_y": "py",
      "pageCount": "pc",
      "pageX": "px",
      "pageY": "py",
      "tags": "tags",
      "width": "w"
    };


    /**
     * @internal
     */

    Expression.BOUNDRY = "[ _]+";


    /**
     * Represents a transformation expression
     * @param {string} expressionStr - a expression in string format
     * @class Expression
     *
     */

    function Expression(expressionStr) {

      /**
        * @protected
        * @inner Expression-expressions
       */
      this.expressions = [];
      if (expressionStr != null) {
        this.expressions.push(Expression.normalize(expressionStr));
      }
    }


    /**
     * Convenience constructor method
     * @function Expression.new
     */

    Expression["new"] = function(expressionStr) {
      return new this(expressionStr);
    };


    /**
     * Normalize a string expression
     * @function Cloudinary#normalize
     * @param {string} expression a expression, e.g. "w gt 100", "width_gt_100", "width > 100"
     * @return {string} the normalized form of the value expression, e.g. "w_gt_100"
     */

    Expression.normalize = function(expression) {
      var operators, pattern, replaceRE;
      if (expression == null) {
        return expression;
      }
      expression = String(expression);
      operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*";
      pattern = "((" + operators + ")(?=[ _])|" + Object.keys(Expression.PREDEFINED_VARS).join("|") + ")";
      replaceRE = new RegExp(pattern, "g");
      expression = expression.replace(replaceRE, function(match) {
        return Expression.OPERATORS[match] || Expression.PREDEFINED_VARS[match];
      });
      return expression.replace(/[ _]+/g, '_');
    };


    /**
     * Serialize the expression
     * @return {string} the expression as a string
     */

    Expression.prototype.serialize = function() {
      return Expression.normalize(this.expressions.join("_"));
    };

    Expression.prototype.toString = function() {
      return this.serialize();
    };


    /**
     * Get the parent transformation of this expression
     * @return Transformation
     */

    Expression.prototype.getParent = function() {
      return this.parent;
    };


    /**
     * Set the parent transformation of this expression
     * @param {Transformation} the parent transformation
     * @return {Expression} this expression
     */

    Expression.prototype.setParent = function(parent) {
      this.parent = parent;
      return this;
    };


    /**
     * Add a expression
     * @function Expression#predicate
     * @internal
     */

    Expression.prototype.predicate = function(name, operator, value) {
      if (Expression.OPERATORS[operator] != null) {
        operator = Expression.OPERATORS[operator];
      }
      this.expressions.push(name + "_" + operator + "_" + value);
      return this;
    };


    /**
     * @function Expression#and
     */

    Expression.prototype.and = function() {
      this.expressions.push("and");
      return this;
    };


    /**
     * @function Expression#or
     */

    Expression.prototype.or = function() {
      this.expressions.push("or");
      return this;
    };


    /**
     * Conclude expression
     * @function Expression#then
     * @return {Transformation} the transformation this expression is defined for
     */

    Expression.prototype.then = function() {
      return this.getParent()["if"](this.toString());
    };


    /**
     * @function Expression#height
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

    Expression.prototype.height = function(operator, value) {
      return this.predicate("h", operator, value);
    };


    /**
     * @function Expression#width
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

    Expression.prototype.width = function(operator, value) {
      return this.predicate("w", operator, value);
    };


    /**
     * @function Expression#aspectRatio
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

    Expression.prototype.aspectRatio = function(operator, value) {
      return this.predicate("ar", operator, value);
    };


    /**
     * @function Expression#pages
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

    Expression.prototype.pageCount = function(operator, value) {
      return this.predicate("pc", operator, value);
    };


    /**
     * @function Expression#faces
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

    Expression.prototype.faceCount = function(operator, value) {
      return this.predicate("fc", operator, value);
    };

    Expression.prototype.value = function(value) {
      this.expressions.push(value);
      return this;
    };


    /**
     */

    Expression.variable = function(name, value) {
      return new this(name).value(value);
    };


    /**
      * @returns a new expression with the predefined variable "width"
      * @function Expression.width
     */

    Expression.width = function() {
      return new this("width");
    };


    /**
      * @returns a new expression with the predefined variable "height"
      * @function Expression.height
     */

    Expression.height = function() {
      return new this("height");
    };


    /**
      * @returns a new expression with the predefined variable "initialWidth"
      * @function Expression.initialWidth
     */

    Expression.initialWidth = function() {
      return new this("initialWidth");
    };


    /**
      * @returns a new expression with the predefined variable "initialHeight"
      * @function Expression.initialHeight
     */

    Expression.initialHeight = function() {
      return new this("initialHeight");
    };


    /**
      * @returns a new expression with the predefined variable "aspectRatio"
      * @function Expression.aspectRatio
     */

    Expression.aspectRatio = function() {
      return new this("aspectRatio");
    };


    /**
      * @returns a new expression with the predefined variable "initialAspectRatio"
      * @function Expression.initialAspectRatio
     */

    Expression.initialAspectRatio = function() {
      return new this("initialAspectRatio");
    };


    /**
      * @returns a new expression with the predefined variable "pageCount"
      * @function Expression.pageCount
     */

    Expression.pageCount = function() {
      return new this("pageCount");
    };


    /**
      * @returns a new expression with the predefined variable "faceCount"
      * @function Expression.faceCount
     */

    faceCount = function() {
      return new this("faceCount");
    };


    /**
      * @returns a new expression with the predefined variable "currentPage"
      * @function Expression.currentPage
     */

    Expression.currentPage = function() {
      return new this("currentPage");
    };


    /**
      * @returns a new expression with the predefined variable "tags"
      * @function Expression.tags
     */

    Expression.tags = function() {
      return new this("tags");
    };


    /**
      * @returns a new expression with the predefined variable "pageX"
      * @function Expression.pageX
     */

    Expression.pageX = function() {
      return new this("pageX");
    };


    /**
      * @returns a new expression with the predefined variable "pageY"
      * @function Expression.pageY
     */

    Expression.pageY = function() {
      return new this("pageY");
    };

    return Expression;

  })();
  Condition = (function(superClass) {
    extend(Condition, superClass);


    /**
     * Represents a transformation condition
     * @param {string} conditionStr - a condition in string format
     * @class Condition
     * @example
     * // normally this class is not instantiated directly
     * var tr = cloudinary.Transformation.new()
     *    .if().width( ">", 1000).and().aspectRatio("<", "3:4").then()
     *      .width(1000)
     *      .crop("scale")
     *    .else()
     *      .width(500)
     *      .crop("scale")
     *
     * var tr = cloudinary.Transformation.new()
     *    .if("w > 1000 and aspectRatio < 3:4")
     *      .width(1000)
     *      .crop("scale")
     *    .else()
     *      .width(500)
     *      .crop("scale")
     *
     */

    function Condition(conditionStr) {
      Condition.__super__.constructor.call(this, conditionStr);
    }


    /**
     * @function Condition#height
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.height = function(operator, value) {
      return this.predicate("h", operator, value);
    };


    /**
     * @function Condition#width
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.width = function(operator, value) {
      return this.predicate("w", operator, value);
    };


    /**
     * @function Condition#aspectRatio
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.aspectRatio = function(operator, value) {
      return this.predicate("ar", operator, value);
    };


    /**
     * @function Condition#pages
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.pageCount = function(operator, value) {
      return this.predicate("pc", operator, value);
    };


    /**
     * @function Condition#faces
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.faceCount = function(operator, value) {
      return this.predicate("fc", operator, value);
    };

    return Condition;

  })(Expression);

  /**
   * Cloudinary configuration class
   * Depends on 'utils'
   */
  Configuration = (function() {

    /**
     * Defaults configuration.
     */
    var DEFAULT_CONFIGURATION_PARAMS, ref;

    DEFAULT_CONFIGURATION_PARAMS = {
      responsive_class: 'cld-responsive',
      responsive_use_breakpoints: true,
      round_dpr: true,
      secure: (typeof window !== "undefined" && window !== null ? (ref = window.location) != null ? ref.protocol : void 0 : void 0) === 'https:'
    };

    Configuration.CONFIG_PARAMS = ["api_key", "api_secret", "callback", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive", "responsive_class", "responsive_use_breakpoints", "responsive_width", "round_dpr", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "upload_preset", "url_suffix", "use_root_path", "version"];


    /**
     * Cloudinary configuration class
     * @constructor Configuration
     * @param {Object} options - configuration parameters
     */

    function Configuration(options) {
      if (options == null) {
        options = {};
      }
      this.configuration = Util.cloneDeep(options);
      Util.defaults(this.configuration, DEFAULT_CONFIGURATION_PARAMS);
    }


    /**
     * Initialize the configuration.
     * The function first tries to retrieve the configuration form the environment and then from the document.
     * @function Configuration#init
     * @return {Configuration} returns this for chaining
     * @see fromDocument
     * @see fromEnvironment
     */

    Configuration.prototype.init = function() {
      this.fromEnvironment();
      this.fromDocument();
      return this;
    };


    /**
     * Set a new configuration item
     * @function Configuration#set
     * @param {string} name - the name of the item to set
     * @param {*} value - the value to be set
     * @return {Configuration}
     *
     */

    Configuration.prototype.set = function(name, value) {
      this.configuration[name] = value;
      return this;
    };


    /**
     * Get the value of a configuration item
     * @function Configuration#get
     * @param {string} name - the name of the item to set
     * @return {*} the configuration item
     */

    Configuration.prototype.get = function(name) {
      return this.configuration[name];
    };

    Configuration.prototype.merge = function(config) {
      if (config == null) {
        config = {};
      }
      Util.assign(this.configuration, Util.cloneDeep(config));
      return this;
    };


    /**
     * Initialize Cloudinary from HTML meta tags.
     * @function Configuration#fromDocument
     * @return {Configuration}
     * @example <meta name="cloudinary_cloud_name" content="mycloud">
     *
     */

    Configuration.prototype.fromDocument = function() {
      var el, j, len, meta_elements;
      meta_elements = typeof document !== "undefined" && document !== null ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0;
      if (meta_elements) {
        for (j = 0, len = meta_elements.length; j < len; j++) {
          el = meta_elements[j];
          this.configuration[el.getAttribute('name').replace('cloudinary_', '')] = el.getAttribute('content');
        }
      }
      return this;
    };


    /**
     * Initialize Cloudinary from the `CLOUDINARY_URL` environment variable.
     *
     * This function will only run under Node.js environment.
     * @function Configuration#fromEnvironment
     * @requires Node.js
     */

    Configuration.prototype.fromEnvironment = function() {
      var cloudinary_url, j, k, len, query, ref1, ref2, ref3, uri, uriRegex, v, value;
      cloudinary_url = typeof process !== "undefined" && process !== null ? (ref1 = process.env) != null ? ref1.CLOUDINARY_URL : void 0 : void 0;
      if (cloudinary_url != null) {
        uriRegex = /cloudinary:\/\/(?:(\w+)(?:\:(\w+))?@)?([\w\.-]+)(?:\/([^?]*))?(?:\?(.+))?/;
        uri = uriRegex.exec(cloudinary_url);
        if (uri) {
          if (uri[3] != null) {
            this.configuration['cloud_name'] = uri[3];
          }
          if (uri[1] != null) {
            this.configuration['api_key'] = uri[1];
          }
          if (uri[2] != null) {
            this.configuration['api_secret'] = uri[2];
          }
          if (uri[4] != null) {
            this.configuration['private_cdn'] = uri[4] != null;
          }
          if (uri[4] != null) {
            this.configuration['secure_distribution'] = uri[4];
          }
          query = uri[5];
          if (query != null) {
            ref2 = query.split('&');
            for (j = 0, len = ref2.length; j < len; j++) {
              value = ref2[j];
              ref3 = value.split('='), k = ref3[0], v = ref3[1];
              if (v == null) {
                v = true;
              }
              this.configuration[k] = v;
            }
          }
        }
      }
      return this;
    };


    /**
     * Create or modify the Cloudinary client configuration
     *
     * Warning: `config()` returns the actual internal configuration object. modifying it will change the configuration.
     *
     * This is a backward compatibility method. For new code, use get(), merge() etc.
     * @function Configuration#config
     * @param {hash|string|boolean} new_config
     * @param {string} new_value
     * @returns {*} configuration, or value
     *
     * @see {@link fromEnvironment} for initialization using environment variables
     * @see {@link fromDocument} for initialization using HTML meta tags
     */

    Configuration.prototype.config = function(new_config, new_value) {
      switch (false) {
        case new_value === void 0:
          this.set(new_config, new_value);
          return this.configuration;
        case !Util.isString(new_config):
          return this.get(new_config);
        case !Util.isPlainObject(new_config):
          this.merge(new_config);
          return this.configuration;
        default:
          return this.configuration;
      }
    };


    /**
     * Returns a copy of the configuration parameters
     * @function Configuration#toOptions
     * @returns {Object} a key:value collection of the configuration parameters
     */

    Configuration.prototype.toOptions = function() {
      return Util.cloneDeep(this.configuration);
    };

    return Configuration;

  })();

  /**
   * TransformationBase
   * Depends on 'configuration', 'parameters','util'
   * @internal
   */
  TransformationBase = (function() {
    var VAR_NAME_RE, lastArgCallback, processVar;

    VAR_NAME_RE = /^\$[a-zA-Z0-9]+$/;

    TransformationBase.prototype.trans_separator = '/';

    TransformationBase.prototype.param_separator = ',';

    lastArgCallback = function(args) {
      var callback;
      callback = args != null ? args[args.length - 1] : void 0;
      if (Util.isFunction(callback)) {
        return callback;
      } else {
        return void 0;
      }
    };


    /**
     * The base class for transformations.
     * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
     * @class TransformationBase
     */

    function TransformationBase(options) {
      var parent, trans;
      if (options == null) {
        options = {};
      }

      /** @private */
      parent = void 0;

      /** @private */
      trans = {};

      /**
       * Return an options object that can be used to create an identical Transformation
       * @function Transformation#toOptions
       * @return {Object} Returns a plain object representing this transformation
       */
      this.toOptions || (this.toOptions = function(withChain) {
        var key, list, opt, ref, ref1, tr, value;
        if (withChain == null) {
          withChain = true;
        }
        opt = {};
        for (key in trans) {
          value = trans[key];
          opt[key] = value.origValue;
        }
        ref = this.otherOptions;
        for (key in ref) {
          value = ref[key];
          if (value !== void 0) {
            opt[key] = value;
          }
        }
        if (withChain && !Util.isEmpty(this.chained)) {
          list = (function() {
            var j, len, ref1, results;
            ref1 = this.chained;
            results = [];
            for (j = 0, len = ref1.length; j < len; j++) {
              tr = ref1[j];
              results.push(tr.toOptions());
            }
            return results;
          }).call(this);
          list.push(opt);
          opt = {};
          ref1 = this.otherOptions;
          for (key in ref1) {
            value = ref1[key];
            if (value !== void 0) {
              opt[key] = value;
            }
          }
          opt.transformation = list;
        }
        return opt;
      });

      /**
       * Set a parent for this object for chaining purposes.
       *
       * @function Transformation#setParent
       * @param {Object} object - the parent to be assigned to
       * @returns {Transformation} Returns this instance for chaining purposes.
       */
      this.setParent || (this.setParent = function(object) {
        parent = object;
        if (object != null) {
          this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
        }
        return this;
      });

      /**
       * Returns the parent of this object in the chain
       * @function Transformation#getParent
       * @protected
       * @return {Object} Returns the parent of this object if there is any
       */
      this.getParent || (this.getParent = function() {
        return parent;
      });

      /** @protected */
      this.param || (this.param = function(value, name, abbr, defaultValue, process) {
        if (process == null) {
          if (Util.isFunction(defaultValue)) {
            process = defaultValue;
          } else {
            process = Util.identity;
          }
        }
        trans[name] = new Param(name, abbr, process).set(value);
        return this;
      });

      /** @protected */
      this.rawParam || (this.rawParam = function(value, name, abbr, defaultValue, process) {
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new RawParam(name, abbr, process).set(value);
        return this;
      });

      /** @protected */
      this.rangeParam || (this.rangeParam = function(value, name, abbr, defaultValue, process) {
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new RangeParam(name, abbr, process).set(value);
        return this;
      });

      /** @protected */
      this.arrayParam || (this.arrayParam = function(value, name, abbr, sep, defaultValue, process) {
        if (sep == null) {
          sep = ":";
        }
        if (defaultValue == null) {
          defaultValue = [];
        }
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new ArrayParam(name, abbr, sep, process).set(value);
        return this;
      });

      /** @protected */
      this.transformationParam || (this.transformationParam = function(value, name, abbr, sep, defaultValue, process) {
        if (sep == null) {
          sep = ".";
        }
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new TransformationParam(name, abbr, sep, process).set(value);
        return this;
      });
      this.layerParam || (this.layerParam = function(value, name, abbr) {
        trans[name] = new LayerParam(name, abbr).set(value);
        return this;
      });

      /**
       * Get the value associated with the given name.
       * @function Transformation#getValue
       * @param {string} name - the name of the parameter
       * @return {*} the processed value associated with the given name
       * @description Use {@link get}.origValue for the value originally provided for the parameter
       */
      this.getValue || (this.getValue = function(name) {
        var ref, ref1;
        return (ref = (ref1 = trans[name]) != null ? ref1.value() : void 0) != null ? ref : this.otherOptions[name];
      });

      /**
       * Get the parameter object for the given parameter name
       * @function Transformation#get
       * @param {string} name the name of the transformation parameter
       * @returns {Param} the param object for the given name, or undefined
       */
      this.get || (this.get = function(name) {
        return trans[name];
      });

      /**
       * Remove a transformation option from the transformation.
       * @function Transformation#remove
       * @param {string} name - the name of the option to remove
       * @return {*} Returns the option that was removed or null if no option by that name was found. The type of the
       *              returned value depends on the value.
       */
      this.remove || (this.remove = function(name) {
        var temp;
        switch (false) {
          case trans[name] == null:
            temp = trans[name];
            delete trans[name];
            return temp.origValue;
          case this.otherOptions[name] == null:
            temp = this.otherOptions[name];
            delete this.otherOptions[name];
            return temp;
          default:
            return null;
        }
      });

      /**
       * Return an array of all the keys (option names) in the transformation.
       * @return {Array<string>} the keys in snakeCase format
       */
      this.keys || (this.keys = function() {
        var key;
        return ((function() {
          var results;
          results = [];
          for (key in trans) {
            if (key != null) {
              results.push(key.match(VAR_NAME_RE) ? key : Util.snakeCase(key));
            }
          }
          return results;
        })()).sort();
      });

      /**
       * Returns a plain object representation of the transformation. Values are processed.
       * @function Transformation#toPlainObject
       * @return {Object} the transformation options as plain object
       */
      this.toPlainObject || (this.toPlainObject = function() {
        var hash, key, list, tr;
        hash = {};
        for (key in trans) {
          hash[key] = trans[key].value();
          if (Util.isPlainObject(hash[key])) {
            hash[key] = Util.cloneDeep(hash[key]);
          }
        }
        if (!Util.isEmpty(this.chained)) {
          list = (function() {
            var j, len, ref, results;
            ref = this.chained;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              tr = ref[j];
              results.push(tr.toPlainObject());
            }
            return results;
          }).call(this);
          list.push(hash);
          hash = {
            transformation: list
          };
        }
        return hash;
      });

      /**
       * Complete the current transformation and chain to a new one.
       * In the URL, transformations are chained together by slashes.
       * @function Transformation#chain
       * @return {Transformation} Returns this transformation for chaining
       * @example
       * var tr = cloudinary.Transformation.new();
       * tr.width(10).crop('fit').chain().angle(15).serialize()
       * // produces "c_fit,w_10/a_15"
       */
      this.chain || (this.chain = function() {
        var names, tr;
        names = Object.getOwnPropertyNames(trans);
        if (names.length !== 0) {
          tr = new this.constructor(this.toOptions(false));
          this.resetTransformations();
          this.chained.push(tr);
        }
        return this;
      });
      this.resetTransformations || (this.resetTransformations = function() {
        trans = {};
        return this;
      });
      this.otherOptions || (this.otherOptions = {});
      this.chained = [];
      if (!Util.isEmpty(options)) {
        this.fromOptions(options);
      }
    }


    /**
     * Merge the provided options with own's options
     * @param {Object} [options={}] key-value list of options
     * @returns {Transformation} Returns this instance for chaining
     */

    TransformationBase.prototype.fromOptions = function(options) {
      var key, opt;
      if (options instanceof TransformationBase) {
        this.fromTransformation(options);
      } else {
        options || (options = {});
        if (Util.isString(options) || Util.isArray(options)) {
          options = {
            transformation: options
          };
        }
        options = Util.cloneDeep(options, function(value) {
          if (value instanceof TransformationBase) {
            return new value.constructor(value.toOptions());
          }
        });
        if (options["if"]) {
          this.set("if", options["if"]);
          delete options["if"];
        }
        for (key in options) {
          opt = options[key];
          if (key.match(VAR_NAME_RE)) {
            if (key !== '$attr') {
              this.set('variable', key, opt);
            }
          } else {
            this.set(key, opt);
          }
        }
      }
      return this;
    };

    TransformationBase.prototype.fromTransformation = function(other) {
      var j, key, len, ref;
      if (other instanceof TransformationBase) {
        ref = other.keys();
        for (j = 0, len = ref.length; j < len; j++) {
          key = ref[j];
          this.set(key, other.get(key).origValue);
        }
      }
      return this;
    };


    /**
     * Set a parameter.
     * The parameter name `key` is converted to
     * @param {string} key - the name of the parameter
     * @param {*} value - the value of the parameter
     * @returns {Transformation} Returns this instance for chaining
     */

    TransformationBase.prototype.set = function() {
      var camelKey, key, values;
      key = arguments[0], values = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      camelKey = Util.camelCase(key);
      if (Util.contains(Transformation.methods, camelKey)) {
        this[camelKey].apply(this, values);
      } else {
        this.otherOptions[key] = values[0];
      }
      return this;
    };

    TransformationBase.prototype.hasLayer = function() {
      return this.getValue("overlay") || this.getValue("underlay");
    };


    /**
     * Generate a string representation of the transformation.
     * @function Transformation#serialize
     * @return {string} Returns the transformation as a string
     */

    TransformationBase.prototype.serialize = function() {
      var ifParam, j, len, paramList, ref, ref1, ref2, ref3, ref4, resultArray, t, tr, transformationList, transformationString, transformations, value, variables, vars;
      resultArray = (function() {
        var j, len, ref, results;
        ref = this.chained;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          tr = ref[j];
          results.push(tr.serialize());
        }
        return results;
      }).call(this);
      paramList = this.keys();
      transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
      ifParam = (ref1 = this.get("if")) != null ? ref1.serialize() : void 0;
      variables = processVar((ref2 = this.get("variables")) != null ? ref2.value() : void 0);
      paramList = Util.difference(paramList, ["transformation", "if", "variables"]);
      vars = [];
      transformationList = [];
      for (j = 0, len = paramList.length; j < len; j++) {
        t = paramList[j];
        if (t.match(VAR_NAME_RE)) {
          vars.push(t + "_" + Expression.normalize((ref3 = this.get(t)) != null ? ref3.value() : void 0));
        } else {
          transformationList.push((ref4 = this.get(t)) != null ? ref4.serialize() : void 0);
        }
      }
      switch (false) {
        case !Util.isString(transformations):
          transformationList.push(transformations);
          break;
        case !Util.isArray(transformations):
          resultArray = resultArray.concat(transformations);
      }
      transformationList = (function() {
        var l, len1, results;
        results = [];
        for (l = 0, len1 = transformationList.length; l < len1; l++) {
          value = transformationList[l];
          if (Util.isArray(value) && !Util.isEmpty(value) || !Util.isArray(value) && value) {
            results.push(value);
          }
        }
        return results;
      })();
      transformationList = vars.sort().concat(variables).concat(transformationList.sort());
      if (ifParam === "if_end") {
        transformationList.push(ifParam);
      } else if (!Util.isEmpty(ifParam)) {
        transformationList.unshift(ifParam);
      }
      transformationString = Util.compact(transformationList).join(this.param_separator);
      if (!Util.isEmpty(transformationString)) {
        resultArray.push(transformationString);
      }
      return Util.compact(resultArray).join(this.trans_separator);
    };


    /**
     * Provide a list of all the valid transformation option names
     * @function Transformation#listNames
     * @private
     * @return {Array<string>} a array of all the valid option names
     */

    TransformationBase.prototype.listNames = function() {
      return Transformation.methods;
    };


    /**
     * Returns attributes for an HTML tag.
     * @function Cloudinary.toHtmlAttributes
     * @return PlainObject
     */

    TransformationBase.prototype.toHtmlAttributes = function() {
      var attrName, height, j, key, len, options, ref, ref1, ref2, ref3, value;
      options = {};
      ref = this.otherOptions;
      for (key in ref) {
        value = ref[key];
        if (!(!Util.contains(Transformation.PARAM_NAMES, Util.snakeCase(key)))) {
          continue;
        }
        attrName = /^html_/.test(key) ? key.slice(5) : key;
        options[attrName] = value;
      }
      ref1 = this.keys();
      for (j = 0, len = ref1.length; j < len; j++) {
        key = ref1[j];
        if (/^html_/.test(key)) {
          options[Util.camelCase(key.slice(5))] = this.getValue(key);
        }
      }
      if (!(this.hasLayer() || this.getValue("angle") || Util.contains(["fit", "limit", "lfill"], this.getValue("crop")))) {
        width = (ref2 = this.get("width")) != null ? ref2.origValue : void 0;
        height = (ref3 = this.get("height")) != null ? ref3.origValue : void 0;
        if (parseFloat(width) >= 1.0) {
          if (options['width'] == null) {
            options['width'] = width;
          }
        }
        if (parseFloat(height) >= 1.0) {
          if (options['height'] == null) {
            options['height'] = height;
          }
        }
      }
      return options;
    };

    TransformationBase.prototype.isValidParamName = function(name) {
      return Transformation.methods.indexOf(Util.camelCase(name)) >= 0;
    };


    /**
     * Delegate to the parent (up the call chain) to produce HTML
     * @function Transformation#toHtml
     * @return {string} HTML representation of the parent if possible.
     * @example
     * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
     * // ImageTag {name: "img", publicId: "sample"}
     * tag.toHtml()
     * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
     * tag.transformation().crop("fit").width(300).toHtml()
     * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
     */

    TransformationBase.prototype.toHtml = function() {
      var ref;
      return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
    };

    TransformationBase.prototype.toString = function() {
      return this.serialize();
    };

    processVar = function(varArray) {
      var j, len, name, ref, results, v;
      if (Util.isArray(varArray)) {
        results = [];
        for (j = 0, len = varArray.length; j < len; j++) {
          ref = varArray[j], name = ref[0], v = ref[1];
          results.push(name + "_" + (Expression.normalize(v)));
        }
        return results;
      } else {
        return varArray;
      }

      /**
       * Transformation Class methods.
       * This is a list of the parameters defined in Transformation.
       * Values are camelCased.
       * @const Transformation.methods
       * @private
       * @ignore
       * @type {Array<string>}
       */

      /**
       * Parameters that are filtered out before passing the options to an HTML tag.
       *
       * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
       * @const {Array<string>} Transformation.PARAM_NAMES
       * @private
       * @ignore
       * @see toHtmlAttributes
       */
    };

    return TransformationBase;

  })();
  Transformation = (function(superClass) {
    extend(Transformation, superClass);


    /**
     *  Represents a single transformation.
     *  @class Transformation
     *  @example
     *  t = new cloudinary.Transformation();
     * t.angle(20).crop("scale").width("auto");
     *
     * // or
     *
     * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
     */

    function Transformation(options) {
      if (options == null) {
        options = {};
      }
      Transformation.__super__.constructor.call(this, options);
      this;
    }


    /**
     * Convenience constructor
     * @param {Object} options
     * @return {Transformation}
     * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
     */

    Transformation["new"] = function(args) {
      return new Transformation(args);
    };


    /*
      Transformation Parameters
     */

    Transformation.prototype.angle = function(value) {
      return this.arrayParam(value, "angle", "a", ".", Expression.normalize);
    };

    Transformation.prototype.audioCodec = function(value) {
      return this.param(value, "audio_codec", "ac");
    };

    Transformation.prototype.audioFrequency = function(value) {
      return this.param(value, "audio_frequency", "af");
    };

    Transformation.prototype.aspectRatio = function(value) {
      return this.param(value, "aspect_ratio", "ar", Expression.normalize);
    };

    Transformation.prototype.background = function(value) {
      return this.param(value, "background", "b", Param.norm_color);
    };

    Transformation.prototype.bitRate = function(value) {
      return this.param(value, "bit_rate", "br");
    };

    Transformation.prototype.border = function(value) {
      return this.param(value, "border", "bo", function(border) {
        if (Util.isPlainObject(border)) {
          border = Util.assign({}, {
            color: "black",
            width: 2
          }, border);
          return border.width + "px_solid_" + (Param.norm_color(border.color));
        } else {
          return border;
        }
      });
    };

    Transformation.prototype.color = function(value) {
      return this.param(value, "color", "co", Param.norm_color);
    };

    Transformation.prototype.colorSpace = function(value) {
      return this.param(value, "color_space", "cs");
    };

    Transformation.prototype.crop = function(value) {
      return this.param(value, "crop", "c");
    };

    Transformation.prototype.defaultImage = function(value) {
      return this.param(value, "default_image", "d");
    };

    Transformation.prototype.delay = function(value) {
      return this.param(value, "delay", "dl");
    };

    Transformation.prototype.density = function(value) {
      return this.param(value, "density", "dn");
    };

    Transformation.prototype.duration = function(value) {
      return this.rangeParam(value, "duration", "du");
    };

    Transformation.prototype.dpr = function(value) {
      return this.param(value, "dpr", "dpr", (function(_this) {
        return function(dpr) {
          dpr = dpr.toString();
          if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
            return dpr + ".0";
          } else {
            return Expression.normalize(dpr);
          }
        };
      })(this));
    };

    Transformation.prototype.effect = function(value) {
      return this.arrayParam(value, "effect", "e", ":", Expression.normalize);
    };

    Transformation.prototype["else"] = function() {
      return this["if"]('else');
    };

    Transformation.prototype.endIf = function() {
      return this["if"]('end');
    };

    Transformation.prototype.endOffset = function(value) {
      return this.rangeParam(value, "end_offset", "eo");
    };

    Transformation.prototype.fallbackContent = function(value) {
      return this.param(value, "fallback_content");
    };

    Transformation.prototype.fetchFormat = function(value) {
      return this.param(value, "fetch_format", "f");
    };

    Transformation.prototype.format = function(value) {
      return this.param(value, "format");
    };

    Transformation.prototype.flags = function(value) {
      return this.arrayParam(value, "flags", "fl", ".");
    };

    Transformation.prototype.gravity = function(value) {
      return this.param(value, "gravity", "g");
    };

    Transformation.prototype.height = function(value) {
      return this.param(value, "height", "h", (function(_this) {
        return function() {
          if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
            return Expression.normalize(value);
          } else {
            return null;
          }
        };
      })(this));
    };

    Transformation.prototype.htmlHeight = function(value) {
      return this.param(value, "html_height");
    };

    Transformation.prototype.htmlWidth = function(value) {
      return this.param(value, "html_width");
    };

    Transformation.prototype["if"] = function(value) {
      var i, ifVal, j, ref, trIf, trRest;
      if (value == null) {
        value = "";
      }
      switch (value) {
        case "else":
          this.chain();
          return this.param(value, "if", "if");
        case "end":
          this.chain();
          for (i = j = ref = this.chained.length - 1; j >= 0; i = j += -1) {
            ifVal = this.chained[i].getValue("if");
            if (ifVal === "end") {
              break;
            } else if (ifVal != null) {
              trIf = Transformation["new"]()["if"](ifVal);
              this.chained[i].remove("if");
              trRest = this.chained[i];
              this.chained[i] = Transformation["new"]().transformation([trIf, trRest]);
              if (ifVal !== "else") {
                break;
              }
            }
          }
          return this.param(value, "if", "if");
        case "":
          return Condition["new"]().setParent(this);
        default:
          return this.param(value, "if", "if", function(value) {
            return Condition["new"](value).toString();
          });
      }
    };

    Transformation.prototype.keyframeInterval = function(value) {
      return this.param(value, "keyframe_interval", "ki");
    };

    Transformation.prototype.offset = function(value) {
      var end_o, ref, start_o;
      ref = Util.isFunction(value != null ? value.split : void 0) ? value.split('..') : Util.isArray(value) ? value : [null, null], start_o = ref[0], end_o = ref[1];
      if (start_o != null) {
        this.startOffset(start_o);
      }
      if (end_o != null) {
        return this.endOffset(end_o);
      }
    };

    Transformation.prototype.opacity = function(value) {
      return this.param(value, "opacity", "o", Expression.normalize);
    };

    Transformation.prototype.overlay = function(value) {
      return this.layerParam(value, "overlay", "l");
    };

    Transformation.prototype.page = function(value) {
      return this.param(value, "page", "pg");
    };

    Transformation.prototype.poster = function(value) {
      return this.param(value, "poster");
    };

    Transformation.prototype.prefix = function(value) {
      return this.param(value, "prefix", "p");
    };

    Transformation.prototype.quality = function(value) {
      return this.param(value, "quality", "q", Expression.normalize);
    };

    Transformation.prototype.radius = function(value) {
      return this.param(value, "radius", "r", Expression.normalize);
    };

    Transformation.prototype.rawTransformation = function(value) {
      return this.rawParam(value, "raw_transformation");
    };

    Transformation.prototype.size = function(value) {
      var height, ref;
      if (Util.isFunction(value != null ? value.split : void 0)) {
        ref = value.split('x'), width = ref[0], height = ref[1];
        this.width(width);
        return this.height(height);
      }
    };

    Transformation.prototype.sourceTypes = function(value) {
      return this.param(value, "source_types");
    };

    Transformation.prototype.sourceTransformation = function(value) {
      return this.param(value, "source_transformation");
    };

    Transformation.prototype.startOffset = function(value) {
      return this.rangeParam(value, "start_offset", "so");
    };

    Transformation.prototype.streamingProfile = function(value) {
      return this.param(value, "streaming_profile", "sp");
    };

    Transformation.prototype.transformation = function(value) {
      return this.transformationParam(value, "transformation", "t");
    };

    Transformation.prototype.underlay = function(value) {
      return this.layerParam(value, "underlay", "u");
    };

    Transformation.prototype.variable = function(name, value) {
      return this.param(value, name, name);
    };

    Transformation.prototype.variables = function(values) {
      return this.arrayParam(values, "variables");
    };

    Transformation.prototype.videoCodec = function(value) {
      return this.param(value, "video_codec", "vc", Param.process_video_params);
    };

    Transformation.prototype.videoSampling = function(value) {
      return this.param(value, "video_sampling", "vs");
    };

    Transformation.prototype.width = function(value) {
      return this.param(value, "width", "w", (function(_this) {
        return function() {
          if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
            return Expression.normalize(value);
          } else {
            return null;
          }
        };
      })(this));
    };

    Transformation.prototype.x = function(value) {
      return this.param(value, "x", "x", Expression.normalize);
    };

    Transformation.prototype.y = function(value) {
      return this.param(value, "y", "y", Expression.normalize);
    };

    Transformation.prototype.zoom = function(value) {
      return this.param(value, "zoom", "z", Expression.normalize);
    };

    return Transformation;

  })(TransformationBase);

  /**
   * Transformation Class methods.
   * This is a list of the parameters defined in Transformation.
   * Values are camelCased.
   */
  Transformation.methods || (Transformation.methods = Util.difference(Util.functions(Transformation.prototype), Util.functions(TransformationBase.prototype)));

  /**
   * Parameters that are filtered out before passing the options to an HTML tag.
   *
   * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
   */
  Transformation.PARAM_NAMES || (Transformation.PARAM_NAMES = ((function() {
    var j, len, ref, results;
    ref = Transformation.methods;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      m = ref[j];
      results.push(Util.snakeCase(m));
    }
    return results;
  })()).concat(Configuration.CONFIG_PARAMS));

  /**
   * Generic HTML tag
   * Depends on 'transformation', 'util'
   */
  HtmlTag = (function() {

    /**
     * Represents an HTML (DOM) tag
     * @constructor HtmlTag
     * @param {string} name - the name of the tag
     * @param {string} [publicId]
     * @param {Object} options
     * @example tag = new HtmlTag( 'div', { 'width': 10})
     */
    var toAttribute;

    function HtmlTag(name, publicId, options) {
      var transformation;
      this.name = name;
      this.publicId = publicId;
      if (options == null) {
        if (Util.isPlainObject(publicId)) {
          options = publicId;
          this.publicId = void 0;
        } else {
          options = {};
        }
      }
      transformation = new Transformation(options);
      transformation.setParent(this);
      this.transformation = function() {
        return transformation;
      };
    }


    /**
     * Convenience constructor
     * Creates a new instance of an HTML (DOM) tag
     * @function HtmlTag.new
     * @param {string} name - the name of the tag
     * @param {string} [publicId]
     * @param {Object} options
     * @return {HtmlTag}
     * @example tag = HtmlTag.new( 'div', { 'width': 10})
     */

    HtmlTag["new"] = function(name, publicId, options) {
      return new this(name, publicId, options);
    };


    /**
     * Represent the given key and value as an HTML attribute.
     * @function HtmlTag#toAttribute
     * @protected
     * @param {string} key - attribute name
     * @param {*|boolean} value - the value of the attribute. If the value is boolean `true`, return the key only.
     * @returns {string} the attribute  
     *
     */

    toAttribute = function(key, value) {
      if (!value) {
        return void 0;
      } else if (value === true) {
        return key;
      } else {
        return key + "=\"" + value + "\"";
      }
    };


    /**
     * combine key and value from the `attr` to generate an HTML tag attributes string.
     * `Transformation::toHtmlTagOptions` is used to filter out transformation and configuration keys.
     * @protected
     * @param {Object} attrs
     * @return {string} the attributes in the format `'key1="value1" key2="value2"'`
     * @ignore
     */

    HtmlTag.prototype.htmlAttrs = function(attrs) {
      var key, pairs, value;
      return pairs = ((function() {
        var results;
        results = [];
        for (key in attrs) {
          value = attrs[key];
          if (value) {
            results.push(toAttribute(key, value));
          }
        }
        return results;
      })()).sort().join(' ');
    };


    /**
     * Get all options related to this tag.
     * @function HtmlTag#getOptions
     * @returns {Object} the options
     *
     */

    HtmlTag.prototype.getOptions = function() {
      return this.transformation().toOptions();
    };


    /**
     * Get the value of option `name`
     * @function HtmlTag#getOption
     * @param {string} name - the name of the option
     * @returns {*} Returns the value of the option
     *
     */

    HtmlTag.prototype.getOption = function(name) {
      return this.transformation().getValue(name);
    };


    /**
     * Get the attributes of the tag.
     * @function HtmlTag#attributes
     * @returns {Object} attributes
     */

    HtmlTag.prototype.attributes = function() {
      return this.transformation().toHtmlAttributes();
    };


    /**
     * Set a tag attribute named `name` to `value`
     * @function HtmlTag#setAttr
     * @param {string} name - the name of the attribute
     * @param {string} value - the value of the attribute
     */

    HtmlTag.prototype.setAttr = function(name, value) {
      this.transformation().set("html_" + name, value);
      return this;
    };


    /**
     * Get the value of the tag attribute `name`
     * @function HtmlTag#getAttr
     * @param {string} name - the name of the attribute
     * @returns {*}
     */

    HtmlTag.prototype.getAttr = function(name) {
      return this.attributes()["html_" + name] || this.attributes()[name];
    };


    /**
     * Remove the tag attributed named `name`
     * @function HtmlTag#removeAttr
     * @param {string} name - the name of the attribute
     * @returns {*}
     */

    HtmlTag.prototype.removeAttr = function(name) {
      var ref;
      return (ref = this.transformation().remove("html_" + name)) != null ? ref : this.transformation().remove(name);
    };


    /**
     * @function HtmlTag#content
     * @protected
     * @ignore
     */

    HtmlTag.prototype.content = function() {
      return "";
    };


    /**
     * @function HtmlTag#openTag
     * @protected
     * @ignore
     */

    HtmlTag.prototype.openTag = function() {
      return "<" + this.name + " " + (this.htmlAttrs(this.attributes())) + ">";
    };


    /**
     * @function HtmlTag#closeTag
     * @protected
     * @ignore
     */

    HtmlTag.prototype.closeTag = function() {
      return "</" + this.name + ">";
    };


    /**
     * Generates an HTML representation of the tag.
     * @function HtmlTag#toHtml
     * @returns {string} Returns HTML in string format
     */

    HtmlTag.prototype.toHtml = function() {
      return this.openTag() + this.content() + this.closeTag();
    };


    /**
     * Creates a DOM object representing the tag.
     * @function HtmlTag#toDOM
     * @returns {Element}
     */

    HtmlTag.prototype.toDOM = function() {
      var element, name, ref, value;
      if (!Util.isFunction(typeof document !== "undefined" && document !== null ? document.createElement : void 0)) {
        throw "Can't create DOM if document is not present!";
      }
      element = document.createElement(this.name);
      ref = this.attributes();
      for (name in ref) {
        value = ref[name];
        element[name] = value;
      }
      return element;
    };

    HtmlTag.isResponsive = function(tag, responsiveClass) {
      var dataSrc;
      dataSrc = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
      return Util.hasClass(tag, responsiveClass) && /\bw_auto\b/.exec(dataSrc);
    };

    return HtmlTag;

  })();

  /**
   * Image Tag
   * Depends on 'tags/htmltag', 'cloudinary'
   */
  ImageTag = (function(superClass) {
    extend(ImageTag, superClass);


    /**
     * Creates an HTML (DOM) Image tag using Cloudinary as the source.
     * @constructor ImageTag
     * @extends HtmlTag
     * @param {string} [publicId]
     * @param {Object} [options]
     */

    function ImageTag(publicId, options) {
      if (options == null) {
        options = {};
      }
      ImageTag.__super__.constructor.call(this, "img", publicId, options);
    }


    /** @override */

    ImageTag.prototype.closeTag = function() {
      return "";
    };


    /** @override */

    ImageTag.prototype.attributes = function() {
      var attr, options, srcAttribute;
      attr = ImageTag.__super__.attributes.call(this) || [];
      options = this.getOptions();
      srcAttribute = options.responsive && !options.client_hints ? 'data-src' : 'src';
      if (attr[srcAttribute] == null) {
        attr[srcAttribute] = new Cloudinary(this.getOptions()).url(this.publicId);
      }
      return attr;
    };

    return ImageTag;

  })(HtmlTag);

  /**
   * Video Tag
   * Depends on 'tags/htmltag', 'util', 'cloudinary'
   */
  VideoTag = (function(superClass) {
    var DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, VIDEO_TAG_PARAMS;

    extend(VideoTag, superClass);

    VIDEO_TAG_PARAMS = ['source_types', 'source_transformation', 'fallback_content', 'poster'];

    DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];

    DEFAULT_POSTER_OPTIONS = {
      format: 'jpg',
      resource_type: 'video'
    };


    /**
     * Creates an HTML (DOM) Video tag using Cloudinary as the source.
     * @constructor VideoTag
     * @extends HtmlTag
     * @param {string} [publicId]
     * @param {Object} [options]
     */

    function VideoTag(publicId, options) {
      if (options == null) {
        options = {};
      }
      options = Util.defaults({}, options, Cloudinary.DEFAULT_VIDEO_PARAMS);
      VideoTag.__super__.constructor.call(this, "video", publicId.replace(/\.(mp4|ogv|webm)$/, ''), options);
    }


    /**
     * Set the transformation to apply on each source
     * @function VideoTag#setSourceTransformation
     * @param {Object} an object with pairs of source type and source transformation
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setSourceTransformation = function(value) {
      this.transformation().sourceTransformation(value);
      return this;
    };


    /**
     * Set the source types to include in the video tag
     * @function VideoTag#setSourceTypes
     * @param {Array<string>} an array of source types
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setSourceTypes = function(value) {
      this.transformation().sourceTypes(value);
      return this;
    };


    /**
     * Set the poster to be used in the video tag
     * @function VideoTag#setPoster
     * @param {string|Object} value
     * - string: a URL to use for the poster
     * - Object: transformation parameters to apply to the poster. May optionally include a public_id to use instead of the video public_id.
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setPoster = function(value) {
      this.transformation().poster(value);
      return this;
    };


    /**
     * Set the content to use as fallback in the video tag
     * @function VideoTag#setFallbackContent
     * @param {string} value - the content to use, in HTML format
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setFallbackContent = function(value) {
      this.transformation().fallbackContent(value);
      return this;
    };

    VideoTag.prototype.content = function() {
      var cld, fallback, innerTags, mimeType, sourceTransformation, sourceTypes, src, srcType, transformation, videoType;
      sourceTypes = this.transformation().getValue('source_types');
      sourceTransformation = this.transformation().getValue('source_transformation');
      fallback = this.transformation().getValue('fallback_content');
      if (Util.isArray(sourceTypes)) {
        cld = new Cloudinary(this.getOptions());
        innerTags = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = sourceTypes.length; j < len; j++) {
            srcType = sourceTypes[j];
            transformation = sourceTransformation[srcType] || {};
            src = cld.url("" + this.publicId, Util.defaults({}, transformation, {
              resource_type: 'video',
              format: srcType
            }));
            videoType = srcType === 'ogv' ? 'ogg' : srcType;
            mimeType = 'video/' + videoType;
            results.push("<source " + (this.htmlAttrs({
              src: src,
              type: mimeType
            })) + ">");
          }
          return results;
        }).call(this);
      } else {
        innerTags = [];
      }
      return innerTags.join('') + fallback;
    };

    VideoTag.prototype.attributes = function() {
      var a, attr, j, len, poster, ref, ref1, sourceTypes;
      sourceTypes = this.getOption('source_types');
      poster = (ref = this.getOption('poster')) != null ? ref : {};
      if (Util.isPlainObject(poster)) {
        defaults = poster.public_id != null ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS;
        poster = new Cloudinary(this.getOptions()).url((ref1 = poster.public_id) != null ? ref1 : this.publicId, Util.defaults({}, poster, defaults));
      }
      attr = VideoTag.__super__.attributes.call(this) || [];
      for (j = 0, len = attr.length; j < len; j++) {
        a = attr[j];
        if (!Util.contains(VIDEO_TAG_PARAMS)) {
          attr = a;
        }
      }
      if (!Util.isArray(sourceTypes)) {
        attr["src"] = new Cloudinary(this.getOptions()).url(this.publicId, {
          resource_type: 'video',
          format: sourceTypes
        });
      }
      if (poster != null) {
        attr["poster"] = poster;
      }
      return attr;
    };

    return VideoTag;

  })(HtmlTag);

  /**
   * Image Tag
   * Depends on 'tags/htmltag', 'cloudinary'
   */
  ClientHintsMetaTag = (function(superClass) {
    extend(ClientHintsMetaTag, superClass);


    /**
     * Creates an HTML (DOM) Meta tag that enables client-hints.
     * @constructor ClientHintsMetaTag
     * @extends HtmlTag
     */

    function ClientHintsMetaTag(options) {
      ClientHintsMetaTag.__super__.constructor.call(this, 'meta', void 0, Util.assign({
        "http-equiv": "Accept-CH",
        content: "DPR, Viewport-Width, Width"
      }, options));
    }


    /** @override */

    ClientHintsMetaTag.prototype.closeTag = function() {
      return "";
    };

    return ClientHintsMetaTag;

  })(HtmlTag);
  Cloudinary = (function() {
    var AKAMAI_SHARED_CDN, CF_SHARED_CDN, DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, OLD_AKAMAI_SHARED_CDN, SHARED_CDN, VERSION, absolutize, applyBreakpoints, cdnSubdomainNumber, closestAbove, cloudinaryUrlPrefix, defaultBreakpoints, finalizeResourceType, findContainerWidth, maxWidth, updateDpr;

    VERSION = "2.3.0";

    CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";

    OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";

    AKAMAI_SHARED_CDN = "res.cloudinary.com";

    SHARED_CDN = AKAMAI_SHARED_CDN;

    DEFAULT_POSTER_OPTIONS = {
      format: 'jpg',
      resource_type: 'video'
    };

    DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];


    /**
    * @const {Object} Cloudinary.DEFAULT_IMAGE_PARAMS
    * Defaults values for image parameters.
    *
    * (Previously defined using option_consume() )
     */

    Cloudinary.DEFAULT_IMAGE_PARAMS = {
      resource_type: "image",
      transformation: [],
      type: 'upload'
    };


    /**
    * Defaults values for video parameters.
    * @const {Object} Cloudinary.DEFAULT_VIDEO_PARAMS
    * (Previously defined using option_consume() )
     */

    Cloudinary.DEFAULT_VIDEO_PARAMS = {
      fallback_content: '',
      resource_type: "video",
      source_transformation: {},
      source_types: DEFAULT_VIDEO_SOURCE_TYPES,
      transformation: [],
      type: 'upload'
    };


    /**
     * Main Cloudinary class
     * @class Cloudinary
     * @param {Object} options - options to configure Cloudinary
     * @see Configuration for more details
     * @example
     *    var cl = new cloudinary.Cloudinary( { cloud_name: "mycloud"});
     *    var imgTag = cl.image("myPicID");
     */

    function Cloudinary(options) {
      var configuration;
      this.devicePixelRatioCache = {};
      this.responsiveConfig = {};
      this.responsiveResizeInitialized = false;
      configuration = new Configuration(options);
      this.config = function(newConfig, newValue) {
        return configuration.config(newConfig, newValue);
      };

      /**
       * Use \<meta\> tags in the document to configure this Cloudinary instance.
       * @return {Cloudinary} this for chaining
       */
      this.fromDocument = function() {
        configuration.fromDocument();
        return this;
      };

      /**
       * Use environment variables to configure this Cloudinary instance.
       * @return {Cloudinary} this for chaining
       */
      this.fromEnvironment = function() {
        configuration.fromEnvironment();
        return this;
      };

      /**
       * Initialize configuration.
       * @function Cloudinary#init
       * @see Configuration#init
       * @return {Cloudinary} this for chaining
       */
      this.init = function() {
        configuration.init();
        return this;
      };
    }


    /**
     * Convenience constructor
     * @param {Object} options
     * @return {Cloudinary}
     * @example cl = cloudinary.Cloudinary.new( { cloud_name: "mycloud"})
     */

    Cloudinary["new"] = function(options) {
      return new this(options);
    };


    /**
     * Return the resource type and action type based on the given configuration
     * @function Cloudinary#finalizeResourceType
     * @param {Object|string} resourceType
     * @param {string} [type='upload']
     * @param {string} [urlSuffix]
     * @param {boolean} [useRootPath]
     * @param {boolean} [shorten]
     * @returns {string} resource_type/type
     * @ignore
     */

    finalizeResourceType = function(resourceType, type, urlSuffix, useRootPath, shorten) {
      var options;
      if (Util.isPlainObject(resourceType)) {
        options = resourceType;
        resourceType = options.resource_type;
        type = options.type;
        urlSuffix = options.url_suffix;
        useRootPath = options.use_root_path;
        shorten = options.shorten;
      }
      if (type == null) {
        type = 'upload';
      }
      if (urlSuffix != null) {
        if (resourceType === 'image' && type === 'upload') {
          resourceType = "images";
          type = null;
        } else if (resourceType === 'raw' && type === 'upload') {
          resourceType = 'files';
          type = null;
        } else {
          throw new Error("URL Suffix only supported for image/upload and raw/upload");
        }
      }
      if (useRootPath) {
        if (resourceType === 'image' && type === 'upload' || resourceType === "images") {
          resourceType = null;
          type = null;
        } else {
          throw new Error("Root path only supported for image/upload");
        }
      }
      if (shorten && resourceType === 'image' && type === 'upload') {
        resourceType = 'iu';
        type = null;
      }
      return [resourceType, type].join("/");
    };

    absolutize = function(url) {
      var prefix;
      if (!url.match(/^https?:\//)) {
        prefix = document.location.protocol + '//' + document.location.host;
        if (url[0] === '?') {
          prefix += document.location.pathname;
        } else if (url[0] !== '/') {
          prefix += document.location.pathname.replace(/\/[^\/]*$/, '/');
        }
        url = prefix + url;
      }
      return url;
    };


    /**
     * Generate an resource URL.
     * @function Cloudinary#url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @param {Object} [options.resource_type='image'] - the type of the resource
     * @return {string} The resource URL
     */

    Cloudinary.prototype.url = function(publicId, options) {
      var error, error1, prefix, ref, resourceTypeAndType, transformation, transformationString, url, version;
      if (options == null) {
        options = {};
      }
      if (!publicId) {
        return publicId;
      }
      if (options instanceof Transformation) {
        options = options.toOptions();
      }
      options = Util.defaults({}, options, this.config(), Cloudinary.DEFAULT_IMAGE_PARAMS);
      if (options.type === 'fetch') {
        options.fetch_format = options.fetch_format || options.format;
        publicId = absolutize(publicId);
      }
      transformation = new Transformation(options);
      transformationString = transformation.serialize();
      if (!options.cloud_name) {
        throw 'Unknown cloud_name';
      }
      if (options.url_suffix && !options.private_cdn) {
        throw 'URL Suffix only supported in private CDN';
      }
      if (publicId.search('/') >= 0 && !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//) && !((ref = options.version) != null ? ref.toString() : void 0)) {
        options.version = 1;
      }
      if (publicId.match(/^https?:/)) {
        if (options.type === 'upload' || options.type === 'asset') {
          url = publicId;
        } else {
          publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
        }
      } else {
        try {
          publicId = decodeURIComponent(publicId);
        } catch (error1) {
          error = error1;
        }
        publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
        if (options.url_suffix) {
          if (options.url_suffix.match(/[\.\/]/)) {
            throw 'url_suffix should not include . or /';
          }
          publicId = publicId + '/' + options.url_suffix;
        }
        if (options.format) {
          if (!options.trust_public_id) {
            publicId = publicId.replace(/\.(jpg|png|gif|webp)$/, '');
          }
          publicId = publicId + '.' + options.format;
        }
      }
      prefix = cloudinaryUrlPrefix(publicId, options);
      resourceTypeAndType = finalizeResourceType(options.resource_type, options.type, options.url_suffix, options.use_root_path, options.shorten);
      version = options.version ? 'v' + options.version : '';
      return url || Util.compact([prefix, resourceTypeAndType, transformationString, version, publicId]).join('/').replace(/([^:])\/+/g, '$1/');
    };


    /**
     * Generate an video resource URL.
     * @function Cloudinary#video_url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @return {string} The video URL
     */

    Cloudinary.prototype.video_url = function(publicId, options) {
      options = Util.assign({
        resource_type: 'video'
      }, options);
      return this.url(publicId, options);
    };


    /**
     * Generate an video thumbnail URL.
     * @function Cloudinary#video_thumbnail_url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @return {string} The video thumbnail URL
     */

    Cloudinary.prototype.video_thumbnail_url = function(publicId, options) {
      options = Util.assign({}, DEFAULT_POSTER_OPTIONS, options);
      return this.url(publicId, options);
    };


    /**
     * Generate a string representation of the provided transformation options.
     * @function Cloudinary#transformation_string
     * @param {Object} options - the transformation options
     * @returns {string} The transformation string
     */

    Cloudinary.prototype.transformation_string = function(options) {
      return new Transformation(options).serialize();
    };


    /**
     * Generate an image tag.
     * @function Cloudinary#image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.image = function(publicId, options) {
      var client_hints, img, ref, ref1;
      if (options == null) {
        options = {};
      }
      img = this.imageTag(publicId, options);
      client_hints = (ref = (ref1 = options.client_hints) != null ? ref1 : this.config('client_hints')) != null ? ref : false;
      if (!((options.src != null) || client_hints)) {
        img.setAttr("src", '');
      }
      img = img.toDOM();
      if (!client_hints) {
        Util.setData(img, 'src-cache', this.url(publicId, options));
        this.cloudinary_update(img, options);
      }
      return img;
    };


    /**
     * Creates a new ImageTag instance, configured using this own's configuration.
     * @function Cloudinary#imageTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new ImageTag instance
     * @return {ImageTag} An ImageTag that is attached (chained) to this Cloudinary instance
     */

    Cloudinary.prototype.imageTag = function(publicId, options) {
      var tag;
      tag = new ImageTag(publicId, this.config());
      tag.transformation().fromOptions(options);
      return tag;
    };


    /**
     * Generate an image tag for the video thumbnail.
     * @function Cloudinary#video_thumbnail
     * @param {string} publicId - the public ID of the video
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} An image tag element
     */

    Cloudinary.prototype.video_thumbnail = function(publicId, options) {
      return this.image(publicId, Util.merge({}, DEFAULT_POSTER_OPTIONS, options));
    };


    /**
     * @function Cloudinary#facebook_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.facebook_profile_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'facebook'
      }, options));
    };


    /**
     * @function Cloudinary#twitter_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.twitter_profile_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'twitter'
      }, options));
    };


    /**
     * @function Cloudinary#twitter_name_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.twitter_name_profile_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'twitter_name'
      }, options));
    };


    /**
     * @function Cloudinary#gravatar_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.gravatar_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'gravatar'
      }, options));
    };


    /**
     * @function Cloudinary#fetch_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.fetch_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'fetch'
      }, options));
    };


    /**
     * @function Cloudinary#video
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.video = function(publicId, options) {
      if (options == null) {
        options = {};
      }
      return this.videoTag(publicId, options).toHtml();
    };


    /**
     * Creates a new VideoTag instance, configured using this own's configuration.
     * @function Cloudinary#videoTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new VideoTag instance
     * @return {VideoTag} A VideoTag that is attached (chained) to this Cloudinary instance
     */

    Cloudinary.prototype.videoTag = function(publicId, options) {
      options = Util.defaults({}, options, this.config());
      return new VideoTag(publicId, options);
    };


    /**
     * Generate the URL of the sprite image
     * @function Cloudinary#sprite_css
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations
     * @see {@link http://cloudinary.com/documentation/sprite_generation Sprite generation}
     */

    Cloudinary.prototype.sprite_css = function(publicId, options) {
      options = Util.assign({
        type: 'sprite'
      }, options);
      if (!publicId.match(/.css$/)) {
        options.format = 'css';
      }
      return this.url(publicId, options);
    };


    /**
    * Initialize the responsive behaviour.<br>
    * Calls {@link Cloudinary#cloudinary_update} to modify image tags.
     * @function Cloudinary#responsive
    * @param {Object} options
    * @param {String} [options.responsive_class='cld-responsive'] - provide an alternative class used to locate img tags
    * @param {number} [options.responsive_debounce=100] - the debounce interval in milliseconds.
    * @param {boolean} [bootstrap=true] if true processes the img tags by calling cloudinary_update. When false the tags will be processed only after a resize event.
    * @see {@link Cloudinary#cloudinary_update} for additional configuration parameters
     */

    Cloudinary.prototype.responsive = function(options, bootstrap) {
      var ref, ref1, ref2, responsiveClass, responsiveResize, timeout;
      if (bootstrap == null) {
        bootstrap = true;
      }
      this.responsiveConfig = Util.merge(this.responsiveConfig || {}, options);
      responsiveClass = (ref = this.responsiveConfig['responsive_class']) != null ? ref : this.config('responsive_class');
      if (bootstrap) {
        this.cloudinary_update("img." + responsiveClass + ", img.cld-hidpi", this.responsiveConfig);
      }
      responsiveResize = (ref1 = (ref2 = this.responsiveConfig['responsive_resize']) != null ? ref2 : this.config('responsive_resize')) != null ? ref1 : true;
      if (responsiveResize && !this.responsiveResizeInitialized) {
        this.responsiveConfig.resizing = this.responsiveResizeInitialized = true;
        timeout = null;
        return window.addEventListener('resize', (function(_this) {
          return function() {
            var debounce, ref3, ref4, reset, run, wait, waitFunc;
            debounce = (ref3 = (ref4 = _this.responsiveConfig['responsive_debounce']) != null ? ref4 : _this.config('responsive_debounce')) != null ? ref3 : 100;
            reset = function() {
              if (timeout) {
                clearTimeout(timeout);
                return timeout = null;
              }
            };
            run = function() {
              return _this.cloudinary_update("img." + responsiveClass, _this.responsiveConfig);
            };
            waitFunc = function() {
              reset();
              return run();
            };
            wait = function() {
              reset();
              return timeout = setTimeout(waitFunc, debounce);
            };
            if (debounce) {
              return wait();
            } else {
              return run();
            }
          };
        })(this));
      }
    };


    /**
     * @function Cloudinary#calc_breakpoint
     * @private
     * @ignore
     */

    Cloudinary.prototype.calc_breakpoint = function(element, width, steps) {
      var breakpoints, point;
      breakpoints = Util.getData(element, 'breakpoints') || Util.getData(element, 'stoppoints') || this.config('breakpoints') || this.config('stoppoints') || defaultBreakpoints;
      if (Util.isFunction(breakpoints)) {
        return breakpoints(width, steps);
      } else {
        if (Util.isString(breakpoints)) {
          breakpoints = ((function() {
            var j, len, ref, results;
            ref = breakpoints.split(',');
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              point = ref[j];
              results.push(parseInt(point));
            }
            return results;
          })()).sort(function(a, b) {
            return a - b;
          });
        }
        return closestAbove(breakpoints, width);
      }
    };


    /**
     * @function Cloudinary#calc_stoppoint
     * @deprecated Use {@link calc_breakpoint} instead.
     * @private
     * @ignore
     */

    Cloudinary.prototype.calc_stoppoint = Cloudinary.prototype.calc_breakpoint;


    /**
     * @function Cloudinary#device_pixel_ratio
     * @private
     */

    Cloudinary.prototype.device_pixel_ratio = function(roundDpr) {
      var dpr, dprString;
      if (roundDpr == null) {
        roundDpr = true;
      }
      dpr = (typeof window !== "undefined" && window !== null ? window.devicePixelRatio : void 0) || 1;
      if (roundDpr) {
        dpr = Math.ceil(dpr);
      }
      if (dpr <= 0 || dpr === NaN) {
        dpr = 1;
      }
      dprString = dpr.toString();
      if (dprString.match(/^\d+$/)) {
        dprString += '.0';
      }
      return dprString;
    };

    defaultBreakpoints = function(width, steps) {
      if (steps == null) {
        steps = 100;
      }
      return steps * Math.ceil(width / steps);
    };

    closestAbove = function(list, value) {
      var i;
      i = list.length - 2;
      while (i >= 0 && list[i] >= value) {
        i--;
      }
      return list[i + 1];
    };

    cdnSubdomainNumber = function(publicId) {
      return crc32(publicId) % 5 + 1;
    };

    cloudinaryUrlPrefix = function(publicId, options) {
      var cdnPart, host, path, protocol, ref, subdomain;
      if (((ref = options.cloud_name) != null ? ref.indexOf("/") : void 0) === 0) {
        return '/res' + options.cloud_name;
      }
      protocol = "http://";
      cdnPart = "";
      subdomain = "res";
      host = ".cloudinary.com";
      path = "/" + options.cloud_name;
      if (options.protocol) {
        protocol = options.protocol + '//';
      }
      if (options.private_cdn) {
        cdnPart = options.cloud_name + "-";
        path = "";
      }
      if (options.cdn_subdomain) {
        subdomain = "res-" + cdnSubdomainNumber(publicId);
      }
      if (options.secure) {
        protocol = "https://";
        if (options.secure_cdn_subdomain === false) {
          subdomain = "res";
        }
        if ((options.secure_distribution != null) && options.secure_distribution !== OLD_AKAMAI_SHARED_CDN && options.secure_distribution !== SHARED_CDN) {
          cdnPart = "";
          subdomain = "";
          host = options.secure_distribution;
        }
      } else if (options.cname) {
        protocol = "http://";
        cdnPart = "";
        subdomain = options.cdn_subdomain ? 'a' + ((crc32(publicId) % 5) + 1) + '.' : '';
        host = options.cname;
      }
      return [protocol, cdnPart, subdomain, host, path].join("");
    };


    /**
    * Finds all `img` tags under each node and sets it up to provide the image through Cloudinary
    * @param {Element[]} nodes the parent nodes to search for img under
    * @param {Object} [options={}] options and transformations params
    * @function Cloudinary#processImageTags
     */

    Cloudinary.prototype.processImageTags = function(nodes, options) {
      var images, imgOptions, node, publicId, url;
      if (options == null) {
        options = {};
      }
      if (Util.isEmpty(nodes)) {
        return this;
      }
      options = Util.defaults({}, options, this.config());
      images = (function() {
        var j, len, ref, results;
        results = [];
        for (j = 0, len = nodes.length; j < len; j++) {
          node = nodes[j];
          if (!(((ref = node.tagName) != null ? ref.toUpperCase() : void 0) === 'IMG')) {
            continue;
          }
          imgOptions = Util.assign({
            width: node.getAttribute('width'),
            height: node.getAttribute('height'),
            src: node.getAttribute('src')
          }, options);
          publicId = imgOptions['source'] || imgOptions['src'];
          delete imgOptions['source'];
          delete imgOptions['src'];
          url = this.url(publicId, imgOptions);
          imgOptions = new Transformation(imgOptions).toHtmlAttributes();
          Util.setData(node, 'src-cache', url);
          node.setAttribute('width', imgOptions.width);
          node.setAttribute('height', imgOptions.height);
          results.push(node);
        }
        return results;
      }).call(this);
      this.cloudinary_update(images, options);
      return this;
    };

    applyBreakpoints = function(tag, width, steps, options) {
      var ref, ref1, ref2, responsive_use_breakpoints;
      responsive_use_breakpoints = (ref = (ref1 = (ref2 = options['responsive_use_breakpoints']) != null ? ref2 : options['responsive_use_stoppoints']) != null ? ref1 : this.config('responsive_use_breakpoints')) != null ? ref : this.config('responsive_use_stoppoints');
      if ((!responsive_use_breakpoints) || (responsive_use_breakpoints === 'resize' && !options.resizing)) {
        return width;
      } else {
        return this.calc_breakpoint(tag, width, steps);
      }
    };

    findContainerWidth = function(element) {
      var containerWidth, style;
      containerWidth = 0;
      while (((element = element != null ? element.parentNode : void 0) instanceof Element) && !containerWidth) {
        style = window.getComputedStyle(element);
        if (!/^inline/.test(style.display)) {
          containerWidth = Util.width(element);
        }
      }
      return containerWidth;
    };

    updateDpr = function(dataSrc, roundDpr) {
      return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio(roundDpr));
    };

    maxWidth = function(requiredWidth, tag) {
      var imageWidth;
      imageWidth = Util.getData(tag, 'width') || 0;
      if (requiredWidth > imageWidth) {
        imageWidth = requiredWidth;
        Util.setData(tag, 'width', requiredWidth);
      }
      return imageWidth;
    };


    /**
    * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
    * Only images marked with the cld-responsive class have w_auto updated.
    * @function Cloudinary#cloudinary_update
    * @param {(Array|string|NodeList)} elements - the elements to modify
    * @param {Object} options
    * @param {boolean|string} [options.responsive_use_breakpoints=true]
    *  - when `true`, always use breakpoints for width
    * - when `"resize"` use exact width on first render and breakpoints on resize
    * - when `false` always use exact width
    * @param {boolean} [options.responsive] - if `true`, enable responsive on this element. Can be done by adding cld-responsive.
    * @param {boolean} [options.responsive_preserve_height] - if set to true, original css height is preserved.
    *   Should only be used if the transformation supports different aspect ratios.
     */

    Cloudinary.prototype.cloudinary_update = function(elements, options) {
      var containerWidth, dataSrc, j, len, match, ref, ref1, ref2, ref3, ref4, ref5, requiredWidth, responsive, responsiveClass, roundDpr, setUrl, tag;
      if (options == null) {
        options = {};
      }
      if (elements === null) {
        return this;
      }
      responsive = (ref = (ref1 = options.responsive) != null ? ref1 : this.config('responsive')) != null ? ref : false;
      elements = (function() {
        switch (false) {
          case !Util.isArray(elements):
            return elements;
          case elements.constructor.name !== "NodeList":
            return elements;
          case !Util.isString(elements):
            return document.querySelectorAll(elements);
          default:
            return [elements];
        }
      })();
      responsiveClass = (ref2 = (ref3 = this.responsiveConfig['responsive_class']) != null ? ref3 : options['responsive_class']) != null ? ref2 : this.config('responsive_class');
      roundDpr = (ref4 = options['round_dpr']) != null ? ref4 : this.config('round_dpr');
      for (j = 0, len = elements.length; j < len; j++) {
        tag = elements[j];
        if (!((ref5 = tag.tagName) != null ? ref5.match(/img/i) : void 0)) {
          continue;
        }
        setUrl = true;
        if (responsive) {
          Util.addClass(tag, responsiveClass);
        }
        dataSrc = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
        if (!Util.isEmpty(dataSrc)) {
          dataSrc = updateDpr.call(this, dataSrc, roundDpr);
          if (HtmlTag.isResponsive(tag, responsiveClass)) {
            containerWidth = findContainerWidth(tag);
            if (containerWidth !== 0) {
              switch (false) {
                case !/w_auto:breakpoints/.test(dataSrc):
                  requiredWidth = maxWidth(containerWidth, tag);
                  dataSrc = dataSrc.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:" + requiredWidth);
                  break;
                case !(match = /w_auto(:(\d+))?/.exec(dataSrc)):
                  requiredWidth = applyBreakpoints.call(this, tag, containerWidth, match[2], options);
                  requiredWidth = maxWidth(requiredWidth, tag);
                  dataSrc = dataSrc.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth);
              }
              Util.removeAttribute(tag, 'width');
              if (!options.responsive_preserve_height) {
                Util.removeAttribute(tag, 'height');
              }
            } else {
              setUrl = false;
            }
          }
          if (setUrl) {
            Util.setAttribute(tag, 'src', dataSrc);
          }
        }
      }
      return this;
    };


    /**
     * Provide a transformation object, initialized with own's options, for chaining purposes.
     * @function Cloudinary#transformation
     * @param {Object} options
     * @return {Transformation}
     */

    Cloudinary.prototype.transformation = function(options) {
      return Transformation["new"](this.config()).fromOptions(options).setParent(this);
    };

    return Cloudinary;

  })();

  /**
   * Cloudinary jQuery plugin
   * Depends on 'jquery', 'util', 'transformation', 'cloudinary'
   */
  CloudinaryJQuery = (function(superClass) {
    extend(CloudinaryJQuery, superClass);


    /**
     * Cloudinary class with jQuery support
     * @constructor CloudinaryJQuery
     * @extends Cloudinary
     */

    function CloudinaryJQuery(options) {
      CloudinaryJQuery.__super__.constructor.call(this, options);
    }


    /**
     * @override
     */

    CloudinaryJQuery.prototype.image = function(publicId, options) {
      var client_hints, img, ref, ref1;
      if (options == null) {
        options = {};
      }
      img = this.imageTag(publicId, options);
      client_hints = (ref = (ref1 = options.client_hints) != null ? ref1 : this.config('client_hints')) != null ? ref : false;
      if (!((options.src != null) || client_hints)) {
        img.setAttr("src", '');
      }
      img = jQuery(img.toHtml());
      if (!client_hints) {
        img.data('src-cache', this.url(publicId, options)).cloudinary_update(options);
      }
      return img;
    };


    /**
     * @override
     */

    CloudinaryJQuery.prototype.responsive = function(options) {
      var ref, ref1, ref2, responsiveClass, responsiveConfig, responsiveResizeInitialized, responsive_resize, timeout;
      responsiveConfig = jQuery.extend(responsiveConfig || {}, options);
      responsiveClass = (ref = this.responsiveConfig['responsive_class']) != null ? ref : this.config('responsive_class');
      jQuery("img." + responsiveClass + ", img.cld-hidpi").cloudinary_update(responsiveConfig);
      responsive_resize = (ref1 = (ref2 = responsiveConfig['responsive_resize']) != null ? ref2 : this.config('responsive_resize')) != null ? ref1 : true;
      if (responsive_resize && !responsiveResizeInitialized) {
        responsiveConfig.resizing = responsiveResizeInitialized = true;
        timeout = null;
        return jQuery(window).on('resize', (function(_this) {
          return function() {
            var debounce, ref3, ref4, reset, run, wait;
            debounce = (ref3 = (ref4 = responsiveConfig['responsive_debounce']) != null ? ref4 : _this.config('responsive_debounce')) != null ? ref3 : 100;
            reset = function() {
              if (timeout) {
                clearTimeout(timeout);
                return timeout = null;
              }
            };
            run = function() {
              return jQuery("img." + responsiveClass).cloudinary_update(responsiveConfig);
            };
            wait = function() {
              reset();
              return setTimeout((function() {
                reset();
                return run();
              }), debounce);
            };
            if (debounce) {
              return wait();
            } else {
              return run();
            }
          };
        })(this));
      }
    };

    return CloudinaryJQuery;

  })(Cloudinary);

  /**
   * The following methods are provided through the jQuery class
   * @class jQuery
   */

  /**
   * Convert all img tags in the collection to utilize Cloudinary.
   * @function jQuery#cloudinary
   * @param {Object} [options] - options for the tag and transformations
   * @returns {jQuery}
   */
  jQuery.fn.cloudinary = function(options) {
    this.filter('img').each(function() {
      var img_options, public_id, url;
      img_options = jQuery.extend({
        width: jQuery(this).attr('width'),
        height: jQuery(this).attr('height'),
        src: jQuery(this).attr('src')
      }, jQuery(this).data(), options);
      public_id = img_options.source || img_options.src;
      delete img_options.source;
      delete img_options.src;
      url = jQuery.cloudinary.url(public_id, img_options);
      img_options = new Transformation(img_options).toHtmlAttributes();
      return jQuery(this).data('src-cache', url).attr({
        width: img_options.width,
        height: img_options.height
      });
    }).cloudinary_update(options);
    return this;
  };

  /**
   * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
   * Only images marked with the cld-responsive class have w_auto updated.
   * options:
   * - responsive_use_stoppoints:
   *   - true - always use stoppoints for width
   *   - "resize" - use exact width on first render and stoppoints on resize (default)
   *   - false - always use exact width
   * - responsive:
   *   - true - enable responsive on this element. Can be done by adding cld-responsive.
   *            Note that jQuery.cloudinary.responsive() should be called once on the page.
   * - responsive_preserve_height: if set to true, original css height is perserved. Should only be used if the transformation supports different aspect ratios.
   */
  jQuery.fn.cloudinary_update = function(options) {
    if (options == null) {
      options = {};
    }
    jQuery.cloudinary.cloudinary_update(this.filter('img').toArray(), options);
    return this;
  };
  webp = null;

  /**
   * @function jQuery#webpify
   */
  jQuery.fn.webpify = function(options, webp_options) {
    var that, webp_canary;
    if (options == null) {
      options = {};
    }
    that = this;
    webp_options = webp_options != null ? webp_options : options;
    if (!webp) {
      webp = jQuery.Deferred();
      webp_canary = new Image;
      webp_canary.onerror = webp.reject;
      webp_canary.onload = webp.resolve;
      webp_canary.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    }
    jQuery(function() {
      return webp.done(function() {
        return jQuery(that).cloudinary(jQuery.extend({}, webp_options, {
          format: 'webp'
        }));
      }).fail(function() {
        return jQuery(that).cloudinary(options);
      });
    });
    return this;
  };
  jQuery.fn.fetchify = function(options) {
    return this.cloudinary(jQuery.extend(options, {
      'type': 'fetch'
    }));
  };
  jQuery.cloudinary = new CloudinaryJQuery();
  jQuery.cloudinary.fromDocument();

  /**
   * This module extends CloudinaryJquery to support jQuery File Upload
   * Depends on 'jquery', 'util', 'cloudinaryjquery', 'jquery.ui.widget', 'jquery.iframe-transport','jquery.fileupload'
   */

  /**
   * Delete a resource using the upload token
   * @function CloudinaryJQuery#delete_by_token
   * @param {string} delete_token - the delete token
   * @param {Object} [options]
   * @param {string} [options.url] - an alternative URL to use for the API
   * @param {string} [options.cloud_name] - an alternative cloud_name to use. This parameter is ignored if `options.url` is provided.
   */
  CloudinaryJQuery.prototype.delete_by_token = function(delete_token, options) {
    var cloud_name, dataType, url;
    options = options || {};
    url = options.url;
    if (!url) {
      cloud_name = options.cloud_name || jQuery.cloudinary.config().cloud_name;
      url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/delete_by_token';
    }
    dataType = jQuery.support.xhrFileUpload ? 'json' : 'iframe json';
    return jQuery.ajax({
      url: url,
      method: 'POST',
      data: {
        token: delete_token
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: dataType
    });
  };

  /**
   * Creates an `input` tag and sets it up to upload files to cloudinary
   * @function CloudinaryJQuery#unsigned_upload_tag
   * @param {string}
   */
  CloudinaryJQuery.prototype.unsigned_upload_tag = function(upload_preset, upload_params, options) {
    return jQuery('<input/>').attr({
      type: 'file',
      name: 'file'
    }).unsigned_cloudinary_upload(upload_preset, upload_params, options);
  };

  /**
   * Initialize the jQuery File Upload plugin to upload to Cloudinary
   * @function jQuery#cloudinary_fileupload
   * @param {Object} options
   * @returns {jQuery}
   */
  jQuery.fn.cloudinary_fileupload = function(options) {
    var cloud_name, initializing, resource_type, type, upload_url;
    if (!Util.isFunction(jQuery.fn.fileupload)) {
      return this;
    }
    initializing = !this.data('blueimpFileupload');
    if (initializing) {
      options = jQuery.extend({
        maxFileSize: 20000000,
        dataType: 'json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }, options);
    }
    this.fileupload(options);
    if (initializing) {
      this.bind('fileuploaddone', function(e, data) {
        var add_field, field, multiple, upload_info;
        if (data.result.error) {
          return;
        }
        data.result.path = ['v', data.result.version, '/', data.result.public_id, data.result.format ? '.' + data.result.format : ''].join('');
        if (data.cloudinaryField && data.form.length > 0) {
          upload_info = [data.result.resource_type, data.result.type, data.result.path].join('/') + '#' + data.result.signature;
          multiple = jQuery(e.target).prop('multiple');
          add_field = function() {
            return jQuery('<input/>').attr({
              type: 'hidden',
              name: data.cloudinaryField
            }).val(upload_info).appendTo(data.form);
          };
          if (multiple) {
            add_field();
          } else {
            field = jQuery(data.form).find('input[name="' + data.cloudinaryField + '"]');
            if (field.length > 0) {
              field.val(upload_info);
            } else {
              add_field();
            }
          }
        }
        return jQuery(e.target).trigger('cloudinarydone', data);
      });
      this.bind('fileuploadsend', function(e, data) {
        data.headers = jQuery.extend({}, data.headers, {
          'X-Unique-Upload-Id': (Math.random() * 10000000000).toString(16)
        });
        return true;
      });
      this.bind('fileuploadstart', function(e) {
        return jQuery(e.target).trigger('cloudinarystart');
      });
      this.bind('fileuploadstop', function(e) {
        return jQuery(e.target).trigger('cloudinarystop');
      });
      this.bind('fileuploadprogress', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryprogress', data);
      });
      this.bind('fileuploadprogressall', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryprogressall', data);
      });
      this.bind('fileuploadfail', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryfail', data);
      });
      this.bind('fileuploadalways', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryalways', data);
      });
      if (!this.fileupload('option').url) {
        cloud_name = options.cloud_name || jQuery.cloudinary.config().cloud_name;
        resource_type = options.resource_type || 'auto';
        type = options.type || 'upload';
        upload_url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/' + resource_type + '/' + type;
        this.fileupload('option', 'url', upload_url);
      }
    }
    return this;
  };

  /**
   * Add a file to upload
   * @function jQuery#cloudinary_upload_url
   * @param {string} remote_url - the url to add
   * @returns {jQuery}
   */
  jQuery.fn.cloudinary_upload_url = function(remote_url) {
    if (!Util.isFunction(jQuery.fn.fileupload)) {
      return this;
    }
    this.fileupload('option', 'formData').file = remote_url;
    this.fileupload('add', {
      files: [remote_url]
    });
    delete this.fileupload('option', 'formData').file;
    return this;
  };

  /**
   * Initialize the jQuery File Upload plugin to upload to Cloudinary using unsigned upload
   * @function jQuery#unsigned_cloudinary_upload
   * @param {string} upload_preset - the upload preset to use
   * @param {Object} [upload_params] - parameters that should be past to the server
   * @param {Object} [options]
   * @returns {jQuery}
   */
  jQuery.fn.unsigned_cloudinary_upload = function(upload_preset, upload_params, options) {
    var attr, attrs_to_move, html_options, i, key, value;
    if (upload_params == null) {
      upload_params = {};
    }
    if (options == null) {
      options = {};
    }
    upload_params = Util.cloneDeep(upload_params);
    options = Util.cloneDeep(options);
    attrs_to_move = ['cloud_name', 'resource_type', 'type'];
    i = 0;
    while (i < attrs_to_move.length) {
      attr = attrs_to_move[i];
      if (upload_params[attr]) {
        options[attr] = upload_params[attr];
        delete upload_params[attr];
      }
      i++;
    }
    for (key in upload_params) {
      value = upload_params[key];
      if (Util.isPlainObject(value)) {
        upload_params[key] = jQuery.map(value, function(v, k) {
          if (Util.isString(v)) {
            v = v.replace(/[\|=]/g, "\\$&");
          }
          return k + '=' + v;
        }).join('|');
      } else if (Util.isArray(value)) {
        if (value.length > 0 && jQuery.isArray(value[0])) {
          upload_params[key] = jQuery.map(value, function(array_value) {
            return array_value.join(',');
          }).join('|');
        } else {
          upload_params[key] = value.join(',');
        }
      }
    }
    if (!upload_params.callback) {
      upload_params.callback = '/cloudinary_cors.html';
    }
    upload_params.upload_preset = upload_preset;
    options.formData = upload_params;
    if (options.cloudinary_field) {
      options.cloudinaryField = options.cloudinary_field;
      delete options.cloudinary_field;
    }
    html_options = options.html || {};
    html_options["class"] = Util.trim("cloudinary_fileupload " + (html_options["class"] || ''));
    if (options.multiple) {
      html_options.multiple = true;
    }
    this.attr(html_options).cloudinary_fileupload(options);
    return this;
  };
  jQuery.cloudinary = new CloudinaryJQuery();
  cloudinary = {
    utf8_encode: utf8_encode,
    crc32: crc32,
    Util: Util,
    Condition: Condition,
    Transformation: Transformation,
    Configuration: Configuration,
    HtmlTag: HtmlTag,
    ImageTag: ImageTag,
    VideoTag: VideoTag,
    ClientHintsMetaTag: ClientHintsMetaTag,
    Layer: Layer,
    TextLayer: TextLayer,
    SubtitlesLayer: SubtitlesLayer,
    Cloudinary: Cloudinary,
    VERSION: "2.3.0",
    CloudinaryJQuery: CloudinaryJQuery
  };
  return cloudinary;
});






(function(e,t){function P(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:e.nodeType===1&&t?!0:n==="array"||n!=="function"&&(t===0||typeof t=="number"&&t>0&&t-1 in e)}function B(e){var t=H[e]={};return b.each(e.match(E)||[],function(e,n){t[n]=!0}),t}function I(e,n,r,i){if(!b.acceptData(e))return;var s,o,u=b.expando,a=typeof n=="string",f=e.nodeType,c=f?b.cache:e,h=f?e[u]:e[u]&&u;if((!h||!c[h]||!i&&!c[h].data)&&a&&r===t)return;h||(f?e[u]=h=l.pop()||b.guid++:h=u),c[h]||(c[h]={},f||(c[h].toJSON=b.noop));if(typeof n=="object"||typeof n=="function")i?c[h]=b.extend(c[h],n):c[h].data=b.extend(c[h].data,n);return s=c[h],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[b.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[b.camelCase(n)])):o=s,o}function q(e,t,n){if(!b.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?b.cache:e,a=o?e[b.expando]:b.expando;if(!u[a])return;if(t){s=n?u[a]:u[a].data;if(s){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in s?t=[t]:(t=b.camelCase(t),t in s?t=[t]:t=t.split(" "));for(r=0,i=t.length;r<i;r++)delete s[t[r]];if(!(n?U:b.isEmptyObject)(s))return}}if(!n){delete u[a].data;if(!U(u[a]))return}o?b.cleanData([e],!0):b.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null}function R(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(F,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:j.test(r)?b.parseJSON(r):r}catch(s){}b.data(e,n,r)}else r=t}return r}function U(e){var t;for(t in e){if(t==="data"&&b.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function it(){return!0}function st(){return!1}function ct(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ht(e,t,n){t=t||0;if(b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if(typeof t=="string"){var r=b.grep(e,function(e){return e.nodeType===1});if(at.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function pt(e){var t=dt.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Mt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function _t(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function Dt(e){var t=Ct.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Pt(e,t){var n,r=0;for(;(n=e[r])!=null;r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function Ht(e,t){if(t.nodeType!==1||!b.hasData(e))return;var n,r,i,s=b._data(e),o=b._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)b.event.add(t,n,u[n][r])}o.data&&(o.data=b.extend({},o.data))}function Bt(e,t){var n,r,i;if(t.nodeType!==1)return;n=t.nodeName.toLowerCase();if(!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}if(n==="script"&&t.text!==e.text)_t(t).text=e.text,Dt(t);else if(n==="object")t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML);else if(n==="input"&&xt.test(e.type))t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value);else if(n==="option")t.defaultSelected=t.selected=e.defaultSelected;else if(n==="input"||n==="textarea")t.defaultValue=e.defaultValue}function jt(e,n){var r,s,o=0,u=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!u)for(u=[],r=e.childNodes||e;(s=r[o])!=null;o++)!n||b.nodeName(s,n)?u.push(s):b.merge(u,jt(s,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],u):u}function Ft(e){xt.test(e.type)&&(e.defaultChecked=e.checked)}function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--){t=en[i]+n;if(t in e)return t}return r}function nn(e,t){return e=t||e,b.css(e,"display")==="none"||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,s=[],o=0,u=e.length;for(;o<u;o++){r=e[o];if(!r.style)continue;s[o]=b._data(r,"olddisplay"),n=r.style.display,t?(!s[o]&&n==="none"&&(r.style.display=""),r.style.display===""&&nn(r)&&(s[o]=b._data(r,"olddisplay",an(r.nodeName)))):s[o]||(i=nn(r),(n&&n!=="none"||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display")))}for(o=0;o<u;o++){r=e[o];if(!r.style)continue;if(!t||r.style.display==="none"||r.style.display==="")r.style.display=t?s[o]||"":"none"}return e}function sn(e,t,n){var r=$t.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function on(e,t,n,r,i){var s=n===(r?"border":"content")?4:t==="width"?1:0,o=0;for(;s<4;s+=2)n==="margin"&&(o+=b.css(e,n+Zt[s],!0,i)),r?(n==="content"&&(o-=b.css(e,"padding"+Zt[s],!0,i)),n!=="margin"&&(o-=b.css(e,"border"+Zt[s]+"Width",!0,i))):(o+=b.css(e,"padding"+Zt[s],!0,i),n!=="padding"&&(o+=b.css(e,"border"+Zt[s]+"Width",!0,i)));return o}function un(e,t,n){var r=!0,i=t==="width"?e.offsetWidth:e.offsetHeight,s=qt(e),o=b.support.boxSizing&&b.css(e,"boxSizing",!1,s)==="border-box";if(i<=0||i==null){i=Rt(e,t,s);if(i<0||i==null)i=e.style[t];if(Jt.test(i))return i;r=o&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+on(e,t,n||(o?"border":"content"),r,s)+"px"}function an(e){var t=s,n=Qt[e];if(!n){n=fn(e,t);if(n==="none"||!n)It=(It||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(It[0].contentWindow||It[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=fn(e,t),It.detach();Qt[e]=n}return n}function fn(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}function vn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||cn.test(e)?r(e,i):vn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&b.type(t)==="object")for(i in t)vn(e+"["+i+"]",t[i],n,r);else r(e,t)}function _n(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i=0,s=t.toLowerCase().match(E)||[];if(b.isFunction(n))while(r=s[i++])r[0]==="+"?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function Dn(e,t,n,r){function o(u){var a;return i[u]=!0,b.each(e[u]||[],function(e,u){var f=u(t,n,r);if(typeof f=="string"&&!s&&!i[f])return t.dataTypes.unshift(f),o(f),!1;if(s)return!(a=f)}),a}var i={},s=e===An;return o(t.dataTypes[0])||!i["*"]&&o("*")}function Pn(e,n){var r,i,s=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((s[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}function Hn(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(u in l)u in r&&(n[l[u]]=r[u]);while(f[0]==="*")f.shift(),s===t&&(s=e.mimeType||n.getResponseHeader("Content-Type"));if(s)for(u in a)if(a[u]&&a[u].test(s)){f.unshift(u);break}if(f[0]in r)o=f[0];else{for(u in r){if(!f[0]||e.converters[u+" "+f[0]]){o=u;break}i||(i=u)}o=o||i}if(o)return o!==f[0]&&f.unshift(o),r[o]}function Bn(e,t){var n,r,i,s,o={},u=0,a=e.dataTypes.slice(),f=a[0];e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(a[1])for(i in e.converters)o[i.toLowerCase()]=e.converters[i];for(;r=a[++u];)if(r!=="*"){if(f!=="*"&&f!==r){i=o[f+" "+r]||o["* "+r];if(!i)for(n in o){s=n.split(" ");if(s[1]===r){i=o[f+" "+s[0]]||o["* "+s[0]];if(i){i===!0?i=o[n]:o[n]!==!0&&(r=s[0],a.splice(u--,0,r));break}}}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(l){return{state:"parsererror",error:i?l:"No conversion from "+f+" to "+r}}}f=r}return{state:"success",data:t}}function zn(){try{return new e.XMLHttpRequest}catch(t){}}function Wn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function Yn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Gn[t]||[]).concat(Gn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,s=0,o=Qn.length,u=b.Deferred().always(function(){delete a.elem}),a=function(){if(i)return!1;var t=Xn||Yn(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,s=1-r,o=0,a=f.tweens.length;for(;o<a;o++)f.tweens[o].run(s);return u.notifyWith(e,[f,s,n]),s<1&&a?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Yn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(r),r},stop:function(t){var n=0,r=t?f.tweens.length:0;if(i)return this;i=!0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;tr(l,f.opts.specialEasing);for(;s<o;s++){r=Qn[s].call(f,e,l,f.opts);if(r)return r}return Zn(f,l),b.isFunction(f.opts.start)&&f.opts.start.call(e,f),b.fx.timer(b.extend(a,{elem:e,anim:f,queue:f.opts.queue})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function tr(e,t){var n,r,i,s,o;for(i in e){r=b.camelCase(i),s=t[r],n=e[i],b.isArray(n)&&(s=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),o=b.cssHooks[r];if(o&&"expand"in o){n=o.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=s)}else t[r]=s}}function nr(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},v=[],m=e.nodeType&&nn(e);n.queue||(l=b._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,b.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],b.css(e,"display")==="inline"&&b.css(e,"float")==="none"&&(!b.support.inlineBlockNeedsLayout||an(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",b.support.shrinkWrapBlocks||h.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(i in t){o=t[i];if($n.exec(o)){delete t[i],a=a||o==="toggle";if(o===(m?"hide":"show"))continue;v.push(i)}}s=v.length;if(s){u=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in u&&(m=u.hidden),a&&(u.hidden=!m),m?b(e).show():h.done(function(){b(e).hide()}),h.done(function(){var t;b._removeData(e,"fxshow");for(t in d)b.style(e,t,d[t])});for(i=0;i<s;i++)r=v[i],f=h.createTween(r,m?u[r]:0),d[r]=u[r]||b.style(e,r),r in u||(u[r]=f.start,m&&(f.end=f.start,f.start=r==="width"||r==="height"?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}function ir(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function sr(e){return b.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=typeof t,s=e.document,o=e.location,u=e.jQuery,a=e.$,f={},l=[],c="1.9.1",h=l.concat,p=l.push,d=l.slice,v=l.indexOf,m=f.toString,g=f.hasOwnProperty,y=c.trim,b=function(e,t){return new b.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,E=/\S+/g,S=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,x=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,T=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,N=/^[\],:{}\s]*$/,C=/(?:^|:|,)(?:\s*\[)+/g,k=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,L=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,A=/^-ms-/,O=/-([\da-z])/gi,M=function(e,t){return t.toUpperCase()},_=function(e){if(s.addEventListener||e.type==="load"||s.readyState==="complete")D(),b.ready()},D=function(){s.addEventListener?(s.removeEventListener("DOMContentLoaded",_,!1),e.removeEventListener("load",_,!1)):(s.detachEvent("onreadystatechange",_),e.detachEvent("onload",_))};b.fn=b.prototype={jquery:c,constructor:b,init:function(e,n,r){var i,o;if(!e)return this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?i=[null,e,null]:i=x.exec(e);if(i&&(i[1]||!n)){if(i[1]){n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:s,!0));if(T.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}o=s.getElementById(i[2]);if(o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=s,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return d.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:p,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!b.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((s=arguments[a])!=null)for(i in s){e=u[i],r=s[i];if(u===r)continue;l&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,o=e&&b.isArray(e)?e:[]):o=e&&b.isPlainObject(e)?e:{},u[i]=b.extend(l,o,r)):r!==t&&(u[i]=r)}return u},b.extend({noConflict:function(t){return e.$===b&&(e.$=a),t&&e.jQuery===b&&(e.jQuery=u),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?--b.readyWait:b.isReady)return;if(!s.body)return setTimeout(b.ready);b.isReady=!0;if(e!==!0&&--b.readyWait>0)return;n.resolveWith(s,[b]),b.fn.trigger&&b(s).trigger("ready").off("ready")},isFunction:function(e){return b.type(e)==="function"},isArray:Array.isArray||function(e){return b.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):typeof e=="object"||typeof e=="function"?f[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||b.type(e)!=="object"||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!g.call(e,"constructor")&&!g.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||g.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){if(!e||typeof e!="string")return null;typeof t=="boolean"&&(n=t,t=!1),t=t||s;var r=T.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(t){if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(t===null)return t;if(typeof t=="string"){t=b.trim(t);if(t&&N.test(t.replace(k,"@").replace(L,"]").replace(C,"")))return(new Function("return "+t))()}b.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(A,"ms-").replace(O,M)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,s=e.length,o=P(e);if(n)if(o)for(;i<s;i++){r=t.apply(e[i],n);if(r===!1)break}else for(i in e){r=t.apply(e[i],n);if(r===!1)break}else if(o)for(;i<s;i++){r=t.call(e[i],i,e[i]);if(r===!1)break}else for(i in e){r=t.call(e[i],i,e[i]);if(r===!1)break}return e},trim:y&&!y.call("﻿ ")?function(e){return e==null?"":y.call(e)}:function(e){return e==null?"":(e+"").replace(S,"")},makeArray:function(e,t){var n=t||[];return e!=null&&(P(Object(e))?b.merge(n,typeof e=="string"?[e]:e):p.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(v)return v.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,t,n){var r,i=0,s=e.length,o=P(e),u=[];if(o)for(;i<s;i++)r=t(e[i],i,n),r!=null&&(u[u.length]=r);else for(i in e)r=t(e[i],i,n),r!=null&&(u[u.length]=r);return h.apply([],u)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(s=e[n],n=e,e=s),b.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(n||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,s,o,u){var a=0,f=e.length,l=r==null;if(b.type(r)==="object"){s=!0;for(a in r)b.access(e,n,a,r[a],!0,o,u)}else if(i!==t){s=!0,b.isFunction(i)||(u=!0),l&&(u?(n.call(e,i),n=null):(l=n,n=function(e,t,n){return l.call(b(e),n)}));if(n)for(;a<f;a++)n(e[a],r,u?i:i.call(e[a],a,n(e[a],r)))}return s?e:l?n.call(e):f?n(e[0],r):o},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n){n=b.Deferred();if(s.readyState==="complete")setTimeout(b.ready);else if(s.addEventListener)s.addEventListener("DOMContentLoaded",_,!1),e.addEventListener("load",_,!1);else{s.attachEvent("onreadystatechange",_),e.attachEvent("onload",_);var r=!1;try{r=e.frameElement==null&&s.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}D(),b.ready()}}()}}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){f["[object "+t+"]"]=t.toLowerCase()}),r=b(s);var H={};b.Callbacks=function(e){e=typeof e=="string"?H[e]||B(e):b.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){r=e.memory&&t,i=!0,o=u||0,u=0,s=a.length,n=!0;for(;a&&o<s;o++)if(a[o].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,a&&(f?f.length&&l(f.shift()):r?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);r==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&r!=="string"&&i(n)})})(arguments),n?s=a.length:r&&(u=t,l(r))}return this},remove:function(){return a&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,a,r))>-1)a.splice(r,1),n&&(r<=s&&s--,r<=o&&o--)}),this},has:function(e){return e?b.inArray(e,a)>-1:!!a&&!!a.length},empty:function(){return a=[],this},disable:function(){return a=f=r=t,this},disabled:function(){return!a},lock:function(){return f=t,r||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!i||f)&&(n?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}};return c},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,s){var o=s[0],u=b.isFunction(e[t])&&e[t];i[s[1]](function(){var e=u&&u.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o+"With"](this===r?n.promise():this,u?[e]:arguments)})}),e=null}).promise()},promise:function(e){return e!=null?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=function(){return i[s[0]+"With"](this===i?r:this,arguments),this},i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=r!==1||e&&b.isFunction(e.promise)?r:0,s=i===1?e:b.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),b.support=function(){var t,n,r,o,u,a,f,l,c,h,p=s.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};u=s.createElement("select"),f=u.appendChild(s.createElement("option")),o=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:p.className!=="t",leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!o.value,optSelected:f.selected,enctype:!!s.createElement("form").enctype,html5Clone:s.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:s.compatMode==="CSS1Compat",deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,u.disabled=!0,t.optDisabled=!f.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}o=s.createElement("input"),o.setAttribute("value",""),t.input=o.getAttribute("value")==="",o.value="t",o.setAttribute("type","radio"),t.radioValue=o.value==="t",o.setAttribute("checked","t"),o.setAttribute("name","t"),a=s.createDocumentFragment(),a.appendChild(o),t.appendChecked=o.checked,t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,p.attachEvent&&(p.attachEvent("onclick",function(){t.noCloneEvent=!1}),p.cloneNode(!0).click());for(h in{submit:!0,change:!0,focusin:!0})p.setAttribute(l="on"+h,"t"),t[h+"Bubbles"]=l in e||p.attributes[l].expando===!1;return p.style.backgroundClip="content-box",p.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle=p.style.backgroundClip==="content-box",b(function(){var n,r,o,u="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",a=s.getElementsByTagName("body")[0];if(!a)return;n=s.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(p),p.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=p.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",c=o[0].offsetHeight===0,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=c&&o[0].offsetHeight===0,p.innerHTML="",p.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=p.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(p,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(p,null)||{width:"4px"}).width==="4px",r=p.appendChild(s.createElement("div")),r.style.cssText=p.style.cssText=u,r.style.marginRight=r.style.width="0",p.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof p.style.zoom!==i&&(p.innerHTML="",p.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.innerHTML="<div></div>",p.firstChild.style.width="5px",t.shrinkWrapBlocks=p.offsetWidth!==3,t.inlineBlockNeedsLayout&&(a.style.zoom=1)),a.removeChild(n),n=p=o=r=null}),n=u=a=f=r=o=null,t}();var j=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,F=/([A-Z])/g;b.extend({cache:{},expando:"jQuery"+(c+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!U(e)},data:function(e,t,n){return I(e,t,n)},removeData:function(e,t){return q(e,t)},_data:function(e,t,n){return I(e,t,n,!0)},_removeData:function(e,t){return q(e,t,!0)},acceptData:function(e){if(e.nodeType&&e.nodeType!==1&&e.nodeType!==9)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,s=this[0],o=0,u=null;if(e===t){if(this.length){u=b.data(s);if(s.nodeType===1&&!b._data(s,"parsedAttrs")){r=s.attributes;for(;o<r.length;o++)i=r[o].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),R(s,i,u[i]));b._data(s,"parsedAttrs",!0)}}return u}return typeof e=="object"?this.each(function(){b.data(this,e)}):b.access(this,function(n){if(n===t)return s?R(s,e,b.data(s,e)):null;this.each(function(){b.data(this,e,n)})},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}}),b.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=b._data(e,t),n&&(!r||b.isArray(n)?r=b._data(e,t,b.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),s=b._queueHooks(e,t),o=function(){b.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),s.cur=i,i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=b.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=b._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var z,W,X=/[\t\r\n]/g,V=/\r/g,$=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,K=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,Q=/^(?:checked|selected)$/i,G=b.support.getSetAttribute,Y=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o=0,u=this.length,a=typeof e=="string"&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(a){t=(e||"").match(E)||[];for(;o<u;o++){n=this[o],r=n.nodeType===1&&(n.className?(" "+n.className+" ").replace(X," "):" ");if(r){s=0;while(i=t[s++])r.indexOf(" "+i+" ")<0&&(r+=i+" ");n.className=b.trim(r)}}}return this},removeClass:function(e){var t,n,r,i,s,o=0,u=this.length,a=arguments.length===0||typeof e=="string"&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(a){t=(e||"").match(E)||[];for(;o<u;o++){n=this[o],r=n.nodeType===1&&(n.className?(" "+n.className+" ").replace(X," "):"");if(r){s=0;while(i=t[s++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var s,o=0,u=b(this),a=t,f=e.match(E)||[];while(s=f[o++])a=r?a:!u.hasClass(s),u[a?"addClass":"removeClass"](s)}else if(n===i||n==="boolean")this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return r=b.valHooks[s.type]||b.valHooks[s.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(s,"value"))!==t?n:(n=s.value,typeof n=="string"?n.replace(V,""):n==null?"":n);return}return i=b.isFunction(e),this.each(function(n){var s,o=b(this);if(this.nodeType!==1)return;i?s=e.call(this,n,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":b.isArray(s)&&(s=b.map(s,function(e){return e==null?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()];if(!r||!("set"in r)||r.set(this,s,"value")===t)this.value=s})}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(b.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!b.nodeName(n.parentNode,"optgroup"))){t=b(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(typeof e.getAttribute===i)return b.prop(e,n,r);o=a!==1||!b.isXMLDoc(e),o&&(n=n.toLowerCase(),s=b.attrHooks[n]||(K.test(n)?W:z));if(r===t)return s&&o&&"get"in s&&(u=s.get(e,n))!==null?u:(typeof e.getAttribute!==i&&(u=e.getAttribute(n)),u==null?t:u);if(r!==null)return s&&o&&"set"in s&&(u=s.set(e,r,n))!==t?u:(e.setAttribute(n,r+""),r);b.removeAttr(e,n)},removeAttr:function(e,t){var n,r,i=0,s=t&&t.match(E);if(s&&e.nodeType===1)while(n=s[i++])r=b.propFix[n]||n,K.test(n)?!G&&Q.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(G?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&t==="radio"&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!b.isXMLDoc(e),o&&(n=b.propFix[n]||n,s=b.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):$.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:t}}}}),W={get:function(e,n){var r=b.prop(e,n),i=typeof r=="boolean"&&e.getAttribute(n),s=typeof r=="boolean"?Y&&G?i!=null:Q.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return s&&s.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):Y&&G||!Q.test(n)?e.setAttribute(!G&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}};if(!Y||!G)b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,t,n){if(!b.nodeName(e,"input"))return z&&z.set(e,t,n);e.defaultValue=t}};G||(z=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&(n==="id"||n==="name"||n==="coords"?r.value!=="":r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="",r==="value"||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:z.get,set:function(e,t,n){z.set(e,t===""?!1:t,n)}},b.each(["width","height"],function(e,t){b.attrHooks[t]=b.extend(b.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r==null?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,t){if(b.isArray(t))return e.checked=b.inArray(b(e).val(),t)>=0}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;b.event={global:{},add:function(e,n,r,s,o){var u,a,f,l,c,h,p,d,v,m,g,y=b._data(e);if(!y)return;r.handler&&(l=r,r=l.handler,o=l.selector),r.guid||(r.guid=b.guid++),(a=y.events)||(a=y.events={}),(h=y.handle)||(h=y.handle=function(e){return typeof b===i||!!e&&b.event.triggered===e.type?t:b.event.dispatch.apply(h.elem,arguments)},h.elem=e),n=(n||"").match(E)||[""],f=n.length;while(f--){u=rt.exec(n[f])||[],v=g=u[1],m=(u[2]||"").split(".").sort(),c=b.event.special[v]||{},v=(o?c.delegateType:c.bindType)||v,c=b.event.special[v]||{},p=b.extend({type:v,origType:g,data:s,handler:r,guid:r.guid,selector:o,needsContext:o&&b.expr.match.needsContext.test(o),namespace:m.join(".")},l);if(!(d=a[v])){d=a[v]=[],d.delegateCount=0;if(!c.setup||c.setup.call(e,s,m,h)===!1)e.addEventListener?e.addEventListener(v,h,!1):e.attachEvent&&e.attachEvent("on"+v,h)}c.add&&(c.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),o?d.splice(d.delegateCount++,0,p):d.push(p),b.event.global[v]=!0}e=null},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,v,m=b.hasData(e)&&b._data(e);if(!m||!(l=m.events))return;t=(t||"").match(E)||[""],f=t.length;while(f--){u=rt.exec(t[f])||[],p=v=u[1],d=(u[2]||"").split(".").sort();if(!p){for(p in l)b.event.remove(e,p+t[f],n,r,!0);continue}c=b.event.special[p]||{},p=(r?c.delegateType:c.bindType)||p,h=l[p]||[],u=u[2]&&new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=s=h.length;while(s--)o=h[s],(i||v===o.origType)&&(!n||n.guid===o.guid)&&(!u||u.test(o.namespace))&&(!r||r===o.selector||r==="**"&&o.selector)&&(h.splice(s,1),o.selector&&h.delegateCount--,c.remove&&c.remove.call(e,o));a&&!h.length&&((!c.teardown||c.teardown.call(e,d,m.handle)===!1)&&b.removeEvent(e,p,m.handle),delete l[p])}b.isEmptyObject(l)&&(delete m.handle,b._removeData(e,"events"))},trigger:function(n,r,i,o){var u,a,f,l,c,h,p,d=[i||s],v=g.call(n,"type")?n.type:n,m=g.call(n,"namespace")?n.namespace.split("."):[];f=h=i=i||s;if(i.nodeType===3||i.nodeType===8)return;if(nt.test(v+b.event.triggered))return;v.indexOf(".")>=0&&(m=v.split("."),v=m.shift(),m.sort()),a=v.indexOf(":")<0&&"on"+v,n=n[b.expando]?n:new b.Event(v,typeof n=="object"&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=r==null?[n]:b.makeArray(r,[n]),c=b.event.special[v]||{};if(!o&&c.trigger&&c.trigger.apply(i,r)===!1)return;if(!o&&!c.noBubble&&!b.isWindow(i)){l=c.delegateType||v,nt.test(l+v)||(f=f.parentNode);for(;f;f=f.parentNode)d.push(f),h=f;h===(i.ownerDocument||s)&&d.push(h.defaultView||h.parentWindow||e)}p=0;while((f=d[p++])&&!n.isPropagationStopped())n.type=p>1?l:c.bindType||v,u=(b._data(f,"events")||{})[n.type]&&b._data(f,"handle"),u&&u.apply(f,r),u=a&&f[a],u&&b.acceptData(f)&&u.apply&&u.apply(f,r)===!1&&n.preventDefault();n.type=v;if(!o&&!n.isDefaultPrevented()&&(!c._default||c._default.apply(i.ownerDocument,r)===!1)&&(v!=="click"||!b.nodeName(i,"a"))&&b.acceptData(i)&&a&&i[v]&&!b.isWindow(i)){h=i[a],h&&(i[a]=null),b.event.triggered=v;try{i[v]()}catch(y){}b.event.triggered=t,h&&(i[a]=h)}return n.result},dispatch:function(e){e=b.event.fix(e);var n,r,i,s,o,u=[],a=d.call(arguments),f=(b._data(this,"events")||{})[e.type]||[],l=b.event.special[e.type]||{};a[0]=e,e.delegateTarget=this;if(l.preDispatch&&l.preDispatch.call(this,e)===!1)return;u=b.event.handlers.call(this,e,f),n=0;while((s=u[n++])&&!e.isPropagationStopped()){e.currentTarget=s.elem,o=0;while((i=s.handlers[o++])&&!e.isImmediatePropagationStopped())if(!e.namespace_re||e.namespace_re.test(i.namespace))e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(s.elem,a),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation())}return l.postDispatch&&l.postDispatch.call(this,e),e.result},handlers:function(e,n){var r,i,s,o,u=[],a=n.delegateCount,f=e.target;if(a&&f.nodeType&&(!e.button||e.type!=="click"))for(;f!=this;f=f.parentNode||this)if(f.nodeType===1&&(f.disabled!==!0||e.type!=="click")){s=[];for(o=0;o<a;o++)i=n[o],r=i.selector+" ",s[r]===t&&(s[r]=i.needsContext?b(r,this).index(f)>=0:b.find(r,this,null,[f]).length),s[r]&&s.push(i);s.length&&u.push({elem:f,handlers:s})}return a<n.length&&u.push({elem:this,handlers:n.slice(a)}),u},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,o=e,u=this.fixHooks[i];u||(this.fixHooks[i]=u=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=u.props?this.props.concat(u.props):this.props,e=new b.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||s),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,u.filter?u.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(i=e.target.ownerDocument||s,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){if(b.nodeName(this,"input")&&this.type==="checkbox"&&this.click)return this.click(),!1}},focus:{trigger:function(){if(this!==s.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){if(this===s.activeElement&&this.blur)return this.blur(),!1},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=s.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,t){if(!(this instanceof b.Event))return new b.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:st):this.type=e,t&&b.extend(this,t),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0},b.Event.prototype={isDefaultPrevented:st,isPropagationStopped:st,isImmediatePropagationStopped:st,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj;if(!i||i!==r&&!b.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){if(b.nodeName(this,"form"))return!1;b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(b.nodeName(this,"form"))return!1;b.event.remove(this,"._submit")}}),b.support.changeBubbles||(b.event.special.change={setup:function(){if(Z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")b.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)});return!1}b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){n++===0&&s.addEventListener(e,r,!0)},teardown:function(){--n===0&&s.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(o in e)this.on(o,n,r,e[o],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=st;else if(!i)return this;return s===1&&(u=i,i=function(e){return b().off(e),u.apply(this,arguments)},i.guid=u.guid||(u.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=st),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return b.event.trigger(e,t,n,!0)}}),function(e,t){function rt(e){return J.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function st(e){return e[w]=!0,e}function ot(e){var t=c.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function ut(e,t,n,r){var i,s,o,u,a,f,h,v,m,y;(t?t.ownerDocument||t:E)!==c&&l(t),t=t||c,n=n||[];if(!e||typeof e!="string")return n;if((u=t.nodeType)!==1&&u!==9)return[];if(!p&&!r){if(i=K.exec(e))if(o=i[1]){if(u===9){s=t.getElementById(o);if(!s||!s.parentNode)return n;if(s.id===o)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(o))&&g(t,s)&&s.id===o)return n.push(s),n}else{if(i[2])return _.apply(n,D.call(t.getElementsByTagName(e),0)),n;if((o=i[3])&&S.getByClassName&&t.getElementsByClassName)return _.apply(n,D.call(t.getElementsByClassName(o),0)),n}if(S.qsa&&!d.test(e)){h=!0,v=w,m=t,y=u===9&&e;if(u===1&&t.nodeName.toLowerCase()!=="object"){f=ht(e),(h=t.getAttribute("id"))?v=h.replace(Y,"\\$&"):t.setAttribute("id",v),v="[id='"+v+"'] ",a=f.length;while(a--)f[a]=v+pt(f[a]);m=$.test(e)&&t.parentNode||t,y=f.join(",")}if(y)try{return _.apply(n,D.call(m.querySelectorAll(y),0)),n}catch(b){}finally{h||t.removeAttribute("id")}}}return Et(e.replace(R,"$1"),t,n,r)}function at(e,t){var n=t&&e,r=n&&(~t.sourceIndex||A)-(~e.sourceIndex||A);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function ct(e){return st(function(t){return t=+t,st(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ht(e,t){var n,r,s,o,u,a,f,l=C[e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=U.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=z.exec(u))n=r.shift(),s.push({value:n,type:r[0].replace(R," ")}),u=u.slice(n.length);for(o in i.filter)(r=V[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(n=r.shift(),s.push({value:n,type:o,matches:r}),u=u.slice(n.length));if(!n)break}return t?u.length:u?ut.error(e):C(e,a).slice(0)}function pt(e){var t=0,n=e.length,r="";for(;t<n;t++)r+=e[t].value;return r}function dt(e,t,n){var i=t.dir,s=n&&i==="parentNode",o=T++;return t.first?function(t,n,r){while(t=t[i])if(t.nodeType===1||s)return e(t,n,r)}:function(t,n,u){var a,f,l,c=x+" "+o;if(u){while(t=t[i])if(t.nodeType===1||s)if(e(t,n,u))return!0}else while(t=t[i])if(t.nodeType===1||s){l=t[w]||(t[w]={});if((f=l[i])&&f[0]===c){if((a=f[1])===!0||a===r)return a===!0}else{f=l[i]=[c],f[1]=e(t,n,u)||r;if(f[1]===!0)return!0}}}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function gt(e,t,n,r,i,s){return r&&!r[w]&&(r=gt(r)),i&&!i[w]&&(i=gt(i,s)),st(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||wt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?mt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=mt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?P.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=mt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):_.apply(o,g)})}function yt(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,l=dt(function(e){return e===t},u,!0),c=dt(function(e){return P.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==f)||((t=n).nodeType?l(e,n,r):c(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[dt(vt(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[w]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return gt(a>1&&vt(h),a>1&&pt(e.slice(0,a-1)).replace(R,"$1"),n,a<r&&yt(e.slice(a,r)),r<s&&yt(e=e.slice(r)),r<s&&pt(e))}h.push(n)}return vt(h)}function bt(e,t){var n=0,s=t.length>0,o=e.length>0,u=function(u,a,l,h,p){var d,v,m,g=[],y=0,b="0",w=u&&[],E=p!=null,S=f,T=u||o&&i.find.TAG("*",p&&a.parentNode||a),N=x+=S==null?1:Math.random()||.1;E&&(f=a!==c&&a,r=n);for(;(d=T[b])!=null;b++){if(o&&d){v=0;while(m=e[v++])if(m(d,a,l)){h.push(d);break}E&&(x=N,r=++n)}s&&((d=!m&&d)&&y--,u&&w.push(d))}y+=b;if(s&&b!==y){v=0;while(m=t[v++])m(w,g,a,l);if(u){if(y>0)while(b--)!w[b]&&!g[b]&&(g[b]=M.call(h));g=mt(g)}_.apply(h,g),E&&!u&&g.length>0&&y+t.length>1&&ut.uniqueSort(h)}return E&&(x=N,f=S),w};return s?st(u):u}function wt(e,t,n){var r=0,i=t.length;for(;r<i;r++)ut(e,t[r],n);return n}function Et(e,t,n,r){var s,o,a,f,l,c=ht(e);if(!r&&c.length===1){o=c[0]=c[0].slice(0);if(o.length>2&&(a=o[0]).type==="ID"&&t.nodeType===9&&!p&&i.relative[o[1].type]){t=i.find.ID(a.matches[0].replace(et,tt),t)[0];if(!t)return n;e=e.slice(o.shift().value.length)}s=V.needsContext.test(e)?0:o.length;while(s--){a=o[s];if(i.relative[f=a.type])break;if(l=i.find[f])if(r=l(a.matches[0].replace(et,tt),$.test(o[0].type)&&t.parentNode||t)){o.splice(s,1),e=r.length&&pt(o);if(!e)return _.apply(n,D.call(r,0)),n;break}}}return u(e,c)(r,t,p,n,$.test(e)),n}function St(){}var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,w="sizzle"+-(new Date),E=e.document,S={},x=0,T=0,N=it(),C=it(),k=it(),L=typeof t,A=1<<31,O=[],M=O.pop,_=O.push,D=O.slice,P=O.indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},H="[\\x20\\t\\r\\n\\f]",B="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",j=B.replace("w","w#"),F="([*^$|!~]?=)",I="\\["+H+"*("+B+")"+H+"*(?:"+F+H+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+j+")|)|)"+H+"*\\]",q=":("+B+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+I.replace(3,8)+")*)|.*)\\)|)",R=new RegExp("^"+H+"+|((?:^|[^\\\\])(?:\\\\.)*)"+H+"+$","g"),U=new RegExp("^"+H+"*,"+H+"*"),z=new RegExp("^"+H+"*([\\x20\\t\\r\\n\\f>+~])"+H+"*"),W=new RegExp(q),X=new RegExp("^"+j+"$"),V={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),NAME:new RegExp("^\\[name=['\"]?("+B+")['\"]?\\]"),TAG:new RegExp("^("+B.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+H+"*(even|odd|(([+-]|)(\\d*)n|)"+H+"*(?:([+-]|)"+H+"*(\\d+)|))"+H+"*\\)|)","i"),needsContext:new RegExp("^"+H+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+H+"*((?:-\\d)?\\d*)"+H+"*\\)|)(?=[^-]|$)","i")},$=/[\x20\t\r\n\f]*[+~]/,J=/^[^{]+\{\s*\[native code/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Q=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,Y=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,n&1023|56320)};try{D.call(E.documentElement.childNodes,0)[0].nodeType}catch(nt){D=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}o=ut.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},l=ut.setDocument=function(e){var n=e?e.ownerDocument||e:E;if(n===c||n.nodeType!==9||!n.documentElement)return c;c=n,h=n.documentElement,p=o(n),S.tagNameNoComments=ot(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),S.attributes=ot(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),S.getByClassName=ot(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),S.getByName=ot(function(e){e.id=w+0,e.innerHTML="<a name='"+w+"'></a><div name='"+w+"'></div>",h.insertBefore(e,h.firstChild);var t=n.getElementsByName&&n.getElementsByName(w).length===2+n.getElementsByName(w+0).length;return S.getIdNotName=!n.getElementById(w),h.removeChild(e),t}),i.attrHandle=ot(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==L&&e.firstChild.getAttribute("href")==="#"})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},S.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==L&&!p){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==L&&!p){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==L&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==L&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=S.tagNameNoComments?function(e,t){if(typeof t.getElementsByTagName!==L)return t.getElementsByTagName(e)}:function(e,t){var n,r=[],i=0,s=t.getElementsByTagName(e);if(e==="*"){while(n=s[i++])n.nodeType===1&&r.push(n);return r}return s},i.find.NAME=S.getByName&&function(e,t){if(typeof t.getElementsByName!==L)return t.getElementsByName(name)},i.find.CLASS=S.getByClassName&&function(e,t){if(typeof t.getElementsByClassName!==L&&!p)return t.getElementsByClassName(e)},v=[],d=[":focus"];if(S.qsa=rt(n.querySelectorAll))ot(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+H+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||d.push(":checked")}),ot(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&d.push("[*^$]="+H+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")});return(S.matchesSelector=rt(m=h.matchesSelector||h.mozMatchesSelector||h.webkitMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ot(function(e){S.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),v.push("!=",q)}),d=new RegExp(d.join("|")),v=new RegExp(v.join("|")),g=rt(h.contains)||h.compareDocumentPosition?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!r&&r.nodeType===1&&!!(n.contains?n.contains(r):e.compareDocumentPosition&&e.compareDocumentPosition(r)&16)}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},y=h.compareDocumentPosition?function(e,t){var r;if(e===t)return a=!0,0;if(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))return r&1||e.parentNode&&e.parentNode.nodeType===11?e===n||g(E,e)?-1:t===n||g(E,t)?1:0:r&4?-1:1;return e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,s=e.parentNode,o=t.parentNode,u=[e],f=[t];if(e===t)return a=!0,0;if(!s||!o)return e===n?-1:t===n?1:s?-1:o?1:0;if(s===o)return at(e,t);r=e;while(r=r.parentNode)u.unshift(r);r=t;while(r=r.parentNode)f.unshift(r);while(u[i]===f[i])i++;return i?at(u[i],f[i]):u[i]===E?-1:f[i]===E?1:0},a=!1,[0,0].sort(y),S.detectDuplicates=a,c},ut.matches=function(e,t){return ut(e,null,null,t)},ut.matchesSelector=function(e,t){(e.ownerDocument||e)!==c&&l(e),t=t.replace(Z,"='$1']");if(S.matchesSelector&&!p&&(!v||!v.test(t))&&!d.test(t))try{var n=m.call(e,t);if(n||S.disconnectedMatch||e.document&&e.document.nodeType!==11)return n}catch(r){}return ut(t,c,null,[e]).length>0},ut.contains=function(e,t){return(e.ownerDocument||e)!==c&&l(e),g(e,t)},ut.attr=function(e,t){var n;return(e.ownerDocument||e)!==c&&l(e),p||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):p||S.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},ut.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ut.uniqueSort=function(e){var t,n=[],r=1,i=0;a=!S.detectDuplicates,e.sort(y);if(a){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},s=ut.getText=function(e){var t,n="",r=0,i=e.nodeType;if(!i)for(;t=e[r];r++)n+=s(t);else if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue;return n},i=ut.selectors={cacheLength:50,createPseudo:st,match:V,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1].slice(0,3)==="nth"?(e[3]||ut.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd")),e[5]=+(e[7]+e[8]||e[3]==="odd")):e[3]&&ut.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return V.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&W.test(n)&&(t=ht(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=N[e+" "];return t||(t=new RegExp("(^|"+H+")"+e+"("+H+"|$)"))&&N(e,function(e){return t.test(e.className||typeof e.getAttribute!==L&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ut.attr(r,e);return i==null?t==="!=":t?(i+="",t==="="?i===n:t==="!="?i!==n:t==="^="?n&&i.indexOf(n)===0:t==="*="?n&&i.indexOf(n)>-1:t==="$="?n&&i.slice(-n.length)===n:t==="~="?(" "+i+" ").indexOf(n)>-1:t==="|="?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var s=e.slice(0,3)!=="nth",o=e.slice(-4)!=="last",u=t==="of-type";return r===1&&i===0?function(e){return!!e.parentNode}:function(t,n,a){var f,l,c,h,p,d,v=s!==o?"nextSibling":"previousSibling",m=t.parentNode,g=u&&t.nodeName.toLowerCase(),y=!a&&!u;if(m){if(s){while(v){c=t;while(c=c[v])if(u?c.nodeName.toLowerCase()===g:c.nodeType===1)return!1;d=v=e==="only"&&!d&&"nextSibling"}return!0}d=[o?m.firstChild:m.lastChild];if(o&&y){l=m[w]||(m[w]={}),f=l[e]||[],p=f[0]===x&&f[1],h=f[0]===x&&f[2],c=p&&m.childNodes[p];while(c=++p&&c&&c[v]||(h=p=0)||d.pop())if(c.nodeType===1&&++h&&c===t){l[e]=[x,p,h];break}}else if(y&&(f=(t[w]||(t[w]={}))[e])&&f[0]===x)h=f[1];else while(c=++p&&c&&c[v]||(h=p=0)||d.pop())if((u?c.nodeName.toLowerCase()===g:c.nodeType===1)&&++h){y&&((c[w]||(c[w]={}))[e]=[x,h]);if(c===t)break}return h-=i,h===r||h%r===0&&h/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ut.error("unsupported pseudo: "+e);return r[w]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?st(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=P.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:st(function(e){var t=[],n=[],r=u(e.replace(R,"$1"));return r[w]?st(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:st(function(e){return function(t){return ut(e,t).length>0}}),contains:st(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),lang:st(function(e){return X.test(e||"")||ut.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=p?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||n.indexOf(e+"-")===0;while((t=t.parentNode)&&t.nodeType===1);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===c.activeElement&&(!c.hasFocus||c.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||e.nodeType===3||e.nodeType===4)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return G.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},text:function(e){var t;return e.nodeName.toLowerCase()==="input"&&e.type==="text"&&((t=e.getAttribute("type"))==null||t.toLowerCase()===e.type)},first:ct(function(){return[0]}),last:ct(function(e,t){return[t-1]}),eq:ct(function(e,t,n){return[n<0?n+t:n]}),even:ct(function(e,t){var n=0;for(;n<t;n+=2)e.push(n);return e}),odd:ct(function(e,t){var n=1;for(;n<t;n+=2)e.push(n);return e}),lt:ct(function(e,t,n){var r=n<0?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ct(function(e,t,n){var r=n<0?n+t:n;for(;++r<t;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=lt(n);u=ut.compile=function(e,t){var n,r=[],i=[],s=k[e+" "];if(!s){t||(t=ht(e)),n=t.length;while(n--)s=yt(t[n]),s[w]?r.push(s):i.push(s);s=k(e,bt(i,r))}return s},i.pseudos.nth=i.pseudos.eq,i.filters=St.prototype=i.pseudos,i.setFilters=new St,l(),ut.attr=b.attr,b.find=ut,b.expr=ut.selectors,b.expr[":"]=b.expr.pseudos,b.unique=ut.uniqueSort,b.text=ut.getText,b.isXMLDoc=ut.isXML,b.contains=ut.contains}(e);var ot=/Until$/,ut=/^(?:parents|prev(?:Until|All))/,at=/^.[^:#\[\.,]*$/,ft=b.expr.match.needsContext,lt={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if(typeof e!="string")return r=this,this.pushStack(b(e).filter(function(){for(t=0;t<i;t++)if(b.contains(r[t],this))return!0}));n=[];for(t=0;t<i;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ht(this,e,!1))},filter:function(e){return this.pushStack(ht(this,e,!0))},is:function(e){return!!e&&(typeof e=="string"?ft.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=ft.test(e)||typeof e!="string"?b(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:b.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return this.pushStack(s.length>1?b.unique(s):s)},index:function(e){return e?typeof e=="string"?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack,b.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return ct(e,"nextSibling")},prev:function(e){return ct(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return ot.test(e)||(r=n),r&&typeof r=="string"&&(i=b.filter(r,i)),i=this.length>1&&!lt[e]?b.unique(i):i,this.length>1&&ut.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!b(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var dt="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",vt=/ jQuery\d+="(?:null|\d+)"/g,mt=new RegExp("<(?:"+dt+")[\\s/>]","i"),gt=/^\s+/,yt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,wt=/<tbody/i,Et=/<|&#?\w+;/,St=/<(?:script|style|link)/i,xt=/^(?:checkbox|radio)$/i,Tt=/checked\s*(?:[^=]|=\s*.checked.)/i,Nt=/^$|\/(?:java|ecma)script/i,Ct=/^true\/(.*)/,kt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Lt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},At=pt(s),Ot=At.appendChild(s.createElement("div"));Lt.optgroup=Lt.option,Lt.tbody=Lt.tfoot=Lt.colgroup=Lt.caption=Lt.thead,Lt.th=Lt.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11||this.nodeType===9)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11||this.nodeType===9)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||b.filter(e,[n]).length>0)!t&&n.nodeType===1&&b.cleanData(jt(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Pt(jt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&b.cleanData(jt(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(vt,""):t;if(typeof e=="string"&&!St.test(e)&&(b.support.htmlSerialize||!mt.test(e))&&(b.support.leadingWhitespace||!gt.test(e))&&!Lt[(bt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(yt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(b.cleanData(jt(n,!1)),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return!t&&typeof e!="string"&&(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=h.apply([],e);var i,s,o,u,a,f,l=0,c=this.length,p=this,d=c-1,v=e[0],m=b.isFunction(v);if(m||!(c<=1||typeof v!="string"||b.support.checkClone||!Tt.test(v)))return this.each(function(i){var s=p.eq(i);m&&(e[0]=v.call(this,i,n?s.html():t)),s.domManip(e,n,r)});if(c){f=b.buildFragment(e,this[0].ownerDocument,!1,this),i=f.firstChild,f.childNodes.length===1&&(f=i);if(i){n=n&&b.nodeName(i,"tr"),u=b.map(jt(f,"script"),_t),o=u.length;for(;l<c;l++)s=f,l!==d&&(s=b.clone(s,!0,!0),o&&b.merge(u,jt(s,"script"))),r.call(n&&b.nodeName(this[l],"table")?Mt(this[l],"tbody"):this[l],s,l);if(o){a=u[u.length-1].ownerDocument,b.map(u,Dt);for(l=0;l<o;l++)s=u[l],Nt.test(s.type||"")&&!b._data(s,"globalEval")&&b.contains(a,s)&&(s.src?b.ajax({url:s.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((s.text||s.textContent||s.innerHTML||"").replace(kt,"")))}f=i=null}}return this}}),b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],s=b(e),o=s.length-1;for(;r<=o;r++)n=r===o?this:this.clone(!0),b(s[r])[t](n),p.apply(i,n.get());return this.pushStack(i)}}),b.extend({clone:function(e,t,n){var r,i,s,o,u,a=b.contains(e.ownerDocument,e);b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?s=e.cloneNode(!0):(Ot.innerHTML=e.outerHTML,Ot.removeChild(s=Ot.firstChild));if((!b.support.noCloneEvent||!b.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!b.isXMLDoc(e)){r=jt(s),u=jt(e);for(o=0;(i=u[o])!=null;++o)r[o]&&Bt(i,r[o])}if(t)if(n){u=u||jt(e),r=r||jt(s);for(o=0;(i=u[o])!=null;o++)Ht(i,r[o])}else Ht(e,s);return r=jt(s,"script"),r.length>0&&Pt(r,!a&&jt(e,"script")),r=u=i=null,s},buildFragment:function(e,t,n,r){var i,s,o,u,a,f,l,c=e.length,h=pt(t),p=[],d=0;for(;d<c;d++){s=e[d];if(s||s===0)if(b.type(s)==="object")b.merge(p,s.nodeType?[s]:s);else if(!Et.test(s))p.push(t.createTextNode(s));else{u=u||h.appendChild(t.createElement("div")),a=(bt.exec(s)||["",""])[1].toLowerCase(),l=Lt[a]||Lt._default,u.innerHTML=l[1]+s.replace(yt,"<$1></$2>")+l[2],i=l[0];while(i--)u=u.lastChild;!b.support.leadingWhitespace&&gt.test(s)&&p.push(t.createTextNode(gt.exec(s)[0]));if(!b.support.tbody){s=a==="table"&&!wt.test(s)?u.firstChild:l[1]==="<table>"&&!wt.test(s)?u:0,i=s&&s.childNodes.length;while(i--)b.nodeName(f=s.childNodes[i],"tbody")&&!f.childNodes.length&&s.removeChild(f)}b.merge(p,u.childNodes),u.textContent="";while(u.firstChild)u.removeChild(u.firstChild);u=h.lastChild}}u&&h.removeChild(u),b.support.appendChecked||b.grep(jt(p,"input"),Ft),d=0;while(s=p[d++]){if(r&&b.inArray(s,r)!==-1)continue;o=b.contains(s.ownerDocument,s),u=jt(h.appendChild(s),"script"),o&&Pt(u);if(n){i=0;while(s=u[i++])Nt.test(s.type||"")&&n.push(s)}}return u=null,h},cleanData:function(e,t){var n,r,s,o,u=0,a=b.expando,f=b.cache,c=b.support.deleteExpando,h=b.event.special;for(;(n=e[u])!=null;u++)if(t||b.acceptData(n)){s=n[a],o=s&&f[s];if(o){if(o.events)for(r in o.events)h[r]?b.event.remove(n,r):b.removeEvent(n,r,o.handle);f[s]&&(delete f[s],c?delete n[a]:typeof n.removeAttribute!==i?n.removeAttribute(a):n[a]=null,l.push(s))}}}});var It,qt,Rt,Ut=/alpha\([^)]*\)/i,zt=/opacity\s*=\s*([^)]*)/,Wt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Vt=/^margin/,$t=new RegExp("^("+w+")(.*)$","i"),Jt=new RegExp("^("+w+")(?!px)[a-z%]+$","i"),Kt=new RegExp("^([+-])=("+w+")","i"),Qt={BODY:"block"},Gt={position:"absolute",visibility:"hidden",display:"block"},Yt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,s,o={},u=0;if(b.isArray(n)){s=qt(e),i=n.length;for(;u<i;u++)o[n[u]]=b.css(e,n[u],!1,s);return o}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t=typeof e=="boolean";return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Rt(e,"opacity");return n===""?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=b.camelCase(n),f=e.style;n=b.cssProps[a]||(b.cssProps[a]=tn(f,a)),u=b.cssHooks[n]||b.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=Kt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(b.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!b.cssNumber[a]&&(r+="px"),!b.support.clearCloneStyle&&r===""&&n.indexOf("background")===0&&(f[n]="inherit");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=b.camelCase(n);return n=b.cssProps[a]||(b.cssProps[a]=tn(e.style,a)),u=b.cssHooks[n]||b.cssHooks[a],u&&"get"in u&&(o=u.get(e,!0,r)),o===t&&(o=Rt(e,n,i)),o==="normal"&&n in Yt&&(o=Yt[n]),r===""||r?(s=parseFloat(o),r===!0||b.isNumeric(s)?s||0:o):o},swap:function(e,t,n,r){var i,s,o={};for(s in t)o[s]=e.style[s],e.style[s]=t[s];i=n.apply(e,r||[]);for(s in t)e.style[s]=o[s];return i}}),e.getComputedStyle?(qt=function(t){return e.getComputedStyle(t,null)},Rt=function(e,n,r){var i,s,o,u=r||qt(e),a=u?u.getPropertyValue(n)||u[n]:t,f=e.style;return u&&(a===""&&!b.contains(e.ownerDocument,e)&&(a=b.style(e,n)),Jt.test(a)&&Vt.test(n)&&(i=f.width,s=f.minWidth,o=f.maxWidth,f.minWidth=f.maxWidth=f.width=a,a=u.width,f.width=i,f.minWidth=s,f.maxWidth=o)),a}):s.documentElement.currentStyle&&(qt=function(e){return e.currentStyle},Rt=function(e,n,r){var i,s,o,u=r||qt(e),a=u?u[n]:t,f=e.style;return a==null&&f&&f[n]&&(a=f[n]),Jt.test(a)&&!Wt.test(n)&&(i=f.left,s=e.runtimeStyle,o=s&&s.left,o&&(s.left=e.currentStyle.left),f.left=n==="fontSize"?"1em":a,a=f.pixelLeft+"px",f.left=i,o&&(s.left=o)),a===""?"auto":a}),b.each(["height","width"],function(e,t){b.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&Xt.test(b.css(e,"display"))?b.swap(e,Gt,function(){return un(e,t,r)}):un(e,t,r)},set:function(e,n,r){var i=r&&qt(e);return sn(e,n,r?on(e,t,r,b.support.boxSizing&&b.css(e,"boxSizing",!1,i)==="border-box",i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return zt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if((t>=1||t==="")&&b.trim(s.replace(Ut,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(t===""||r&&!r.filter)return}n.filter=Ut.test(s)?s.replace(Ut,i):s+" "+i}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,t){if(t)return b.swap(e,{display:"inline-block"},Rt,[e,"marginRight"])}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,t){b.cssHooks[t]={get:function(e,n){if(n)return n=Rt(e,t),Jt.test(n)?b(e).position()[t]+"px":n}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0||!b.support.reliableHiddenOffsets&&(e.style&&e.style.display||b.css(e,"display"))==="none"},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},s=typeof n=="string"?n.split(" "):[n];for(;r<4;r++)i[e+Zt[r]+t]=s[r]||s[r-2]||s[0];return i}},Vt.test(e)||(b.cssHooks[e+t].set=sn)});var ln=/%20/g,cn=/\[\]$/,hn=/\r?\n/g,pn=/^(?:submit|button|image|reset|file)$/i,dn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&dn.test(this.nodeName)&&!pn.test(e)&&(this.checked||!xt.test(e))}).map(function(e,t){var n=b(this).val();return n==null?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(hn,"\r\n")}}):{name:t.name,value:n.replace(hn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],s=function(e,t){t=b.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional);if(b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){s(this.name,this.value)});else for(r in e)vn(r,e[r],n,s);return i.join("&").replace(ln,"+")},b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,gn,yn=b.now(),bn=/\?/,wn=/#.*$/,En=/([?&])_=[^&]*/,Sn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,xn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Tn=/^(?:GET|HEAD)$/,Nn=/^\/\//,Cn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,kn=b.fn.load,Ln={},An={},On="*/".concat("*");try{gn=o.href}catch(Mn){gn=s.createElement("a"),gn.href="",gn=gn.href}mn=Cn.exec(gn.toLowerCase())||[],b.fn.load=function(e,n,r){if(typeof e!="string"&&kn)return kn.apply(this,arguments);var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),b.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(o="POST"),u.length>0&&b.ajax({url:e,type:o,dataType:"html",data:n}).done(function(e){s=arguments,u.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){u.each(r,s||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,s){return b.isFunction(r)&&(s=s||i,i=r,r=t),b.ajax({url:e,type:n,dataType:s,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:gn,type:"GET",isLocal:xn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":On,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Pn(Pn(e,b.ajaxSettings),t):Pn(b.ajaxSettings,e)},ajaxPrefilter:_n(Ln),ajaxTransport:_n(An),ajax:function(e,n){function N(e,n,r,i){var l,g,y,E,S,T=n;if(w===2)return;w=2,u&&clearTimeout(u),f=t,o=i||"",x.readyState=e>0?4:0,r&&(E=Hn(c,x,r));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(b.lastModified[s]=S),S=x.getResponseHeader("etag"),S&&(b.etag[s]=S)),e===204?(l=!0,T="nocontent"):e===304?(l=!0,T="notmodified"):(l=Bn(c,E),T=l.state,g=l.data,y=l.error,l=!y);else{y=T;if(e||!T)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[g,T,x]):d.rejectWith(h,[x,T,y]),x.statusCode(m),m=t,a&&p.trigger(l?"ajaxSuccess":"ajaxError",[x,c,l?g:y]),v.fireWith(h,[x,T]),a&&(p.trigger("ajaxComplete",[x,c]),--b.active||b.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=b.ajaxSetup({},n),h=c.context||c,p=c.context&&(h.nodeType||h.jquery)?b(h):b.event,d=b.Deferred(),v=b.Callbacks("once memory"),m=c.statusCode||{},g={},y={},w=0,S="canceled",x={readyState:0,getResponseHeader:function(e){var t;if(w===2){if(!l){l={};while(t=Sn.exec(o))l[t[1].toLowerCase()]=t[2]}t=l[e.toLowerCase()]}return t==null?null:t},getAllResponseHeaders:function(){return w===2?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return w||(e=y[n]=y[n]||e,g[e]=t),this},overrideMimeType:function(e){return w||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(w<2)for(t in e)m[t]=[m[t],e[t]];else x.always(e[x.status]);return this},abort:function(e){var t=e||S;return f&&f.abort(t),N(0,t),this}};d.promise(x).complete=v.add,x.success=x.done,x.error=x.fail,c.url=((e||c.url||gn)+"").replace(wn,"").replace(Nn,mn[1]+"//"),c.type=n.method||n.type||c.method||c.type,c.dataTypes=b.trim(c.dataType||"*").toLowerCase().match(E)||[""],c.crossDomain==null&&(r=Cn.exec(c.url.toLowerCase()),c.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||(r[1]==="http:"?80:443))==(mn[3]||(mn[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=b.param(c.data,c.traditional)),Dn(Ln,c,n,x);if(w===2)return x;a=c.global,a&&b.active++===0&&b.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Tn.test(c.type),s=c.url,c.hasContent||(c.data&&(s=c.url+=(bn.test(s)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=En.test(s)?s.replace(En,"$1_="+yn++):s+(bn.test(s)?"&":"?")+"_="+yn++)),c.ifModified&&(b.lastModified[s]&&x.setRequestHeader("If-Modified-Since",b.lastModified[s]),b.etag[s]&&x.setRequestHeader("If-None-Match",b.etag[s])),(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+On+"; q=0.01":""):c.accepts["*"]);for(i in c.headers)x.setRequestHeader(i,c.headers[i]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&w!==2){S="abort";for(i in{success:1,error:1,complete:1})x[i](c[i]);f=Dn(An,c,n,x);if(!f)N(-1,"No Transport");else{x.readyState=1,a&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{w=1,f.send(g,N)}catch(T){if(!(w<2))throw T;N(-1,T)}}return x}return x.abort()},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}}),b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=s.head||b("head")[0]||s.documentElement;return{send:function(t,i){n=s.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){if(t||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var jn=[],Fn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=jn.pop()||b.expando+"_"+yn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.jsonp!==!1&&(Fn.test(n.url)?"url":typeof n.data=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Fn.test(n.data)&&"data");if(a||n.dataTypes[0]==="jsonp")return s=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,a?n[a]=n[a].replace(Fn,"$1"+s):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||b.error(s+" was not called"),u[0]},n.dataTypes[0]="json",o=e[s],e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,jn.push(s)),u&&b.isFunction(o)&&o(u[0]),u=o=t}),"script"});var In,qn,Rn=0,Un=e.ActiveXObject&&function(){var e;for(e in In)In[e](t,!0)};b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&zn()||Wn()}:zn,qn=b.ajaxSettings.xhr(),b.support.cors=!!qn&&"withCredentials"in qn,qn=b.support.ajax=!!qn,qn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=b.noop,Un&&delete In[o]);if(i)a.readyState!==4&&a.abort();else{c={},u=a.status,f=a.getAllResponseHeaders(),typeof a.responseText=="string"&&(c.text=a.responseText);try{l=a.statusText}catch(h){l=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(p){i||s(-1,p)}c&&s(u,l,c,f)},n.async?a.readyState===4?setTimeout(r):(o=++Rn,Un&&(In||(In={},b(e).unload(Un)),In[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Vn,$n=/^(?:toggle|show|hide)$/,Jn=new RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Kn=/queueHooks$/,Qn=[nr],Gn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=Jn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(b.cssNumber[e]?"":"px");if(r!=="px"&&u){u=b.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,b.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Gn[n]=Gn[n]||[],Gn[n].unshift(t)},prefilter:function(e,t){t?Qn.unshift(e):Qn.push(e)}}),b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.options.duration?this.pos=t=b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=b.css(e.elem,e.prop,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(e.elem.style[b.cssProps[e.prop]]!=null||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return e==null||typeof e=="boolean"?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),s=b.speed(t,n,r),o=function(){var t=er(this,b.extend({},e),s);o.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return o.finish=o,i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=b.timers,o=b._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Kn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],s=b.timers,o=r?r.length:0;n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this);for(t=s.length;t--;)s[t].elem===this&&s[t].queue===e&&(s[t].anim.stop(!0),s.splice(t,1));for(t=0;t<o;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&typeof e=="object"?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};r.duration=b.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;Xn=b.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Vn||(Vn=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Vn),Vn=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,s={top:0,left:0},o=this[0],u=o&&o.ownerDocument;if(!u)return;return n=u.documentElement,b.contains(n,o)?(typeof o.getBoundingClientRect!==i&&(s=o.getBoundingClientRect()),r=sr(u),{top:s.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:s.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):s},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");r==="static"&&(e.style.position="relative");var i=b(e),s=i.offset(),o=b.css(e,"top"),u=b.css(e,"left"),a=(r==="absolute"||r==="fixed")&&b.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),b.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},b.fn.extend({position:function(){if(!this[0])return;var e,t,n={top:0,left:0},r=this[0];return b.css(r,"position")==="fixed"?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s.documentElement;while(e&&!b.nodeName(e,"html")&&b.css(e,"position")==="static")e=e.offsetParent;return e||s.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,s){var o=sr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?b(o).scrollLeft():s,r?s:b(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return b.access(this,function(n,r,i){var s;return b.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?b.css(n,r,u):b.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=b,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window),function(e,t){var n=function(){var t=e._data(document,"events");return t&&t.click&&e.grep(t.click,function(e){return e.namespace==="rails"}).length};n()&&e.error("jquery-ujs has already been loaded!");var r;e.rails=r={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var n=e('meta[name="csrf-token"]').attr("content");n&&t.setRequestHeader("X-CSRF-Token",n)},fire:function(t,n,r){var i=e.Event(n);return t.trigger(i,r),i.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(n){var i,s,o,u,a,f,l,c;if(r.fire(n,"ajax:before")){u=n.data("cross-domain"),a=u===t?null:u,f=n.data("with-credentials")||null,l=n.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType;if(n.is("form")){i=n.attr("method"),s=n.attr("action"),o=n.serializeArray();var h=n.data("ujs:submit-button");h&&(o.push(h),n.data("ujs:submit-button",null))}else n.is(r.inputChangeSelector)?(i=n.data("method"),s=n.data("url"),o=n.serialize(),n.data("params")&&(o=o+"&"+n.data("params"))):(i=n.data("method"),s=r.href(n),o=n.data("params")||null);c={type:i||"GET",data:o,dataType:l,beforeSend:function(e,i){return i.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+i.accepts.script),r.fire(n,"ajax:beforeSend",[e,i])},success:function(e,t,r){n.trigger("ajax:success",[e,t,r])},complete:function(e,t){n.trigger("ajax:complete",[e,t])},error:function(e,t,r){n.trigger("ajax:error",[e,t,r])},crossDomain:a},f&&(c.xhrFields={withCredentials:f}),s&&(c.url=s);var p=r.ajax(c);return n.trigger("ajax:send",p),p}return!1},handleMethod:function(n){var i=r.href(n),s=n.data("method"),o=n.attr("target"),u=e("meta[name=csrf-token]").attr("content"),a=e("meta[name=csrf-param]").attr("content"),f=e('<form method="post" action="'+i+'"></form>'),l='<input name="_method" value="'+s+'" type="hidden" />';a!==t&&u!==t&&(l+='<input name="'+a+'" value="'+u+'" type="hidden" />'),o&&f.attr("target",o),f.hide().append(l).appendTo("body"),f.submit()},disableFormElements:function(t){t.find(r.disableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with",t[n]()),t[n](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(r.enableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[n](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t=e.data("confirm"),n=!1,i;return t?(r.fire(e,"confirm")&&(n=r.confirm(t),i=r.fire(e,"confirm:complete",[n])),n&&i):!0},blankInputs:function(t,n,r){var i=e(),s,o,u=n||"input,textarea",a=t.find(u);return a.each(function(){s=e(this),o=s.is("input[type=checkbox],input[type=radio]")?s.is(":checked"):s.val();if(!o==!r){if(s.is("input[type=radio]")&&a.filter('input[type=radio]:checked[name="'+s.attr("name")+'"]').length)return!0;i=i.add(s)}}),i.length?i:!1},nonBlankInputs:function(e,t){return r.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(n,r){var i=n.data("events"),s=!0;return i!==t&&i.submit!==t&&e.each(i.submit,function(e,t){if(typeof t.handler=="function")return s=t.handler(r)}),s},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return r.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},r.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,n){e.crossDomain||r.CSRFProtection(n)}),e(document).delegate(r.linkDisableSelector,"ajax:complete",function(){r.enableElement(e(this))}),e(document).delegate(r.linkClickSelector,"click.rails",function(n){var i=e(this),s=i.data("method"),o=i.data("params");if(!r.allowAction(i))return r.stopEverything(n);i.is(r.linkDisableSelector)&&r.disableElement(i);if(i.data("remote")!==t){if((n.metaKey||n.ctrlKey)&&(!s||s==="GET")&&!o)return!0;var u=r.handleRemote(i);return u===!1?r.enableElement(i):u.error(function(){r.enableElement(i)}),!1}if(i.data("method"))return r.handleMethod(i),!1}),e(document).delegate
(r.inputChangeSelector,"change.rails",function(t){var n=e(this);return r.allowAction(n)?(r.handleRemote(n),!1):r.stopEverything(t)}),e(document).delegate(r.formSubmitSelector,"submit.rails",function(n){var i=e(this),s=i.data("remote")!==t,o=r.blankInputs(i,r.requiredInputSelector),u=r.nonBlankInputs(i,r.fileInputSelector);if(!r.allowAction(i))return r.stopEverything(n);if(o&&i.attr("novalidate")==t&&r.fire(i,"ajax:aborted:required",[o]))return r.stopEverything(n);if(s){if(u){setTimeout(function(){r.disableFormElements(i)},13);var a=r.fire(i,"ajax:aborted:file",[u]);return a||setTimeout(function(){r.enableFormElements(i)},13),a}return!e.support.submitBubbles&&e().jquery<"1.7"&&r.callFormSubmitBindings(i,n)===!1?r.stopEverything(n):(r.handleRemote(i),!1)}setTimeout(function(){r.disableFormElements(i)},13)}),e(document).delegate(r.formInputClickSelector,"click.rails",function(t){var n=e(this);if(!r.allowAction(n))return r.stopEverything(t);var i=n.attr("name"),s=i?{name:i,value:n.val()}:null;n.closest("form").data("ujs:submit-button",s)}),e(document).delegate(r.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&r.disableFormElements(e(this))}),e(document).delegate(r.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&r.enableFormElements(e(this))}),e(function(){var t=e("meta[name=csrf-token]").attr("content"),n=e("meta[name=csrf-param]").attr("content");e('form input[name="'+n+'"]').val(t)}))}(jQuery),function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},t=[].slice;(function(e,t){return typeof define=="function"&&define.amd?define("waypoints",["jquery"],function(n){return t(n,e)}):t(e.jQuery,e)})(this,function(n,r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b;return i=n(r),c=e.call(r,"ontouchstart")>=0,u={horizontal:{},vertical:{}},a=1,l={},f="waypoints-context-id",d="resize.waypoints",v="scroll.waypoints",m=1,g="waypoints-waypoint-ids",y="waypoint",b="waypoints",s=function(){function e(e){var t=this;this.$element=e,this.element=e[0],this.didResize=!1,this.didScroll=!1,this.id="context"+a++,this.oldScroll={x:e.scrollLeft(),y:e.scrollTop()},this.waypoints={horizontal:{},vertical:{}},this.element[f]=this.id,l[this.id]=this,e.bind(v,function(){var e;if(!t.didScroll&&!c)return t.didScroll=!0,e=function(){return t.doScroll(),t.didScroll=!1},r.setTimeout(e,n[b].settings.scrollThrottle)}),e.bind(d,function(){var e;if(!t.didResize)return t.didResize=!0,e=function(){return n[b]("refresh"),t.didResize=!1},r.setTimeout(e,n[b].settings.resizeThrottle)})}return e.prototype.doScroll=function(){var e,t=this;return e={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},c&&(!e.vertical.oldScroll||!e.vertical.newScroll)&&n[b]("refresh"),n.each(e,function(e,r){var i,s,o;return o=[],s=r.newScroll>r.oldScroll,i=s?r.forward:r.backward,n.each(t.waypoints[e],function(e,t){var n,i;if(r.oldScroll<(n=t.offset)&&n<=r.newScroll)return o.push(t);if(r.newScroll<(i=t.offset)&&i<=r.oldScroll)return o.push(t)}),o.sort(function(e,t){return e.offset-t.offset}),s||o.reverse(),n.each(o,function(e,t){if(t.options.continuous||e===o.length-1)return t.trigger([i])})}),this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.refresh=function(){var e,t,r,i=this;return r=n.isWindow(this.element),t=this.$element.offset(),this.doScroll(),e={horizontal:{contextOffset:r?0:t.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:t.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[b]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}},n.each(e,function(e,t){return n.each(i.waypoints[e],function(e,r){var i,s,o,u,a;i=r.options.offset,o=r.offset,s=n.isWindow(r.element)?0:r.$element.offset()[t.offsetProp],n.isFunction(i)?i=i.apply(r.element):typeof i=="string"&&(i=parseFloat(i),r.options.offset.indexOf("%")>-1&&(i=Math.ceil(t.contextDimension*i/100))),r.offset=s-t.contextOffset+t.contextScroll-i;if(r.options.onlyOnScroll&&o!=null||!r.enabled)return;if(o!==null&&o<(u=t.oldScroll)&&u<=r.offset)return r.trigger([t.backward]);if(o!==null&&o>(a=t.oldScroll)&&a>=r.offset)return r.trigger([t.forward]);if(o===null&&t.oldScroll>=r.offset)return r.trigger([t.forward])})})},e.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical))return this.$element.unbind([d,v].join(" ")),delete l[this.id]},e}(),o=function(){function e(e,t,r){var i,s;r=n.extend({},n.fn[y].defaults,r),r.offset==="bottom-in-view"&&(r.offset=function(){var e;return e=n[b]("viewportHeight"),n.isWindow(t.element)||(e=t.$element.height()),e-n(this).outerHeight()}),this.$element=e,this.element=e[0],this.axis=r.horizontal?"horizontal":"vertical",this.callback=r.handler,this.context=t,this.enabled=r.enabled,this.id="waypoints"+m++,this.offset=null,this.options=r,t.waypoints[this.axis][this.id]=this,u[this.axis][this.id]=this,i=(s=this.element[g])!=null?s:[],i.push(this.id),this.element[g]=i}return e.prototype.trigger=function(e){if(!this.enabled)return;this.callback!=null&&this.callback.apply(this.element,e);if(this.options.triggerOnce)return this.destroy()},e.prototype.disable=function(){return this.enabled=!1},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0},e.prototype.destroy=function(){return delete u[this.axis][this.id],delete this.context.waypoints[this.axis][this.id],this.context.checkEmpty()},e.getWaypointsByElement=function(e){var t,r;return r=e[g],r?(t=n.extend({},u.horizontal,u.vertical),n.map(r,function(e){return t[e]})):[]},e}(),p={init:function(e,t){var r;return t==null&&(t={}),(r=t.handler)==null&&(t.handler=e),this.each(function(){var e,r,i,u;return e=n(this),i=(u=t.context)!=null?u:n.fn[y].defaults.context,n.isWindow(i)||(i=e.closest(i)),i=n(i),r=l[i[0][f]],r||(r=new s(i)),new o(e,r,t)}),n[b]("refresh"),this},disable:function(){return p._invoke.call(this,"disable")},enable:function(){return p._invoke.call(this,"enable")},destroy:function(){return p._invoke.call(this,"destroy")},prev:function(e,t){return p._traverse.call(this,e,t,function(e,t,n){if(t>0)return e.push(n[t-1])})},next:function(e,t){return p._traverse.call(this,e,t,function(e,t,n){if(t<n.length-1)return e.push(n[t+1])})},_traverse:function(e,t,i){var s,o;return e==null&&(e="vertical"),t==null&&(t=r),o=h.aggregate(t),s=[],this.each(function(){var t;return t=n.inArray(this,o[e]),i(s,t,o[e])}),this.pushStack(s)},_invoke:function(e){return this.each(function(){var t;return t=o.getWaypointsByElement(this),n.each(t,function(t,n){return n[e](),!0})}),this}},n.fn[y]=function(){var e,r;return r=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],p[r]?p[r].apply(this,e):n.isFunction(r)?p.init.apply(this,arguments):n.isPlainObject(r)?p.init.apply(this,[null,r]):r?n.error("The "+r+" method does not exist in jQuery Waypoints."):n.error("jQuery Waypoints needs a callback function or handler option.")},n.fn[y].defaults={context:r,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1},h={refresh:function(){return n.each(l,function(e,t){return t.refresh()})},viewportHeight:function(){var e;return(e=r.innerHeight)!=null?e:i.height()},aggregate:function(e){var t,r,i;return t=u,e&&(t=(i=l[n(e)[0][f]])!=null?i.waypoints:void 0),t?(r={horizontal:[],vertical:[]},n.each(r,function(e,i){return n.each(t[e],function(e,t){return i.push(t)}),i.sort(function(e,t){return e.offset-t.offset}),r[e]=n.map(i,function(e){return e.element}),r[e]=n.unique(r[e])}),r):[]},above:function(e){return e==null&&(e=r),h._filter(e,"vertical",function(e,t){return t.offset<=e.oldScroll.y})},below:function(e){return e==null&&(e=r),h._filter(e,"vertical",function(e,t){return t.offset>e.oldScroll.y})},left:function(e){return e==null&&(e=r),h._filter(e,"horizontal",function(e,t){return t.offset<=e.oldScroll.x})},right:function(e){return e==null&&(e=r),h._filter(e,"horizontal",function(e,t){return t.offset>e.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(e,t){return p[e]=t},_invoke:function(e){var t;return t=n.extend({},u.vertical,u.horizontal),n.each(t,function(t,n){return n[e](),!0})},_filter:function(e,t,r){var i,s;return i=l[n(e)[0][f]],i?(s=[],n.each(i.waypoints[t],function(e,t){if(r(i,t))return s.push(t)}),s.sort(function(e,t){return e.offset-t.offset}),n.map(s,function(e){return e.element})):[]}},n[b]=function(){var e,n;return n=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],h[n]?h[n].apply(null,e):h.aggregate.call(null,n)},n[b].settings={resizeThrottle:100,scrollThrottle:30},i.load(function(){return n[b]("refresh")})})}.call(this);var libFuncName=null;if(typeof jQuery=="undefined"&&typeof Zepto=="undefined"&&typeof $=="function")libFuncName=$;else if(typeof jQuery=="function")libFuncName=jQuery;else{if(typeof Zepto!="function")throw new TypeError;libFuncName=Zepto}(function(e,t,n,r){"use strict";t.matchMedia=t.matchMedia||function(e,t){var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",s.style.background="none",s.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',r.insertBefore(s,i),n=o.offsetWidth===42,r.removeChild(s),{matches:n,media:e}}}(n),Array.prototype.filter||(Array.prototype.filter=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(typeof e!="function")return;var r=[],i=arguments[1];for(var s=0;s<n;s++)if(s in t){var o=t[s];e&&e.call(i,o,s,t)&&r.push(o)}return r}),Function.prototype.bind||(Function.prototype.bind=function(e){if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>1&&(r=Number(arguments[1]),r!=r?r=0:r!=0&&r!=Infinity&&r!=-Infinity&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1}),e.fn.stop=e.fn.stop||function(){return this},t.Foundation={name:"Foundation",version:"4.2.3",cache:{},init:function(t,n,r,i,s,o){var u,a=[t,r,i,s],f=[],o=o||!1;o&&(this.nc=o),this.rtl=/rtl/i.test(e("html").attr("dir")),this.scope=t||this.scope;if(n&&typeof n=="string"&&!/reflow/i.test(n)){if(/off/i.test(n))return this.off();u=n.split(" ");if(u.length>0)for(var l=u.length-1;l>=0;l--)f.push(this.init_lib(u[l],a))}else{/reflow/i.test(n)&&(a[1]="reflow");for(var c in this.libs)f.push(this.init_lib(c,a))}return typeof n=="function"&&a.unshift(n),this.response_obj(f,a)},response_obj:function(e,t){for(var n=0,r=t.length;n<r;n++)if(typeof t[n]=="function")return t[n]({errors:e.filter(function(e){if(typeof e=="string")return e})});return e},init_lib:function(e,t){return this.trap(function(){return this.libs.hasOwnProperty(e)?(this.patch(this.libs[e]),this.libs[e].init.apply(this.libs[e],t)):function(){}}.bind(this),e)},trap:function(e,t){if(!this.nc)try{return e()}catch(n){return this.error({name:t,message:"could not be initialized",more:n.name+" "+n.message})}return e()},patch:function(e){this.fix_outer(e),e.scope=this.scope,e.rtl=this.rtl},inherit:function(e,t){var n=t.split(" ");for(var r=n.length-1;r>=0;r--)this.lib_methods.hasOwnProperty(n[r])&&(this.libs[e.name][n[r]]=this.lib_methods[n[r]])},random_str:function(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");e||(e=Math.floor(Math.random()*t.length));var n="";for(var r=0;r<e;r++)n+=t[Math.floor(Math.random()*t.length)];return n},libs:{},lib_methods:{set_data:function(e,t){var n=[this.name,+(new Date),Foundation.random_str(5)].join("-");return Foundation.cache[n]=t,e.attr("data-"+this.name+"-id",n),t},get_data:function(e){return Foundation.cache[e.attr("data-"+this.name+"-id")]},remove_data:function(t){t?(delete Foundation.cache[t.attr("data-"+this.name+"-id")],t.attr("data-"+this.name+"-id","")):e("[data-"+this.name+"-id]").each(function(){delete Foundation.cache[e(this).attr("data-"+this.name+"-id")],e(this).attr("data-"+this.name+"-id","")})},throttle:function(e,t){var n=null;return function(){var r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(r,i)},t)}},data_options:function(t){function u(e){return!isNaN(e-0)&&e!==null&&e!==""&&e!==!1&&e!==!0}function a(t){return typeof t=="string"?e.trim(t):t}var n={},r,i,s=(t.attr("data-options")||":").split(";"),o=s.length;for(r=o-1;r>=0;r--)i=s[r].split(":"),/true/i.test(i[1])&&(i[1]=!0),/false/i.test(i[1])&&(i[1]=!1),u(i[1])&&(i[1]=parseInt(i[1],10)),i.length===2&&i[0].length>0&&(n[a(i[0])]=a(i[1]));return n},delay:function(e,t){return setTimeout(e,t)},scrollTo:function(n,r,i){if(i<0)return;var s=r-e(t).scrollTop(),o=s/i*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(o,10))||(t.scrollTo(0,e(t).scrollTop()+o),this.scrollTo(n,r,i-10))}.bind(this),10)},scrollLeft:function(e){if(!e.length)return;return"scrollLeft"in e[0]?e[0].scrollLeft:e[0].pageXOffset},empty:function(e){if(e.length&&e.length>0)return!1;if(e.length&&e.length===0)return!0;for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0}},fix_outer:function(e){e.outerHeight=function(e,t){return typeof Zepto=="function"?e.height():typeof t!="undefined"?e.outerHeight(t):e.outerHeight()},e.outerWidth=function(e){return typeof Zepto=="function"?e.width():typeof bool!="undefined"?e.outerWidth(bool):e.outerWidth()}},error:function(e){return e.name+" "+e.message+"; "+e.more},off:function(){return e(this.scope).off(".fndtn"),e(t).off(".fndtn"),!0},zj:function(){return typeof Zepto!="undefined"?Zepto:jQuery}()},e.fn.foundation=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(e)),this})}})(libFuncName,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.alerts={name:"alerts",version:"4.2.2",settings:{speed:300,callback:function(){}},init:function(t,n,r){return this.scope=t||this.scope,typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;e(this.scope).on("click.fndtn.alerts","[data-alert] a.close",function(n){n.preventDefault(),e(this).closest("[data-alert]").fadeOut(t.speed,function(){e(this).remove(),t.settings.callback()})}),this.settings.init=!0},off:function(){e(this.scope).off(".fndtn.alerts")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.clearing={name:"clearing",version:"4.2.2",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close",init:!1,locked:!1},init:function(t,n,r){var i=this;return Foundation.inherit(this,"set_data get_data remove_data throttle data_options"),typeof n=="object"&&(r=e.extend(!0,this.settings,n)),typeof n!="string"?(e(this.scope).find("ul[data-clearing]").each(function(){var t=e(this),n=n||{},r=t.find("li"),s=i.get_data(t);!s&&r.length>0&&(n.$parent=t.parent(),i.set_data(t,e.extend({},i.settings,n,i.data_options(t))),i.assemble(t.find("li")),i.settings.init||i.events().swipe_events())}),this.settings.init):this[n].call(this,r)},events:function(){var n=this;return e(this.scope).on("click.fndtn.clearing","ul[data-clearing] li",function(t,r,i){var r=r||e(this),i=i||r,s=r.next("li"),o=n.get_data(r.parent()),u=e(t.target);t.preventDefault(),o||n.init(),i.hasClass("visible")&&r[0]===i[0]&&s.length>0&&n.is_open(r)&&(i=s,u=i.find("img")),n.open(u,r,i),n.update_paddles(i)}).on("click.fndtn.clearing",".clearing-main-next",function(e){this.nav(e,"next")}.bind(this)).on("click.fndtn.clearing",".clearing-main-prev",function(e){this.nav(e,"prev")}.bind(this)).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}).on("keydown.fndtn.clearing",function(e){this.keydown(e)}.bind(this)),e(t).on("resize.fndtn.clearing",function(){this.resize()}.bind(this)),this.settings.init=!0,this},swipe_events:function(){var t=this;e(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(t){t.touches||(t=t.originalEvent);var n={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};e(this).data("swipe-transition",n),t.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(n){n.touches||(n=n.originalEvent);if(n.touches.length>1||n.scale&&n.scale!==1)return;var r=e(this).data("swipe-transition");typeof r=="undefined"&&(r={}),r.delta_x=n.touches[0].pageX-r.start_page_x,typeof r.is_scrolling=="undefined"&&(r.is_scrolling=!!(r.is_scrolling||Math.abs(r.delta_x)<Math.abs(n.touches[0].pageY-r.start_page_y)));if(!r.is_scrolling&&!r.active){n.preventDefault();var i=r.delta_x<0?"next":"prev";r.active=!0,t.nav(n,i)}}).on("touchend.fndtn.clearing",".visible-img",function(t){e(this).data("swipe-transition",{}),t.stopPropagation()})},assemble:function(t){var n=t.parent();n.after('<div id="foundationClearingHolder"></div>');var r=e("#foundationClearingHolder"),i=this.get_data(n),s=n.detach(),o={grid:'<div class="carousel">'+this.outerHTML(s[0])+"</div>",viewing:i.templates.viewing},u='<div class="clearing-assembled"><div>'+o.viewing+o.grid+"</div></div>";return r.after(u).remove()},open:function(e,t,n){var r=n.closest(".clearing-assembled"),i=r.find("div").first(),s=i.find(".visible-img"),o=s.find("img").not(e);this.locked()||(o.attr("src",this.load(e)).css("visibility","hidden"),this.loaded(o,function(){o.css("visibility","visible"),r.addClass("clearing-blackout"),i.addClass("clearing-container"),s.show(),this.fix_height(n).caption(s.find(".clearing-caption"),e).center(o).shift(t,n,function(){n.siblings().removeClass("visible"),n.addClass("visible")})}.bind(this)))},close:function(t,n){t.preventDefault();var r=function(e){return/blackout/.test(e.selector)?e:e.closest(".clearing-blackout")}(e(n)),i,s;return n===t.target&&r&&(i=r.find("div").first(),s=i.find(".visible-img"),this.settings.prev_index=0,r.find("ul[data-clearing]").attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),i.removeClass("clearing-container"),s.hide()),!1},is_open:function(e){return e.parent().attr("style").length>0},keydown:function(t){var n=e(".clearing-blackout").find("ul[data-clearing]");t.which===39&&this.go(n,"next"),t.which===37&&this.go(n,"prev"),t.which===27&&e("a.clearing-close").trigger("click")},nav:function(t,n){var r=e(".clearing-blackout").find("ul[data-clearing]");t.preventDefault(),this.go(r,n)},resize:function(){var t=e(".clearing-blackout .visible-img").find("img");t.length&&this.center(t)},fix_height:function(t){var n=t.parent().children(),r=this;return n.each(function(){var t=e(this),n=t.find("img");t.height()>r.outerHeight(n)&&t.addClass("fix-height")}).closest("ul").width(n.length*100+"%"),this},update_paddles:function(e){var t=e.closest(".carousel").siblings(".visible-img");e.next().length>0?t.find(".clearing-main-next").removeClass("disabled"):t.find(".clearing-main-next").addClass("disabled"),e.prev().length>0?t.find(".clearing-main-prev").removeClass("disabled"):t.find(".clearing-main-prev").addClass("disabled")},center:function(e){return this.rtl?e.css({marginRight:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}):e.css({marginLeft:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}),this},load:function(e){if(e[0].nodeName==="A")var t=e.attr("href");else var t=e.parent().attr("href");return this.preload(e),t?t:e.attr("src")},preload:function(e){this.img(e.closest("li").next()).img(e.closest("li").prev())},loaded:function(e,t){function n(){t()}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)},img:function(e){if(e.length){var t=new Image,n=e.find("a");n.length?t.src=n.attr("href"):t.src=e.find("img").attr("src")}return this},caption:function(e,t){var n=t.data("caption");return n?e.html(n).show():e.text("").hide(),this},go:function(e,t){var n=e.find(".visible"),r=n[t]();r.length&&r.find("img").trigger("click",[n,r])},shift:function(e,t,n){var r=t.parent(),i=this.settings.prev_index||t.index(),s=this.direction(r,e,t),o=parseInt(r.css("left"),10),u=this.outerWidth(t),a;t.index()!==i&&!/skip/.test(s)?/left/.test(s)?(this.lock(),r.animate({left:o+u},300,this.unlock())):/right/.test(s)&&(this.lock(),r.animate({left:o-u},300,this.unlock())):/skip/.test(s)&&(a=t.index()-this.settings.up_count,this.lock(),a>0?r.animate({left:-(a*u)},300,this.unlock()):r.animate({left:0},300,this.unlock())),n()},direction:function(t,n,r){var i=t.find("li"),s=this.outerWidth(i)+this.outerWidth(i)/4,o=Math.floor(this.outerWidth(e(".clearing-container"))/s)-1,u=i.index(r),a;return this.settings.up_count=o,this.adjacent(this.settings.prev_index,u)?u>o&&u>this.settings.prev_index?a="right":u>o-1&&u<=this.settings.prev_index?a="left":a=!1:a="skip",this.settings.prev_index=u,a},adjacent:function(e,t){for(var n=t+1;n>=t-1;n--)if(n===e)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".fndtn.clearing"),e(t).off(".fndtn.clearing"),this.remove_data(),this.settings.init=!1},reflow:function(){this.init()}}}(Foundation.zj,this,this.document),function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g,o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a),u===null&&(a.expires=-1);if(typeof a.expires=="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}return u=o.json?JSON.stringify(u):String(u),t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s,h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={},e.removeCookie=function(t,n){return e.cookie(t)!==null?(e.cookie(t,null,n),!0):!1}}(Foundation.zj,document),function(e,t,n,r){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"4.2.0",settings:{activeClass:"open",is_hover:!1,opened:function(){},closed:function(){}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle scrollLeft data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("click.fndtn.dropdown","[data-dropdown]",function(t){var r=e.extend({},n.settings,n.data_options(e(this)));t.preventDefault(),r.is_hover||n.toggle(e(this))}).on("mouseenter","[data-dropdown]",function(t){var r=e.extend({},n.settings,n.data_options(e(this)));r.is_hover&&n.toggle(e(this))}).on("mouseleave","[data-dropdown-content]",function(t){var r=e('[data-dropdown="'+e(this).attr("id")+'"]'),i=e.extend({},n.settings,n.data_options(r));i.is_hover&&n.close.call(n,e(this))}).on("opened.fndtn.dropdown","[data-dropdown-content]",this.settings.opened).on("closed.fndtn.dropdown","[data-dropdown-content]",this.settings.closed),e("body").on("click.fndtn.dropdown",function(t){var r=e(t.target).closest("[data-dropdown-content]");if(e(t.target).data("dropdown"))return;if(r.length>0&&(e(t.target).is("[data-dropdown-content]")||e.contains(r.first()[0],t.target))){t.stopPropagation();return}n.close.call(n,e("[data-dropdown-content]"))}),e(t).on("resize.fndtn.dropdown",n.throttle(function(){n.resize.call(n)},50)).trigger("resize"),this.settings.init=!0},close:function(t){var n=this;t.each(function(){e(this).hasClass(n.settings.activeClass)&&(e(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(n.settings.activeClass),e(this).trigger("closed"))})},open:function(e,t){this.css(e.addClass(this.settings.activeClass),t),e.trigger("opened")},toggle:function(t){var n=e("#"+t.data("dropdown"));this.close.call(this,e("[data-dropdown-content]").not(n)),n.hasClass(this.settings.activeClass)?this.close.call(this,n):(this.close.call(this,e("[data-dropdown-content]")),this.open.call(this,n,t))},resize:function(){var t=e("[data-dropdown-content].open"),n=e("[data-dropdown='"+t.attr("id")+"']");t.length&&n.length&&this.css(t,n)},css:function(n,r){var i=n.offsetParent();if(i.length>0&&/body/i.test(n.offsetParent()[0].nodeName)){var s=r.offset();s.top-=n.offsetParent().offset().top,s.left-=n.offsetParent().offset().left}else var s=r.position();if(this.small())n.css({position:"absolute",width:"95%",left:"2.5%","max-width":"none",top:s.top+this.outerHeight(r)});else{if(!Foundation.rtl&&e(t).width()>this.outerWidth(n)+r.offset().left){var o=s.left;n.hasClass("right")&&n.removeClass("right")}else{n.hasClass("right")||n.addClass("right");var o=s.left-(this.outerWidth(n)-this.outerWidth(r))}n.attr("style","").css({position:"absolute",top:s.top+this.outerHeight(r),left:o})}return n},small:function(){return e(t).width()<768||e("html").hasClass("lt-ie9")},off:function(){e(this.scope).off(".fndtn.dropdown"),e("html, body").off(".fndtn.dropdown"),e(t).off(".fndtn.dropdown"),e("[data-dropdown-content]").off(".fndtn.dropdown"),this.settings.init=!1},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.forms={name:"forms",version:"4.2.3",cache:{},settings:{disable_class:"no-custom",last_combo:null},init:function(t,n,r){return typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.assemble(),this.settings.init):this[n].call(this,r)},assemble:function(){e('form.custom input[type="radio"]',e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).each(this.append_custom_markup),e('form.custom input[type="checkbox"]',e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).each(this.append_custom_markup),e("form.custom select",e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).not("[multiple=multiple]").each(this.append_custom_select)},events:function(){var r=this;e(this.scope).on("click.fndtn.forms","form.custom span.custom.checkbox",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_checkbox(e(this))}).on("click.fndtn.forms","form.custom span.custom.radio",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_radio(e(this))}).on("change.fndtn.forms","form.custom select",function(t,n){if(e(this).is('[data-customforms="disabled"]'))return;r.refresh_custom_select(e(this),n)}).on("click.fndtn.forms","form.custom label",function(t){if(e(t.target).is("label")){var n=e("#"+r.escape(e(this).attr("for"))).not('[data-customforms="disabled"]'),i,s;n.length!==0&&(n.attr("type")==="checkbox"?(t.preventDefault(),i=e(this).find("span.custom.checkbox"),i.length===0&&(i=n.add(this).siblings("span.custom.checkbox").first()),r.toggle_checkbox(i)):n.attr("type")==="radio"&&(t.preventDefault(),s=e(this).find("span.custom.radio"),s.length===0&&(s=n.add(this).siblings("span.custom.radio").first()),r.toggle_radio(s)))}}).on("mousedown.fndtn.forms","form.custom div.custom.dropdown",function(){return!1}).on("click.fndtn.forms","form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector",function(t){var n=e(this),s=n.closest("div.custom.dropdown"),o=i(s,"select");s.hasClass("open")||e(r.scope).trigger("click"),t.preventDefault();if(!1===o.is(":disabled"))return s.toggleClass("open"),s.hasClass("open")?e(r.scope).on("click.fndtn.forms.customdropdown",function(){s.removeClass("open"),e(r.scope).off(".fndtn.forms.customdropdown")}):e(r.scope).on(".fndtn.forms.customdropdown"),!1}).on("click.fndtn.forms touchend.fndtn.forms","form.custom div.custom.dropdown li",function(t){var n=e(this),r=n.closest("div.custom.dropdown"),s=i(r,"select"),o=0;t.preventDefault(),t.stopPropagation();if(!e(this).hasClass("disabled")){e("div.dropdown").not(r).removeClass("open");var u=n.closest("ul").find("li.selected");u.removeClass("selected"),n.addClass("selected"),r.removeClass("open").find("a.current").text(n.text()),n.closest("ul").find("li").each(function(e){n[0]===this&&(o=e)}),s[0].selectedIndex=o,s.data("prevalue",u.html()),s.trigger("change")}}),e(t).on("keydown",function(t){var r=n.activeElement,i=Foundation.libs.forms,s=e(".custom.dropdown.open");if(s.length>0){t.preventDefault(),t.which===13&&s.find("li.selected").trigger("click"),t.which===27&&s.removeClass("open");if(t.which>=65&&t.which<=90){var o=i.go_to(s,t.which),u=s.find("li.selected");o&&(u.removeClass("selected"),i.scrollTo(o.addClass("selected"),300))}if(t.which===38){var u=s.find("li.selected"),a=u.prev(":not(.disabled)");a.length>0&&(a.parent()[0].scrollTop=a.parent().scrollTop()-i.outerHeight(a),u.removeClass("selected"),a.addClass("selected"))}else if(t.which===40){var u=s.find("li.selected"),o=u.next(":not(.disabled)");o.length>0&&(o.parent()[0].scrollTop=o.parent().scrollTop()+i.outerHeight(o),u.removeClass("selected"),o.addClass("selected"))}}}),this.settings.init=!0},go_to:function(e,t){var n=e.find("li"),r=n.length;if(r>0)for(var i=0;i<r;i++){var s=n.eq(i).text().charAt(0).toLowerCase();if(s===String.fromCharCode(t).toLowerCase())return n.eq(i)}},scrollTo:function(e,t){if(t<0)return;var n=e.parent(),r=this.outerHeight(e),i=r*e.index()-n.scrollTop(),s=i/t*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(s,10))||(n[0].scrollTop=n.scrollTop()+s,this.scrollTo(e,t-10))}.bind(this),10)},append_custom_markup:function(t,n){var r=e(n),i=r.attr("type"),s=r.next("span.custom."+i);r.parent().hasClass("switch")||r.addClass("hidden-field"),s.length===0&&(s=e('<span class="custom '+i+'"></span>').insertAfter(r)),s.toggleClass("checked",r.is(":checked")),s.toggleClass("disabled",r.is(":disabled"))},append_custom_select:function(t,n){var r=Foundation.libs.forms,i=e(n),s=i.next("div.custom.dropdown"),o=s.find("ul"),u=s.find(".current"),a=s.find(".selector"),f=i.find("option"),l=f.filter(":selected"),c=i.attr("class")?i.attr("class").split(" "):[],h=0,p="",d,v=!1;if(s.length===0){var m=i.hasClass("small")?"small":i.hasClass("medium")?"medium":i.hasClass("large")?"large":i.hasClass("expand")?"expand":"";s=e('<div class="'+["custom","dropdown",m].concat(c).filter(function(e,t,n){return e===""?!1:n.indexOf(e)===t}).join(" ")+'"><a href="#" class="selector"></a><ul /></div>'),a=s.find(".selector"),o=s.find("ul"),p=f.map(function(){var t=e(this).attr("class")?e(this).attr("class"):"";return"<li class='"+t+"'>"+e(this).html()+"</li>"}).get().join(""),o.append(p),v=s.prepend('<a href="#" class="current">'+l.html()+"</a>").find(".current"),i.after(s).addClass("hidden-field")}else p=f.map(function(){return"<li>"+e(this).html()+"</li>"}).get().join(""),o.html("").append(p);r.assign_id(i,s),s.toggleClass("disabled",i.is(":disabled")),d=o.find("li"),r.cache[s.data("id")]=d.length,f.each(function(t){this.selected&&(d.eq(t).addClass("selected"),v&&v.html(e(this).html())),e(this).is(":disabled")&&d.eq(t).addClass("disabled")});if(!s.is(".small, .medium, .large, .expand")){s.addClass("open");var r=Foundation.libs.forms;r.hidden_fix.adjust(o),h=r.outerWidth(d)>h?r.outerWidth(d):h,Foundation.libs.forms.hidden_fix.reset(),s.removeClass("open")}},assign_id:function(e,t){var n=[+(new Date),Foundation.random_str(5)].join("-");e.attr("data-id",n),t.attr("data-id",n)},refresh_custom_select
:function(t,n){var r=this,i=0,s=t.next(),o=t.find("option"),u=s.find("li");if(u.length!==this.cache[s.data("id")]||n)s.find("ul").html(""),o.each(function(){var t=e("<li>"+e(this).html()+"</li>");s.find("ul").append(t)}),o.each(function(t){this.selected&&(s.find("li").eq(t).addClass("selected"),s.find(".current").html(e(this).html())),e(this).is(":disabled")&&s.find("li").eq(t).addClass("disabled")}),s.removeAttr("style").find("ul").removeAttr("style"),s.find("li").each(function(){s.addClass("open"),r.outerWidth(e(this))>i&&(i=r.outerWidth(e(this))),s.removeClass("open")}),u=s.find("li"),this.cache[s.data("id")]=u.length},toggle_checkbox:function(e){var t=e.prev(),n=t[0];!1===t.is(":disabled")&&(n.checked=n.checked?!1:!0,e.toggleClass("checked"),t.trigger("change"))},toggle_radio:function(e){var t=e.prev(),n=t.closest("form.custom"),r=t[0];!1===t.is(":disabled")&&(n.find('input[type="radio"][name="'+this.escape(t.attr("name"))+'"]').next().not(e).removeClass("checked"),e.hasClass("checked")||e.toggleClass("checked"),r.checked=e.hasClass("checked"),t.trigger("change"))},escape:function(e){return e?e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):""},hidden_fix:{tmp:[],hidden:null,adjust:function(t){var n=this;n.hidden=t.parents(),n.hidden=n.hidden.add(t).filter(":hidden"),n.hidden.each(function(){var t=e(this);n.tmp.push(t.attr("style")),t.css({visibility:"hidden",display:"block"})})},reset:function(){var t=this;t.hidden.each(function(n){var i=e(this),s=t.tmp[n];s===r?i.removeAttr("style"):i.attr("style",s)}),t.tmp=[],t.hidden=null}},off:function(){e(this.scope).off(".fndtn.forms")},reflow:function(){}};var i=function(t,n){var t=t.prev();while(t.length){if(t.is(n))return t;t=t.prev()}return e()}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.joyride={name:"joyride",version:"4.2.2",defaults:{expose:!1,modal:!1,tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:!0,startOffset:0,nextButton:!0,tipAnimation:"fade",pauseAfter:[],exposed:[],tipAnimationFadeSpeed:300,cookieMonster:!1,cookieName:"joyride",cookieDomain:!1,cookieExpires:365,tipContainer:"body",postRideCallback:function(){},postStepCallback:function(){},preStepCallback:function(){},preRideCallback:function(){},postExposeCallback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',exposeCover:'<div class="joyride-expose-cover"></div>'},exposeAddClass:""},settings:{},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle data_options scrollTo scrollLeft delay"),typeof n=="object"?e.extend(!0,this.settings,this.defaults,n):e.extend(!0,this.settings,this.defaults,r),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())}.bind(this)).on("click.joyride",".joyride-close-tip",function(e){e.preventDefault(),this.end()}.bind(this)),e(t).on("resize.fndtn.joyride",n.throttle(function(){if(e("[data-joyride]").length>0&&n.settings.$next_tip){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t),n.expose(t)})}n.is_phone()?n.pos_phone():n.pos_default(!1,!0)}},100)),this.settings.init=!0},start:function(){var t=this,n=e(this.scope).find("[data-joyride]"),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;this.settings.init||this.init(),this.settings.$content_el=n,this.settings.$body=e(this.settings.tipContainer),this.settings.body_offset=e(this.settings.tipContainer).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},typeof e.cookie!="function"&&(this.settings.cookieMonster=!1);if(!this.settings.cookieMonster||this.settings.cookieMonster&&e.cookie(this.settings.cookieName)===null)this.settings.$tip_content.each(function(n){var s=e(this);e.extend(!0,t.settings,t.data_options(s));for(var o=i-1;o>=0;o--)t.settings[r[o]]=parseInt(t.settings[r[o]],10);t.create({$li:s,index:n})}),!this.settings.startTimerOnClick&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")},resume:function(){this.set_li(),this.show()},tip_template:function(t){var n,r;return t.tip_class=t.tip_class||"",n=e(this.settings.template.tip).addClass(t.tip_class),r=e.trim(e(t.li).html())+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index),n.append(e(this.settings.template.wrapper)),n.first().attr("data-index",t.index),e(".joyride-content-wrapper",n).append(r),n[0]},timer_instance:function(t){var n;return t===0&&this.settings.startTimerOnClick&&this.settings.timer>0||this.settings.timer===0?n="":n=this.outerHTML(e(this.settings.template.timer)[0]),n},button_text:function(t){return this.settings.nextButton?(t=e.trim(t)||"Next",t=this.outerHTML(e(this.settings.template.button).append(t)[0])):t="",t},create:function(t){var n=t.$li.attr("data-button")||t.$li.attr("data-text"),r=t.$li.attr("class"),i=e(this.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(this.settings.tipContainer).append(i)},show:function(t){var n=null;this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pauseAfter)===-1?(this.settings.paused?this.settings.paused=!1:this.set_li(t),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(t&&(this.settings.preRideCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.preStepCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tipSettings=e.extend(this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tipSettings.tipLocationPattern=this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),n=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tipAnimation)?(n.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tipAnimation)&&(n.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return Modernizr?Modernizr.mq("only screen and (max-width: 767px)")||e(".lt-ie9").length>0:this.settings.$window.width()<767},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e){e?(this.settings.$li=this.settings.$tip_content.eq(this.settings.startOffset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide[data-index='"+this.settings.$li.index()+"']"),this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr("data-class"),r=this.settings.$li.attr("data-id"),i=function(){return r?e(n.getElementById(r)):t?e("."+t).first():e("body")};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2,r=Math.ceil(this.settings.$target.offset().top-n+this.outerHeight(this.settings.$next_tip)),r>0&&this.scrollTo(e("html, body"),r,this.settings.scrollSpeed)},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pauseAfter)===-1},restart:function(){this.hide(),this.settings.$li=r,this.show("init")},pos_default:function(n,r){var i=Math.ceil(e(t).height()/2),s=this.settings.$next_tip.offset(),o=this.settings.$next_tip.find(".joyride-nub"),u=Math.ceil(this.outerWidth(o)/2),a=Math.ceil(this.outerHeight(o)/2),f=n||!1;f&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),typeof r=="undefined"&&(r=!1);if(!/body/i.test(this.settings.$target.selector)){if(this.bottom()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.outerHeight(this.settings.$target),left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"top")}else if(this.top()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.outerHeight(this.settings.$next_tip)-a,left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"bottom")}else this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.outerWidth(this.settings.$target)+this.settings.$target.offset().left+u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.outerWidth(this.settings.$next_tip)-u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"right"));!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tipSettings.tipLocationPattern.length&&(o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tipSettings.tipLocation=this.settings.tipSettings.tipLocationPattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}else this.settings.$li.length&&this.pos_modal(o);f&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(t){var n=this.outerHeight(this.settings.$next_tip),r=this.settings.$next_tip.offset(),i=this.outerHeight(this.settings.$target),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(this.outerHeight(s)/2),u=t||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),u&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o}),s.addClass("top")),u&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(e){this.center(),e.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");t.length<1&&e("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tipAnimation)?t.show():t.fadeIn(this.settings.tipAnimationFadeSpeed)}},expose:function(){var n,r,i,s,o,u="expose-"+Math.floor(Math.random()*1e4);if(arguments.length>0&&arguments[0]instanceof e)i=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;i=this.settings.$target}if(i.length<1)return t.console&&console.error("element not valid",i),!1;n=e(this.settings.template.expose),this.settings.$body.append(n),n.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),r=e(this.settings.template.exposeCover),s={zIndex:i.css("z-index"),position:i.css("position")},o=i.attr("class")==null?"":i.attr("class"),i.css("z-index",parseInt(n.css("z-index"))+1),s.position=="static"&&i.css("position","relative"),i.data("expose-css",s),i.data("orig-class",o),i.attr("class",o+" "+this.settings.exposeAddClass),r.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),this.settings.$body.append(r),n.addClass(u),r.addClass(u),i.data("expose",u),this.settings.postExposeCallback(this.settings.$li.index(),this.settings.$next_tip,i),this.add_exposed(i)},un_expose:function(){var n,r,i,s,o,u=!1;if(arguments.length>0&&arguments[0]instanceof e)r=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;r=this.settings.$target}if(r.length<1)return t.console&&console.error("element not valid",r),!1;n=r.data("expose"),i=e("."+n),arguments.length>1&&(u=arguments[1]),u===!0?e(".joyride-expose-wrapper,.joyride-expose-cover").remove():i.remove(),s=r.data("expose-css"),s.zIndex=="auto"?r.css("z-index",""):r.css("z-index",s.zIndex),s.position!=r.css("position")&&(s.position=="static"?r.css("position",""):r.css("position",s.position)),o=r.data("orig-class"),r.attr("class",o),r.removeData("orig-classes"),r.removeData("expose"),r.removeData("expose-z-index"),this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[],t instanceof e||typeof t=="object"?this.settings.exposed.push(t[0]):typeof t=="string"&&this.settings.exposed.push(t)},remove_exposed:function(t){var n,r;t instanceof e?n=t[0]:typeof t=="string"&&(n=t),this.settings.exposed=this.settings.exposed||[],r=this.settings.exposed.length;for(var i=0;i<r;i++)if(this.settings.exposed[i]==n){this.settings.exposed.splice(i,1);return}},center:function(){var n=e(t);return this.settings.$next_tip.css({top:(n.height()-this.outerHeight(this.settings.$next_tip))/2+n.scrollTop(),left:(n.width()-this.outerWidth(this.settings.$next_tip))/2+this.scrollLeft(n)}),!0},bottom:function(){return/bottom/i.test(this.settings.tipSettings.tipLocation)},top:function(){return/top/i.test(this.settings.tipSettings.tipLocation)},right:function(){return/right/i.test(this.settings.tipSettings.tipLocation)},left:function(){return/left/i.test(this.settings.tipSettings.tipLocation)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+this.scrollLeft(r),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();return s<f&&(s<0?f=0:f=s),u>a&&(a=u),[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),this.scrollLeft(r)>n.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(){this.settings.cookieMonster&&e.cookie(this.settings.cookieName,"ridden",{expires:this.settings.cookieExpires,domain:this.settings.cookieDomain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.$next_tip.data("closed",!0),e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip),this.settings.postRideCallback(this.settings.$li.index(),this.settings.$current_tip),e(".joyride-tip-guide").remove()},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".joyride"),e(t).off(".joyride"),e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),e(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.magellan={name:"magellan",version:"4.2.2",settings:{activeClass:"active"},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||(this.fixed_magellan=e("[data-magellan-expedition]"),this.set_threshold(),this.last_destination=e("[data-magellan-destination]").last(),this.events()),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("arrival.fndtn.magellan","[data-magellan-arrival]",function(t){var r=e(this),i=r.closest("[data-magellan-expedition]"),s=i.attr("data-magellan-active-class")||n.settings.activeClass;r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s),r.addClass(s)}),this.fixed_magellan.on("update-position.fndtn.magellan",function(){var t=e(this)}).trigger("update-position"),e(t).on("resize.fndtn.magellan",function(){this.fixed_magellan.trigger("update-position")}.bind(this)).on("scroll.fndtn.magellan",function(){var r=e(t).scrollTop();n.fixed_magellan.each(function(){var t=e(this);typeof t.data("magellan-top-offset")=="undefined"&&t.data("magellan-top-offset",t.offset().top),typeof t.data("magellan-fixed-position")=="undefined"&&t.data("magellan-fixed-position",!1);var i=r+n.settings.threshold>t.data("magellan-top-offset"),s=t.attr("data-magellan-top-offset");t.data("magellan-fixed-position")!=i&&(t.data("magellan-fixed-position",i),i?(t.addClass("fixed"),t.css({position:"fixed",top:0})):(t.removeClass("fixed"),t.css({position:"",top:""})),i&&typeof s!="undefined"&&s!=0&&t.css({position:"fixed",top:s+"px"}))})}),this.last_destination.length>0&&e(t).on("scroll.fndtn.magellan",function(r){var i=e(t).scrollTop(),s=i+e(t).height(),o=Math.ceil(n.last_destination.offset().top);e("[data-magellan-destination]").each(function(){var t=e(this),r=t.attr("data-magellan-destination"),u=t.offset().top-i;u<=n.settings.threshold&&e("[data-magellan-arrival='"+r+"']").trigger("arrival"),s>=e(n.scope).height()&&o>i&&o<s&&e("[data-magellan-arrival]").last().trigger("arrival")})}),this.settings.init=!0},set_threshold:function(){this.settings.threshold||(this.settings.threshold=this.fixed_magellan.length>0?this.outerHeight(this.fixed_magellan,!0):0)},off:function(){e(this.scope).off(".fndtn.magellan")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"4.2.0",settings:{timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,animation_speed:500,bullets:!0,stack_on_small:!0,navigation_arrows:!0,slide_number:!0,container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning"},init:function(t,n,r){var i=this;Foundation.inherit(i,"data_options"),typeof n=="object"&&e.extend(!0,i.settings,n);if(e(t).is("[data-orbit]")){var s=e.extend(!0,{},i);s._init(idx,el)}e("[data-orbit]",t).each(function(t,n){var r=e.extend(!0,{},i);r._init(t,n)})},_container_html:function(){var e=this;return'<div class="'+e.settings.container_class+'"></div>'},_bullets_container_html:function(t){var n=this,r=e('<ol class="'+n.settings.bullets_container_class+'"></ol>');return t.each(function(t,i){var s=e('<li data-orbit-slide-number="'+(t+1)+'" class=""></li>');t===0&&s.addClass(n.settings.bullets_active_class),r.append(s)}),r},_slide_number_html:function(t,n){var r=this,i=e('<div class="'+r.settings.slide_number_class+'"></div>');return i.append("<span>"+t+"</span> of <span>"+n+"</span>"),i},_timer_html:function(){var e=this;return typeof e.settings.timer_speed=="number"&&e.settings.timer_speed>0?'<div class="'+e.settings.timer_container_class+'"><span></span><div class="'+e.settings.timer_progress_class+'"></div></div>':""},_next_html:function(){var e=this;return'<a href="#" class="'+e.settings.next_class+'">Next <span></span></a>'},_prev_html:function(){var e=this;return'<a href="#" class="'+e.settings.prev_class+'">Prev <span></span></a>'},_init:function(t,n){var r=this,i=e(n),s=i.wrap(r._container_html()).parent(),o=i.children();e.extend(!0,r.settings,r.data_options(i)),r.settings.navigation_arrows&&(s.append(r._prev_html()),s.append(r._next_html())),i.addClass(r.settings.slides_container_class),r.settings.stack_on_small&&s.addClass(r.settings.stack_on_small_class),r.settings.slide_number&&s.append(r._slide_number_html(1,o.length)),s.append(r._timer_html()),r.settings.bullets&&s.after(r._bullets_container_html(o)),i.append(o.first().clone().attr("data-orbit-slide","")),i.prepend(o.last().clone().attr("data-orbit-slide","")),i.css(Foundation.rtl?"marginRight":"marginLeft","-100%"),o.first().addClass(r.settings.active_slide_class),r._init_events(i),r._init_dimensions(i),r._start_timer(i)},_init_events:function(i){var s=this,o=i.parent();e(t).on("load.fndtn.orbit",function(){i.height(""),i.height(i.height(o.height())),i.trigger("orbit:ready")}).on("resize.fndtn.orbit",function(){i.height(""),i.height(i.height(o.height()))}),e(n).on("click.fndtn.orbit","[data-orbit-link]",function(t){t.preventDefault();var n=e(t.currentTarget).attr("data-orbit-link"),r=i.find("[data-orbit-slide="+n+"]").first();r.length===1&&(s._reset_timer(i,!0),s._goto(i,r.index(),function(){}))}),o.siblings("."+s.settings.bullets_container_class).on("click.fndtn.orbit","[data-orbit-slide-number]",function(t){t.preventDefault(),s._reset_timer(i,!0),s._goto(i,e(t.currentTarget).data("orbit-slide-number"),function(){})}),o.on("mouseenter.fndtn.orbit",function(e){s.settings.pause_on_hover&&s._stop_timer(i)}).on("mouseleave.fndtn.orbit",function(e){s.settings.resume_on_mouseout&&s._start_timer(i)}).on("orbit:after-slide-change.fndtn.orbit",function(e,t){var n=o.find("."+s.settings.slide_number_class);n.length===1&&n.replaceWith(s._slide_number_html(t.slide_number,t.total_slides))}).on("orbit:next-slide.fndtn.orbit click.fndtn.orbit","."+s.settings.next_class.split(" ").join("."),function(e){e.preventDefault(),s._reset_timer(i,!0),s._goto(i,"next",function(){})}).on("orbit:prev-slide.fndtn.orbit click.fndtn.orbit","."+s.settings.prev_class.split(" ").join("."),function(e){e.preventDefault(),s._reset_timer(i,!0),s._goto(i,"prev",function(){})}).on("orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit","."+s.settings.timer_container_class,function(t){t.preventDefault();var n=e(t.currentTarget).toggleClass(s.settings.timer_paused_class),r=n.closest("."+s.settings.container_class).find("."+s.settings.slides_container_class);n.hasClass(s.settings.timer_paused_class)?s._stop_timer(r):s._start_timer(r)}).on("touchstart.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};o.data("swipe-transition",t),e.stopPropagation()}).on("touchmove.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var t=o.data("swipe-transition");typeof t=="undefined"&&(t={}),t.delta_x=e.touches[0].pageX-t.start_page_x,typeof t.is_scrolling=="undefined"&&(t.is_scrolling=!!(t.is_scrolling||Math.abs(t.delta_x)<Math.abs(e.touches[0].pageY-t.start_page_y)));if(!t.is_scrolling&&!t.active){e.preventDefault(),s._stop_timer(i);var n=t.delta_x<0?"next":"prev";t.active=!0,s._goto(i,n,function(){})}}).on("touchend.fndtn.orbit",function(e){o.data("swipe-transition",{}),e.stopPropagation()})},_init_dimensions:function(e){var t=e.parent(),n=e.children();e.css("width",n.length*100+"%"),n.css("width",100/n.length+"%"),e.height(t.height()),e.css("width",n.length*100+"%")},_start_timer:function(e){var t=this,n=e.parent(),r=function(){t._reset_timer(e,!1),t._goto(e,"next",function(){t._start_timer(e)})},i=n.find("."+t.settings.timer_container_class),s=i.find("."+t.settings.timer_progress_class),o=s.width()/i.width(),u=t.settings.timer_speed-o*t.settings.timer_speed;s.animate({width:"100%"},u,"linear",r),e.trigger("orbit:timer-started")},_stop_timer:function(e){var t=this,n=e.parent(),r=n.find("."+t.settings.timer_container_class),i=r.find("."+t.settings.timer_progress_class),s=i.width()/r.width();t._rebuild_timer(n,s*100+"%"),e.trigger("orbit:timer-stopped"),r=n.find("."+t.settings.timer_container_class),r.addClass(t.settings.timer_paused_class)},_reset_timer:function(e,t){var n=this,r=e.parent();n._rebuild_timer(r,"0%");if(typeof t=="boolean"&&t){var i=r.find("."+n.settings.timer_container_class);i.addClass(n.settings.timer_paused_class)}},_rebuild_timer:function(t,n){var r=this,i=t.find("."+r.settings.timer_container_class),s=e(r._timer_html()),o=s.find("."+r.settings.timer_progress_class);if(typeof Zepto=="function")i.remove(),t.append(s),o.css("width",n);else if(typeof jQuery=="function"){var u=i.find("."+r.settings.timer_progress_class);u.css("width",n),u.stop()}},_goto:function(t,n,r){var i=this,s=t.parent(),o=t.children(),u=t.find("."+i.settings.active_slide_class),a=u.index(),f=Foundation.rtl?"marginRight":"marginLeft";if(s.hasClass(i.settings.orbit_transition_class))return!1;n==="prev"?a===0?a=o.length-1:a--:n==="next"?a=(a+1)%o.length:typeof n=="number"&&(a=n%o.length),a===o.length-1&&n==="next"?(t.css(f,"0%"),a=1):a===0&&n==="prev"&&(t.css(f,"-"+(o.length-1)*100+"%"),a=o.length-2),s.addClass(i.settings.orbit_transition_class),u.removeClass(i.settings.active_slide_class),e(o[a]).addClass(i.settings.active_slide_class);var l=s.siblings("."+i.settings.bullets_container_class);l.length===1&&(l.children().removeClass(i.settings.bullets_active_class),e(l.children()[a-1]).addClass(i.settings.bullets_active_class));var c="-"+a*100+"%";t.trigger("orbit:before-slide-change");if(t.css(f)===c)s.removeClass(i.settings.orbit_transition_class),t.trigger("orbit:after-slide-change",[{slide_number:a,total_slides:t.children().length-2}]),r();else{var h={};h[f]=c,t.animate(h,i.settings.animation_speed,"linear",function(){s.removeClass(i.settings.orbit_transition_class),t.trigger("orbit:after-slide-change",[{slide_number:a,total_slides:t.children().length-2}]),r()})}}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.reveal={name:"reveal",version:"4.2.2",locked:!1,settings:{animation:"fadeAndPop",animationSpeed:250,closeOnBackgroundClick:!0,closeOnEsc:!0,dismissModalClass:"close-reveal-modal",bgClass:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,r){return Foundation.inherit(this,"data_options delay"),typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r),typeof n!="string"?(this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;return e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal","[data-reveal-id]",function(n){n.preventDefault();if(!t.locked){var r=e(this),i=r.data("reveal-ajax");t.locked=!0;if(typeof i=="undefined")t.open.call(t,r);else{var s=i===!0?r.attr("href"):i;t.open.call(t,r,{url:s})}}}).on("click.fndtn.reveal",this.close_targets(),function(n){n.preventDefault();if(!t.locked){var r=e.extend({},t.settings,t.data_options(e(".reveal-modal.open")));if(e(n.target)[0]===e("."+r.bgClass)[0]&&!r.closeOnBackgroundClick)return;t.locked=!0,t.close.call(t,e(this).closest(".reveal-modal"))}}).on("open.fndtn.reveal",".reveal-modal",this.settings.open).on("opened.fndtn.reveal",".reveal-modal",this.settings.opened).on("opened.fndtn.reveal",".reveal-modal",this.open_video).on("close.fndtn.reveal",".reveal-modal",this.settings.close).on("closed.fndtn.reveal",".reveal-modal",this.settings.closed).on("closed.fndtn.reveal",".reveal-modal",this.close_video),e("body").bind("keyup.reveal",function(n){var r=e(".reveal-modal.open"),i=e.extend({},t.settings,t.data_options(r));n.which===27&&i.closeOnEsc&&r.foundation("reveal","close")}),!0},open:function(t,n){if(t)if(typeof t.selector!="undefined")var r=e("#"+t.data("reveal-id"));else{var r=e(this.scope);n=t}else var r=e(this.scope);if(!r.hasClass("open")){var i=e(".reveal-modal.open");typeof r.data("css-top")=="undefined"&&r.data("css-top",parseInt(r.css("top"),10)).data("offset",this.cache_offset(r)),r.trigger("open"),i.length<1&&this.toggle_bg(r);if(typeof n=="undefined"||!n.url)this.hide(i,this.settings.css.close),this.show(r,this.settings.css.open);else{var s=this,o=typeof n.success!="undefined"?n.success:null;e.extend(n,{success:function(t,n,u){e.isFunction(o)&&o(t,n,u),r.html(t),e(r).foundation("section","reflow"),s.hide(i,s.settings.css.close),s.show(r,s.settings.css.open)}}),e.ajax(n)}}},close:function(t){var t=t&&t.length?t:e(this.scope),n=e(".reveal-modal.open");n.length>0&&(this.locked=!0,t.trigger("close"),this.toggle_bg(t),this.hide(n,this.settings.css.close))},close_targets:function(){var e="."+this.settings.dismissModalClass;return this.settings.closeOnBackgroundClick?e+", ."+this.settings.bgClass:e},toggle_bg:function(t){e(".reveal-modal-bg").length===0&&(this.settings.bg=e("<div />",{"class":this.settings.bgClass}).appendTo("body")),this.settings.bg.filter(":visible").length>0?this.hide(this.settings.bg):this.show(this.settings.bg)},show:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){r.top=e(t).scrollTop()-n.data("offset")+"px";var i={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return this.delay(function(){return n.css(r).animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:1};return this.delay(function(){return n.css(r).animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.css(r).show().css({opacity:1}).addClass("open").trigger("opened")}return/fade/i.test(this.settings.animation)?n.fadeIn(this.settings.animationSpeed/2):n.show()},hide:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){var i={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.hide().css(r).removeClass("open").trigger("closed")}return/fade/i.test(this.settings.animation)?n.fadeOut(this.settings.animationSpeed/2):n.hide()},close_video:function(t){var n=e(this).find(".flex-video"),r=n.find("iframe");r.length>0&&(r.attr("data-src",r[0].src),r.attr("src","about:blank"),n.hide())},open_video:function(t){var n=e(this).find(".flex-video"),i=n.find("iframe");if(i.length>0){var s=i.attr("data-src");if(typeof s=="string")i[0].src=i.attr("data-src");else{var o=i[0].src;i[0].src=r,i[0].src=o}n.show()}},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.section={name:"section",version:"4.2.3",settings:{deep_linking:!1,small_breakpoint
:768,one_up:!0,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",active_region_selector:"section.active, .section.active, .active[data-section-region]",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',callback:function(){}},init:function(t,n,r){var i=this;return Foundation.inherit(this,"throttle data_options position_right offset_right"),typeof n=="object"&&e.extend(!0,i.settings,n),typeof n!="string"?(this.set_active_from_hash(),this.events(),!0):this[n].call(this,r)},events:function(){var r=this;e(this.scope).on("click.fndtn.section","[data-section] .title, [data-section] [data-section-title]",function(t){var n=e(this),i=n.closest(r.settings.region_selector);i.children(r.settings.content_selector).length>0&&(r.toggle_active.call(this,t,r),r.reflow())}),e(t).on("resize.fndtn.section",r.throttle(function(){r.resize.call(this)},30)).on("hashchange",function(){r.settings.toggled||(r.set_active_from_hash(),e(this).trigger("resize"))}).trigger("resize"),e(n).on("click.fndtn.section",function(t){e(t.target).closest(r.settings.title_selector).length<1&&e(r.settings.nav_selector).children(r.settings.region_selector).removeClass("active").attr("style","")})},toggle_active:function(t,n){var r=e(this),n=Foundation.libs.section,i=r.closest(n.settings.region_selector),s=r.siblings(n.settings.content_selector),o=i.parent(),u=e.extend({},n.settings,n.data_options(o)),a=o.children(n.settings.active_region_selector);n.settings.toggled=!0,!u.deep_linking&&s.length>0&&t.preventDefault();if(i.hasClass("active"))(n.small(o)||n.is_vertical_nav(o)||n.is_horizontal_nav(o)||n.is_accordion(o))&&(a[0]!==i[0]||a[0]===i[0]&&!u.one_up)&&i.removeClass("active").attr("style","");else{var a=o.children(n.settings.active_region_selector),f=n.outerHeight(i.children(n.settings.title_selector));if(n.small(o)||u.one_up)n.small(o)?a.attr("style",""):a.attr("style","visibility: hidden; padding-top: "+f+"px;");n.small(o)?i.attr("style",""):i.css("padding-top",f),i.addClass("active"),a.length>0&&a.removeClass("active").attr("style",""),n.is_vertical_tabs(o)&&(s.css("display","block"),a!==null&&a.children(n.settings.content_selector).css("display","none"))}setTimeout(function(){n.settings.toggled=!1},300),u.callback()},resize:function(){var t=Foundation.libs.section,n=e(t.settings.section_selector);n.each(function(){var n=e(this),r=n.children(t.settings.active_region_selector),i=e.extend({},t.settings,t.data_options(n));if(r.length>1)r.not(":first").removeClass("active").attr("style","");else if(r.length<1&&!t.is_vertical_nav(n)&&!t.is_horizontal_nav(n)&&!t.is_accordion(n)){var s=n.children(t.settings.region_selector).first();(i.one_up||!t.small(n))&&s.addClass("active"),t.small(n)?s.attr("style",""):s.css("padding-top",t.outerHeight(s.children(t.settings.title_selector)))}t.small(n)?r.attr("style",""):r.css("padding-top",t.outerHeight(r.children(t.settings.title_selector))),t.position_titles(n),t.is_horizontal_nav(n)&&!t.small(n)||t.is_vertical_tabs(n)&&!t.small(n)?t.position_content(n):t.position_content(n,!1)})},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},set_active_from_hash:function(){var n=t.location.hash.substring(1),r=e("[data-section]"),i=this;r.each(function(){var t=e(this),r=e.extend({},i.settings,i.data_options(t));if(n.length>0&&r.deep_linking){var s=t.children(i.settings.region_selector).attr("style","").removeClass("active"),o=s.map(function(){var t=e(i.settings.content_selector,this),r=t.data("slug");if((new RegExp(r,"i")).test(n))return t}),u=o.length;for(var a=u-1;a>=0;a--)e(o[a]).parent().addClass("active")}})},position_titles:function(t,n){var r=this,i=t.children(this.settings.region_selector).map(function(){return e(this).children(r.settings.title_selector)}),s=0,o=0,r=this;typeof n=="boolean"?i.attr("style",""):i.each(function(){r.is_vertical_tabs(t)?(e(this).css("top",o),o+=r.outerHeight(e(this))):(r.rtl?e(this).css("right",s):e(this).css("left",s),s+=r.outerWidth(e(this)))})},position_content:function(t,n){var r=this,i=t.children(r.settings.region_selector),s=i.map(function(){return e(this).children(r.settings.title_selector)}),o=i.map(function(){return e(this).children(r.settings.content_selector)});if(typeof n=="boolean")o.attr("style",""),t.attr("style",""),o.css("minHeight",""),o.css("maxWidth","");else if(r.is_vertical_tabs(t)&&!r.small(t)){var u=0,a=Number.MAX_VALUE,f=null;i.each(function(){var n=e(this),i=n.children(r.settings.title_selector),s=n.children(r.settings.content_selector),o=0;f=r.outerWidth(i),o=r.outerWidth(t)-f,o<a&&(a=o),u+=r.outerHeight(i),e(this).hasClass("active")||s.css("display","none")}),i.each(function(){var t=e(this).children(r.settings.content_selector);t.css("minHeight",u),t.css("maxWidth",a-2)})}else i.each(function(){var t=e(this),n=t.children(r.settings.title_selector),i=t.children(r.settings.content_selector);r.rtl?i.css({right:r.position_right(n)+1,top:r.outerHeight(n)-2}):i.css({left:n.position().left-1,top:r.outerHeight(n)-2})}),typeof Zepto=="function"?t.height(this.outerHeight(e(s[0]))):t.height(this.outerHeight(e(s[0]))-2)},position_right:function(t){var n=this,r=t.closest(this.settings.section_selector),i=r.children(this.settings.region_selector),s=t.closest(this.settings.section_selector).width(),o=i.map(function(){return e(this).children(n.settings.title_selector)}).length;return s-t.position().left-t.width()*(t.index()+1)-o},reflow:function(t){var t=t||n;e(this.settings.section_selector,t).trigger("resize")},small:function(t){var n=e.extend({},this.settings,this.data_options(t));return this.is_horizontal_tabs(t)?!1:t&&this.is_accordion(t)?!0:e("html").hasClass("lt-ie9")?!0:e("html").hasClass("ie8compat")?!0:e(this.scope).width()<n.small_breakpoint},off:function(){e(this.scope).off(".fndtn.section"),e(t).off(".fndtn.section"),e(n).off(".fndtn.section")}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.tooltips={name:"tooltips",version:"4.2.2",settings:{selector:".has-tip",additionalInheritableClasses:[],tooltipClass:".tooltip",appendTo:"body","disable-for-touch":!1,tipTemplate:function(e,t){return'<span data-selector="'+e+'" class="'+Foundation.libs.tooltips.settings.tooltipClass.substring(1)+'">'+t+'<span class="nub"></span></span>'}},cache:{},init:function(t,n,r){Foundation.inherit(this,"data_options");var i=this;typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r);if(typeof n=="string")return this[n].call(this,r);Modernizr.touch?e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip","[data-tooltip]",function(t){var n=e.extend({},i.settings,i.data_options(e(this)));n["disable-for-touch"]||(t.preventDefault(),e(n.tooltipClass).hide(),i.showOrCreateTip(e(this)))}).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip",this.settings.tooltipClass,function(t){t.preventDefault(),e(this).fadeOut(150)}):e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip","[data-tooltip]",function(t){var n=e(this);/enter|over/i.test(t.type)?i.showOrCreateTip(n):(t.type==="mouseout"||t.type==="mouseleave")&&i.hide(n)})},showOrCreateTip:function(e){var t=this.getTip(e);return t&&t.length>0?this.show(e):this.create(e)},getTip:function(t){var n=this.selector(t),r=null;return n&&(r=e('span[data-selector="'+n+'"]'+this.settings.tooltipClass)),typeof r=="object"?r:!1},selector:function(e){var t=e.attr("id"),n=e.attr("data-tooltip")||e.attr("data-selector");return(t&&t.length<1||!t)&&typeof n!="string"&&(n="tooltip"+Math.random().toString(36).substring(7),e.attr("data-selector",n)),t&&t.length>0?t:n},create:function(t){var n=e(this.settings.tipTemplate(this.selector(t),e("<div></div>").html(t.attr("title")).html())),r=this.inheritable_classes(t);n.addClass(r).appendTo(this.settings.appendTo),Modernizr.touch&&n.append('<span class="tap-to-close">tap to close </span>'),t.removeAttr("title").attr("title",""),this.show(t)},reposition:function(n,r,i){var s,o,u,a,f,l;r.css("visibility","hidden").show(),s=n.data("width"),o=r.children(".nub"),u=this.outerHeight(o),a=this.outerHeight(o),l=function(e,t,n,r,i,s){return e.css({top:t?t:"auto",bottom:r?r:"auto",left:i?i:"auto",right:n?n:"auto",width:s?s:"auto"}).end()},l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",n.offset().left,s);if(e(t).width()<767)l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",12.5,e(this.scope).width()),r.addClass("tip-override"),l(o,-u,"auto","auto",n.offset().left);else{var c=n.offset().left;Foundation.rtl&&(c=n.offset().left+n.offset().width-this.outerWidth(r)),l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",c,s),r.removeClass("tip-override"),i&&i.indexOf("tip-top")>-1?l(r,n.offset().top-this.outerHeight(r),"auto","auto",c,s).removeClass("tip-override"):i&&i.indexOf("tip-left")>-1?l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left-this.outerWidth(r)-u,s).removeClass("tip-override"):i&&i.indexOf("tip-right")>-1&&l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left+this.outerWidth(n)+u,s).removeClass("tip-override")}r.css("visibility","visible").hide()},inheritable_classes:function(t){var n=["tip-top","tip-left","tip-bottom","tip-right","noradius"].concat(this.settings.additionalInheritableClasses),r=t.attr("class"),i=r?e.map(r.split(" "),function(t,r){if(e.inArray(t,n)!==-1)return t}).join(" "):"";return e.trim(i)},show:function(e){var t=this.getTip(e);this.reposition(e,t,e.attr("class")),t.fadeIn(150)},hide:function(e){var t=this.getTip(e);t.fadeOut(150)},reload:function(){var t=e(this);return t.data("fndtn-tooltips")?t.foundationTooltips("destroy").foundationTooltips("init"):t.foundationTooltips("init")},off:function(){e(this.scope).off(".fndtn.tooltip"),e(this.settings.tooltipClass).each(function(t){e("[data-tooltip]").get(t).attr("title",e(this).text())}).remove()},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.topbar={name:"topbar",version:"4.2.3",settings:{index:0,stickyClass:"sticky",custom_back_text:!0,back_text:"Back",is_hover:!0,scrolltop:!0,init:!1},init:function(n,r,i){Foundation.inherit(this,"data_options");var s=this;return typeof r=="object"?e.extend(!0,this.settings,r):typeof i!="undefined"&&e.extend(!0,this.settings,i),typeof r!="string"?(e(".top-bar, [data-topbar]").each(function(){e.extend(!0,s.settings,s.data_options(e(this))),s.settings.$w=e(t),s.settings.$topbar=e(this),s.settings.$section=s.settings.$topbar.find("section"),s.settings.$titlebar=s.settings.$topbar.children("ul").first(),s.settings.$topbar.data("index",0);var n=e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);s.settings.breakPoint=n.width(),n.remove(),s.assemble(),s.settings.$topbar.parent().hasClass("fixed")&&e("body").css("padding-top",s.outerHeight(s.settings.$topbar))}),s.settings.init||this.events(),this.settings.init):this[r].call(this,i)},events:function(){var n=this,r=this.outerHeight(e(".top-bar, [data-topbar]"));e(this.scope).off(".fndtn.topbar").on("click.fndtn.topbar",".top-bar .toggle-topbar, [data-topbar] .toggle-topbar",function(i){var s=e(this).closest(".top-bar, [data-topbar]"),o=s.find("section, .section"),u=s.children("ul").first();i.preventDefault(),n.breakpoint()&&(n.rtl?(o.css({right:"0%"}),o.find(">.name").css({right:"100%"})):(o.css({left:"0%"}),o.find(">.name").css({left:"100%"})),o.find("li.moved").removeClass("moved"),s.data("index",0),s.toggleClass("expanded").css("height","")),s.hasClass("expanded")?s.parent().hasClass("fixed")&&(s.parent().removeClass("fixed"),s.addClass("fixed"),e("body").css("padding-top","0"),n.settings.scrolltop&&t.scrollTo(0,0)):s.hasClass("fixed")&&(s.parent().addClass("fixed"),s.removeClass("fixed"),e("body").css("padding-top",r))}).on("mouseenter mouseleave",".top-bar li",function(t){if(!n.settings.is_hover)return;/enter|over/i.test(t.type)?e(this).addClass("hover"):e(this).removeClass("hover")}).on("click.fndtn.topbar",".top-bar li.has-dropdown",function(t){if(n.breakpoint())return;var r=e(this),i=e(t.target),s=r.closest("[data-topbar], .top-bar"),o=s.data("topbar");if(n.settings.is_hover&&!Modernizr.touch)return;t.stopImmediatePropagation(),i[0].nodeName==="A"&&i.parent().hasClass("has-dropdown")&&t.preventDefault(),r.hasClass("hover")?r.removeClass("hover").find("li").removeClass("hover"):r.addClass("hover")}).on("click.fndtn.topbar",".top-bar .has-dropdown>a, [data-topbar] .has-dropdown>a",function(t){if(n.breakpoint()){t.preventDefault();var r=e(this),i=r.closest(".top-bar, [data-topbar]"),s=i.find("section, .section"),o=i.children("ul").first(),u=r.next(".dropdown").outerHeight(),a=r.closest("li");i.data("index",i.data("index")+1),a.addClass("moved"),n.rtl?(s.css({right:-(100*i.data("index"))+"%"}),s.find(">.name").css({right:100*i.data("index")+"%"})):(s.css({left:-(100*i.data("index"))+"%"}),s.find(">.name").css({left:100*i.data("index")+"%"})),i.css("height",n.outerHeight(r.siblings("ul"),!0)+n.outerHeight(o,!0))}}),e(t).on("resize.fndtn.topbar",function(){n.breakpoint()||e(".top-bar, [data-topbar]").css("height","").removeClass("expanded").find("li").removeClass("hover")}.bind(this)),e("body").on("click.fndtn.topbar",function(t){var n=e(t.target).closest("[data-topbar], .top-bar");if(n.length>0)return;e(".top-bar li, [data-topbar] li").removeClass("hover")}),e(this.scope).on("click.fndtn",".top-bar .has-dropdown .back, [data-topbar] .has-dropdown .back",function(t){t.preventDefault();var r=e(this),i=r.closest(".top-bar, [data-topbar]"),s=i.children("ul").first(),o=i.find("section, .section"),u=r.closest("li.moved"),a=u.parent();i.data("index",i.data("index")-1),n.rtl?(o.css({right:-(100*i.data("index"))+"%"}),o.find(">.name").css({right:100*i.data("index")+"%"})):(o.css({left:-(100*i.data("index"))+"%"}),o.find(">.name").css({left:100*i.data("index")+"%"})),i.data("index")===0?i.css("height",""):i.css("height",n.outerHeight(a,!0)+n.outerHeight(s,!0)),setTimeout(function(){u.removeClass("moved")},300)})},breakpoint:function(){return e(n).width()<=this.settings.breakPoint||e("html").hasClass("lt-ie9")},assemble:function(){var t=this;this.settings.$section.detach(),this.settings.$section.find(".has-dropdown>a").each(function(){var n=e(this),r=n.siblings(".dropdown"),i=n.attr("href");if(i&&i.length>1)var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="'+i+'">'+n.text()+"</a></li>");else var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');t.settings.custom_back_text==1?s.find("h5>a").html("&laquo; "+t.settings.back_text):s.find("h5>a").html("&laquo; "+n.html()),r.prepend(s)}),this.settings.$section.appendTo(this.settings.$topbar),this.sticky()},height:function(t){var n=0,r=this;return t.find("> li").each(function(){n+=r.outerHeight(e(this),!0)}),n},sticky:function(){var n="."+this.settings.stickyClass;if(e(n).length>0){var r=e(n).length?e(n).offset().top:0,i=e(t),s=this.outerHeight(e(".top-bar"));e(t).resize(function(){clearTimeout(t_top),t_top=setTimeout(function(){r=e(n).offset().top},105)}),i.scroll(function(){i.scrollTop()>r?(e(n).addClass("fixed"),e("body").css("padding-top",s)):i.scrollTop()<=r&&(e(n).removeClass("fixed"),e("body").css("padding-top","0"))})}},off:function(){e(this.scope).off(".fndtn.topbar"),e(t).off(".fndtn.topbar")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.interchange={name:"interchange",version:"4.2.2",cache:{},settings:{load_attr:"interchange",named_queries:{"default":"only screen and (min-width: 1px)",small:"only screen and (min-width: 768px)",medium:"only screen and (min-width: 1280px)",large:"only screen and (min-width: 1440px)",landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(e,t){if(/IMG/.test(e[0].nodeName)){var n=t.split("/"),r=n[n.length-1],i=e[0].src;if((new RegExp(r,"i")).test(e[0].src))return;return e[0].src=t,e.trigger("replace",[e[0].src,i])}}}},init:function(t,n,r){return Foundation.inherit(this,"throttle"),typeof n=="object"&&e.extend(!0,this.settings,n),this.events(),this.images(),typeof n!="string"?this.settings.init:this[n].call(this,r)},events:function(){var n=this;e(t).on("resize.fndtn.interchange",n.throttle(function(){n.resize.call(n)},50))},resize:function(){var e=this.cache;for(var t in e)if(e.hasOwnProperty(t)){var n=this.results(t,e[t]);n&&this.settings.directives[n.scenario[1]](n.el,n.scenario[0])}},results:function(t,n){var r=n.length,i=[];if(r>0){var s=e('[data-uuid="'+t+'"]');for(var o=r-1;o>=0;o--){var u=n[o][2];if(this.settings.named_queries.hasOwnProperty(u))var a=matchMedia(this.settings.named_queries[u]);else var a=matchMedia(n[o][2]);if(a.matches)return{el:s,scenario:n[o]}}}return!1},images:function(e){return typeof this.cached_images=="undefined"||e?this.update_images():this.cached_images},update_images:function(){var t=n.getElementsByTagName("img"),r=t.length,i="data-"+this.settings.load_attr;this.cached_images=[];for(var s=r-1;s>=0;s--)this.loaded(e(t[s]),s===0,function(e,t){if(e){var n=e.getAttribute(i)||"";n.length>0&&this.cached_images.push(e)}t&&this.enhance()}.bind(this));return"deferred"},loaded:function(e,t,n){function r(){n(e[0],t)}function i(){this.one("load",r);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){r();return}e[0].complete||e[0].readyState===4?r():i.call(e)},enhance:function(){var n=this.images().length;for(var r=n-1;r>=0;r--)this._object(e(this.images()[r]));return e(t).trigger("resize")},parse_params:function(e,t,n){return[this.trim(e),this.convert_directive(t),this.trim(n)]},convert_directive:function(e){var t=this.trim(e);return t.length>0?t:"replace"},_object:function(e){var t=this.parse_data_attr(e),n=[],r=t.length;if(r>0)for(var i=r-1;i>=0;i--){var s=t[i].split(/\((.*?)(\))$/);if(s.length>1){var o=s[0].split(","),u=this.parse_params(o[0],o[1],s[1]);n.push(u)}}return this.store(e,n)},uuid:function(e){function n(){return((1+Math.random())*65536|0).toString(16).substring(1)}var t=e||"-";return n()+n()+t+n()+t+n()+t+n()+t+n()+n()+n()},store:function(e,t){var n=this.uuid(),r=e.data("uuid");return r?this.cache[r]:(e.attr("data-uuid",n),this.cache[n]=t)},trim:function(t){return typeof t=="string"?e.trim(t):t},parse_data_attr:function(e){var t=e.data(this.settings.load_attr).split(/\[(.*?)\]/),n=t.length,r=[];for(var i=n-1;i>=0;i--)t[i].replace(/[\W\d]+/,"").length>4&&r.push(t[i]);return r},reflow:function(){this.images(!0)}}}(Foundation.zj,this,this.document),function(e,t,n){function f(e){var t={},r=/^jQuery\d+$/;return n.each(e.attributes,function(e,n){n.specified&&!r.test(n.name)&&(t[n.name]=n.value)}),t}function l(e,r){var i=this,s=n(i);if(i.value==s.attr("placeholder")&&s.hasClass("placeholder"))if(s.data("placeholder-password")){s=s.hide().next().show().attr("id",s.removeAttr("id").data("placeholder-id"));if(e===!0)return s[0].value=r;s.focus()}else i.value="",s.removeClass("placeholder"),i==t.activeElement&&i.select()}function c(){var e,t=this,r=n(t),i=r,s=this.id;if(t.value==""){if(t.type=="password"){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(o){e=n("<input>").attr(n.extend(f(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":!0,"placeholder-id":s}).bind("focus.placeholder",l),r.data({"placeholder-textinput":e,"placeholder-id":s}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",s).show()}r.addClass("placeholder"),r[0].value=r.attr("placeholder")}else r.removeClass("placeholder")}var r="placeholder"in t.createElement("input"),i="placeholder"in t.createElement("textarea"),s=n.fn,o=n.valHooks,u,a;r&&i?(a=s.placeholder=function(){return this},a.input=a.textarea=!0):(a=s.placeholder=function(){var e=this;return e.filter((r?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":l,"blur.placeholder":c}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},a.input=r,a.textarea=i,u={get:function(e){var t=n(e);return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,r){var i=n(e);return i.data("placeholder-enabled")?(r==""?(e.value=r,e!=t.activeElement&&c.call(e)):i.hasClass("placeholder")?l.call(e,!0,r)||(e.value=r):e.value=r,i):e.value=r}},r||(o.input=u),i||(o.textarea=u),n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(l);setTimeout(function(){e.each(c)},10)})}),n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})}))}(this,document,Foundation.zj),function(e,t,n,r){"use strict";Foundation.libs.placeholder={name:"placeholder",version:"4.2.2",init:function(n,r,i){this.scope=n||this.scope,typeof r!="string"&&(t.onload=function(){e("input, textarea").placeholder()})}}}(Foundation.zj,this,this.document),function(e,t,n){function o(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function u(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function f(e,t,n,r){var o=["opacity",t,~~(e*100),n,r].join("-"),u=.01+n/r*100,f=Math.max(1-(1-e)/t*(100-u),e),l=s.substring(0,s.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return i[o]||(a.insertRule("@"+c+"keyframes "+o+"{"+"0%{opacity:"+f+"}"+u+"%{opacity:"+e+"}"+(u+.01)+"%{opacity:1}"+(u+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",0),i[o]=1),o}function l(e,t){var i=e.style,s,o;if(i[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(o=0;o<r.length;o++){s=r[o]+t;if(i[s]!==n)return s}}function c(e,t){for(var n in t)e.style[l(e,n)||n]=t[n];return e}function h(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function p(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var r=["webkit","Moz","ms","O"],i={},s,a=function(){var e=o("style");return u(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},v=function m(e){if(!this.spin)return new m(e);this.opts=h(e||{},m.defaults,d)};v.defaults={},v.prototype={spin:function(e){this.stop();var t=this,n=t.opts,r=t.el=c(o(0,{className:n.className}),{position:"relative",zIndex:n.zIndex}),i=n.radius+n.length+n.width,u,a;e&&(e.insertBefore(r,e.firstChild||null),a=p(e),u=p(r),c(r,{left:(n.left=="auto"?a.x-u.x+(e.offsetWidth>>1):n.left+i)+"px",top:(n.top=="auto"?a.y-u.y+(e.offsetHeight>>1):n.top+i)+"px"})),r.setAttribute("aria-role","progressbar"),t.lines(r,t.opts);if(!s){var f=0,l=n.fps,h=l/n.speed,d=(1-n.opacity)/(h*n.trail/100),v=h/n.lines;!function m(){f++;for(var e=n.lines;e;e--){var i=Math.max(1-(f+e*v)%h*d,n.opacity);t.opacity(r,n.lines-e,i,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/l))}()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function i(e,r){return c(o(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:r,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*n)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.width>>1)+"px"})}var n=0,r;for(;n<t.lines;n++)r=c(o(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:s&&f(t.opacity,t.trail,n,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&u(r,c(i("#000","0 0 4px #000"),{top:"2px"})),u(e,u(r,i(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}},!function(){var e=c(o("group"),{behavior:"url(#default#VML)"}),t;if(!l(e,"transform")&&e.adj){for(t=4;t--;)a.addRule(["group","roundrect","fill","stroke"][t],"behavior:url(#default#VML)");v.prototype.lines=function(e,t){function i(){return c(o("group",{coordsize:r+" "+r,coordorigin:-n+" "+ -n}),{width:r,height:r})}function l(e,r,s){u(a,u(c(i(),{rotation:360/t.lines*e+"deg",left:~~r}),u(c(o("roundrect",{arcsize:1}),{width:n,height:t.width,left:t.radius,top:-t.width>>1,filter:s}),o("fill",{color:t.color,opacity:t.opacity}),o("stroke",{opacity:0}))))}var n=t.length+t.width,r=2*n,s=-(t.width+t.length)*2+"px",a=c(i(),{position:"absolute",top:s,left:s}),f;if(t.shadow)for(f=1;f<=t.lines;f++)l(f,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(f=1;f<=t.lines;f++)l(f);return u(e,a)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}}else s=l(e,"animation")}(),e.Spinner=v}(window,document),$.fn.spin=function(e){return this.each(function(){var t=$(this),n=t.data();n.spinner&&(n.spinner.stop(),delete n.spinner),e!==!1&&(n.spinner=(new Spinner($.extend({color:t.css("color")},e))).spin(this))}),this},function(e){function s(e){return e.replace(/(:|\.)/g,"\\$1")}var t="1.4.4",n={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400},r=function(t){var n=[],r=!1,i=t.dir&&t.dir=="left"?"scrollLeft":"scrollTop";return this.each(function(){if(this==document||this==window)return;var t=e(this);if(t[i]()>0){n.push(this);return}t[i](1),r=t[i]()>0,t[i](0);if(r){n.push(this);return}}),t.el==="first"&&n.length&&(n=[n.shift()]),n},i="ontouchend"in document;e.fn.extend({scrollable:function(e){var t=r.call(this,{dir:e});return this.pushStack(t)},firstScrollable:function(e){var t=r.call(this,{el:"first",dir:e});return this.pushStack(t)},smoothScroll:function(t){t=t||{};var n=e.extend({},e.fn.smoothScroll.defaults,t),r=e.smoothScroll.filterPath(location.pathname);return this.die("click.smoothscroll").live("click.smoothscroll",function(t){var i={},o=this,u=e(this),a=location.hostname===o.hostname||!o.hostname,f=n.scrollTarget||(e.smoothScroll.filterPath(o.pathname)||r)===r,l=s(o.hash),c=!0;if(!n.scrollTarget&&(!a||!f||!l))c=!1;else{var h=n.exclude,p=0,d=h.length;while(c&&p<d)u.is(s(h[p++]))&&(c=!1);var v=n.excludeWithin,m=0,g=v.length;while(c&&m<g)u.closest(v[m++]).length&&(c=!1)}c&&(t.preventDefault(),e.extend(i,n,{scrollTarget:n.scrollTarget||l,link:o}),e.smoothScroll(i))}),this}}),e.smoothScroll=function(t,n){var r,s,o,u=0,a="offset",f="scrollTop",l={},c=!1,h=[];typeof t=="number"?(r=e.fn.smoothScroll.defaults,o=t):(r=e.extend({},e.fn.smoothScroll.defaults,t||{}),r.scrollElement&&(a="position",r.scrollElement.css("position")=="static"&&r.scrollElement.css("position","relative")),o=n||e(r.scrollTarget)[a]()&&e(r.scrollTarget)[a]()[r.direction]||0),r=e.extend({link:null},r),f=r.direction=="left"?"scrollLeft":f,r.scrollElement?(s=r.scrollElement,u=s[f]()):(s=e("html, body").firstScrollable(),c=i&&"scrollTo"in window),l[f]=o+u+r.offset,r.beforeScroll.call(s,r),c?(h=r.direction=="left"?[l[f],0]:[0,l[f]],window.scrollTo.apply(window,h),r.afterScroll.call(r.link,r)):s.animate(l,{duration:r.speed,easing:r.easing,complete:function(){r.afterScroll.call(r.link,r)}})},e.smoothScroll.version=t,e.smoothScroll.filterPath=function(e){return e.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},e.fn.smoothScroll.defaults=n}(jQuery),function(e,t,n){var r=n("#topMenu"),i="click.fndtn";r.length>0&&r.css("margin-top",r.height()*-1);var s=n("#sidebarButton");s.length>0&&n("#sidebarButton").on(i,function(e){e.preventDefault(),n("body").toggleClass("active")});var o=n("#menuButton");o.length>0&&n("#menuButton").on(i,function(e){e.preventDefault(),n("body").toggleClass("active-menu")});var u=n("#switchPanels");u.length>0&&n("#switchPanels dd").on(i,function(e){e.preventDefault();var t=n(this).children("a").attr("href"),r=n(t).index();n(this).toggleClass("active").siblings().removeClass("active"),n(t).parent().css("left",r*-100+"%")}),n("#nav li a").on(i,function(e){e.preventDefault();var t=n(this).attr("href"),r=n(t);n("html, body").animate({scrollTop:r.offset().top},300)})}(this,document,jQuery),function(){this.JST||(this.JST={}),this.JST["admin/case_studies/case_study_photo"]=function(e){e||(e={});var t=[],n=function(e){var n=t,r;return t=[],e.call(this),r=t.join(""),t=n,i(r)},r=function(e){return e&&e.ecoSafe?e:typeof e!="undefined"&&e!=null?o(e):""},i,s=e.safe,o=e.escape;return i=e.safe=function(e){if(e&&e.ecoSafe)return e;if(typeof e=="undefined"||e==null)e="";var t=new String(e);return t.ecoSafe=!0,t},o||(o=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="case-study-image">\n  <div class="row">\n   <div class="three columns"><img src="'),t.push(r(this.image_url)),t.push('" /></div>\n   <div class="seven columns">\n     <input type="hidden" name="photo_ids[]" value="'),t.push(r(this.id)),t.push('" />\n     <input type="text" class="input-text select-on-focus" value="'),t.push(r(this.link_tag)),t.push('">\n    </div>\n    <div class="two columns">\n      <a href="remove">\n    </div>\n  </div>\n</div>\n')}).call(this)}.call(e),e.safe=s,e.escape=o,t.join("")}}.call(this);var tbarHeight=$(".top-bar").height(),wHeight=$(window).height(),wWidth=$(window).width(),vidHeight=wHeight-tbarHeight,vidTextHeight=$(".header-text").height(),vidTextMargin=vidHeight/2-vidTextHeight/2,headerTextMobile=$(".header-text").height(),pausePlay=$(".pause-play-button").height(),mobileVidHeight=headerTextMobile+pausePlay+130,windowWidth=$(window).width();$(document).ready(function(){windowWidth>768?($(".main-header.services").height(vidHeight),$(".header-text").css("margin-top",vidTextMargin),$(".header-text").addClass("active")):($(".main-header.services").height(mobileVidHeight),$(".header-text").css("margin-top","50px"),$(".header-text").addClass("active"))});var Studios={init:function(e){var t=this;this.main_video=document.getElementById(e),windowWidth>768,this.header=$(this.main_video).closest(".main-header")[0],$(this.main_video).on("ended",function(){this.volume=0,this.currentTime=0,$(".main-header.services").removeClass("active"),this.play()}).on("timeupdate",function(){this.currentTime>30&&$(".main-header.services").hasClass("active")&&($(".main-header.services").removeClass("active"),$("#studiosBackgroundLoop").removeClass("hidden"))}),$(".play-button").on("click",function(e){e.preventDefault(),this.main_video.currentTime=0,this.main_video.play(),$(".play-button").addClass("hidden")}.bind(this))},resize:function(){$(this.header).height($(this.main_video).height()),$(window).on("resize",function(){$(this.header).height($(this.main_video).height())}.bind(this))}};$(window).on("resize",function(){var e=$(this).width()/$(this).height();e<=1.666?$("#studiosBackground, #studiosBackgroundLoop").css({height:"100%",width:"auto"}):$("#studiosBackground, #studiosBackgroundLoop").css({height:"auto",width:"100%"})}).trigger("resize"),$(".pause-play-button").click(function(e){if(!Modernizr.touch){e.preventDefault();var t=$(".main-header.services");return t.hasClass("active")?($("#studiosBackground")[0].currentTime=0,$("#studiosBackground")[0].volume=0,$("#studiosBackground")[0].play(),$("#studiosBackgroundLoop").removeClass("hidden"),t.removeClass("active")):($("#studiosBackground")[0].currentTime=0,$("#studiosBackground")[0].volume=.5,$("#studiosBackground")[0].play(),$("#studiosBackgroundLoop").addClass("hidden"),t.addClass("active"))}}),$(".pause-video").on("click",function(e){e.preventDefault();var t=$(".main-header.services");return $("#studiosBackground")[0].currentTime=30,$("#studiosBackground")[0].volume=0,$("#studiosBackgroundLoop").removeClass("hidden"),t.removeClass("active")}),$(window).on("scroll",function(){$(".lead.scroll").is(":visible")&&
$(".lead.scroll").fadeOut(300)}),$(document).ready(function(){$(".industries-quotes").slick({dots:!0,infinite:!1,speed:300,slidesToShow:3,slidesToScroll:3,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:2,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}}]})}),$("#signup").on("submit",function(e){e.preventDefault(),$.ajax({type:"POST",url:$(this).attr("action"),data:$(this).serialize()}).done(function(){$(".signup-success").length>0?($("#signup").slideUp(300),$(".signup-success").slideDown(300)):$("#signup").slideUp(300).after('<p class="library-thanks" style="display:none;">Thank you for subscribing!</p>').next().slideDown(300)}).fail(function(){$("#signup").addClass("error")})}),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):typeof exports!="undefined"?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";var t=window.Slick||{};t=function(){function n(n,r){var i=this,s,o;i.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:e(n),appendDots:e(n),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return'<button type="button" data-role="none">'+(t+1)+"</button>"},dots:!0,dotsClass:"slick-dots",draggable:!0,easing:"linear",fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,onSetPosition:null,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rtl:!1,slide:"div",slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0},i.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},e.extend(i,i.initials),i.activeBreakpoint=null,i.animType=null,i.animProp=null,i.breakpoints=[],i.breakpointSettings=[],i.cssTransitions=!1,i.paused=!1,i.positionProp=null,i.respondTo=null,i.shouldClick=!0,i.$slider=e(n),i.$slidesCache=null,i.transformType=null,i.transitionType=null,i.windowWidth=0,i.windowTimer=null,i.options=e.extend({},i.defaults,r),i.currentSlide=i.options.initialSlide,i.originalSettings=i.options,s=i.options.responsive||null;if(s&&s.length>-1){i.respondTo=i.options.respondTo||"window";for(o in s)s.hasOwnProperty(o)&&(i.breakpoints.push(s[o].breakpoint),i.breakpointSettings[s[o].breakpoint]=s[o].settings);i.breakpoints.sort(function(e,t){return t-e})}i.autoPlay=e.proxy(i.autoPlay,i),i.autoPlayClear=e.proxy(i.autoPlayClear,i),i.changeSlide=e.proxy(i.changeSlide,i),i.clickHandler=e.proxy(i.clickHandler,i),i.selectHandler=e.proxy(i.selectHandler,i),i.setPosition=e.proxy(i.setPosition,i),i.swipeHandler=e.proxy(i.swipeHandler,i),i.dragHandler=e.proxy(i.dragHandler,i),i.keyHandler=e.proxy(i.keyHandler,i),i.autoPlayIterator=e.proxy(i.autoPlayIterator,i),i.instanceUid=t++,i.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,i.init(),i.checkResponsive()}var t=0;return n}(),t.prototype.addSlide=function(t,n,r){var i=this;if(typeof n=="boolean")r=n,n=null;else if(n<0||n>=i.slideCount)return!1;i.unload(),typeof n=="number"?n===0&&i.$slides.length===0?e(t).appendTo(i.$slideTrack):r?e(t).insertBefore(i.$slides.eq(n)):e(t).insertAfter(i.$slides.eq(n)):r===!0?e(t).prependTo(i.$slideTrack):e(t).appendTo(i.$slideTrack),i.$slides=i.$slideTrack.children(this.options.slide),i.$slideTrack.children(this.options.slide).detach(),i.$slideTrack.append(i.$slides),i.$slides.each(function(t,n){e(n).attr("index",t)}),i.$slidesCache=i.$slides,i.reinit()},t.prototype.animateSlide=function(t,n){var r={},i=this;if(i.options.slidesToShow===1&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var s=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:s},i.options.speed)}i.options.rtl===!0&&i.options.vertical===!1&&(t=-t),i.transformsEnabled===!1?i.options.vertical===!1?i.$slideTrack.animate({left:t},i.options.speed,i.options.easing,n):i.$slideTrack.animate({top:t},i.options.speed,i.options.easing,n):i.cssTransitions===!1?e({animStart:i.currentLeft}).animate({animStart:t},{duration:i.options.speed,easing:i.options.easing,step:function(e){i.options.vertical===!1?(r[i.animType]="translate("+e+"px, 0px)",i.$slideTrack.css(r)):(r[i.animType]="translate(0px,"+e+"px)",i.$slideTrack.css(r))},complete:function(){n&&n.call()}}):(i.applyTransition(),i.options.vertical===!1?r[i.animType]="translate3d("+t+"px, 0px, 0px)":r[i.animType]="translate3d(0px,"+t+"px, 0px)",i.$slideTrack.css(r),n&&setTimeout(function(){i.disableTransition(),n.call()},i.options.speed))},t.prototype.asNavFor=function(t){var n=this,r=n.options.asNavFor!=null?e(n.options.asNavFor).getSlick():null;r!=null&&r.slideHandler(t,!0)},t.prototype.applyTransition=function(e){var t=this,n={};t.options.fade===!1?n[t.transitionType]=t.transformType+" "+t.options.speed+"ms "+t.options.cssEase:n[t.transitionType]="opacity "+t.options.speed+"ms "+t.options.cssEase,t.options.fade===!1?t.$slideTrack.css(n):t.$slides.eq(e).css(n)},t.prototype.autoPlay=function(){var e=this;e.autoPlayTimer&&clearInterval(e.autoPlayTimer),e.slideCount>e.options.slidesToShow&&e.paused!==!0&&(e.autoPlayTimer=setInterval(e.autoPlayIterator,e.options.autoplaySpeed))},t.prototype.autoPlayClear=function(){var e=this;e.autoPlayTimer&&clearInterval(e.autoPlayTimer)},t.prototype.autoPlayIterator=function(){var e=this;e.options.infinite===!1?e.direction===1?(e.currentSlide+1===e.slideCount-1&&(e.direction=0),e.slideHandler(e.currentSlide+e.options.slidesToScroll)):(e.currentSlide-1===0&&(e.direction=1),e.slideHandler(e.currentSlide-e.options.slidesToScroll)):e.slideHandler(e.currentSlide+e.options.slidesToScroll)},t.prototype.buildDots=function(){var t=this,n,r;console.log("Dots Built");if(t.options.dots===!0&&t.slideCount>t.options.slidesToShow){r='<ul class="'+t.options.dotsClass+'">';for(n=0;n<=t.getDotCount();n+=1)r+="<li>"+t.options.customPaging.call(this,t,n)+"</li>";r+="</ul>",t.$dots=e(r).appendTo(t.options.appendDots),t.$dots.find("li").first().addClass("slick-active")}},t.prototype.buildArrows=function(){var t=this;console.log(this),t.options.arrows===!0&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow=e(t.options.prevArrow),t.$nextArrow=e(t.options.nextArrow),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.appendTo(t.options.appendArrows),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.appendTo(t.options.appendArrows),t.options.infinite!==!0&&t.$prevArrow.addClass("slick-disabled"))},t.prototype.buildOut=function(){var t=this;t.$slides=t.$slider.children(t.options.slide+":not(.slick-cloned)").addClass("slick-slide"),t.slideCount=t.$slides.length,t.$slides.each(function(t,n){e(n).attr("index",t)}),t.$slidesCache=t.$slides,t.$slider.addClass("slick-slider"),t.$slideTrack=t.slideCount===0?e('<div class="slick-track"/>').appendTo(t.$slider):t.$slides.wrapAll('<div class="slick-track"/>').parent(),t.$list=t.$slideTrack.wrap('<div class="slick-list"/>').parent(),t.$slideTrack.css("opacity",0),t.options.centerMode===!0&&(t.options.slidesToScroll=1),e("img[data-lazy]",t.$slider).not("[src]").addClass("slick-loading"),t.setupInfinite(),t.buildDots(),t.buildArrows(),t.updateDots(),t.options.accessibility===!0&&t.$list.prop("tabIndex",0),t.setSlideClasses(typeof this.currentSlide=="number"?this.currentSlide:0),t.options.draggable===!0&&t.$list.addClass("draggable")},t.prototype.checkResponsive=function(){var t=this,n,r,i,s=t.$slider.width(),o=window.innerWidth||e(window).width();t.respondTo==="window"?i=o:t.respondTo==="slider"?i=s:t.respondTo==="min"&&(i=Math.min(o,s));if(t.originalSettings.responsive&&t.originalSettings.responsive.length>-1&&t.originalSettings.responsive!==null){r=null;for(n in t.breakpoints)t.breakpoints.hasOwnProperty(n)&&i<t.breakpoints[n]&&(r=t.breakpoints[n]);r!==null?t.activeBreakpoint!==null?r!==t.activeBreakpoint&&(t.activeBreakpoint=r,t.options=e.extend({},t.originalSettings,t.breakpointSettings[r]),t.refresh()):(t.activeBreakpoint=r,t.options=e.extend({},t.originalSettings,t.breakpointSettings[r]),t.refresh()):t.activeBreakpoint!==null&&(t.activeBreakpoint=null,t.options=t.originalSettings,t.refresh())}},t.prototype.changeSlide=function(t,n){var r=this,i=e(t.target),s,o,u,a,f;i.is("a")&&t.preventDefault(),u=r.slideCount%r.options.slidesToScroll!==0,s=u?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll;switch(t.data.message){case"previous":o=s===0?r.options.slidesToScroll:r.options.slidesToShow-s,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-o,!1,n);break;case"next":o=s===0?r.options.slidesToScroll:s,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+o,!1,n);break;case"index":var l=t.data.index===0?0:t.data.index||e(t.target).parent().index()*r.options.slidesToScroll;a=r.getNavigableIndexes(),f=0;if(a[l]&&a[l]===l)if(l>a[a.length-1])l=a[a.length-1];else for(var c in a){if(l<a[c]){l=f;break}f=a[c]}r.slideHandler(l,!1,n);default:return}},t.prototype.clickHandler=function(e){var t=this;t.shouldClick===!1&&(e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault())},t.prototype.destroy=function(){var t=this;t.autoPlayClear(),t.touchObject={},e(".slick-cloned",t.$slider).remove(),t.$dots&&t.$dots.remove(),t.$prevArrow&&typeof t.options.prevArrow!="object"&&t.$prevArrow.remove(),t.$nextArrow&&typeof t.options.nextArrow!="object"&&t.$nextArrow.remove(),t.$slides.parent().hasClass("slick-track")&&t.$slides.unwrap().unwrap(),t.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({position:"",left:"",top:"",zIndex:"",opacity:"",width:""}),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$list.off(".slick"),e(window).off(".slick-"+t.instanceUid),e(document).off(".slick-"+t.instanceUid)},t.prototype.disableTransition=function(e){var t=this,n={};n[t.transitionType]="",t.options.fade===!1?t.$slideTrack.css(n):t.$slides.eq(e).css(n)},t.prototype.fadeSlide=function(e,t,n){var r=this;r.cssTransitions===!1?(r.$slides.eq(t).css({zIndex:1e3}),r.$slides.eq(t).animate({opacity:1},r.options.speed,r.options.easing,n),r.$slides.eq(e).animate({opacity:0},r.options.speed,r.options.easing)):(r.applyTransition(t),r.applyTransition(e),r.$slides.eq(t).css({opacity:1,zIndex:1e3}),r.$slides.eq(e).css({opacity:0}),n&&setTimeout(function(){r.disableTransition(t),r.disableTransition(e),n.call()},r.options.speed))},t.prototype.filterSlides=function(e){var t=this;e!==null&&(t.unload(),t.$slideTrack.children(this.options.slide).detach(),t.$slidesCache.filter(e).appendTo(t.$slideTrack),t.reinit())},t.prototype.getCurrent=function(){var e=this;return e.currentSlide},t.prototype.getDotCount=function(){var e=this,t=0,n=0,r=0;if(e.options.infinite===!0)r=Math.ceil(e.slideCount/e.options.slidesToScroll);else while(t<e.slideCount)++r,t=n+e.options.slidesToShow,n+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return r-1},t.prototype.getLeft=function(e){var t=this,n,r,i=0,s,o;return t.slideOffset=0,r=t.$slides.first().outerHeight(),t.options.infinite===!0?(t.slideCount>t.options.slidesToShow&&(t.slideOffset=t.slideWidth*t.options.slidesToShow*-1,i=r*t.options.slidesToShow*-1),t.slideCount%t.options.slidesToScroll!==0&&e+t.options.slidesToScroll>t.slideCount&&t.slideCount>t.options.slidesToShow&&(e>t.slideCount?(t.slideOffset=(t.options.slidesToShow-(e-t.slideCount))*t.slideWidth*-1,i=(t.options.slidesToShow-(e-t.slideCount))*r*-1):(t.slideOffset=t.slideCount%t.options.slidesToScroll*t.slideWidth*-1,i=t.slideCount%t.options.slidesToScroll*r*-1))):e+t.options.slidesToShow>t.slideCount&&(t.slideOffset=(e+t.options.slidesToShow-t.slideCount)*t.slideWidth,i=(e+t.options.slidesToShow-t.slideCount)*r),t.slideCount<=t.options.slidesToShow&&(t.slideOffset=0,i=0),t.options.centerMode===!0&&t.options.infinite===!0?t.slideOffset+=t.slideWidth*Math.floor(t.options.slidesToShow/2)-t.slideWidth:t.options.centerMode===!0&&(t.slideOffset=0,t.slideOffset+=t.slideWidth*Math.floor(t.options.slidesToShow/2)),t.options.vertical===!1?n=e*t.slideWidth*-1+t.slideOffset:n=e*r*-1+i,t.options.variableWidth===!0&&(t.slideCount<=t.options.slidesToShow||t.options.infinite===!1?o=t.$slideTrack.children(".slick-slide").eq(e):o=t.$slideTrack.children(".slick-slide").eq(e+t.options.slidesToShow),n=o[0]?o[0].offsetLeft*-1:0,t.options.centerMode===!0&&(t.options.infinite===!1?o=t.$slideTrack.children(".slick-slide").eq(e):o=t.$slideTrack.children(".slick-slide").eq(e+t.options.slidesToShow+1),n=o[0]?o[0].offsetLeft*-1:0,n+=(t.$list.width()-o.outerWidth())/2)),n},t.prototype.getNavigableIndexes=function(){var e=this,t=0,n=0,r=[];while(t<e.slideCount)r.push(t),t=n+e.options.slidesToScroll,n+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return r},t.prototype.getSlideCount=function(){var t=this,n;if(t.options.swipeToSlide===!0){var r=null;return t.$slideTrack.find(".slick-slide").each(function(n,i){if(i.offsetLeft+e(i).outerWidth()/2>t.swipeLeft*-1)return r=i,!1}),n=Math.abs(e(r).attr("index")-t.currentSlide),n}return t.options.slidesToScroll},t.prototype.init=function(){var t=this;e(t.$slider).hasClass("slick-initialized")||(e(t.$slider).addClass("slick-initialized"),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots()),t.options.onInit!==null&&t.options.onInit.call(this,t)},t.prototype.initArrowEvents=function(){var e=this;e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.on("click.slick",{message:"previous"},e.changeSlide),e.$nextArrow.on("click.slick",{message:"next"},e.changeSlide))},t.prototype.initDotEvents=function(){var t=this;t.options.dots===!0&&t.slideCount>t.options.slidesToShow&&e("li",t.$dots).on("click.slick",{message:"index"},t.changeSlide),t.options.dots===!0&&t.options.pauseOnDotsHover===!0&&t.options.autoplay===!0&&e("li",t.$dots).on("mouseenter.slick",function(){t.paused=!0,t.autoPlayClear()}).on("mouseleave.slick",function(){t.paused=!1,t.autoPlay()})},t.prototype.initializeEvents=function(){var t=this;t.initArrowEvents(),t.initDotEvents(),t.$list.on("touchstart.slick mousedown.slick",{action:"start"},t.swipeHandler),t.$list.on("touchmove.slick mousemove.slick",{action:"move"},t.swipeHandler),t.$list.on("touchend.slick mouseup.slick",{action:"end"},t.swipeHandler),t.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},t.swipeHandler),t.$list.on("click.slick",t.clickHandler),t.options.pauseOnHover===!0&&t.options.autoplay===!0&&(t.$list.on("mouseenter.slick",function(){t.paused=!0,t.autoPlayClear()}),t.$list.on("mouseleave.slick",function(){t.paused=!1,t.autoPlay()})),t.options.accessibility===!0&&t.$list.on("keydown.slick",t.keyHandler),t.options.focusOnSelect===!0&&e(t.options.slide,t.$slideTrack).on("click.slick",t.selectHandler),e(window).on("orientationchange.slick.slick-"+t.instanceUid,function(){t.checkResponsive(),t.setPosition()}),e(window).on("resize.slick.slick-"+t.instanceUid,function(){e(window).width()!==t.windowWidth&&(clearTimeout(t.windowDelay),t.windowDelay=window.setTimeout(function(){t.windowWidth=e(window).width(),t.checkResponsive(),t.setPosition()},50))}),e("*[draggable!=true]",t.$slideTrack).on("dragstart",function(e){e.preventDefault()}),e(window).on("load.slick.slick-"+t.instanceUid,t.setPosition),e(document).on("ready.slick.slick-"+t.instanceUid,t.setPosition)},t.prototype.initUI=function(){var e=this;e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.show(),e.$nextArrow.show()),e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&e.$dots.show(),e.options.autoplay===!0&&e.autoPlay()},t.prototype.keyHandler=function(e){var t=this;e.keyCode===37&&t.options.accessibility===!0?t.changeSlide({data:{message:"previous"}}):e.keyCode===39&&t.options.accessibility===!0&&t.changeSlide({data:{message:"next"}})},t.prototype.lazyLoad=function(){function o(t){e("img[data-lazy]",t).each(function(){var t=e(this),n=e(this).attr("data-lazy");t.load(function(){t.animate({opacity:1},200)}).css({opacity:0}).attr("src",n).removeAttr("data-lazy").removeClass("slick-loading")})}var t=this,n,r,i,s;t.options.centerMode===!0?t.options.infinite===!0?(i=t.currentSlide+(t.options.slidesToShow/2+1),s=i+t.options.slidesToShow+2):(i=Math.max(0,t.currentSlide-(t.options.slidesToShow/2+1)),s=2+(t.options.slidesToShow/2+1)+t.currentSlide):(i=t.options.infinite?t.options.slidesToShow+t.currentSlide:t.currentSlide,s=i+t.options.slidesToShow,t.options.fade===!0&&(i>0&&i--,s<=t.slideCount&&s++)),n=t.$slider.find(".slick-slide").slice(i,s),o(n),t.slideCount<=t.options.slidesToShow?(r=t.$slider.find(".slick-slide"),o(r)):t.currentSlide>=t.slideCount-t.options.slidesToShow?(r=t.$slider.find(".slick-cloned").slice(0,t.options.slidesToShow),o(r)):t.currentSlide===0&&(r=t.$slider.find(".slick-cloned").slice(t.options.slidesToShow*-1),o(r))},t.prototype.loadSlider=function(){var e=this;e.setPosition(),e.$slideTrack.css({opacity:1}),e.$slider.removeClass("slick-loading"),e.initUI(),e.options.lazyLoad==="progressive"&&e.progressiveLazyLoad()},t.prototype.postSlide=function(e){var t=this;t.options.onAfterChange!==null&&t.options.onAfterChange.call(this,t,e),t.animating=!1,t.setPosition(),t.swipeLeft=null,t.options.autoplay===!0&&t.paused===!1&&t.autoPlay()},t.prototype.progressiveLazyLoad=function(){var t=this,n,r;n=e("img[data-lazy]",t.$slider).length,n>0&&(r=e("img[data-lazy]",t.$slider).first(),r.attr("src",r.attr("data-lazy")).removeClass("slick-loading").load(function(){r.removeAttr("data-lazy"),t.progressiveLazyLoad()}).error(function(){r.removeAttr("data-lazy"),t.progressiveLazyLoad()}))},t.prototype.refresh=function(){var t=this,n=t.currentSlide;t.destroy(),e.extend(t,t.initials),t.init(),t.changeSlide({data:{message:"index",index:n}},!0)},t.prototype.reinit=function(){var t=this;t.$slides=t.$slideTrack.children(t.options.slide).addClass("slick-slide"),t.slideCount=t.$slides.length,t.currentSlide>=t.slideCount&&t.currentSlide!==0&&(t.currentSlide=t.currentSlide-t.options.slidesToScroll),t.slideCount<=t.options.slidesToShow&&(t.currentSlide=0),t.setProps(),t.setupInfinite(),t.buildArrows(),t.updateArrows(),t.initArrowEvents(),t.buildDots(),t.updateDots(),t.initDotEvents(),t.options.focusOnSelect===!0&&e(t.options.slide,t.$slideTrack).on("click.slick",t.selectHandler),t.setSlideClasses(0),t.setPosition(),t.options.onReInit!==null&&t.options.onReInit.call(this,t)},t.prototype.removeSlide=function(e,t,n){var r=this;typeof e=="boolean"?(t=e,e=t===!0?0:r.slideCount-1):e=t===!0?--e:e;if(r.slideCount<1||e<0||e>r.slideCount-1)return!1;r.unload(),n===!0?r.$slideTrack.children().remove():r.$slideTrack.children(this.options.slide).eq(e).remove(),r.$slides=r.$slideTrack.children(this.options.slide),r.$slideTrack.children(this.options.slide).detach(),r.$slideTrack.append(r.$slides),r.$slidesCache=r.$slides,r.reinit()},t.prototype.setCSS=function(e){var t=this,n={},r,i;t.options.rtl===!0&&(e=-e),r=t.positionProp=="left"?e+"px":"0px",i=t.positionProp=="top"?e+"px":"0px",n[t.positionProp]=e,t.transformsEnabled===!1?t.$slideTrack.css(n):(n={},t.cssTransitions===!1?(n[t.animType]="translate("+r+", "+i+")",t.$slideTrack.css(n)):(n[t.animType]="translate3d("+r+", "+i+", 0px)",t.$slideTrack.css(n)))},t.prototype.setDimensions=function(){var t=this;t.options.vertical===!1?t.options.centerMode===!0&&t.$list.css({padding:"0px "+t.options.centerPadding}):(t.$list.height(t.$slides.first().outerHeight(!0)*t.options.slidesToShow),t.options.centerMode===!0&&t.$list.css({padding:t.options.centerPadding+" 0px"})),t.listWidth=t.$list.width(),t.listHeight=t.$list.height();if(t.options.vertical===!1&&t.options.variableWidth===!1)t.slideWidth=Math.ceil(t.listWidth/t.options.slidesToShow),t.$slideTrack.width(Math.ceil(t.slideWidth*t.$slideTrack.children(".slick-slide").length));else if(t.options.variableWidth===!0){var n=0;t.slideWidth=Math.ceil(t.listWidth/t.options.slidesToShow),t.$slideTrack.children(".slick-slide").each(function(){n+=Math.ceil(e(this).outerWidth(!0))}),t.$slideTrack.width(Math.ceil(n)+1)}else t.slideWidth=Math.ceil(t.listWidth),t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0)*t.$slideTrack.children(".slick-slide").length));var r=t.$slides.first().outerWidth(!0)-t.$slides.first().width();t.options.variableWidth===!1&&t.$slideTrack.children(".slick-slide").width(t.slideWidth-r)},t.prototype.setFade=function(){var t=this,n;t.$slides.each(function(r,i){n=t.slideWidth*r*-1,t.options.rtl===!0?e(i).css({position:"relative",right:n,top:0,zIndex:800,opacity:0}):e(i).css({position:"relative",left:n,top:0,zIndex:800,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:900,opacity:1})},t.prototype.setHeight=function(){var e=this;if(e.options.slidesToShow===1&&e.options.adaptiveHeight===!0&&e.options.vertical===!1){var t=e.$slides.eq(e.currentSlide).outerHeight(!0);e.$list.css("height",t)}},t.prototype.setPosition=function(){var e=this;e.setDimensions(),e.setHeight(),e.options.fade===!1?e.setCSS(e.getLeft(e.currentSlide)):e.setFade(),e.options.onSetPosition!==null&&e.options.onSetPosition.call(this,e)},t.prototype.setProps=function(){var e=this,t=document.body.style;e.positionProp=e.options.vertical===!0?"top":"left",e.positionProp==="top"?e.$slider.addClass("slick-vertical"):e.$slider.removeClass("slick-vertical"),(t.WebkitTransition!==undefined||t.MozTransition!==undefined||t.msTransition!==undefined)&&e.options.useCSS===!0&&(e.cssTransitions=!0),t.OTransform!==undefined&&(e.animType="OTransform",e.transformType="-o-transform",e.transitionType="OTransition",t.perspectiveProperty===undefined&&t.webkitPerspective===undefined&&(e.animType=!1)),t.MozTransform!==undefined&&(e.animType="MozTransform",e.transformType="-moz-transform",e.transitionType="MozTransition",t.perspectiveProperty===undefined&&t.MozPerspective===undefined&&(e.animType=!1)),t.webkitTransform!==undefined&&(e.animType="webkitTransform",e.transformType="-webkit-transform",e.transitionType="webkitTransition",t.perspectiveProperty===undefined&&t.webkitPerspective===undefined&&(e.animType=!1)),t.msTransform!==undefined&&(e.animType="msTransform",e.transformType="-ms-transform",e.transitionType="msTransition",t.msTransform===undefined&&(e.animType=!1)),t.transform!==undefined&&e.animType!==!1&&(e.animType="transform",e.transformType="transform",e.transitionType="transition"),e.transformsEnabled=e.animType!==null&&e.animType!==!1},t.prototype.setSlideClasses=function(e){var t=this,n,r,i,s;t.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),r=t.$slider.find(".slick-slide"),t.options.centerMode===!0?(n=Math.floor(t.options.slidesToShow/2),t.options.infinite===!0&&(e>=n&&e<=t.slideCount-1-n?t.$slides.slice(e-n,e+n+1).addClass("slick-active"):(i=t.options.slidesToShow+e,r.slice(i-n+1,i+n+2).addClass("slick-active")),e===0?r.eq(r.length-1-t.options.slidesToShow).addClass("slick-center"):e===t.slideCount-1&&r.eq(t.options.slidesToShow).addClass("slick-center")),t.$slides.eq(e).addClass("slick-center")):e>=0&&e<=t.slideCount-t.options.slidesToShow?t.$slides.slice(e,e+t.options.slidesToShow).addClass("slick-active"):r.length<=t.options.slidesToShow?r.addClass("slick-active"):(s=t.slideCount%t.options.slidesToShow,i=t.options.infinite===!0?t.options.slidesToShow+e:e,t.options.slidesToShow==t.options.slidesToScroll&&t.slideCount-e<t.options.slidesToShow?r.slice(i-(t.options.slidesToShow-s),i+s).addClass("slick-active"):r.slice(i,i+t.options.slidesToShow).addClass("slick-active")),t.options.lazyLoad==="ondemand"&&t.lazyLoad()},t.prototype.setupInfinite=function(){var t=this,n,r,i;t.options.fade===!0&&(t.options.centerMode=!1);if(t.options.infinite===!0&&t.options.fade===!1){r=null;if(t.slideCount>t.options.slidesToShow){t.options.centerMode===!0?i=t.options.slidesToShow+1:i=t.options.slidesToShow;for(n=t.slideCount;n>t.slideCount-i;n-=1)r=n-1,e(t.$slides[r]).clone(!0).attr("id","").attr("index",r-t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");for(n=0;n<i;n+=1)r=n,e(t.$slides[r]).clone(!0).attr("id","").attr("index",r+t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");t.$slideTrack.find(".slick-cloned").find("[id]").each(function(){e(this).attr("id","")})}}},t.prototype.selectHandler=function(t){var n=this,r=parseInt(e(t.target).parents(".slick-slide").attr("index"));r||(r=0);if(n.slideCount<=n.options.slidesToShow){n.$slider.find(".slick-slide").removeClass("slick-active"),n.$slides.eq(r).addClass("slick-active"),n.options.centerMode===!0&&(n.$slider.find(".slick-slide").removeClass("slick-center"),n.$slides.eq(r).addClass("slick-center")),n.asNavFor(r);return}n.slideHandler(r)},t.prototype.slideHandler=function(e,t,n){var r,i,s,o,u,a=null,f=this;t=t||!1;if(f.animating===!0&&f.options.waitForAnimate===!0)return;if(f.options.fade===!0&&f.currentSlide===e)return;if(f.slideCount<=f.options.slidesToShow)return;t===!1&&f.asNavFor(e),r=e,a=f.getLeft(r),o=f.getLeft(f.currentSlide),f.currentLeft=f.swipeLeft===null?o:f.swipeLeft;if(f.options.infinite===!1&&f.options.centerMode===!1&&(e<0||e>f.getDotCount()*f.options.slidesToScroll)){f.options.fade===!1&&(r=f.currentSlide,n!==!0?f.animateSlide(o,function(){f.postSlide(r)}):f.postSlide(r));return}if(f.options.infinite===!1&&f.options.centerMode===!0&&(e<0||e>f.slideCount-f.options.slidesToScroll)){f.options.fade===!1&&(r=f.currentSlide,n!==!0?f.animateSlide(o,function(){f.postSlide(r)}):f.postSlide(r));return}f.options.autoplay===!0&&clearInterval(f.autoPlayTimer),r<0?f.slideCount%f.options.slidesToScroll!==0?i=f.slideCount-f.slideCount%f.options.slidesToScroll:i=f.slideCount+r:r>=f.slideCount?f.slideCount%f.options.slidesToScroll!==0?i=0:i=r-f.slideCount:i=r,f.animating=!0,f.options.onBeforeChange!==null&&e!==f.currentSlide&&f.options.onBeforeChange.call(this,f,f.currentSlide,i),s=f.currentSlide,f.currentSlide=i,f.setSlideClasses(f.currentSlide),f.updateDots(),f.updateArrows();if(f.options.fade===!0){n!==!0?f.fadeSlide(s,i,function(){f.postSlide(i)}):f.postSlide(i);return}n!==!0?f.animateSlide(a,function(){f.postSlide(i)}):f.postSlide(i)},t.prototype.startLoad=function(){var e=this;e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.hide(),e.$nextArrow.hide()),e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&e.$dots.hide(),e.$slider.addClass("slick-loading")},t.prototype.swipeDirection=function(){var e,t,n,r,i=this;return e=i.touchObject.startX-i.touchObject.curX,t=i.touchObject.startY-i.touchObject.curY,n=Math.atan2(t,e),r=Math.round(n*180/Math.PI),r<0&&(r=360-Math.abs(r)),r<=45&&r>=0?i.options.rtl===!1?"left":"right":r<=360&&r>=315?i.options.rtl===!1?"left":"right":r>=135&&r<=225?i.options.rtl===!1?"right":"left":"vertical"},t.prototype.swipeEnd=function(e){var t=this,n;t.dragging=!1,t.shouldClick=t.touchObject.swipeLength>10?!1:!0;if(t.touchObject.curX===undefined)return!1;if(t.touchObject.swipeLength>=t.touchObject.minSwipe)switch(t.swipeDirection()){case"left":t.slideHandler(t.currentSlide+t.getSlideCount()),t.currentDirection=0,t.touchObject={};break;case"right":t.slideHandler(t.currentSlide-t.getSlideCount()),t.currentDirection=1,t.touchObject={}}else t.touchObject.startX!==t.touchObject.curX&&(t.slideHandler(t.currentSlide),t.touchObject={})},t.prototype.swipeHandler=function(e){var t=this;if(t.options.swipe===!1||"ontouchend"in document&&t.options.swipe===!1)return;if(t.options.draggable===!1&&e.type.indexOf("mouse")!==-1)return;t.touchObject.fingerCount=e.originalEvent&&e.originalEvent.touches!==undefined?e.originalEvent.touches.length:1,t.touchObject.minSwipe=t.listWidth/t.options.touchThreshold;switch(e.data.action){case"start":t.swipeStart(e);break;case"move":t.swipeMove(e);break;case"end":t.swipeEnd(e)}},t.prototype.swipeMove=function(e){var t=this,n,r,i,s;s=e.originalEvent!==undefined?e.originalEvent.touches:null;if(!t.dragging||s&&s.length!==1)return!1;n=t.getLeft(t.currentSlide),t.touchObject.curX=s!==undefined?s[0].pageX:e.clientX,t.touchObject.curY=s!==undefined?s[0].pageY:e.clientY,t.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(t.touchObject.curX-t.touchObject.startX,2))),r=t.swipeDirection();if(r==="vertical")return;e.originalEvent!==undefined&&t.touchObject.swipeLength>4&&e.preventDefault(),i=(t.options.rtl===!1?1:-1)*(t.touchObject.curX>t.touchObject.startX?1:-1),t.options.vertical===!1?t.swipeLeft=n+t.touchObject.swipeLength*i:t.swipeLeft=n+t.touchObject.swipeLength*(t.$list.height()/t.listWidth)*i;if(t.options.fade===!0||t.options.touchMove===!1)return!1;if(t.animating===!0)return t.swipeLeft=null,!1;t.setCSS(t.swipeLeft)},t.prototype.swipeStart=function(e){var t=this,n;if(t.touchObject.fingerCount!==1||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;e.originalEvent!==undefined&&e.originalEvent.touches!==undefined&&(n=e.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=n!==undefined?n.pageX:e.clientX,t.touchObject.startY=t.touchObject.curY=n!==undefined?n.pageY:e.clientY,t.dragging=!0},t.prototype.unfilterSlides=function(){var e=this;e.$slidesCache!==null&&(e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.appendTo(e.$slideTrack),e.reinit())},t.prototype.unload=function(){var t=this;e(".slick-cloned",t.$slider).remove(),t.$dots&&t.$dots.remove(),t.$prevArrow&&typeof t.options.prevArrow!="object"&&t.$prevArrow.remove(),t.$nextArrow&&typeof t.options.nextArrow!="object"&&t.$nextArrow.remove(),t.$slides.removeClass("slick-slide slick-active slick-visible").css("width","")},t.prototype.updateArrows=function(){var e=this,t;t=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.options.infinite!==!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.removeClass("slick-disabled"),e.$nextArrow.removeClass("slick-disabled"),e.currentSlide===0?(e.$prevArrow.addClass("slick-disabled"),e.$nextArrow.removeClass("slick-disabled")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled"),e.$prevArrow.removeClass("slick-disabled")):e.currentSlide>e.slideCount-e.options.slidesToShow+t&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled"),e.$prevArrow.removeClass("slick-disabled")))},t.prototype.updateDots=function(){var e=this;e.$dots!==null&&(e.$dots.find("li").removeClass("slick-active"),e.$dots.find("li").eq(Math.floor(e.currentSlide/e.options.slidesToScroll)).addClass("slick-active"))},e.fn.slick=function(e){var n=this;return n.each(function(n,r){r.slick=new t(r,e)})},e.fn.slickAdd=function(e,t,n){var r=this;return r.each(function(r,i){i.slick.addSlide(e,t,n)})},e.fn.slickCurrentSlide=function(){var e=this;return e.get(0).slick.getCurrent()},e.fn.slickFilter=function(e){var t=this;return t.each(function(t,n){n.slick.filterSlides(e)})},e.fn.slickGoTo=function(e,t){var n=this;return n.each(function(n,r){r.slick.changeSlide({data:{message:"index",index:parseInt(e)}},t)})},e.fn.slickNext=function(){var e=this;return e.each(function(e,t){t.slick.changeSlide({data:{message:"next"}})})},e.fn.slickPause=function(){var e=this;return e.each(function(e,t){t.slick.autoPlayClear(),t.slick.paused=!0})},e.fn.slickPlay=function(){var e=this;return e.each(function(e,t){t.slick.paused=!1,t.slick.autoPlay()})},e.fn.slickPrev=function(){var e=this;return e.each(function(e,t){t.slick.changeSlide({data:{message:"previous"}})})},e.fn.slickRemove=function(e,t){var n=this;return n.each(function(n,r){r.slick.removeSlide(e,t)})},e.fn.slickRemoveAll=function(){var e=this;return e.each(function(e,t){t.slick.removeSlide(null,null,!0)})},e.fn.slickGetOption=function(e){var t=this;return t.get(0).slick.options[e]},e.fn.slickSetOption=function(e,t,n){var r=this;return r.each(function(r,i){i.slick.options[e]=t,n===!0&&(i.slick.unload(),i.slick.reinit())})},e.fn.slickUnfilter=function(){var e=this;return e.each(function(e,t){t.slick.unfilterSlides()})},e.fn.unslick=function(){var e=this;return e.each(function(e,t){t.slick&&t.slick.destroy()})},e.fn.getSlick=function(){var e=null,t=this;return t.each(function(t,n){e=n.slick}),e}}),typeof WOW!="undefined"&&(wow=new WOW({boxClass:"wow",mobile:!1}),wow.init()),$(function(){if($("#speakListMailer").length>0){var e=$("#speakListMailer");e.on("submit",function(t){t.
preventDefault(),$.post(e.attr("action"),e.serialize()).done(function(){var t=e.find(".message");t.length>0?t.test("Great! You are now subscribed. We'll be in touch."):e.append('<div class="message">Great! You are now subscribed. We\'ll be in touch.</div>'),e.find("input").val("")}).fail(function(){var t=e.find(".message");t.length>0?t.test("Oops! Looks like there was an error. You can try again or send us an email."):e.append('<div class="message">Oops! Looks like there was an error. You can try again or send us an email.</div>')})})}});var timer,li_width=0,lis=$(".slider-position li"),animateSlider=function(e){var t=$(".slider-position"),n=t.offset().left,r=e==="left"?-1:1;timer=setTimeout(function(){var i=n+5*r,s=Math.abs(i)+$(window).width();if(e==="right"&&i>20)return;if(e==="left"&&s>li_width)return;t.css("left",i),animateSlider(e)},10)};lis.each(function(){li_width+=$(this).outerWidth(!0)}),$(window).on("resize",function(){$(".slider-position").css("left",0)}),$(document).on("mouseenter mouseleave",".arrows.arrow-right",function(e){if($(window).width()<768)return;return/enter|over/i.test(e.type)?animateSlider("left"):clearTimeout(timer)}).on("mouseenter mouseleave",".arrows.arrow-left",function(e){if($(window).width()<768)return;return/enter|over/i.test(e.type)?animateSlider("right"):clearTimeout(timer)}).on("click touchend",".arrows.arrow-right",function(){var e=$(".slider-position"),t=e.offset().left,n=t-lis.first().outerWidth(),r=Math.abs(n)+$(window).width();if(r>li_width)return;e.animate({left:n},300)}).on("click touchend",".arrows.arrow-left",function(){var e=$(".slider-position"),t=e.offset().left,n=t+lis.first().outerWidth();if(n>20)return;e.animate({left:n},300)}),$(".slider-position").on("movestart",function(e){if(e.distX>e.distY&&e.distX<-e.distY||e.distX<e.distY&&e.distX>-e.distY){e.preventDefault();return}}).on("move",function(e){if($(window).width()<768)return;var t=$(this),n=t.offset().left,r=e.distX/8+n;e.distX<0&&(t[0].style.left=r+"px"),e.distX>0&&(t[0].style.left=r+"px")}).on("moveend",function(){var e=$(".slider-position"),t=e.offset().left,n=Math.abs(t)+$(window).width();t>20&&e.animate({left:20},300),n>li_width&&e.animate({left:$(window).width()-li_width},300)}),$("[data-swap-target]").waypoint(function(e){var t=$("#"+$(this).data("swap-target")),n=$(this).data("swap-src");t.attr("src",n)}),$("#showAll").click(function(e){e.preventDefault();var t=$("#showAll");return $("ul.events-list-updated li").removeClass("inactive"),$("#showTraining, #showMeetups, #showTalks").removeClass("active"),t.hasClass("active")?($("ul.events-list-updated li.1, ul.events-list-updated li.3").removeClass("inactive"),t.removeClass("active")):t.addClass("active")}),$("#showTalks").click(function(e){e.preventDefault();var t=$("#showTalks");return $("ul.events-list-updated li").removeClass("inactive"),$("ul.events-list-updated li.1, ul.events-list-updated li.3").addClass("inactive"),$("#showTraining, #showMeetups, #showAll").removeClass("active"),t.hasClass("active")?($("ul.events-list-updated li.1, ul.events-list-updated li.3").removeClass("inactive"),t.removeClass("active")):t.addClass("active")}),$("#showTraining").click(function(e){e.preventDefault();var t=$("#showTraining");return $("ul.events-list-updated li").removeClass("inactive"),$("ul.events-list-updated li.2, ul.events-list-updated li.3").addClass("inactive"),$("#showTalks, #showMeetups, #showAll").removeClass("active"),t.hasClass("active")?($("ul.events-list-updated li.2, ul.events-list-updated li.3").removeClass("inactive"),t.removeClass("active")):t.addClass("active")}),$("#showMeetups").click(function(e){e.preventDefault();var t=$("#showMeetups");return $("ul.events-list-updated li").removeClass("inactive"),$("ul.events-list-updated li.1, ul.events-list-updated li.2").addClass("inactive"),$("#showTraining, #showTalks, #showAll").removeClass("active"),t.hasClass("active")?($("ul.events-list-updated li.1, ul.events-list-updated li.2").removeClass("inactive"),t.removeClass("active")):t.addClass("active")}),$("a[data-linkable=true]").click(function(){var e=$(this).attr("href");document.location.href=e});
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
window.Modernizr=function(e,t,n){function r(e){d.cssText=e}function i(e,t){return r(g.join(e+";")+(t||""))}function s(e,t){return typeof e===t}function o(e,t){return!!~(""+e).indexOf(t)}function u(e,t,r){for(var i in e){var o=t[e[i]];if(o!==n)return r===!1?e[i]:s(o,"function")?o.bind(r||t):o}return!1}var a="2.6.3",f={},l=!0,c=t.documentElement,h="modernizr",p=t.createElement(h),d=p.style,v,m={}.toString,g=" -webkit- -moz- -o- -ms- ".split(" "),y={svg:"http://www.w3.org/2000/svg"},b={},w={},E={},S=[],x=S.slice,T,N=function(e,n,r,i){var s,o,u,a,f=t.createElement("div"),l=t.body,p=l||t.createElement("body");if(parseInt(r,10))while(r--)u=t.createElement("div"),u.id=i?i[r]:h+(r+1),f.appendChild(u);return s=["&#173;",'<style id="s',h,'">',e,"</style>"].join(""),f.id=h,(l?f:p).innerHTML+=s,p.appendChild(f),l||(p.style.background="",p.style.overflow="hidden",a=c.style.overflow,c.style.overflow="hidden",c.appendChild(p)),o=n(f,e),l?f.parentNode.removeChild(f):(p.parentNode.removeChild(p),c.style.overflow=a),!!o},C=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t).matches;var r;return N("@media "+t+" { #"+h+" { position: absolute; } }",function(t){r=(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle)["position"]=="absolute"}),r},k={}.hasOwnProperty,L;!s(k,"undefined")&&!s(k.call,"undefined")?L=function(e,t){return k.call(e,t)}:L=function(e,t){return t in e&&s(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if(typeof t!="function")throw new TypeError;var n=x.call(arguments,1),r=function(){if(this instanceof r){var i=function(){};i.prototype=t.prototype;var s=new i,o=t.apply(s,n.concat(x.call(arguments)));return Object(o)===o?o:s}return t.apply(e,n.concat(x.call(arguments)))};return r}),b.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:N(["@media (",g.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=e.offsetTop===9}),n},b.svg=function(){return!!t.createElementNS&&!!t.createElementNS(y.svg,"svg").createSVGRect},b.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==y.svg},b.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(m.call(t.createElementNS(y.svg,"clipPath")))};for(var A in b)L(b,A)&&(T=A.toLowerCase(),f[T]=b[A](),S.push((f[T]?"":"no-")+T));return f.addTest=function(e,t){if(typeof e=="object")for(var r in e)L(e,r)&&f.addTest(r,e[r]);else{e=e.toLowerCase();if(f[e]!==n)return f;t=typeof t=="function"?t():t,typeof l!="undefined"&&l&&(c.className+=" "+(t?"":"no-")+e),f[e]=t}return f},r(""),p=v=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=g.elements;return typeof e=="string"?e.split(" "):e}function i(e){var t=v[e[p]];return t||(t={},d++,e[p]=d,v[d]=t),t}function s(e,n,r){n||(n=t);if(m)return n.createElement(e);r||(r=i(n));var s;return r.cache[e]?s=r.cache[e].cloneNode():c.test(e)?s=(r.cache[e]=r.createElem(e)).cloneNode():s=r.createElem(e),s.canHaveChildren&&!l.test(e)?r.frag.appendChild(s):s}function o(e,n){e||(e=t);if(m)return e.createDocumentFragment();n=n||i(e);var s=n.frag.cloneNode(),o=0,u=r(),a=u.length;for(;o<a;o++)s.createElement(u[o]);return s}function u(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return g.shivMethods?s(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(g,t.frag)}function a(e){e||(e=t);var r=i(e);return g.shivCSS&&!h&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),m||u(e,r),e}var f=e.html5||{},l=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,c=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h,p="_html5shiv",d=0,v={},m;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",h="hidden"in e,m=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){h=!0,m=!0}})();var g={elements:f.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:f.shivCSS!==!1,supportsUnknownElements:m,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:a,createElement:s,createDocumentFragment:o};e.html5=g,a(t)}(this,t),f._version=a,f._prefixes=g,f.mq=C,f.testStyles=N,c.className=c.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(l?" js "+S.join(" "):""),f}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==d.call(e)}function i(e){return"string"==typeof e}function s(){}function o(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function u(){var e=v.shift();m=1,e?e.t?h(function(){("c"==e.t?k.injectCss:k.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),u()):m=0}function a(e,n,r,i,s,a,f){function l(t){if(!d&&o(c.readyState)&&(w.r=d=1,!m&&u(),c.onload=c.onreadystatechange=null,t)){"img"!=e&&h(function(){b.removeChild(c)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload()}}var f=f||k.errorTimeout,c=t.createElement(e),d=0,g=0,w={t:r,s:n,e:s,a:a,x:f};1===T[n]&&(g=1,T[n]=[]),"object"==e?c.data=n:(c.src=n,c.type=e),c.width=c.height="0",c.onerror=c.onload=c.onreadystatechange=function(){l.call(this,g)},v.splice(i,0,w),"img"!=e&&(g||2===T[n]?(b.insertBefore(c,y?null:p),h(l,f)):T[n].push(c))}function f(e,t,n,r,s){return m=0,t=t||"j",i(e)?a("c"==t?E:w,e,t,this.i++,n,r,s):(v.splice(this.i++,0,e),1==v.length&&u()),this}function l(){var e=k;return e.loader={load:f,i:0},e}var c=t.documentElement,h=e.setTimeout,p=t.getElementsByTagName("script")[0],d={}.toString,v=[],m=0,g="MozAppearance"in c.style,y=g&&!!t.createRange().compareNode,b=y?c:p.parentNode,c=e.opera&&"[object Opera]"==d.call(e.opera),c=!!t.attachEvent&&!c,w=g?"object":c?"script":"img",E=c?"script":w,S=Array.isArray||function(e){return"[object Array]"==d.call(e)},x=[],T={},N={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},C,k;k=function(e){function t(e){var e=e.split("!"),t=x.length,n=e.pop(),r=e.length,n={url:n,origUrl:n,prefixes:e},i,s,o;for(s=0;s<r;s++)o=e[s].split("="),(i=N[o.shift()])&&(n=i(n,o));for(s=0;s<t;s++)n=x[s](n);return n}function o(e,i,s,o,u){var a=t(e),f=a.autoCallback;a.url.split(".").pop().split("?").shift(),a.bypass||(i&&(i=r(i)?i:i[e]||i[o]||i[e.split("/").pop().split("?")[0]]),a.instead?a.instead(e,i,s,o,u):(T[a.url]?a.noexec=!0:T[a.url]=1,s.load(a.url,a.forceCSS||!a.forceJS&&"css"==a.url.split(".").pop().split("?").shift()?"c":n,a.noexec,a.attrs,a.timeout),(r(i)||r(f))&&s.load(function(){l(),i&&i(a.origUrl,u,o),f&&f(a.origUrl,u,o),T[a.url]=2})))}function u(e,t){function n(e,n){if(e){if(i(e))n||(f=function(){var e=[].slice.call(arguments);l.apply(this,e),c()}),o(e,f,t,0,u);else if(Object(e)===e)for(p in h=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}(),e)e.hasOwnProperty(p)&&(!n&&!--h&&(r(f)?f=function(){var e=[].slice.call(arguments);l.apply(this,e),c()}:f[p]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),c()}}(l[p])),o(e[p],f,t,p,u))}else!n&&c()}var u=!!e.test,a=e.load||e.both,f=e.callback||s,l=f,c=e.complete||s,h,p;n(u?e.yep:e.nope,!!a),a&&n(a)}var a,f,c=this.yepnope.loader;if(i(e))o(e,0,c,0);else if(S(e))for(a=0;a<e.length;a++)f=e[a],i(f)?o(f,0,c,0):S(f)?k(f):Object(f)===f&&u(f,c);else Object(e)===e&&u(e,c)},k.addPrefix=function(e,t){N[e]=t},k.addFilter=function(e){x.push(e)},k.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",C=function(){t.removeEventListener("DOMContentLoaded",C,0),t.readyState="complete"},0)),e.yepnope=l(),e.yepnope.executeStack=u,e.yepnope.injectJs=function(e,n,r,i,a,f){var l=t.createElement("script"),c,d,i=i||k.errorTimeout;l.src=e;for(d in r)l.setAttribute(d,r[d]);n=f?u:n||s,l.onreadystatechange=l.onload=function(){!c&&o(l.readyState)&&(c=1,n(),l.onload=l.onreadystatechange=null)},h(function(){c||(c=1,n(1))},i),a?l.onload():p.parentNode.insertBefore(l,p)},e.yepnope.injectCss=function(e,n,r,i,o,a){var i=t.createElement("link"),f,n=a?u:n||s;i.href=e,i.rel="stylesheet",i.type="text/css";for(f in r)i.setAttribute(f,r[f]);o||(p.parentNode.insertBefore(i,p),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("pointerevents",function(){var e=document.createElement("x"),t=document.documentElement,n=window.getComputedStyle,r;return"pointerEvents"in e.style?(e.style.pointerEvents="auto",e.style.pointerEvents="x",t.appendChild(e),r=n&&n(e,"").pointerEvents==="auto",t.removeChild(e),!!r):!1}),Modernizr.addTest("ie8compat",function(){return!window.addEventListener&&document.documentMode&&document.documentMode===7});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function(){var ZCOM=function(domain){this.domain=domain||'.zurbb.com';this.leadId=findCookie('intercom-id');this.email=findCookie('zurb-intercom-email');var queue=findCookie('zcom-queue');if(queue){this.queue=JSON.parse(queue);}else{this.queue=[];}
this.bindEvents(document);this.runQueue();};ZCOM.prototype.bindEvents=function(rootNode){var eventElements=rootNode.querySelectorAll('[data-zcom-event]');var self=this;for(var i=0;i<eventElements.length;i++){if(eventElements[i].getAttribute('data-has-zcom-event-handler')===null){eventElements[i].addEventListener('click',function(){self.createEvent(this.dataset.zcomEvent);});eventElements[i].setAttribute('data-has-zcom-event-handler',1)}};var attributeElements=rootNode.querySelectorAll('[data-zcom-attribute]');for(var i=0;i<attributeElements.length;i++){if(attributeElements[i].getAttribute('data-has-zcom-attribute-handler')===null){attributeElements[i].addEventListener('click',function(){self.createAttribute({name:this.dataset.zcomAttribute});});attributeElements[i].setAttribute('data-has-zcom-attribute-handler',1)}};var emailElements=rootNode.querySelectorAll('input[type="email"]');var self=this;for(var i=0;i<emailElements.length;i++){var form=emailElements[i].form;var elem=emailElements[i];if(form.getAttribute('data-has-zcom-email-handler')===null){form.addEventListener('submit',function(){var email=elem.value;if(!self.hasEmail()&&validateEmail(email)){self.setEmail(email);}});form.setAttribute('data-has-zcom-email-handler',1);}}};ZCOM.prototype.createEvent=function(eventName,data){data=data||{}
data.event_name=eventName;data.created_at=parseInt(Date.now()/ 1000);
this.queueUpdate(data);};ZCOM.prototype.createAttribute=function(data){this.queueUpdate({custom_attributes:data})};ZCOM.prototype.queueUpdate=function(data){this.queue.push(data)
this.saveQueue();};ZCOM.prototype.saveQueue=function(){setCookie('zcom-queue',JSON.stringify(this.queue),720,this.domain)};ZCOM.prototype.runQueue=function(data){if(this.queue.length){var self=this;this._sendUpdate(this.queue[0],function(){self.queue.shift();self.saveQueue();self.runQueue();})}else{window.setTimeout(this.runQueue.bind(this),1000);}};ZCOM.prototype._sendUpdate=function(data,cb){var xhttp=new XMLHttpRequest();var data=this.addUserInfo(data);xhttp.open('POST','https://intercom.zurbb.com/updates',true);xhttp.setRequestHeader('Content-type','application/json');xhttp.onreadystatechange=function(){if(xhttp.readyState==4&&xhttp.status==200){if(cb){cb(JSON.parse(xhttp.response));}}}
xhttp.send(JSON.stringify(data));};ZCOM.prototype.setEmail=function(email){if(this.email!==email){this.email=email;this.queueUpdate({});}
setCookie('zurb-intercom-email',this.email,730,this.domain);};ZCOM.prototype.hasEmail=function(){return!!this.email;};ZCOM.prototype.addUserInfo=function(data){var results={};for(var key in data){if(data.hasOwnProperty(key)){results[key]=data[key];}}
if(this.hasEmail()){results.email=this.email;}
results.user_id=findCookie('intercom-id');return results;};function decodeCookie(){var cookieParts=document.cookie.split(';'),cookies={};for(var i=0;i<cookieParts.length;i++){var name_value=cookieParts[i],equals_pos=name_value.indexOf('='),name=unescape(name_value.slice(0,equals_pos)).trim(),value=unescape(name_value.slice(equals_pos+ 1));cookies[':'+ name]=value;}
return cookies;};function findCookie(searchWord){var cookies=decodeCookie();for(name in cookies){var value=cookies[name];if(name.indexOf(':'+ searchWord)==0){return value;}}};function setCookie(cname,cvalue,exdays,domain){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires='expires='+ d.toUTCString();document.cookie=cname+'='+ cvalue+'; '+ expires+'; domain='+ domain+'; path=/';};function validateEmail(email){var re=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;return re.test(email);};function bindReady(handler){var called=false
function ready(){if(called)return
called=true
handler()}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",ready,false)}else if(document.attachEvent){try{var isFrame=window.frameElement!=null}catch(e){}
if(document.documentElement.doScroll&&!isFrame){function tryScroll(){if(called)return
try{document.documentElement.doScroll("left")
ready()}catch(e){setTimeout(tryScroll,10)}}
tryScroll()}
document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){ready()}})}
if(window.addEventListener)
window.addEventListener('load',ready,false)
else if(window.attachEvent)
window.attachEvent('onload',ready)
else{var fn=window.onload
window.onload=function(){fn&&fn()
ready()}}}
function fireZcomAvailableEvent(){var event;if(document.createEvent){event=document.createEvent("HTMLEvents");event.initEvent("zcomavailable",true,true);}else{event=document.createEventObject();event.eventType="zcomavailable";}
event.eventName="zcomavailable";if(document.createEvent){window.dispatchEvent(event);}else{window.fireEvent("on"+ event.eventType,event);}}
bindReady(function(){window.ZCOM=new ZCOM();fireZcomAvailableEvent();});}());
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//








	// ZURB Top Level
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2195009-2']);
  _gaq.push(['_trackPageview']);

  // ZURB Marketing Level
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2195009-54']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
