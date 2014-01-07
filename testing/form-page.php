<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>PHP form to email sample form</title>
<!-- define some style elements-->
<style>
label,a 
{
	font-family : Arial, Helvetica, sans-serif;
	font-size : 12px; 
}

</style>	
<!-- a helper script for vaidating the form-->
<script language="JavaScript" src="scripts/gen_validatorv31.js" type="text/javascript"></script>
</head>


<body>

<?php

$to = 'laxchee@hotmail.com';
$subject = 'Bweeb Vote';

if(isset($_POST['email'])){ $email = $_POST['email']; }

$message = <<<EMAIL
Vote for you by $email
EMAIL;

$header = 'From: $email';

if($_POST){
	mail($to, $subject, $message, $header);
}
?>

<!-- Start code for the form-->
<form method="post" action="?">
	<p>
		<label for='email'>Enter Email Address:</label><br>
		<input type="text" name="email" id="email">
	</p>

	<input type="submit" name='submit' value="submit">
</form>

</body>
</html>