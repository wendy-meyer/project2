from app import db


class Votes(db.Model):
    """Model for the voting table"""
    __tablename__ = 'US_Presidents_data'

    rowid = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer())
    state = db.Column(db.String())
    party = db.Column(db.String())
    candidate = db.Column(db.String())
    writein = db.Column(db.String())
    candidatevotes = db.Column(db.Integer())
    totalvotes = db.Column(db.Integer())

    def __init__(self, year=None, state=None, party=None, candidate=None, writein=None, candidatevotes=None, totalvotes=None):
        self.year = year
        self.state = state
        self.party = party
        self.candidate = candidate
        self.writein = writein
        self.candidatevotes = candidatevotes
        self.totalvotes = totalvotes