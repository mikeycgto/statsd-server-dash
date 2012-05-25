// set Accept header to JSON
$.ajaxSetup({
	beforeSend:function(req){
		req.setRequestHeader('Accept', 'application/json');
	}
});


$(function() {
	var graph_opts = {
		xaxis: {
			mode: 'time', timeformat: '%h:%M:%S',
			minTickSize: [10, 'second'],
		},

		lines: { show: true },
		points: { show: true },

		grid: { borderColor:'#FFF', color:'#FFF' },
		legend: { backgroundColor:'#000' }
	};
	
	$('.graph').each(function(){
		var graph = $(this);
		graph.html("Loading...");

		// TODO consider data attrs for custom views\graphs
		var path = location.href;
		var req = { dataType: 'json' };

		$.ajax(path, req).done(function(data){
			console.log(data);
			$.plot(graph, data, graph_opts);
		});
	});
});