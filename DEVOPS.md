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

### Versioning

Tag the branch that you would like to deploy with the correct version and push to github (ie: v1.2.0) 

Follow this convention: v<major>/<minor>/<patch> ie: v1.1.1 

Create a release on github with the same name. Select the pushed tag as your tag and 'auto' for the previous tag. Generate the version notes. This should show all  of the commits between the last version and your current version. Save the release. You will see the code artifacts attached as zip files. 

When you are ready to deploy, run make tag-prod (assuming you have already ran make tag-dev/ make tag-test and QA has signed off) from the current version on your local. This will update the prod-tag with your current version, and the original tag/release that you have created will remain unchanged and can be used to in order to track the changes and in case you should ever need to roll back to a previous version. 

In Jira, create the release using the same version, and ensure all of the tickets (which should be automatically linked to github via the branch name) have been tagged with this version.

### Database and Backups

Database backups are handled with the BCGov Backup Container [Repo](https://github.com/BCDevOps/backup-container). We create a build in our `tools` environment and a deployment in our respective environments. This deployment creates a pod that includes a job that runs backups daily, weekly, and monthly.

The backup pod gives a range of options for manual backups, all surrounded in the script `backup.sh`. `./backup.sh -1`, for example, runs a manual backup just once. You can use `backup.sh -h` to see what commands are available. Backups are stored in the `backups` folder.

As noted in the above repo, backups are on a schedule while restoration must be done manually. The steps to restore are:
- Scale down all resources that connect to the database - at this point, it is just the hcap-server DC pods
- Ensure that no cron jobs will not run while performing the restoration
- Scale down patroni to a single node, ensuring that it is the leader
    - To see which members are the leaders vs the replicas, while RSH-ing into the Patroni node, use `patronictl -c patroni.yml list`
    - You can switch nodes using the config map `hcap-patroni-leader`
- RSH into the backup node. You'll find the backup script `backup.sh` there
    - You can use `./backup.sh -h` for help commands
- Make a manual backup of current time
- Restore with a specific file within the `backups` directory using the `backup.sh -r` script
- Use the superuser password found in secrets

This should now restore your database to your desired point in time.