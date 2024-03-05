<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $msg = $_POST["msg"];

    if ($name=="" or $email==""){
        echo "Form empty fields!";
    }

    else {
        $to = "jsisum@sjselectricllc.net, denlavrik@sjselectricllc.net, Iryna@sjselectricllc.net";
        $subject = "Message from sjsvdc.com";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "From: <sjsvdc.com>\r\n";

        $message = "User name: ".$name."\n";
        $message .= "User email: ".$email."\n";
        $message .= "User phone: ".$phone."\n";
        $message .= "User message: ".$msg."\n";

        $send = mail($to, $subject, $message, $headers);

        if ($send == "true")
        {
            echo "Form success!\r\n";
        }
        else
        {
            echo "Form error!";
        }
    }
?>
