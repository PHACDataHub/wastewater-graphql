# Changelog

## [2.3.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v2.2.1...v2.3.0) (2024-08-13)


### Features

* `Viral_Activity_Level` field in `InfobaseTrend` ([#56](https://github.com/PHACDataHub/wastewater-graphql/issues/56)) ([2dce1c6](https://github.com/PHACDataHub/wastewater-graphql/commit/2dce1c6c582a342338a491574edd12ab64735093))
* add `WastewaterAtEpiYearWeek` table ([#54](https://github.com/PHACDataHub/wastewater-graphql/issues/54)) ([5d1de97](https://github.com/PHACDataHub/wastewater-graphql/commit/5d1de9798ffe96559d746d9d500c609b5ece81c2))


### Bug Fixes

* correct int to float types in `InfobaseTrend` ([12fcfd0](https://github.com/PHACDataHub/wastewater-graphql/commit/12fcfd0bbac37621e46c54321f190750a2fe80b4))

## [2.2.1](https://github.com/PHACDataHub/wastewater-graphql/compare/v2.2.0...v2.2.1) (2024-07-19)


### Bug Fixes

* correct allsites filters ([cbcb0b0](https://github.com/PHACDataHub/wastewater-graphql/commit/cbcb0b0b0a776d8d161f75ec9421c8eda83dc322))

## [2.2.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v2.1.0...v2.2.0) (2024-03-20)


### Features

* add access to `townleveldatatrend` ([#45](https://github.com/PHACDataHub/wastewater-graphql/issues/45)) ([725ba55](https://github.com/PHACDataHub/wastewater-graphql/commit/725ba558745b1f9d8d4fba454d383f01ad98fc17))

## [2.1.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v2.0.1...v2.1.0) (2024-02-26)


### Features

* add `canadaleveldata`, `healthregleveldata`, `provinceleveldata` ([#43](https://github.com/PHACDataHub/wastewater-graphql/issues/43)) ([7a0cc42](https://github.com/PHACDataHub/wastewater-graphql/commit/7a0cc42c2a7673ed5c45a60778f7cc7cfde738cf))

## [2.0.1](https://github.com/PHACDataHub/wastewater-graphql/compare/v2.0.0...v2.0.1) (2024-01-09)


### Bug Fixes

* correct allSites, allSitesAdj schema ([#41](https://github.com/PHACDataHub/wastewater-graphql/issues/41)) ([ce870f3](https://github.com/PHACDataHub/wastewater-graphql/commit/ce870f328d44b73e34e7983f0d8eafc724aef304))

## [2.0.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.5.0...v2.0.0) (2023-11-30)


### ⚠ BREAKING CHANGES

* update schema to ODM v2 ([#39](https://github.com/PHACDataHub/wastewater-graphql/issues/39))

### Features

* update schema to ODM v2 ([#39](https://github.com/PHACDataHub/wastewater-graphql/issues/39)) ([5efa779](https://github.com/PHACDataHub/wastewater-graphql/commit/5efa7797ce67ed7d398d0c9bd3e8fa6b0cbfdcc8))


### Bug Fixes

* add `LotNumber` to `StandardCurve` ([94128c8](https://github.com/PHACDataHub/wastewater-graphql/commit/94128c8f75b828cbc56b26a153775e9c559bedd2))
* typo in `sites` schema ([df84379](https://github.com/PHACDataHub/wastewater-graphql/commit/df843793731513486ebed088290f3309aaf0d8c9))

## [1.5.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.4.0...v1.5.0) (2023-09-14)


### Features

* Enable querying of `StandardCurve` ([b2b416d](https://github.com/PHACDataHub/wastewater-graphql/commit/b2b416dcfe5355355fb831404165c8abed69c29c))


### Bug Fixes

* improve performance by removing top clauses ([2c13599](https://github.com/PHACDataHub/wastewater-graphql/commit/2c135996b83b3cfa383281013651e77714bbb61f))

## [1.4.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.3.0...v1.4.0) (2023-08-18)


### Features

* enable public access to the API ([#33](https://github.com/PHACDataHub/wastewater-graphql/issues/33)) ([9dc6abf](https://github.com/PHACDataHub/wastewater-graphql/commit/9dc6abf4d4c09a84c9da5534b41cc4a3472c1156))

## [1.3.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.2.0...v1.3.0) (2023-07-27)


### Features

* Upgrade to Apollo Server v4 ([#27](https://github.com/PHACDataHub/wastewater-graphql/issues/27)) ([d34f6bc](https://github.com/PHACDataHub/wastewater-graphql/commit/d34f6bc6d8254c87492f973e2ae0819f369fcaa1))

## [1.2.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.1.2...v1.2.0) (2023-07-12)


### Features

* add `siteID` to `allSites` and `allSitesAdj` ([#28](https://github.com/PHACDataHub/wastewater-graphql/issues/28)) ([fcab2cc](https://github.com/PHACDataHub/wastewater-graphql/commit/fcab2cc8361adda60dcc2b1c5d7a2e22860739d0))

## [1.1.2](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.1.1...v1.1.2) (2023-05-03)


### Bug Fixes

* `infobase.graphql` now correctly uses `InfobaseFilter` ([#25](https://github.com/PHACDataHub/wastewater-graphql/issues/25)) ([0e17e60](https://github.com/PHACDataHub/wastewater-graphql/commit/0e17e6073faf2cf87fdcc2fd5d8e9bcea08a01f2))

## [1.1.1](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.1.0...v1.1.1) (2023-03-24)


### Miscellaneous Chores

* release 1.1.1 ([8e468ef](https://github.com/PHACDataHub/wastewater-graphql/commit/8e468ef559cb17b3517f08fbcc8c3ccd7a833968))

## [1.1.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v1.0.0...v1.1.0) (2023-03-14)


### Features

* add access to `allSites`, `allSitesAdj`, `Infobase`, `InfobaseT… ([#22](https://github.com/PHACDataHub/wastewater-graphql/issues/22)) ([2c8084a](https://github.com/PHACDataHub/wastewater-graphql/commit/2c8084af8d27107c7d0663c860577ac96334831c))
* update data access for BCCDC and HNJ ([#20](https://github.com/PHACDataHub/wastewater-graphql/issues/20)) ([a21ed04](https://github.com/PHACDataHub/wastewater-graphql/commit/a21ed04ad437b21889a46ce8ad6a022c3a7469ae))

## [1.0.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v0.2.0...v1.0.0) (2023-02-22)


### Features

* add NML-WWGX dataset access for Haines Junction (HNJ) ([42efe55](https://github.com/PHACDataHub/wastewater-graphql/commit/42efe558bb69a7e98c382278e0b9ac735a483124))
* multiple condition support for data access ([da463fc](https://github.com/PHACDataHub/wastewater-graphql/commit/da463fc2191697ae25066d7218acbf9e07b70447))


### Miscellaneous Chores

* release 1.0.0 ([a3444ff](https://github.com/PHACDataHub/wastewater-graphql/commit/a3444ffa6644098d5fcba52045a7a74711f9e64d))

## [0.2.0](https://github.com/PHACDataHub/wastewater-graphql/compare/v0.1.0...v0.2.0) (2023-02-17)


### Features

* :sparkles: Implemented data access control ([a72e64a](https://github.com/PHACDataHub/wastewater-graphql/commit/a72e64a767977dbdff40102d511a443aece683b0))
* Added support for datetime types ([dfe43e0](https://github.com/PHACDataHub/wastewater-graphql/commit/dfe43e0507d7a5e3c6ada081a739c8d289ed660f))
* enable access for Haines Junction (HNJ) ([b3d0bc8](https://github.com/PHACDataHub/wastewater-graphql/commit/b3d0bc874567af55e6586e661b57d1be1b4a0912))


### Bug Fixes

* release-please.yml in proper directory ([d466a95](https://github.com/PHACDataHub/wastewater-graphql/commit/d466a95e2dc5491a7e6b2cae2cff8a0c44c1cdb0))

## **v0.3.0** <sub><sup>2022-11-21 ([d125716...81cf257](https://github.com/PHACDataHub/wastewater-graphql/compare/d125716...81cf257?diff=split))</sup></sub>

### Features
*  Added support for datetime types ([99d1d84](https://github.com/PHACDataHub/wastewater-graphql/commit/99d1d84))


## **v0.2.0** <sub><sup>2022-10-31 ([6849818...9cffd22](https://github.com/PHACDataHub/wastewater-graphql/compare/6849818...9cffd22?diff=split))</sup></sub>

### Features
*  :sparkles: Implemented data access control ([976466a](https://github.com/PHACDataHub/wastewater-graphql/commit/976466a))


## **v0.1.0** <sub><sup>2022-10-25 ([a987ee5...66fb027](https://github.com/PHACDataHub/wastewater-graphql/compare/a987ee5...66fb027?diff=split))</sup></sub>

### Features
*  GraphQL Schema now supports relationships ([a987ee5](https://github.com/PHACDataHub/wastewater-graphql/commit/a987ee5))


### BREAKING CHANGES
*  \`datasetID\` renamed to \`dataID\` \(Measures\) ([a987ee5](https://github.com/PHACDataHub/wastewater-graphql/commit/a987ee5))

## **0.0.1** <sub><sup>2022-09-21 ([ab89380...ab89380](https://github.com/PHACDataHub/wastewater-graphql/compare/ab89380...ab89380?diff=split))</sup></sub>

### Features
*  Initial release ([ab89380](https://github.com/PHACDataHub/wastewater-graphql/commit/ab89380))
