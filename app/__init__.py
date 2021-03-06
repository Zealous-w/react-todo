#coding:utf8

from flask import Flask

def createApp():
    app = Flask(__name__)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint, url_prefix='/main')
    return app

