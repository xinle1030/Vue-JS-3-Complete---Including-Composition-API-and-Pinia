<!-- put elements to show in the page in the template html tags -->
<!-- Use this keyword in html part to access data properties -->
<template>

  <!-- pass win_count and lose_count props to ScoreBoard component -->
  <ScoreBoard :win_count="this.win_count" :lose_count="this.lose_count"/>

    <!-- display the section when the question has been loaded from API -->
    <template v-if="this.question">
      <!-- use v-html to parse the html result into plain text -->
      <h1 v-html="this.question">
      </h1>

      <!-- the radio button options required v-bind:key directive for efficiency-->
      <!-- iterate with element and index in for loop to use index as key -->
      <!-- make the value for the option dynamic, use :value -->
      <!-- v-model: sends the selected value to a data property -->
      <template v-for="(answer, index) in this.answers" v-bind:key="index">
        <input 
          :disabled="this.answerSubmitted" 
          type="radio" name="options" 
          :value="answer" 
          v-model="this.chosen_answer">
          
        <label v-html="answer"></label><br>
      </template>

      <button v-if="!this.answerSubmitted" @click="this.submitAnswer()" class="send" type="button">Send</button>

    </template>
    
    <section class="result" v-if="this.answerSubmitted">
      <!-- if-else statement -->
      <template v-if="this.chosen_answer == this.correctAnswer">
        <h4 v-html="'&#9989; Congratulations, the answer ' + this.correctAnswer + 'is correct.'"></h4>
      </template>
      <template v-else>
        <h4 v-html="'&#10060;  I am sorry, you picked the wrong answer. The correct is ' + this.correctAnswer + '.'"></h4>
      </template>
      <button @click="this.getNewQuestion()" class="send" type="button">Next question</button>
    </section>

</template>

<script>
// script in script tag

import ScoreBoard from "./components/ScoreBoard.vue"

export default {
  name: 'App',
  components: {ScoreBoard
  },
  // data properties
  data() {
    return {
      chosen_answer: undefined,
      question: undefined,
      incorrectAnswers: [],
      correctAnswer: '',
      win_count: 0,
      lose_count: 0,
      answerSubmitted: false
    }
  },
  // computed properties: do computation on our original data properties
  computed: {
    // the computed property here is called answers (including correct and incorrect ans to form the choices)
      answers() {
        var answers = JSON.parse(JSON.stringify(this.incorrectAnswers)); // to avoid two way data binding by converting into json string and into array finally 
        
        // shuffle the array by using splice to add this.correctAnswer [3rd arg] into random position [1st arg]
        // 0 in second argument: remove no elements from the array
        answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswer);
        return answers;
      }
  },
  methods: {
    submitAnswer() {
      if (!this.chosen_answer) {
        alert('Pick one of the options');
      } else {
        this.answerSubmitted = true;
        if (this.chosen_answer == this.correctAnswer) {
          this.win_count++;
        } else {
          this.lose_count++
        }
      }
    },
    getNewQuestion() {
      this.chosen_answer = undefined;
      this.answerSubmitted = false;
      this.question = undefined;

      // do http requests
      this.axios
      .get('https://opentdb.com/api.php?amount=1&category=30')
      .then(response => (
        this.question = response.data.results[0].question,
        this.incorrectAnswers = response.data.results[0].incorrect_answers,
        this.correctAnswer = response.data.results[0].correct_answer
      ))
    }
  },
  // lifecycle hook
  created() {
  
    this.getNewQuestion();

  }
}

</script>

<style lang="scss">
// css in style tag
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

}

h1 {
  margin-top: 40px;
}

input[type='radio']{
  margin: 12px 4px;
}

button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}
</style>
