# GraphQL API for WasteWater

This is a GraphQL server built using Apollo that provides access to waste
water surveillance data.

## Getting started
<<<<<<< HEAD

Create a local configuration file named `local.settings.json` with the following
content (or whatever content is required for your envrionment):

```json
// local.settings.json
{
    "IsEncrypted": false,
    "Values": {
      "FUNCTIONS_WORKER_RUNTIME": "node",
      "AzureWebJobsStorage": "UseDevelopmentStorage=true"
    }
  }
```

Create a `.env` file that defines the required envrionment variables.

| Variable          | Description                                   |
| ----------------- | --------------------------------------------- |
| ***DB_DATABASE**  | The name of the database                      |
| ***DB_HOST**      | The host                                      |
| ***DB_AUTH_TYPE** | Authentication type. See allowed values below |
| DB_USER           | SQL Authentication username                   |
| DB_PASSWORD       | SQL Authentication password                   |

Valid values for `DB_AUTH_TYPE` are:

  - default
  - ntlm
  - azure-active-directory-password
  - azure-active-directory-access-token
  - azure-active-directory-msi-vm
  - azure-active-directory-msi-app-service
  - azure-active-directory-service-principal-secret


Example `.env` file:

```bash
# .env
DB_DATABASE=wwdb
DB_HOST=localhost
DB_AUTH_TYPE=default

DB_USER=test
DB_PASSWORD=test
```

## Before merging with main
=======
>>>>>>> 73b6839... docs: Added diagrams on data authorization

Create a local configuration file named `local.settings.json` with the following
content (or whatever content is required for your envrionment):

```json
// local.settings.json
{
    "IsEncrypted": false,
    "Values": {
      "FUNCTIONS_WORKER_RUNTIME": "node",
      "AzureWebJobsStorage": "UseDevelopmentStorage=true"
    }
  }
```

Create a `.env` file that defines the required envrionment variables.

| Variable          | Description                                   |
| ----------------- | --------------------------------------------- |
| ***DB_DATABASE**  | The name of the database                      |
| ***DB_HOST**      | The host                                      |
| ***DB_AUTH_TYPE** | Authentication type. See allowed values below |
| DB_USER           | SQL Authentication username                   |
| DB_PASSWORD       | SQL Authentication password                   |

Valid values for `DB_AUTH_TYPE` are:

  - default
  - ntlm
  - azure-active-directory-password
  - azure-active-directory-access-token
  - azure-active-directory-msi-vm
  - azure-active-directory-msi-app-service
  - azure-active-directory-service-principal-secret


Example `.env` file:

```bash
# .env
DB_DATABASE=wwdb
DB_HOST=localhost
DB_AUTH_TYPE=default

DB_USER=test
DB_PASSWORD=test
```

## Data access

Access to data is determined by the Azure API Management gateway, details on how
this process works can be found in [AUTHORIZATION.md](./docs/AUTHORIZATION.md).

The authorization documentation is generated by code, and can be updated by
running `npm run docs` on a linux system with `xvfb` installed.

## Contributing

This repository uses [conventional commits](https://www.conventionalcommits.org)
to maintain [CHANGELOG.md](CHANGELOG.md) and
[semantic versioning](https://semver.org/).  To achieve this PRs are either 
squashed or rebased into main with the appropriate commit messages.


### Example release commit workflow

1. Create a new branch
   
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

1. Push to github

        git push

1. Create PR and rebase to main

1. Checkout and pull main

        git checkout main
        git pull

1. Tag commit with version and push

        git tag -a -m'build(release): <version>' 'v<version>'
        git push --tags

1.  Rebase release PR into main