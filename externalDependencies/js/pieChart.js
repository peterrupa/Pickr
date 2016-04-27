google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Tags', 'Frequency'],
          ['AB-3L',     11],
          ['girl',      6],
          ['AB-2L',  3],
          ['B', 4],
          ['boy',    7]
        ]);

        var options = {
          title: 'Graded Recitation on Tree Search Algorithms',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);