#!/bin/bash
ENV=$(sed "s/ENV=$1/ENV=$2/"  ./.env)
echo "$ENV" > .env