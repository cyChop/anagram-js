# js-anagram

<!---
[![Build Status][1]][2]
[![Coverage Status][3]][4]
--->

[![License][5]][6]
[![Go and play][7]][8]

## History

I love trying to find anagrams, but sometimes (especially with long phrases), trying to keep track
of letters you already used and letters still available can be a pain, so I wanted to make a small
tool to do this for me.

This was also the occasion for me to try a more formal way to do some JavaScript, with automation,
unit testing, and so on.

## What it is and is not

This JavaScript allows you to find which anagrams can or cannot be made using a set of letters,
provided **you** do the search.

It is **not** a script running automatically through a dictionary to find the possible
rearrangements. You will find plenty of those already, and though it is funny, it is not in the
current scope of this project.

## Roadmap

### Version 0.1.0

* [x] Get started with Grunt
* [x] Implement the JavaScript functions
  * [x] Implementation and testing
  * [x] Documentation
* [x] ~~Continuous integration~~ (this is a one-shot project, forget the CI)
  * [x] Clean what was begun for CI
* [ ] Create a ``gh-pages`` branch: use the script and two inputs to make something people can use
  * [x] Make demo page allowing for computing anagrams
  * [x] Links
    * [x] Documentation
    * [x] Source
    * [x] Latest release
  * [ ] Make the demo code available as a sample of how to use (tab on the demo page)
  * [ ] Save anagrams

### Bugs

* [ ] Diacritics stripping does not work for minified version

### Enhancements

* [ ] Make checker members private (manipulation of the attributes outside the class could cause
bugs which are willingly uncontrolled now for optimization)
* [ ] Move testing to nodeunit

<!---
[1]: http://img.shields.io/travis/cyChop/js-anagram/master.svg
[2]: https://travis-ci.org/cyChop/js-anagram
[3]: http://img.shields.io/coveralls/cyChop/js-anagram/master.svg
[4]: https://coveralls.io/r/cyChop/js-anagram?branch=master
--->

[5]: https://img.shields.io/badge/license-MIT-blue.svg
[6]: http://opensource.org/licenses/MIT
[7]: https://img.shields.io/badge/Demo_and_doc-%E2%96%BA-brightgreen.svg
[8]: http://cychop.github.io/js-anagram
