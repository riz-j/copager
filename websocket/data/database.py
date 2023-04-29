import pymongo
from dotenv import dotenv_values

# To access the .env values, you must run this file from the root directory:
#          python3 data/database.py
config = dotenv_values(".env")
DB_URI = config["DB_URI"]

print(DB_URI)
client = pymongo.MongoClient(DB_URI)
db = client["copager"]