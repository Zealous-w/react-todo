#coding:utf8
from flask_script import Manager, Shell
from app import createApp

app = createApp()
manager = Manager(app)

if __name__ == "__main__":
    manager.run()