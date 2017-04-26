<?php
$phone = $_POST['phone']; 
$name=isset($_POST['name'])?$_POST['name']:'';
$email=isset($_POST['email'])?$_POST['email']:'';
$topic=isset($_POST['topic'])?$_POST['topic']:'';
$date=date('d.m G-i');
$to = "puga4.yura@gmail.com";

$send_yes="Заявка успешно отправлена!"; 
$send_no="Ошибка! Заявка не отправлена! \n Попробуйте позже."; 

$message = "Тема: ".$topic."\n";
$message .= $name?"Имя: ".$name."\n":'';
$message .= $phone?"Телефон: ".$phone."\n":'';
$message .= $email?"E-mail: ".$email."\n":'';
$message .="Дата: ".$date."\n"; ;
if($_POST['is_calc']==1){
	$message .= "Параметры\n";
	$message .= "Общая площадь: ".$_POST['number']."\n";
	$message .= "Вид облицовки: ".$_POST['type']."\n";
	$message .= "Дополнительные услуги: ".$_POST['service']."\n";
}
echo $message;
$headers = "Content-Type: text/html; charset=utf-8";
$headers = "From: New lead <info@maxofset.az> \r\n\r\n"; 
if(mail($to,$topic,$message,$headers)) { echo nl2br($send_yes); } else { echo nl2br($send_no); } ?>