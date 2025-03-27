from flask import Flask, render_template, jsonify
import random
import time

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def get_data():
    # Simulated AI trading signals with better logic
    price = round(random.uniform(42000, 46000), 2)  # More realistic BTC range
    accuracy = round(random.uniform(78, 95), 2)  # AI confidence level
    action = generate_trading_signal()
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

    return jsonify({"price": price, "accuracy": accuracy, "action": action, "time": timestamp})

def generate_trading_signal():
    """Generates a trading action based on probability."""
    probabilities = {"BUY": 0.4, "SELL": 0.4, "HOLD": 0.2}  # Adjusted for better simulation
    return random.choices(list(probabilities.keys()), weights=probabilities.values())[0]

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
