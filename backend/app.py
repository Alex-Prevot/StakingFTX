from flask import Flask, make_response, request
from flask_cors import CORS, cross_origin
import apitest

app = Flask(__name__)

CORS(app, supports_credentials=True)

@app.route('/amount', methods=["POST"])
@cross_origin(supports_credentials=True)
def amount():
    data = request.get_data()
    price = apitest.Parsing(int(data))
    price.calculateFormulaProfit()
    print(price.allElement)
    return make_response(price.allElement, 200)

if __name__ == "__main__":
    app.run("localhost", 6969)
