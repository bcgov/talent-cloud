# Makefile

# Run in the bash context and not /bin/sh (default)
SHELL := /bin/bash

# Environment variables for project
export $(sed 's/=.*//' .env)
ENV := $(PWD)/.env
include $(ENV)

# Project
export PROJECT := tc

export CONTAINER_REGISTRY := ""

# Openshift
export APP_NAME:=tcloud
export OS_NAMESPACE_PREFIX:=cd4869
export OS_NAMESPACE_SUFFIX?=dev
export TARGET_NAMESPACE=$(OS_NAMESPACE_PREFIX)-$(OS_NAMESPACE_SUFFIX)
export TOOLS_NAMESPACE=$(OS_NAMESPACE_PREFIX)-tools
export KEYCLOAK_AUTH_DEV=https://dev.loginproxy.gov.bc.ca/auth
export KEYCLOAK_AUTH_TEST=https://test.loginproxy.gov.bc.ca/auth
export KEYCLOAK_AUTH_PROD=https://loginproxy.gov.bc.ca/auth
export KEYCLOAK_AUTH=$(KEYCLOAK_AUTH_TEST)
export SERVER_POD:=$(shell oc get pods -o custom-columns=POD:.metadata.name --no-headers -l name=tcloud-server | head -n 1)


# Git
export COMMIT_SHA:=$(shell git rev-parse --short=7 HEAD)
export LAST_COMMIT_MESSAGE:=$(shell git log -1 --oneline --decorate=full --no-color --format="%h, %cn, %f, %D" | sed 's/->/:/')
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)

# Docker compose v2 for GHA
build-test:
	@echo "+\n++ Make: Running test build ...\n+"
	@$(shell echo ./scripts/setenv.sh local ci )
	@docker compose -f docker-compose.ci.yml up --force-recreate -d --build 

test-backend-pipeline:
	@docker exec tc-backend-ci npm run test:pipeline

test-frontend-pipeline:
	@docker exec tc-frontend-ci npm run test:pipeline

run-db:
	@docker-compose up -d db

build-local:
	@echo "+\n++ Make: Run/Build locally ...\n+"
	@$(shell echo ./scripts/setenv.sh ci local )
	@docker-compose up --force-recreate -d --build 

build-local-be:
	@echo "+\n++ Make: Run/Build locally ...\n+"
	@$(shell echo ./scripts/setenv.sh ci local )
	@docker-compose up backend --force-recreate -d --build 

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@$(shell echo ./scripts/setenv.sh ci local )
	@docker-compose up -d

local-frontend-logs:
	@docker logs $(PROJECT)-frontend-$(ENV) --tail 25 --follow

local-backend-logs:
	@docker logs $(PROJECT)-backend-$(ENV) --tail 25 --follow

local-nginx-logs:
	@docker logs $(PROJECT)-nginx --tail 25 --follow

local-db-logs:
	@docker logs  db --tail 25 --follow

local-db-workspace:
	@docker exec -it $(PROJECT)-db sh

local-backend-workspace:
	@docker exec -it $(PROJECT)-backend sh

local-frontend-workspace:
	@docker exec -it $(PROJECT)-frontend sh

local-nginx-workspace:
	@docker exec -it $(PROJECT)-nginx sh

# Docker compose v2 for GHA
close:
	@echo "+\n++ Make: Run/Close ...\n+"
	@docker compose  down -v --remove-orphans

close-local:
	@echo "+\n++ Make: Run/Close ...\n+"
	@docker-compose  down -v --remove-orphans

build-prod:
	@echo "+\n++ Make: Run/Build production ...\n+"
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/frontend:latest ./frontend
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/backend:latest ./backend

push-prod:
	@echo "+\n++ Make: Run/Push production ...\n+"
	@docker push $(CONTAINER_REGISTRY)/frontend:latest
	@docker push $(CONTAINER_REGISTRY)/backend:latest

open-db-tunnel:
	@oc project $(TARGET_NAMESPACE)
# Use patroni-0 to make EDIT changes, patroni-1 for READ ONLY
	@oc port-forward $(APP_NAME)-patroni-0 5432

### Openshift Setup
db-prep:
	@oc process -f openshift/patroni.prep.yml -p APP_NAME=$(APP_NAME) | oc create -n $(TARGET_NAMESPACE) -f -
	@oc policy add-role-to-user system:image-puller system:serviceaccount:$(TARGET_NAMESPACE):$(APP_NAME)-patroni -n $(TOOLS_NAMESPACE)

