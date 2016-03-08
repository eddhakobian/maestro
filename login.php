<?php
error_reporting(0);
session_start();
if( isset($_GET['logout']) ){
    session_unset();
    session_destroy();
}
    $client_id = '5328876'; // ID приложения
    $client_secret = 'qdXG2I3i9D5FZ2H57bY6'; // Защищённый ключ
    $redirect_uri = 'http://maestro.shahum.net/login.php'; // Адрес сайта

    $url = 'http://oauth.vk.com/authorize';

    $params = array(
        'client_id'     => $client_id,
        'redirect_uri'  => $redirect_uri,
        'display'  => 'page',
        'scope'  => 'friends,audio',
        'response_type' => 'code'
    );

    $link = $url . '?' . urldecode(http_build_query($params));

if (isset($_GET['code'])) {
    $result = false;
    $params = array(
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'redirect_uri' => $redirect_uri,
        'code' => $_GET['code']
    );

    $token = json_decode(file_get_contents('https://oauth.vk.com/access_token' . '?' . urldecode(http_build_query($params))), true);

    if (isset($token['access_token'])) {
        $params = array(
            'uids'         => $token['user_id'],
            'fields'       => 'uid,first_name,last_name,photo_50',
            'access_token' => $token['access_token']
        );

        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params))), true);
        if (isset($userInfo['response'][0]['uid'])) {
            $userInfo = $userInfo['response'][0];
            $result = true;
        }
    }

    if ($result) {
        $_SESSION['vk_id'] = $userInfo['uid'];
        $_SESSION['vk_name'] = $userInfo['first_name'].' '.$userInfo['last_name'];
        $_SESSION['vk_photo'] = $userInfo['photo_50'];
        $_SESSION['access_token'] = $token['access_token'];
        $conn = mysqli_connect('localhost','root','');
        if($conn != false){
            mysqli_select_db('maestro');
            $checkIfExists = mysqli_query('select * from users where vk_id='.$userInfo['uid'].';');
            while($row = mysqli_fetch_array($checkIfExists)){
                if($row['vk_id'] == $userInfo['uid']){
                    $alreadyLogged = true;
                    break;
                }
            }
            if(!isset($alreadyLogged)){
                mysqli_query("insert into users (vk_id,first_name,last_name,photo) values ('".$userInfo['uid']."','".$userInfo['first_name']."','".$userInfo['last_name']."','".$userInfo['photo_50']."');");
            }
        }
        mysqli_close($conn);
        header("Location: index.php");
    }
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Welcome – Maestro</title>
	<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.1.2/material.teal-light_blue.min.css" />
    <meta charset="utf-8">
</head>
<body id="login-page">
<div class="blurred"></div>
<div class="container">
    <div class="panel">
        <div class="logo">
            <i class="fa fa-headphones"></i>
            <strong>Maestro</strong>
        </div>
        <a href="<?php echo $link; ?>"><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
            Continue
        </button></a>
    </div>
</div>
<a href="#"><div id="credits">@eddhakobian</div></a>

<script type="text/javascript" src="js/jquery-2.2.1.min.js"></script>
<script defer src="https://code.getmdl.io/1.1.2/material.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</body>
</html>