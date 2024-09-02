from flask import Flask, render_template, jsonify
import time

app = Flask(__name__)

start_time = 0
elapsed_time = 0
is_running = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start', methods=['POST'])
def start():
    global start_time, is_running, elapsed_time
    if not is_running:
        start_time = time.time() - elapsed_time
        is_running = True
    return jsonify({"time": format_time(elapsed_time), "is_running": is_running})

@app.route('/stop', methods=['POST'])
def stop():
    global elapsed_time, is_running
    if is_running:
        elapsed_time = time.time() - start_time
        is_running = False
    return jsonify({"time": format_time(elapsed_time), "is_running": is_running})

@app.route('/pause', methods=['POST'])
def pause():
    global elapsed_time, is_running
    if is_running:
        elapsed_time = time.time() - start_time
        is_running = False
    return jsonify({"time": format_time(elapsed_time), "is_running": is_running})

@app.route('/resume', methods=['POST'])
def resume():
    global start_time, is_running
    if not is_running:
        start_time = time.time() - elapsed_time
        is_running = True
    return jsonify({"time": format_time(elapsed_time), "is_running": is_running})

@app.route('/reset', methods=['POST'])
def reset():
    global start_time, elapsed_time, is_running
    start_time = 0
    elapsed_time = 0
    is_running = False
    return jsonify({"time": format_time(elapsed_time), "is_running": is_running})

@app.route('/time', methods=['GET'])
def get_time():
    global elapsed_time
    if is_running:
        elapsed_time = time.time() - start_time
    return jsonify({"time": format_time(elapsed_time), "is_running": is_running})

def format_time(seconds):
    minutes, seconds = divmod(int(seconds), 60)
    hours, minutes = divmod(minutes, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

if __name__ == '__main__':
    app.run(debug=True)