<!DOCTYPE html>
<html>
    <body>
        <div id="create_quiz_container" class="container">
            <h2 class="title">Create Quiz</h2>

            <hr>
            <br>

            <h3 class="title">Quiz Name:</h3>
            <input type="text" name="quiz_name_input" id="quiz_name_input" class="text_input" required>

            <input type="text" name="hidden_counter" value="1" id="hidden_counter" hidden>
            <div id="quiz_questions_container" class="container">
                <div class="quiz_question" id="1">
                    <label class="quiz_questions_input_label"><?php echo "Question 1"?></label>
                    <input type="text" class="question_question_input">
                    <div class="quiz_question_choice_container">
                        <div class="quiz_question_choice">
                            <input type="text" class="question_choice_input">
                            <input type="button" class="remove_choice" value="delete" onclick="delete_choice(event)">
                            <input type="checkbox" class="quiz_isAnser_input 1" onchange="marking_answer(event)">
                        </div>
                        <div class="quiz_question_choice">
                            <input type="text" class="question_choice_input">
                            <input type="button" class="remove_choice" value="delete" onclick="delete_choice(event)">
                            <input type="checkbox" class="quiz_isAnser_input 1" onchange="marking_answer(event)">
                        </div>
                        <div class="quiz_question_choice">
                            <input type="text" class="question_choice_input">
                            <input type="button" class="remove_choice" value="delete" onclick="delete_choice(event)">
                            <input type ="checkbox" class="quiz_isAnser_input 1" onchange="marking_answer(event)">
                        </div>
                        <div class="quiz_question_choice">
                            <input type="text" class="question_choice_input">
                            <input type="button" class="remove_choice" value="delete" onclick="delete_choice(event)">
                            <input type="checkbox" class="quiz_isAnser_input 1" onchange="marking_answer(event)">
                        </div>
                        <input type="button" class="add_choice" value="New option" onclick="add_option(event)">
                    </div>
                    <input type="button" class="remove_question" value="delete" onclick="delete_question(event)">
                </div>
            </div>

            <div id="quiz_buttons_container" class="container">
                <input type="button" name="add_questions" value="New Question" onclick="add_question()">
                <?php
                    //Code this button to return back to the "create quiz" option from a previous page:
                ?>
                <input type="button" name="delete_quiz" value="Cancel">
                <input type="button" name="save_quiz" value="Save" onclick="form_submit()">
            </div>

            <div id="error_messages_container" class="container">
                <span id="JSON_upload_error" class="error inactive" name="JSON_upload_error"></span>
            </div>
        </div>
    </body> 
</html>