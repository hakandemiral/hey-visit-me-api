const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (loginString) => {
    const isEmail = emailPattern.test(loginString.toString().toLowerCase());

    if (isEmail) {
        return { email: loginString };
    }

    return { profile: { userName: loginString } };
};
