# GraphQL API for WasteWater

This is a GraphQL server built using Apollo that provides access to waste
water surveillance data.

## Before merging with main

1. Determine version

        npx git-conventional-commits version

1. Update version in project files

    - package.json

1. Commit version bump

        git commit -am'build(release): bump project version to <version>'

1. Generate change log

        git-conventional-commits changelog --release <version> --file 'CHANGELOG.md'

1. Commit change log

        git commit -am'docs(release): create <version> change log entry'

1. Tag commit with version

        git tag -a -m'build(release): <version>' '<version-prefix><version>'

1. Push all changes

        git push
