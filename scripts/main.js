requirejs.config({
    "paths": {
      "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min"
    }
});

require(['user_state','user_interface','input'], function(UserState, UserInterface,InputHandler) {
    var state = new UserState();
    console.log(state.get_alpha());
    UserInterface.init(state);
    InputHandler(state);
});

