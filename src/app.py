from flask import Flask, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../public')
CORS(app)

# የዳታቤዝ አድራሻ
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'university.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# የ SQL ሰንጠረዥ መዋቅር
class Student(db.Model):
    id = db.Column(db.String(20), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    library = db.Column(db.String(20), default="Pending")
    cafe = db.Column(db.String(20), default="Pending")

# ዋናውን ገጽ ለመክፈት
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'student_id.html')

# ተማሪ ለመፈለግ
@app.route('/status/<student_id>')
def get_status(student_id):
    student = Student.query.get(student_id)
    if student:
        return jsonify({
            "name": student.name,
            "library": student.library,
            "cafe": student.cafe
        })
    return jsonify({"error": "ተማሪው አልተገኘም"}), 404

# 1. አዲስ ተማሪ ለመመዝገብ (Create)
@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    if Student.query.get(data['id']):
        return jsonify({"error": "ይህ መታወቂያ ቀድሞ ተመዝግቧል!"}), 400
    
    new_student = Student(id=data['id'], name=data['name'])
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": f"ተማሪ {data['name']} በ SQL ተመዝግቧል!"})

# 2. የዕዳ ሁኔታን ለመቀየር (Update)
@app.route('/update_status', methods=['POST'])
def update_status():
    data = request.json
    student = Student.query.get(data['id'])
    if student:
        student.library = "Cleared" # እዚህ ጋር እንደፈለግክ መቀየር ትችላለህ
        student.cafe = "Cleared"
        db.session.commit()
        return jsonify({"message": f"የተማሪ {student.name} ዕዳ ተሰርዟል!"})
    return jsonify({"error": "ተማሪው አልተገኘም!"}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # ዳታቤዙን ይፈጥራል
    app.run(debug=True, port=3000)