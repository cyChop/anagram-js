QUnit.test('Available: empty string', function(assert) {
    'use strict';

    var checker = new anagram.Checker(false);
    var emptyMap = {};

    checker.setSource();
    assert.deepEqual(checker.getAvailableCharsMap(), emptyMap,
        'No string -> empty map' );
    checker.setSource(undefined);
    assert.deepEqual(checker.getAvailableCharsMap(), emptyMap,
        'Undefined -> empty map' );
    checker.setSource(null);
    assert.deepEqual(checker.getAvailableCharsMap(), emptyMap,
        'Null -> empty map' );

    checker.setSource('');
    assert.deepEqual(checker.getAvailableCharsMap(), emptyMap,
        'Empty string -> empty map' );
    checker.setSource('  \t\n');
    assert.deepEqual(checker.getAvailableCharsMap(), emptyMap,
        'Blank string -> empty map' );

    checker.setSource('0123-[]$`%µ²');
    assert.deepEqual(checker.getAvailableCharsMap(), emptyMap,
        'String without letter -> empty map');
});

QUnit.test('Available: standard input', function(assert) {
    'use strict';

    var checker = new anagram.Checker(true, 'live');

    assert.deepEqual(checker.getAvailableCharsMap(), { e: 1, v: 1, i: 1, l: 1 },
        'Simple map, single letters');

    assert.deepEqual(checker.setSource('cyChop').getAvailableCharsMap(),
        { c: 2, y: 1, h: 1, o: 1, p: 1 }, 'Simple map, repeated letter, non-case-sensitive');
});

QUnit.test('Available: special characters stripping', function(assert) {
    'use strict';

    var checker = new anagram.Checker(),
        sChecker = new anagram.Checker(true),
        nsChecker = new anagram.Checker(false);

    var jeanPierre = { j: 1, e: 3, a: 1, n: 1, p: 1, i: 1, r: 2 };
    assert.deepEqual(checker.setSource('Jean-Pierre').getAvailableCharsMap(), jeanPierre,
        'Dash removed');
    assert.deepEqual(sChecker.setSource('Jean-Pierre').getAvailableCharsMap(), jeanPierre,
        'Dash removed when stripping is forced');
    assert.deepEqual(nsChecker.setSource('Jean-Pierre').getAvailableCharsMap(), jeanPierre,
        'Dash removed even when stripping is inactive');

    var escaped = { a: 2, e: 2, o: 1 };
    assert.deepEqual(checker.setSource('ÀéœÅ').getAvailableCharsMap(), escaped,
        'Special characters, stripping not specified');
    assert.deepEqual(sChecker.setSource('ÀéœÅ').getAvailableCharsMap(), escaped,
        'Special characters, stripping forced');
    assert.deepEqual(nsChecker.setSource('ÀéœÅ').getAvailableCharsMap(), { à: 1, é: 1, œ: 1, å: 1 },
        'Special characters, no stripping');
});
