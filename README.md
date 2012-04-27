jQuery File Upload ICanHaz/Mustache Template Engine Plugin
===================================================

An IcanHaz/Mustache template engine plugin for the [jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload).

## Dependencies
* [jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload)
  * [jQuery](http://jquery.com)
  * [jQuery UI widget factory](http://wiki.jqueryui.com/w/page/12138135/Widget_factory)
  * [jQuery Iframe Transport plugin](https://github.com/blueimp/jQuery-File-Upload)
* [ICanHas](http://icanhazjs.com) or [Mustache](https://github.com/janl/mustache.js) template Engine
* I18n library
  (e.g. https://github.com/fnando/i18n-js/blob/master/vendor/assets/javascripts/i18n.js )

## Development notes

### How to add vendor scripts as git subtree module?

#### I18n-js
* Add the remote repository

        git remote add -f i18n-js git://github.com/fnando/i18n-js.git

* Merge with --no-commit

        git merge -s ours --no-commit i18n-js/master

* Get module from tree

        git read-tree --prefix=scripts/src/vendor/i18n-js/ -u i18n-j1/master:vendor/assets/javascripts/

* Pulling in changes

        git pull -s subtree i18n-js master

## Changelog
* [CHANGELOG.md](https://github.com/meso-unimpressed/jQuery-File-Upload-ICanHaz-Mustache-Template-Engine/blob/master/CHANGELOG.md)

## Todo for Upcoming Releases
* Test with [mustache.js](https://github.com/janl/mustache.js)
* Add compressed and bundled (I18n) scripts
* Write a example [sinatra](http://www.sinatrarb.com/) application.
* Write Usage notes.

## Copyright
Copyright 2012, MESO Web Scapes - Mathias Wollin
[http://meso.net](http://meso.net)

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
