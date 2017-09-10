# This is a simple RESTful API for face recognition
#
# It takes an image uploaded from client side and
# 1. Compute encoding of the uploaded image
# 2. Load the pre-calculated encodings of training images stored in a csv file
# 3. Compare the encoding of the uploaded image to the existing encodings
# 4. Return a JSON object containing the recognition result

import face_recognition
from flask import Flask, jsonify, request, redirect

# You can change this to any folder on your system
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET', 'POST'])
def upload_image():
    # Check if a valid image file was uploaded
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)

        file = request.files['file']

        if file.filename == '':
            return redirect(request.url)

        if file and allowed_file(file.filename):
            # The image file seems valid! Detect faces and return the result.
            return detect_faces_in_image(file)

    # If no valid image file was uploaded, show something:
    return '''
    <h2>Please upload an image using a front-end.</h2>
    '''


def detect_faces_in_image(file_stream):
    # TODO - Load pre-calculated encodings and labels of training images from a csv file
    # known_face_encodings =
    # labels =

    # Load the uploaded image file
    img = face_recognition.load_image_file(file_stream)
    # Get face encodings for any faces in the uploaded image
    unknown_face_encodings = face_recognition.face_encodings(img)

    face_found = False
    person_fullname_id = ''

    if len(unknown_face_encodings) > 0:
        face_found = True
        # Compare encoding of the uploaded image to the pre-calculated ones
        match_results = face_recognition.compare_faces(known_face_encodings, unknown_face_encodings[0])
        # Find the matched faces from the results (there maybe multiple, take the first one)
        person_fullname_id = labels[match_results.index(True)]

    # Return the result as json
    result = {
        "face_found_in_image": face_found,
        "person_fullname_id": person_fullname_id
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
