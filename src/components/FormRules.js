const nameRules = [
    v => !!v || "Name is required",
    v => (v && v.length <= 20) || "Name must be less than 10 characters"
];

const passwordRules = {
    required: value => !!value || "Required.",
    min: v => (v && v.length) >= 8 || "Min 8 characters"
};

const emailRules = [
    v => !!v || "E-mail is required",
    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
];

const roleRules = {
    atLeastOneItem: selected =>
        selected.length > 0 || "At least one item should be selected"
};


export {
    nameRules,
    passwordRules,
    emailRules,
    roleRules
}