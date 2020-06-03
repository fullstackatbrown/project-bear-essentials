# README

## Deployment

gcloud builds submit --tag gcr.io/fsab-brown-essentials/api
gcloud beta run deploy --image gcr.io/fsab-brown-essentials/api
