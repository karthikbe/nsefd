<?php

define('DB_NAME', 'nse_dashboard');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
// define('DB_HOST', 'localhost');
define('DB_HOST', '10.147.125.234');


$conn = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD);

/* $kpi1_query = "select 
tower,
round((sum(case when planned_end_date >= :sla_period_from AND planned_end_date <= :sla_period_to 
and (end_date > planned_end_date or end_date = '0000-00-00') and planned_end_date < current_date  then 0 else 1 end)/count(1))*100) as actual,
(select round(avg(extract_number(kpi1_target))) from api_config where tower = tickets.tower) as target
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
$kpi1_stmt = $conn->prepare($kpi1_query);
$kpi1_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
$kpi1_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
$kpi1_stmt->execute();
$kpi1 = $kpi1_stmt->fetchAll(PDO::FETCH_ASSOC); */

/* $kpi2_query = "select tower, round(avg(extract_number(kpi2_target))) as target,
(select count(1) from critical_escaped_defects where tower = api_config.tower 
and sla_reporting_month >= :sla_period_from and sla_reporting_month <= :sla_period_to) as actual
from api_config
group by tower";
$kpi2_stmt = $conn->prepare($kpi2_query);
$kpi2_stmt->bindParam(':sla_period_from', $sla_period_from, PDO::PARAM_STR);
$kpi2_stmt->bindParam(':sla_period_to', $sla_period_to, PDO::PARAM_STR);
$kpi2_stmt->execute();
$kpi2 = $kpi2_stmt->fetchAll(PDO::FETCH_ASSOC); */




?>