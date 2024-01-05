
const todosApp = {
    data() {
        return {
            todos: [],
            // default state of false for every newTodo
            newTodo: {
                done: false
            }
        }
    },
    methods: {
        addTodo: function() {
            if (this.newTodo.text) {
                this.todos.push(this.newTodo);

                // reset the newTodo obj
                this.newTodo = {
                    done: false
                };

                // store todos arr in local storage
                localStorage.setItem("todos", JSON.stringify(this.todos));
            } else {
                alert("To-do text is required");
            }
        }
    },

    // lifecycle hooks

    // created hook runs after the instance has been created and completed set up such as compute properties and methods
    created() {
        // retrieve todos when the instance is created
        this.todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : this.todos;
    },
    // Option1: runs whenever the app is updated, even when typing in the form field, so actually not as efficient particularly in big app
    // Option2: you can move the code to update localStorage whenever you update instead of using updated() lifecycle hook but could be messy
    updated() {
        // update local storage whenever updates are made to the app
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

}

Vue.createApp(todosApp).mount('#app');
