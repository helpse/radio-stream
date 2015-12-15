import os
import log_config
from datetime import datetime
import logging
import random
import flask
from flask import Flask, session, request, g
from flask.ext.cors import CORS
import itunes
import json
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper
from flaskext.auth import Auth, AuthUser, login_required, logout

music_dir = 'c:\Users\Vitaly\Dropbox\iTunes Media\Music'

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)

auth = Auth(app)
app.auth.user_timeout = 0
logger = logging.getLogger(__name__)

@app.before_request
def init_users():
    print "initiating users"
    admin = AuthUser(username='admin')
    admin.set_and_encrypt_password('check this auth pass')
    g.users = {'admin': admin}


# Authentication per: https://github.com/thedekel/flask-auth/blob/master/examples/no_db_persistence.py
@app.route('/access-token', methods=["POST"])
def request_access_token():
    success = g.users['admin'].authenticate(request.get_json()['password'])
    
    return flask.jsonify(success=success)


@app.route('/playlist/<name>', methods=["GET"])
def playlist(name):
    tracks = itunes.playlist_tracks(name)
    if tracks is None:
        logger.warn("unknown playlist: %s", name)
        flask.abort(404)

    tracks_json = [json.loads(track.__repr__()) for track in tracks]

    return flask.jsonify(tracks=tracks_json)


@app.route('/song/<id>/last-played', methods=["POST"])
def update_last_played(id):
    track = itunes.track_by_id(id)
    track.play_count += 1
    track.last_played = datetime.utcnow()
    logger.info("Updating track '%s' played date to: %s", track, datetime.utcnow())

    return "", 200


if __name__ == '__main__':
    app.secret_key = 'A0Zra98j/3zYaR~XHaH!jmN]LWX/,?RT'
    app.run(host='0.0.0.0', debug=True, threaded=True)
