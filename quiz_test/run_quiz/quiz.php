<div id="quiz_container">
    <div id="container" class="container">
        <?php
          //Get the quiz file out of the session header:
          //If the quiz page has been included the session header should be set with the quiz files name
          //or it will load a previous quiz (an acceptable error, no NULL errors should occur).
          //Furthermore the session should already have been initiated.
          $quiz_src = $_SESSION['quiz_source'];
          //Get the files contence
          //Don't use the reference yet as you haven't built the quiz creation tool.
          $myJSON = file_get_contents($quiz_src);
          echo "<p id='hidden_questions' hidden> " . $myJSON . "</p>";
        ?>
        <div id="questions-container" class="hide">
            <div id="question">Question</div>
            <div id="answer-buttons" class="btn-grid">
                <button class="btn">Answer1</button>
                <button class="btn">Answer2</button>
                <button class="btn">Answer3</button>
                <button class="btn">Answer4</button>
            </div>
        </div>
        <div id="controlls" class="controlls">
            <button id="start-btn" class="start-btn btn">Start</button>
            <button id="next-btn" class="next-btn btn hide">Next</button>
            <button id="show-score-btn" class="show-score-btn btn hide">Show score</button>
        </div>
    </div>
</div>