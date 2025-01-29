## About The Project:
This project implements an automated process for testing a self-made, simple application using GitLab CI/CD 🚀, including its deployment on Google Kubernetes Engine 🛠️ and running E2E and API tests 🧪.

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

4. Create your cluster on Google Kubernetes Engine:
    ```
    gcloud container clusters create CLUSTER_NAME --region REGION_NAME
    ```

5. Enable the Container Registry API:
    ```
    gcloud services enable containerregistry.googleapis.com
    ```

6. Generate a static external IP on Google Cloud:
    ```
    gcloud compute addresses create YOUR_IP_NAME --region REGION_NAME
    ```

7. Obtain a key for a service account with permissions to push images to GCR. The easiest way is via the GUI:
    ```
    IAM & Admin -> Service Accounts
    ```

8. In your GitLab project, create an environment variable `GCLOUD_SERVICE_KEY` to keep it secure:
    ```
    Settings > CI/CD -> Variables
    ```

9. Update the `.gitlab-ci.yml` variables:
    ```
    GCP_PROJECT_ID
    GCP_REGION
    GCP_CLUSTER_NAME
    ```

10. Replace the project ID in:
    ```
    /app/_deployment/api/deployment.yaml
    /app/_deployment/gui/deployment.yaml
    ```

11. Change the `baseUrl` in the API tests `tests/api/src/services/path-service.ts` to `YOUR_APP_STATIC_IP/api`

12. Change the `baseUrl` in the E2E tests `tests/e2e/config.ts` to `YOUR_APP_STATIC_IP`

13. Set up the connection to the MongoDB database in `app/api/server.js`.

## How to Run:

Once the setup is completed, all you have to do is:

1. To build and deploy the app, trigger the pipeline with the variable `DEPLOY_TEST_INSTALLATION=true`.

2. To run API tests, trigger the pipeline with the variable `RUN_API_TESTS=true`.

3. To run E2E tests, trigger the pipeline with the variable `RUN_E2E_TESTS=true`.
