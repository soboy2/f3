from flask import Flask, render_template, jsonify
from pymongo import MongoClient
import sys
import json
from bson import json_util
from bson.json_util import dumps

client = MongoClient('mongodb://localhost:27017/')
db = client.fantasypros

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("stock.html")

@app.route("/topz")
def top_players():
        json_players = []
        mean = '12'
        position =  'RB'
        projection = {"_id": 0, "coeff_var": 1, "mean": 1, "name": 1}
        query = {"position": position, "mean":{"$gte": mean}, "coeff_var":{"$lte": "0.60"}}
        players = db.players.find(query, projection).sort([("coeff_var", 1)]).limit(20)

        for player in players:
            if float(player["mean"]) > float(mean):
                json_players.append(player)
        json_players = json.dumps(json_players, default=json_util.default)
        print(json_players)
        return json_players

# @app.route("/topz/pos/<str:player_pos>", methods=['GET'])
# def top_players(player_pos):
#         mean = '12'
#         pos =  player_pos
#         projection = {"_id": 0, "coeff_var": 1, "mean": 1, "name": 1}
#         query = {"position": position, "mean":{"$gte": mean}, "coeff_var":{"$lte": "0.50"}}
#         players = db.players.find(query, projection).sort([("coeff_var", 1)]).limit(15)
#         return players


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
