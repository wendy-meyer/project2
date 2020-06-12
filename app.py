# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import json
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from config import sql_user
from config import sql_pw

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
db = SQLAlchemy()

#################################################
# Database Setup
#################################################
POSTGRES = {
    'user': sql_user,
    'pw': sql_pw,
    'db': 'dd7eb7i2vanv98',
    'host': 'ec2-52-87-135-240.compute-1.amazonaws.com',
    'port': '5432',
}


app.config['DEBUG'] = True
db_uri = 'postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

#################################################
# Flask Routes
#################################################


# create route that renders index.html template
@app.route("/")
def home():
    from models import Votes
    curState = "Alabama"
    results = db.session.query(Votes).distinct(Votes.state)
    states = []
    for r in results:
        states.append(r.state)
    return render_template("index.html", states=states, curState=curState)

#data fetching route
@app.route("/getStateData/<curState>/<year>", methods=['GET','POST'])
def getStateData(curState,year):
    from models import Votes
    stateQuery = db.session.query(Votes).filter(Votes.state==curState, Votes.year==int(year)).all()
    stateData = []
    for r in stateQuery:
        stateDict = {
            'state': r.state,
            'party': r.party,
            'candidate': r.candidate,
            'candidatevotes': r.candidatevotes
        }
        stateData.append(stateDict)
    countsQuery = db.session.query(Votes).filter(Votes.state==curState).distinct(Votes.totalvotes)
    for r in countsQuery:
        countDict = {
            "countYear": r.year,
            "countTotal": r.totalvotes
        }
        stateData.append(countDict)
    return jsonify(stateData)

if __name__ == "__main__":
    app.run()
