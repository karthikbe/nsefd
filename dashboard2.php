<?php
$sla_period_from = date('Y-m-d', strtotime('first day of last month'));
$sla_period_to = date('Y-m-d', strtotime('last day of last month'));
if(isset($_GET['sla_period_from']) && isset($_GET['sla_period_to'])){
	$sla_period_from = $_GET['sla_period_from'];
	$sla_period_to = $_GET['sla_period_to'];
}
$bg = 0;
$tower = '';
if(isset($_GET['tower']) && !empty($_GET['tower'])){
	$tower = $_GET['tower'];

	$kpi1_query = "select tower, sum(case when label = 1 then 1 else 0 end) as ontime, sum(case when label = 0 then 1 else 0 end) as delay
	from (select 
	tower, track, concat(target_condition, target) as target, round((completed/planned)*100) as actual,
	(case when target_condition = '>=' then round((completed/planned)*100) >= target
		when target_condition = '>' then round((completed/planned)*100) > target
		when target_condition = '<=' then round((completed/planned)*100) <= target
		when target_condition = '<' then round((completed/planned)*100) < target
		else 0 end
	) as label
	from (select 
	count(1) as planned,
	sum(case when derived_status = 'On Time' then 1 else 0 end) as completed,
	tower, track,
	extract_condition(kpi1_target) as target_condition, extract_number(kpi1_target) as target
	from (select 
	(case when planned_end_date >= :sla_period_from AND planned_end_date <= :sla_period_to and (end_date > planned_end_date or end_date = '0000-00-00') and planned_end_date < current_date then 'Delayed' else 'On Time' end) as derived_status,
	tickets.*,
	ac.kpi1_target
	from tickets 
	left outer join api_config ac on (ac.tower= tickets.tower and ac.track = tickets.track)
	where tickets.tower = :tower
	AND (
		(planned_start_date >= :sla_period_from AND planned_start_date <= :sla_period_to)
		OR 
		(start_date >= :sla_period_from AND start_date <= :sla_period_to)
		OR 
		(end_date >= :sla_period_from AND end_date <= :sla_period_to)
		OR 
		(planned_end_date >= :sla_period_from AND planned_end_date <= :sla_period_to)
		OR 
		(planned_start_date <> '0000-00-00' and planned_start_date < :sla_period_from AND planned_end_date > :sla_period_to)
	) 
	) tickets group by track) tickets 
	) tickets";
	$kpi1_stmt = $conn->prepare($kpi1_query);
	$kpi1_stmt->bindParam(':tower', $tower, PDO::PARAM_STR);
	$kpi1_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
	$kpi1_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
	$kpi1_stmt->execute();
	$kpi1 = $kpi1_stmt->fetchAll(PDO::FETCH_ASSOC);
	
	$kpi1_details_query = "select tower, track, concat(target, '%') as target, concat(actual, '%') as actual, 
	(case when label = 1 then 'On Time' else 'Delayed' end) as outcome
	from (select 
	tower, track, concat(target_condition, target) as target, round((completed/planned)*100) as actual,
	(case when target_condition = '>=' then round((completed/planned)*100) >= target
		when target_condition = '>' then round((completed/planned)*100) > target
		when target_condition = '<=' then round((completed/planned)*100) <= target
		when target_condition = '<' then round((completed/planned)*100) < target
		else 0 end
	) as label
	from (select 
	count(1) as planned,
	sum(case when derived_status = 'On Time' then 1 else 0 end) as completed,
	tower, track,
	extract_condition(kpi1_target) as target_condition, extract_number(kpi1_target) as target
	from (select 
	(case when planned_end_date >= :sla_period_from AND planned_end_date <= :sla_period_to and (end_date > planned_end_date or end_date = '0000-00-00') and planned_end_date < current_date then 'Delayed' else 'On Time' end) as derived_status,
	tickets.*,
	ac.kpi1_target
	from tickets 
	left outer join api_config ac on (ac.tower= tickets.tower and ac.track = tickets.track)
	where tickets.tower = :tower
	AND (
		(planned_start_date >= :sla_period_from AND planned_start_date <= :sla_period_to)
		OR 
		(start_date >= :sla_period_from AND start_date <= :sla_period_to)
		OR 
		(end_date >= :sla_period_from AND end_date <= :sla_period_to)
		OR 
		(planned_end_date >= :sla_period_from AND planned_end_date <= :sla_period_to)
		OR 
		(planned_start_date <> '0000-00-00' and planned_start_date < :sla_period_from AND planned_end_date > :sla_period_to)
	) 
	) tickets group by track) tickets 
	) tickets";
	$kpi1_details_stmt = $conn->prepare($kpi1_details_query);
	$kpi1_details_stmt->bindParam(':tower', $tower, PDO::PARAM_STR);
	$kpi1_details_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
	$kpi1_details_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
	$kpi1_details_stmt->execute();
	$kpi1_details = $kpi1_details_stmt->fetchAll(PDO::FETCH_ASSOC);


	$kpi2_query = "select sum(case when label = 1 then 1 else 0 end) as ontime, sum(case when label = 0 then 1 else 0 end) as delay
	from (select tower, track, concat(target_condition, target) target, actual, 
	(case when target_condition = '>=' then actual >= target when target_condition = '>' then actual > target 
			when target_condition = '<=' then actual <= target when target_condition = '<' then actual < target 
			else 0 end) as label
	from (select 
	ac.tower,
	ac.track,
	extract_number(ac.kpi2_target) as target,
	extract_condition(ac.kpi2_target) as target_condition,
	sum(case when (sla_reporting_month >= :sla_period_from and sla_reporting_month <= :sla_period_to) then 1 else 0 end) as actual
	from api_config ac
	left outer join critical_escaped_defects ced  on (ac.tower = ced.tower and ac.track = ced.track)
    where ac.tower = :tower
	group by ac.tower, ac.track, target, target_condition) a) b ";
	$kpi2_stmt = $conn->prepare($kpi2_query);
	$kpi2_stmt->bindParam(':tower', $tower, PDO::PARAM_STR);
	$kpi2_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
	$kpi2_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
	$kpi2_stmt->execute();
	$kpi2 = $kpi2_stmt->fetchAll(PDO::FETCH_ASSOC);
	
	$kpi2_details_query = "select tower, track, target as target, actual as actual,
	(case when label = 1 then 'On Time' else 'Delayed' end) as outcome
	from (select tower, track, concat(target_condition, target) target, actual, 
	(case when target_condition = '>=' then actual >= target when target_condition = '>' then actual > target 
			when target_condition = '<=' then actual <= target when target_condition = '<' then actual < target 
			else 0 end) as label
	from (select 
	ac.tower,
	ac.track,
	extract_number(ac.kpi2_target) as target,
	extract_condition(ac.kpi2_target) as target_condition,
	sum(case when (sla_reporting_month >= :sla_period_from and sla_reporting_month <= :sla_period_to) then 1 else 0 end) as actual
	from api_config ac
	left outer join critical_escaped_defects ced  on (ac.tower = ced.tower and ac.track = ced.track)
    where ac.tower = :tower
	group by ac.tower, ac.track, target, target_condition) a) b ";
	$kpi2_details_stmt = $conn->prepare($kpi2_details_query);
	$kpi2_details_stmt->bindParam(':tower', $tower, PDO::PARAM_STR);
	$kpi2_details_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
	$kpi2_details_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
	$kpi2_details_stmt->execute();
	$kpi2_details = $kpi2_details_stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<div class="container-fluid p-4" style="background: #ecedf1;">
	<div class="row">
		<div class="col-12 mb-2">
			<div class="row">
				<div class="col-8">
					<h6 class="dr-section-main-header-title"><?= strtoupper($tower) ?></h6>
				</div>
			</div>
		</div>
		<div class="col-12">
			<div class="row dr-summary-body">
				<div class="col-6 mb-4">
					<div class="row" style="margin: 0px;border: 1px solid #ccc;border-radius: 10px;background: white;-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.2);box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
						<div class="col-12 dr-section-sub-header-title">
							<div class="row">
								<div class="col-8 pt-1">
									<span>On Time Delivery</span>
									<span class="showoff">by tracks</span>
								</div>
							</div>
						</div>
						<div class="col-12 pt-2" style="overflow: hidden">
							<div id="kpi1-chart-<?= $tower ?>" class="text-center"></div>
							<div class="row mt-2 mb-3" style="font-size: 12px; color: #444; font-weight: bold;">
								<div class="col-md-6 p-0 text-center">
									<i class="fas fa-square" style="color:#51752c;"></i> Met SLA
								</div>
								<div class="col-md-6 p-0 text-center">
									<i class="fas fa-square" style="color:#ea5252;"></i> Didn't Met SLA
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-6 mb-4">
					<div class="row" style="margin: 0px;border: 1px solid #ccc;border-radius: 10px;background: white;-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.2);box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
						<div class="col-12 dr-section-sub-header-title">
							<div class="row">
								<div class="col-8 pt-1">
									<span>On Time Delivery Details</span>
									<span class="showoff">by tracks</span>
								</div>
							</div>
						</div>
						<div class="col-12 pt-2" style="overflow: hidden">
							
						</div>
					</div>
				</div>
				<div class="col-6 mb-4">
					<div class="row" style="margin: 0px;border: 1px solid #ccc;border-radius: 10px;background: white;-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.2);box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
						<div class="col-12 dr-section-sub-header-title">
							<div class="row">
								<div class="col-8 pt-1">
									<span>Critical Escaped Defects</span>
									<span class="showoff">by tracks</span>
								</div>
							</div>
						</div>
						<div class="col-12 pt-2" style="overflow: hidden">
							<div id="kpi2-chart-<?= $tower ?>" class="text-center"></div>
							<div class="row mt-2 mb-3" style="font-size: 12px; color: #444; font-weight: bold;">
								<div class="col-md-6 p-0 text-center">
									<i class="fas fa-square" style="color:#51752c;"></i> Met SLA
								</div>
								<div class="col-md-6 p-0 text-center">
									<i class="fas fa-square" style="color:#ea5252;"></i> Didn't Met SLA
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-6 mb-4">
					<div class="row" style="margin: 0px;border: 1px solid #ccc;border-radius: 10px;background: white;-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.2);box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
						<div class="col-12 dr-section-sub-header-title">
							<div class="row">
								<div class="col-8 pt-1">
									<span>Critical Escaped Defects Details</span>
									<span class="showoff">by tracks</span>
								</div>
							</div>
						</div>
						<div class="col-12 pt-2" style="overflow: hidden">
							
						</div>
					</div>
				</div>
				<div class="col-12 mb-4">
					<div class="row" style="margin: 0px;border: 1px solid #ccc;border-radius: 10px;background: white;-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.2);box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
						<div class="col-12 dr-section-sub-header-title">
							<div class="row">
								<div class="col-8 pt-1">
									<span>Planned Volume Vs. Actual Volume</span>
									<span class="showoff">by tracks</span>
								</div>
							</div>
						</div>
						<div class="col-12 pt-2" style="overflow: hidden">
							<svg width="575" height="350" id="volume-<?= $tower ?>"></svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
var tower = '<?= $tower ?>';
var kpi1 = <?= json_encode($kpi1) ?>;
var kpi2 = <?= json_encode($kpi2) ?>;

console.log(tower, kpi1, kpi2);
onFetchData();

function onFetchData() {

	var chart1 = donut('#kpi1-chart-'+tower, {
		width: 250,
		height: 250,
		donutWidth: 60,
		label: 'Tracks'
	}, [
		{ name: "Met SLA", size: parseInt(kpi1[0]['ontime']), fill: '#51752c' },
		{ name: "Didn't Met SLA", size: parseInt(kpi1[0]['delay']), fill: '#ea5252' }
	]);
	
	var chart2 = donut('#kpi2-chart-'+tower, {
		width: 250,
		height: 250,
		donutWidth: 60,
		label: 'Tracks'
	}, [
		{ name: "Met SLA", size: parseInt(kpi2[0]['ontime']), fill: '#51752c' },
		{ name: "Didn't Met SLA", size: parseInt(kpi2[0]['delay']), fill: '#ea5252' }
	]);
}

var barchart = stackedbar('#volume-'+tower, {
	top: 20, 
	right: 20, 
	bottom: 30, 
	left: 40,
	xAxis: 'Track',
	yAxis: ['Planned Volume', 'Actual Volume'],
	colors: {
		'Planned Volume': '#98d9d9',
		'Actual Volume': '#f9d45c'
	}
}, [
	{"Planned Volume": 28,"Actual Volume": 37,"Track": "ICE AUTOMATION"},
	{"Planned Volume": 72,"Actual Volume": 73,"Track": "ICE QA"},
	{"Planned Volume": 25,"Actual Volume": 28,"Track": "RESIDENTIAL DEV"},
	{"Planned Volume": 39,"Actual Volume": 39,"Track": "VM QA-OPS"}
]);
</script>