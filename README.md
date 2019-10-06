# Deploy Hooks
Deploy hooks is (hopefully) the easiest way to add simple webhook deploys to arbitrary sites on a VPS.

Once the project is setup, "deploy endpoints" can be created by creating a deploy shell/bash script in the scripts directory. The name of the script matches the name of the endpoint, prefixed with 'deploy'. An example may help explain. To deploy a site `my-great-website`, first install & run this project on the same server. I then create the file `scripts/my-great-website` with the following contents:
```sh
#!/bin/sh

# Move to the correct directory
cd /var/www/my-great-website

# Pull latest changes
git pull

# Install updated dependencies
yarn install

# Build project
yarn build
```

For this example, pretend I have this instance of the project hosted under the domain `deploy.example.com`. To trigger the build I need to configure GitHub's Webhook for this project. Go to the projects Settings -> Webhook -> Add webhook. Set the Payload URL so ``${your instance}/deploy/${your site}`` e.g. `https://deploy.example.com/deploy/my-great-website`. Next make sure the Github Secret matches the GITHUB_SECRET from your .env file and press save (Add Webhook). Now anytime a push occurs, the project will redeploy!

basic example laravel deploy script
```sh
cd /var/www/project-directory
php artisan down
git pull
composer install
yarn install
php artisan migrate
yarn run prod
php artisan up
```

All events are logged to a configurable log file. If you wish to receive notifications every time a build succeeds or fails, Please check out my other project [Hatchet](https://github.com/reed-jones/hatchet).
