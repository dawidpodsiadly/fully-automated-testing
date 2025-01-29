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

1. Clone the repository:
    ```
    git clone https://github.com/dawidpodsiadly/app-testing.git
    ```

2. Log in to Google Cloud:
    ```
    gcloud auth login
    ```

3. Create a project on Google Cloud:
    ```
    gcloud projects create PROJECT_ID --name="PROJECT_NAME"
    gcloud config set project PROJECT_ID
    ```

4. Create your cluster on GKE:
    ```
    gcloud container clusters create CLUSTER_NAME --region REGION_NAME
    ```

5. Enable the Container Registry API:
    ```
    gcloud services enable containerregistry.googleapis.com
    ```

6. Generate a static external IP on Google Cloud:
    ```
    gcloud compute addresses create your-ip-name --region your-region
    ```

7. Obtain a key for a service account with permissions to push images to Google Container Registry (GCR). You can do this easily through the Google Cloud Console:
    - Go to **IAM & Admin → Service Accounts** and create a new service account with appropriate permissions for GCR access.

8. In your GitLab project, create an environment variable `GCLOUD_SERVICE_KEY` to securely store your service account key:
    - Navigate to **Settings → CI/CD → Variables** and add a new variable with the key `GCLOUD_SERVICE_KEY` and the value being your service account key.

9. Configure GitLab CI/CD pipeline variables in your `.gitlab-ci.yml` file:
    - Set the following variables in the file `GCP_PROJECT_ID`, `GCP_REGION`, `GCP_CLUSTER_NAME`.

10. Update the project ID in the deployment YAML files:
    - In `/app/_deployment/api/deployment.yaml` and `/app/_deployment/gui/deployment.yaml`, replace the project ID with your actual `PROJECT_ID`.

11. Update the `baseUrl` for API tests:
    - In `tests/api/src/services/path-service.ts` to `YOUR_APP_STATIC_IP/api`.

12. Update the `baseUrl` for E2E tests:
    - In `tests/e2e/config.ts` to `YOUR_APP_STATIC_IP`.

13. Configure the MongoDB connection in `app/api/server.js` to your database.

## How to Run:

Once the setup is completed, all you have to do is:

1. To build and deploy the app, trigger the pipeline with the variable `DEPLOY_TEST_INSTALLATION=true`.

2. To run API tests, trigger the pipeline with the variable `RUN_API_TESTS=true`.

3. To run E2E tests, trigger the pipeline with the variable `RUN_E2E_TESTS=true`.
