var Weeknd = React.createClass({
    render: function() {
        return (
          <div>
            <object className="body" data='assets/svg/weekndWeeknd.svg' type="image/svg+xml" ></object>
          </div>
        );
    }
});

React.render(
	<Weeknd />,
	document.getElementById('weeknd')
);