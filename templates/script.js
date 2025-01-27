document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Initialize scores
    let techScore = 0;
    let businessScore = 0;
    let healthcareScore = 0;
    let creativeScore = 0;

    // Loop through all 20 questions
    for (let i = 1; i <= 20; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            if (answer.value === 'a') techScore++;
            else if (answer.value === 'b') businessScore++;
            else if (answer.value === 'c') healthcareScore++;
            else if (answer.value === 'd') creativeScore++;
        }
    }

    // Determine career suggestions
    let suggestions = [];
    if (techScore > Math.max(businessScore, healthcareScore, creativeScore)) {
        suggestions = ["Software Developer", "Data Scientist", "Cybersecurity Expert"];
    } else if (businessScore > Math.max(techScore, healthcareScore, creativeScore)) {
        suggestions = ["Business Analyst", "Entrepreneur", "Marketing Manager"];
    } else if (healthcareScore > Math.max(techScore, businessScore, creativeScore)) {
        suggestions = ["Doctor", "Nurse", "Healthcare Administrator"];
    } else if (creativeScore > Math.max(techScore, businessScore, healthcareScore)) {
        suggestions = ["Graphic Designer", "Writer", "Artist"];
    } else {
        suggestions = ["General career advice based on your interests"];
    }

    // Redirect to results page with suggestions
    localStorage.setItem('careerSuggestions', JSON.stringify(suggestions));
    window.location.href = 'result.html';
});
