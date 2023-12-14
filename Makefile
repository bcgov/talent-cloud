# Makefile

# Run in the bash context and not /bin/sh (default)
SHELL := /bin/bash

# Environment variables for project
export $(sed 's/=.*//' .env)
ENV := $(PWD)/.env
include $(ENV)

export ENV_NAME=dev
# Project
export PROJECT := tc

export CONTAINER_REGISTRY := ""

export APP_VERSION := $(shell cat apps/backend/package.json | jq '.version' -r)
export API_VERSION := $(API_VERSION)

# Git
export COMMIT_SHA:=$(shell git rev-parse --short=7 HEAD)
export LAST_COMMIT_MESSAGE:=$(shell git log -1 --oneline --decorate=full --no-color --format="%h, %cn, %f, %D" | sed 's/->/:/')
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)


build-test:
	@echo "+\n++ Make: Running test build ...\n+"
	@docker-compose -f docker-compose-test.yml up --build -d --force-recreate

run-test-backend-pipeline:
	@docker exec tc-backend-test npm run test:pipeline

# run-test-frontend-pipeline:
# 	@docker exec -i tc-frontend-test npm run test:pipeline

run-test-coverage:
	@docker exec -i tc-backend-test npm run test:cov

close-test:
	@echo "+\n++ Make: Closing test container ...\n+"
	@docker-compose -f docker-compose-test.yml down

build-local:
	@echo "+\n++ Make: Run/Build locally ...\n+"
	@docker-compose up --build -d

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose   up -d

build-keycloak:
	@echo "+\n++ Make: Buidling keycloak ...\n+"
	@docker-compose build --no-cache keycloak

build-frontend:
	@echo "+\n++ Make: Building frontend ...\n+"
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/frontend:latest ./frontend

build-backend:
	@echo "+\n++ Make: Building backend ...\n+"
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/backend:latest ./backend

build-nginx:
	@echo "+\n++ Make: Building Nginx ...\n+"
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/nginx:latest ./nginx

local-frontend-logs:
	@docker logs $(PROJECT)-frontend --tail 25 --follow

local-backend-logs:
	@docker logs $(PROJECT)-backend --tail 25 --follow


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

close-local:
	@echo "+\n++ Make: Close Local ...\n+"
	@docker-compose -f docker-compose.yml down -v --remove-orphans

close:
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
	
