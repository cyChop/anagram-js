QUnit.test('Original: empty string', function(assert) {
    'use strict';

    var checker = anagram.checker(false);
    var emptyMap = {};

    checker.updateOriginal();
    assert.deepEqual(checker.getOriginalChars(), emptyMap, 'No string -> empty map' );
    assert.equal(checker.getOriginal(), undefined, 'No string -> undefined string');

    checker.updateOriginal(undefined);
    assert.deepEqual(checker.getOriginalChars(), emptyMap, 'Undefined -> empty map' );
    assert.equal(checker.getOriginal(), undefined, 'Undefined -> undefined string');

    checker.updateOriginal(null);
    assert.deepEqual(checker.getOriginalChars(), emptyMap, 'Null -> empty map' );
    assert.equal(checker.getOriginal(), null, 'Null -> null string');

    checker.updateOriginal('');
    assert.deepEqual(checker.getOriginalChars(), emptyMap, 'Empty string -> empty map' );
    assert.equal(checker.getOriginal(), '', 'Empty string -> itself');

    var blank = '  \t\n';
    checker.updateOriginal(blank);
    assert.deepEqual(checker.getOriginalChars(), emptyMap, 'Blank string -> empty map' );
    assert.equal(checker.getOriginal(), blank, 'Blank string -> itself');

    var noLetter = '0123-[]$`%µ²';
    checker.updateOriginal(noLetter);
    assert.deepEqual(checker.getOriginalChars(), emptyMap, 'String without letter -> empty map');
    assert.equal(checker.getOriginal(), noLetter, 'String without letter -> itself');
});

QUnit.test('Original: standard input', function(assert) {
    'use strict';

    var checker = anagram.checker(true, 'live'),
        expected;

    expected = { e: 1, v: 1, i: 1, l: 1 };
    assert.deepEqual(checker.getOriginalChars(), expected,
        'Single letters, init at construction');

    expected = { c: 2, y: 1, h: 1, o: 1, p: 1 };
    assert.deepEqual(checker.updateOriginal('cyChop').getOriginalChars(), expected,
        'Repeated letter, non-case-sensitive, updated after construction');
});

QUnit.test('Original: special characters stripping', function(assert) {
    'use strict';

    var checker = anagram.checker(),
        sChecker = anagram.checker(true),
        nsChecker = anagram.checker(false);

    var jeanPierre = { j: 1, e: 3, a: 1, n: 1, p: 1, i: 1, r: 2 };
    assert.deepEqual(checker.updateOriginal('Jean-Pierre').getOriginalChars(), jeanPierre,
        'Dash removed');
    assert.deepEqual(sChecker.updateOriginal('Jean-Pierre').getOriginalChars(), jeanPierre,
        'Dash removed when stripping is forced');
    assert.deepEqual(nsChecker.updateOriginal('Jean-Pierre').getOriginalChars(), jeanPierre,
        'Dash removed even when stripping is inactive');

    var source = 'ÀéœÅ',
        escaped = { a: 2, e: 2, o: 1 },
        unescaped = { à: 1, é: 1, œ: 1, å: 1 };
    assert.deepEqual(checker.updateOriginal(source).getOriginalChars(), escaped,
        'Special characters, stripping not specified');
    assert.deepEqual(sChecker.updateOriginal(source).getOriginalChars(), escaped,
        'Special characters, stripping forced');
    assert.deepEqual(nsChecker.updateOriginal(source).getOriginalChars(), unescaped,
        'Special characters, no stripping');

    // Update stripping
    assert.deepEqual(nsChecker.updateStripDiacritics(true).getOriginalChars(), escaped,
        'Special characters, no stripping -> stripping');
    assert.deepEqual(nsChecker.updateStripDiacritics(false).getOriginalChars(), unescaped,
        'Special characters, stripping -> no stripping');
});

QUnit.test('Anagram: diff/isAnagram', function(assert) {
    'use strict';

    var checker = anagram.checker(true, 'Tom Marvolo Riddle', 'Harry Potter');
    assert.deepEqual(checker.getDiff(),
        { h: -1, r: -1, y: -1, p: -1, t: -1, o: 2, m: 2, v: 1, i: 1, d: 2, l: 2 },
        'Check diff for "Tom Marvolo Riddle" and "Harry Potter"');
    assert.ok(!checker.isAnagram(), '"Harry Potter" is not an anagram of "Tom Marvolo Riddle"');

    checker.propose('I am Lord Voldemort');
    assert.deepEqual(checker.getDiff(), {},
        'Diff for "Tom Marvolo Riddle" and "I am Lord Voldemort" is empty');
    assert.ok(checker.isAnagram(), '"I am Lord Voldemort" is an anagram of "Tom Marvolo Riddle"');

    checker.updateOriginal('étreinte').propose('Éternité');
    assert.deepEqual(checker.getDiff(), {},
        'Diff for "étreinte" and "Éternité" is empty when stripping');
    assert.ok(checker.isAnagram(), '"Éternité" is an anagram of "étreinte" when stripping');

    checker.updateStripDiacritics(false);
    assert.deepEqual(checker.getDiff(), { é: -1, e: 1 },
        'Check diff for "étreinte" and "Éternité" when not stripping');
    assert.ok(!checker.isAnagram(),
        '"Éternité" is not an anagram of "étreinte" when not stripping');
});
