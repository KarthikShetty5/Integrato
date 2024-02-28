from flask import Flask
from werkzeug.urls import quote

app = Flask(__name__)

@app.route('/hello')
def hello_world():
	return 'Hello World'

if __name__ == '__main__':
	app.run()
