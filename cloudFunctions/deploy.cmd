gcloud functions deploy bookRawDataGCSTrigger \
--region asia-east2 \
--memory 256MB \
--timeout 10s \
--runtime nodejs8 \
--trigger-resource book-raw-data \
--env-vars-file .env.yaml \
--trigger-event google.storage.object.finalize

gcloud functions deploy chapterRawDataGCSTrigger \
--region asia-east2 \
--memory 256MB \
--timeout 540s \
--runtime nodejs8 \
--trigger-resource chapter-raw-data \
--env-vars-file .env.yaml \
--trigger-event google.storage.object.finalize
