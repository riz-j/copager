import pymongo
from dotenv import dotenv_values


config = dotenv_values(".env")
DB_URI = config["DB_URI"]

client = pymongo.MongoClient(DB_URI)
db = client["copager"]



# Create an index that makes messages expire after 24 hours
# Instatiate collection object
messages = db["messages"]

# Check if index already exist
index_exist = False
messages_indexes = messages.list_indexes()
for index in messages_indexes:
    if index["name"] == "timestamp_exp":
        index_exist = True

if index_exist == False:
    # Create Index and define TTL 
    messages.create_index("timestamp", expireAfterSeconds=86400, name="timestamp_exp")

