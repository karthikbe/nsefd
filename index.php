<!DOCTYPE html>
<html>
<?php
include_once 'config.php';
?>
<head>
    <meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>NSE Dashboard</title>
	<link href="./assets/images/favicon.png" rel="icon" type="image/png">
	<link rel="stylesheet" type="text/css" href="./assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/d3-charts.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/lightpick.css">
	<link rel="stylesheet" type="text/css" href="./assets/fontawesome/css/all.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/jquery.dataTables.min.css">
	
	<script type="text/javascript" src="./assets/js/jquery-3.4.1.slim.min.js"></script>
	<script type="text/javascript" src="./assets/js/popper.min.js"></script>
	<script src="./assets/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="./assets/d3/d3.min.js"></script>
	<script type="text/javascript" src="./assets/js/d3-charts.js"></script>
	<script type="text/javascript"  src="./assets/js/moment.min.js"></script>
	<script type="text/javascript"  src="./assets/js/lightpick.js"></script>
	<script type="text/javascript" src="./assets/js/sunburst-chart.js"></script>
	<script type="text/javascript" src="./assets/js/jquery.dataTables.min.js"></script>
	
	<style>
@font-face {
	font-family: "'Roboto', sans-serif";
	src: url("assets/fonts/Roboto/Roboto-Black.ttf");
	src: url("assets/fonts/Roboto/Roboto-BlackItalic.ttf");
	src: url("assets/fonts/Roboto/Roboto-Bold.ttf");
	src: url("assets/fonts/Roboto/Roboto-BoldItalic.ttf");
	src: url("assets/fonts/Roboto/Roboto-Italic.ttf");
	src: url("assets/fonts/Roboto/Roboto-Light.ttf");
	src: url("assets/fonts/Roboto/Roboto-LightItalic.ttf");
	src: url("assets/fonts/Roboto/Roboto-Medium.ttf");
	src: url("assets/fonts/Roboto/Roboto-MediumItalic.ttf");
	src: url("assets/fonts/Roboto/Roboto-Regular.ttf");
	src: url("assets/fonts/Roboto/Roboto-Thin.ttf");
	src: url("assets/fonts/Roboto/Roboto-ThinItalic.ttf");
}
body {
	font-family: 'Roboto', sans-serif;
	background: #f4f4f4;
	border: 1px solid #ccc;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.04);
}
.dr-header {
	line-height: 2.5em;
    background: white;
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.04);
}
.dr-header-title {
	color: #147dc2;
    font-weight: 500;
	padding-top: 5px;
	padding-bottom: 5px;
	font-size: 20px;
	font-weight: bold;
}
.dr-btn-profile {
	background: white;
	border: 1px solid #dcdcdc;
	color: #222222;
}
.dr-scale-08 {
	transform: scale(0.9);
}
.dr-section-main-header-title {
	color: #444;
	font-weight: bold;
}
.dr-summary-body {
	border-radius: 5px;
    min-height: 350px;
}
.dr-summary-div {
	border-right: 1px solid rgba(0,0,0,0.1);
}
.dr-summary-div-top {
	border-top: 1px solid rgba(0,0,0,0.1);
}
.dr-section-sub-header-title {
	color: #147dc2;
    font-weight: 600;
	padding-top: 10px;
	padding-bottom: 10px;
	border-top-left-radius: 10px;
    border-top-right-radius: 10px;
	border-bottom: 1px solid #e5e6eb;
	font-size: 1rem;
}
.showoff {
	font-size: 12px;
	margin-bottom: 5px;
	color: #222222;
	font-weight: normal;
}
	</style>
</head>
<body>
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
  <h5 class="my-0 mr-md-auto font-weight-normal" onclick="openHome()" style="cursor: pointer;">
	<img src="./assets/images/logo.png" width="80" height="45" alt="Comcast">
	NSE Dashboard
  </h5>
  <div class="input-group input-group-sm" style="width:32%">
	  <div class="input-group-prepend">
		<span class="input-group-text" id="">SLA Period</span>
	  </div>
	  <input type="text" class="form-control" id="start-date">
	  <input type="text" class="form-control" id="end-date">
   </div>
</div>
<?php
if(isset($_GET['tower']) && isset($_GET['track']) && !empty($_GET['tower']) && !empty($_GET['track'])){
	include_once 'dashboard3.php';
}
else if(isset($_GET['tower']) && !empty($_GET['tower'])){
	include_once 'dashboard2.php';
}
else{
	include_once 'dashboard1.php';
}
?>
<script>

var sla_period_from = '<?= $sla_period_from ?>';
var sla_period_to = '<?= $sla_period_to ?>';

var sla_period = new Lightpick({
	field: document.getElementById('start-date'),
	secondField: document.getElementById('end-date'),
	singleDate: false,
	format: 'MMMM DD, YYYY',
	startDate: sla_period_from,
	endDate: sla_period_to,
	onClose: function(){
		load();
	}
});

function load(){
	var start = sla_period.getStartDate();
	var end= sla_period.getEndDate();
	console.log(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
	window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname+'?sla_period_from='+start.format('YYYY-MM-DD')+'&sla_period_to='+end.format('YYYY-MM-DD');
}

function openHome(){
	var start = sla_period.getStartDate();
	var end= sla_period.getEndDate();
	var uri = 'index.php??sla_period_from='+start.format('YYYY-MM-DD')+'&sla_period_to='+end.format('YYYY-MM-DD');
	window.open(encodeURI(uri), '_self');
}

function openTower(tower){
	var uri = window.location.protocol + '//' + window.location.host + window.location.pathname;
	var start = sla_period.getStartDate();
	var end= sla_period.getEndDate();
	uri += '?sla_period_from='+start.format('YYYY-MM-DD')+'&sla_period_to='+end.format('YYYY-MM-DD')+'&tower='+tower;
	window.location.href = encodeURI(uri);
}
</script>
</body>
</html>