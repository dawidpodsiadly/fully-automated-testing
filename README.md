# About the Project:
This project implements an automated process for testing a self-made, simple application using GitLab CI/CD 🚀, including its deployment on Google Kubernetes Engine (GKE) 🛠️ and running E2E and API tests 🧪.

# Technologies:
## App:
- React.js ⚛️
- Node.js 🟩
- MongoDB 🍃
- Express 🚀

## Deployment:
- Google Kubernetes Engine (GKE) 🌐 – Kubernetes cluster hosting
- GitLab CI/CD 🔄 – automation of build and deployment processes
- Kubernetes (K8s) 🔧 – container management

## Tests:
- Playwright (E2E) 🎬
- Supertest + Jest (API) 🧪

# How to Setup:

### 1. Log in to Google Cloud:
Before you can use Google Cloud resources, you need to authenticate your session. Use the following command to log in via the terminal:  
`gcloud auth login`  
Alternatively, you can log in through the Google Cloud Console UI by visiting: [Google Cloud Console Login](https://console.cloud.google.com)

### 2. Clone the repository:  
`git clone https://github.com/dawidpodsiadly/app-testing.git`

### 3. Set up the connection to the [MongoDB](https://www.mongodb.com/) database in `app/api/server.js`.

### 4. Create your cluster on GKE:  
- **GUI**: Navigate to **Kubernetes engine** -> **Clusters** in Google Cloud Console, and follow the steps to create a new cluster.  
- **Terminal**: Run the following command to create a cluster (replace `your-cluster-name` and `your-region`):  
  `gcloud container clusters create your-cluster-name --region your-region`

### 5. Enable the Container Registry API:  
- **GUI**: Go to **APIs & Services** -> **Enable APIs & Services** in Google Cloud Console, search for `Container Registry API` and enable it.  
- **Terminal**: Run the following command to enable the API:  
  `gcloud services enable containerregistry.googleapis.com`

### 6. Generate a static external IP on Google Cloud:  
- **GUI**: Navigate to **VPC Network** -> **IP addresses** in Google Cloud Console, and click on **Reserve a static address**.  
- **Terminal**: Run the following command to create a static IP (replace `your-ip-name` and `your-region`):  
  `gcloud compute addresses create your-ip-name --region your-region`

### 7. Obtain a key for a service account with permissions to push images to GCR:  
- **GUI**: Navigate to **IAM & Admin** -> **Service Accounts** in Google Cloud Console, create a service account with the necessary permissions, and download the key.  
- **Terminal**: Run the following command to create and download the key for the service account (replace `your-service-account` and `your-project-id`):  
  `gcloud iam service-accounts keys create ~/key.json --iam-account=your-service-account@your-project-id.iam.gserviceaccount.com`

### 8. In your GitLab project, create an environment variable via the GUI to keep it secure:  
- **GUI**: **Settings** > **CI/CD** -> **Variables**  
  Create a variable `GCLOUD_SERVICE_KEY`, and paste the contents of the service account key file.

### 9. In the `.gitlab-ci.yml` file, update the variables `GCP_PROJECT_ID`, `GCP_REGION`, `GCP_CLUSTER_NAME` to match your configuration.

### 10. Replace the `project ID` in:  
- `/app/_deployment/api/deployment.yaml`  
- `/app/_deployment/gui/deployment.yaml`

### 11. In GitLab, trigger the pipeline with the variable `DEPLOY_TEST_INSTALLATION = true`.

### 12. Change the `baseUrl` in the API tests in `tests/api/src/services/path-service.ts` to `APP_STATIC_IP/api`.

### 13. Change the `baseUrl` in the E2E tests in `tests/e2e/config.ts` to `APP_STATIC_IP`.

# How to Run:

Once the setup is completed, ensure that you configure the necessary GitLab environment variables before running tests:

### 1. To build and deploy the app, trigger the pipeline with the variable `BUILD_APP = true`.

### 2. To run API tests, trigger the pipeline with the variable `RUN_API_TESTS = true`.

### 3. To run E2E tests, trigger the pipeline with the variable `RUN_E2E_TESTS = true`.
