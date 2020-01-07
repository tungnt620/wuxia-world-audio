# Deploy

* Before run deploy
```
export GOOGLE_APPLICATION_CREDENTIALS="/Users/nguyentung/Downloads/google-cloud-key.json"
```

```
gcloud functions deploy bookRawDataGCSTrigger \
--region asia-east2 \
--memory 256MB \
--timeout 540s \
--runtime nodejs8 \
--trigger-resource book-raw-data \
--env-vars-file .env.yaml \
--trigger-event google.storage.object.finalize
```

* Update role who can call function:
    - ```gcloud alpha functions add-iam-policy-binding bookRawDataGCSTrigger --region=asia-east2 --member=allUsers --role=roles/cloudfunctions.invoker```

```
gcloud functions deploy chapterRawDataGCSTrigger \
--region asia-east2 \
--memory 256MB \
--timeout 540s \
--runtime nodejs8 \
--trigger-resource chapter-raw-data \
--env-vars-file .env.yaml \
--trigger-event google.storage.object.finalize
```

## text to speech endpoint
```
gcloud functions deploy convertTextToAudio \
--region asia-east2 \
--memory 256MB \
--timeout 240s \
--runtime nodejs8 \
--env-vars-file .env.yaml \
--trigger-http
```

## Try
    * Post request with content type is application/json
    * body: ```{"textContent": "Content "}```

# Utils
* get regions list
```
gcloud functions regions list
```