# Will potentially want to run the build in our namespace, but the build config pulled from GitHub doesn't seem to work
# https://github.com/bcgov/patroni-postgres-container/blob/master/openshift/templates/build.yaml
#db-build:
#	@oc process -f openshift/patroni.bc.yml | oc create -n ${TOOLS_NAMESPACE} -f -

db-create:
	@oc process -f openshift/patroni.dc.yml -p APP_NAME=tcloud | oc apply -n $(TARGET_NAMESPACE) -f -

db-backup-build:
	@oc process -f openshift/backup.dc.yml -p APP_NAME=tcloud-backup | oc apply -n $(TARGET_NAMESPACE) -f -

db-backup-create:
	@oc process -f openshift/backup.dc.yml -p APP_NAME=tcloud-backup | oc apply -n $(TARGET_NAMESPACE) -f -

networking-prep:
	@oc process -f openshift/networking.yml | oc apply -n $(TARGET_NAMESPACE) -f -

deployment-prep:
	@oc process -f openshift/server.prep.yml -p APP_NAME=$(APP_NAME) -p KEYCLOAK_AUTH_SERVER=$(KEYCLOAK_AUTH) -p KEYCLOAK_CLIENT=$(KEYCLOAK_CLIENT) -p APP_ENV=$(OS_NAMESPACE_SUFFIX) | oc create -n $(TARGET_NAMESPACE) -f -
	@oc policy add-role-to-user system:image-puller system:serviceaccount:$(TARGET_NAMESPACE):default -n $(TOOLS_NAMESPACE)

server-create:
	@oc process -f openshift/server.bc.yml -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -
	@oc process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) | oc apply -n $(TARGET_NAMESPACE) -f -

server-config:
	@oc -n $(TARGET_NAMESPACE) process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f -

client-create:
	@oc process -f openshift/client.bc.yml -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -
	@oc process -f openshift/client.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) | oc apply -n $(TARGET_NAMESPACE) -f -

client-config:
	@oc -n $(TARGET_NAMESPACE) process -f openshift/client.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f -

### Openshift CI
deployment-dry-run:
	@oc -n $(TARGET_NAMESPACE)  process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f - --dry-run=client
	@oc -n $(TARGET_NAMESPACE)  process -f openshift/client.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f - --dry-run=client

deployment-update:
	@oc -n $(TARGET_NAMESPACE) process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f -
	@oc -n $(TARGET_NAMESPACE) process -f openshift/client.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f -

build-config-update-server:
	@echo "Processiong and applying Server Building config in $(TOOLS_NAMESPACE) namespace"
	@oc -n $(TOOLS_NAMESPACE) process -f openshift/server.bc.yml -p REF=$(BUILD_REF) -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -

build-config-update-client:
	@echo "Processiong and applying Client Building config in $(TOOLS_NAMESPACE) namespace"
	@oc -n $(TOOLS_NAMESPACE) process -f openshift/client.bc.yml -p REF=$(BUILD_REF) -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -

deployment-build-server: build-config-update-server
	@echo "Building server image in $(TOOLS_NAMESPACE) namespace"
	@oc cancel-build bc/$(APP_NAME)-server -n $(TOOLS_NAMESPACE)
	@oc start-build $(APP_NAME)-server -n $(TOOLS_NAMESPACE) --wait --follow=true --build-arg VERSION="$(LAST_COMMIT)"
	@oc tag $(APP_NAME)-server:latest $(APP_NAME)-server:$(COMMIT_SHA) -n $(TOOLS_NAMESPACE)
	

deployment-build-client: build-config-update-client
	@echo "Building Client image in $(TOOLS_NAMESPACE) namespace"
	@oc cancel-build bc/$(APP_NAME)-client -n $(TOOLS_NAMESPACE)
	@oc start-build $(APP_NAME)-client -n $(TOOLS_NAMESPACE) --wait --follow=true --build-arg VERSION="$(LAST_COMMIT)"
	@oc tag $(APP_NAME)-client:latest $(APP_NAME)-client:$(COMMIT_SHA) -n $(TOOLS_NAMESPACE)

deployment-tag-to-deploy-server:
	@oc tag $(APP_NAME)-server:$(COMMIT_SHA) $(APP_NAME)-server:$(OS_NAMESPACE_SUFFIX) -n $(TOOLS_NAMESPACE)
	

