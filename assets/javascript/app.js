$(document).ready(function () {

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

// Properties
var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    questions: {
        q1: 'Which iconic band released the hit song "Bohemian Rhapsody" in 1975?',
        q2: 'What 1980s song performed by "Rick Astley" has been used as a meme for videos, known as a "Rick Roll?',
        q3: 'Which of the following people were NOT in the 1990s boy-band "NSYNC"?',
        q4: 'Name the song performed by Usher, Lil Jon, and Ludacris that topped the charts of the 2000s.',
        q5: 'This song became the first YouTube video to reach one billion views.'
    },
    options: {
        q1: ['The Beatles', 'The Who', 'Queen', 'Pink Floyd'],
        q2: ['Eye of the Tiger', 'Never Gonna Give You Up', 'Take On Me', 'Africa'],
        q3: ['Justin Timberlake', 'Lance Bass', 'Chris Kirkpatrick', 'AJ McLean'],
        q4: ['Yeah', 'Nope', 'Sexy Back', 'In Da Club'],
        q5: ['Baby', 'Uptown Funk', 'See You Again', 'Gangnam Style']
    },
    answers: {
        q1: 'Queen',
        q2: 'Never Gonna Give You Up',
        q3: 'AJ McLean',
        q4: 'Yeah',
        q5: 'Gangnam Style'
    },

    //Method
    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // Show the Game
        $('#game').show();

        //  Empty Last Results
        $('#results').html('');
        $('#question').html('');

        // Timer
        $('#timer').text(trivia.timer);

        // Hide Start Btn
        $('#start').hide();

        $('#remaining-time').show();

        // 1st Question
        trivia.nextQuestion();

    },
    // Loops questions and options
    nextQuestion: function () {

        // 20 Second Timer
        trivia.timer = 20;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // Array of Options
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        } else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        } else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unanswered: ' + trivia.unanswered + '</p>' +
                    '<p>Play Again!</p>');

            // Hide Game Section
            $('#game').hide();

            // Show start button to REset game
            $('#start').show();
        }

    },

    guessChecker: function () {

        var resultId;

        // Correct Answer
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        } else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },
    // Removes previous Question
    guessResult: function () {

        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();

        // Next Question
        trivia.nextQuestion();

    }

}