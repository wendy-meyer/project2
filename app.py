# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
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
    'db': 'voting_db',
    'host': 'localhost',
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
    results = db.session.query(Votes).distinct()
    states = []
    for r in results:
        states.append(r.state)
    return render_template("index.html", states=states)

if __name__ == "__main__":
    app.run()
