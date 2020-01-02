<?php
$sla_period_from = date('Y-m-d', strtotime('first day of last month'));
$sla_period_to = date('Y-m-d', strtotime('last day of last month'));
if(isset($_GET['sla_period_from']) && isset($_GET['sla_period_to'])){
	$sla_period_from = $_GET['sla_period_from'];
	$sla_period_to = $_GET['sla_period_to'];
}
$bg = 0;
$towers_stmt = $conn->prepare('select distinct tower from api_config');
$towers_stmt->execute();
$towers = $towers_stmt->fetchAll(PDO::FETCH_ASSOC);

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
where 1=1
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
) tickets group by tower, track) tickets 
) tickets group by tower";
$kpi1_stmt = $conn->prepare($kpi1_query);
$kpi1_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
$kpi1_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
$kpi1_stmt->execute();
$kpi1 = $kpi1_stmt->fetchAll(PDO::FETCH_ASSOC);

$kpi2_query = "select tower, sum(case when label = 1 then 1 else 0 end) as ontime, sum(case when label = 0 then 1 else 0 end) as delay
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
group by ac.tower, ac.track, target, target_condition) a
) b group by tower";
$kpi2_stmt = $conn->prepare($kpi2_query);
$kpi2_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
$kpi2_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
$kpi2_stmt->execute();
$kpi2 = $kpi2_stmt->fetchAll(PDO::FETCH_ASSOC);

$kpi3_query = "select 
sum(case when (planned_end_date >= :sla_period_from AND planned_end_date <= :sla_period_to) then volume else 0 end) as planned,
sum(case when (end_date >= :sla_period_from AND end_date <= :sla_period_to) then volume else 0 end) as actual,
tower
from tickets 
where 1=1
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
group by tower";
$kpi3_stmt = $conn->prepare($kpi3_query);
$kpi3_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
$kpi3_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
$kpi3_stmt->execute();
$kpi3 = $kpi3_stmt->fetchAll(PDO::FETCH_ASSOC);


$data = [];
foreach($towers as $index => $tower){
	$data[$tower['tower']] = array(
		'kpi1' => $kpi1[array_search($tower['tower'], array_column($kpi1, 'tower'))],
		'kpi2' => $kpi2[array_search($tower['tower'], array_column($kpi2, 'tower'))],
		'kpi3' => $kpi3[array_search($tower['tower'], array_column($kpi3, 'tower'))]
	);
}
?>
<?php foreach($data as $tower => $d){ ?>
<div class="container-fluid p-4" style="background: <?= ($bg++%2 == 0) ? '#ecedf1': '#f5f6fa'; ?>;">
	<div class="row">
		<div class="col-12 mb-2">
			<div class="row">
				<div class="col-8">
					<h6 class="dr-section-main-header-title"><?= strtoupper($tower) ?></h6>
				</div>
				<div class="col-4">
					<button type="button" class="btn btn-sm btn-secondary float-right" onclick="openTower('<?= $tower ?>')">Explore <?= strtoupper($tower) ?> Tower</button>
				</div>
			</div>
		</div>
		<div class="col-12">
			<div class="row m-0 dr-summary-body" style="margin: 0px;border: 1px solid #ccc;border-radius: 10px;background: white;-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.2);box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
				<div class="col-4 dr-summary-div">
					<div class="row">
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
				<div class="col-4 dr-summary-div">
					<div class="row">
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
				<div class="col-4">
					<div class="row">
						<div class="col-12 dr-section-sub-header-title">
							<div class="row">
								<div class="col-8 pt-1">
									<span>Volume</span>
									<span class="showoff">Planned vs. Actual</span>
								</div>
							</div>
						</div>
						<div class="col-12 pt-2" style="overflow: hidden">
							<div id="kpi3-chart-<?= $tower ?>" class="text-center" style="padding: 70px 0px;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php } ?>
<script>
var data = <?= json_encode($data) ?>;
onFetchData(data);

function onFetchData(data) {
	
	$.each(data, function(tower, d){
		
		var chart1 = donut('#kpi1-chart-'+tower, {
			width: 250,
			height: 250,
			donutWidth: 60,
			label: 'Tracks'
		}, [
			{ name: "Met SLA", size: parseInt(d['kpi1']['ontime']), fill: '#51752c' },
			{ name: "Didn't Met SLA", size: parseInt(d['kpi1']['delay']), fill: '#ea5252' }
		]);
		
		var chart2 = donut('#kpi2-chart-'+tower, {
			width: 250,
			height: 250,
			donutWidth: 60,
			label: 'Tracks'
		}, [
			{ name: "Met SLA", size: parseInt(d['kpi2']['ontime']), fill: '#51752c' },
			{ name: "Didn't Met SLA", size: parseInt(d['kpi2']['delay']), fill: '#ea5252' }
		]);
		
		/* var chart1 = gauge('#kpi1-chart-'+tower, {
			size: 300,
			clipWidth: 300,
			clipHeight: 300,
			ringWidth: 40,
			maxValue: 100,
			transitionMs: 500,
			suffix: '%',
			criteria: '>='
		});
		chart1.render(d['kpi1']['actual'], d['kpi1']['target']); */
		
		/* var chart2 = gauge('#kpi2-chart-'+tower, {
			size: 300,
			clipWidth: 300,
			clipHeight: 300,
			ringWidth: 40,
			maxValue: 10,
			transitionMs: 500,
			suffix: '',
			criteria: '<'
		});
		chart2.render(d['kpi2']['actual'], d['kpi2']['target']); */
		
		var chart3 = bullet('#kpi3-chart-'+tower, {
			width: 350,
			height: 80,
			top: 5,
			right: 40,
			bottom: 20,
			left: 5,
			rangeLabel: 'Planned',
			mesaureLabel: 'Actual'
		}, [
			{"ranges":[d['kpi3']['planned']], "measures":[d['kpi3']['actual']], "markers":[0]}
		]);
	});
}
</script>