<?php
	
	if (!isset($_GET['scenarioName']) || !isset($_GET['fileType']))
	{
		echo "error";
		exit;
	}
	
	$scenarioName = stripslashes($_GET['scenarioName']);
	if (!is_dir('scenarios/'.$scenarioName)) {
		echo "error";
		exit;
	}
	
	header('Content-Type: application/json');
	$type = $_GET['fileType'];
	if ($type == 'units')
	{
		echo file_get_contents('scenarios/'.$scenarioName.'/unitsJson.js');
		exit;
	}else if ($type == 'map')
	{
		echo file_get_contents('scenarios/'.$scenarioName.'/mapJson.js');
		exit;
	}else if ($type == 'victory')
	{
		echo file_get_contents('scenarios/'.$scenarioName.'/victoryJson.js');
		exit;
	}else if ($type == 'scenario')
	{
		echo file_get_contents('scenarios/'.$scenarioName.'/scenarioJson.js');
		exit;
	}
	
	echo "error";
	exit;
	
?>