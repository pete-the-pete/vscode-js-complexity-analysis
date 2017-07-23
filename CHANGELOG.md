# Changelog

## [2.0.0] - 2017-07-23
### Added
- Analyse class methods
### Changed
- `jsconfig.json` is now used for includes and excludes if nothing else is configured
- Configured include and exclude patterns need to be an array
### Fixed
- Full support for ES6 and newer JS features
- Include and exclude patterns not working

## [1.0.4] - 2016-09-24
### Fixed
- Fixed "invalid path" error on file complexity analysis command

## [1.0.3] - 2016-09-24
### Fixed
- Fixed parsing of JSX syntax
- Fixed parsing of ES6 modules
- Fixed navigation between report pages

## [1.0.2] - 2016-08-26
### Fixed
- Fixed handling of include and exclude settings

## [1.0.1] - 2016-07-09
### Fixed
- Fixed "Cannot read property 'document' of undefined" error
- Fixed report link styles

## [1.0.0] - 2016-05-17
### Changed
- HTML output for the report with navigation between files

## [0.2.2] - 2016-02-23
### Fixed
- Fixed bug in "Project complexity analysis" that caused incorrect paths on Windows machines

## [0.2.1] - 2016-02-10
### Fixed
- Fixed bug in "Project complexity analysis" error handling

## [0.2.0] - 2016-02-10
### Added
- "Project complexity analysis" command

### Changed
- "Complexity analysis" command is now titled "File complexity analysis"
- Calculated metrics are now rounded to two decimals.
- Legend is now formatted as a table

## 0.1.0 - 2016-02-01
### Added
- Complexity analysis command
- Option to configure calculated metrics per function

[Unreleased]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v1.0.4...v2.0.0
[1.0.4]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v1.0.1...v1.0.0
[1.0.0]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v1.0.0...v0.2.2
[0.2.2]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/tomi/vscode-js-complexity-analysis/compare/v0.1.0...v0.2.0
