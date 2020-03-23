# Deploy

* Before run deploy
```
export GOOGLE_APPLICATION_CREDENTIALS="/Users/nguyentung/Downloads/google-cloud-key.json"
```

* Update role who can call function:
`gcloud alpha functions add-iam-policy-binding convertTextToAudio --region=us-central1 --member=allUsers --role=roles/cloudfunctions.invoker`

## text to speech endpoint
```
gcloud functions deploy convertTextToAudio \
--region us-central1 \
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


## TODO:
- Write http function to retry case timeout
