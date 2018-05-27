#coding:utf8
from flask import Flask, request, jsonify, abort, g, render_template
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from .import main
import json

class User(object):
    def __init__(self, data):
        self.id = data['id']
        self.name = data['name']
        self.age = data['age']
        self.secretkey = "wwwwww"

    def generateAuthToken(self):
        s = Serializer(self.secretkey, expires_in=60)
        return s.dumps({'id':self.id})

    @staticmethod
    def verifyAuthToken(self, token):
        s = Serializer(self.secretkey)
        # try:
        #     data = s.loads(token)
        # except S

    def toJson(self):
        return json.dumps({'id':self.id, 'name':self.name, 'age':self.age})

class DBProxy(object):
    def __init__(self, filename):
        self.filename = filename
        txtInfos = self.loadFile(filename)
        self.infos = [User(m) for m in txtInfos]

    def loadFile(self, filename):
        with open(filename, 'r', encoding='utf-8') as f:
            s = f.read()
            if s.__len__() == 0:
                return []
            return json.loads(s)

    def saveFile(self, filename, data):
        s = json.dumps(data, indent=2, ensure_ascii=False)
        with open(filename, 'w+', encoding='utf-8') as f:
            f.write(s)

    def getAll(self):
        return [m.toJson() for m in self.infos]

    def addUser(self, user):
        self.infos.append(User(user))
        data = [u.__dict__ for u in self.infos]
        self.saveFile(self.filename, data)

    def delUser(self, id):
        users = list(filter(lambda t: int(t.id) == int(id), self.infos))
        if len(users) == 0:
            return
        self.infos.remove(users[0])
        data = [u.__dict__ for u in self.infos]
        self.saveFile(self.filename, data)

    def updateUser(self, user):
        users = list(filter(lambda t: int(t.id) == int(user['id']), self.infos))
        if len(users) == 0:
            print('ERROR, %d' % int(user['id']))
            return
        print(type(users[0]))
        users[0].id = user['id']
        users[0].name = user['name']
        users[0].age = user['age']

        data = [u.__dict__ for u in self.infos]
        self.saveFile(self.filename, data)

    def getUser(self, id):
        users = list(filter(lambda t: int(t.id) == int(id), self.infos))
        if len(users) == 0:
            return
        return users[0].toJson()

    def getUserByName(self, name):
        users = list(filter(lambda t: t.name == name, self.infos))
        if len(users) == 0:
            return None
        return users[0]

db = DBProxy('./db.txt')
app = Flask(__name__)
########################
auth = HTTPBasicAuth()
@auth.verify_password
def verify_password(username, password):
    user = db.getUserByName(username)
    if user is None:
        return False
    g.user = user
    return True
########################
@main.route('/')
def index():
    return render_template("index.html")

@main.route('/users/', methods=['GET'])
#@auth.login_required
def getAllUser():
    datas = db.getAll()
    return jsonify({'ret':'success', 'data':datas})

#add
@main.route('/user/', methods=['POST'])
def addUser():
    print('addUser')
    user = {
        'id': request.json['id'],
        'name': request.json['name'],
        'age': request.json['age'],
    }
    db.addUser(user)
    return jsonify({'ret':'success', 'data':'NULL'})
#del
@main.route('/user/', methods=['DELETE'])
def delUser():
    if not request.args:
        abort(400)
    id = request.args.get('id')
    db.delUser(id)
    return jsonify({'ret':'success', 'data':'NULL'})

#update
@main.route('/user/', methods=['PUT'])
def updateUser():
    if not request.args:
        abort(400)
    id = request.args.get('id')
    user = {
        'id': request.json['id'],
        'name': request.json['name'],
        'age': request.json['age']
    }
    db.updateUser(user)
    return jsonify({'ret':'success', 'data':db.getUser(id)})
#get
@main.route('/user/', methods=['GET'])
def getUser():
    if not request.args:
        abort(400)
    id = request.args.get('id')
    print("GET USER %s" % id)
    return jsonify({'ret':'success', 'data':db.getUser(id)})

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=9527, debug=True)