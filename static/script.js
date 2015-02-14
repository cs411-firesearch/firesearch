/**
 * @jsx React.DOM
 */

(function(){

  var App = React.createClass({
    componentWillMount: function() {
      page(
        '/',
        function() {
          this._fetchUsers();
        }.bind(this)
      );

      page(
        '/:userID',
        function(context){
          this._fetchUser(context.params.userID)
        }.bind(this)
      );

      page.start();
    },

    componentWillUnmount: function () {
      page.stop();
    },

    getInitialState: function() {
      return {
        route: 'users',
        users: null,
        userID: null,
        userName: null
      };
    },

    _fetchUsers: function() {
      xhr('GET', '/api/users')
        .success(function(users) {
          this.setState({route: 'users', users: users, userID: null, userName: null});
        }.bind(this));
    },

    _fetchUser: function(userID) {
      xhr('GET', '/api/users/' + userID)
        .success(function(user) {
          this.setState({route: 'user', users: null, userID: userID, userName: user.name});
        }.bind(this));
    },

    render: function() {
      switch (this.state.route) {
        case 'users':
          return <Users users={this.state.users} />;
          break;
        
        case 'user':
          return (
            <div>
              <User userID={this.state.userID} name={this.state.userName} />
              <br />
              <a href="/">&laquo; Back</a>
            </div>
          );
      }
    }
  });

  var User = React.createClass({
    render: function() {
      return <a href={"/" + this.props.userID}>{this.props.name}</a>;
    }
  });

  var Users = React.createClass({
    _renderUser: function(id, user) {
      return <li key={id}><User userID={id} name={user.name} /></li>;
    },

    render: function() {
      var users = this.props.users;

      if (!users) {
        return <div />;
      }

      return (
        <div>
          {Object.keys(users).map(function(userID) {
            return this._renderUser(userID, users[userID]);
          }.bind(this))}
        </div>
      );
    }
  });

  React.renderComponent(
    <App />,
    document.getElementById('app')
  );
})();










