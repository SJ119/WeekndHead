var Weeknd = React.createClass({
    render: function() {
        return (
          <div>
            <object className="body" data='assets/svg/weeknd.svg' type="image/svg+xml" ></object>
          </div>
        );
    }
});

React.render(
	<Weeknd />,
	document.getElementById('weeknd')
);