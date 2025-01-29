# Description:
Projekt ten realizuje zautomatyzowany proces testowania własnej aplikacji za pomocą GitLab CI/CD, obejmujący jej wdrożenie na Google Kubernetes Engine (GKE) oraz uruchamianie testów E2E i API.

# Technologies:
## App:
- React.js
- Node.js
- MongoDB
- Express

## Deployment:
- Google Kubernetes Engine (GKE) – hosting klastra Kubernetes
- GitLab CI/CD – automatyzacja procesu budowania i wdrażania
- Kubernetes (K8s) – zarządzanie kontenerami

## Tests:
- Playwright (E2E)
- Supertest + Jest (API)

# How to run:
1. Pobierz repozytorium:
   git clone https://github.com/dawidpodsiadly/app-testing.git

2. Ustaw połączenie do bazy danych MongoDB (https://www.mongodb.com/) w `app/api/server.js`.

3. Stwórz swój cluster na GKE:
   - Przejdź do **Kubernetes engine** -> **Clusters**.

4. Włącz Container Registry API:
   - Przejdź do **APIs & Services** -> **Enable APIs & Services**.

5. Wygeneruj stały zewnętrzny adres IP na Google Cloud:
   gcloud compute addresses create YOUR_IP_NAME --region YOUR_REGION

6. Pobierz klucz dla konta serwisowego z uprawnieniami do pushowania obrazów do GCR:
   - Przejdź do **IAM & Admin** -> **Service Accounts**.

7. W swoim projekcie na Gitlab utwórz zmienną środowiskową poprzez GUI:
   - **Settings** > **CI/CD** -> **Variables**.
   - Utwórz zmienną `GCLOUD_SERVICE_KEY`, aby była bezpieczna.

8. W pliku `.gitlab-ci.yml` zaaktualizuj zmienne `GCP_PROJECT_ID`, `GCP_REGION`, `GCP_CLUSTER_NAME` odpowiadające twojej konfiguracji.

9. Podmień `project ID` w:
   - `.gitlab-ci.yml`
   - `/app/_deployment/api/deployment.yaml`
   - `/app/_deployment/gui/deployment.yaml`

10. W GitLabie uruchom pipeline ze zmienną `DEPLOY_TEST_INSTALLATION = true`.

# TESTS:
1. Zmień `baseUrl` w testach API w pliku `tests/api/src/services/path-service.ts` na `APP_STATIC_IP/api`.

2. Zmień `baseUrl` w testach E2E w pliku `tests/e2e/config.ts` na `APP_STATIC_IP`.

3. W GitLabie uruchom pipeline ze zmienną `RUN_E2E_TESTS = true` dla testów E2E.

4. W GitLabie uruchom pipeline ze zmienną `RUN_API_TESTS = true` dla testów API.
