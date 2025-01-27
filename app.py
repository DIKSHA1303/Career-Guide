from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('test.html')  # HTML form with questions

@app.route('/submit', methods=['POST'])
def submit():
    # Initialize scores
    tech_score = 0
    business_score = 0
    healthcare_score = 0
    creative_score = 0

    # Loop through the 20 questions
    for i in range(1, 21):
        answer = request.form.get(f'q{i}')
        if answer == 'a':
            tech_score += 1
        elif answer == 'b':
            business_score += 1
        elif answer == 'c':
            healthcare_score += 1
        elif answer == 'd':
            creative_score += 1

    # Determine career suggestions
    if tech_score > max(business_score, healthcare_score, creative_score):
        suggestions = ["Software Developer", "Data Scientist", "Cybersecurity Expert"]
    elif business_score > max(tech_score, healthcare_score, creative_score):
        suggestions = ["Business Analyst", "Entrepreneur", "Marketing Manager"]
    elif healthcare_score > max(tech_score, business_score, creative_score):
        suggestions = ["Doctor", "Nurse", "Healthcare Administrator"]
    elif creative_score > max(tech_score, business_score, healthcare_score):
        suggestions = ["Graphic Designer", "Writer", "Artist"]
    else:
        suggestions = ["General career advice based on your interests"]

    # Pass suggestions to the results page
    return render_template('result.html', suggestions=suggestions)

if __name__ == '__main__':
    app.run(debug=True)
