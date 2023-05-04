import pymongo
from dotenv import dotenv_values


config = dotenv_values(".env")
DB_URI = config["DB_URI"]

client = pymongo.MongoClient(DB_URI)
db = client["copager"]



# Create an index that makes messages expire after 24 hours
# Instatiate collection object
messages = db["messages"]

# Create Index and define TTL 
messages.create_index("timestamp", expireAfterSeconds=86400)

