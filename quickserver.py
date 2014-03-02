from flask import Flask, request, app
import flask
import json
import csv
app = Flask(__name__)

@app.route("/", methods=['POST'])
def post_data():
	if not 'data' in flask.g:
		flask.g = {"theRep": 0, "data": {}}

	obj = json.loads(request.form.get('data', ''))

	theRep = flask.g["theRep"]

	if "begin_rep" in obj:
		theRep += 1
		flask.g["theRep"] = theRep
		flask.g["data"][theRep] = []
		if theRep != 1:
			flask.g["data"][theRep - 1] = flask.g["data"][theRep - 1][5:-10]
			print "New Rep"
		return ''

	for x in obj:
		flask.g["data"][theRep].append(json.dumps(x))

	return ''

@app.route("/view")
def view_data():
	if not 'data' in flask.g:
		flask.g = {"theRep": 0, "data": {}}
	out = ""
	for x, v in flask.g["data"].iteritems():
		for d in v:
			out += str(x) + ":" + d + "<br/>"
	return out

@app.route("/write")
def write_data():
	with open('eggs.csv', 'wb') as csvfile:
		outputWriter = csv.writer(csvfile, quotechar='|', quoting=csv.QUOTE_MINIMAL)
		for repNum, data in flask.g["data"].iteritems():
			for accel in data:
				obj = json.loads(accel)
				outputWriter.writerow([obj["x"], obj["y"], obj["z"], obj["time"], repNum])
	return 'success'

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
