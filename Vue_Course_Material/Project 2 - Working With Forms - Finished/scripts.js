
members = [
    {
        fname: 'John',
        lname: 'Lennon',
        instrument: 'Acoustic Guitar'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Electric Guitar'
    }
]

const handlingForms = {

    data() {
        return {
            members: window.members,
            // store data for new member for form binding
            newMember: {

            }
        }
    },

    methods: {
        addMember: function() {
            if (!(this.newMember.instrument && this.newMember.fname && this.newMember.lname)) {
                alert("All fields must be filled")
            } else {
                this.members.push(this.newMember);
                this.newMember = {}; // reset the form to be empty for all fields
            }
        }
    }

};

Vue.createApp(handlingForms).mount('#app');