deployment-tag-to-deploy-client:
	@oc tag $(APP_NAME)-client:$(COMMIT_SHA) $(APP_NAME)-client:$(OS_NAMESPACE_SUFFIX) -n $(TOOLS_NAMESPACE)

### Tagging
tag-dev:
	@git tag -fa dev -m "Deploy $(git rev-parse --abbrev-ref HEAD) to DEV env"
	@git push --force origin refs/tags/dev:refs/tags/dev

tag-test:
	@git tag -fa test -m "Deploy $(git rev-parse --abbrev-ref HEAD) to TEST env"
	@git push --force origin refs/tags/test:refs/tags/test

tag-prod:
	@git tag -fa prod -m "Deploy $(git rev-parse --abbrev-ref HEAD) to PROD env"
	@git push --force origin refs/tags/prod:refs/tags/prod

build-local-prod:
	@docker-compose down
	@docker build -f ./frontend/Dockerfile.prod ./frontend -t test-fe-prod:latest
	@docker build -f ./backend/Dockerfile.prod ./backend -t test-be-prod:latest 

run-local-prod:
	@docker-compose down
	@docker run -p3000:3000 test-fe-prod:latest 
	@docker run -p3001:3000 test-be-prod:latest

# ===================================
# Migrations
# ===================================

migration-create:
	@docker exec tc-backend-${ENV} npm run migration:create

migration-generate:	  
	@docker exec tc-backend-${ENV} npm run migration:generate

migration-revert: 
	@docker exec tc-backend-${ENV} npm run migration:revert

migration-run:
	@docker exec tc-backend-${ENV} ./node_modules/.bin/ts-node ./node_modules/typeorm/cli migration:run -d ./src/database/datasource.ts

seed-local:
	@docker exec -it tc-backend-${ENV} ./node_modules/.bin/ts-node -e 'require("./dist/database/create-availability-functions.js")'
	@docker exec -it tc-backend-${ENV} ./node_modules/.bin/ts-node -e 'require("./src/database/seed.ts")'

seed-local-recommitment:
	@docker exec tc-backend-${ENV} ./node_modules/.bin/ts-node -e 'require("./src/database/seed-recommitment.ts")'

seed-local-bcws:
	@docker exec tc-backend-${ENV} ./node_modules/.bin/ts-node -e 'require("./src/database/seed-fake-bcws.ts")'

seed-local-emcr:
	@docker exec tc-backend-${ENV} ./node_modules/.bin/ts-node -e 'require("./src/database/seed-fake-emcr.ts")'

seed-local-personnel:
	@docker exec tc-backend-${ENV} ./node_modules/.bin/ts-node -e 'require("./src/database/seed-fake-personnel.ts")'

seed-oc:
	@oc rsh $(SERVER_POD) ./node_modules/.bin/ts-node -e 'require("./dist/database/create-availability-functions.js")'
	@oc rsh $(SERVER_POD) ./node_modules/.bin/ts-node -e 'require("./dist/database/seed.js")'
	
seed-oc-personnel:
	@oc rsh $(SERVER_POD) ./node_modules/.bin/ts-node -e 'require("./dist/database/seed-fake-personnel.js")'

seed-oc-bcws:
	@oc rsh $(SERVER_POD) ./node_modules/.bin/ts-node -e 'require("./dist/database/seed-fake-bcws.js")'

seed-oc-emcr:
	@oc rsh $(SERVER_POD) ./node_modules/.bin/ts-node -e 'require("./dist/database/seed-fake-emcr.js")'

delete-db:
	@docker exec -it tc-db-local psql -U tc_user -d tc  -c "DROP SCHEMA public CASCADE;"
	@docker exec -it tc-db-local psql -U tc_user -d tc  -c "CREATE SCHEMA public;"



migration-run-oc:
	@oc rsh $(SERVER_POD) ./node_modules/.bin/ts-node ./node_modules/typeorm/cli migration:run -d ./dist/database/datasource.js


copy-keycloak-realm:
	@echo "+\n++ Make: Export Keycloak ...\n+"
	@docker exec $(PROJECT)-keycloak-$(ENV) opt/keycloak/bin/kc.sh export --dir /export/ --users realm_file
	

run-nibble-be:
	@echo "Run lint Backend"
	@cd backend && npm run nibble

run-nibble-fe:
	@echo "Run lint Backend"
	@cd frontend && npm run nibble