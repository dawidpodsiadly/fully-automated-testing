apk update && apk add --no-cache curl bash python3 py3-pip

# Google Cloud SDK - Install, Login, Config
curl -sSL https://sdk.cloud.google.com | bash
source /root/google-cloud-sdk/path.bash.inc
export PATH=$PATH:/root/google-cloud-sdk/bin

echo "Logging in to Google Cloud"
echo $GCLOUD_SERVICE_KEY | base64 -d > ${CI_PROJECT_DIR}/gcloud-key.json
gcloud auth activate-service-account --key-file=${CI_PROJECT_DIR}/gcloud-key.json

gcloud config set project $GCP_PROJECT_ID
gcloud auth configure-docker gcr.io

gcloud components install gke-gcloud-auth-plugin
echo "Checking if gke-gcloud-auth-plugin is installed..."
which gke-gcloud-auth-plugin

# Install kubectl
curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl"
chmod +x ./kubectl
mv ./kubectl /usr/local/bin/kubectl
