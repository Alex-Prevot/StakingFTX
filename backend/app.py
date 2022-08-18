from waitress import serve
from flask import Flask, make_response, request
from flask_cors import CORS, cross_origin
import apitest
import json

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/', methods=["POST"])
@cross_origin(supports_credentials=True)
def amount():
    data = request.get_data()
    price = apitest.Parsing(int(data))
    price.calculateFormulaProfit()
    return make_response(price.allElement, 200)


@app.route('/stake', methods=["POST"])
@cross_origin(supports_credentials=True)
def stake():
    data = request.get_json(force=True)
    classStake = apitest.Stake().stakingPlacement(data)
    classStake = json.loads(json.dumps(classStake))
    return make_response(classStake, (200, 202)[classStake["success"] != "true"])


if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=6969)