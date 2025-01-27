apk update && apk add --no-cache curl bash python3 py3-pip
curl -sSL https://sdk.cloud.google.com | bash
source /root/google-cloud-sdk/path.bash.inc
export PATH=$PATH:/root/google-cloud-sdk/bin
echo "Logging in to Google Cloud"
echo $GCLOUD_SERVICE_KEY | base64 -d > ${CI_PROJECT_DIR}/gcloud-key.json
gcloud auth activate-service-account --key-file=${CI_PROJECT_DIR}/gcloud-key.json
gcloud config set project $GCP_PROJECT_ID
gcloud auth configure-docker $GCR_REGISTRY
