# Quiz-creation-display-tool

Quiz-create-display-tool: Web code to implement a quiz creation tool, to take in user input and then "store" the quiz into a JSON file.

Quizes can also be completed and displayed with the other part of the project in the "run_quiz" folder


![image](https://user-images.githubusercontent.com/87393875/206874755-cb4d6175-989e-45b4-a09b-ded1aabe9e74.png)

- This is the quiz creation page - here users can input questions they want to be stored and the options they wan't the people taking the quiz to be presented with.
- The tick boxes on the right hand side are used to determine which options are correct or not.

  
<br>
<br>
<br>
  
    
The result of saving this quiz will all inputs correctly filled out will be a JSON file similar to this one:

![image](https://user-images.githubusercontent.com/87393875/206874832-00d57c96-360a-4582-99b0-9a72e6531301.png)

- This information stored in this file will be used by the quiz_run tool to display the quiz and allow the user to interact with it

  
<br>
<br>
<br>
  

This is what it looks like when the quiz_run tool display the quiz:

![image](https://user-images.githubusercontent.com/87393875/206875189-b9ab97f3-ea2f-4eb6-9ce4-8be46a8ad17b.png)

- From here the user can pick one of two options (James or Josh), as show in the JSON file both answers are set to correct
- Therefore they will both return the same thing:
  - ![image](https://user-images.githubusercontent.com/87393875/206875261-06161158-518c-4178-9974-ce0e0567b438.png)
  - the tool is only set to recieve once answer so no matter what JSON you put in (even if the answer is set to correct) it will <br> return the first one that it finds.




