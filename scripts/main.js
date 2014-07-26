require(['user_state','user_interface'], function(UserState, UserInterface) {
    var state = new UserState();
    console.log(state.get_alpha());
    UserInterface.init(state);
});

