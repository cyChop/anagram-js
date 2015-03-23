QUnit.test('Available: empty string', function(assert) {
    'use strict';

    var emptyMap = {};

    assert.deepEqual(anagram.getAvailable(), emptyMap, 'No string -> empty map' );
    assert.deepEqual(anagram.getAvailable(undefined), emptyMap, 'Undefined -> empty map' );
    assert.deepEqual(anagram.getAvailable(null), emptyMap, 'Null -> empty map' );

    assert.deepEqual(anagram.getAvailable(''), emptyMap, 'Empty string -> empty map' );
    assert.deepEqual(anagram.getAvailable('  \t'), emptyMap, 'Blank string -> empty map' );

    assert.deepEqual(anagram.getAvailable('0123-[]$`%µ²'), emptyMap, 'String without letter -> empty map' );
});

QUnit.test('Available: standard input', function(assert) {
    'use strict';

    assert.deepEqual(anagram.getAvailable('live'), { e: 1, v: 1, i: 1, l: 1 }, 'Simple map, single letters');
    assert.deepEqual(anagram.getAvailable('cyChop'), { c: 2, y: 1, h: 1, o: 1, p: 1 }, 'Simple map, repeated letter');
});

QUnit.test('Available: special characters stripping', function(assert) {
    'use strict';

    var jeanPierre = { j: 1, e: 3, a: 1, n: 1, p: 1, i: 1, r: 2 };
    assert.deepEqual(anagram.getAvailable('Jean-Pierre'), jeanPierre, 'Dash removed');
    assert.deepEqual(anagram.getAvailable('Jean-Pierre', false), jeanPierre, 'Dash removed even when stripping is inactive');

    var escaped = { a: 2, e: 2, o: 1 };
    assert.deepEqual(anagram.getAvailable('ÀéœÅ'), escaped, 'Special characters, stripping not specified');
    assert.deepEqual(anagram.getAvailable('ÀéœÅ', true), escaped, 'Special characters, stripping forced');
    assert.deepEqual(anagram.getAvailable('ÀéœÅ', false), { à: 1, é: 1, œ: 1, å: 1 }, 'Special characters, no stripping');
});
