describe('The checker', function () {
    'use strict';

    describe('even without diacritic stripping', function () {
        var checker;
        beforeEach(function () {
            checker = anagram.checker(false);
        });

        it('returns correct results when no string is supplied', function () {
            checker.updateOriginal();
            expect(checker.getOriginalChars()).toEqual({});
            expect(checker.getOriginal()).toBeUndefined();
        });

        it('returns correct results when "undefined" is supplied', function () {
            checker.updateOriginal(undefined);
            expect(checker.getOriginalChars()).toEqual({});
            expect(checker.getOriginal()).toBeUndefined();
        });

        it('returns correct results when "null" is supplied', function () {
            checker.updateOriginal(null);
            expect(checker.getOriginalChars()).toEqual({});
            expect(checker.getOriginal()).toBeNull();
        });

        it('returns correct results when "" is supplied', function () {
            var original = '';
            checker.updateOriginal(original);
            expect(checker.getOriginalChars()).toEqual({});
            expect(checker.getOriginal()).toBe(original);
        });

        it('does not take blank characters into account', function () {
            var original = ' \t\n';
            checker.updateOriginal(original);
            expect(checker.getOriginalChars()).toEqual({});
            expect(checker.getOriginal()).toBe(original);
        });

        it('does not take non-letter characters into account', function () {
            var original = '0123-[]$`%µ²';
            checker.updateOriginal(original);
            expect(checker.getOriginalChars()).toEqual({});
            expect(checker.getOriginal()).toBe(original);
        });
    });

    describe('original characters', function () {
        var checker;

        it('can be initialized with the checker', function () {
            checker = anagram.checker(true, 'live');
            expect(checker.getOriginalChars()).toEqual({e: 1, v: 1, i: 1, l: 1});
        });

        it('can be updated, takes repeated letters into account and is not case-sensitive', function () {
            expect(checker.updateOriginal('cyChop').getOriginalChars())
                .toEqual({c: 2, y: 1, h: 1, o: 1, p: 1});
        });
    });

    describe('stripping of special characters', function () {
        var defaultChecker = anagram.checker(),
            stripprChecker = anagram.checker(true),
            prudishChecker = anagram.checker(false);

        it('does not influence the removal of dashes', function () {
            var source = 'Jean-Pierre',
                map = {j: 1, e: 3, a: 1, n: 1, p: 1, i: 1, r: 2};

            expect(defaultChecker.updateOriginal(source).getOriginalChars()).toEqual(map);
            expect(stripprChecker.updateOriginal(source).getOriginalChars()).toEqual(map);
            expect(prudishChecker.updateOriginal(source).getOriginalChars()).toEqual(map);
        });

        it('works only when activated (activated by default)', function () {
            var source = 'ÀéœÅ',
                escaped = {a: 2, e: 2, o: 1},
                unescaped = {à: 1, é: 1, œ: 1, å: 1};

            expect(defaultChecker.updateOriginal(source).getOriginalChars()).toEqual(escaped);
            expect(stripprChecker.updateOriginal(source).getOriginalChars()).toEqual(escaped);
            expect(prudishChecker.updateOriginal(source).getOriginalChars()).toEqual(unescaped);
        });

        it('can be enabled or disabled on demand', function () {
            var escaped = {a: 2, e: 2, o: 1},
                unescaped = {à: 1, é: 1, œ: 1, å: 1};

            expect(prudishChecker.updateStripDiacritics(true).getOriginalChars()).toEqual(escaped);
            expect(prudishChecker.updateStripDiacritics(false).getOriginalChars()).toEqual(unescaped);
        });
    });

    describe('diff checking', function () {
        var checker;

        it('works when there is a diff', function () {
            checker = anagram.checker(true, 'Tom Marvolo Riddle', 'Harry Potter');
            expect(checker.getDiff()).toEqual({h: -1, r: -1, y: -1, p: -1, t: -1, o: 2, m: 2, v: 1, i: 1, d: 2, l: 2});
            expect(checker.isAnagram()).toBe(false);
        });

        it('works when there is no diff', function () {
            checker.propose('I am Lord Voldemort.');
            expect(checker.getDiff()).toEqual({});
            expect(checker.isAnagram()).toBe(true);
        });

        it('works when there is no diff once special characters are stripped', function () {
            checker.updateOriginal('étreinte').propose('Éternité');
            expect(checker.getDiff()).toEqual({});
            expect(checker.isAnagram()).toBe(true);
        });

        it('is updated when the diacritics stripping setting is changed', function () {
            checker.updateStripDiacritics(false);
            expect(checker.getDiff()).toEqual({ é: -1, e: 1 });
            expect(checker.isAnagram()).toBe(false);
        });
    });
});
