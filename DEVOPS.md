# TC - DevOps Flow

This app is currently on [Openshift GOLD](https://console.apps.gold.devops.gov.bc.ca/).

The flow is spread across four namespaces, one for each environment (Dev, Test, Prod), and Tools for builds. As well, the Postgres DB sites in an instance of [Patroni](https://github.com/bcgov/patroni-postgres-container) with [backups](https://github.com/BCDevOps/backup-container) (TODO).

### Deployment
For deployment in a fresh namespace, there are a number of make commands that should assist in the initial setup of the environment.

First create the Patroni instance. This can be done by running `db-prep` to create the necessary secrets, then `db-create` to create the StatefulSet that pulls from the BCGov image of Patroni.

Note that the latest tag provided from BCGov Patroni uses Postgres 12.4.

You can then create the other secrets we need, such as Keycloak credentials, with `deployment-prep`. Then, push the build configs and deployment configs to the namespace with `server-create` and `client-create`, creating a BC and DC for each.

### Flow
Deployment works by tagging a commit `dev`, `test`, or `prod`. This can be done using the `tag-dev`, `tag-test`, and `tag-prod` commands. Additionally, a merge to main should automatically trigger a deployment as well.

On merge to main, `ci-deploy` will update BCs and DCs if necessary, and then kick off a build on Openshift on tools. Once built, this sits with the `latest` tag.
Tagging on GitHub will then kick off a flow where the image of a certain commit is tagged with the environment tag. The deployment configs are set such that when an image is tagged with the appropriate environment tag, it promotes that image and deploys it.