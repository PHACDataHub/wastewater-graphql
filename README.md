# GraphQL API for WasteWater

This is a GraphQL server built using Apollo that provides access to waste
water surveillance data.

## Getting started

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
and [release please](https://github.com/googleapis/release-please)
to maintain [CHANGELOG.md](CHANGELOG.md) and
[semantic versioning](https://semver.org/).  To achieve this PRs are either 
squashed or rebased into main with the appropriate commit messages.


### Example release commit workflow

1. Create a new branch 
   
2. Make your changes (ensure commits follow the
[conventional commits](https://www.conventionalcommits.org) specification)

        git commit -am'feat: added new feature'

1. Push to github

        git push

2. Create PR and rebase to main
3. `release-please` will automatically create release PRs. Merge the PR
   when ready and `release-please` will update the changelog and tag the commit
   with the version number.
