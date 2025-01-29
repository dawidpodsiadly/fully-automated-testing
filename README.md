## About The Project:
This project implements an automated process for testing a self-made, simple application using GitLab CI/CD 🚀, including its deployment on Google Kubernetes Engine (GKE) 🛠️ and running E2E and API tests 🧪.

## Technologies:
### App:
- React.js ⚛️
- Node.js 🟩
- MongoDB 🍃
- Express 🚀

### Deployment:
- Google Kubernetes Engine (GKE) 🌐 – Kubernetes cluster hosting
- GitLab CI/CD 🔄 – automation of build and deployment processes
- Kubernetes (K8s) 🔧 – container management

### Tests:
- Playwright (E2E) 🎬
- Supertest + Jest (API) 🧪

## How to Setup:

1. Log in to Google Cloud:
   gcloud auth login  
   gcloud projects create my-unique-project-id --name="example-project"

2. Clone the repository:  
   git clone https://github.com/dawidpodsiadly/app-testing.git

3. Set up the connection to the MongoDB database in app/api/server.js.
   (Edit this file accordingly using your preferred text editor)

4. Create your cluster on GKE:  
   gcloud projects list  
   gcloud config set project PROJECT_ID  
   gcloud container clusters create your-cluster-name --region your-region

5. Enable the Container Registry API:  
   gcloud services enable containerregistry.googleapis.com

6. Generate a static external IP on Google Cloud:  
   gcloud compute addresses create your-ip-name --region your-region

7. Obtain a key for a service account with permissions to push images to GCR:
   (Use Google Cloud Console to create a service account and download the key)

8. In your GitLab project, create an environment variable to keep it secure:
   (Use GitLab UI for this step)
   Variable name: GCLOUD_SERVICE_KEY
   Value: contents of the service account key file

9. Update the .gitlab-ci.yml file:
   (Update the following variables to match your configuration)
   GCP_PROJECT_ID
   GCP_REGION
   GCP_CLUSTER_NAME

10. Replace the project ID in:
    /app/_deployment/api/deployment.yaml
    /app/_deployment/gui/deployment.yaml

11. In GitLab, trigger the pipeline with the variable DEPLOY_TEST_INSTALLATION = true.

12. Change the baseUrl in the API tests:
    In tests/api/src/services/path-service.ts, set baseUrl to APP_STATIC_IP/api.

13. Change the baseUrl in the E2E tests:
    In tests/e2e/config.ts, set baseUrl to APP_STATIC_IP.

## How to Run:

Once the setup is completed, ensure that you configure the necessary GitLab environment variables before running tests:

1. To build and deploy the app, trigger the pipeline with the variable BUILD_APP = true.

2. To run API tests, trigger the pipeline with the variable RUN_API_TESTS = true.

3. To run E2E tests, trigger the pipeline with the variable RUN_E2E_TESTS = true.