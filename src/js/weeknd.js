var Weeknd = React.createClass({displayName: "Weeknd",
    render: function() {
        return (
          React.createElement("div", null, 
            React.createElement("object", {className: "body", data: "assets/svg/weeknd.svg", type: "image/svg+xml"})
          )
        );
    }
});

React.render(
	React.createElement(Weeknd, null),
	document.getElementById('weeknd')
);