let user = {
    firstName: 'gregg',
    set fullName(value) {
        this.firstName = value;
    },
    get fullName() {
        return this.firstName;
    }
};

user.fullName = 'a';
console.log(user.fullName);
console.log(user.firstName);
