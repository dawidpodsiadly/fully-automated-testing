# Description:
This project implements an automated process for testing a self-made, simple application using GitLab CI/CD, including its deployment on Google Kubernetes Engine (GKE) and running E2E and API tests.

# Technologies:
## App:
- React.js
- Node.js
- MongoDB
- Express

## Deployment:
- Google Kubernetes Engine (GKE) – Kubernetes cluster hosting
- GitLab CI/CD – automation of build and deployment processes
- Kubernetes (K8s) – container management

## Tests:
- Playwright (E2E)
- Supertest + Jest (API)

# How to run:
1. Clone the repository `git clone https://github.com/dawidpodsiadly/app-testing.git`

2. Set up the connection to the [MongoDB](https://www.mongodb.com/) database in `app/api/server.js`.

3. Create your cluster on GKE (**Kubernetes engine** -> **Clusters**)

4. Enable the Container Registry API (**APIs & Services** -> **Enable APIs & Services**)

5. Generate a static external IP on Google Cloud (**VPC Network** -> **IP addresses**)

6. Obtain a key for a service account with permissions to push images to GCR (**IAM & Admin** -> **Service Accounts**)

7. In your GitLab project, create an environment variable via the GUI to keep it secure (**Settings** > **CI/CD** -> **Variables**)

8. In the `.gitlab-ci.yml` file, update the variables `GCP_PROJECT_ID`, `GCP_REGION`, `GCP_CLUSTER_NAME` to match your configuration.

9. Replace the `project ID` in:
   - `.gitlab-ci.yml`
   - `/app/_deployment/api/deployment.yaml`
   - `/app/_deployment/gui/deployment.yaml`

10. In GitLab, trigger the pipeline with the variable `DEPLOY_TEST_INSTALLATION = true`.

# TESTS:
1. Change the `baseUrl` in the API tests in `tests/api/src/services/path-service.ts` to `APP_STATIC_IP/api`.

2. Change the `baseUrl` in the E2E tests in `tests/e2e/config.ts` to `APP_STATIC_IP`.

3. In GitLab, trigger the pipeline with the variable `RUN_E2E_TESTS = true` for E2E tests.

4. In GitLab, trigger the pipeline with the variable `RUN_API_TESTS = true` for API tests.
