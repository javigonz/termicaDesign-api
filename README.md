# Overview

API Endpoints for TermicaDesign app

Project running with:

- Nodejs
- Static module bundler with Webpack
- Lambdasfunctions to expose each endpoint
- Deploy in AWS with Serverless Framework

# Setup

Clone the project

<code>git clone https://github.com/javigonz/termicaDesign-api.git
</code>

Install dependencies (node v14.x is minimum requirement)

<code>npm install</code>

# Test

$ npm run invoke-getWorks
$ npm run invoke-getWorkById
$ npm run invoke-setWork

# Deploy

$ npm run deploy

Add GitHub Actions in each commit in order to deploy through Serverless Framework in AWS.